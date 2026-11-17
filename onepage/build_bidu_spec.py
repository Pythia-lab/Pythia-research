"""Baidu One Page spec. Usage: PYTHONPATH=onepage python onepage/build_bidu_spec.py <BIDU_D.json>
BIDU_D.json = SEC 20-F XBRL in RMB (SEC_CCY=CNY sec_history.py) converted at a constant RMB 6.671/USD (the model's rate);
per-ADS shares and EPS only FY21-25 (from the analyst model; earlier per-share data is not tagged in XBRL).
Sources: analyst model BIDU_DCF_Model.xlsx (Nov 17, 2026); StockAnalysis."""
import sys
from spec_common import L, load, grid, cagr_block, fin_position, chart, write

D = load(sys.argv[1])
Y = list(range(2011, 2026))
# Baidu holds more cash than equity + debt in most years, so ROIC on (equity + debt - cash) is meaningless:
# use operating capital before cash instead (footnoted).
for d in D.values():
    d["roic"] = d["op"] * 0.79 / (d["eqt"] + (d["debt"] or 0)) * 100
P = 73.94
spec = {
    "lang": "en",
    "meta_line": L("BIDU (ADS) | FY25: Dec 31, 2025 | Q3 26: Sep 30, 2026 | Market: Nov 16, 2026 | USD at RMB 6.671 | Issued: Nov 17, 2026",
                   "BIDU（ADS）| FY25：2025年12月31日 | 2026年Q3：2026年9月30日 | 市场日期：2026年11月16日 | 美元（按 6.671 人民币折算）| 发布日期：2026年11月17日"),
    "company": {"name": L("BAIDU", "百度"), "ticker": "BIDU", "name_size_pt": 24, "name_width_in": 1.9},
    "header_metrics": [{"value": "25.2B"}, {"value": "73.94"}, {"value": "130.05"}, {"value": "22.3x"}, {"value": "NM"}, {"value": "0.0%"}],
    "business_chain": {
        "title": L("HOW IT EARNS CASH | BUSINESS CHAIN", "现金生成路径"),
        "lines": L(["1 Search | Legacy online marketing $9.3B (48% of FY25), shrinking: Q3 2026 -22%.",
                    "2 AI | AI-powered business $6.0B (31%, +48%): AI Cloud Infra +94%, GPU cloud +191% in Q3.",
                    "3 Stream | iQIYI $4.1B (21%, -6.5%), consolidated with a ~45% stake.",
                    "4 Invest | TTM capex 21% of revenue for AI infrastructure; FY25 FCF -$2.3B.",
                    "5 Hold | Net cash RMB71.7B (~$10.7B) plus investments; buybacks $0.8B in FY25."],
                   ["1 搜索 | 传统在线营销 $93 亿（占 FY25 48%），持续萎缩：2026年Q3 -22%。",
                    "2 AI | AI 业务 $60 亿（31%，+48%）：Q3 AI 云基础设施 +94%，GPU 云 +191%。",
                    "3 视频 | 爱奇艺 $41 亿（21%，-6.5%），持股约 45% 并表。",
                    "4 投入 | TTM 资本开支占营收 21%，投向 AI 基础设施；FY25 FCF -$23 亿。",
                    "5 持有 | 净现金 717 亿元人民币（约 $107 亿）及投资；FY25 回购 $8 亿。"]),
        "watch": L("Watch: AI cloud growth vs search decline, capex intensity, and shareholder returns from the cash pile.",
                   "关注：AI 云增长能否抵消搜索下滑、资本开支强度，以及现金储备如何回报股东。")},
    "mix_table": {
        "title": L("REVENUE BY BUSINESS | FY25", "业务收入 | FY25"),
        "columns": [L("Business", "业务"), "$M", L("Mix", "占比"), L("YoY", "同比")],
        "rows": [[L("Legacy (search ads)", "传统（搜索广告）"), "9,261", "47.9%", "-19.7%"],
                 [L("AI-powered business", "AI 业务"), "5,996", "31.0%", "+48.0%"],
                 [L("iQIYI", "爱奇艺"), "4,092", "21.1%", "-6.5%"]],
        "total_row": [L("Total revenue", "合计"), "19,349", "100.0%", "-3.0%"],
        "notes": [L("RMB at 6.671/USD. Q3 2026 AI-powered = 43% of revenue (RMB13.2B).", "按 6.671 人民币/美元折算。2026年Q3 AI 业务占营收 43%（132 亿元）。")]},
    "chart": chart(D, Y, P, price_min=30, price_max=300, price_ticks=[50, 100, 200], cash_max=18, cash_min=-10,
                   note=L("FY21-25 only (per-ADS data); cash $/ADS L lin; price R log (Nov 16, 2026)", "仅 FY21-25（每 ADS 数据）；现金$/ADS：左线性 | 股价：右对数（2026年11月16日）"),
                   annotations=[{"x": 3.3, "dy": 8, "text": L("AI capex", "AI 资本开支")}]),
    "value_creation": {
        "title": L("VALUE CREATION", "价值创造"), "columns": [f"FY{str(y)[-2:]}" for y in Y], "money_unit": "$M", "share_unit": "M ADS",
        "groups": grid(D, Y, {"pe": [None] * 10 + [33.31, 39.12, 15.06, 9.31, 67.37],
                              "fcfy": [None] * 10 + [2.80, 6.56, 8.61, 6.07, -4.80],
                              "divy": [None] * 10 + [0, 0, 0, 0, 0]}),
        "sidebar": [
            {"title": L("Shift in demand", "需求转移"),
             "text": L("Advertisers move budgets from search to AI products; Q3 2026 revenue -1%, sixth straight decline.",
                       "广告主把预算从搜索转向 AI 产品；2026年Q3 营收 -1%，连续第六个季度下滑。")},
            {"title": L("Three businesses", "三块业务"), "sub": [
                {"title": L("Legacy search", "传统搜索"), "text": L("48%; -20%.", "48%；-20%。")},
                {"title": L("AI-powered", "AI 业务"), "text": L("31%; +48%.", "31%；+48%。")},
                {"title": L("iQIYI", "爱奇艺"), "text": L("21%; ~45% owned.", "21%；持股约 45%。")}]},
            {"title": L("Margin squeeze", "利润挤压"),
             "text": L("EBIT margin (S&P) fell from 16.2% (FY23) to 8.0% (FY25) as high-margin search shrank and AI costs rose.",
                       "高利润的搜索萎缩、AI 成本上升，EBIT 利润率（S&P 口径）由 FY23 的 16.2% 降至 FY25 的 8.0%。")},
            {"title": L("Cash burn", "现金消耗"),
             "text": L("FY25 OCF -$0.5B - capex $1.8B = FCF -$2.3B; TTM capex $4.0B, 21% of revenue.",
                       "FY25 OCF -$5 亿 - 资本开支 $18 亿 = FCF -$23 亿；TTM 资本开支 $40 亿，占营收 21%。")},
            {"title": L("Return condition", "回报条件"), "final": True,
             "text": L("AI revenue must grow fast enough to lift margins back above 10% while capex falls toward 12% of revenue.",
                       "AI 收入须增长得足够快，使利润率回到 10% 以上，同时资本开支降至营收的 12% 左右。")}]},
    "labels": {"sp": L("Street avg target", "华尔街平均目标价"), "bull": L("Guidance", "公司指引")},
    "dcf": {
        "as_of": L("Nov 17, 2026", "2026年11月17日"), "price": P,
        "scenarios": [{"name": "bear", "value": 101.74}, {"name": "base", "value": 147.81}, {"name": "bull", "value": 153.97}],
        "wacc": "8.2%", "terminal_growth": "2.0%", "horizon": "2026-30", "morningstar": None, "sp": 124.86, "show_weighted": False,
        "notes": [L("Base = blend of guidance and consensus; consensus $141.94. Beta 1.0 (raw 0.58); TV 86% of EV. Per ADS.",
                    "基准 = 公司指引与一致预期的平均；一致预期 $141.94。Beta 1.0（原始 0.58）；终值占 EV 86%。按每 ADS。"),
                  L("Equity adds net cash and long-term investments at 70% of book; less iQIYI minorities. Morningstar FV to follow.",
                    "股权价值加回净现金与按账面 70% 计的长期投资，扣除爱奇艺少数股东权益。Morningstar 合理价值待补充。")]},
    "kpi_tracker": {
        "title": L("CORE KPI TRACKER | FY21-25", "核心KPI | FY21-25"),
        "columns": [L("Metric", "指标"), "FY21", "FY22", "FY23", "FY24", "FY25"],
        "rows": [[L("EBIT margin (S&P)", "EBIT 利润率"), "8.6%", "12.9%", "16.2%", "16.0%", "8.0%"],
                 [L("Gross margin", "毛利率"), "48.5%", "48.4%", "51.7%", "50.3%", "43.9%"],
                 [L("Capex / revenue", "资本开支/营收"), "8.8%", "6.7%", "8.3%", "6.1%", "9.4%"],
                 [L("AI-powered share", "AI 业务占比"), "--", "--", "--", "20.3%", "31.0%"],
                 [L("Net cash ($B)", "净现金（$B）"), "13.3", "12.4", "16.4", "7.2", "2.7"]]},
    "cagr": cagr_block(D, 2025),
    "financial_position": fin_position(D, range(2021, 2026), [51788, 39523, 41631, 29559, 44912]),
    "lead_paragraphs": [
        {"label": L("CAPITAL RETURNS:", "现金分配："), "text": L(
            "FY12-25 OCF $46.3B less capex $14.2B left **$32.0B FCF**. Buybacks **$8.3B (26%)**; no dividends; acquisitions **$3.3B**. Most FCF stayed on the balance sheet as cash and long-term investments.",
            "FY12-25 OCF $463 亿减资本开支 $142 亿，得 **FCF $320 亿**。回购 **$83 亿（26%）**；未派息；收购 **$33 亿**。大部分 FCF 留在资产负债表上，成为现金和长期投资。")},
        {"label": L("NET SHARES:", "净股数变化："), "text": L(
            "Diluted ADS-equivalents FY21 352M to FY25 343M, **down 2.6%**; buybacks roughly offset stock pay (SBC $0.5B in FY25). 344.5M diluted now.",
            "稀释 ADS 等值股数由 FY21 的 352M 降至 FY25 的 343M，**减少 2.6%**；回购大致抵消股权激励（FY25 SBC $5 亿）。目前稀释股数 3.445 亿。")}],
    "commentary": [
        {"headline": L("Search growth is over.", "搜索增长已经结束。"),
         "body": L("Revenue rose from $2.2B (FY11) to $20.2B (FY23), then fell to $19.3B (FY25); Q3 2026 was the sixth straight quarterly decline as online marketing dropped 22%.",
                   "营收由 FY11 的 $22 亿增至 FY23 的 $202 亿，之后降至 FY25 的 $193 亿；2026年Q3 在线营销下降 22%，营收连续第六个季度下滑。")},
        {"headline": L("AI is growing, but not yet enough.", "AI 在增长，但还不够。"),
         "body": L("The AI-powered business grew 48% to $6.0B in FY25 and was 43% of revenue in Q3 2026; AI Cloud Infra rose 94% and GPU cloud 191%. It still cannot offset the search decline: legacy revenue fell by $2.3B in FY25 while AI added $1.9B.",
                   "AI 业务 FY25 增长 48% 至 $60 亿，2026年Q3 占营收 43%；AI 云基础设施增长 94%，GPU 云增长 191%。但仍不足以抵消搜索下滑：FY25 传统业务收入减少 $23 亿，AI 业务只增加 $19 亿。")},
        {"headline": L("Margins and cash have collapsed.", "利润率和现金流大幅下滑。"),
         "body": L("EBIT margin halved from 16.2% (FY23) to 8.0% (FY25); operating cash flow turned negative and FCF was -$2.3B as capex rose to 21% of TTM revenue. My model needs that ratio back near 12% by 2030; if AI capex stays high, the DCF falls sharply.",
                   "EBIT 利润率由 FY23 的 16.2% 减半至 FY25 的 8.0%；经营现金流转负，资本开支升至 TTM 营收的 21%，FCF 为 -$23 亿。我的模型要求该比例在 2030 年回到 12% 左右；若 AI 资本开支持续偏高，DCF 会大幅下降。")},
        {"headline": L("The balance sheet is the floor.", "资产负债表是底线。"),
         "body": L("Net cash of RMB71.7B plus long-term investments means the ~$25B market value is below gross cash and investments (~$41B). The market is pricing years of cash burn and a China discount.",
                   "717 亿元人民币的净现金加上长期投资，使约 $250 亿的市值低于现金和投资总额（约 $410 亿）。市场在为多年的现金消耗和中国折价定价。")},
        {"headline": L("Little has been returned.", "回报股东很少。"),
         "body": L("Baidu has never paid a dividend; buybacks took 26% of FY12-25 FCF and only offset stock pay. Cash returns, not AI growth alone, would close the gap to book value.",
                   "百度从未派息；FY12-25 回购只占 FCF 的 26%，仅抵消了股权激励。能缩小与账面价值差距的是现金回报，而不只是 AI 增长。")},
        {"headline": L("My DCF says the market is too pessimistic.", "我的 DCF 认为市场过于悲观。"),
         "body": L("Base $147.81 per ADS (WACC 8.2%, g 2%, beta 1.0) needs $25.8B revenue by 2030 (5.9% a year), an 11.5% EBIT margin and capex back to 12%; TV is 86% of EV. At $73.94 that is +100%; even bear $101.74 is +38%.",
                   "基准价值每 ADS $147.81（WACC 8.2%，g 2%，beta 1.0）要求 2030 年营收 $258 亿（年增 5.9%）、EBIT 利润率 11.5%，资本开支回到 12%；终值占 EV 86%。按 $73.94 计 +100%；悲观情景 $101.74 也有 +38%。")}],
    "footnotes": L([
        "FY11-25 from SEC 20-F XBRL in RMB, converted at a constant RMB 6.671/USD (analyst model). Per-ADS shares and EPS only FY21-25 (1 ADS = 8 Class A shares; earlier years not tagged).",
        "Op. income = GAAP (FY25 loss includes impairments); KPI EBIT margin on S&P basis. FCF = OCF - capex. ROIC* = op. income x (1-21%) / (equity + debt), cash not deducted (net cash exceeds capital). iQIYI is consolidated (~45% stake).",
        "Header: Nov 16, 2026 ADS close $73.94, 340.5M ADS; book value = Sep 30, 2026 equity $44.3B per ADS; TTM P/E (EPS $3.31); P/FCF NM (negative FCF). FY21-25 P/E, FCF yield and Mkt cap* from StockAnalysis.",
        "DCF: Pythia model BIDU_DCF_Model, Nov 17, 2026; WACC 8.2%, g 2.0%. Street avg target = 30-analyst average (S&P Global via StockAnalysis). Morningstar FV not yet provided.",
        "Sources: Baidu 20-F FY2025, Q3 2026 release (Nov 16, 2026); SEC EDGAR; FRED (RMB/USD); StockAnalysis."],
        ["FY11-25 数据取自 SEC 20-F XBRL（人民币），按固定汇率 6.671 人民币/美元折算（分析模型）。每 ADS 股数与 EPS 仅有 FY21-25（1 ADS = 8 股 A 类股；更早年份未标注）。",
         "营业利润为 GAAP 口径（FY25 亏损含减值）；KPI 中 EBIT 利润率为 S&P 口径。FCF = OCF - 资本开支。ROIC* = 营业利润 ×（1-21%）/（权益 + 债务），不扣现金（净现金超过资本）。爱奇艺并表（持股约 45%）。",
         "首行：2026年11月16日 ADS 收盘 $73.94，3.405 亿 ADS；每 ADS 账面 = 2026年9月30日权益 $443 亿；TTM P/E（EPS $3.31）；P/FCF 为 NM（FCF 为负）。FY21-25 P/E、FCF 收益率与市值*取自 StockAnalysis。",
         "DCF：Pythia 模型 BIDU_DCF_Model，2026年11月17日；WACC 8.2%，g 2.0%。华尔街平均目标价为 30 位分析师平均（S&P Global，经 StockAnalysis）。Morningstar 合理价值待补充。",
         "来源：百度 FY2025 20-F、2026年Q3 业绩公告（2026年11月16日）；SEC EDGAR；FRED（人民币汇率）；StockAnalysis。"]),
    "brand_mark": "PYTHIA",
    "website": {
        "id": "bidu", "name": L("Baidu", "百度"), "exchange": "NASDAQ", "market": "CN", "sector": "Communication Services", "industry": "Interactive Media & Advertising",
        "indices": ["Other"], "updated": "2026-11-17", "price_date": "2026-11-16", "currency": "USD", "moat": "",
        "summary": L("China's search leader is shrinking its old ad business and spending heavily on AI cloud; the stock trades below its cash and investments, and my DCF ($147.81 per ADS) is double the price.",
                     "中国搜索龙头的传统广告业务在萎缩，正大举投入 AI 云；股价低于其现金与投资，我的 DCF（每 ADS $147.81）是股价的两倍。"),
        "tags": [L("China internet", "中国互联网"), "AI", L("Search", "搜索"), L("Cloud", "云计算")],
        "business": L(
            "### Three businesses\n- **Legacy business (48% of FY25 revenue):** traditional search and online advertising; down 20% in FY25 and 22% in Q3 2026.\n- **AI-powered business (31%, +48%):** AI Cloud Infra (GPU cloud), AI applications and AI-native marketing.\n- **iQIYI (21%):** online video, consolidated with a ~45% economic stake.\n\n### What changed\nBaidu is spending about a fifth of revenue on AI infrastructure while its high-margin search ads shrink; free cash flow turned negative in FY25.\n\n### Key risks\nSearch decline outpacing AI growth, AI pricing competition in China, capex discipline, regulation, and US-China tensions (ADR listing).",
            "### 三块业务\n- **传统业务（占 FY25 营收 48%）：** 传统搜索与在线广告；FY25 下降 20%，2026年Q3 下降 22%。\n- **AI 业务（31%，+48%）：** AI 云基础设施（GPU 云）、AI 应用和 AI 原生营销。\n- **爱奇艺（21%）：** 在线视频，持股约 45% 并表。\n\n### 发生了什么变化\n百度把约五分之一的营收投入 AI 基础设施，而高利润的搜索广告在萎缩；FY25 自由现金流转负。\n\n### 关键风险\n搜索下滑快于 AI 增长、中国 AI 价格竞争、资本开支纪律、监管，以及中美关系（ADR 上市）。"),
        "segments": [{"name": L("Legacy business", "传统业务"), "share": 47.9},
                     {"name": L("AI-powered business", "AI 业务"), "share": 31.0},
                     {"name": "iQIYI", "share": 21.1}],
        "revenue_cagr": "5.9% (2025-30, blended)", "margin": "EBIT margin 8.0% → 11.5% (2030E)",
        "gap": {
            "summary": L(
                "My blended base value is **$147.81 per ADS**, about **double** the price (**$73.94**) and 18% above the Street average target (**$124.86**). The difference with the market is mostly **the balance sheet and the terminal value**: I add net cash and long-term investments (at 70% of book) and assume margins recover to **11.5%** with capex falling to **12%** of revenue, so 86% of EV is terminal. The market is pricing years of cash burn and a China discount. Morningstar's fair value will be added when the report is uploaded.",
                "我的混合基准价值为 **每 ADS $147.81**，约为股价（**$73.94**）的 **两倍**，比华尔街平均目标价（**$124.86**）高 18%。与市场的差距主要来自 **资产负债表和终值**：我加回净现金和按账面 70% 计的长期投资，并假设利润率回升至 **11.5%**、资本开支降到营收的 **12%**，因此终值占 EV 86%。市场在为多年的现金消耗和中国折价定价。Morningstar 的合理价值将在上传报告后补充。"),
            "bridge": [],
            "assumptions": [
                {"item": L("Value per ADS", "每 ADS 价值"), "mine": "$147.81", "morningstar": "—", "sp": "$124.86", "note": L("Street = average of 30 analysts (S&P Global)", "华尔街 = 30 位分析师平均（S&P Global）")},
                {"item": "WACC", "mine": "8.2%", "morningstar": "—", "sp": "—", "note": L("Beta 1.0 (raw 0.58)", "Beta 1.0（原始 0.58）")},
                {"item": L("Revenue 2026E / 2030E", "营收 2026E / 2030E"), "mine": "$19.0B / $25.8B", "morningstar": "—", "sp": "—", "note": L("AI share 43% (2026E) → 65% (2030E)", "AI 占比 43%（2026E）→ 65%（2030E）")},
                {"item": L("EBIT margin 2030E", "EBIT 利润率 2030E"), "mine": "11.5%", "morningstar": "—", "sp": "—", "note": L("FY25 8.0% (S&P)", "FY25 8.0%（S&P）")},
                {"item": L("Long-term investments", "长期投资"), "mine": L("70% of book ($9.5B)", "账面 70%（$95 亿）"), "morningstar": "—", "sp": "—", "note": ""}]},
        "files": [{"type": "onepage", "lang": "en", "label": "One Page", "path": "reports/bidu/BIDU_OnePage_en.pdf", "date": "2026-11-17"},
                  {"type": "onepage", "lang": "zh", "label": "One Page", "path": "reports/bidu/BIDU_OnePage_zh.pdf", "date": "2026-11-17"}],
        "onepage_image": L("reports/bidu/BIDU_OnePage_en.png", "reports/bidu/BIDU_OnePage_zh.png"),
        "history": [{"date": "2026-11-17", "note": L("One Page V2 with DCF", "One Page V2（含 DCF）")}]},
}
write(spec, "onepage/specs/bidu_onepage.json")
