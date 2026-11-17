"""Build onepage/specs/orcl_onepage.json from the SEC working table (orcl_D.json) plus the analyst's ORCL materials
(ORCL_DCF_Model_10Y.xlsx recalculated, Oracle A4 analyses, FY2026 10-K and Q1 FY2027 10-Q).
Usage: python onepage/build_orcl_spec.py path/to/orcl_D.json
"""
import json, sys

D = {int(k): v for k, v in json.load(open(sys.argv[1])).items()}
Y = list(range(2012, 2027))          # Oracle fiscal years end May 31
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
        a, b = f(2026 - n), f(2026)
    except (TypeError, ZeroDivisionError, KeyError):
        return "NM"
    if a is None or b is None or a <= 0 or b <= 0:
        return "NM"
    v = ((b / a) ** (1 / n) - 1) * 100
    s = f"{v:.1f}%"
    return s.replace("0.", ".", 1) if s.startswith(("0.", "-0.")) else s


def crow(lab, f):
    return [lab] + [cagr(f, n) for n in (1, 3, 5, 10, 14)]


roe = col(lambda d, y: "NM*" if d["eq"] <= 0 or d["eq"] / d["assets"] < 0.08 else d["ni"] / d["eq"] * 100)

G = [
    [{"key": "revenue", "values": r("rev")},
     {"key": "rev_yoy", "values": [(D[y]["rev"] / D[y - 1]["rev"] - 1) * 100 for y in Y]},
     {"key": "gross_margin", "metric": L("EBITDA Margin*", "EBITDA利润率*"), "values": pct("ebitda", "rev")},
     {"key": "op_income", "values": r("op")},
     {"key": "op_margin", "values": pct("op", "rev")},
     {"key": "net_income", "values": r("ni")},
     {"key": "net_margin", "values": pct("ni", "rev")}],
    [{"key": "ocf", "values": r("ocf")},
     {"key": "ocf_margin", "values": pct("ocf", "rev")},
     {"key": "ocf_ni", "fmt": "x", "values": col(lambda d, y: d["ocf"] / d["ni"])},
     {"key": "capex", "values": r("capex")},
     {"key": "capex_ocf", "values": pct("capex", "ocf")},
     {"key": "fcf", "values": r("fcf")},
     {"key": "fcf_margin", "values": pct("fcf", "rev")}],
    [{"key": "acq", "metric": L("Acquisitions", "收购支出"), "values": nz("acq")},
     {"key": "acq_ocf", "metric": L("Acquisitions / OCF", "收购/OCF"), "values": col(lambda d, y: d["acq"] / d["ocf"] * 100 if d["acq"] else None)},
     {"key": "sbc", "values": r("sbc")},
     {"key": "sbc_ocf", "values": pct("sbc", "ocf")},
     {"key": "buybacks", "values": nz("bb")},
     {"key": "buybacks_ocf", "values": pct("bb", "ocf")},
     {"key": "dividends", "values": r("div")},
     {"key": "dividends_ocf", "values": pct("div", "ocf")}],
    [{"key": "roic", "metric": "ROIC*", "values": r("roic")},
     {"key": "roe", "metric": "ROE*", "values": roe},
     {"key": "roa", "values": r("roa")}],
    [{"key": "shares", "values": r("sh")},
     {"key": "rev_ps", "values": col(lambda d, y: d["rev"] / d["sh"])},
     {"key": "eps", "values": r("eps")},
     {"key": "ocf_ps", "values": col(lambda d, y: d["ocf"] / d["sh"])},
     {"key": "capex_ps", "values": col(lambda d, y: d["capex"] / d["sh"])},
     {"key": "fcf_ps", "values": col(lambda d, y: d["fcf"] / d["sh"])},
     {"key": "div_ps", "metric": L("Dividend / Sh.*", "每股股息*"), "values": col(lambda d, y: d["div"] / d["sh"])}],
    [{"key": "avg_pe", "metric": L("P/E (FY-end)*", "年末P/E*"), "values": [None] * 10 + [28.57, 33.64, 30.77, 37.31, 38.23]},
     {"key": "fcf_yield", "metric": L("FCF Yield*", "FCF收益率*"), "values": [None] * 10 + [2.62, 2.96, 3.67, -0.08, -3.65]},
     {"key": "div_yield", "metric": L("Dividend Yield*", "股息率*"), "values": [None] * 10 + [1.78, 1.37, 1.37, 1.09, 0.89]}],
]

