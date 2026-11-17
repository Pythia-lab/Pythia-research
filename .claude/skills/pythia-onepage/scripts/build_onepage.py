#!/usr/bin/env python3
"""
Render a PYTHIA V2 "One Page" equity research sheet from a JSON spec.

    python build_onepage.py spec.json -o Out/Name_OnePage_en   [--html-only] [--png-dpi 200]

Writes  <out>.html, <out>.pdf (US Letter, exactly one page) and <out>.png (for the website).
If the spec has a "website" block, also writes <out>_site_entry.js (a companies.js entry).

A spec may inherit from another with  "base": "other_spec.json"  (deep merge; lists are replaced),
which is how the Chinese sheet reuses all numbers of the English one and only overrides text.

Only the Python standard library is needed to build the HTML. PDF/PNG need a Chromium:
Node + Playwright (preferred), or a chromium/chrome binary on PATH (or $CHROME).
"""
import argparse, base64, copy, html, json, math, os, re, shutil, subprocess, sys, tempfile

HERE = os.path.dirname(os.path.abspath(__file__))
FONTS = os.path.join(HERE, "..", "assets", "fonts")

# ----------------------------------------------------------------------------- labels
L = {
    "en": {
        "chain": "HOW IT EARNS CASH | BUSINESS CHAIN", "vc": "VALUE CREATION", "groups": "6 Groups", "unit": "Unit",
        "kpi": "CORE KPI TRACKER", "cagr": "COMPOUND ANNUAL GROWTH RATE", "fin": "FINANCIAL POSITION",
        "dcf": "DCF VALUATION", "sr": "SHAREHOLDER RETURN", "high": "High:", "low": "Low:",
        "ocf_leg": "OCF / sh", "fcf_leg": "FCF / sh", "cap_ret": "CAPITAL RETURNS:", "net_sh": "NET SHARES:",
        "scenario": "Scenario", "value": "$/sh", "vs_px": "vs price", "prob": "Prob.", "pw": "Prob.-weighted",
        "wacc": "WACC", "tg": "Terminal g", "ms": "Morningstar FV", "sp": "S&P FV", "mine_vs": "Mine vs",
        "bear": "Bear", "base": "Base", "bull": "Bull", "horizon": "Horizon", "price": "Price",
        "hm": [["Mkt", "Cap"], ["Stock", "Price"], ["Book", "Value"], ["P/E", "Ratio"], ["P/FCF", "Ratio"], ["Div", "Yield"]],
    },
    "zh": {
        "chain": "现金生成路径", "vc": "价值创造", "groups": "6类指标", "unit": "单位",
        "kpi": "核心KPI", "cagr": "复合年增长率 | CAGR", "fin": "财务状况",
        "dcf": "DCF估值", "sr": "股东总回报", "high": "高：", "low": "低：",
        "ocf_leg": "OCF /股", "fcf_leg": "FCF /股", "cap_ret": "现金分配：", "net_sh": "净股数变化：",
        "scenario": "情景", "value": "每股价值", "vs_px": "较现价", "prob": "概率", "pw": "概率加权",
        "wacc": "WACC", "tg": "永续增长率", "ms": "Morningstar FV", "sp": "S&P FV", "mine_vs": "我的 vs",
        "bear": "悲观", "base": "基准", "bull": "乐观", "horizon": "预测期", "price": "现价",
        "hm": [["最新", "市值"], ["最新", "股价"], ["账面", "价值"], ["P/E", "倍数"], ["P/FCF", "倍数"], ["股息", "收益率"]],
    },
}

# Standard VALUE CREATION rows: key -> (en label, zh label, unit, fmt). "$" in unit = money unit ($B/$M).
STD = {
    "revenue": ("Revenue", "营收", "$", "auto"), "rev_yoy": ("Rev. YoY", "营收同比", "%", "pct"),
    "gross_margin": ("Gross Margin", "毛利率", "%", "pct"),
    "op_income": ("Op. Income", "营业利润", "$", "auto"), "op_margin": ("Op. Margin", "营业利润率", "%", "pct"),
    "net_income": ("Net Income", "净利润", "$", "auto"), "net_margin": ("Net Margin", "净利率", "%", "pct"),
    "ocf": ("OCF", "OCF", "$", "auto"), "ocf_margin": ("OCF Margin", "OCF/营收", "%", "pct"),
    "ocf_ni": ("OCF / Net Inc.", "OCF/净利润", "x", "x2"),
    "capex": ("Capex", "资本开支", "$", "auto"), "capex_ocf": ("Capex / OCF", "资本开支/OCF", "%", "pct"),
    "fcf": ("FCF", "FCF", "$", "auto"), "fcf_margin": ("FCF Margin", "FCF/营收", "%", "pct"),
    "acq": ("Acq. + Intangibles", "收购+无形资产", "$", "auto"), "acq_ocf": ("Acq. / OCF", "收购/OCF", "%", "pct"),
    "sbc": ("SBC Expense", "股权激励费用", "$", "auto"), "sbc_ocf": ("SBC / OCF", "SBC/OCF", "%", "pct"),
    "buybacks": ("Repurchases", "股票回购", "$", "auto"), "buybacks_ocf": ("Repurchases / OCF", "回购/OCF", "%", "pct"),
    "dividends": ("Dividends", "现金股息", "$", "auto"), "dividends_ocf": ("Dividends / OCF", "股息/OCF", "%", "pct"),
    "roic": ("ROIC", "ROIC", "%", "pct"), "roe": ("ROE", "ROE", "%", "pct"), "roa": ("ROA", "ROA", "%", "pct"),
    "shares": ("Shares Out.", "流通股数", "sh", "auto"), "rev_ps": ("Revenue / Sh.", "每股营收", "$/sh", "auto"),
    "eps": ("Diluted EPS", "稀释EPS", "$/sh", "auto"), "ocf_ps": ("OCF / Sh.", "每股OCF", "$/sh", "auto"),
    "capex_ps": ("Capex / Sh.", "每股资本开支", "$/sh", "auto"), "fcf_ps": ("FCF / Sh.", "每股FCF", "$/sh", "auto"),
    "div_ps": ("Dividend / Sh.", "每股股息", "$/sh", "auto"),
    "avg_pe": ("Avg. P/E", "平均P/E", "x", "x"), "fcf_yield": ("FCF Yield", "FCF收益率", "%", "pct"),
    "div_yield": ("Dividend Yield", "股息率", "%", "pct"),
}


