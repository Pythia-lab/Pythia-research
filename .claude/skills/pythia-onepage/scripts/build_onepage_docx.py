#!/usr/bin/env python3
"""
Render the PYTHIA V2 One Page as an editable Word document (.docx), plus PDF/PNG for the website.

    python build_onepage_docx.py spec.json --lang en -o out/CVS_OnePage_en

Writes <out>.docx (the editable master), <out>.pdf and <out>.png (rendered from the .docx through LibreOffice),
and <out>_site_entry.js when the spec has a "website" block. Same JSON spec as build_onepage.py.

Layout: nested fixed-width tables on one US-Letter page. The chart is drawn by build_onepage.chart_svg and
embedded as a high-resolution PNG. A fit loop renders through LibreOffice and adjusts the type scale until the
sheet fills exactly one page.

Fonts: Arial Narrow (labels/numbers), Times New Roman (commentary), PingFang SC / Songti SC (Chinese).
These ship with macOS/Office; elsewhere Word substitutes them.
"""
import argparse, json, math, os, re, shutil, subprocess, sys, tempfile, copy

from docx import Document
from docx.enum.section import WD_ORIENT
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_CELL_VERTICAL_ALIGNMENT
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_LINE_SPACING
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Inches, Pt, RGBColor

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import build_onepage as H   # shared: spec loading, localize, labels, STD rows, number format, chart SVG, site entry

SANS, SERIF = "Arial Narrow", "Times New Roman"
CJK_SANS, CJK_SERIF = "PingFang SC", "Songti SC"
GRAY = "D9D9D9"
PAGE_W, PAGE_H = 8.5, 11.0
MAR_X, MAR_T, MAR_B = 0.55, 0.32, 0.28
W = PAGE_W - 2 * MAR_X                       # 7.4in content width
DXA = 1440
SCALE = 1.0          # global type scale (fit loop)
CSCALE = 1.0         # extra scale for the commentary (fills the bottom-right column)
LANG = "en"


def S(pt):
    return Pt(round(pt * SCALE * 4) / 4)


# ----------------------------------------------------------------------------- OOXML helpers
def font(run, size, bold=False, serif=False, color=None, italic=False):
    name = SERIF if serif else SANS
    run.font.name = name
    run.font.size = Pt(size)
    run.font.bold = bold
    run.font.italic = italic
    rpr = run._element.get_or_add_rPr()
    rf = rpr.find(qn("w:rFonts"))
    if rf is None:
        rf = OxmlElement("w:rFonts"); rpr.insert(0, rf)
    for a in ("w:ascii", "w:hAnsi", "w:cs"):
        rf.set(qn(a), name)
    rf.set(qn("w:eastAsia"), CJK_SERIF if serif else CJK_SANS)
    if color:
        run.font.color.rgb = RGBColor.from_string(color)


def para_fmt(p, align="l", line=None, before=0, after=0, indent=0, first=0):
    pf = p.paragraph_format
    pf.space_before, pf.space_after = Pt(before), Pt(after)
    if line:
        pf.line_spacing_rule = WD_LINE_SPACING.EXACTLY
        pf.line_spacing = Pt(line)
    if indent:
        pf.left_indent = Pt(indent)
    if first:
        pf.first_line_indent = Pt(first)
    p.alignment = {"l": WD_ALIGN_PARAGRAPH.LEFT, "r": WD_ALIGN_PARAGRAPH.RIGHT, "c": WD_ALIGN_PARAGRAPH.CENTER,
                   "j": WD_ALIGN_PARAGRAPH.JUSTIFY}[align]
    # keep CJK/Latin spacing natural and stop Word from squeezing punctuation differently per line
    ppr = p._p.get_or_add_pPr()
    for tag in ("w:autoSpaceDE", "w:autoSpaceDN"):
        el = OxmlElement(tag); el.set(qn("w:val"), "0"); ppr.append(el)
    return p


def text(p, s, size, bold=False, serif=False, color=None):
    """Append text with **bold** markup."""
    for part in re.split(r"(\*\*[^*]+\*\*)", str(s or "")):
        if not part:
            continue
        b = bold
        if part.startswith("**") and part.endswith("**"):
            part, b = part[2:-2], True
        font(p.add_run(part), size, b, serif, color)
    return p


def cell_p(cell, s="", size=6, bold=False, align="l", line=None, serif=False, color=None, before=0, after=0, new=False, indent=0):
    last = cell.paragraphs[-1] if cell.paragraphs else None
    if last is not None and not last.runs and (not new or last._p.getprevious() is not None and last._p.getprevious().tag == qn("w:tbl")):
        p = last          # reuse the empty paragraph (a cell's initial one, or the one Word needs after a nested table)
    else:
        p = cell.add_paragraph()
    para_fmt(p, align, line or size * 1.22, before, after, indent)
    if s != "":
        text(p, s, size, bold, serif, color)
    return p


def shade(cell, fill):
    tcPr = cell._element.get_or_add_tcPr()
    shd = OxmlElement("w:shd"); shd.set(qn("w:val"), "clear"); shd.set(qn("w:color"), "auto"); shd.set(qn("w:fill"), fill)
    tcPr.append(shd)


def borders(cell, **e):
    """e.g. top=6 (eighths of a point), bottom=None to clear."""
    tcPr = cell._element.get_or_add_tcPr()
    b = tcPr.find(qn("w:tcBorders"))
    if b is None:
        b = OxmlElement("w:tcBorders"); tcPr.append(b)
    for edge in ("top", "left", "bottom", "right"):
        if edge not in e:
            continue
        el = b.find(qn("w:" + edge))
        if el is None:
            el = OxmlElement("w:" + edge); b.append(el)
        if e[edge] is None:
            el.set(qn("w:val"), "nil")
        else:
            el.set(qn("w:val"), "single"); el.set(qn("w:sz"), str(e[edge])); el.set(qn("w:space"), "0"); el.set(qn("w:color"), "000000")


