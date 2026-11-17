# Spec (JSON) for build_onepage.py

Complete example: `assets/examples/cmg_en.json` (+ `cmg_zh.json`, which inherits it via `"base"`).
Text fields accept `**bold**` and `\n`. **Any text field may be `{"en": "...", "zh": "..."}`**; render with
`--lang en|zh`. Missing language falls back to the other. (Alternatively keep two files and use `"base"`.)

```jsonc
{
  "lang": "en",                                   // default language; --lang overrides
  "meta_line": "CMG | FY25: Dec 31, 2025 | Market: Nov 11, 2026 | USD | Issued: Nov 16, 2026",
  "company": {"name": "Chipotle", "ticker": "CMG",
              "name_size_pt": 25, "name_width_pct": 31},      // optional: shrink long names
  "header_metrics": [                             // exactly 6, in this order; labels default by language
    {"value": "46.3B"}, {"value": "36.64"}, {"value": "1.94"},
    {"value": "34.2x"}, {"value": "32.0x"}, {"value": "0.0%"}],   // {"label": "DCF\nValue", "value": ...} to override
  "header_value_size_pt": 18,                     // optional

  "business_chain": {"lines": ["1 Attract | …", "…5 lines"], "watch": "Watch: …"},
  "mix_table": <small table>,

  "chart": {
    "x_labels": ["10", "11", …, "25"],            // one per year slot (add "26*" for a TTM slot)
    "high": [7.0, …], "low": [4.3, …],             // yearly range → the boxed High/Low strip (and bars if no monthly)
    "monthly": [[0.04, 7.0, 6.1, 6.6], …],         // optional [x, high, low, close]; x = slot index + (month-.5)/12
    "ocf_ps": [0.19, …], "fcf_ps": [0.11, …],      // left linear axis; null for gaps
    "last_price": 36.64,
    "log": true,                                   // price axis log (default) or linear
    "price_min": null, "price_max": null, "price_ticks": null,   // optional overrides
    "cash_max": null, "cash_min": null,            // optional left-axis overrides
    "annotations": [{"x": 14.4, "text": "50:1 split 06/2024"}],  // x in slot units
    "total_return": {"headers": ["CMG", "S&P 500 TR"], "rows": [["1Y", "-38.6%", "17.4%"], …], "pos": "tl"},  // tl|tr|bl|br
    "legend": ["OCF / sh $1.62", "FCF / sh $1.11"],
    "note": "USD/sh: price R log, cash L lin",
    "height_pt": 150, "width_pt": 343              // viewBox; it scales to the column width
  },

  "value_creation": {
    "columns": ["2010", …, "2025"],                // 15–16 years
    "money_unit": "$M", "share_unit": "M sh",      // or "$B", "B sh"
    "highlight_last": true,                        // or "highlight_col": 15
    "thousands_sep": false, "paren_negatives": false,
    "sidebar": [
      {"title": "Demand", "text": "…"},
      {"title": "Order paths", "sub": [{"title": "Digital", "text": "…"}, {"title": "In-store", "text": "…"}]},
      {"title": "Return test", "text": "…", "final": true}],
    "groups": [                                    // 6 groups; a thin rule between groups
      [{"key": "revenue", "values": [1835.9, …]},
       {"key": "gross_margin", "metric": {"en": "Rest. Level Margin*", "zh": "门店经营利润率*"}, "values": […]}, …],
      …]
  },

  "dcf": {                                         // DCF VALUATION block (always include)
    "as_of": "Nov 2026", "price": 36.64,
    "scenarios": [{"name": "bear", "value": 30, "prob": 25}, {"name": "base", "value": 41, "prob": 50},
                  {"name": "bull", "value": 52, "prob": 25}],
    "wacc": "8.5%", "terminal_growth": "3.0%", "horizon": "10Y",
    "morningstar": 44, "sp": 50,                   // null if unknown
    "notes": ["optional extra line"],
    "position": "first",                           // first | last | index among the left tables
    "show_weighted": true
  },
  "kpi_tracker": <small table>,                    // title default "CORE KPI TRACKER"; last column bold
  "cagr": <small table>,
  "financial_position": <small table>,
  "extra_left_tables": [<small table>],            // rarely needed

  "lead_paragraphs": [{"label": "CAPITAL RETURNS:", "text": "…"}, {"label": "NET SHARES:", "text": "…"}],
  "commentary": [{"headline": "…", "body": "…"}, … 6 items],
  "footnotes": ["…"],
  "brand_mark": "PYTHIA",
  "labels": {},                                    // optional overrides of any built-in label

  "website": { … }                                 // see references/website.md → writes <out>_site_entry.js
}
```

## Row `fmt` (VALUE CREATION)
Values are numbers, `null` (→ `--`) or strings printed verbatim (`"NM*"`, `"ND"`, `"~250"`). Standard keys set
label, unit and fmt; override any of them per row.

| fmt | 1234.5 | -0.62 | note |
|---|---|---|---|
| `auto` | `1234.5` | `-.62` | ≥10000 → 0 dp, ≥1000 → 1 dp, else 2 dp |
| `int`, `0`–`3` | fixed decimals | | |
| `pct` / `pct0` / `pct2` | `1234.5%` | `-.6%` | value already in percent units |
| `x` / `x2` | `1234.5x` / `1.62x` | | multiples |

## Small table
```json
{"title": "BUSINESS MIX | FY25",
 "columns": ["Revenue", "$M", "Mix", "YoY", "3Y CAGR"],
 "rows": [["Food & beverage", "11866.05", "99.5%", "+5.5%", "+10.0%"]],
 "total_row": ["Total revenue", "11925.60", "100.0%", "+5.4%", "+9.9%"],
 "notes": ["one-line caveat"],
 "bold_last_col": false}
```
Use pre-formatted strings in small tables.

## CLI
```
python build_onepage.py spec.json -o out/CMG_OnePage_en [--lang en|zh] [--html-only] [--png-dpi 200]
```
Writes `.html`, `.pdf` (one Letter page), `.png`, and `_site_entry.js` when `website` is present. The run prints
`fit {...}` and WARNING/HINT lines — act on them.