# ----------------------------------------------------------------------------- helpers
def deep_merge(a, b):
    out = copy.deepcopy(a)
    for k, v in b.items():
        if isinstance(v, dict) and isinstance(out.get(k), dict):
            out[k] = deep_merge(out[k], v)
        else:
            out[k] = copy.deepcopy(v)
    return out


def load_spec(path):
    with open(path, encoding="utf-8") as f:
        spec = json.load(f)
    if spec.get("base"):
        bp = spec["base"]
        if not os.path.isabs(bp):
            bp = os.path.join(os.path.dirname(os.path.abspath(path)), bp)
        spec = deep_merge(load_spec(bp), {k: v for k, v in spec.items() if k != "base"})
    return spec


def localize(obj, lang):
    """Any dict whose keys are only 'en'/'zh' becomes the string for `lang` (falls back to the other)."""
    if isinstance(obj, dict):
        if obj and set(obj) <= {"en", "zh"}:
            v = obj.get(lang)
            return v if v not in (None, "") else next((x for x in obj.values() if x not in (None, "")), "")
        return {k: (v if k == "website" else localize(v, lang)) for k, v in obj.items()}
    if isinstance(obj, list):
        return [localize(x, lang) for x in obj]
    return obj


def rich(s):
    """Escape, then **bold**, and keep explicit line breaks."""
    s = html.escape(str(s if s is not None else ""))
    s = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", s)
    return s.replace("\n", "<br>")


def rich_plain(v):
    return "" if v is None else str(v)


def strip0(s):
    # house style: drop the leading zero  (0.62 -> .62, -0.6% -> -.6%)
    return re.sub(r"(^|[-−(])0\.", r"\1.", s)


def fmt_num(v, fmt="auto", sep=False, paren=False):
    if v is None or v == "":
        return "--"
    if isinstance(v, str):
        return v
    neg = v < 0
    a = abs(v)
    if fmt in ("pct", "pct1"):
        s, suf = f"{a:.1f}", "%"
    elif fmt == "pct0":
        s, suf = f"{a:.0f}", "%"
    elif fmt == "pct2":
        s, suf = f"{a:.2f}", "%"
    elif fmt == "x":
        s, suf = f"{a:.1f}", "x"
    elif fmt == "x2":
        s, suf = f"{a:.2f}" if a < 10 else f"{a:.1f}", "x"
    elif fmt == "int":
        s, suf = f"{a:,.0f}" if sep else f"{a:.0f}", ""
    elif fmt in ("0", "1", "2", "3"):
        d = int(fmt)
        s, suf = (f"{a:,.{d}f}" if sep else f"{a:.{d}f}"), ""
    else:  # auto: decimals shrink as magnitude grows
        d = 0 if a >= 10000 else (1 if a >= 1000 else 2)   # ~4 significant digits, as in the reference sheets
        s, suf = (f"{a:,.{d}f}" if sep else f"{a:.{d}f}"), ""
    s = strip0(s) + suf
    if neg:
        return f"({s})" if paren else "-" + s
    return s


def font_face_css():
    faces = [
        ("PYCond", "roboto-condensed-latin-400-normal.woff2", 400, "woff2"),
        ("PYCond", "roboto-condensed-latin-700-normal.woff2", 700, "woff2"),
        ("PYCondExt", "roboto-condensed-latin-ext-400-normal.woff2", 400, "woff2"),
        ("PYCondExt", "roboto-condensed-latin-ext-700-normal.woff2", 700, "woff2"),
        ("PYName", "anton-latin-400-normal.woff2", 400, "woff2"),
        ("PYSerif", "texgyreschola-regular.otf", 400, "opentype"),
        ("PYSerif", "texgyreschola-bold.otf", 700, "opentype"),
    ]
    out = []
    for fam, fn, w, kind in faces:
        p = os.path.join(FONTS, fn)
        if not os.path.exists(p):
            continue
        b64 = base64.b64encode(open(p, "rb").read()).decode()
        mime = "font/woff2" if kind == "woff2" else "font/otf"
        out.append(f"@font-face{{font-family:'{fam}';src:url(data:{mime};base64,{b64}) format('{kind}');font-weight:{w};}}")
    return "\n".join(out)


# ----------------------------------------------------------------------------- small tables
def small_table(t, cls=""):
    if not t:
        return ""
    cols = t.get("columns", [])
    h = [f'<table class="st {cls}">']
    if t.get("title"):
        h.append(f'<tr><th class="st-title" colspan="{max(len(cols),1)}">{rich(t["title"])}</th></tr>')
    if cols:
        h.append("<tr class='st-head'>" + "".join(f"<th>{rich(c)}</th>" for c in cols) + "</tr>")
    bold_last = t.get("bold_last_col", False)
    for r in t.get("rows", []):
        cells = []
        for i, c in enumerate(r):
            cl = "l" if i == 0 else ("b" if bold_last and i == len(r) - 1 else "")
            cells.append(f'<td class="{cl}">{rich(c)}</td>')
        h.append("<tr>" + "".join(cells) + "</tr>")
    if t.get("total_row"):
        h.append("<tr class='st-total'>" + "".join(f'<td class="{"l" if i == 0 else ""}">{rich(c)}</td>' for i, c in enumerate(t["total_row"])) + "</tr>")
    for n in t.get("notes", []) or ([t["note"]] if t.get("note") else []):
        h.append(f'<tr><td class="st-note" colspan="{max(len(cols),1)}">{rich(n)}</td></tr>')
    h.append("</table>")
    return "".join(h)


