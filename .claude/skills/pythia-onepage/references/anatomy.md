# Anatomy of the V2 One Page

Distilled from twelve reference sheets (Alphabet, Chipotle, Coca-Cola, Macy's, McDonald's, PepsiCo — each EN and
ZH, FY25, Oct–Nov 2026), plus the PYTHIA DCF block. US Letter portrait, black & white; the only gray is the latest
year column. Condensed sans for numbers/labels, heavy condensed caps for the company name, Century-style serif for
commentary (Chinese: Noto Serif CJK in commentary, Noto Sans CJK elsewhere).

```
 META LINE (outside the frame)
┌──────────────────────────────────────────────────────────────────────────┐
│ COMPANY  TICKER │Mkt Cap│Stock Price│Book Value│P/E Ratio│P/FCF Ratio│Div Yield│ 1 header
├────────────────────────────┬─────────────────────────────────────────────┤
│ HOW IT EARNS CASH |        │ High/Low strip (boxed, one cell per year)   │
│ BUSINESS CHAIN  1…5        │ monthly price bars (R, log) + OCF/sh solid  │ 2 / 3
│ BUSINESS MIX | FY25 table  │ + FCF/sh dashed (L, linear); SHAREHOLDER    │
│ Watch: one line            │ RETURN box; split notes; legend; axis note  │
├──────────┬─────────────────┴──────────────────────────────┬──────────┬───┤
│ VALUE    │ 2010/11 … 2025 (latest column gray)             │ Metric   │Unit│ 4
│ CREATION │ 6 groups / 35 rows, thin rule between groups    │ (bold)   │    │
│ sidebar ↓│                                                 │          │    │
├──────────┴───────────┬─────────────────────────────────────┴──────────┴───┤
│ DCF VALUATION        │ CAPITAL RETURNS: …      │ NET SHARES: …          │ 5 / 6
│ CORE KPI TRACKER     ├─────────────────────────┴────────────────────────┤
│ COMPOUND ANNUAL GR.  │ **Verdict.** evidence    │ **Verdict.** evidence │ 7
│ FINANCIAL POSITION   │ ×3                       │ ×3 (6th = valuation)  │
└──────────────────────┴──────────────────────────────────────────────────┘
 footnotes (outside, tiny)                                         PYTHIA
```

## 1. Meta line
`CMG | FY25: Dec 31, 2025 | Market: Nov 11, 2026 | USD | Issued: Nov 12, 2026` (ticker first is optional;
`FY25 | FYE: … |` also fine). ZH: `FY25 | 财年末：2025年12月31日 | 价格：2026年11月6日 | 美元 | 发布日期：2026年11月8日`.
States how stale each layer is — always fill it. Add `Total return: <date>` if it differs from the price date.

## 2. Header
Company name in heavy condensed caps (`ALPHABET INC.`, `MACY'S`, `McDONALD'S` stays upper-cased). In ZH either keep
the English name (Alphabet) or use the Chinese name (可口可乐). Ticker small beside it; share class if relevant
`GOOGL (A)`. Six metric cells, two-line small label + big bold value:

| EN | ZH | value style |
|---|---|---|
| Mkt / Cap | 最新 / 市值 | `3.8T`, `46.3B`, `217.2B` |
| Stock / Price | 最新 / 股价 | `313.00`, `36.64` |
| Book / Value | 账面 / 价值 | per share; negative in parentheses `(2.52)` |
| P/E / Ratio | P/E / 倍数 | `28.9x` |
| P/FCF / Ratio | P/FCF / 倍数 | `51.7x` |
| Div / Yield | 股息 / 收益率 | `0.27%`, `0.0%` |

Header basis (shares date, book date, TTM vs FY) goes in a footnote.

## 3. HOW IT EARNS CASH | BUSINESS CHAIN (ZH 现金生成路径 / 现金如何产生 | 业务链条)
Five numbered lines, each `n Verb | fact` or an arrow chain, ending in cash:
- Platform: `1 Search/Network: intent/inventory -> auctions; pay TAC.` … `5 Collections - cash costs/tax -> OCF; less cash PP&E -> reported FCF.`
- Restaurants: `1 Attract | …  2 Order | …  3 Serve | …  4 Replicate | …  5 Reinvest | …`
- Franchisor: `1 Conventional: rent + royalties …  2 Licensees …  3 Affiliates …  4 Owned stores …  5 Collections …`
- Retail: `1 Curate | …  2 Convert | …  3 Fulfill | …  4 Monetize | …  5 Reinvest | …`
Then **BUSINESS MIX | FY25** (or SEGMENTS / 分部收入): `Revenue | $M or $B | Mix | YoY | 3Y CAGR` (2Y if history is
short); total row bold with a rule (`Total (incl. FX)` / 合计（含汇兑）); 1–2 note lines (unit counts, restatements).
Last line of the box: `Watch: …` / `Track …` / 关注：… — the one variable to monitor.

## 4. Chart
- High/Low strip above the plot, one boxed cell per year, aligned to the year slots.
- Price: **monthly** high–low bars on the **right log axis**; latest price bold on the right axis. If only yearly
  high/low is available, the renderer draws one thick bar per year (acceptable, say so in delivery).
- OCF/sh solid, FCF/sh dashed on the **left linear axis**; an optional extra TTM point (`26*`).
- Split annotations (`2:1 split 04/2014`, `20:1 split 07/2022`; ZH `2:1 拆股 04/2014`).
- **SHAREHOLDER RETURN** box (股东总回报): company vs S&P 500 TR, rows 1Y/3Y/5Y, usually top-left (top-right if the
  price series starts high).
