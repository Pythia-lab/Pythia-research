# Extracting content from the user's materials

The user will typically upload some mix of: an older One Page (PDF/Word), a DCF workbook (.xlsx), a pitch / analysis
deck (.pptx or PDF), a written memo (docx/md), and filings. Read all of it before writing anything.

## How to read each type
| Type | Tool | Tips |
|---|---|---|
| xlsx / xlsm | `openpyxl.load_workbook(p, data_only=True)` | List every sheet and its used range first. Cached values only exist if the file was saved by Excel; if formulas show `None`, recalc with LibreOffice (`soffice --headless --convert-to xlsx`) and reload. |
| pptx | `python-pptx` (`slide.shapes` → text frames, tables; `shape.has_chart` → `chart.plots[0].categories` and series values) | Speaker notes often hold the real argument (`slide.notes_slide.notes_text_frame.text`). Render to PNG (`soffice --convert-to pdf` then `pdftoppm`) to see charts you can't parse. |
| pdf | `pdftotext -layout` | Old One Pages extract cleanly row by row; check columns line up (16 values per grid row). Render a page image to verify anything ambiguous. |
| docx | `pandoc -t markdown` | |
| images / screenshots | read them visually | Transcribe carefully; double-check totals. |

## What to pull from each

**DCF workbook** → the `dcf` block and the gap analysis:
- value per share for each scenario (bear/base/bull or low/mid/high) and probabilities; current price and date used;
- WACC (and its pieces if shown), terminal growth or exit multiple, forecast horizon, valuation date;
- revenue CAGR and margin path of the base case (for the valuation paragraph and the website `dcf` fields);
- any comparison sheet with Morningstar / S&P / consensus targets → `morningstar`, `sp`;
- historical sheets often contain the 10–15 year financials — reuse them for the grid (check units: $M vs $K).

**Old One Page** → reuse what is still valid: the business chain logic, segment mix, KPI choices, sidebar labels,
verdicts. Update every number to the latest fiscal year; never carry an old number forward without checking it.

**PPT / memo** → the thesis and its tests: the 2–4 claims the user actually makes become commentary verdicts; the
risks become the RETURN CONDITION and the "Watch:" line; the explanation of why their value differs from
Morningstar/S&P becomes paragraph 6 and the website `gap` block.

**Filings / data sites** (if the user's files lack history): 10-K cash-flow statement (OCF, capex, acquisitions,
buybacks, dividends, SBC), income statement, balance sheet, share counts; stockanalysis.com / Yahoo for price
history. Note in the footnotes where each layer came from.

## Working table checklist (15 fiscal years unless the company is younger)
revenue · segment revenue (latest 3–4 years) · gross margin or business margin · op. income · net income · OCF ·
capex (cash PP&E) · acquisitions (+ intangibles) · SBC · buybacks · dividends · total assets/liabilities/equity ·
cash + ST investments · diluted shares (split-adjusted) · diluted EPS · yearly price high/low (monthly if possible) ·
FY-end market cap · average P/E · ROIC inputs · 5–7 operating KPIs for FY21–25.

Derived: YoY, margins, OCF/NI, capex/OCF, FCF = OCF − capex, FCF margin, each allocation ÷ OCF, per-share values,
FCF yield = FCF/sh ÷ avg price, CAGRs (1/3/5/10/15Y), 15-year cumulative OCF/capex/FCF/buybacks/dividends for
CAPITAL RETURNS, share count FY10→FY25 for NET SHARES.

## Monthly price data
The V2 chart wants monthly high/low/close. If you have network access, a daily or monthly CSV (Yahoo Finance,
stockanalysis.com) is enough: group by month, x = (year − first_year) + (month − 0.5)/12. Split-adjust everything to
today's share basis and annotate splits. Without it, pass yearly `high`/`low` only and tell the user.

## When things are missing
Ask the user for the DCF output, Morningstar/S&P fair values, or the fiscal-year-end if they aren't in the files.
Everything else: derive, fetch from filings, or mark `--`/`ND` and footnote. Never fill a gap with an estimate that
looks like a reported number.