def dcf_table(d, lab, cur, price):
    """DCF VALUATION block: scenarios + key inputs + external fair values."""
    if not d:
        return ""
    def money(v):
        return "--" if v in (None, "") else (v if isinstance(v, str) else f"{cur}{v:,.2f}")
    def up(v):
        if not isinstance(v, (int, float)) or not price:
            return "--"
        return fmt_num((v / price - 1) * 100, "pct")
    title = d.get("title") or (lab["dcf"] + (f" | {d['as_of']}" if d.get("as_of") else ""))
    h = [f'<table class="st dcf"><tr><th class="st-title" colspan="4">{rich(title)}</th></tr>',
         f"<tr class='st-head'><th>{lab['scenario']}</th><th>{lab['value']}</th><th>{lab['vs_px']}</th><th>{lab['prob']}</th></tr>"]
    scen = d.get("scenarios", [])
    names = {"bear": lab["bear"], "base": lab["base"], "bull": lab["bull"]}
    pw_num = pw_den = 0
    for s in scen:
        nm = names.get(str(s.get("name", "")).lower(), s.get("name", ""))
        is_base = str(s.get("name", "")).lower() == "base"
        p = s.get("prob")
        if isinstance(s.get("value"), (int, float)) and isinstance(p, (int, float)):
            pw_num += s["value"] * p; pw_den += p
        h.append(f"<tr class='{ 'b' if is_base else ''}'><td class='l'>{rich(nm)}</td><td>{money(s.get('value'))}</td>"
                 f"<td>{up(s.get('value'))}</td><td>{'' if p is None else str(p) + '%'}</td></tr>")
    if pw_den and d.get("show_weighted", True):
        pw = pw_num / pw_den
        h.append(f"<tr class='st-total'><td class='l'>{lab['pw']}</td><td>{money(pw)}</td><td>{up(pw)}</td><td></td></tr>")
    base = next((s.get("value") for s in scen if str(s.get("name", "")).lower() == "base"), d.get("fair_value"))
    rows = []
    if d.get("wacc") or d.get("terminal_growth"):
        rows.append(f"{lab['wacc']} {d.get('wacc','--')} · {lab['tg']} {d.get('terminal_growth','--')}"
                    + (f" · {lab['horizon']} {d['horizon']}" if d.get("horizon") else ""))
    ext = []
    for key, lk in (("morningstar", "ms"), ("sp", "sp")):
        v = d.get(key)
        if isinstance(v, (int, float)):
            gap = f" ({lab['mine_vs']} {fmt_num((base / v - 1) * 100, 'pct')})" if isinstance(base, (int, float)) else ""
            ext.append(f"{lab[lk]} {money(v)}{gap}")
    rows += ext
    rows += d.get("notes", [])
    for r in rows:
        h.append(f"<tr><td class='st-note' colspan='4'>{rich(r)}</td></tr>")
    h.append("</table>")
    return "".join(h)


# ----------------------------------------------------------------------------- chart (SVG)
def nice_step(span, n=5):
    raw = span / max(n, 1)
    p = 10 ** math.floor(math.log10(raw)) if raw > 0 else 1
    for m in (1, 2, 2.5, 5, 10):
        if raw <= m * p:
            return m * p
    return 10 * p


def log_ticks(lo, hi):
    cands = []
    for k in range(-2, 7):
        for m in (1, 2, 2.5, 5):
            v = m * 10 ** k
            if lo <= v <= hi:
                cands.append(v)
    while len(cands) > 7:  # thin out
        cands = cands[::2]
    return cands


def tick_lbl(v):
    return (f"{v:.1f}".rstrip("0").rstrip(".") if v < 10 else f"{v:,.0f}")


