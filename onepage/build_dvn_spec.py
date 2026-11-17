"""Build onepage/specs/dvn_onepage.json from the SEC working table (dvn_D.json) plus the analyst's pitch materials.
Usage: python onepage/build_dvn_spec.py path/to/dvn_D.json
"""
import json, sys

D = {int(k): v for k, v in json.load(open(sys.argv[1])).items()}
Y = list(range(2011, 2026))
L = lambda en, zh: {"en": en, "zh": zh}


def col(f):
    return [f(D[y], y) for y in Y]


def r(k):
    return col(lambda d, y: d[k])


def pct(a, b):
    return col(lambda d, y: (d[a] / d[b] * 100) if (d[a] is not None and d[b]) else None)


def nz(k):
    return col(lambda d, y: None if not d[k] else d[k])


def cagr(f, n):
    try:
        a, b = f(2025 - n), f(2025)
    except (TypeError, ZeroDivisionError):
        return "NM"
    if a is None or b is None or a <= 0 or b <= 0:
        return "NM"
    v = ((b / a) ** (1 / n) - 1) * 100
    s = f"{v:.1f}%"
    return s.replace("0.", ".", 1) if s.startswith(("0.", "-0.")) else s


def crow(lab, f):
    return [lab] + [cagr(f, n) for n in (1, 3, 5, 10, 15)]


G = [
    [{"key": "revenue", "values": r("rev")},
     {"key": "rev_yoy", "values": [(D[y]["rev"] / D[y - 1]["rev"] - 1) * 100 for y in Y]},
     {"key": "gross_margin", "metric": L("EBITDA Margin*", "EBITDA利润率*"), "values": pct("ebitda", "rev")},
     {"key": "op_income", "metric": L("EBIT*", "息税前利润*"), "values": r("ebit")},
     {"key": "op_margin", "metric": L("EBIT Margin*", "EBIT利润率*"), "values": pct("ebit", "rev")},
     {"key": "net_income", "values": r("ni")},
     {"key": "net_margin", "values": pct("ni", "rev")}],
    [{"key": "ocf", "values": r("ocf")},
     {"key": "ocf_margin", "values": pct("ocf", "rev")},
     {"key": "ocf_ni", "fmt": "x", "values": col(lambda d, y: d["ocf"] / d["ni"] if d["ni"] > 0 else "NM*")},
     {"key": "capex", "values": r("capex")},
     {"key": "capex_ocf", "values": pct("capex", "ocf")},
     {"key": "fcf", "values": r("fcf")},
     {"key": "fcf_margin", "values": pct("fcf", "rev")}],
    [{"key": "acq", "metric": L("Acquisitions*", "收购支出*"), "values": r("acq")},
     {"key": "acq_ocf", "metric": L("Acquisitions / OCF*", "收购/OCF*"), "values": pct("acq", "ocf")},
     {"key": "sbc", "values": r("sbc")},
     {"key": "sbc_ocf", "values": pct("sbc", "ocf")},
     {"key": "buybacks", "values": nz("bb")},
     {"key": "buybacks_ocf", "values": col(lambda d, y: d["bb"] / d["ocf"] * 100 if d["bb"] else None)},
     {"key": "dividends", "values": r("div")},
     {"key": "dividends_ocf", "values": pct("div", "ocf")}],
    [{"key": "roic", "metric": "ROIC*", "values": r("roic")},
     {"key": "roe", "values": r("roe")},
     {"key": "roa", "values": r("roa")}],
    [{"key": "shares", "values": r("sh")},
     {"key": "rev_ps", "values": col(lambda d, y: d["rev"] / d["sh"])},
     {"key": "eps", "values": r("eps")},
     {"key": "ocf_ps", "values": col(lambda d, y: d["ocf"] / d["sh"])},
     {"key": "capex_ps", "values": col(lambda d, y: d["capex"] / d["sh"])},
     {"key": "fcf_ps", "values": col(lambda d, y: d["fcf"] / d["sh"])},
     {"key": "div_ps", "metric": L("Dividend / Sh.*", "每股股息*"), "values": col(lambda d, y: d["div"] / d["sh"])}],
    [{"key": "avg_pe", "metric": L("P/E (FY-end)*", "年末P/E*"), "values": [None] * 10 + [10.71, 6.75, 7.75, 7.44, 8.70]},
     {"key": "fcf_yield", "metric": L("FCF Yield*", "FCF收益率*"), "values": [None] * 10 + [9.70, 8.47, 8.95, -3.97, 12.17]},
     {"key": "div_yield", "metric": L("Dividend Yield*", "股息率*"), "values": [None] * 10 + [4.38, 8.40, 6.29, 4.39, 2.60]}],
]

