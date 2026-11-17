---
name: pythia-onepage
description: Build a PYTHIA V2 "One Page" equity-research sheet — one dense US-Letter page (6-metric header, 5-step business chain, monthly price vs OCF/FCF-per-share chart, 15-year × 35-row VALUE CREATION grid in 6 groups with an arrowed cash-chain sidebar, KPI/CAGR/financial-position tables, a DCF VALUATION block with bear/base/bull and Morningstar/S&P fair values, capital-return lead paragraphs and six verdict paragraphs) — in English and Chinese, as an editable Word (.docx) master plus PDF + PNG ready to upload to the user's PYTHIA research website, plus the website's companies.js entry. Use this whenever the user uploads or mentions a company's DCF, Excel model, old One Page, PPT deck, 10-K notes or written analysis and wants a One Page / onepage / 一页纸 / 单页研报 / 公司速览 / Value-Line-style sheet, wants to "update the One Page", "make the One Page for GOOGL", or wants a company added to their research site — even if they don't name the format.  Supersedes onepage-report.
---

# PYTHIA One Page (V2)

A One Page answers one question in 60 seconds: *how does this business turn demand into cash per share, is that
improving, and what is it worth?* It is black-and-white, extremely dense, every number traceable, every sentence a
verdict. This version adds what the reference sheets never had: **the user's own DCF valuation and how it compares
with Morningstar and S&P**.

You do the extraction, analysis and writing; `scripts/build_onepage_docx.py` does the layout: an editable **Word
(.docx) master** (the user edits wording/numbers there and points at exact places to change), plus PDF and PNG
rendered from that .docx for the website. `scripts/build_onepage.py` is the shared library (spec loading, labels,
number formats, chart SVG, website entry) and an HTML/PDF fallback when LibreOffice is unavailable.

## Files

| File | Read when |
|---|---|
| `references/anatomy.md` | Always, before writing the spec — block-by-block layout, the fixed 35-row grid, Chinese labels. |
| `references/writing_style.md` | Always, before writing any prose (chain, sidebar, leads, commentary, footnotes), EN and ZH. |
| `references/extraction.md` | When the user gives you files (old One Page, DCF xlsx, PPT, memo, filings) — what to pull from each. |
| `references/input_schema.md` | While writing the JSON spec. |
| `references/website.md` | When delivering for the PYTHIA website (file names, folder, companies.js entry). |
| `assets/examples/cmg_en.json` + `cmg_zh.json` | A complete spec (Chipotle) — copy its shape. The zh file shows `"base"` inheritance. |
| `scripts/build_onepage_docx.py` | The Word renderer (default). Extend it only if a genuinely new block is needed. |
| `scripts/build_onepage.py` | Shared helpers + chart SVG; HTML→PDF fallback renderer. |

## Workflow

### 0. Environment check (once per session)
```bash
pip install -q python-docx pillow                  # Word builder
which soffice pdftoppm                              # LibreOffice + poppler render the .docx to PDF/PNG
node -e "require('playwright')" && echo ok        # draws the chart PNG; else: npm i -g playwright && npx playwright install chromium
fc-list | grep -q "Noto Serif CJK SC" || apt-get install -y fonts-noto-cjk fonts-texgyre   # preview fonts
```
The .docx uses Arial Narrow / Times New Roman / PingFang SC / Songti SC (present on macOS and with Office). For the
LibreOffice preview, map them to installed look-alikes once per session:
```bash
mkdir -p ~/.config/fontconfig && cat > ~/.config/fontconfig/fonts.conf <<'X'
<?xml version="1.0"?><!DOCTYPE fontconfig SYSTEM "fonts.dtd"><fontconfig>
<alias><family>Arial Narrow</family><prefer><family>TeX Gyre Heros Cn</family></prefer></alias>
<alias><family>PingFang SC</family><prefer><family>Noto Sans CJK SC</family></prefer></alias>
<alias><family>Songti SC</family><prefer><family>Noto Serif CJK SC</family></prefer></alias></fontconfig>
X
fc-cache -f
```
Latin fonts (condensed sans, heavy name face, Century-style serif) ship in `assets/fonts/` and are embedded
automatically.

### 1. Read everything the user gave you
See `references/extraction.md`. In short: list every file; read xlsx with `openpyxl` (`data_only=True`, all sheets),
pptx with `python-pptx`, pdf with `pdftotext -layout`, docx with `pandoc`. The user's own judgement (memo, PPT
conclusions, old One Page commentary) is the most valuable input — keep their conclusions, restate them in the house
voice, don't invent new theses.

Build one working table, FY(T-15)…FY(T): revenue (+ segments), gross/business-specific margin, operating income,
net income, OCF, capex (cash PP&E), FCF, acquisitions, SBC, buybacks, dividends, ROIC/ROE/ROA, diluted shares,
EPS, per-share OCF/capex/FCF/dividend, average P/E, FCF yield, dividend yield; plus FY21–25 KPIs, CAGRs and balance
sheet; plus yearly (ideally monthly) price high/low.