def chart_svg(ch, lab, W, H):
    """Price (right, log) vs OCF/sh & FCF/sh (left, linear). W,H in pt."""
    xl = ch.get("x_labels") or [str(y)[-2:] for y in ch.get("years", [])]
    n = len(xl)
    if n == 0:
        return ""
    strip_h = 22 if ch.get("high") else 0
    left_ax, right_ax, bottom_ax = 15, 22, 12
    px0, px1 = left_ax, W - right_ax
    py0, py1 = strip_h + 4, H - bottom_ax
    slot = (px1 - px0) / n
    xs = lambda i: px0 + slot * (i + 0.5)
    o = [f'<svg class="chart" viewBox="0 0 {W:.1f} {H:.1f}" style="width:100%;height:auto;display:block" xmlns="http://www.w3.org/2000/svg">']
    t = lambda x, y, s, size=5.6, anchor="middle", weight=400, fam="PYCond, PYCondExt, 'Noto Sans CJK SC', sans-serif", fill="#000": (
        f'<text x="{x:.2f}" y="{y:.2f}" font-size="{size}" text-anchor="{anchor}" font-weight="{weight}" font-family="{fam}" fill="{fill}">{html.escape(str(s))}</text>')
    # High / Low strip
    if strip_h:
        o.append(t(1, 9, lab["high"], 5.6, "start")); o.append(t(1, 17, lab["low"], 5.6, "start"))
        for i in range(n):
            x = px0 + slot * i
            o.append(f'<rect x="{x:.2f}" y="1" width="{slot:.2f}" height="{strip_h-2}" fill="none" stroke="#000" stroke-width=".35"/>')
            hi = ch["high"][i] if i < len(ch["high"]) else None
            lo = ch["low"][i] if i < len(ch.get("low", [])) else None
            if hi is not None: o.append(t(xs(i), 9, fmt_num(hi, ch.get("strip_fmt", "1")), 5.4))
            if lo is not None: o.append(t(xs(i), 17.5, fmt_num(lo, ch.get("strip_fmt", "1")), 5.4))
    # price scale (right, log by default)
    prices = []
    for m in ch.get("monthly", []) or []:
        prices += [m[1], m[2]]
    prices += [v for v in (ch.get("high") or []) if v] + [v for v in (ch.get("low") or []) if v]
    if ch.get("last_price"): prices.append(ch["last_price"])
    prices = [p for p in prices if isinstance(p, (int, float)) and p > 0]
    use_log = ch.get("log", True)
    plo = ch.get("price_min") or (min(prices) * 0.85 if prices else 1)
    phi = ch.get("price_max") or (max(prices) * 1.12 if prices else 10)
    if use_log:
        ticks = ch.get("price_ticks") or log_ticks(plo, phi)
        if ticks: plo, phi = min(plo, ticks[0]), max(phi, ticks[-1])
        py = lambda v: py1 - (math.log(v) - math.log(plo)) / (math.log(phi) - math.log(plo)) * (py1 - py0)
    else:
        st = nice_step(phi - plo); plo = math.floor(plo / st) * st; phi = math.ceil(phi / st) * st
        ticks = ch.get("price_ticks") or [plo + st * k for k in range(int(round((phi - plo) / st)) + 1)]
        py = lambda v: py1 - (v - plo) / (phi - plo) * (py1 - py0)
    # cash scale (left, linear)
    cash = [v for v in (ch.get("ocf_ps") or []) + (ch.get("fcf_ps") or []) if isinstance(v, (int, float))]
    cmax = ch.get("cash_max") or (max(cash) * 1.15 if cash else 1)
    cmin = ch.get("cash_min", 0 if not cash or min(cash) >= 0 else min(cash) * 1.15)
    cst = nice_step(cmax - cmin, 3)
    cmax = math.ceil(cmax / cst) * cst; cmin = math.floor(cmin / cst) * cst
    cy = lambda v: py1 - (v - cmin) / (cmax - cmin) * (py1 - py0)
    # frame + grid
    o.append(f'<rect x="{px0:.2f}" y="{py0:.2f}" width="{px1-px0:.2f}" height="{py1-py0:.2f}" fill="none" stroke="#000" stroke-width=".5"/>')
    for i in range(1, n):
        x = px0 + slot * i
        o.append(f'<line x1="{x:.2f}" x2="{x:.2f}" y1="{py0:.2f}" y2="{py1:.2f}" stroke="#bdbdbd" stroke-width=".3"/>')
    for v in ticks:
        y = py(v)
        if py0 - .1 <= y <= py1 + .1:
            o.append(f'<line x1="{px0:.2f}" x2="{px1:.2f}" y1="{y:.2f}" y2="{y:.2f}" stroke="#9e9e9e" stroke-width=".3"/>')
            o.append(t(px1 + 3, y + 2, tick_lbl(v), 5.6, "start"))
    k = cmin
    while k <= cmax + 1e-9:
        o.append(t(px0 - 3, cy(k) + 2, tick_lbl(k) if k else "0", 5.6, "end")); k += cst
    for i, s in enumerate(xl):
        o.append(t(xs(i), py1 + 8.5, s, 5.8))
    # price marks
    if ch.get("monthly"):
        for m in ch["monthly"]:  # [x (year index + fraction), high, low, close?]
            x = px0 + slot * m[0]
            o.append(f'<line x1="{x:.2f}" x2="{x:.2f}" y1="{py(m[1]):.2f}" y2="{py(m[2]):.2f}" stroke="#000" stroke-width=".45"/>')
            if len(m) > 3 and m[3]:
                o.append(f'<line x1="{x:.2f}" x2="{x+slot*0.035:.2f}" y1="{py(m[3]):.2f}" y2="{py(m[3]):.2f}" stroke="#000" stroke-width=".4"/>')
    elif ch.get("high"):
        for i in range(n):
            hi = ch["high"][i] if i < len(ch["high"]) else None
            lo = ch["low"][i] if i < len(ch["low"]) else None
            if hi and lo:
                o.append(f'<line x1="{xs(i):.2f}" x2="{xs(i):.2f}" y1="{py(hi):.2f}" y2="{py(lo):.2f}" stroke="#000" stroke-width="2.2"/>')
    # cash lines
    def path(vals, dash):
        pts = [(xs(i), cy(v)) for i, v in enumerate(vals) if isinstance(v, (int, float))]
        if len(pts) < 2: return ""
        d = "M" + " L".join(f"{x:.2f} {y:.2f}" for x, y in pts)
        da = ' stroke-dasharray="3 1.6"' if dash else ""
        dots = "".join(f'<circle cx="{x:.2f}" cy="{y:.2f}" r=".7" fill="#000"/>' for x, y in pts) if ch.get("dots") else ""
        return f'<path d="{d}" fill="none" stroke="#000" stroke-width=".9"{da}/>' + dots
    o.append(path(ch.get("ocf_ps") or [], False)); o.append(path(ch.get("fcf_ps") or [], True))
    # split / event annotations
    for a in ch.get("annotations", []):
        x = px0 + slot * a["x"]
        y = py0 + 7 + a.get("dy", 0)
        o.append(f'<line x1="{x:.2f}" x2="{x:.2f}" y1="{py0+2:.2f}" y2="{py0+9:.2f}" stroke="#555" stroke-width=".4"/>')
        right = x > px1 - 60
        o.append(t(x - 2 if right else x + 2, y + 2, a["text"], 5.4, "end" if right else "start", fill="#555").replace("<text ", '<text stroke="#fff" stroke-width="1.6" paint-order="stroke" '))
    # last price on right axis
    if ch.get("last_price"):
        y = py(ch["last_price"])
        o.append(t(px1 + 3, y + 2.4, tick_lbl(ch["last_price"]) if ch["last_price"] >= 10 else f"{ch['last_price']:.2f}", 6.6, "start", 700))
    # shareholder return box
    tr = ch.get("total_return")
    if tr:
        pos = tr.get("pos", "tl")
        bw, bh = 72, 9 + 6.4 * (len(tr["rows"]) + 1)
        bx = px0 + 3 if pos.endswith("l") else px1 - bw - 3
        by = py0 + 3 if pos.startswith("t") else py1 - bh - 3
        o.append(f'<rect x="{bx:.2f}" y="{by:.2f}" width="{bw}" height="{bh:.2f}" fill="#fff" stroke="#000" stroke-width=".5"/>')
        o.append(t(bx + 2.5, by + 7, tr.get("title", lab["sr"]), 6.2, "start", 700))
        hy = by + 13
        o.append(t(bx + 34, hy, tr["headers"][0], 4.6, "middle", 700)); o.append(t(bx + 58, hy, tr["headers"][1], 4.6, "middle", 700))
        for j, r in enumerate(tr["rows"]):
            yy = hy + 6.4 * (j + 1)
            o.append(t(bx + 3, yy, r[0], 5.2, "start")); o.append(t(bx + 42, yy, r[1], 5.2, "end")); o.append(t(bx + 68, yy, r[2], 5.2, "end"))
    o.append("</svg>")
    return "".join(o)


# ----------------------------------------------------------------------------- value creation grid
def vc_rows(vc, lang):
    money_unit = vc.get("money_unit", "$M")
    share_unit = vc.get("share_unit", "M sh")
    groups = []
    for g in vc["groups"]:
        rows = []
        for r in g:
            r = dict(r)
            if r.get("key") in STD:
                en, zh, unit, fmt = STD[r["key"]]
                r.setdefault("metric", zh if lang == "zh" else en)
                r.setdefault("unit", money_unit if unit == "$" else (share_unit if unit == "sh" else unit))
                r.setdefault("fmt", fmt)
            rows.append(r)
        groups.append(rows)
    return groups