def margins(cell, top=0, bottom=0, left=30, right=30):
    tcPr = cell._element.get_or_add_tcPr()
    m = OxmlElement("w:tcMar")
    for k, v in (("top", top), ("left", left), ("bottom", bottom), ("right", right)):
        el = OxmlElement("w:" + k); el.set(qn("w:w"), str(int(v))); el.set(qn("w:type"), "dxa"); m.append(el)
    tcPr.append(m)


def valign(cell, where):
    cell.vertical_alignment = {"top": WD_CELL_VERTICAL_ALIGNMENT.TOP, "center": WD_CELL_VERTICAL_ALIGNMENT.CENTER,
                               "bottom": WD_CELL_VERTICAL_ALIGNMENT.BOTTOM}[where]


def row_height(row, pt, exact=True):
    trPr = row._tr.get_or_add_trPr()
    h = OxmlElement("w:trHeight"); h.set(qn("w:val"), str(int(pt * 20))); h.set(qn("w:hRule"), "exact" if exact else "atLeast")
    trPr.append(h)


def table(container, widths, rows=1, mar=(0, 0, 30, 30), outer=None):
    lead = None
    if hasattr(container, "_tc") and len(container.paragraphs) == 1 and not container.paragraphs[0].runs \
            and container._tc.find(qn("w:tbl")) is None:
        lead = container.paragraphs[0]._p
    t = container.add_table(rows=rows, cols=len(widths)) if hasattr(container, "_tc") else container.add_table(rows=rows, cols=len(widths))
    if lead is not None and t._tbl.getprevious() is lead:
        lead.getparent().remove(lead)
    t.alignment = WD_TABLE_ALIGNMENT.LEFT
    t.autofit = False
    tblPr = t._tbl.tblPr
    lay = OxmlElement("w:tblLayout"); lay.set(qn("w:type"), "fixed"); tblPr.append(lay)
    for old in tblPr.findall(qn("w:tblW")):
        tblPr.remove(old)
    tw = OxmlElement("w:tblW"); tw.set(qn("w:w"), str(int(sum(widths) * DXA))); tw.set(qn("w:type"), "dxa"); tblPr.append(tw)
    m = OxmlElement("w:tblCellMar")
    for k, v in zip(("top", "bottom", "left", "right"), mar):
        el = OxmlElement("w:" + k); el.set(qn("w:w"), str(v)); el.set(qn("w:type"), "dxa"); m.append(el)
    tblPr.append(m)
    tb = OxmlElement("w:tblBorders")
    for edge in ("top", "left", "bottom", "right", "insideH", "insideV"):
        el = OxmlElement("w:" + edge)
        if outer and edge in ("top", "left", "bottom", "right"):
            el.set(qn("w:val"), "single"); el.set(qn("w:sz"), str(outer)); el.set(qn("w:space"), "0"); el.set(qn("w:color"), "000000")
        else:
            el.set(qn("w:val"), "nil")
        tb.append(el)
    tblPr.append(tb)
    t._outer = outer
    for i, gc in enumerate(t._tbl.tblGrid.findall(qn("w:gridCol"))):
        gc.set(qn("w:w"), str(int(widths[i] * DXA)))
    for r in t.rows:
        for i, c in enumerate(r.cells):
            c.width = Inches(widths[i])
    return t


ORDER = {
    "pPr": ["pStyle", "keepNext", "keepLines", "pageBreakBefore", "framePr", "widowControl", "numPr", "suppressLineNumbers",
            "pBdr", "shd", "tabs", "suppressAutoHyphens", "kinsoku", "wordWrap", "overflowPunct", "topLinePunct", "autoSpaceDE",
            "autoSpaceDN", "bidi", "adjustRightInd", "snapToGrid", "spacing", "ind", "contextualSpacing", "mirrorIndents",
            "suppressOverlap", "jc", "textDirection", "textAlignment", "textboxTightWrap", "outlineLvl", "divId", "cnfStyle",
            "rPr", "sectPr", "pPrChange"],
    "tblPr": ["tblStyle", "tblpPr", "tblOverlap", "bidiVisual", "tblStyleRowBandSize", "tblStyleColBandSize", "tblW", "jc",
              "tblCellSpacing", "tblInd", "tblBorders", "shd", "tblLayout", "tblCellMar", "tblLook"],
    "tcPr": ["cnfStyle", "tcW", "gridSpan", "hMerge", "vMerge", "tcBorders", "shd", "noWrap", "tcMar", "textDirection",
             "tcFitText", "vAlign", "hideMark"],
    "trPr": ["cnfStyle", "divId", "gridBefore", "gridAfter", "wBefore", "wAfter", "cantSplit", "trHeight", "tblHeader",
             "tblCellSpacing", "jc", "hidden"],
}


def fix_order(root):
    """Word rejects out-of-order property elements; sort pPr/tblPr/tcPr/trPr children and drop duplicates (keep last)."""
    for tag, order in ORDER.items():
        rank = {qn("w:" + k): i for i, k in enumerate(order)}
        for el in root.iter(qn("w:" + tag)):
            kids = list(el)
            seen = {}
            for k in kids:
                seen[k.tag] = k          # last one wins
            for k in kids:
                el.remove(k)
            for k in sorted(seen.values(), key=lambda k: rank.get(k.tag, 999)):
                el.append(k)


def frame(t, sz=10, top=True):
    """Explicit outer border on the edge cells (table-level borders are ignored by some renderers)."""
    rows = t.rows
    for ri, r in enumerate(rows):
        cells = r.cells
        for ci, c in enumerate(cells):
            e = {}
            if ri == 0 and top: e["top"] = sz
            if ri == len(rows) - 1: e["bottom"] = sz
            if ci == 0: e["left"] = sz
            if ci == len(cells) - 1: e["right"] = sz
            if e: borders(c, **e)