- Legend under the plot: `OCF / sh $13.59`, `FCF / sh $6.05`, and an axis note
  (`Years: 11-25 = 2011-2025`, or `USD/sh: price R log, cash L lin`; ZH `股价$/股：右对数 | 现金$/股：左线性`).

## 5. VALUE CREATION grid (价值创造)
Black header band; year cells boxed; latest year gray. Right columns: metric (bold) and unit; header label
`6 Groups` / `6类指标`. 15–16 years. The 35 standard rows (spec `key` → label):

| Group | Rows (key) |
|---|---|
| 1 Profit | revenue · rev_yoy · gross_margin (or a business-specific margin*, e.g. Rest. Level Margin*, Store OpEx/Rev.*) · op_income · op_margin · net_income · net_margin |
| 2 Cash | ocf · ocf_margin · ocf_ni (x) · capex (cash PP&E) · capex_ocf · fcf · fcf_margin |
| 3 Allocation | acq (Acq. + Intangibles / Acq. + Other*) · acq_ocf · sbc · sbc_ocf · buybacks · buybacks_ocf · dividends · dividends_ocf |
| 4 Returns | roic (Base ROIC* if adjusted) · roe (NM* when equity is negative) · roa |
| 5 Per share | shares · rev_ps · eps · ocf_ps · capex_ps · fcf_ps · div_ps |
| 6 Valuation | avg_pe · fcf_yield · div_yield |

Number style: no thousands separators; ~4 significant digits (`11926`, `1835.9`, `287.83`, `.11`); leading zero
dropped; `--` for none; `NM`/`NM*`/`ND`; `*` = defined/adjusted, always footnoted. Money unit `$B` for mega caps,
`$M` otherwise; shares `B sh` / `M sh`.

### Sidebar (left of the grid, same height)
A chain of bold caps labels, each with 1–3 lines of latest-year facts; `↓` arrows between blocks; a block may branch
into sub-paths drawn as a tree; the last block sits under a rule and states the test the company must pass.
Seen in the references:
- DEMAND & ENTRY → PARALLEL REVENUE (SEARCH & OTHER / YOUTUBE / PAID ECOSYSTEM / CLOUD) → SHARING & CASH CONVERSION → REINVESTMENT & FCF → | RETURN CONDITION
- DEMAND → ORDER PATHS (NON-DIGITAL / DIGITAL) → STORE ECONOMICS → REPLICATE & REINVEST → CASH FLOW → | RETURN TEST
- DEMAND → RETAIL PATHS (MACY'S / BLOOM. / BLUEMERCURY) → CARD & CASH → REINVEST & FCF → | RETURN CONDITION
- DEMAND → REVENUE PATHS (Conventional / License / Affiliate / Owned) → CASH BRIDGE → REINVEST & FCF → | RETURN TEST
- ZH: 需求与入口 → 并行收入路径 → 分成与现金转化 → 再投资与FCF → | 回报条件；到店需求 → 下单渠道 → 单店经济 → 开店与再投资 → 现金转化 → | 回报验证；品牌投入 → 两条业务路径 → 系统检验 → 每股检验

## 6. Bottom-left tables (top to bottom)
1. **DCF VALUATION | <date>** (PYTHIA addition; DCF估值): Bear / Base (bold) / Bull — $/sh, vs price, probability;
   probability-weighted row; `WACC · Terminal g · Horizon`; `Morningstar FV $X (Mine vs +y%)`; `S&P FV $X (Mine vs …)`.
2. **CORE KPI TRACKER | FY21-25** (核心KPI / 核心经营指标): 5–7 operating KPIs × FY21–FY25, latest bold, `*` for
   company-defined KPIs. Examples: Clicks YoY, CPC YoY, TAC rate, Cloud margin, Backlog YoY*; owned sites, openings,
   closures; system units, same-store sales, franchised margin; system volume, price/mix.
3. **COMPOUND ANNUAL GROWTH RATE** (复合年增长率 | CAGR): 1Y 3Y 5Y 10Y 15Y × Revenue, Op. Income, Net Income, OCF,
   FCF, Diluted EPS, FCF/Sh. (+ Div./Sh. if it pays).
4. **FINANCIAL POSITION | $B or $M** (财务状况): FY21–25 × Tot. assets, Tot. liabilities, Net assets, Mkt cap*,
   Cash + ST (or Cash & eq.), Liab./assets.

## 7. Lead paragraphs (sans, justified, two columns, rule underneath)
- **CAPITAL RETURNS:** (现金分配：) the 15-year identity — OCF less cash PP&E = **FCF**; buybacks **$X (y% of FCF)**;
  dividends **$X (y%)**; combined payout **z%**; one sentence on where the balance went / that it is not retained cash.
- **NET SHARES:** (净股数变化：) split-adjusted shares FY10 → FY25, **down X (y%)**; FY25 bought less issued = **N
  fewer (y%)**; whether FCF covered payouts; debt context if relevant.

## 8. Commentary (serif, two columns, exactly 6 paragraphs)
Each: **bold verdict sentence.** + 2–4 sentences of evidence. Left column ≈ the business (demand, engine, margin);
right column ≈ cash, per-share and price. Paragraph 6 = valuation: what the base DCF needs, the market-implied
assumption at today's price, and the gap to Morningstar/S&P with its main driver.

## 9. Footnotes (outside the frame, 5–8 tiny lines)
Order: data dates & scope → KPI/growth definitions → `--`/NM meanings → FCF/SBC/EPS/ROIC definitions → market-cap and
header basis → DCF source and date → sources. No copyright line, no third-party "calculations & presentation"
credit. Bottom-right: `PYTHIA`.