def vc_table(vc, lang, lab):
    cols = vc["columns"]
    n = len(cols)
    hl = vc.get("highlight_col", n - 1 if vc.get("highlight_last", True) else None)
    groups = vc_rows(vc, lang)
    total_rows = sum(len(g) for g in groups)
    sep, paren = vc.get("thousands_sep", False), vc.get("paren_negatives", False)
    h = ['<table class="vc">', "<colgroup>", f'<col style="width:{vc.get("sidebar_pct", 13.6)}%">']
    h += [f"<col>" for _ in cols]
    h += [f'<col style="width:{vc.get("metric_pct", 10.6)}%">', f'<col style="width:{vc.get("unit_pct", 3.2)}%">', "</colgroup>"]
    h.append(f'<tr class="vc-head"><th class="vc-title">{rich(vc.get("title", lab["vc"]))}</th>' +
             "".join(f'<th class="yr{" hl" if i == hl else ""}">{html.escape(str(c))}</th>' for i, c in enumerate(cols)) +
             f'<th class="vc-groups">{rich(vc.get("groups_label", lab["groups"]))}</th><th class="vc-unit">{lab["unit"]}</th></tr>')
    side = sidebar_html(vc.get("sidebar", []))
    first = True
    for gi, g in enumerate(groups):
        for ri, r in enumerate(g):
            cls = "gstart" if ri == 0 and gi > 0 else ""
            row = [f'<tr class="{cls}">']
            if first:
                row.append(f'<td class="side" rowspan="{total_rows}">{side}</td>')
                first = False
            vals = r.get("values", [])
            for i in range(n):
                v = vals[i] if i < len(vals) else None
                s = fmt_num(v, r.get("fmt", "auto"), r.get("sep", sep), r.get("paren", paren))
                row.append(f'<td class="n{" hl" if i == hl else ""}">{html.escape(s)}</td>')
            row.append(f'<td class="metric">{rich(r.get("metric", ""))}</td><td class="unit">{html.escape(r.get("unit", ""))}</td></tr>')
            h.append("".join(row))
    h.append("</table>")
    return "".join(h)


def sidebar_html(blocks):
    out = []
    for i, b in enumerate(blocks):
        if b.get("final"):
            out.append(f'<div class="sb-final"><div class="sb-t">{rich(b["title"])}</div><div class="sb-x">{rich(b.get("text",""))}</div></div>')
            continue
        arrow = '<span class="sb-arrow">↓</span>' if i > 0 else ""
        sub = ""
        if b.get("sub"):
            sub = '<div class="sb-tree">' + "".join(
                f'<div class="sb-sub"><div class="sb-st">{rich(s["title"])}</div><div class="sb-x">{rich(s.get("text",""))}</div></div>'
                for s in b["sub"]) + "</div>"
        out.append(f'<div class="sb-b">{arrow}<div class="sb-t">{rich(b["title"])}</div>'
                   f'{"<div class=sb-x>" + rich(b["text"]) + "</div>" if b.get("text") else ""}{sub}</div>')
    return "".join(out)


