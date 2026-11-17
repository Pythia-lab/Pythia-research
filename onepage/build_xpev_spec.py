"""XPeng One Page spec. Usage: PYTHONPATH=onepage python onepage/build_xpev_spec.py <XPEV_D.json>
XPEV_D.json = SEC 20-F XBRL in RMB (SEC_CCY=CNY sec_history.py), FY2019-25, converted at a constant RMB 6.671/USD
(the model's rate); per-ADS = ordinary shares / 2 (1 ADS = 2 Class A shares). XPeng listed in Aug 2020.
Sources: analyst model XPEV_DCF_Model.xlsx (Nov 17, 2026); StockAnalysis."""
import sys
from spec_common import L, load, grid, cagr_block, fin_position, chart, write

D = load(sys.argv[1])
Y = list(range(2019, 2026))
P = 9.67
spec = {
    "lang": "en",
    "meta_line": L("XPEV (ADS) | FY25: Dec 31, 2025 | Q3 26: Sep 30, 2026 | Market: Nov 16, 2026 | USD at RMB 6.671 | Issued: Nov 17, 2026",
                   "XPEV（ADS）| FY25：2025年12月31日 | 2026年Q3：2026年9月30日 | 市场日期：2026年11月16日 | 美元（按 6.671 人民币折算）| 发布日期：2026年11月17日"),
    "company": {"name": L("XPENG", "小鹏汽车"), "ticker": "XPEV", "name_size_pt": 24, "name_width_in": 1.9},
    "header_metrics": [{"value": "9.3B"}, {"value": "9.67"}, {"value": "4.56"}, {"value": "NM"}, {"value": "NM"}, {"value": "0.0%"}],
    "business_chain": {
        "title": L("HOW IT EARNS CASH | BUSINESS CHAIN", "现金生成路径"),
        "lines": L(["1 Deliver | Q3 2026 deliveries 118,390 (+15% QoQ); October above 50,000 for the first time.",
                    "2 Price | Vehicle revenue $10.2B in FY25 (+91%); ASP falling as cheaper models dominate.",
                    "3 Earn | Gross margin 1.7% (FY23) to 19.0% (FY25); Q3 2026 vehicle margin 13.1%.",
                    "4 License | Services & others $1.3B (+66%): VW technology fees, software, parts.",
                    "5 Collect | FY25 first positive FCF ($0.8B); TTM FCF about zero; Q3 net loss RMB0.87B."],
                   ["1 交付 | 2026年Q3 交付 118,390 辆（环比 +15%）；10 月首次超过 5 万辆。",
                    "2 定价 | FY25 汽车收入 $102 亿（+91%）；低价车型占比提高，平均售价下降。",
                    "3 盈利 | 毛利率由 FY23 的 1.7% 升至 FY25 的 19.0%；2026年Q3 汽车毛利率 13.1%。",
                    "4 授权 | 服务及其他 $13 亿（+66%）：大众技术服务费、软件、零部件。",
                    "5 回款 | FY25 首次实现正 FCF（$8 亿）；TTM FCF 约为零；Q3 净亏损 8.7 亿元。"]),
        "watch": L("Watch: deliveries vs price cuts, gross margin, and the path to operating profit by 2028.",
                   "关注：交付量与降价、毛利率，以及 2028 年实现经营盈利的路径。")},
    "mix_table": {
        "title": L("REVENUE BY LINE | FY25", "收入构成 | FY25"),
        "columns": [L("Revenue", "营收"), "$M", L("Mix", "占比"), L("YoY", "同比")],
        "rows": [[L("Vehicle sales", "汽车销售"), "10,249", "89.1%", "+90.8%"],
                 [L("Services & others", "服务及其他"), "1,252", "10.9%", "+66.3%"]],
        "total_row": [L("Total revenue", "合计"), "11,501", "100.0%", "+87.7%"],
        "notes": [L("RMB at 6.671/USD. One reportable segment; services include VW technology fees.",
                    "按 6.671 人民币/美元折算。只有一个报告分部；服务收入包括大众技术服务费。")]},
    "chart": chart(D, Y, P, price_min=4, price_max=80, price_ticks=[5, 20, 40], cash_max=2, cash_min=-3,
                   note=L("FY20-25 (listed Aug 2020); cash $/ADS L lin; price R log (Nov 16, 2026)", "FY20-25（2020年8月上市）；现金$/ADS：左线性 | 股价：右对数（2026年11月16日）"),
                   annotations=[{"x": 3.0, "text": L("Price war 2023", "价格战 2023")}]),
    "value_creation": {
        "title": L("VALUE CREATION", "价值创造"), "columns": [f"FY{str(y)[-2:]}" for y in Y], "money_unit": "$M", "share_unit": "M ADS",
        "groups": grid(D, Y, {"pe": [None] * 7, "fcfy": [None, None, -1.27, -21.30, -1.70, -5.18, 3.77], "divy": [None, None, 0, 0, 0, 0, 0]}),
        "sidebar": [
            {"title": L("Volume", "销量"),
             "text": L("Deliveries 98k (FY21) to 190k (FY24); Q3 2026 alone 118k.",
                       "交付量由 FY21 的 9.8 万辆增至 FY24 的 19.0 万辆；2026年Q3 单季 11.8 万辆。")},
            {"title": L("Two revenue lines", "两条收入线"), "sub": [
                {"title": L("Vehicles", "汽车"), "text": L("89%; +91%.", "89%；+91%。")},
                {"title": L("Services", "服务"), "text": L("11%; VW fees.", "11%；大众技术费。")}]},
            {"title": L("Margin climb", "毛利率爬升"),
             "text": L("Gross margin 1.7% (FY23) to 19.0% (FY25); EBIT margin -35% to -3%.",
                       "毛利率由 FY23 的 1.7% 升至 FY25 的 19.0%；EBIT 利润率由 -35% 升至 -3%。")},
            {"title": L("Cash", "现金"),
             "text": L("FY25 OCF $1.2B - capex $0.5B = FCF $0.8B; cash $4.9B vs debt $4.2B (Sep 2026).",
                       "FY25 OCF $12 亿 - 资本开支 $5 亿 = FCF $8 亿；现金 $49 亿，债务 $42 亿（2026年9月）。")},
            {"title": L("Return condition", "回报条件"), "final": True,
             "text": L("Volume must keep growing while price cuts slow, so EBIT turns positive in 2028 and reaches 6.5% by 2035 in my model.",
                       "销量须持续增长、降价放缓，使 EBIT 在 2028 年转正，并在我的模型中于 2035 年达到 6.5%。")}]},
    "labels": {"sp": L("Street avg target", "华尔街平均目标价"), "bull": L("Guidance", "公司指引")},
    "dcf": {
        "as_of": L("Nov 17, 2026", "2026年11月17日"), "price": P,
        "scenarios": [{"name": "bear", "value": 3.67}, {"name": "base", "value": 17.99}, {"name": "bull", "value": 19.80}],
        "wacc": "10.1%", "terminal_growth": "2.5%", "horizon": "2026-35", "morningstar": None, "sp": 16.25, "show_weighted": False,
        "notes": [L("Base = blend of guidance and consensus; consensus $16.32. Beta 1.3 (raw 0.98); 10-year horizon; TV 64% of EV. Per ADS.",
                    "基准 = 公司指引与一致预期的平均；一致预期 $16.32。Beta 1.3（原始 0.98）；预测 10 年；终值占 EV 64%。按每 ADS。"),
                  L("Bear $3.67: deliveries stall near 500-600k and EBIT margin only 2.5%. Morningstar FV to follow.",
                    "悲观 $3.67：交付量停滞在 50-60 万辆，EBIT 利润率仅 2.5%。Morningstar 合理价值待补充。")]},
    "kpi_tracker": {
        "title": L("CORE KPI TRACKER | FY21-25", "核心KPI | FY21-25"),
        "columns": [L("Metric", "指标"), "FY21", "FY22", "FY23", "FY24", "FY25"],
        "rows": [[L("Deliveries (k)", "交付量（千辆）"), "98", "121", "142", "190", "~429*"],
                 [L("ASP (RMB k)", "均价（千元）"), "204", "206", "198", "189", "~159*"],
                 [L("Gross margin", "毛利率"), "12.7%", "11.6%", "1.7%", "14.6%", "19.0%"],
                 [L("EBIT margin", "EBIT 利润率"), "-31.8%", "-32.3%", "-35.3%", "-16.5%", "-3.3%"],
                 [L("Cash + ST ($B)", "现金及短投（$B）"), "6.0", "4.7", "5.8", "4.9", "5.3"]]},
    "cagr": cagr_block(D, 2025),
    "financial_position": fin_position(D, range(2021, 2026), [42449, 8516, 13708, 11215, 19361]),
    "lead_paragraphs": [
        {"label": L("CASH USE:", "现金使用："), "text": L(
            "FY20-25 OCF **-$0.3B** and capex **$2.2B**: FCF was **-$2.6B** in total, funded by equity raised around the 2020 IPO. No dividends or buybacks; FY25 was the first year of positive FCF (**$0.8B**).",
            "FY20-25 OCF **-$3 亿**，资本开支 **$22 亿**：FCF 合计 **-$26 亿**，靠 2020 年上市前后募集的资金支撑。没有分红或回购；FY25 是首个 FCF 为正的年份（**$8 亿**）。")},
        {"label": L("NET SHARES:", "净股数变化："), "text": L(
            "Diluted ADS-equivalents rose from 821M (FY21) to 952M (FY25), **+16%**, partly from issuing shares for DiDi's smart-EV assets (2023). 967M diluted now.",
            "稀释 ADS 等值股数由 FY21 的 821M 增至 FY25 的 952M，**+16%**，部分来自为收购滴滴智能汽车资产发行股票（2023）。目前稀释股数 9.67 亿。")}],
    "commentary": [
        {"headline": L("Scale finally arrived.", "规模终于来了。"),
         "body": L("Revenue grew from $0.9B (FY20) to $11.5B (FY25), +88% in FY25 alone; Q3 2026 deliveries were 118,390 and October passed 50,000 for the first time.",
                   "营收由 FY20 的 $9 亿增至 FY25 的 $115 亿，仅 FY25 就增长 88%；2026年Q3 交付 118,390 辆，10 月首次超过 5 万辆。")},
        {"headline": L("Margins recovered from the price war.", "毛利率从价格战中恢复。"),
         "body": L("Gross margin fell to 1.7% in FY23 during China's price war, then rebuilt to 19.0% in FY25 on scale and VW technology fees. Q3 2026 vehicle margin was 13.1%.",
                   "中国价格战期间毛利率在 FY23 降至 1.7%，之后靠规模和大众技术服务费回升至 FY25 的 19.0%。2026年Q3 汽车毛利率 13.1%。")},
        {"headline": L("Still not profitable.", "仍未盈利。"),
         "body": L("EBIT margin improved from -35% (FY23) to -3% (FY25), but Q3 2026 still lost RMB0.87B. Average selling price fell from RMB206k (FY22) to RMB189k (FY24) and further in FY25, so volume must outrun price cuts.",
                   "EBIT 利润率由 FY23 的 -35% 改善至 FY25 的 -3%，但 2026年Q3 仍亏损 8.7 亿元。平均售价由 FY22 的 20.6 万元降至 FY24 的 18.9 万元，FY25 进一步下降，销量增长必须快于降价。")},
        {"headline": L("Cash is adequate, not abundant.", "现金够用，但不充裕。"),
         "body": L("Cash of $4.9B covers $4.2B of debt; FY25 FCF was +$0.8B but TTM is about zero. Without sustained profits, the company may need to raise capital again, diluting ADS holders. Capex stays near 4% of revenue in my model, so profit, not spending cuts, has to close the gap.",
                   "现金 $49 亿覆盖 $42 亿债务；FY25 FCF 为 +$8 亿，但 TTM 约为零。若不能持续盈利，公司可能需要再次融资，稀释 ADS 持有人。我的模型中资本开支保持在营收的 4% 左右，因此缩小缺口要靠盈利，而不是削减投入。")},
        {"headline": L("The range of outcomes is very wide.", "结果区间非常宽。"),
         "body": L("My bear case is $3.67 per ADS (deliveries stall at 500-600k, 2.5% margin) and guidance gives $19.80. Few companies have a bear case 80% below the base; position size should reflect that.",
                   "我的悲观情景为每 ADS $3.67（交付停滞在 50-60 万辆，利润率 2.5%），公司指引情景为 $19.80。悲观情景比基准低 80% 的公司不多，仓位应据此控制。")},
        {"headline": L("My DCF is well above the price.", "我的 DCF 明显高于股价。"),
         "body": L("Base $17.99 per ADS (WACC 10.1%, g 2.5%, beta 1.3) needs $31.0B revenue by 2035 (10.4% a year) and a 6.5% EBIT margin; TV is 64% of EV over a 10-year horizon. At $9.67 that is +86%; the Street is $16.25.",
                   "基准价值每 ADS $17.99（WACC 10.1%，g 2.5%，beta 1.3）要求 2035 年营收 $310 亿（年增 10.4%）、EBIT 利润率 6.5%；10 年预测期下终值占 EV 64%。按 $9.67 计 +86%；华尔街为 $16.25。")}],
    "footnotes": L([
        "FY19-25 from SEC 20-F XBRL in RMB (cash incl. time deposits and debt FY21-25 from the analyst model), converted at a constant RMB 6.671/USD (analyst model); per ADS = ordinary shares / 2. XPeng listed in Aug 2020; FY20 share count is a weighted average around the IPO.",
        "EBITDA* = op. income + D&A. FCF = OCF - capex. ROIC* = op. income x (1-21%) / (equity + debt - cash); ROE* NM when equity < 8% of assets. *FY25 deliveries and ASP are approximate (analyst model, not yet verified).",
        "Header: Nov 16, 2026 ADS close $9.67, 957M ADS; book value = Sep 30, 2026 equity $4.4B per ADS; P/E and P/FCF NM (losses, ~zero TTM FCF). FY21-25 FCF yield and Mkt cap* from StockAnalysis.",
        "DCF: Pythia model XPEV_DCF_Model, Nov 17, 2026; WACC 10.1%, g 2.5%, 10-year horizon. Street avg target = 25-analyst average (S&P Global via StockAnalysis). Morningstar FV not yet provided.",
        "Sources: XPeng 20-F FY2025, Q3 2026 release (Nov 16, 2026); SEC EDGAR; StockAnalysis."],
        ["FY19-25 数据取自 SEC 20-F XBRL（人民币；FY21-25 现金含定期存款，债务取自分析模型），按固定汇率 6.671 人民币/美元折算（分析模型）；每 ADS = 普通股 / 2。小鹏于 2020年8月上市；FY20 股数为上市前后的加权平均。",
         "EBITDA* = 营业利润 + 折旧摊销。FCF = OCF - 资本开支。ROIC* = 营业利润 ×（1-21%）/（权益 + 债务 - 现金）；权益低于资产 8% 时 ROE* 记为 NM。*FY25 交付量与均价为近似值（分析模型，尚未核实）。",
         "首行：2026年11月16日 ADS 收盘 $9.67，9.57 亿 ADS；每 ADS 账面 = 2026年9月30日权益 $44 亿；P/E 与 P/FCF 为 NM（亏损，TTM FCF 约为零）。FY21-25 FCF 收益率与市值*取自 StockAnalysis。",
         "DCF：Pythia 模型 XPEV_DCF_Model，2026年11月17日；WACC 10.1%，g 2.5%，预测 10 年。华尔街平均目标价为 25 位分析师平均（S&P Global，经 StockAnalysis）。Morningstar 合理价值待补充。",
         "来源：小鹏汽车 FY2025 20-F、2026年Q3 业绩公告（2026年11月16日）；SEC EDGAR；StockAnalysis。"]),
    "brand_mark": "PYTHIA",
    "website": {
        "id": "xpev", "name": L("XPeng", "小鹏汽车"), "exchange": "NYSE", "market": "CN", "sector": "Consumer Discretionary", "industry": "Automobiles",
        "indices": ["Other"], "updated": "2026-11-17", "price_date": "2026-11-16", "currency": "USD", "moat": "",
        "summary": L("A Chinese smart-EV maker that has reached scale and a 19% gross margin but is not yet profitable; my DCF ($17.99 per ADS) is well above the price, with a very wide range ($3.67 bear).",
                     "已实现规模、毛利率达 19% 但尚未盈利的中国智能电动车企；我的 DCF（每 ADS $17.99）明显高于股价，但区间很宽（悲观 $3.67）。"),
        "tags": [L("Electric vehicles", "电动车"), L("China", "中国"), L("Autonomous driving", "智能驾驶"), L("Loss-making", "亏损期")],
        "business": L(
            "### Two revenue lines\n- **Vehicle sales (89% of FY25 revenue, +91%):** smart electric cars sold in China and abroad; deliveries reached 118,390 in Q3 2026.\n- **Services & others (11%, +66%):** technology fees from Volkswagen, software, parts and services.\n\n### What changed\nAfter the 2023 price war cut gross margin to 1.7%, XPeng rebuilt it to 19% with scale and technology fees, and turned FCF positive in FY25. It still loses money at the operating level.\n\n### Key risks\nPrice competition in China, cash needs and dilution, technology execution, and US-China tensions (ADR listing).",
            "### 两条收入线\n- **汽车销售（占 FY25 营收 89%，+91%）：** 在中国及海外销售智能电动车；2026年Q3 交付 118,390 辆。\n- **服务及其他（11%，+66%）：** 来自大众的技术服务费、软件、零部件与服务。\n\n### 发生了什么变化\n2023 年价格战使毛利率降至 1.7%，之后小鹏依靠规模和技术服务费使其回升至 19%，并在 FY25 实现正 FCF。经营层面仍在亏损。\n\n### 关键风险\n中国市场价格竞争、资金需求与股权稀释、技术落地，以及中美关系（ADR 上市）。"),
        "segments": [{"name": L("Vehicle sales", "汽车销售"), "share": 89.1},
                     {"name": L("Services & others", "服务及其他"), "share": 10.9}],
        "revenue_cagr": "10.4% (2025-35, blended)", "margin": "EBIT margin -3.3% → 6.5% (2035E)",
        "gap": {
            "summary": L(
                "My blended base value is **$17.99 per ADS**, **86% above** the price (**$9.67**) and 11% above the Street average target (**$16.25**). It needs revenue to grow **10.4% a year to $31.0B in 2035** and the EBIT margin to turn positive in **2028** and reach **6.5%**; I use a **1.3 beta** (WACC 10.1%) rather than the raw 0.98, which would give $21.71. The market is pricing something closer to my bear case. Morningstar's fair value will be added when the report is uploaded.",
                "我的混合基准价值为 **每 ADS $17.99**，比股价（**$9.67**）高 **86%**，比华尔街平均目标价（**$16.25**）高 11%。它要求营收 **每年增长 10.4%，2035 年达 $310 亿**，EBIT 利润率在 **2028 年** 转正并达到 **6.5%**；我用 **1.3 的 beta**（WACC 10.1%），而不是原始的 0.98（对应 $21.71）。市场定价更接近我的悲观情景。Morningstar 的合理价值将在上传报告后补充。"),
            "bridge": [],
            "assumptions": [
                {"item": L("Value per ADS", "每 ADS 价值"), "mine": "$17.99", "morningstar": "—", "sp": "$16.25", "note": L("Street = average of 25 analysts (S&P Global)", "华尔街 = 25 位分析师平均（S&P Global）")},
                {"item": "WACC", "mine": "10.1%", "morningstar": "—", "sp": "—", "note": L("Beta 1.3 (raw 0.98)", "Beta 1.3（原始 0.98）")},
                {"item": L("Revenue 2026E / 2035E", "营收 2026E / 2035E"), "mine": "$13.3B / $31.0B", "morningstar": "—", "sp": "—", "note": ""},
                {"item": L("EBIT margin 2026E / 2035E", "EBIT 利润率 2026E / 2035E"), "mine": "-5.3% / 6.5%", "morningstar": "—", "sp": "—", "note": L("Positive from 2028", "2028 年起为正")},
                {"item": L("Deliveries 2030E", "2030E 交付量"), "mine": "~865k", "morningstar": "—", "sp": "—", "note": L("Blend of guidance 930k and consensus 800k", "指引 93 万与一致预期 80 万的平均")}]},
        "files": [{"type": "onepage", "lang": "en", "label": "One Page", "path": "reports/xpev/XPEV_OnePage_en.pdf", "date": "2026-11-17"},
                  {"type": "onepage", "lang": "zh", "label": "One Page", "path": "reports/xpev/XPEV_OnePage_zh.pdf", "date": "2026-11-17"}],
        "onepage_image": L("reports/xpev/XPEV_OnePage_en.png", "reports/xpev/XPEV_OnePage_zh.png"),
        "history": [{"date": "2026-11-17", "note": L("One Page V2 with DCF", "One Page V2（含 DCF）")}]},
}
write(spec, "onepage/specs/xpev_onepage.json")