Derive what's missing (margins, YoY, FCF = OCF − cash PP&E, per-share values, payout ratios, CAGRs). Never invent an
input that can't be derived: write `--` (not available), `NM` (not meaningful) or `ND` (not disclosed) and footnote it.
If public filings are reachable (sec.gov, stockanalysis.com) you may fill historical gaps from them — say which.

### 2. Valuation block (always include)
The DCF VALUATION block is required. Take it from the user's DCF model or analysis:
bear / base / bull value per share (+ probabilities if given), WACC, terminal growth, horizon, valuation date,
Morningstar fair value, S&P fair value / target. Also capture the 2–4 assumptions that explain the gap between the
user's value and Morningstar's — they feed the last commentary paragraph and the website's gap analysis.
- No DCF in the inputs? Ask the user. If they want one built, use the `dcf-model` skill (if available) or build a
  simple FCF DCF from the working table, label it clearly as built by you, and show the key inputs.
- Morningstar / S&P values missing? Leave them `null` and tell the user — don't guess.

### 3. Write ONE bilingual spec
Follow `references/anatomy.md` and `references/writing_style.md`; schema in `references/input_schema.md`.
Write `<ticker>_onepage.json` next to the outputs. Any text field may be `{"en": "...", "zh": "..."}`, so one file
renders both languages (numbers are shared). Rules that matter most:
- VALUE CREATION = 15–16 fiscal years × the standard 35 rows in 6 groups (use `key`s; rename a row only for an
  industry-specific metric, e.g. `Rest. Level Margin*`, and footnote the `*`).
- Business chain = 5 numbered steps ending in cash; mix table; one "Watch:" line.
- Sidebar = 4–6 arrowed blocks walking the same chain with latest-year numbers, optional sub-paths, and a final
  RETURN CONDITION / RETURN TEST block.
- Commentary = exactly 6 paragraphs (bold verdict + evidence); the 6th is the valuation paragraph: what the base DCF
  requires and where/why it differs from Morningstar/S&P.
- Footnotes: data dates & scope first, definitions of every `*`, DCF source/date, sources last. No third-party
  branding, signatures or subscription icons — the only mark is `"brand_mark": "PYTHIA"`.

### 4. Render, read the hints, look at the PNG
```bash
python <skill>/scripts/build_onepage_docx.py spec.json --lang en -o out/<TICKER>_OnePage_en
python <skill>/scripts/build_onepage_docx.py spec.json --lang zh -o out/<TICKER>_OnePage_zh
```
Each run writes `.docx`, `.pdf`, `.png` (and `_site_entry.js`). A fit loop renders through LibreOffice and sets the
type scale so the sheet fills exactly one page, then grows the commentary (max +10%) toward the height of the
left-hand tables. Then act on the printed hints:
- `WARNING: content overflows` → cut sidebar/commentary words or a KPI row.
- `HINT: commentary column is Npt shorter…` → add the suggested words to commentary (better than leaving white space).
- `HINT: sidebar leaves Npt empty` / `longer than the grid` → lengthen / shorten sidebar blocks.
Open the PNG and check: header values don't collide (shorten `"3.8T"`, `"28.9x"`; set `company.name_size_pt` for
long names), chart lines visible (set `cash_max`/`price_min` if squashed), split labels readable. Re-check ten random
numbers against the source — one wrong number ruins the sheet.

When the user edits the Word file or asks for changes ("move X", "add a row under Y"), make the change in the spec
and re-render, so the .docx, PDF, PNG and website stay in sync. Keep text clear of rules: tables already pad the
total rows and section rules; don't remove that padding to squeeze content — cut words instead.

### Quality bar — check before every delivery (from the user's reviews)
The renderer enforces most of this automatically; read its output and fix every `QA PROBLEM` line before delivering.
- **Nothing clipped in Word.** Word (not LibreOffice) clips a nested table wider than its cell's text area — this
  once hid the Unit column. `fit_nested_tables` shrinks offenders and prints `QA fixed:`; `qa_text` verifies every
  metric label and unit appears on the rendered page and every header value stays on one line.
- **Text never touches a rule.** Totals, section titles and table edges keep their padding; cut words instead of
  removing padding.
- **Grid looks like a table.** Years sit in boxed cells with a rule underneath; vertical rules between years; thin
  rules between the 6 groups; latest year shaded.
- **Sidebar is a tree.** Sub-paths hang off one continuous vertical rule with a tick before each title (drawn as a
  small bordered table — paragraph borders don't render everywhere); ↓ arrows between blocks; a ruled final block.
- **Uniform line spacing.** Exact line heights everywhere; commentary grows at most +10% — add words, not size.
- **Look before sending.** Render the PNG at 220 dpi and view crops of: the header row, the right edge of the grid
  (Unit column), the sidebar tree, the bottom-left tables and the commentary. Fix anything the user would notice;
  never hand the user a sheet you have not looked at.

### 5. Deliver
Give the user: `<TICKER>_OnePage_en.docx` + `_zh.docx` (the editable masters), the PDFs/PNGs, the spec JSON, and the
`_site_entry.js` snippet (see `references/website.md`), with 2–4 lines on data period, gaps (`--`/`ND`), and any
judgement calls (FCF definition, which DCF case is "base", what you derived yourself).