# ----------------------------------------------------------------------------- page
CSS = r"""
@page { size: 8.5in 11in; margin: 0; }
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; background: #fff; }
body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.page { width: 8.5in; height: 11in; padding: .26in .58in .2in .58in; overflow: hidden; color: #000;
  font-family: PYCond, PYCondExt, 'Noto Sans CJK SC', 'WenQuanYi Zen Hei', sans-serif; font-size: calc(6.6pt * var(--s)); line-height: 1.12; }
:root { --s: 1; --vs: 1; --cs: 1; }
.meta { font-weight: 700; font-size: calc(7.2pt * var(--s)); margin: 0 0 4pt 1pt; }
.frame { border: 1.15pt solid #000; }
.hdr { display: flex; align-items: stretch; border-bottom: .6pt solid #000; height: .38in; }
.hdr .name { flex: 0 0 var(--namew, 31%); display: flex; align-items: flex-end; gap: 7pt; padding: 0 4pt 2pt 5pt; border-right: .6pt solid #000; overflow: hidden; }
.hdr .name b { font-family: PYName, 'Noto Sans CJK SC', sans-serif; font-weight: 400; font-size: var(--namesize, 25pt); line-height: .92; text-transform: uppercase; letter-spacing: -.2pt; white-space: nowrap; }
.hdr .name span { font-weight: 700; font-size: 9pt; white-space: nowrap; transform: translateY(-1pt); }
.hm { flex: 1 1 0; display: flex; align-items: center; justify-content: space-between; padding: 0 2pt 0 2.5pt; border-right: .6pt solid #000; min-width: 0; }
.hm:last-child { border-right: 0; }
.hm .l { font-size: 7pt; line-height: .98; font-weight: 400; white-space: nowrap; }
.hm .v { font-weight: 700; font-size: var(--hmsize, 18pt); letter-spacing: -.6pt; white-space: nowrap; transform: scaleX(.86); transform-origin: right center; }
.top { display: flex; border-bottom: .6pt solid #000; }
.top .left { flex: 0 0 36%; border-right: .6pt solid #000; padding: 3pt 5pt 2pt 5pt; display: flex; flex-direction: column; }
.top .right { flex: 1 1 auto; padding: 2pt 3pt 1pt 3pt; min-width: 0; }
.blk-title { font-weight: 700; font-size: calc(7.5pt * var(--s)); margin-bottom: 1.5pt; }
.chain p { margin: 0 0 .6pt; font-size: calc(7pt * var(--s)); }
.watch { margin-top: auto; padding-top: 3pt; font-size: calc(6.8pt * var(--s)); }
.legend { display: flex; justify-content: space-between; font-size: calc(6.3pt * var(--s)); padding: 1pt 4pt 0 14pt; }
.legend .ln { display: inline-block; width: 18pt; border-top: .9pt solid #000; vertical-align: middle; margin-right: 3pt; }
.legend .ln.d { border-top-style: dashed; }
table { border-collapse: collapse; }
table.st { width: 100%; font-size: calc(6.5pt * var(--s)); line-height: 1.08; }
table.st th, table.st td { padding: 0 0 0 2pt; text-align: right; white-space: nowrap; font-weight: 400; }
table.st th:first-child, table.st td.l { text-align: left; padding-left: 0; }
table.st .st-title { text-align: left; font-weight: 700; font-size: calc(7.1pt * var(--s)); padding: 0 0 .5pt; }
table.st .st-head th { font-weight: 700; }
table.st .st-total td { font-weight: 700; border-top: .6pt solid #000; }
table.st tr.b td { font-weight: 700; }
table.st td.b { font-weight: 700; }
table.st .st-note { text-align: left; white-space: normal; padding-left: 0; font-size: calc(6.3pt * var(--s)); }
.mix { margin-top: 5pt; }
table.vc { width: 100%; table-layout: fixed; font-size: calc(6.55pt * var(--vs)); line-height: 1.0; }
table.vc td, table.vc th { padding: 0 1.4pt 0 0; height: calc(8.45pt * var(--vs)); }
table.vc .vc-head th { background: #000; color: #fff; font-weight: 700; height: 10.5pt; font-size: calc(7.2pt * var(--vs)); }
table.vc .vc-title { text-align: left; padding-left: 5pt; }
table.vc th.yr { background: #fff; color: #000; border: .6pt solid #000; text-align: center; padding: 0; font-size: calc(7.4pt * var(--vs)); }
table.vc th.yr.hl { background: #d9d9d9; }
table.vc .vc-groups { font-size: calc(5.6pt * var(--vs)); text-align: left; padding-left: 3pt; white-space: nowrap; }
table.vc .vc-unit { text-align: right; padding-right: 2pt; }
table.vc td.n { text-align: right; border-left: .45pt solid #000; white-space: nowrap; overflow: hidden; }
table.vc td.hl { background: #d9d9d9; }
table.vc td.metric { font-weight: 700; border-left: .6pt solid #000; padding-left: 2pt; white-space: nowrap; overflow: hidden; }
table.vc td.unit { text-align: right; padding-right: 2pt; white-space: nowrap; }
table.vc tr.gstart td.n, table.vc tr.gstart td.metric, table.vc tr.gstart td.unit { border-top: .6pt solid #000; }
table.vc td.side { vertical-align: top; padding: 3pt 3pt 2pt 9pt; border-right: .6pt solid #000; line-height: 1.1; font-size: calc(6.9pt * var(--vs)); }
.sb-b { position: relative; margin-bottom: 2.5pt; }
.sb-arrow { position: absolute; left: -8pt; top: -.5pt; font-size: 7pt; }
.sb-t { font-weight: 700; text-transform: uppercase; }
.sb-st { font-weight: 700; text-transform: uppercase; }
.sb-tree { margin-left: 1pt; border-left: .5pt solid #000; padding-left: 0; }
.sb-sub { position: relative; padding-left: 5pt; margin: .6pt 0; }
.sb-sub::before { content: ""; position: absolute; left: 0; top: 4pt; width: 4pt; border-top: .5pt solid #000; }
.sb-final { border-top: .9pt solid #000; padding-top: 2pt; margin-top: 4pt; }
.bottom { display: flex; border-top: .9pt solid #000; }
.bottom .left { flex: 0 0 32%; border-right: .6pt solid #000; }
.bottom .left > div { padding: 2.5pt 4pt 2.5pt 4pt; border-bottom: .6pt solid #000; }
.bottom .left > div:last-child { border-bottom: 0; }
.bottom .right { flex: 1 1 auto; padding: 3pt 5pt 3pt 6pt; min-width: 0; }
.leads { display: grid; grid-template-columns: 1fr 1fr; column-gap: 12pt; padding-bottom: 3pt; border-bottom: .6pt solid #000; margin-bottom: 3pt; }
.leads p { margin: 0; text-align: justify; font-size: calc(6.9pt * var(--s)); line-height: 1.14; }
.comm { column-count: 2; column-gap: 12pt; column-fill: balance; }
.comm p { margin: 0 0 1.5pt; text-align: justify; font-family: PYSerif, 'Noto Serif CJK SC', serif; font-size: calc(9.15pt * var(--s) * var(--cs)); line-height: 1.1; break-inside: auto; }
.comm p b { font-family: PYSerif, 'Noto Sans CJK SC', serif; }
.foot { display: flex; justify-content: space-between; margin-top: 2pt; }
.foot .notes { font-size: calc(5.6pt * var(--s)); line-height: 1.12; }
.foot .brand { font-family: PYName, sans-serif; font-size: 15pt; letter-spacing: .5pt; align-self: flex-end; }
.lang-zh .comm p { font-family: PYSerif, 'Noto Serif CJK SC', serif; letter-spacing: .1pt; }
.lang-zh .hdr .name b { text-transform: none; }
.lang-zh .sb-t, .lang-zh .sb-st { text-transform: none; }
"""

FIT_JS = r"""
<script>
// Fit everything onto one Letter page: grow/shrink text until the frame fills the page.
window.__fit = function () {
  const page = document.querySelector('.page'), root = document.documentElement;
  const over = () => page.scrollHeight - page.clientHeight;
  let s = 1.0, vs = 1.0;
  const set = () => { root.style.setProperty('--s', s); root.style.setProperty('--vs', vs); };
  // balance the commentary columns
  const comm = document.querySelector('.comm');
  set();
  for (let i = 0; i < 40 && over() > 0; i++) { s -= 0.015; vs -= 0.008; set(); }
  for (let i = 0; i < 40 && over() <= 0; i++) { s += 0.01; vs += 0.006; set(); if (over() > 0) { s -= 0.01; vs -= 0.006; set(); break; } }
  // then let the commentary grow until the right column is as tall as the left one
  const L = document.querySelector('.bottom .left'), R = document.querySelector('.bottom .right');
  let cs = 1.0; const setc = () => root.style.setProperty('--cs', cs);
  const contentH = el => Array.from(el.children).reduce((h, c) => h + c.getBoundingClientRect().height, 0);
  for (let i = 0; i < 60; i++) {
    if (contentH(R) + 4 >= contentH(L) || over() > 0 || cs >= (window.__csMax || 1.12)) break;
    cs += 0.01; setc();
    if (over() > 0 || contentH(R) > contentH(L)) { cs -= 0.01; setc(); break; }
  }
  document.body.setAttribute('data-fit', JSON.stringify({ s: +s.toFixed(3), vs: +vs.toFixed(3), cs: +cs.toFixed(2), overflow: over(), gap_pt: Math.round((contentH(L) - contentH(R)) * 0.75), side_gap_pt: Math.round((document.querySelector('td.side').getBoundingClientRect().height - Array.from(document.querySelector('td.side').children).reduce((h, c) => h + c.getBoundingClientRect().height, 0)) * 0.75) }));
  return { s, vs, overflow: over() };
};
window.addEventListener('load', () => { document.fonts.ready.then(() => window.__fit()); });
</script>
"""