def _w(el, tag):
    x = el.find(qn(tag)) if el is not None else None
    return int(x.get(qn("w:w"))) if x is not None and x.get(qn("w:w")) else None


ISSUES = []


def fit_nested_tables(body):
    """QA guard. Word clips a nested table that is wider than its cell's text area (cell width minus cell margins),
    while LibreOffice previews hide the problem. Measure every nested table and shrink it proportionally to fit,
    recording an issue line so the run reports what it fixed."""
    for tbl in body.iter(qn("w:tbl")):
        tc = tbl.getparent()
        if tc.tag != qn("w:tc"):
            continue
        tcPr = tc.find(qn("w:tcPr"))
        cw = _w(tcPr, "w:tcW")
        if not cw:
            continue
        mar = tcPr.find(qn("w:tcMar")) if tcPr is not None else None
        if mar is None:   # fall back to the parent table's default cell margins
            ptbl = tc.getparent().getparent()
            mar = ptbl.find(qn("w:tblPr")).find(qn("w:tblCellMar"))
        ml = _w(mar, "w:left") or 0
        mr = _w(mar, "w:right") or 0
        avail = cw - ml - mr - 12                  # 12 twips of slack for borders
        cols = tbl.find(qn("w:tblGrid")).findall(qn("w:gridCol"))
        total = sum(int(c.get(qn("w:w"))) for c in cols)
        if total > avail > 0:
            f = avail / total
            ISSUES.append(f"nested table {total} twips > cell text width {avail}: shrunk x{f:.3f}")
            for c in cols:
                c.set(qn("w:w"), str(int(int(c.get(qn("w:w"))) * f)))
            tw = tbl.find(qn("w:tblPr")).find(qn("w:tblW"))
            tw.set(qn("w:w"), str(avail))
            for tr in tbl.findall(qn("w:tr")):
                for c in tr.findall(qn("w:tc")):
                    w_ = c.find(qn("w:tcPr")).find(qn("w:tcW")) if c.find(qn("w:tcPr")) is not None else None
                    if w_ is not None and w_.get(qn("w:w")):
                        w_.set(qn("w:w"), str(int(int(w_.get(qn("w:w"))) * f)))


def tiny_spacer(container, pt=1.5):
    p = container.add_paragraph()
    para_fmt(p, line=pt)
    font(p.add_run(""), 1)
    return p


# ----------------------------------------------------------------------------- blocks
def small_table(cell, t, width, size, first_share=0.34, bold_last=False):
    """KPI / CAGR / financial position / mix tables — a nested borderless table with breathing room around rules."""
    if not t:
        return
    cols = t.get("columns") or []
    n = max(len(cols), max((len(r) for r in t.get("rows", [])), default=1))
    fw = width * first_share
    widths = [fw] + [(width - fw) / max(n - 1, 1)] * (n - 1)
    lh = size * 1.28
    if t.get("title"):
        cell_p(cell, t["title"], size * 1.08, True, line=size * 1.45)
    tb = table(cell, widths, rows=0, mar=(0, 0, 0, 25))
    def add(vals, bold=False, top_rule=False, head=False):
        r = tb.add_row(); row_height(r, lh + (2.2 if top_rule else 0))
        for i, c in enumerate(r.cells):
            c.width = Inches(widths[i])
            v = vals[i] if i < len(vals) else ""
            b = bold or head or (bold_last and i == n - 1 and not head)
            cell_p(c, H.rich_plain(v), size, b, "l" if i == 0 else "r", line=lh)
            valign(c, "bottom")
            if top_rule:
                borders(c, top=4); margins(c, top=28, left=0 if i == 0 else 25, right=0)
            else:
                margins(c, left=0 if i == 0 else 25, right=0)
    if cols:
        add(cols, head=True)
    for r in t.get("rows", []):
        add(r)
    if t.get("total_row"):
        add(t["total_row"], bold=True, top_rule=True)
    for n_ in t.get("notes", []) or ([t["note"]] if t.get("note") else []):
        cell_p(cell, n_, size * 0.95, line=size * 1.25, new=True, before=1)


def block_header(doc, spec, lab):
    co = spec["company"]
    hms = spec.get("header_metrics") or []
    namew = co.get("name_width_in", 2.05)
    each = (W - namew) / 6
    lw = each * (0.39 if LANG == "zh" else 0.33)
    widths = [namew] + [lw, each - lw] * 6
    t = table(doc, widths, rows=1, mar=(0, 0, 40, 40), outer=10)
    r = t.rows[0]; row_height(r, 30)
    c = r.cells[0]
    p = cell_p(c, "", 24, line=28)
    font(p.add_run(co["name"].upper() if LANG == "en" else co["name"]), co.get("name_size_pt", 24) * min(SCALE, 1.05), True)
    font(p.add_run("  " + co.get("ticker", "")), 9.5, True)
    valign(c, "bottom"); margins(c, left=60, bottom=10)
    borders(c, right=6)
    hv = min(spec.get("header_value_size_pt", 15), 15) * (0.86 if LANG == "zh" else 1.0)
    for i in range(6):
        m = hms[i] if i < len(hms) else {"value": "--"}
        lbl = m.get("label") or lab["hm"][i]
        lines = lbl if isinstance(lbl, list) else str(lbl).split("\n")
        lc, vc = r.cells[1 + 2 * i], r.cells[2 + 2 * i]
        for j, ln in enumerate(lines):
            cell_p(lc, ln, 7.2, line=7.6, new=j > 0)
        valign(lc, "center"); margins(lc, left=30, right=0)
        p = cell_p(vc, str(m["value"]), hv, True, "r", line=hv * 1.05)
        valign(vc, "center"); margins(vc, left=0, right=35)
        if i < 5:
            borders(vc, right=6)
    frame(t)