ps = lambda k: (lambda y: D[y][k] / D[y]["sh"])
cg = [crow(L("Revenue", "营收"), lambda y: D[y]["rev"]),
      crow(L("Op. Income", "营业利润"), lambda y: D[y]["op"]),
      crow(L("OCF", "OCF"), lambda y: D[y]["ocf"]),
      crow(L("Capex", "资本开支"), lambda y: D[y]["capex"]),
      crow(L("Diluted EPS", "稀释EPS"), lambda y: D[y]["eps"]),
      crow(L("FCF / Sh.", "每股FCF"), ps("fcf")),
      crow(L("Div. / Sh.", "每股股息"), ps("div"))]

B = 1000.0
fp = lambda f: [f"{f(D[y]):.1f}" for y in range(2022, 2027)]
ocfps = col(lambda d, y: d["ocf"] / d["sh"])
fcfps = col(lambda d, y: d["fcf"] / d["sh"])

spec = {
    "lang": "en",
    "meta_line": L("ORCL | FY26: May 31, 2026 | Q1 FY27: Aug 31, 2026 | Market: Nov 16, 2026 | USD | Issued: Nov 17, 2026",
                   "ORCL | FY26：2026年5月31日 | Q1 FY27：2026年8月31日 | 市场日期：2026年11月16日 | 美元 | 发布日期：2026年11月17日"),
    "company": {"name": L("ORACLE", "甲骨文"), "ticker": "ORCL", "name_size_pt": 24, "name_width_in": 2.0},
    "header_metrics": [{"value": "371.6B"}, {"value": "119.09"}, {"value": "21.54"}, {"value": "18.7x"}, {"value": "NM"}, {"value": "1.7%"}],
    "business_chain": {
        "title": L("HOW IT EARNS CASH | BUSINESS CHAIN", "现金生成路径"),
        "lines": L(["1 Contract | Multi-year AI/cloud capacity deals: RPO $638B at FY26, $664B at Aug 31.",
                    "2 Build | FY26 capex $55.7B (82.6% of revenue) plus $288B of leases not yet begun.",
                    "3 Run | Q1 FY27 OCI revenue +121% to $7.39B; cloud apps +9.9% to $4.22B.",
                    "4 Defend | License support (~$24.5B, 36% of FY26) is the cash engine.",
                    "5 Collect | FY26 OCF $32.0B - capex $55.7B = FCF -$23.7B → debt, equity, prepayments."],
                   ["1 签约 | 多年期 AI/云算力合同：FY26 末 RPO $638B，8月31日 $664B。",
                    "2 建设 | FY26 资本开支 $557 亿（占营收 82.6%），另有 $2,880 亿尚未起租的租约。",
                    "3 运营 | Q1 FY27 OCI 收入 +121% 至 $7.39B；云应用 +9.9% 至 $4.22B。",
                    "4 守住 | 许可证支持收入（约 $245 亿，占 FY26 36%）是现金引擎。",
                    "5 回款 | FY26 OCF $32.0B - 资本开支 $55.7B = FCF -$23.7B → 靠举债、增发、预付款补足。"]),
        "watch": L("Watch: OCI delivery on time, capex vs OCF, and customer prepayments.",
                   "关注：OCI 能否按时交付、资本开支与 OCF 的缺口、客户预付款。")},
    "mix_table": {
        "title": L("REVENUE BY LINE | FY26", "收入构成 | FY26"),
        "columns": [L("Revenue", "营收"), "$M", L("Mix", "占比"), L("YoY", "同比")],
        "rows": [[L("Cloud infrastructure (OCI)", "云基础设施（OCI）"), "18,200", "27.0%", "+76.7%"],
                 [L("Cloud applications", "云应用（SaaS）"), "15,800", "23.5%", "+11.3%"],
                 [L("License support & license", "许可证支持与许可证"), "24,530", "36.4%", "-.8%"],
                 [L("Hardware & services", "硬件与服务"), "8,827", "13.1%", "+8.1%"]],
        "total_row": [L("Total revenue", "合计"), "67,357", "100.0%", "+17.3%"],
        "notes": [L("OCI / SaaS split derived from quarterly releases (rounded); Q1 FY27 OCI $7.39B vs $3.35B.",
                    "OCI / SaaS 拆分由季度公告推算（取整）；Q1 FY27 OCI $7.39B，上年同期 $3.35B。")]},
    "chart": {
        "x_labels": [str(y)[-2:] for y in Y], "ocf_ps": ocfps, "fcf_ps": fcfps, "last_price": 119.09, "log": True,
        "price_min": 20, "price_max": 400, "price_ticks": [25, 50, 100, 200, 400], "cash_max": 12, "cash_min": -10,
        "legend": L([f"OCF / sh ${ocfps[-1]:.2f}", f"FCF / sh -${-fcfps[-1]:.2f}"], [f"OCF /股 ${ocfps[-1]:.2f}", f"FCF /股 -${-fcfps[-1]:.2f}"]),
        "note": L("FY ends May; cash $/sh L lin; price R log (Nov 16, 2026)", "财年截至5月；现金$/股：左线性 | 股价：右对数（2026年11月16日）"),
        "annotations": [{"x": 4.5, "text": L("NetSuite FY17", "收购 NetSuite FY17")},
                        {"x": 10.05, "dy": 10, "text": L("Cerner 06/2022", "收购 Cerner 06/2022")},
                        {"x": 13.3, "dy": 20, "text": L("AI capex build", "AI 资本开支扩张")}]},
    "value_creation": {
        "title": L("VALUE CREATION", "价值创造"), "columns": [f"FY{str(y)[-2:]}" for y in Y], "money_unit": "$M", "share_unit": "M sh", "groups": G,
        "sidebar": [
            {"title": L("Contracted demand", "已签约需求"),
             "text": L("RPO $638B at FY26 vs $138B a year earlier; ~13% to be recognised within 12 months.",
                       "FY26 末 RPO $638B（上年 $138B）；约 13% 将在 12 个月内确认收入。")},
            {"title": L("Four revenue lines", "四条收入线"), "sub": [
                {"title": "OCI", "text": L("27% of FY26 revenue; +77%.", "占 FY26 营收 27%；+77%。")},
                {"title": L("Cloud apps", "云应用"), "text": L("23%; +11%.", "23%；+11%。")},
                {"title": L("License support", "许可证支持"), "text": L("36%; flat, high margin.", "36%；持平，高利润率。")},
                {"title": L("Hardware & services", "硬件与服务"), "text": L("13%; low growth.", "13%；低增长。")}]},
            {"title": L("Margin mix", "利润结构"),
             "text": L("FY26 op. margin 30.6%; gross margin ~66% vs ~80% in FY17 as infrastructure costs rise.",
                       "FY26 营业利润率 30.6%；随着基础设施成本上升，毛利率由 FY17 约 80% 降至约 66%。")},
            {"title": L("Funding gap", "资金缺口"),
             "text": L("FY26 OCF $32.0B - capex $55.7B = FCF -$23.7B; TTM gap -$28.7B; prepayments are 34% of TTM OCF.",
                       "FY26 OCF $32.0B - 资本开支 $55.7B = FCF -$23.7B；TTM 缺口 -$28.7B；预付款占 TTM OCF 34%。")},
            {"title": L("Return condition", "回报条件"), "final": True,
             "text": L("New OCI capacity must earn more than its cost of capital and turn FCF positive (~FY2030 in my model) before debt and lease commitments tighten.",
                       "新增的 OCI 算力必须赚到高于资本成本的回报，并在债务和租约压力加大前让 FCF 转正（我的模型中约在 FY2030）。")}]},
    "labels": {"sp": L("Street avg target", "华尔街平均目标价"), "bull": L("Guidance", "公司指引")},
    "dcf": {
        "as_of": L("Nov 6, 2026", "2026年11月6日"), "price": 119.09,
        "scenarios": [{"name": "bear", "value": 101.32}, {"name": "base", "value": 243.09}, {"name": "bull", "value": 251.67}],
        "wacc": "9.6%", "terminal_growth": "3.0%", "horizon": "FY27-36", "morningstar": 195.0, "sp": 235.77, "show_weighted": False,
        "notes": [L("Base = blend of guidance and consensus; consensus case $233.29. Beta 1.4; TV 74% of EV.",
                    "基准 = 公司指引与一致预期的平均；一致预期情景 $233.29。Beta 1.4；终值占 EV 74%。"),
                  L("Morningstar FV dated Oct 15, 2026 (Very High uncertainty). vs price: Nov 16 close.",
                    "Morningstar 估值日 2026年10月15日（不确定性 Very High）。较现价按 11月16日收盘。")]},
    "kpi_tracker": {
        "title": L("CORE KPI TRACKER | FY22-26", "核心KPI | FY22-26"),
        "columns": [L("Metric", "指标"), "FY22", "FY23", "FY24", "FY25", "FY26"],
        "rows": [[L("RPO ($B)", "RPO（$B）"), "46.6", "67.9", "97.9", "137.8", "638"],
                 [L("Capex / revenue", "资本开支/营收"), "10.6%", "17.4%", "13.0%", "37.0%", "82.6%"],
                 [L("EBIT / interest", "EBIT/利息"), "3.97x", "3.74x", "4.37x", "4.94x", "4.48x"],
                 [L("Net debt / EBITDA*", "净债务/EBITDA*"), "2.85x", "4.04x", "3.43x", "3.36x", "3.08x"],
                 [L("Depreciation ($B)", "折旧（$B）"), "2.0", "2.5", "3.1", "3.9", "7.6"]]},
    "cagr": {"title": L("COMPOUND ANNUAL GROWTH RATE", "复合年增长率 | CAGR"), "columns": ["", "1Y", "3Y", "5Y", "10Y", "14Y"], "rows": cg},
    "financial_position": {
        "title": L("FINANCIAL POSITION | $B", "财务状况 | $B"), "columns": ["", "FY22", "FY23", "FY24", "FY25", "FY26"],
        "rows": [[L("Tot. assets", "总资产")] + fp(lambda d: d["assets"] / B),
                 [L("Tot. liabilities", "总负债")] + fp(lambda d: (d["assets"] - d["eqt"]) / B),
                 [L("Total debt", "总债务")] + fp(lambda d: d["debt"] / B),
                 [L("Mkt cap*", "市值*"), "191.9", "286.0", "322.1", "464.2", "649.4"],
                 [L("Cash + ST", "现金及短投")] + fp(lambda d: d["cash"] / B),
                 [L("Liab./assets", "负债/资产")] + [f"{(D[y]['assets'] - D[y]['eqt']) / D[y]['assets'] * 100:.1f}%" for y in range(2022, 2027)]]},
    "lead_paragraphs": [
        {"label": L("CAPITAL RETURNS:", "现金分配："), "text": L(
            "FY12-26 OCF $242.4B less capex $110.5B left **$131.9B FCF**. Buybacks **$155.9B (118%)**; dividends **$46.5B (35%)**; acquisitions **$59.8B** (Cerner $27.7B). Buybacks stopped as the AI build began: **$0.1B** in FY26 vs $36.1B in FY19.",
            "FY12-26 OCF $242.4B 减资本开支 $110.5B，得 **FCF $131.9B**。回购 **$155.9B（118%）**；股息 **$46.5B（35%）**；收购 **$59.8B**（Cerner $27.7B）。AI 建设开始后回购几乎停止：FY26 仅 **$0.1B**，FY19 为 $36.1B。")},
        {"label": L("NET SHARES:", "净股数变化："), "text": L(
            "Diluted shares FY12 5,095M to FY26 2,914M, **down 43%** on debt-funded buybacks. The trend has reversed: ~**$19.9B of ATM equity** in Q1 FY27 lifted shares outstanding to **3.12B**, about 7% above the FY26 count.",
            "稀释股数由 FY12 的 5,095M 降至 FY26 的 2,914M，**减少 43%**，主要靠举债回购。趋势已经反转：Q1 FY27 通过 ATM 增发约 **$199 亿**股票，流通股增至 **31.2 亿股**，比 FY26 多约 7%。")}],
    "commentary": [
        {"headline": L("Growth is real; the bill is capital.", "增长是真的，代价是资本。"),
         "body": L("Q1 FY27 revenue rose 29.6% to $19.35B and EBIT 57.3% to $6.73B, led by OCI (+121%). Capex rose 3.35x to $28.5B in the same quarter, so each new revenue dollar now costs more than a dollar of upfront spending.",
                   "Q1 FY27 营收增长 29.6% 至 $19.35B，EBIT 增长 57.3% 至 $6.73B，主要靠 OCI（+121%）。同一季度资本开支增至 3.35 倍，达 $28.5B：每新增一美元收入，前期要先投入超过一美元。")},
        {"headline": L("A software cash machine became a builder.", "软件现金机器变成了建设者。"),
         "body": L("Capex was 5.3% of revenue in FY17 and 82.6% in FY26. FCF went from +$11.8B (FY24) to -$0.4B (FY25) and -$23.7B (FY26). Past software cash flow cannot be extrapolated; depreciation alone rose from $3.9B to $7.6B in one year.",
                   "资本开支占营收由 FY17 的 5.3% 升至 FY26 的 82.6%。FCF 由 FY24 的 +$11.8B 变为 FY25 的 -$0.4B、FY26 的 -$23.7B。过去的软件现金流不能直接外推；仅折旧一年内就由 $3.9B 升至 $7.6B，未来几年折旧还会持续压低利润率。")},
        {"headline": L("Prepayments flatter the cash flow.", "预付款美化了现金流。"),
         "body": L("Customer prepayments of $16.0B are 34% of TTM OCF. Without them, OCF covers 41% of capex instead of 62%. Real liquidity, but tied to future delivery: if a large customer slows its build or renegotiates, OCF falls just as capex peaks.",
                   "客户预付款 $16.0B，占 TTM OCF 34%。剔除后，OCF 对资本开支的覆盖由 62% 降至 41%。这是真实的流动性，但与未来交付义务绑定：若大客户放缓建设或重新谈判，OCF 会在资本开支见顶时同步下滑。")},
        {"headline": L("Leverage and leases limit flexibility.", "杠杆和租约限制了灵活性。"),
         "body": L("Debt is $134.5B incl. finance leases; EBIT covers interest 4.5x. Another $288B of data-center leases has not yet started. S&P downgraded Oracle in July 2026. Buybacks have stopped and ATM equity is now a funding source, so per-share value depends on capital discipline.",
                   "含融资租赁的债务 $134.5B；EBIT 覆盖利息 4.5 倍。另有 $2,880 亿数据中心租约尚未起租。S&P 已于 2026年7月下调 Oracle 评级。回购已停止，ATM 增发成为资金来源，每股价值取决于资本纪律。")},
        {"headline": L("RPO is visibility, not cash.", "RPO 是可见度，不是现金。"),
         "body": L("$664B of RPO, ~13% in the next 12 months, depends on on-time capacity. Morningstar cut the moat to Narrow and flagged a possible $25B+ revenue delay on Project Jupiter. Track RPO conversion each quarter, not new bookings.",
                   "$664B 的 RPO 中约 13% 在未来 12 个月确认，前提是算力按时交付。Morningstar 已把护城河下调为 Narrow，并提示 Project Jupiter 可能延迟 $250 亿以上收入。应逐季跟踪 RPO 转化为收入的速度，而不是新签合同额。")},
        {"headline": L("The DCF needs capex to roll over.", "DCF 需要资本开支见顶回落。"),
         "body": L("Base $243.09 (9.6% WACC, 3% g, beta 1.4) needs ~$373B revenue by FY36 at a 32% EBIT margin and capex falling to ~13.5% of sales; 74% of EV is terminal. At $119.09 that is +104%; bear $101.32 is -15%. Morningstar ($195) uses the same WACC and revenue path but peaks capex at $120B, not $84B, and keeps FCF negative until FY31; that capex path, not the discount rate, explains most of the $48 gap.",
                   "基准价值 $243.09（WACC 9.6%，g 3%，beta 1.4）要求 FY36 营收约 $3,730 亿、EBIT 利润率 32%，且资本开支降到营收约 13.5%；终值占 EV 74%。按 $119.09 计空间 +104%；悲观情景 $101.32，下跌 15%。Morningstar（$195）的 WACC 和营收路径与我相近，但资本开支峰值为 $1,200 亿（我的是 $840 亿），FCF 到 FY31 才转正；$48 的差距主要来自资本开支路径，而不是折现率。")}],
    "footnotes": L([
        "FY12-26 from SEC 10-K XBRL (fiscal years end May 31); Q1 FY27 and TTM from the Aug 31, 2026 10-Q. Cash + ST FY17-26 from the analyst model (cash + marketable securities).",
        "EBITDA* = operating income + depreciation + intangible amortisation. FCF = OCF - capex. Debt = notes payable incl. current portion (excl. leases). Net debt/EBITDA* from the analyst model.",
        "ROIC* = op. income x (1-17%) / (equity + debt - cash), year-end. ROE* NM when equity < 8% of assets (buybacks shrank equity). Dividend/Sh.* = dividends paid / diluted shares.",
        "Header: Nov 16, 2026 close $119.09, 3.12B shares; book value = Aug 31, 2026 equity $67.2B / 3.12B; TTM P/E; P/FCF NM (negative FCF). FY22-26 P/E, yields and Mkt cap* from StockAnalysis (FY-end).",
        "DCF: Pythia model ORCL_DCF_Model_10Y, valuation date Nov 6, 2026 (price $116.10); WACC 9.6%, g 3.0%. Street avg target = 42-analyst average via StockAnalysis/S&P Global. Morningstar FV $195 (Oct 15, 2026).",
        "Sources: Oracle FY2026 10-K, Q1 FY2027 10-Q; SEC EDGAR; StockAnalysis; Morningstar equity report (Nov 17, 2026) and notes (Mar-Oct 2026); S&P Global Ratings (Jul 10, 2026)."],
        ["FY12-26 数据取自 SEC 10-K XBRL（财年截至 5月31日）；Q1 FY27 与 TTM 取自 2026年8月31日 10-Q。FY17-26 现金及短投取自分析模型（现金 + 有价证券）。",
         "EBITDA* = 营业利润 + 折旧 + 无形资产摊销。FCF = OCF - 资本开支。债务 = 应付票据（含一年内到期，不含租赁）。净债务/EBITDA* 取自分析模型。",
         "ROIC* = 营业利润 ×（1-17%）/（权益 + 债务 - 现金），年末口径。ROE* 在权益低于资产 8% 时记为 NM（回购使权益缩小）。每股股息* = 已付股息 / 稀释股数。",
         "首行：2026年11月16日收盘 $119.09，31.2 亿股；每股账面 = 2026年8月31日权益 $67.2B / 31.2 亿股；TTM P/E；P/FCF 为 NM（FCF 为负）。FY22-26 的 P/E、收益率与市值*取自 StockAnalysis（年末口径）。",
         "DCF：Pythia 模型 ORCL_DCF_Model_10Y，估值日 2026年11月6日（股价 $116.10）；WACC 9.6%，g 3.0%。华尔街平均目标价为 42 位分析师平均（StockAnalysis / S&P Global）。Morningstar 合理价值 $195（2026年10月15日）。",
         "来源：Oracle FY2026 10-K、Q1 FY2027 10-Q；SEC EDGAR；StockAnalysis；Morningstar 股票研究报告（2026年11月17日）及 3-10月 点评；S&P Global Ratings（2026年7月10日）。"]),
    "brand_mark": "PYTHIA",
    "website": {
        "id": "orcl", "name": L("Oracle", "甲骨文"), "exchange": "NYSE", "market": "US", "sector": "Information Technology", "industry": "Systems Software",
        "indices": ["S&P 500", "Russell 1000"], "updated": "2026-11-17", "price_date": "2026-11-16", "currency": "USD", "moat": "Narrow",
        "summary": L("A software cash machine turned AI-infrastructure builder: OCI growth and a $664B backlog are real, but capex now exceeds operating cash flow, so the value depends on capex rolling over before debt and lease commitments bite.",
                     "从软件现金机器转型为 AI 基础设施建设者：OCI 增长和 $6,640 亿未履约合同是真的，但资本开支已超过经营现金流，价值取决于资本开支能否在债务和租约压力加大前见顶回落。"),
        "tags": [L("Cloud infrastructure", "云基础设施"), "AI", L("Database & software", "数据库与软件"), L("Capex cycle", "资本开支周期")],
        "business": L(
            "### Four revenue lines\n- **Oracle Cloud Infrastructure (OCI):** rents compute and GPU capacity, largely to AI customers; about 27% of FY26 revenue and growing fastest (+121% in Q1 FY27).\n- **Cloud applications (SaaS):** Fusion ERP, NetSuite, health (Cerner); about 23%.\n- **License support and licenses:** the database and middleware installed base; about 36%, flat but very profitable.\n- **Hardware and services:** about 13%.\n\n### The change\nOracle is spending most of its revenue on data centers (capex 82.6% of FY26 revenue) to deliver contracted AI capacity. Remaining performance obligations reached $664B at Aug 31, 2026.\n\n### Key risks\nFunding gap and leverage ($134.5B debt, $288B of uncommenced leases), customer concentration and prepayment timing, delivery delays, AI demand cycle, and the 2026 credit downgrade.",
            "### 四条收入线\n- **Oracle 云基础设施（OCI）：** 出租算力和 GPU，主要客户是 AI 公司；约占 FY26 营收 27%，增长最快（Q1 FY27 +121%）。\n- **云应用（SaaS）：** Fusion ERP、NetSuite、医疗（Cerner）；约 23%。\n- **许可证支持与许可证：** 数据库和中间件的存量客户；约 36%，持平但利润率很高。\n- **硬件与服务：** 约 13%。\n\n### 发生了什么变化\nOracle 把大部分营收投入数据中心（FY26 资本开支占营收 82.6%），以交付已签约的 AI 算力。截至 2026年8月31日，未履约合同（RPO）达 $6,640 亿。\n\n### 关键风险\n资金缺口与杠杆（债务 $1,345 亿、$2,880 亿未起租租约）、客户集中与预付款时点、交付延迟、AI 需求周期，以及 2026 年信用评级下调。"),
        "segments": [{"name": L("License support & license", "许可证支持与许可证"), "share": 36.4},
                     {"name": L("Cloud infrastructure (OCI)", "云基础设施（OCI）"), "share": 27.0},
                     {"name": L("Cloud applications", "云应用"), "share": 23.5},
                     {"name": L("Hardware & services", "硬件与服务"), "share": 13.1}],
        "revenue_cagr": "~19% (FY26-36, blended)", "margin": "EBIT margin 31% → 32% (FY27-36)",
        "gap": {
            "summary": L(
                "Morningstar's fair value is **$195** (Oct 15, 2026); mine is **$243.09**, **+$48.09** higher. The two models agree on more than they differ: both use a **9.6% WACC**, both have revenue growing about **31% a year to FY31** (Morningstar $264B, mine $256B) and an operating margin near **28-29%** in FY31, and in both the terminal value is **74% of EV**. The gap is the **capex path**. Morningstar has capex peaking at **$120B in FY28** and free cash flow negative until FY31 (**-$111B** over FY27-31); my model peaks at **$84B** and turns positive in FY30 (**+$17B** over FY27-31). Lower capex also leaves a larger normalised cash flow for my terminal value. Partly offsetting: I divide by **3,193M shares** (after the ATM issuance) against Morningstar's 3,026M. The stock at **$119.09** sits below both.",
                "Morningstar 的合理价值为 **$195**（2026年10月15日）；我的是 **$243.09**，高 **$48.09**。两个模型的共同点多于分歧：WACC 都是 **9.6%**；到 FY31 营收都以每年约 **31%** 增长（Morningstar $2,640 亿，我的 $2,560 亿）；FY31 营业利润率都在 **28-29%**；终值都占 EV 的 **74%**。差距在于 **资本开支路径**。Morningstar 的资本开支在 **FY28 达到 $1,200 亿峰值**，自由现金流到 FY31 才转正（FY27-31 合计 **-$1,110 亿**）；我的模型峰值为 **$840 亿**，FY30 转正（FY27-31 合计 **+$170 亿**）。资本开支更低，也让我的终值所依据的正常化现金流更大。部分抵消的是：我用 **31.93 亿股**（含 ATM 增发）计算，Morningstar 用 30.26 亿股。现价 **$119.09** 低于两者。"),
            "bridge": [
                {"driver": L("Morningstar's own model: equity $568.0B / 3,026M sh = $187.70 (FVE rounded to $195)", "Morningstar 自己的模型：权益 $5,680 亿 / 30.26 亿股 = $187.70（公布值取整为 $195）"), "impact": -7.30},
                {"driver": L("Forecast-period cash flows: PV $227.9B (mine, FY27-36) vs $173.1B (Morningstar, 15 yrs); capex peak $84B vs $120B", "预测期现金流：现值 $2,279 亿（我的，FY27-36）对 $1,731 亿（Morningstar，15 年）；资本开支峰值 $840 亿对 $1,200 亿"), "impact": 18.10},
                {"driver": L("Terminal value: PV $646.2B vs $493.5B; my FY36 FCF ~$100B with capex at 13.5% of sales", "终值：现值 $6,462 亿对 $4,935 亿；我的 FY36 FCF 约 $1,000 亿，资本开支占营收 13.5%"), "impact": 50.44},
                {"driver": L("Net debt: $97.9B vs $98.6B (about the same)", "净债务：$979 亿对 $986 亿（基本相同）"), "impact": 0.26},
                {"driver": L("Share count: 3,193M (incl. ATM issuance) vs 3,026M", "股数：31.93 亿股（含 ATM 增发）对 30.26 亿股"), "impact": -13.42}],
            "assumptions": [
                {"item": L("Value per share", "每股价值"), "mine": "$243.09", "morningstar": "$195.00", "sp": "$235.77", "note": L("Street = average of 42 analysts (StockAnalysis / S&P Global)", "华尔街 = 42 位分析师平均（StockAnalysis / S&P Global）")},
                {"item": "WACC", "mine": "9.6%", "morningstar": "9.6%", "sp": "10.4%", "note": L("Cost of equity: mine 11.1% (beta 1.4), Morningstar 10.8%; S&P Global WACC estimate", "股权成本：我的 11.1%（beta 1.4），Morningstar 10.8%；S&P Global 的 WACC 估计")},
                {"item": L("Revenue FY27E / FY31E", "营收 FY27E / FY31E"), "mine": "$90.2B / $255.5B", "morningstar": "$91.1B / $264.2B", "sp": "—", "note": L("5-yr revenue CAGR 30.6% vs 31.4%", "5 年营收 CAGR 30.6% 对 31.4%")},
                {"item": L("OCI 5-yr CAGR (FY26-31)", "OCI 5 年 CAGR（FY26-31）"), "mine": "61%", "morningstar": "62%", "sp": "—", "note": L("FY27E OCI growth: mine 114%, consensus 116%", "FY27E OCI 增长：我的 114%，一致预期 116%")},
                {"item": L("Operating margin FY31E", "营业利润率 FY31E"), "mine": "28.5%", "morningstar": "28.8%", "sp": "—", "note": L("Morningstar: back to 33% by FY35; mine 32% by FY36", "Morningstar：FY35 回到 33%；我的 FY36 为 32%")},
                {"item": L("Capex peak", "资本开支峰值"), "mine": "$84B (FY28)", "morningstar": "$120B (FY28)", "sp": "—", "note": L("Main source of the gap", "差距的主要来源")},
                {"item": L("FCF FY27-31 (sum)", "FCF FY27-31（合计）"), "mine": "+$17B", "morningstar": "-$111B", "sp": "—", "note": L("First positive year: FY30 vs FY31", "首个转正年份：FY30 对 FY31")},
                {"item": L("Diluted shares", "稀释股数"), "mine": "3,193M", "morningstar": "3,026M", "sp": "—", "note": L("Mine includes the Q1 FY27 ATM issuance", "我的包含 Q1 FY27 ATM 增发")}]},
        "files": [{"type": "onepage", "lang": "en", "label": "One Page", "path": "reports/orcl/ORCL_OnePage_en.pdf", "date": "2026-11-17"},
                  {"type": "onepage", "lang": "zh", "label": "One Page", "path": "reports/orcl/ORCL_OnePage_zh.pdf", "date": "2026-11-17"}],
        "onepage_image": L("reports/orcl/ORCL_OnePage_en.png", "reports/orcl/ORCL_OnePage_zh.png"),
        "history": [{"date": "2026-11-17", "note": L("One Page V2 with DCF; Morningstar FV $195 and gap bridge added", "One Page V2（含 DCF）；补充 Morningstar 合理价值 $195 与差距拆解")},
                    {"date": "2026-11-08", "note": L("A4 analyses and 10-year DCF", "A4 分析与 10 年 DCF")}]},
}
json.dump(spec, open("onepage/specs/orcl_onepage.json", "w"), ensure_ascii=False, indent=1)
print("CAGR rows:", cg)
print("OCF/sh, FCF/sh FY26:", round(ocfps[-1], 2), round(fcfps[-1], 2))