ps = lambda k: (lambda y: D[y][k] / D[y]["sh"])
cg = [crow(L("Revenue", "营收"), lambda y: D[y]["rev"]),
      crow(L("EBIT*", "息税前利润*"), lambda y: D[y]["ebit"]),
      crow(L("OCF", "OCF"), lambda y: D[y]["ocf"]),
      crow(L("FCF", "FCF"), lambda y: D[y]["fcf"]),
      crow(L("Diluted EPS", "稀释EPS"), lambda y: D[y]["eps"]),
      crow(L("FCF / Sh.", "每股FCF"), ps("fcf")),
      crow(L("Div. / Sh.", "每股股息"), ps("div"))]

B = 1000.0
fp = lambda f: [f"{f(D[y]):.1f}" for y in range(2021, 2026)]
ocfps = col(lambda d, y: d["ocf"] / d["sh"])
fcfps = col(lambda d, y: d["fcf"] / d["sh"])

spec = {
    "lang": "en",
    "meta_line": L("DVN | FY25: Dec 31, 2025 | Market: Nov 16, 2026 | USD | Issued: Nov 17, 2026",
                   "DVN | FY25：2025年12月31日 | 市场日期：2026年11月16日 | 美元 | 发布日期：2026年11月17日"),
    "company": {"name": L("DEVON ENERGY", "戴文能源"), "ticker": "DVN", "name_size_pt": 22, "name_width_in": 2.2},
    "header_metrics": [{"value": "50.5B"}, {"value": "44.27"}, {"value": "36.62"}, {"value": "10.3x"}, {"value": "27.4x"}, {"value": "2.9%"}],
    "business_chain": {
        "title": L("HOW IT EARNS CASH | BUSINESS CHAIN", "现金生成路径"),
        "lines": L(["1 Lease | Delaware core plus Williston, Anadarko and Marcellus; one reported segment.",
                    "2 Drill | ~$1.4–1.5B capex a quarter holds ~1.6M Boe/d against well decline.",
                    "3 Sell | Oil, NGL and gas at market: Q2'26 realised $88.09 / $22.70 / $1.05.",
                    "4 Cost | Cash cost ~$9.55/Boe -> $8.90 with synergies; breakeven < $44 WTI.",
                    "5 Return | FY25 OCF $6.71B - capex $3.59B = FCF $3.12B -> 70% to holders."],
                   ["1 租地 | 以 Delaware 为核心，另有 Williston、Anadarko、Marcellus；只报一个分部。",
                    "2 钻井 | 每季约 $14–15 亿资本开支，抵消老井递减、维持约 160 万桶油当量/天。",
                    "3 销售 | 油、NGL、气按市价卖出：Q2'26 实现价 $88.09 / $22.70 / $1.05。",
                    "4 成本 | 现金成本约 $9.55/桶油当量，协同后降至 $8.90；盈亏平衡 < $44 WTI。",
                    "5 回报 | FY25 OCF $6.71B - 资本开支 $3.59B = FCF $3.12B → 70% 回馈股东。"]),
        "watch": L("Watch: 2027 budget, cash cost/Boe and share count vs 1,150M.",
                   "关注：2027 年预算、单位现金成本与股数是否低于 11.5 亿股。")},
    "mix_table": {
        "title": L("PRODUCTION & PRICES", "产量与实现价格"),
        "columns": ["", "Q4'25", "Q2'26", L("Q3'26 guide", "Q3'26 指引")],
        "rows": [[L("Total (MBoe/d)", "总产量 MBoe/d"), "851", "1,359", "1,675"],
                 [L("Oil (MBbl/d)", "原油 MBbl/d"), "390", "503", "555"],
                 [L("Oil $/Bbl (hedged)", "原油 $/桶（含套保）"), "59.66", "88.09", "--"],
                 [L("NGL $/Bbl", "NGL $/桶"), "17.09", "22.70", "--"],
                 [L("Gas $/Mcf", "天然气 $/Mcf"), "1.58", "1.05", "--"],
                 [L("Prod. cost $/Boe", "生产成本 $/Boe"), "10.99", "11.27", "--"]],
        "notes": [L("Q4'25 standalone; Q2'26 includes Coterra from May 7. Eagle Ford (~68 MBoe/d) sale pending.",
                    "Q4'25 为单体；Q2'26 自 5月7日起含 Coterra。Eagle Ford（约 6.8 万桶油当量/天）出售待完成。")]},
    "chart": {
        "x_labels": [str(y)[-2:] for y in Y], "ocf_ps": ocfps, "fcf_ps": fcfps, "last_price": 44.27, "log": True,
        "price_min": 20, "price_max": 200, "price_ticks": [25, 50, 100, 200], "cash_max": 16, "cash_min": -10,
        "legend": L([f"OCF / sh ${ocfps[-1]:.2f}", f"FCF / sh ${fcfps[-1]:.2f}"], [f"OCF /股 ${ocfps[-1]:.2f}", f"FCF /股 ${fcfps[-1]:.2f}"]),
        "note": L("Cash $/sh L lin; price R log (Nov 16, 2026)", "现金$/股：左线性 | 股价：右对数（2026年11月16日）"),
        "annotations": [{"x": 4.3, "text": L("Oil crash 2015–16", "油价暴跌 2015–16")},
                        {"x": 10.0, "dy": 10, "text": L("WPX merger 01/2021", "合并 WPX 01/2021")},
                        {"x": 13.7, "dy": 20, "text": L("Grayson Mill 09/2024", "收购 Grayson Mill 09/2024")}]},
    "value_creation": {
        "title": L("VALUE CREATION", "价值创造"), "columns": [str(y) for y in Y], "money_unit": "$M", "share_unit": "M sh", "groups": G,
        "sidebar": [
            {"title": L("Price × volume", "价格 × 产量"),
             "text": L("FY25 revenue +7.8% to $17.19B as oil rose 12% to 389 MBbl/d, but WTI fell to $64.87 from $75.79.",
                       "FY25 营收 +7.8% 至 $17.19B：原油产量 +12% 至 38.9 万桶/天，但 WTI 由 $75.79 跌至 $64.87。")},
            {"title": L("Four basins", "四个盆地"), "sub": [
                {"title": "Delaware", "text": L("~2/3 of output; >60% of 2026 capex.", "约占产量 2/3；占 2026 年资本开支 60% 以上。")},
                {"title": "Williston / Anadarko", "text": L("Oil and liquids; Grayson Mill 2024.", "原油与液体；2024 年收购 Grayson Mill。")},
                {"title": "Marcellus", "text": L("Coterra gas, added May 2026.", "Coterra 天然气，2026年5月并入。")},
                {"title": "Eagle Ford", "text": L("Sold to Crescent for $4.2B.", "以 $42 亿出售给 Crescent。")}]},
            {"title": L("Unit cost", "单位成本"),
             "text": L("Q2'26 production cost $11.27/Boe; $1B synergies target cash cost ~$8.90 by end-2027.",
                       "Q2'26 生产成本 $11.27/桶油当量；$10 亿协同目标使现金成本在 2027 年底降至约 $8.90。")},
            {"title": L("Reinvest & FCF", "再投资与FCF"),
             "text": L("FY25 OCF $6.71B - capex $3.59B = FCF $3.12B; capex 54% of OCF.",
                       "FY25 OCF $6.71B - 资本开支 $3.59B = FCF $3.12B；资本开支占 OCF 54%。")},
            {"title": L("Return condition", "回报条件"), "final": True,
             "text": L("Synergies, Eagle Ford cash and buybacks must lift FCF per share faster than ~532M Coterra shares dilute it.",
                       "协同效应、Eagle Ford 现金和回购，必须让每股 FCF 的增长快于约 5.32 亿股 Coterra 新股带来的稀释。")}]},
    "labels": {"sp": L("S&P GMI target", "S&P GMI 目标价")},
    "dcf": {
        "as_of": L("Oct 30, 2026", "2026年10月30日"), "price": 44.27,
        "scenarios": [{"name": "bear", "value": 33.50}, {"name": "base", "value": 69.33}, {"name": "bull", "value": 110.68}],
        "wacc": "8.31%", "terminal_growth": "1.5%", "horizon": "2026-30", "morningstar": 62, "sp": 61.69, "show_weighted": False,
        "notes": [L("On Morningstar's $60 WTI deck: $52.83. EV/EBITDA 4.8–6.0x: $55–70.",
                    "按 Morningstar $60 WTI 价格：$52.83。EV/EBITDA 4.8–6.0x：$55–70。"),
                  L("No scenario probabilities set; vs price uses Nov 16 close $44.27.",
                    "未设情景概率；较现价按 11月16日收盘 $44.27 计算。")]},
    "kpi_tracker": {
        "title": L("CORE KPI TRACKER | FY21-25", "核心KPI | FY21-25"),
        "columns": [L("Metric", "指标"), "FY21", "FY22", "FY23", "FY24", "FY25"],
        "rows": [[L("Production (MMBoe)", "产量（百万桶油当量）"), "209", "223", "240", "270", "307"],
                 [L("Daily (MBoe/d)", "日均（千桶油当量）"), "573", "611", "658", "740", "841"],
                 [L("EBITDA* ($B)", "EBITDA* ($B)"), "5.50", "10.26", "7.46", "7.34", "7.43"],
                 [L("EBITDA margin*", "EBITDA利润率*"), "40.0%", "51.8%", "49.2%", "48.4%", "46.3%"],
                 [L("Net debt / EBITDA*", "净债务/EBITDA*"), ".85x", ".53x", ".76x", "1.15x", ".98x"]]},
    "cagr": {"title": L("COMPOUND ANNUAL GROWTH RATE", "复合年增长率 | CAGR"), "columns": ["", "1Y", "3Y", "5Y", "10Y", "15Y"], "rows": cg},
    "financial_position": {
        "title": L("FINANCIAL POSITION | $B", "财务状况 | $B"), "columns": ["", "FY21", "FY22", "FY23", "FY24", "FY25"],
        "rows": [[L("Tot. assets", "总资产")] + fp(lambda d: d["assets"] / B),
                 [L("Tot. liabilities", "总负债")] + fp(lambda d: (d["assets"] - d["eqt"]) / B),
                 [L("Total debt", "总债务")] + fp(lambda d: d["debt"] / B),
                 [L("Mkt cap*", "市值*"), "29.8", "40.2", "29.0", "21.5", "23.0"],
                 [L("Cash", "现金")] + fp(lambda d: d["cash"] / B),
                 [L("Liab./assets", "负债/资产")] + [f"{(D[y]['assets'] - D[y]['eqt']) / D[y]['assets'] * 100:.1f}%" for y in range(2021, 2026)]]},
    "lead_paragraphs": [
        {"label": L("CAPITAL RETURNS:", "现金分配："), "text": L(
            "FY11-25 OCF $68.5B less capex $57.9B left only **$10.6B FCF**. Buybacks **$11.6B (109%)**; dividends **$10.7B (101%)**; payout **210%**, funded by asset sales and debt. Since the 2021 WPX merger: FCF $17.6B, payout **71%**.",
            "FY11-25 OCF $68.5B 减资本开支 $57.9B，仅得 **FCF $10.6B**。回购 **$11.6B（109%）**；股息 **$10.7B（101%）**；分配率 **210%**，差额靠出售资产和举债。2021 年合并 WPX 以来：FCF $17.6B，分配率 **71%**。")},
        {"label": L("NET SHARES:", "净股数变化："), "text": L(
            "Diluted shares FY11 414M to FY25 633M, **up 53%** (2016 equity raise, 2021 all-stock WPX). Coterra added ~532M in May 2026, so ~1.14B today. The $8B buyback is **~16%** of the $50.5B market cap.",
            "稀释股数由 FY11 的 414M 增至 FY25 的 633M，**增加 53%**（2016 年增发、2021 年全股票合并 WPX）。2026年5月合并 Coterra 新增约 5.32 亿股，目前约 11.4 亿股。$80 亿回购授权约为 $505 亿市值的 **16%**。")}],
    "commentary": [
        {"headline": L("Value it on price and cost, not growth.", "按价格和成本估值，不按增长。"),
         "body": L("FY25 revenue rose 7.8% to $17.19B while net income fell 8.9% as WTI dropped from $75.79 to $64.87. Even so, OCF was $6.71B. The model is price × volume - unit cost - capex. FY15 shows the other side: impairments drove a $12.9B loss.",
                   "FY25 营收增长 7.8% 至 $17.19B，但 WTI 由 $75.79 跌至 $64.87，净利润下降 8.9%。即便如此，OCF 仍有 $6.71B。模型按「价格 × 产量 - 单位成本 - 资本开支」搭建。FY15 则是反面：减值导致 $129 亿亏损。")},
        {"headline": L("The merger doubles the base; per share is the test.", "合并让体量翻倍，检验在每股。"),
         "body": L("Coterra (closed May 7) lifts output from ~0.84 to ~1.6M Boe/d but adds ~532M shares. Value per share rises only if the $1B synergies and buybacks outrun that dilution. Over FY11-25 shares already rose 53%.",
                   "Coterra（5月7日完成）把产量从约 84 万提升到约 160 万桶油当量/天，但新增约 5.32 亿股。只有 $10 亿协同和回购跑赢稀释，每股价值才会提升。FY11-25 股数已增加 53%。")},
        {"headline": L("Asset sales should close the discount.", "出售资产应能收窄折价。"),
         "body": L("Eagle Ford sold for $4.2B, about 40% above proved value, while DVN trades ~4.8x 2027E EV/EBITDA, a turn below peers. Activists (Toms, Kimmeridge) push for more. Selling is not free: our base deck puts the lost cash flow at about -$3/share.",
                   "Eagle Ford 以 $42 亿出售，约比探明储量价值高 40%；而 DVN 按 2027E 只有约 4.8x EV/EBITDA，比同行低约一倍。激进投资者（Toms、Kimmeridge）在推动更多出售。但出售不是免费的：按基准价格，失去的现金流约合每股 -$3。")},
        {"headline": L("Cash returns are large for the size.", "相对市值，现金回报很大。"),
         "body": L("Devon returns ~70% of FCF, raised the dividend 33% to $0.32 a quarter and has an $8B buyback. Base 2027E FCF ~$6.7B is a ~13% yield at $50.5B. Watch shares below 1,150M. $1.25B of 2026 debt repayment targets net debt below 1x EBITDA by end-2027.",
                   "公司约 70% 的 FCF 回馈股东，季度股息上调 33% 至 $0.32，并有 $80 亿回购授权。基准 2027E FCF 约 $67 亿，按 $505 亿市值约 13% 收益率。关注股数是否降到 11.5 亿以下。2026 年偿债 $12.5 亿，目标是 2027 年底净债务/EBITDA 低于 1 倍。")},
        {"headline": L("Low cost limits the downside.", "低成本限制了下行空间。"),
         "body": L("Breakeven is just under $44 WTI. On Morningstar's $60 deck our model gives $52.83. Oil fell ~7% on Nov 2 on Iran talks and the stock is $44.27, below that conservative anchor. Q3 EPS of $1.42 beat the $1.31 consensus (Nov 5).",
                   "盈亏平衡在 $44 WTI 以下。用 Morningstar 的 $60 价格，我们的模型得出 $52.83。11月2日因美伊和谈油价跌约 7%，股价已到 $44.27，低于这一保守锚点。Q3 EPS $1.42，高于 $1.31 的一致预期（11月5日）。")},
        {"headline": L("The DCF needs volume held, not high oil.", "DCF 要的是守住产量，而不是高油价。"),
         "body": L("Base $69.33 (8.31% WACC, 1.5% g) needs WTI $79 in 2027 fading to $70 and ~$5.5B capex holding ~1.6M Boe/d. At $44.27 that is +56.6%. I sit 11.8% above Morningstar ($62), mostly on the price deck. Failure test: WTI below $60 for a quarter, or 2027 capex above $6B for flat output.",
                   "基准价值 $69.33（WACC 8.31%，g 1.5%）要求 2027 年 WTI $79、之后回落到 $70，且约 $55 亿资本开支能维持约 160 万桶油当量/天。按 $44.27 计，空间 +56.6%。我比 Morningstar（$62）高 11.8%，主要来自油价假设。失效信号：WTI 连续一个季度低于 $60，或 2027 年资本开支超过 $60 亿而产量持平。")}],
    "footnotes": L([
        "FY11-25 from SEC 10-K XBRL (latest filing for each year); Devon standalone (Coterra from May 2026 not included). FY11-15 include EnLink midstream; FY16-20 continuing operations.",
        "EBIT* = pretax income + interest expense (GAAP, incl. impairments); EBITDA* = EBIT + DD&A. KPI EBITDA* and net debt from S&P via StockAnalysis. FCF = OCF - capex. Acquisitions* = S&P capex less reported capex (FY21-25 only).",
        "ROIC* = EBIT x (1-22%) / (equity + debt - cash), year-end. Dividend/Sh.* = dividends paid / diluted shares. FY21-25 P/E, yields and Mkt cap* from StockAnalysis (FY-end basis).",
        "Header: Nov 16, 2026 close $44.27, 1.14B shares; book value = Jun 30, 2026 equity $41.7B / 1.14B; TTM P/E and P/FCF (TTM capex includes merger-period spending).",
        "DCF: Pythia/SMF model, valuation date Oct 30, 2026 (price $52.15); WACC 8.31%, g 1.5%. Morningstar FV Oct 9, 2026; S&P GMI = 28-analyst avg target, Nov 1, 2026.",
        "Sources: Devon 10-K, 10-K/A, 8-K (Oct 8, 2026), Q2-26 results; SEC EDGAR; StockAnalysis; Morningstar; EIA STEO."],
        ["FY11-25 数据取自 SEC 10-K XBRL（各年度以最新申报为准）；为 Devon 单体，不含 2026年5月起的 Coterra。FY11-15 含 EnLink 中游；FY16-20 为持续经营口径。",
         "EBIT* = 税前利润 + 利息支出（GAAP，含减值）；EBITDA* = EBIT + DD&A。KPI 中的 EBITDA* 与净债务取自 S&P（经 StockAnalysis）。FCF = OCF - 资本开支。收购支出* = S&P 资本开支减公司披露资本开支（仅 FY21-25）。",
         "ROIC* = EBIT ×（1-22%）/（权益 + 债务 - 现金），年末口径。每股股息* = 已付股息 / 稀释股数。FY21-25 的 P/E、收益率与市值*取自 StockAnalysis（年末口径）。",
         "首行：2026年11月16日收盘 $44.27，11.4 亿股；每股账面 = 2026年6月30日权益 $41.7B / 11.4 亿股；P/E、P/FCF 为 TTM（TTM 资本开支含合并期支出）。",
         "DCF：Pythia/SMF 模型，估值日 2026年10月30日（股价 $52.15）；WACC 8.31%，g 1.5%。Morningstar 合理价值为 2026年10月9日；S&P GMI 为 2026年11月1日 28 位分析师平均目标价。",
         "来源：Devon 10-K、10-K/A、8-K（2026年10月8日）、Q2-26 业绩；SEC EDGAR；StockAnalysis；Morningstar；EIA STEO。"]),
    "brand_mark": "PYTHIA",
    "website": {
        "id": "dvn", "name": L("Devon Energy", "戴文能源"), "exchange": "NYSE", "market": "US", "sector": "Energy", "industry": "Oil & Gas E&P",
        "indices": ["S&P 500", "Russell 1000"], "updated": "2026-11-17", "price_date": "2026-11-16", "currency": "USD", "moat": "Narrow",
        "summary": L("A low-cost, multi-basin shale producer absorbing Coterra; at $44 the stock is below even Morningstar's $60-oil case, and the upside rests on synergies, asset sales and buybacks.",
                     "低成本、多盆地的页岩油气生产商，正在整合 Coterra；股价 $44 已低于按 Morningstar $60 油价算出的价值，上行空间来自协同效应、出售资产和回购。"),
        "tags": [L("Oil & gas", "油气"), "E&P", L("Shale", "页岩"), L("M&A integration", "并购整合")],
        "business": L(
            "### A pure upstream producer\nDevon finds, drills and produces oil, natural gas and NGLs and sells them at market prices. Unlike integrated majors it has no refining or chemicals, so profit = price × volume - unit cost.\n\n### Portfolio\n- **Delaware Basin (Permian):** the core, about two-thirds of production and more than 60% of the 2026 budget.\n- **Williston, Anadarko:** oil and liquids; Williston grew with the 2024 Grayson Mill deal.\n- **Marcellus:** gas added by the all-stock Coterra merger (closed May 7, 2026).\n- **Eagle Ford:** being sold to Crescent for $4.2B (closing Q4 2026 or early 2027).\n\n### Key risks\nOil and gas prices, merger integration, well decline and capex intensity, Waha gas basis, reserve estimates and regulation.",
            "### 纯上游生产商\nDevon 勘探、钻井并生产原油、天然气和 NGL，按市价出售。与综合性石油巨头不同，它没有炼化和化工业务，因此利润 = 价格 × 产量 - 单位成本。\n\n### 资产组合\n- **Delaware 盆地（Permian）：** 核心资产，约占产量三分之二、2026 年预算 60% 以上。\n- **Williston、Anadarko：** 原油与液体；Williston 因 2024 年收购 Grayson Mill 扩大。\n- **Marcellus：** 全股票合并 Coterra（2026年5月7日完成）带来的天然气资产。\n- **Eagle Ford：** 正以 $42 亿出售给 Crescent（预计 2026 年四季度或 2027 年初完成）。\n\n### 关键风险\n油气价格、合并整合、老井递减与资本开支强度、Waha 气价价差、储量估计和监管。"),
        "segments": [], "revenue_cagr": "Price-driven (WTI $79 → $70)", "margin": "EBITDA margin 47–49%",
        "gap": {
            "summary": L(
                "My base value of **$69.33** is **$7.33 (11.8%)** above Morningstar's **$62**. Two steps explain it.\n\n- **Step 1 — same oil price, my model: −$9.17.** Running my model on Morningstar's own price forecast ($60 WTI long run) gives **$52.83**, below their $62. So apart from prices, my model is the more conservative one (discount rate, terminal value, synergy credit and the Eagle Ford sale), even though Morningstar assumes lower volumes (1,499 vs 1,625 MBoe/d).\n- **Step 2 — my oil price forecast: +$16.50.** I use the EIA path (WTI $79 in 2027 easing to $70) instead of Morningstar's ($73 easing to $60). That lifts the value from $52.83 to **$69.33**.\n\nIn short, the whole gap is about the long-run oil price. If oil settles near $60, my model says DVN is worth about $53.",
                "我的基准价值 **$69.33** 比 Morningstar 的 **$62** 高 **$7.33（11.8%）**，可以拆成两步。\n\n- **第 1 步——用同样的油价，换成我的模型：−$9.17。** 用 Morningstar 自己的价格预测（长期 $60 WTI）跑我的模型，得到 **$52.83**，比他们的 $62 低。说明除油价以外，我的模型整体更保守（折现率、终值、协同效应和出售 Eagle Ford 的处理），尽管 Morningstar 假设的产量更低（1,499 vs 1,625 千桶油当量/天）。\n- **第 2 步——换成我的油价预测：+$16.50。** 我采用 EIA 的路径（2027 年 WTI $79，之后回落到 $70），而不是 Morningstar 的（$73 回落到 $60），价值因此从 $52.83 升到 **$69.33**。\n\n简单说，差距全部来自对长期油价的判断。如果油价长期在 $60 左右，我的模型认为 DVN 约值 $53。"),
            "bridge": [{"driver": L("Same oil price, my model", "同样的油价，换成我的模型"), "impact": -9.17},
                       {"driver": L("My oil price forecast (WTI $79 → $70)", "换成我的油价预测（WTI $79 → $70）"), "impact": 16.50}],
            "assumptions": [
                {"item": L("WTI / HH 2027E", "2027E WTI / HH"), "mine": "$79 / $3.16", "morningstar": "$73 / $3.42", "sp": "—", "note": ""},
                {"item": L("Midcycle price", "中周期价格"), "mine": "$70 / $3.50", "morningstar": "$60 / $3.70", "sp": "—", "note": ""},
                {"item": L("Production 2027E (MBoe/d)", "2027E 产量（千桶油当量/天）"), "mine": "1,625", "morningstar": "1,499", "sp": "—", "note": ""},
                {"item": L("EBITDA 2027E", "2027E EBITDA"), "mine": "$13.8B", "morningstar": "$9.4B", "sp": "$14.6B", "note": L("S&P = consensus", "S&P 为一致预期")},
                {"item": L("EPS 2027E", "2027E EPS"), "mine": "$4.12", "morningstar": "$2.39", "sp": "$5.41", "note": L("Mine includes Coterra step-up DD&A", "我的口径含 Coterra 增值折耗")}]},
        "files": [{"type": "onepage", "lang": "en", "label": "One Page", "path": "reports/dvn/DVN_OnePage_en.pdf", "date": "2026-11-17"},
                  {"type": "onepage", "lang": "zh", "label": "One Page", "path": "reports/dvn/DVN_OnePage_zh.pdf", "date": "2026-11-17"}],
        "onepage_image": L("reports/dvn/DVN_OnePage_en.png", "reports/dvn/DVN_OnePage_zh.png"),
        "history": [{"date": "2026-11-17", "note": L("One Page V2 with DCF", "One Page V2（含 DCF）")},
                    {"date": "2026-11-02", "note": L("Pitch: preliminary Buy, base $69.33", "推介：初步买入，基准 $69.33")}]},
}
json.dump(spec, open("onepage/specs/dvn_onepage.json", "w"), ensure_ascii=False, indent=1)
print("CAGR rows:", cg)
print("OCF/sh, FCF/sh FY25:", round(ocfps[-1], 2), round(fcfps[-1], 2))