def build_html(spec):
    lang = spec.get("lang", "en")
    lab = dict(L["en"]); lab.update(L.get(lang, {}))
    lab.update(spec.get("labels", {}))
    cur = spec.get("currency_symbol", "$")
    co = spec["company"]
    hm_labels = lab["hm"]
    hms = spec.get("header_metrics") or []
    hm_html = []
    for i, m in enumerate(hms[:6]):
        lbl = m.get("label") or hm_labels[i] if i < len(hm_labels) else m.get("label", "")
        lines = lbl if isinstance(lbl, list) else str(lbl).split("\n")
        hm_html.append(f'<div class="hm"><div class="l">{"<br>".join(html.escape(x) for x in lines)}</div><div class="v">{html.escape(str(m["value"]))}</div></div>')
    styles = []
    if co.get("name_width_pct"): styles.append(f"--namew:{co['name_width_pct']}%")
    if co.get("name_size_pt"): styles.append(f"--namesize:{co['name_size_pt']}pt")
    if spec.get("header_value_size_pt"): styles.append(f"--hmsize:{spec['header_value_size_pt']}pt")

    bc = spec.get("business_chain", {})
    chain = "".join(f"<p>{rich(p)}</p>" for p in bc.get("lines", []))
    mix = small_table(spec.get("mix_table"), "mix")
    watch = f'<div class="watch">{rich(bc["watch"])}</div>' if bc.get("watch") else ""

    ch = spec.get("chart", {})
    chart_h = ch.get("height_pt", 150)
    chart_w = ch.get("width_pt", 343)
    chart = chart_svg(ch, lab, chart_w, chart_h) if ch else ""
    leg = ch.get("legend") or []
    legend = ""
    if leg or ch.get("note"):
        a = f'<span><span class="ln"></span>{html.escape(leg[0])}</span>' if len(leg) > 0 else "<span></span>"
        b = f'<span><span class="ln d"></span>{html.escape(leg[1])}</span>' if len(leg) > 1 else "<span></span>"
        legend = f'<div class="legend">{a}{b}<span>{html.escape(ch.get("note", ""))}</span></div>'

    vc = vc_table(spec["value_creation"], lang, lab)

    left_tables = []
    for key, deflt in (("kpi_tracker", lab["kpi"]), ("cagr", lab["cagr"]), ("financial_position", lab["fin"])):
        t = spec.get(key)
        if t:
            t = dict(t); t.setdefault("title", deflt)
            if key == "kpi_tracker": t.setdefault("bold_last_col", True)
            left_tables.append(small_table(t))
    price_val = spec.get("dcf", {}).get("price") or spec.get("chart", {}).get("last_price")
    if spec.get("dcf"):
        d = spec["dcf"]
        pos = d.get("position", "first")
        tbl = dcf_table(d, lab, cur, price_val)
        if pos == "first": left_tables.insert(0, tbl)
        elif pos == "last": left_tables.append(tbl)
        else: left_tables.insert(int(pos), tbl)
    for t in spec.get("extra_left_tables", []):
        left_tables.append(small_table(t))

    leads = spec.get("lead_paragraphs", [])
    lead_html = "".join(f'<p><b>{rich(x.get("label",""))}</b> {rich(x.get("text",""))}</p>' for x in leads)
    comm = "".join(f'<p><b>{rich(c["headline"])}</b> {rich(c["body"])}</p>' for c in spec.get("commentary", []))
    notes = "<br>".join(rich(n) for n in spec.get("footnotes", []))
    brand = spec.get("brand_mark", "")

    body = f"""
<div class="page lang-{lang}" style="{';'.join(styles)}">
  <div class="meta">{rich(spec.get('meta_line',''))}</div>
  <div class="frame">
    <div class="hdr"><div class="name"><b>{html.escape(co['name'])}</b><span>{html.escape(co.get('ticker',''))}</span></div>{''.join(hm_html)}</div>
    <div class="top">
      <div class="left"><div class="chain"><div class="blk-title">{rich(bc.get('title', lab['chain']))}</div>{chain}</div>{mix}{watch}</div>
      <div class="right">{chart}{legend}</div>
    </div>
    {vc}
    <div class="bottom">
      <div class="left">{''.join(f'<div>{t}</div>' for t in left_tables)}</div>
      <div class="right"><div class="leads">{lead_html}</div><div class="comm">{comm}</div></div>
    </div>
  </div>
  <div class="foot"><div class="notes">{notes}</div><div class="brand">{html.escape(brand)}</div></div>
</div>"""
    return f"""<!DOCTYPE html><html lang="{'zh-CN' if lang == 'zh' else 'en'}"><head><meta charset="utf-8">
<title>{html.escape(co['name'])} One Page</title><style>{font_face_css()}{CSS}</style></head><body>{body}{FIT_JS}</body></html>"""


