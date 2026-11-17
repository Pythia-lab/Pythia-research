"""Stanley Black & Decker One Page spec. Usage: PYTHONPATH=onepage python onepage/build_swk_spec.py <SWK_D.json>
Sources: SEC XBRL FY2011-25 (52/53-week years; FY25 ended Jan 3, 2026); op. income FY21-25 = S&P EBIT from the analyst model
(GAAP operating income not tagged after FY20); analyst model SWK_DCF_Model.xlsx (Nov 17, 2026); StockAnalysis."""
import sys
from spec_common import L, load, grid, cagr_block, fin_position, chart, write

D = load(sys.argv[1])
Y = list(range(2011, 2026))
P = 112.92
spec = {
    "lang": "en",
    "meta_line": L("SWK | FY25: Jan 3, 2026 | Q3 26: Sep 2026 | Market: Nov 16, 2026 | USD | Issued: Nov 17, 2026",
                   "SWK | FY25：2026年1月3日 | 2026年Q3：2026年9月 | 市场日期：2026年11月16日 | 美元 | 发布日期：2026年11月17日"),
    "company": {"name": L("STANLEY B&D", "史丹利百得"), "ticker": "SWK", "name_size_pt": 19, "name_width_in": 2.3},
    "header_metrics": [{"value": "16.8B"}, {"value": "112.92"}, {"value": "59.46"}, {"value": "20.2x"}, {"value": "9.8x"}, {"value": "3.1%"}],
    "business_chain": {
        "title": L("HOW IT EARNS CASH | BUSINESS CHAIN", "现金生成路径"),
        "lines": L(["1 Brands | Tools & Outdoor (DEWALT, CRAFTSMAN, STANLEY) $13.2B, 87% of FY25 sales.",
                    "2 Sell | Pros, DIY and retail channels; FY25 sales -1.5%, Q3 2026 organic +4%.",
                    "3 Restore margin | Gross margin 25% (FY23) to 31% (FY25); Q3 2026 39% incl. tariff refunds.",
                    "4 Simplify | Sold Infrastructure (2024) and CAM aerospace fasteners (2026) to cut debt.",
                    "5 Collect | FY25 OCF $1.0B - capex $0.3B = FCF $0.7B → dividends $0.5B; debt down to $5.2B."],
                   ["1 品牌 | 工具与户外（DEWALT、CRAFTSMAN、STANLEY）$132 亿，占 FY25 销售 87%。",
                    "2 销售 | 专业、DIY 与零售渠道；FY25 销售 -1.5%，2026年Q3 有机 +4%。",
                    "3 修复利润率 | 毛利率由 FY23 的 25% 升至 FY25 的 31%；2026年Q3 含关税退款为 39%。",
                    "4 精简 | 出售基础设施业务（2024）和 CAM 航空紧固件（2026）以降债。",
                    "5 回款 | FY25 OCF $1.0B - 资本开支 $0.3B = FCF $0.7B → 股息 $0.5B；债务降至 $52 亿。"]),
        "watch": L("Watch: tool demand vs housing, gross margin without tariff refunds, and debt reduction.",
                   "关注：工具需求与房地产周期、剔除关税退款后的毛利率，以及债务下降。")},
    "mix_table": {
        "title": L("SALES BY SEGMENT | FY25", "分部销售 | FY25"),
        "columns": [L("Segment", "分部"), "$M", L("YoY", "同比"), L("Margin", "利润率")],
        "rows": [[L("Tools & Outdoor", "工具与户外"), "13,158", "-1.1%", "10.1%"],
                 [L("Engineered Fastening", "工程紧固件"), "1,972", "-4.4%", "10.0%"]],
        "total_row": [L("Total net sales", "合计"), "15,130", "-1.5%", "7.8%"],
        "notes": [L("Segment profit margins (10-K); total = S&P EBIT margin. CAM sold to Howmet in early 2026 (~15% of Fastening).",
                    "分部利润率取自 10-K；合计为 S&P 口径 EBIT 利润率。CAM 于 2026 年初出售给 Howmet（约占紧固件 15%）。")]},
    "chart": chart(D, Y, P, price_min=40, price_max=300, price_ticks=[50, 100, 200], cash_max=16, cash_min=-14,
                   note=L("Cash $/sh L lin; price R log (Nov 16, 2026)", "现金$/股：左线性 | 股价：右对数（2026年11月16日）"),
                   annotations=[{"x": 6.1, "text": L("Craftsman 2017", "收购 Craftsman 2017")},
                                {"x": 10.6, "dy": 10, "text": L("Inventory glut 2022", "2022 库存积压")}]),
    "value_creation": {
        "title": L("VALUE CREATION", "价值创造"), "columns": [f"FY{str(y)[-2:]}" for y in Y], "money_unit": "$M", "share_unit": "M sh",
        "groups": grid(D, Y, {"pe": [None] * 10 + [18.36, 10.52, None, 42.21, 29.47],
                              "fcfy": [None] * 10 + [0.47, -17.90, 5.67, 6.06, 5.81],
                              "divy": [None] * 10 + [1.58, 4.38, 3.29, 4.05, 4.32]}),
        "sidebar": [
            {"title": L("End demand", "终端需求"),
             "text": L("Pro and DIY tool demand tracks housing turnover; FY25 sales -1.5%, Q3 2026 organic +4%.",
                       "专业与 DIY 工具需求跟随房屋交易；FY25 销售 -1.5%，2026年Q3 有机 +4%。")},
            {"title": L("Two segments", "两个分部"), "sub": [
                {"title": L("Tools & Outdoor", "工具与户外"), "text": L("87%; 10.1% margin.", "87%；利润率 10.1%。")},
                {"title": L("Fastening", "紧固件"), "text": L("13%; 10.0% margin.", "13%；利润率 10.0%。")}]},
            {"title": L("Margin repair", "利润率修复"),
             "text": L("EBIT margin 12.5% (FY21) fell to 2.2% (FY23) after the inventory glut; 7.8% in FY25.",
                       "EBIT 利润率由 FY21 的 12.5% 在库存积压后降至 FY23 的 2.2%；FY25 回到 7.8%。")},
            {"title": L("Cash and debt", "现金与债务"),
             "text": L("FY25 FCF $0.7B covered the $0.5B dividend; TTM FCF $1.7B; net debt/EBITDA 5.1x (FY22) to 2.7x TTM.",
                       "FY25 FCF $0.7B 覆盖了 $0.5B 股息；TTM FCF $17 亿；净债务/EBITDA 由 FY22 的 5.1 倍降至 TTM 2.7 倍。")},
            {"title": L("Return condition", "回报条件"), "final": True,
             "text": L("Tools margins must reach ~13.5% by 2030 without tariff help, so FCF can cover the dividend and keep cutting debt.",
                       "工具业务利润率须在不靠关税退款的情况下于 2030 年达到约 13.5%，使 FCF 能覆盖股息并继续降债。")}]},
    "labels": {"sp": L("Street avg target", "华尔街平均目标价"), "bull": L("Guidance", "公司指引")},
    "dcf": {
        "as_of": L("Nov 17, 2026", "2026年11月17日"), "price": P,
        "scenarios": [{"name": "bear", "value": 68.65}, {"name": "base", "value": 101.85}, {"name": "bull", "value": 103.64}],
        "wacc": "9.1%", "terminal_growth": "2.0%", "horizon": "2026-30", "morningstar": None, "sp": 113.36, "show_weighted": False,
        "notes": [L("Base = blend of guidance and consensus; consensus case $100.09. Beta 1.16; TV 75% of EV.",
                    "基准 = 公司指引与一致预期的平均；一致预期情景 $100.09。Beta 1.16；终值占 EV 75%。"),
                  L("2026 margins include one-time tariff refunds (~1.5pp). Morningstar FV to follow.",
                    "2026 年利润率含一次性关税退款（约 1.5 个百分点）。Morningstar 合理价值待补充。")]},
    "kpi_tracker": {
        "title": L("CORE KPI TRACKER | FY21-25", "核心KPI | FY21-25"),
        "columns": [L("Metric", "指标"), "FY21", "FY22", "FY23", "FY24", "FY25"],
        "rows": [[L("Gross margin", "毛利率"), "33.5%", "25.9%", "24.9%", "29.9%", "30.6%"],
                 [L("EBIT margin (S&P)", "EBIT 利润率"), "12.5%", "5.4%", "2.2%", "6.7%", "7.8%"],
                 [L("Tools margin", "工具业务利润率"), "--", "--", "5.1%", "9.0%", "10.1%"],
                 [L("Total debt ($B)", "总债务（$B）"), "7.0", "7.9", "7.7", "6.6", "6.3"],
                 [L("Net debt / EBITDA", "净债务/EBITDA"), "2.84x", "5.07x", "7.38x", "4.01x", "3.59x"]]},
    "cagr": cagr_block(D, 2025),
    "financial_position": fin_position(D, range(2021, 2026), [30751, 11113, 15040, 12423, 11844]),
    "lead_paragraphs": [
        {"label": L("CAPITAL RETURNS:", "现金分配："), "text": L(
            "FY12-25 OCF $13.4B less capex $5.4B left **$8.0B FCF**. Dividends **$5.6B (70%)**; buybacks **$5.2B (65%)**; acquisitions **$9.0B** (Craftsman, MTD, Excel). Payouts and deals ran far ahead of FCF and were paid with debt.",
            "FY12-25 OCF $134 亿减资本开支 $54 亿，得 **FCF $80 亿**。股息 **$56 亿（70%）**；回购 **$52 亿（65%）**；收购 **$90 亿**（Craftsman、MTD、Excel）。分配与收购远超 FCF，靠举债支付。")},
        {"label": L("NET SHARES:", "净股数变化："), "text": L(
            "Diluted shares FY11 170M to FY25 152M, **down 11%**, mostly from the $2.3B buyback in FY22. Buybacks restarted in 2026 under a new **$1.0B** authorisation.",
            "稀释股数由 FY11 的 170M 降至 FY25 的 152M，**减少 11%**，主要来自 FY22 的 $23 亿回购。2026 年在新的 **$10 亿** 授权下重启回购。")}],
    "commentary": [
        {"headline": L("Acquisitions built the company; the cycle broke it.", "收购造就了公司，周期打断了它。"),
         "body": L("Revenue rose from $9.4B (FY11) to $16.9B (FY22) through deals, then fell to $15.1B (FY25). The 2022 inventory glut drove OCF to -$1.5B and EBIT margin down to 2.2% in FY23.",
                   "营收通过收购由 FY11 的 $94 亿增至 FY22 的 $169 亿，之后降至 FY25 的 $151 亿。2022 年库存积压使 OCF 降至 -$15 亿，FY23 EBIT 利润率降至 2.2%。")},
        {"headline": L("The margin repair is working.", "利润率修复在见效。"),
         "body": L("Gross margin recovered from 24.9% (FY23) to 30.6% (FY25) on cost cuts and simpler operations; Tools & Outdoor margin rose from 5.1% to 10.1%. Q3 2026's 39% gross margin includes ~430bp of one-time tariff refunds.",
                   "通过降本和简化运营，毛利率由 FY23 的 24.9% 回升至 FY25 的 30.6%；工具与户外利润率由 5.1% 升至 10.1%。2026年Q3 39% 的毛利率包含约 430 个基点的一次性关税退款。")},
        {"headline": L("Divestments pay down debt.", "出售资产用于还债。"),
         "body": L("Selling Infrastructure (2024) and CAM aerospace fasteners (2026) cut total debt from $7.9B (FY22) to $5.2B; net debt/EBITDA fell from 7.4x (FY23) to 2.7x TTM.",
                   "出售基础设施业务（2024）和 CAM 航空紧固件（2026），使总债务由 FY22 的 $79 亿降至 $52 亿；净债务/EBITDA 由 FY23 的 7.4 倍降至 TTM 2.7 倍。")},
        {"headline": L("The dividend has been the anchor.", "股息一直是锚。"),
         "body": L("Dividend per share has grown 5.2% a year for 14 years even when FCF was negative; in FY25 FCF only just covered it (73%). The yield is 3.1% at today's price.",
                   "14 年来每股股息年均增长 5.2%，即使 FCF 为负也未中断；FY25 的 FCF 只是勉强覆盖（股息占 73%）。按现价股息率 3.1%。")},
        {"headline": L("Demand is the swing factor.", "需求是关键变量。"),
         "body": L("DEWALT gains share with professionals, but DIY and outdoor demand follow housing turnover. My model grows sales only 2.3% a year to 2030; a housing recovery is the upside, a slump the bear case ($68.65). In my model the 2026 tariff refunds (~1.5pp) fall away, so Tools margin dips from 12.8% to 12.0% in 2027.",
                   "DEWALT 在专业用户中份额提升，但 DIY 与户外需求跟随房屋交易。我的模型到 2030 年销售每年只增长 2.3%；房地产复苏是上行空间，下滑则是悲观情景（$68.65）。在我的模型中，2026 年的关税退款（约 1.5 个百分点）随后消失，工具业务利润率由 12.8% 降至 2027 年的 12.0%。")},
        {"headline": L("My DCF is a little below the price.", "我的 DCF 略低于股价。"),
         "body": L("Base $101.85 (WACC 9.1%, g 2%, beta 1.16) needs $17.0B sales by 2030 at an 11.6% EBIT margin; TV is 75% of EV. At $112.92 that is -10%; the Street ($113.36) sits at the price. A 1.0 beta gives $112.81.",
                   "基准价值 $101.85（WACC 9.1%，g 2%，beta 1.16）要求 2030 年销售 $170 亿、EBIT 利润率 11.6%；终值占 EV 75%。按 $112.92 计为 -10%；华尔街（$113.36）与股价持平。beta 为 1.0 时价值 $112.81。")}],
    "footnotes": L([
        "FY11-25 from SEC 10-K XBRL (52/53-week fiscal years; FY25 ended Jan 3, 2026). Op. income FY21-25 = S&P EBIT (analyst model); GAAP operating income not tagged after FY20.",
        "EBITDA* = op. income + D&A. FCF = OCF - capex. ROIC* = op. income x (1-21%) / (equity + debt - cash). Dividend/Sh.* = dividends paid / diluted shares. Total debt FY21-25 and net debt/EBITDA from the model (S&P basis, incl. short-term debt).",
        "Header: Nov 16, 2026 close $112.92, 148.7M shares; book value = Q3 2026 equity $8.8B; TTM P/E (EPS $5.58, incl. tariff refunds and CAM gain); P/FCF on TTM FCF $1.7B. FY21-25 ratios and Mkt cap* from StockAnalysis.",
        "DCF: Pythia model SWK_DCF_Model, Nov 17, 2026; WACC 9.1%, g 2.0%. Street avg target = 15-analyst average (S&P Global via StockAnalysis). Morningstar FV not yet provided.",
        "Sources: Stanley Black & Decker 10-K FY2025, Q3 2026 release (Nov 4, 2026); SEC EDGAR; StockAnalysis."],
        ["FY11-25 数据取自 SEC 10-K XBRL（52/53 周财年；FY25 截至 2026年1月3日）。FY21-25 营业利润为 S&P 口径 EBIT（分析模型）；FY20 后 XBRL 中无 GAAP 营业利润。",
         "EBITDA* = 营业利润 + 折旧摊销。FCF = OCF - 资本开支。ROIC* = 营业利润 ×（1-21%）/（权益 + 债务 - 现金）。每股股息* = 已付股息 / 稀释股数。FY21-25 总债务与净债务/EBITDA 取自模型（S&P 口径，含短期借款）。",
         "首行：2026年11月16日收盘 $112.92，1.487 亿股；每股账面 = 2026年Q3 权益 $88 亿；TTM P/E（EPS $5.58，含关税退款与 CAM 出售收益）；P/FCF 按 TTM FCF $17 亿。FY21-25 比率与市值*取自 StockAnalysis。",
         "DCF：Pythia 模型 SWK_DCF_Model，2026年11月17日；WACC 9.1%，g 2.0%。华尔街平均目标价为 15 位分析师平均（S&P Global，经 StockAnalysis）。Morningstar 合理价值待补充。",
         "来源：Stanley Black & Decker FY2025 10-K、2026年Q3 业绩公告（2026年11月4日）；SEC EDGAR；StockAnalysis。"]),
    "brand_mark": "PYTHIA",
    "website": {
        "id": "swk", "name": L("Stanley Black & Decker", "史丹利百得"), "exchange": "NYSE", "market": "US", "sector": "Industrials", "industry": "Industrial Machinery",
        "indices": ["S&P 500", "Russell 1000"], "updated": "2026-11-17", "price_date": "2026-11-16", "currency": "USD", "moat": "",
        "summary": L("A tool brand house repairing margins and paying down debt after the 2022 inventory bust; my DCF ($101.85) is 10% below the price, which already prices most of the margin recovery.",
                     "在 2022 年库存危机后修复利润率、降低债务的工具品牌公司；我的 DCF（$101.85）比股价低 10%，股价已反映了大部分利润率修复。"),
        "tags": [L("Tools", "工具"), L("Housing cycle", "房地产周期"), L("Turnaround", "扭转"), L("Dividend", "股息")],
        "business": L(
            "### Two segments\n- **Tools & Outdoor (87% of FY25 sales, 10.1% margin):** power tools, hand tools and outdoor equipment under DEWALT, CRAFTSMAN, STANLEY and other brands.\n- **Engineered Fastening (13%, 10.0%):** fasteners for autos and industry; CAM aerospace fasteners sold to Howmet in early 2026.\n\n### What changed\nAfter the 2022 inventory glut, a cost programme and divestments rebuilt gross margin to ~31% and cut debt; 2026 margins are boosted by one-time tariff refunds.\n\n### Key risks\nHousing and DIY demand, tariffs and input costs, retailer inventories, and leverage.",
            "### 两个分部\n- **工具与户外（占 FY25 销售 87%，利润率 10.1%）：** DEWALT、CRAFTSMAN、STANLEY 等品牌的电动工具、手动工具与户外设备。\n- **工程紧固件（13%，10.0%）：** 汽车与工业紧固件；CAM 航空紧固件已于 2026 年初出售给 Howmet。\n\n### 发生了什么变化\n2022 年库存积压后，降本计划和资产出售使毛利率回升至约 31% 并降低了债务；2026 年利润率受一次性关税退款推高。\n\n### 关键风险\n房地产与 DIY 需求、关税与原材料成本、零售商库存，以及杠杆。"),
        "segments": [{"name": L("Tools & Outdoor", "工具与户外"), "share": 87.0},
                     {"name": L("Engineered Fastening", "工程紧固件"), "share": 13.0}],
        "revenue_cagr": "2.3% (2025-30, blended)", "margin": "EBIT margin 7.8% → 11.6% (2030E)",
        "gap": {
            "summary": L(
                "My blended base value is **$101.85**, **10% below** the price (**$112.92**) and the Street average target (**$113.36**). Revenue grows only **2.3% a year** to 2030 and the EBIT margin recovers to **11.6%**, close to consensus; the difference is mostly the **discount rate**: with the raw beta of **1.16** my WACC is 9.1%, while a 1.0 beta (WACC 8.6%) gives **$112.81**, about the market price. Morningstar's fair value will be added when the report is uploaded.",
                "我的混合基准价值为 **$101.85**，比股价（**$112.92**）和华尔街平均目标价（**$113.36**）低 **10%**。营收到 2030 年每年只增长 **2.3%**，EBIT 利润率回升至 **11.6%**，与一致预期接近；差距主要来自 **折现率**：用原始 beta **1.16**，WACC 为 9.1%；若 beta 为 1.0（WACC 8.6%），价值为 **$112.81**，约等于市价。Morningstar 的合理价值将在上传报告后补充。"),
            "bridge": [],
            "assumptions": [
                {"item": L("Value per share", "每股价值"), "mine": "$101.85", "morningstar": "—", "sp": "$113.36", "note": L("Street = average of 15 analysts (S&P Global)", "华尔街 = 15 位分析师平均（S&P Global）")},
                {"item": "WACC", "mine": "9.1%", "morningstar": "—", "sp": "9.6%", "note": L("S&P Global WACC estimate", "S&P Global 的 WACC 估计")},
                {"item": L("Revenue 2026E / 2030E", "营收 2026E / 2030E"), "mine": "$15.2B / $17.0B", "morningstar": "—", "sp": "—", "note": L("2026 after the CAM sale", "2026 年为出售 CAM 后")},
                {"item": L("EBIT margin 2030E", "EBIT 利润率 2030E"), "mine": "11.6%", "morningstar": "—", "sp": "—", "note": L("FY25 7.8% (S&P)", "FY25 7.8%（S&P）")},
                {"item": L("2026 GAAP EPS", "2026 GAAP EPS"), "mine": "—", "morningstar": "—", "sp": L("Guide $5.45-5.85", "指引 $5.45-5.85"), "note": L("Incl. tariff refunds", "含关税退款")}]},
        "files": [{"type": "onepage", "lang": "en", "label": "One Page", "path": "reports/swk/SWK_OnePage_en.pdf", "date": "2026-11-17"},
                  {"type": "onepage", "lang": "zh", "label": "One Page", "path": "reports/swk/SWK_OnePage_zh.pdf", "date": "2026-11-17"}],
        "onepage_image": L("reports/swk/SWK_OnePage_en.png", "reports/swk/SWK_OnePage_zh.png"),
        "history": [{"date": "2026-11-17", "note": L("One Page V2 with DCF", "One Page V2（含 DCF）")}]},
}
write(spec, "onepage/specs/swk_onepage.json")
