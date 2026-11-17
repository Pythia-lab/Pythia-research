# Delivering to the PYTHIA research website

The user's site (static HTML; data in `data/companies.js`, files in `reports/<id>/`) shows every company that has a
One Page automatically on its One Page gallery, and on the company page next to the DCF and the fair-value gap
analysis. Deliver files that drop straight in.

## Files and names
```
reports/<id>/<TICKER>_OnePage_en.pdf    reports/<id>/<TICKER>_OnePage_en.png
reports/<id>/<TICKER>_OnePage_zh.pdf    reports/<id>/<TICKER>_OnePage_zh.png
```
`<id>` = lowercase ticker (`cmg`, `googl`, `ko`); A-shares may use a name (`moutai`). The PNG is what the website
shows as the thumbnail and large preview, so always render it (default 200 dpi ≈ 1700 × 2200 px).

## The companies.js entry
Fill the spec's `website` block; the renderer writes `<out>_site_entry.js` with fair values and DCF inputs copied
from the `dcf` block. Fields (text fields may be `{"en","zh"}`):

```jsonc
"website": {
  "id": "cmg",
  "name": {"en": "Chipotle Mexican Grill", "zh": "Chipotle墨西哥烧烤"},
  "exchange": "NYSE", "market": "US",                       // US | CN | HK | Other
  "sector": "Consumer Discretionary", "industry": "Restaurants",   // must match the site's taxonomy (EN or ZH name)
  "indices": ["S&P 500", "Russell 1000"],                    // S&P 500, Nasdaq-100, Dow 30, Russell 1000, Russell 2000, S&P MidCap 400, CSI 300, Hang Seng, Other
  "updated": "2026-11-16", "price_date": "2026-11-11", "currency": "USD",
  "moat": "Wide",                                           // Wide | Narrow | None | ""
  "summary": {"en": "one-line conclusion", "zh": "一句话结论"},
  "tags": [{"en": "Restaurants", "zh": "餐饮"}],
  "business": {"en": "### Heading\n- bullet …", "zh": "…"},     // short markdown: ###, -, **bold**
  "segments": [{"name": {"en": "Food & beverage", "zh": "餐饮"}, "share": 99.5}],
  "revenue_cagr": "12% (5Y)", "margin": "Op. margin 16% → 18%",
  "gap": {
    "summary": {"en": "Why my FV differs from Morningstar…", "zh": "…"},
    "bridge": [{"driver": {"en": "Slower unit growth", "zh": "开店更慢"}, "impact": -2.0}],  // $/sh steps from Morningstar FV to mine
    "assumptions": [{"item": "Revenue CAGR (5Y)", "mine": "11%", "morningstar": "13%", "sp": "—", "note": ""}]
  },
  "files": [
    {"type": "onepage", "label": "One Page", "path": "reports/cmg/CMG_OnePage_en.pdf", "date": "2026-11-16"},
    {"type": "onepage", "label": {"en": "One Page (中文)", "zh": "One Page（中文）"}, "path": "reports/cmg/CMG_OnePage_zh.pdf", "date": "2026-11-16"},
    {"type": "dcf", "label": {"en": "DCF model", "zh": "DCF 模型"}, "path": "reports/cmg/CMG_DCF.xlsx"}
  ],
  "onepage_image": "reports/cmg/CMG_OnePage_en.png",
  "history": [{"date": "2026-11-16", "note": {"en": "One Page V2 + DCF", "zh": "One Page V2 + DCF"}}]
}
```

Bridge impacts should sum to (my base value − Morningstar FV); the site adds an "other / unexplained" row for any
remainder. Tell the user to paste the snippet after `window.COMPANIES = [` (or replace the company's existing entry)
and to upload the files into `reports/<id>/`. If the site repository is available in the session, do it for them.