def chart_png(spec, lab, out_png, width_in, height_in):
    ch = spec.get("chart") or {}
    Wpt, Hpt = width_in * 72, height_in * 72
    svg = H.chart_svg(dict(ch), lab, Wpt, Hpt).replace('style="width:100%;height:auto;display:block"', f'width="{Wpt*4:.0f}" height="{Hpt*4:.0f}"')
    html = f"<!DOCTYPE html><html><head><meta charset='utf-8'><style>{H.font_face_css()} body{{margin:0;background:#fff}}</style></head><body>{svg}</body></html>"
    hp = out_png + ".html"
    open(hp, "w", encoding="utf-8").write(html)
    js = os.path.join(tempfile.gettempdir(), "pythia_chart_shot.js")
    open(js, "w").write("""const path=require('path');const pw=require('playwright');(async()=>{const [h,o]=process.argv.slice(2);
const b=await pw.chromium.launch(process.env.CHROME?{executablePath:process.env.CHROME}:{});const p=await b.newPage();
await p.goto('file://'+path.resolve(h));await p.evaluate(()=>document.fonts.ready);await (await p.$('svg')).screenshot({path:o});await b.close();})();""")
    env = dict(os.environ)
    try:
        env["NODE_PATH"] = subprocess.run(["npm", "root", "-g"], capture_output=True, text=True).stdout.strip()
    except Exception:
        pass
    subprocess.run(["node", js, hp, out_png], check=True, env=env)
    os.remove(hp)


def block_top(doc, spec, lab, tmp):
    lw = 2.62
    rw = W - lw
    t = table(doc, [lw, rw], rows=1, mar=(0, 0, 60, 60), outer=10)
    L, R = t.rows[0].cells
    borders(L, right=6)
    margins(L, top=30, bottom=40, left=90, right=80)
    margins(R, top=20, bottom=20, left=60, right=60)
    bc = spec.get("business_chain", {})
    cell_p(L, bc.get("title", lab["chain"]), 7.4, True, line=9.5, before=2)
    for ln in bc.get("lines", []):
        _hanging(L, ln, 6.7)
    tiny_spacer(L, 4)
    small_table(L, spec.get("mix_table"), lw - 0.17, 6.1)
    if bc.get("watch"):
        cell_p(L, bc["watch"], 6.6, line=8.2, new=True, before=4)
    # chart + legend
    ch = spec.get("chart") or {}
    png = os.path.join(tmp, "chart.png")
    chart_png(spec, lab, png, rw - 0.12, ch.get("height_in", 2.12))
    p = R.paragraphs[0]
    para_fmt(p, "l", None, 2, 0)
    p.paragraph_format.line_spacing = 1.0
    p.add_run().add_picture(png, width=Inches(rw - 0.12))
    leg = ch.get("legend") or []
    lt = table(R, [(rw - 0.12) * 0.28, (rw - 0.12) * 0.28, (rw - 0.12) * 0.44], rows=1, mar=(0, 0, 0, 0))
    vals = [("—— " + leg[0]) if leg else "", ("‒ ‒ ‒ " + leg[1]) if len(leg) > 1 else "", ch.get("note", "")]
    for i, c in enumerate(lt.rows[0].cells):
        cell_p(c, vals[i], 6.2, align="r" if i == 2 else "l", line=8, after=1)
    frame(t, top=False)


def _hanging(cell, s, size):
    """Numbered chain line with a hanging indent so wrapped text lines up after the number."""
    p = cell.add_paragraph()
    para_fmt(p, "l", size * 1.22, 0, 0.6)
    p.paragraph_format.left_indent = Pt(size * 0.75)
    p.paragraph_format.first_line_indent = Pt(-size * 0.75)
    text(p, s, size)


def p_border(p, edge, sz=4, space=2):
    ppr = p._p.get_or_add_pPr()
    bdr = ppr.find(qn("w:pBdr"))
    if bdr is None:
        bdr = OxmlElement("w:pBdr"); ppr.append(bdr)
    el = OxmlElement("w:" + edge)
    el.set(qn("w:val"), "single"); el.set(qn("w:sz"), str(sz)); el.set(qn("w:space"), str(space)); el.set(qn("w:color"), "000000")
    bdr.append(el)


def p_shade(p, fill):
    ppr = p._p.get_or_add_pPr()
    shd = OxmlElement("w:shd"); shd.set(qn("w:val"), "clear"); shd.set(qn("w:color"), "auto"); shd.set(qn("w:fill"), fill)
    ppr.append(shd)