# ----------------------------------------------------------------------------- render
RENDER_JS = r"""
const path = require('path');
let pw; try { pw = require('playwright'); } catch (e) { console.error('NO_PLAYWRIGHT'); process.exit(3); }
(async () => {
  const [htmlPath, pdfPath, pngPath, dpi] = process.argv.slice(2);
  const browser = await pw.chromium.launch(process.env.CHROME ? { executablePath: process.env.CHROME } : {});
  const page = await browser.newPage({ viewport: { width: 816, height: 1056 }, deviceScaleFactor: (+dpi || 200) / 96 });
  await page.goto('file://' + path.resolve(htmlPath));
  await page.waitForFunction(() => document.body.getAttribute('data-fit'), null, { timeout: 30000 });
  const fit = JSON.parse(await page.evaluate(() => document.body.getAttribute('data-fit')));
  console.log('fit ' + JSON.stringify(fit));
  if (fit.overflow > 0) console.log('WARNING: content overflows the page by ' + fit.overflow + 'px - cut text or rows.');
  if (fit.gap_pt > 25) console.log('HINT: commentary column is ' + fit.gap_pt + 'pt shorter than the left tables - add ~' + Math.round(fit.gap_pt / 11 * 9) + ' words (EN) / ' + Math.round(fit.gap_pt / 11 * 14) + ' characters (ZH) of commentary, or a KPI row.');
  if (fit.gap_pt < -6) console.log('HINT: commentary is ' + (-fit.gap_pt) + 'pt taller than the left tables - shorten it.');
  if (fit.side_gap_pt > 60) console.log('HINT: sidebar leaves ' + fit.side_gap_pt + 'pt empty - add detail to the sidebar blocks.');
  if (fit.side_gap_pt < 0) console.log('HINT: sidebar text is longer than the grid - shorten it.');
  await page.pdf({ path: pdfPath, width: '8.5in', height: '11in', printBackground: true, preferCSSPageSize: true });
  if (pngPath) await page.screenshot({ path: pngPath, fullPage: false });
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
"""


def render(html_path, pdf_path, png_path, dpi):
    js = os.path.join(tempfile.gettempdir(), "pythia_onepage_render.js")
    open(js, "w").write(RENDER_JS)
    node = shutil.which("node")
    if node:
        env = dict(os.environ)
        # let node find a globally installed playwright
        try:
            groot = subprocess.run(["npm", "root", "-g"], capture_output=True, text=True).stdout.strip()
            env["NODE_PATH"] = os.pathsep.join(filter(None, [env.get("NODE_PATH"), groot]))
        except Exception:
            pass
        r = subprocess.run([node, js, html_path, pdf_path, png_path or "", str(dpi)], capture_output=True, text=True, env=env)
        sys.stdout.write(r.stdout)
        if r.returncode == 0:
            return True
        sys.stderr.write(r.stderr[-800:])
    chrome = os.environ.get("CHROME") or next((shutil.which(c) for c in ("chromium", "chromium-browser", "google-chrome", "chrome") if shutil.which(c)), None)
    if not chrome:
        sys.stderr.write("No renderer: install Node Playwright (npm i -g playwright && npx playwright install chromium) or set $CHROME.\n")
        return False
    url = "file://" + os.path.abspath(html_path)
    subprocess.run([chrome, "--headless", "--no-sandbox", "--disable-gpu", "--virtual-time-budget=8000",
                    "--no-pdf-header-footer", f"--print-to-pdf={pdf_path}", url], capture_output=True)
    if png_path and shutil.which("pdftoppm"):
        subprocess.run(["pdftoppm", "-png", "-r", str(dpi), "-singlefile", pdf_path, png_path[:-4]])
    return os.path.exists(pdf_path)


# ----------------------------------------------------------------------------- website entry
def site_entry(spec, out_base):
    w = spec.get("website")
    if not w:
        return None
    d = spec.get("dcf", {})
    scen = {str(s.get("name", "")).lower(): s for s in d.get("scenarios", [])}
    rel = w.get("reports_dir", f"reports/{w['id']}")
    entry = {
        "id": w["id"], "name": w.get("name"), "ticker": spec["company"].get("ticker", "").split()[0],
        "exchange": w.get("exchange", ""), "market": w.get("market", "US"),
        "sector": w.get("sector", ""), "industry": w.get("industry", ""), "indices": w.get("indices", []),
        "updated": w.get("updated", ""), "currency": w.get("currency", "USD"),
        "price": d.get("price"), "priceDate": w.get("price_date", ""),
        "fairValue": {"mine": (scen.get("base") or {}).get("value"), "bear": (scen.get("bear") or {}).get("value"),
                      "bull": (scen.get("bull") or {}).get("value"), "morningstar": d.get("morningstar"), "sp": d.get("sp")},
        "moat": w.get("moat", ""), "summary": w.get("summary", ""), "tags": w.get("tags", []),
        "business": w.get("business", ""), "segments": w.get("segments", []),
        "dcf": {"wacc": d.get("wacc", ""), "terminalGrowth": d.get("terminal_growth", ""), "horizon": d.get("horizon", ""),
                "revenueCagr": w.get("revenue_cagr", ""), "margin": w.get("margin", ""),
                "scenarios": [{"name": s.get("name", "").capitalize(), "prob": s.get("prob"), "value": s.get("value")} for s in d.get("scenarios", [])]},
        "gap": w.get("gap", {}),
        "files": [f for f in w.get("files", [])],
        "onepageImage": w.get("onepage_image", ""),
        "history": w.get("history", []),
    }
    path = out_base + "_site_entry.js"
    with open(path, "w", encoding="utf-8") as f:
        f.write("// Paste into data/companies.js right after  window.COMPANIES = [\n")
        f.write(json.dumps(entry, ensure_ascii=False, indent=2) + ",\n")
    return path


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("spec")
    ap.add_argument("-o", "--out", required=True, help="output path without extension")
    ap.add_argument("--html-only", action="store_true")
    ap.add_argument("--png-dpi", type=int, default=200)
    ap.add_argument("--lang", choices=["en", "zh"], help="override spec lang (for bilingual specs)")
    a = ap.parse_args()
    spec = load_spec(a.spec)
    if a.lang:
        spec["lang"] = a.lang
    site_spec = spec
    spec = localize(spec, spec.get("lang", "en"))
    out = a.out[:-4] if a.out.lower().endswith((".pdf", ".png")) else a.out
    os.makedirs(os.path.dirname(os.path.abspath(out)), exist_ok=True)
    h = build_html(spec)
    with open(out + ".html", "w", encoding="utf-8") as f:
        f.write(h)
    print("wrote", out + ".html")
    if not a.html_only:
        ok = render(out + ".html", out + ".pdf", out + ".png", a.png_dpi)
        if ok:
            print("wrote", out + ".pdf", "and", out + ".png")
        else:
            sys.exit(2)
    p = site_entry(dict(spec, website=site_spec.get("website")), out)
    if p:
        print("wrote", p)


if __name__ == "__main__":
    main()
