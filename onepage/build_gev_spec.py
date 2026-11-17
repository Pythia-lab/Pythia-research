"""GE Vernova One Page spec. Usage: PYTHONPATH=onepage python onepage/build_gev_spec.py <GEV_D.json>
GE Vernova was spun off from GE on Apr 2, 2024, so audited history starts in FY2022 (four years).
Sources: SEC XBRL FY2022-25 (GAAP operating income); D&A, debt and cash from the analyst model (S&P);
analyst model GEV_DCF_Model.xlsx (Nov 17, 2026); StockAnalysis."""
import sys
from spec_common import L, load, grid, cagr_block, fin_position, chart, write

D = load(sys.argv[1])
Y = list(range(2022, 2026))
P = 763.57
spec = {
    "lang": "en",
    "meta_line": L("GEV | FY25: Dec 31, 2025 | Q3 26: Sep 30, 2026 | Market: Nov 16, 2026 | USD | Issued: Nov 17, 2026",
                   "GEV | FY25：2025年12月31日 | 2026年Q3：2026年9月30日 | 市场日期：2026年11月16日 | 美元 | 发布日期：2026年11月17日"),
    "company": {"name": L("GE VERNOVA", "GE Vernova"), "ticker": "GEV", "name_size_pt": 20, "name_width_in": 2.2},
    "header_metrics": [{"value": "201.0B"}, {"value": "763.57"}, {"value": "47.62"}, {"value": "20.0x"}, {"value": "11.7x"}, {"value": "0.3%"}],
    "business_chain": {
        "title": L("HOW IT EARNS CASH | BUSINESS CHAIN", "现金生成路径"),
        "lines": L(["1 Order | Q3 2026 orders $29.3B (+96% organic); backlog $197B, >$200B expected in Q4.",
                    "2 Reserve | Gas turbine backlog + slot reservations 122 GW; customers pay deposits up front.",
                    "3 Build | Power $19.8B (52% of FY25), 14.7% margin; Electrification $9.6B, +27.7%.",
                    "4 Fix Wind | Wind $9.1B, still loss-making (-6.6% margin).",
                    "5 Collect | TTM OCF $19.2B incl. down-payments; 2026 FCF guide $16.5B → buybacks, deals."],
                   ["1 接单 | 2026年Q3 订单 $293 亿（有机 +96%）；积压订单 $1,970 亿，预计 Q4 超过 $2,000 亿。",
                    "2 预订 | 燃气轮机积压订单 + 产能预订 122 GW；客户预付定金。",
                    "3 制造 | 电力 $198 亿（占 FY25 52%），利润率 14.7%；电气化 $96 亿，+27.7%。",
                    "4 修复风电 | 风电 $91 亿，仍亏损（利润率 -6.6%）。",
                    "5 回款 | TTM OCF $192 亿（含预付款）；2026 年 FCF 指引 $165 亿 → 回购、收购。"]),
        "watch": L("Watch: gas-turbine pricing and slot reservations, Wind losses, and how much FCF is customer deposits.",
                   "关注：燃气轮机定价与产能预订、风电亏损，以及 FCF 中有多少来自客户预付款。")},
    "mix_table": {
        "title": L("REVENUE BY SEGMENT | FY25", "分部收入 | FY25"),
        "columns": [L("Segment", "分部"), "$M", L("YoY", "同比"), L("Margin", "利润率")],
        "rows": [[L("Power", "电力"), "19,767", "+9.0%", "14.7%"],
                 [L("Electrification", "电气化"), "9,642", "+27.7%", "14.9%"],
                 [L("Wind", "风电"), "9,110", "-6.1%", "-6.6%"],
                 [L("Corporate & elim.", "总部与抵销"), "-451", "--", "--"]],
        "total_row": [L("Total revenue", "合计"), "38,068", "+9.0%", "3.6%"],
        "notes": [L("Segment profit margins (10-K); total = GAAP operating margin.", "分部利润率取自 10-K；合计为 GAAP 营业利润率。")]},
    "chart": chart(D, Y, P, price_min=100, price_max=1500, price_ticks=[200, 400], cash_max=25, cash_min=-5,
                   note=L("Cash $/sh L lin; price R log (Nov 16, 2026); spun off Apr 2024", "现金$/股：左线性 | 股价：右对数（2026年11月16日）；2024年4月分拆上市"),
                   annotations=[{"x": 2.3, "text": L("Spin-off 04/2024", "分拆上市 04/2024")}]),
    "value_creation": {
        "title": L("VALUE CREATION", "价值创造"), "columns": [f"FY{str(y)[-2:]}" for y in Y], "money_unit": "$M", "share_unit": "M sh",
        "groups": grid(D, Y, {"pe": [None, None, 58.38, 36.31], "fcfy": [None, None, 1.88, 2.09], "divy": [None, None, 0.08, 0.19]}),
        "sidebar": [
            {"title": L("Power demand", "电力需求"),
             "text": L("Q3 2026 orders +96%; Power orders $21.8B (+178%) on data-centre and grid demand.",
                       "2026年Q3 订单 +96%；数据中心与电网需求推动电力订单 $218 亿（+178%）。")},
            {"title": L("Three segments", "三个分部"), "sub": [
                {"title": L("Power", "电力"), "text": L("52%; 14.7% margin.", "52%；利润率 14.7%。")},
                {"title": L("Electrification", "电气化"), "text": L("25%; 14.9%; +28%.", "25%；14.9%；+28%。")},
                {"title": L("Wind", "风电"), "text": L("24%; still a loss.", "24%；仍在亏损。")}]},
            {"title": L("Margin turn", "利润率拐点"),
             "text": L("GAAP op. margin from -9.7% (FY22) to 3.6% (FY25); 2026 adj. EBITDA margin guide ~14%.",
                       "GAAP 营业利润率由 FY22 的 -9.7% 升至 FY25 的 3.6%；2026 年调整后 EBITDA 利润率指引约 14%。")},
            {"title": L("Cash from customers", "来自客户的现金"),
             "text": L("TTM OCF $19.2B vs $5.0B in FY25: deposits and slot reservations fund the build-out; cash $16.4B.",
                       "TTM OCF $192 亿，FY25 为 $50 亿：定金和产能预订为扩产提供资金；现金 $164 亿。")},
            {"title": L("Return condition", "回报条件"), "final": True,
             "text": L("Backlog must convert at rising margins (Power 25% by 2030 in my model) and deposits must not reverse if orders slow.",
                       "积压订单须以不断提高的利润率交付（我的模型中电力 2030 年达 25%），订单放缓时预付款不能大量回流。")}]},
    "labels": {"sp": L("Street avg target", "华尔街平均目标价"), "bull": L("Guidance", "公司指引")},
    "dcf": {
        "as_of": L("Nov 17, 2026", "2026年11月17日"), "price": P,
        "scenarios": [{"name": "bear", "value": 318.24}, {"name": "base", "value": 484.19}, {"name": "bull", "value": 498.92}],
        "wacc": "10.0%", "terminal_growth": "3.0%", "horizon": "2026-30", "morningstar": None, "sp": 1176.0, "show_weighted": False,
        "notes": [L("Base = blend of guidance and consensus; consensus case $469.82. Beta 1.10; TV 78% of EV.",
                    "基准 = 公司指引与一致预期的平均；一致预期情景 $469.82。Beta 1.10；终值占 EV 78%。"),
                  L("Trench Group (~$9.0B, Oct 2026) not modelled. Morningstar FV to follow.",
                    "Trench Group 收购（约 $90 亿，2026年10月）未计入模型。Morningstar 合理价值待补充。")]},
    "kpi_tracker": {
        "title": L("CORE KPI TRACKER | Q3 2026", "核心KPI | 2026年Q3"),
        "columns": [L("Metric", "指标"), L("Value", "数值")],
        "rows": [[L("Orders ($B, +96%)", "订单（$B，+96%）"), "29.3"],
                 [L("Backlog ($B)", "积压订单（$B）"), "197"],
                 [L("Gas backlog + slots (GW)", "燃气积压 + 预订（GW）"), "122"],
                 [L("Electrification backlog ($B)", "电气化积压（$B）"), "42"],
                 [L("2026 FCF guide ($B)", "2026 FCF 指引（$B）"), "16.5"]]},
    "cagr": cagr_block(D, 2025, spans=(1, 3)),
    "financial_position": fin_position(D, range(2022, 2026), [None, None, 90599, 177327]),
    "lead_paragraphs": [
        {"label": L("CAPITAL RETURNS:", "现金分配："), "text": L(
            "FY22-25 OCF $8.6B less capex $3.4B left **$5.2B FCF**. Buybacks **$3.4B** (mostly FY25) and dividends **$0.3B**. TTM buybacks reached **$6.4B** against a **$20B** authorisation.",
            "FY22-25 OCF $86 亿减资本开支 $34 亿，得 **FCF $52 亿**。回购 **$34 亿**（主要在 FY25），股息 **$3 亿**。TTM 回购达 **$64 亿**，授权额度 **$200 亿**。")},
        {"label": L("NET SHARES:", "净股数变化："), "text": L(
            "Diluted shares 274M at the spin to 276M (FY25); buybacks have since cut them to **267M** (Q3 2026), **down 3%**.",
            "稀释股数由分拆时的 274M 变为 FY25 的 276M；之后回购使其降至 **2.67 亿股**（2026年Q3），**减少 3%**。")}],
    "commentary": [
        {"headline": L("A turnaround that became a boom.", "从扭亏变成了繁荣。"),
         "body": L("Revenue grew from $29.7B (FY22) to $38.1B (FY25) and GAAP operating income from -$2.9B to +$1.4B. Q3 2026 orders nearly doubled (+96%) as data centres and utilities order gas turbines and grid equipment.",
                   "营收由 FY22 的 $297 亿增至 FY25 的 $381 亿，GAAP 营业利润由 -$29 亿变为 +$14 亿。数据中心和电力公司订购燃气轮机与电网设备，2026年Q3 订单几乎翻倍（+96%）。")},
        {"headline": L("Customers are funding the growth.", "客户在为增长出资。"),
         "body": L("TTM operating cash flow of $19.2B is almost four times FY25's $5.0B, because customers pay deposits to reserve turbine slots. That cash is real but is owed back as equipment; it would shrink if orders slowed.",
                   "TTM 经营现金流 $192 亿，几乎是 FY25 $50 亿的四倍，因为客户为预订燃气轮机产能支付定金。这些现金是真实的，但对应未来交付的设备；订单放缓时会减少。")},
        {"headline": L("Power and Electrification carry the profit.", "利润来自电力和电气化。"),
         "body": L("Power earned 14.7% and Electrification 14.9% in FY25, while Wind lost 6.6%. My model takes Power to 25% and Electrification to 19.5% by 2030, with Wind only reaching 3%.",
                   "FY25 电力利润率 14.7%、电气化 14.9%，风电亏损 6.6%。我的模型让电力在 2030 年达到 25%、电气化 19.5%，风电只到 3%。")},
        {"headline": L("The history is short.", "历史很短。"),
         "body": L("As a separate company GE Vernova has only four audited years, all under very different conditions. Treat FY22-23 as the restructuring base, not a guide to normal margins. The five-year CAGRs and 15-year averages used for other companies are not available here, so the DCF rests more on guidance and backlog.",
                   "作为独立公司，GE Vernova 只有四年经审计数据，且各年情况差异很大。FY22-23 应视为重组期的基数，而不是正常利润率的参考。其他公司使用的 5 年 CAGR 和 15 年均值在这里无法计算，因此 DCF 更依赖公司指引和积压订单。")},
        {"headline": L("Capital returns started quickly.", "股东回报起步很快。"),
         "body": L("Buybacks were $3.3B in FY25 and $6.4B TTM under a $20B programme; a dividend began in 2025. The ~$9.0B Trench Group deal (Oct 2026) will use part of the cash pile; it is not in my model.",
                   "在 $200 亿回购计划下，FY25 回购 $33 亿，TTM $64 亿；2025 年开始派息。约 $90 亿的 Trench Group 收购（2026年10月）将用掉部分现金；我的模型未计入。")},
        {"headline": L("My DCF is far below the market.", "我的 DCF 远低于市场。"),
         "body": L("Base $484.19 (WACC 10.0%, g 3%, beta 1.10) needs $68.6B revenue by 2030 (12.5% a year) at a 16.1% EBIT margin; TV is 78% of EV. At $763.57 that is -37%; the Street ($1,176) prices far faster growth.",
                   "基准价值 $484.19（WACC 10.0%，g 3%，beta 1.10）要求 2030 年营收 $686 亿（年增 12.5%）、EBIT 利润率 16.1%；终值占 EV 78%。按 $763.57 计为 -37%；华尔街（$1,176）定价的增长要快得多。")}],
    "footnotes": L([
        "FY22-25 from SEC 10-K XBRL (GE Vernova was spun off from GE on Apr 2, 2024; FY22-23 are carve-out financials). Op. income = GAAP; D&A, debt and cash from the analyst model (S&P).",
        "EBITDA* = operating income + D&A. FCF = OCF - capex. ROIC* = op. income x (1-21%) / (equity + debt - cash). FY25 net income includes non-operating gains. Dividend/Sh.* = dividends paid / diluted shares.",
        "Header: Nov 16, 2026 close $763.57, 263.3M shares; book value = Sep 30, 2026 equity $12.5B; TTM P/E (EPS $38.26); P/FCF on TTM FCF $17.1B (incl. customer deposits). FY24-25 ratios and Mkt cap* from StockAnalysis.",
        "DCF: Pythia model GEV_DCF_Model, Nov 17, 2026; WACC 10.0%, g 3.0%. Street avg target = 37-analyst average (S&P Global via StockAnalysis). Morningstar FV not yet provided.",
        "Sources: GE Vernova 10-K FY2025, Q3 2026 release (Oct 28, 2026); SEC EDGAR; StockAnalysis."],
        ["FY22-25 数据取自 SEC 10-K XBRL（GE Vernova 于 2024年4月2日从 GE 分拆；FY22-23 为剥离口径财务数据）。营业利润为 GAAP 口径；折旧摊销、债务与现金取自分析模型（S&P 口径）。",
         "EBITDA* = 营业利润 + 折旧摊销。FCF = OCF - 资本开支。ROIC* = 营业利润 ×（1-21%）/（权益 + 债务 - 现金）。FY25 净利润包含非经营性收益。每股股息* = 已付股息 / 稀释股数。",
         "首行：2026年11月16日收盘 $763.57，2.633 亿股；每股账面 = 2026年9月30日权益 $125 亿；TTM P/E（EPS $38.26）；P/FCF 按 TTM FCF $171 亿（含客户预付款）。FY24-25 比率与市值*取自 StockAnalysis。",
         "DCF：Pythia 模型 GEV_DCF_Model，2026年11月17日；WACC 10.0%，g 3.0%。华尔街平均目标价为 37 位分析师平均（S&P Global，经 StockAnalysis）。Morningstar 合理价值待补充。",
         "来源：GE Vernova FY2025 10-K、2026年Q3 业绩公告（2026年10月28日）；SEC EDGAR；StockAnalysis。"]),
    "brand_mark": "PYTHIA",
    "website": {
        "id": "gev", "name": L("GE Vernova", "GE Vernova"), "exchange": "NYSE", "market": "US", "sector": "Industrials", "industry": "Electrical Equipment",
        "indices": ["S&P 500", "Russell 1000"], "updated": "2026-11-17", "price_date": "2026-11-16", "currency": "USD", "moat": "",
        "summary": L("Gas turbines and grid equipment for the AI power build-out: orders nearly doubled and customers prepay, but my DCF ($484.19) is 37% below the price because I discount at 10% and let margins rise only to 16%.",
                     "为 AI 电力建设提供燃气轮机和电网设备：订单几乎翻倍，客户预付货款；但我的 DCF（$484.19）比股价低 37%，因为我用 10% 的折现率，并只让利润率升到 16%。"),
        "tags": [L("Power generation", "发电设备"), L("Grid", "电网"), L("Data centres", "数据中心"), L("Spin-off", "分拆")],
        "business": L(
            "### Three segments\n- **Power (52% of FY25 revenue, 14.7% margin):** gas turbines, nuclear, hydro and steam, plus a large services base.\n- **Electrification (25%, 14.9%):** grid equipment, power conversion and software; growing fastest (+27.7%).\n- **Wind (24%, -6.6%):** onshore and offshore wind; still loss-making.\n\n### What changed\nSince the April 2024 spin-off from GE, orders have surged on data-centre and grid demand; backlog is $197B and customers pay deposits to reserve turbine slots.\n\n### Key risks\nA slowdown in power orders, Wind losses, execution on a large backlog, and the Trench Group acquisition.",
            "### 三个分部\n- **电力（占 FY25 营收 52%，利润率 14.7%）：** 燃气轮机、核电、水电和蒸汽轮机，以及庞大的服务业务。\n- **电气化（25%，14.9%）：** 电网设备、电力转换与软件；增长最快（+27.7%）。\n- **风电（24%，-6.6%）：** 陆上与海上风电；仍在亏损。\n\n### 发生了什么变化\n2024年4月从 GE 分拆后，数据中心与电网需求推动订单激增；积压订单 $1,970 亿，客户支付定金预订燃气轮机产能。\n\n### 关键风险\n电力订单放缓、风电亏损、大量积压订单的交付，以及 Trench Group 收购。"),
        "segments": [{"name": L("Power", "电力"), "share": 51.9},
                     {"name": L("Electrification", "电气化"), "share": 25.3},
                     {"name": L("Wind", "风电"), "share": 23.9}],
        "revenue_cagr": "12.5% (2025-30, blended)", "margin": "EBIT margin 3.6% (GAAP FY25) → 16.1% (2030E)",
        "gap": {
            "summary": L(
                "My blended base value is **$484.19**, **37% below** the price (**$763.57**) and far below the Street average target (**$1,176**). Revenue follows guidance and consensus (12.5% a year to **$68.6B** in 2030), so the gap is the **margin path and discount rate**: I take the EBIT margin to **16.1%** and discount at **10.0%** (beta 1.10). At a 0.6 beta (WACC 7.8%) the value would be **$691**. Morningstar's fair value will be added when the report is uploaded.",
                "我的混合基准价值为 **$484.19**，比股价（**$763.57**）低 **37%**，远低于华尔街平均目标价（**$1,176**）。营收按公司指引与一致预期（每年 12.5%，2030 年 **$686 亿**），差距来自 **利润率路径与折现率**：我让 EBIT 利润率升至 **16.1%**，并以 **10.0%**（beta 1.10）折现。若 beta 为 0.6（WACC 7.8%），价值约 **$691**。Morningstar 的合理价值将在上传报告后补充。"),
            "bridge": [],
            "assumptions": [
                {"item": L("Value per share", "每股价值"), "mine": "$484.19", "morningstar": "—", "sp": "$1,176", "note": L("Street = average of 37 analysts (S&P Global)", "华尔街 = 37 位分析师平均（S&P Global）")},
                {"item": "WACC", "mine": "10.0%", "morningstar": "—", "sp": "—", "note": L("Cost of equity 10.1% (beta 1.10)", "股权成本 10.1%（beta 1.10）")},
                {"item": L("Revenue 2026E / 2030E", "营收 2026E / 2030E"), "mine": "$46.7B / $68.6B", "morningstar": "—", "sp": L("2026 guide ~$47B", "2026 指引约 $470 亿"), "note": ""},
                {"item": L("EBIT margin 2030E", "EBIT 利润率 2030E"), "mine": "16.1%", "morningstar": "—", "sp": "—", "note": L("Power 25%, Electrification 19.5%, Wind 3%", "电力 25%、电气化 19.5%、风电 3%")},
                {"item": L("Trench Group deal", "Trench Group 收购"), "mine": L("Not modelled", "未计入"), "morningstar": "—", "sp": "—", "note": L("~$9.0B, announced Oct 2026", "约 $90 亿，2026年10月宣布")}]},
        "files": [{"type": "onepage", "lang": "en", "label": "One Page", "path": "reports/gev/GEV_OnePage_en.pdf", "date": "2026-11-17"},
                  {"type": "onepage", "lang": "zh", "label": "One Page", "path": "reports/gev/GEV_OnePage_zh.pdf", "date": "2026-11-17"}],
        "onepage_image": L("reports/gev/GEV_OnePage_en.png", "reports/gev/GEV_OnePage_zh.png"),
        "history": [{"date": "2026-11-17", "note": L("One Page V2 with DCF", "One Page V2（含 DCF）")}]},
}
write(spec, "onepage/specs/gev_onepage.json")