def sidebar(cell, blocks, size, pad):
    """Arrowed chain of blocks. Sub-paths hang off one continuous vertical rule (a left paragraph border shared by
    consecutive paragraphs), with a short tick before each sub-title — the tree look of the reference sheets."""
    lh = size * 1.2
    base = pad + size * 1.05            # text column of the blocks (arrow sits in the hanging indent)
    tree = base + size * 0.35           # x of the vertical tree rule
    first = True
    for b in blocks:
        title = b["title"].upper() if LANG == "en" else b["title"]
        if b.get("final"):
            p = cell_p(cell, "", size, line=lh, new=True, before=6)
            p.paragraph_format.left_indent = Pt(base); p.paragraph_format.right_indent = Pt(pad)
            p_border(p, "top", 8, 3)
            text(p, "**" + title + "**", size)
            q = cell_p(cell, b.get("text", ""), size, line=lh, new=True)
            q.paragraph_format.left_indent = Pt(base); q.paragraph_format.right_indent = Pt(pad)
            first = False
            continue
        p = cell_p(cell, "", size, line=lh, new=True, before=1.5 if first else 3.5)
        p.paragraph_format.left_indent = Pt(base); p.paragraph_format.first_line_indent = Pt(-(base - pad))
        p.paragraph_format.right_indent = Pt(pad)
        text(p, ("↓\t" if not first else "\t") + "**" + title + "**", size)
        p.paragraph_format.tab_stops.add_tab_stop(Pt(base))
        if b.get("text"):
            q = cell_p(cell, b["text"], size, line=lh, new=True)
            q.paragraph_format.left_indent = Pt(base); q.paragraph_format.right_indent = Pt(pad)
        subs = b.get("sub", [])
        if subs:
            # tree: a two-column borderless table whose first column carries the vertical rule (left border on every
            # row = one continuous line) and the tick; renders identically in Word, WPS and LibreOffice
            tick_w = size * 0.95 / 72
            width = cell.width.inches if cell.width else 1.0
            text_w = width - (tree / 72) - tick_w - pad / 72 - 0.02
            tt = table(cell, [tree / 72, tick_w, text_w], rows=0, mar=(0, 0, 0, 0))
            for s_ in subs:
                st = s_["title"].upper() if LANG == "en" else s_["title"]
                r_ = tt.add_row()
                for ci, wv in enumerate([tree / 72, tick_w, text_w]):
                    r_.cells[ci].width = Inches(wv)
                c1, c2 = r_.cells[1], r_.cells[2]
                borders(c1, left=4); margins(c1, 0, 0, 0, 0); margins(c2, 0, 0, 0, 0)
                cell_p(c1, "–", size, line=lh)
                cell_p(c2, "**" + st + "**", size, line=lh)
                if s_.get("text"):
                    cell_p(c2, s_["text"], size, line=lh, new=True)
        first = False


def block_vc(doc, spec, lab):
    """One row: [title + sidebar | grid]. The year header is the grid's first row, so years sit in boxed cells
    with a rule underneath, exactly like a table. No nested header, no merged cells."""
    vc = spec["value_creation"]
    cols = vc["columns"]; n = len(cols)
    groups = H.vc_rows(vc, LANG)
    sw, mw, uw = 1.08, 0.84, 0.32
    gw = W - sw
    inner = gw - 0.04                       # safety margin: nested tables must be narrower than their cell
    yw = (inner - mw - uw) / n
    gwidths = [yw] * n + [mw, uw]
    hl = vc.get("highlight_col", n - 1)
    sz = 6.5 * SCALE
    rh = round(sz * 1.36 * 4) / 4
    hh = round(10.5 * SCALE * 4) / 4
    sep, paren = vc.get("thousands_sep", False), vc.get("paren_negatives", False)
    outer = table(doc, [sw, gw], rows=1, mar=(0, 0, 0, 0), outer=10)
    L, R = outer.rows[0].cells
    margins(L, 0, 0, 0, 0); margins(R, 0, 0, 0, 0); borders(L, right=6); valign(L, "top"); valign(R, "top")
    pad = 4.0
    tp = cell_p(L, "", 7.4 * SCALE, line=hh)
    p_shade(tp, "000000")
    text(tp, "\u00a0\u00a0" + vc.get("title", lab["vc"]), 7.4 * SCALE, True, color="FFFFFF")
    sidebar(L, vc.get("sidebar", []), 6.75 * SCALE, pad)
    g = table(R, gwidths, rows=1, mar=(0, 0, 0, 0))
    # header row: boxed years with a rule underneath
    hr = g.rows[0]; row_height(hr, hh)
    for i, y in enumerate(cols):
        c = hr.cells[i]
        cell_p(c, str(y), 7.4 * SCALE, True, "c", line=hh); valign(c, "center"); margins(c, 0, 0, 0, 0)
        borders(c, left=6, right=6, bottom=8)
        if i == hl: shade(c, GRAY)
    cg = hr.cells[n]; shade(cg, "000000"); valign(cg, "center"); margins(cg, left=40, right=0)
    cell_p(cg, vc.get("groups_label", lab["groups"]), 6.2 * SCALE, True, color="FFFFFF", line=hh); borders(cg, bottom=8)
    cu = hr.cells[n + 1]; shade(cu, "000000"); valign(cu, "center"); margins(cu, left=0, right=130)
    cell_p(cu, lab["unit"], 6.5 * SCALE, True, "r", color="FFFFFF", line=hh); borders(cu, bottom=8)
    for gi, grp in enumerate(groups):
        for k, r in enumerate(grp):
            row = g.add_row(); row_height(row, rh)
            vals = r.get("values", [])
            rule = (k == 0 and gi > 0)
            for i in range(n):
                v = vals[i] if i < len(vals) else None
                c = row.cells[i]; c.width = Inches(gwidths[i])
                cell_p(c, H.fmt_num(v, r.get("fmt", "auto"), r.get("sep", sep), r.get("paren", paren)), sz, False, "r", line=rh)
                valign(c, "center"); margins(c, left=0, right=30)
                borders(c, left=4, **({"top": 4} if rule else {}))
                if i == hl: shade(c, GRAY)
            cm = row.cells[n]; cm.width = Inches(mw)
            cell_p(cm, r.get("metric", ""), sz, True, line=rh); valign(cm, "center"); margins(cm, left=35, right=0)
            borders(cm, left=6, **({"top": 4} if rule else {}))
            cu = row.cells[n + 1]; cu.width = Inches(uw)
            cell_p(cu, r.get("unit", ""), sz, False, "r", line=rh); valign(cu, "center"); margins(cu, left=0, right=130)
            if rule: borders(cu, top=4)
    last = R.paragraphs[-1]; para_fmt(last, line=1)
    frame(outer, top=False)


def dcf_table_rows(d, lab, cur, price):
    def money(v):
        return "--" if not isinstance(v, (int, float)) else f"{cur}{v:,.2f}"
    def up(v):
        return H.fmt_num((v / price - 1) * 100, "pct") if isinstance(v, (int, float)) and price else "--"
    names = {"bear": lab["bear"], "base": lab["base"], "bull": lab["bull"]}
    rows, bolds = [], []
    num = den = 0
    for s in d.get("scenarios", []):
        nm = str(s.get("name", "")).lower()
        p_ = s.get("prob")
        rows.append([names.get(nm, s.get("name", "")), money(s.get("value")), up(s.get("value")), f"{p_}%" if p_ is not None else ""])
        bolds.append(nm == "base")
        if isinstance(s.get("value"), (int, float)) and isinstance(p_, (int, float)):
            num += s["value"] * p_; den += p_
    total = [lab["pw"], money(num / den), up(num / den), ""] if den and d.get("show_weighted", True) else None
    base = next((s.get("value") for s in d.get("scenarios", []) if str(s.get("name", "")).lower() == "base"), None)
    notes = []
    if d.get("wacc") or d.get("terminal_growth"):
        notes.append(f"{lab['wacc']} {d.get('wacc', '--')} · {lab['tg']} {d.get('terminal_growth', '--')}" + (f" · {lab['horizon']} {d['horizon']}" if d.get("horizon") else ""))
    for key, lk in (("morningstar", "ms"), ("sp", "sp")):
        v = d.get(key)
        if isinstance(v, (int, float)):
            gap = f" ({lab['mine_vs']} {H.fmt_num((base / v - 1) * 100, 'pct')})" if isinstance(base, (int, float)) else ""
            notes.append(f"{lab[lk]} {money(v)}{gap}")
    notes += d.get("notes", [])
    return rows, bolds, total, notes


def block_bottom(doc, spec, lab):
    lw = 2.42
    rw = W - lw
    t = table(doc, [lw, rw], rows=1, mar=(0, 0, 0, 0), outer=10)
    L, R = t.rows[0].cells
    borders(L, right=6)
    # left: stacked tables separated by rules
    inner = lw - 0.14
    parts = []
    d = spec.get("dcf")
    price = (d or {}).get("price") or (spec.get("chart") or {}).get("last_price")
    cur = spec.get("currency_symbol", "$")
    if d:
        rows, bolds, total, notes = dcf_table_rows(d, lab, cur, price)
        title = d.get("title") or (lab["dcf"] + (f" | {d['as_of']}" if d.get("as_of") else ""))
        parts.append(("dcf", {"title": title, "columns": [lab["scenario"], lab["value"], lab["vs_px"], lab["prob"]], "rows": rows, "total_row": total, "notes": notes, "_bolds": bolds}))
    for key, deflt in (("kpi_tracker", lab["kpi"]), ("cagr", lab["cagr"]), ("financial_position", lab["fin"])):
        if spec.get(key):
            tt = dict(spec[key]); tt.setdefault("title", deflt); parts.append((key, tt))
    lt = table(L, [lw - 0.02], rows=len(parts), mar=(0, 0, 0, 0))
    sz = 6.05 * SCALE
    for i, (key, tt) in enumerate(parts):
        c = lt.rows[i].cells[0]
        margins(c, top=45, bottom=45, left=70, right=60)
        if i < len(parts) - 1:
            borders(c, bottom=6)
        if key == "dcf":
            _dcf_small(c, tt, inner, sz)
        else:
            small_table(c, tt, inner, sz, first_share=0.30, bold_last=(key == "kpi_tracker"))
    # right: leads + commentary
    margins(R, top=50, left=90, right=80, bottom=30)
    gap = 0.16
    colw = (rw - 0.24 - gap) / 2
    leads = spec.get("lead_paragraphs", [])
    ltab = table(R, [colw, gap, colw], rows=1, mar=(0, 0, 0, 0))
    for i, x in enumerate(leads[:2]):
        c = ltab.rows[0].cells[0 if i == 0 else 2]
        p = cell_p(c, "", 6.6 * SCALE, align="j", line=6.6 * SCALE * 1.26)
        text(p, "**" + x.get("label", "") + "** " + x.get("text", ""), 6.6 * SCALE)
        margins(c, bottom=50)
    for c in ltab.rows[0].cells:
        borders(c, bottom=6)
    tiny_spacer(R, 3)
    frame(t, top=False)
    comm = spec.get("commentary", [])
    half = (len(comm) + 1) // 2
    ctab = table(R, [colw, gap, colw], rows=1, mar=(0, 0, 0, 0))
    csz = 8.7 * SCALE * CSCALE
    for ci, chunk in enumerate((comm[:half], comm[half:])):
        c = ctab.rows[0].cells[0 if ci == 0 else 2]
        for j, x in enumerate(chunk):
            p = cell_p(c, "", csz, align="j", line=csz * 1.2, serif=True, new=j > 0, after=2.2)
            text(p, "**" + x["headline"] + "** " + x["body"], csz, serif=True)


def _dcf_small(cell, tt, width, size):
    bolds = tt.pop("_bolds", [])
    rows = tt["rows"]
    # render like small_table but with bold base row
    tcopy = dict(tt); tcopy["rows"] = []
    n = 4
    fw = width * 0.30
    widths = [fw] + [(width - fw) / 3] * 3
    lh = size * 1.28
    cell_p(cell, tt["title"], size * 1.08, True, line=size * 1.45)
    tb = table(cell, widths, rows=0, mar=(0, 0, 0, 25))
    def add(vals, bold=False, rule=False):
        r = tb.add_row(); row_height(r, lh + (2.2 if rule else 0))
        for i, c in enumerate(r.cells):
            c.width = Inches(widths[i])
            cell_p(c, vals[i] if i < len(vals) else "", size, bold, "l" if i == 0 else "r", line=lh); valign(c, "bottom")
            margins(c, top=28 if rule else 0, left=0 if i == 0 else 25, right=0)
            if rule: borders(c, top=4)
    add(tt["columns"], True)
    for r, b in zip(rows, bolds + [False] * len(rows)):
        add(r, b)
    if tt.get("total_row"):
        add(tt["total_row"], True, True)
    for nt in tt.get("notes", []):
        cell_p(cell, nt, size * 0.95, line=size * 1.25, new=True, before=0.6)


def block_footer(doc, spec):
    t = table(doc, [W - 1.2, 1.2], rows=1, mar=(0, 0, 0, 0))
    L, R = t.rows[0].cells
    for i, n in enumerate(spec.get("footnotes", [])):
        cell_p(L, n, 5.25 * SCALE, line=5.25 * SCALE * 1.22, new=i > 0, before=2 if i == 0 else 0)
    p = cell_p(R, spec.get("brand_mark", ""), 15, True, "r", line=17, before=3)
    valign(R, "bottom")


def build(spec, out_docx, tmp):
    lab = dict(H.L["en"]); lab.update(H.L.get(LANG, {})); lab.update(spec.get("labels", {}))
    doc = Document()
    sec = doc.sections[0]
    sec.page_width, sec.page_height = Inches(PAGE_W), Inches(PAGE_H)
    sec.orientation = WD_ORIENT.PORTRAIT
    sec.left_margin = sec.right_margin = Inches(MAR_X)
    sec.top_margin, sec.bottom_margin = Inches(MAR_T), Inches(MAR_B)
    sec.header_distance = sec.footer_distance = Inches(0.1)
    st = doc.styles["Normal"]; st.font.name = SANS; st.font.size = Pt(6)
    st.paragraph_format.space_after = Pt(0); st.paragraph_format.space_before = Pt(0)
    body = doc.element.body
    for p in list(body.findall(qn("w:p"))):
        body.remove(p)
    meta = doc.add_paragraph(); para_fmt(meta, line=9, after=3); text(meta, spec.get("meta_line", ""), 7.2, True)
    block_header(doc, spec, lab)
    block_top(doc, spec, lab, tmp)
    block_vc(doc, spec, lab)
    block_bottom(doc, spec, lab)
    block_footer(doc, spec)
    tiny_spacer(doc, 1)
    doc.core_properties.title = f'{spec["company"]["name"]} One Page'
    doc.core_properties.author = spec.get("brand_mark", "PYTHIA")
    ISSUES.clear()
    fit_nested_tables(doc.element.body)
    fix_order(doc.element.body)
    doc.save(out_docx)


def to_pdf(docx):
    soffice = shutil.which("soffice") or shutil.which("libreoffice")
    outdir = tempfile.mkdtemp()
    subprocess.run([soffice, "--headless", "--convert-to", "pdf", "--outdir", outdir, docx], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=240)
    pdf = os.path.join(outdir, os.path.splitext(os.path.basename(docx))[0] + ".pdf")
    info = subprocess.run(["pdfinfo", pdf], capture_output=True, text=True).stdout
    pages = int(re.search(r"Pages:\s+(\d+)", info).group(1))
    return pages, pdf


def bottom_whitespace(pdf):
    """Fraction of the page height left empty at the bottom (from a low-res raster)."""
    png = pdf[:-4] + "_probe"
    subprocess.run(["pdftoppm", "-r", "40", "-gray", "-singlefile", "-png", pdf, png], check=True)
    try:
        from PIL import Image
        im = Image.open(png + ".png").convert("L"); w, h = im.size; px = im.load()
        last = 0
        for y in range(h):
            if any(px[x, y] < 200 for x in range(0, w, 2)):
                last = y
        return 1 - last / h
    except Exception as e:
        print("probe failed:", e); return None


def column_gap(pdf, split_x_pt, anchor, foot_word=None):
    """Points by which the bottom-right column (commentary) ends above the bottom-left tables. >0 = room to grow."""
    import html as _h
    out = subprocess.run(["pdftotext", "-bbox", pdf, "-"], capture_output=True, text=True).stdout
    words = [(float(a), float(b), float(c), float(d), _h.unescape(w)) for a, b, c, d, w in
             re.findall(r'xMin="([\d.]+)" yMin="([\d.]+)" xMax="([\d.]+)" yMax="([\d.]+)">([^<]*)<', out)]
    ys = [y0 for x0, y0, x1, y1, w in words if w.startswith(anchor) and x0 > split_x_pt]
    if not ys:
        return None
    y_top = min(ys)
    # the footnotes sit below the frame: stop at the first footnote word
    limit = min((y0 for x0, y0, x1, y1, w in words if foot_word and w.startswith(foot_word) and y0 > y_top and x0 < 60), default=1e9)
    left = max((y1 for x0, y0, x1, y1, w in words if y_top - 2 <= y0 < limit - 1 and x1 < split_x_pt), default=None)
    right = max((y1 for x0, y0, x1, y1, w in words if y_top - 2 <= y0 < limit - 1 and x0 > split_x_pt), default=None)
    if left is None or right is None:
        return None
    return left - right


def qa_text(pdf, spec):
    """Text-level QA on the rendered PDF: things that went wrong before and must never reach the user again.
    - a header value that wraps onto two lines (e.g. '113.3' / 'B')
    - a VALUE CREATION unit or metric label that is clipped or missing (unit column squeezed out)
    Returns a list of problems (empty = clean)."""
    import html as _h
    out = subprocess.run(["pdftotext", "-bbox", pdf, "-"], capture_output=True, text=True).stdout
    # (x, baseline y, word): yMax lines up across Latin and CJK glyphs, yMin does not
    words = [(float(a), float(b), _h.unescape(w)) for a, b, w in re.findall(r'xMin="([\d.]+)" yMin="[\d.]+" xMax="[\d.]+" yMax="([\d.]+)">([^<]*)<', out)]
    toks = [w for _, _, w in words]
    probs = []
    for m in spec.get("header_metrics", []):
        v = str(m.get("value", ""))
        if v and v not in toks:
            probs.append(f"header value '{v}' is split or wrapped - shorten it or lower header_value_size_pt")
    groups = H.vc_rows(spec["value_creation"], LANG)
    # rebuild text lines (words grouped by baseline) and compare with spaces removed
    # cluster baselines within 1.2pt (Latin and CJK baselines in one cell differ by a few tenths of a point)
    lines, cur, last = [], [], None
    for x, y, w in sorted(words, key=lambda t: t[1]):
        if last is not None and y - last > 1.2:
            lines.append(cur); cur = []
        cur.append((x, w)); last = y
    if cur:
        lines.append(cur)
    flat = ["".join(w for _, w in sorted(v)) for v in lines]
    alltext = "".join(flat)
    for g in groups:
        for r in g:
            lab_ = str(r.get("metric", "")).replace(" ", "")
            if lab_ and lab_ not in alltext:
                probs.append(f"metric label '{r.get('metric')}' missing/clipped")
    # first-column labels of every small table (mix, KPI, CAGR, financial position) must appear in full
    for key in ("mix_table", "kpi_tracker", "cagr", "financial_position"):
        for row in (spec.get(key) or {}).get("rows", []) + [((spec.get(key) or {}).get("total_row") or [""])]:
            lab_ = str(row[0] if row else "").replace(" ", "")
            if lab_ and lab_ not in alltext:
                probs.append(f"{key} label '{row[0]}' missing/clipped - shorten it")
    units = [r.get("unit", "").replace(" ", "") for g in groups for r in g if r.get("unit")]
    for u in set(units):
        need = units.count(u)
        have = sum(1 for ln in flat if ln.endswith(u))
        if have < need:
            probs.append(f"unit '{u}' ends only {have} of {need} grid lines - unit column clipped")
    return probs


def main():
    global SCALE, CSCALE, LANG
    ap = argparse.ArgumentParser()
    ap.add_argument("spec")
    ap.add_argument("-o", "--out", required=True, help="output path without extension")
    ap.add_argument("--lang", choices=["en", "zh"])
    ap.add_argument("--png-dpi", type=int, default=200)
    a = ap.parse_args()
    spec = H.load_spec(a.spec)
    if a.lang:
        spec["lang"] = a.lang
    LANG = spec.get("lang", "en")
    site_spec = spec
    spec = H.localize(spec, LANG)
    out = a.out[:-5] if a.out.endswith(".docx") else a.out
    os.makedirs(os.path.dirname(os.path.abspath(out)) or ".", exist_ok=True)
    tmp = tempfile.mkdtemp()
    docx = out + ".docx"

    def attempt(s, cs):
        global SCALE, CSCALE
        SCALE, CSCALE = s, cs
        build(spec, docx, tmp)
        pages, pdf = to_pdf(docx)
        ws = bottom_whitespace(pdf) if pages == 1 else None
        print(f"scale={s:.2f} comm={cs:.2f} pages={pages} bottom_white={ws if ws is None else round(ws,3)}")
        return pages, pdf, ws

    s = 1.0
    pages, pdf, ws = attempt(s, 1.0)
    while pages > 1 and s > 0.72:
        s = round(s - 0.03, 2); pages, pdf, ws = attempt(s, 1.0)
    best = (s, 1.0, pdf)
    while pages == 1 and ws is not None and ws > 0.035 and s < 1.25:   # grow to fill the page
        s2 = round(s + 0.02, 2); p2, pdf2, ws2 = attempt(s2, 1.0)
        if p2 != 1: break
        s, pages, pdf, ws = s2, p2, pdf2, ws2; best = (s, 1.0, pdf)
    if pages > 1:
        print("WARNING: still more than one page — cut sidebar/commentary text or a table row.")
    # grow the commentary until it is as tall as the left tables
    split = (MAR_X + 2.42) * 72
    anchor = (spec.get("lead_paragraphs") or [{}])[0].get("label", "CAPITAL")[:4]
    fw = (spec.get("footnotes") or [""])[0].split(" ")[0][:6] or None
    cs = 1.0
    gap = column_gap(best[2], split, anchor, fw) if pages == 1 else None
    print("commentary gap pt:", gap)
    while gap is not None and gap > 8 and cs < 1.10:
        cs2 = round(cs + 0.03, 2); p2, pdf2, ws2 = attempt(best[0], cs2)
        g2 = column_gap(pdf2, split, anchor, fw) if p2 == 1 else None
        if p2 != 1 or g2 is None or g2 < -2:
            break
        cs, gap = cs2, g2; best = (best[0], cs, pdf2)
    if gap is not None and gap > 25:
        print(f"HINT: commentary ends ~{gap:.0f}pt above the left tables - add ~{gap/10*9:.0f} words (EN) / {gap/10*14:.0f} characters (ZH).")
    if gap is not None and gap < -4:
        print(f"HINT: commentary runs {-gap:.0f}pt below the left tables - shorten it.")
    SCALE, CSCALE, pdf = best
    build(spec, docx, tmp)
    pages, pdf = to_pdf(docx)
    shutil.copy(pdf, out + ".pdf")
    subprocess.run(["pdftoppm", "-png", "-r", str(a.png_dpi), "-singlefile", out + ".pdf", out], check=True)
    for i in sorted(set(ISSUES)):
        print("QA fixed:", i)
    probs = qa_text(out + ".pdf", spec)
    for pr in probs:
        print("QA PROBLEM:", pr)
    if not probs:
        print("QA text checks: clean")
    print("wrote", docx, out + ".pdf", out + ".png")
    p = H.site_entry(dict(spec, website=site_spec.get("website")), out)
    if p:
        print("wrote", p)


if __name__ == "__main__":
    main()
