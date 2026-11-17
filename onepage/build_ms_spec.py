"""Morgan Stanley One Page spec (bank layout). Usage: PYTHONPATH=onepage python onepage/build_ms_spec.py <MS companyfacts.json>
A bank's debt and deposits are raw material, so OCF/capex/FCF rows are replaced by revenue, efficiency, returns,
capital and per-share rows. Net revenues = pre-tax income + non-interest expenses (+ credit provisions from 2020).
Sources: SEC XBRL FY2011-25; analyst model MS_Valuation_Model.xlsx (Nov 17, 2026); StockAnalysis."""
import json, sys
import sec_history as h
from spec_common import L, write

F = json.load(open(sys.argv[1]))["facts"]
Y = list(range(2011, 2026))
P = 185.57


def s(tag, instant=False):
    return {y: v for y, v in h.series(F, tag, instant).items()}


pti = s("IncomeLossFromContinuingOperationsBeforeIncomeTaxesExtraordinaryItemsNoncontrollingInterest")
nie, ni, nic = s("NoninterestExpense"), s("NetIncomeLoss"), s("NetIncomeLossAvailableToCommonStockholdersBasic")
prov1, prov2 = s("FinancingReceivableExcludingAccruedInterestCreditLossExpenseReversal"), s("OffBalanceSheetCreditLossLiabilityCreditLossExpenseReversal")
nii, comp, div = s("InterestIncomeExpenseNet"), s("LaborAndRelatedExpense"), s("PaymentsOfDividends")
eps, dps, sh = s("EarningsPerShareDiluted"), s("CommonStockDividendsPerShareDeclared"), s("WeightedAverageNumberOfDilutedSharesOutstanding")
eq, gw, ia, assets = s("StockholdersEquity", True), s("Goodwill", True), s("IntangibleAssetsNetExcludingGoodwill", True), s("Assets", True)
M = 1e6
D = {}
for y in Y:
    prov = (prov1.get(y, 0) + prov2.get(y, 0)) if y >= 2020 else 0
    rev = (pti[y] + nie[y] + prov) / M
    D[y] = dict(rev=rev, pti=pti[y] / M, nie=nie[y] / M, comp=comp[y] / M, nii=nii[y] / M, ni=ni[y] / M, nic=nic[y] / M,
                div=div[y] / M, eps=eps[y], dps=dps[y], sh=sh[y] / M, eq=eq[y] / M, te=(eq[y] - gw[y] - ia[y]) / M,
                assets=assets[y] / M)
col = lambda f: [f(D[y], y) for y in Y]
yoy = col(lambda d, y: (d["rev"] / D[y - 1]["rev"] - 1) * 100 if y - 1 in D else None)
avg = lambda k, d, y: (d[k] + D[y - 1][k]) / 2 if y - 1 in D else d[k]
G = [
    [{"key": "revenue", "metric": L("Net Revenues", "净收入"), "values": col(lambda d, y: d["rev"])},
     {"key": "rev_yoy", "values": yoy},
     {"metric": L("Net Interest Inc.", "净利息收入"), "unit": "$M", "fmt": "auto", "values": col(lambda d, y: d["nii"])},
     {"metric": L("Comp. / Revenue", "薪酬/收入"), "unit": "%", "fmt": "pct", "values": col(lambda d, y: d["comp"] / d["rev"] * 100)},
     {"metric": L("Efficiency Ratio*", "效率比*"), "unit": "%", "fmt": "pct", "values": col(lambda d, y: d["nie"] / d["rev"] * 100)},
     {"metric": L("Pre-tax Income", "税前利润"), "unit": "$M", "fmt": "auto", "values": col(lambda d, y: d["pti"])},
     {"metric": L("Pre-tax Margin", "税前利润率"), "unit": "%", "fmt": "pct", "values": col(lambda d, y: d["pti"] / d["rev"] * 100)}],
    [{"key": "net_income", "values": col(lambda d, y: d["ni"])},
     {"key": "net_margin", "values": col(lambda d, y: d["ni"] / d["rev"] * 100)},
     {"metric": L("NI to Common", "普通股净利润"), "unit": "$M", "fmt": "auto", "values": col(lambda d, y: d["nic"])},
     {"key": "dividends", "values": col(lambda d, y: d["div"])},
     {"metric": L("Dividends / NI", "股息/净利润"), "unit": "%", "fmt": "pct", "values": col(lambda d, y: d["div"] / d["ni"] * 100 if d["ni"] > 0 else "NM")}],
    [{"metric": L("Total Assets", "总资产"), "unit": "$B", "fmt": "0", "values": col(lambda d, y: d["assets"] / 1000)},
     {"metric": L("Total Equity", "股东权益"), "unit": "$M", "fmt": "auto", "values": col(lambda d, y: d["eq"])},
     {"metric": L("Tangible Equity*", "有形权益*"), "unit": "$M", "fmt": "auto", "values": col(lambda d, y: d["te"])},
     {"metric": L("Equity / Assets", "权益/资产"), "unit": "%", "fmt": "pct", "values": col(lambda d, y: d["eq"] / d["assets"] * 100)}],
    [{"metric": "ROE*", "unit": "%", "fmt": "pct", "values": col(lambda d, y: d["nic"] / avg("eq", d, y) * 100)},
     {"metric": "ROTE*", "unit": "%", "fmt": "pct", "values": col(lambda d, y: d["nic"] / avg("te", d, y) * 100)},
     {"key": "roa", "values": col(lambda d, y: d["ni"] / avg("assets", d, y) * 100)}],
    [{"key": "shares", "values": col(lambda d, y: d["sh"])},
     {"key": "rev_ps", "values": col(lambda d, y: d["rev"] / d["sh"])},
     {"key": "eps", "values": col(lambda d, y: d["eps"])},
     {"metric": L("Dividend / Sh.", "每股股息"), "unit": "$/sh", "fmt": "auto", "values": col(lambda d, y: d["dps"])},
     {"metric": L("Payout (DPS/EPS)", "派息率"), "unit": "%", "fmt": "pct", "values": col(lambda d, y: d["dps"] / d["eps"] * 100 if d["eps"] > 0 else "NM")},
     {"metric": L("Tang. Equity / Sh.*", "每股有形权益*"), "unit": "$/sh", "fmt": "auto", "values": col(lambda d, y: d["te"] / d["sh"])}],
    [{"key": "avg_pe", "metric": L("P/E (FY-end)*", "年末P/E*"), "values": [None] * 10 + [12.09, 13.63, 17.94, 15.82, 17.36]},
     {"metric": L("P/B (FY-end)*", "年末P/B*"), "unit": "x", "fmt": "x", "values": [None] * 10 + [1.65, 1.42, 1.53, 1.92, 2.51]},
     {"key": "div_yield", "metric": L("Dividend Yield*", "股息率*"), "values": [None] * 10 + [2.46, 3.53, 3.53, 2.88, 2.20]}],
]


def cg(f, n, last=2025):
    a, b = f(last - n), f(last)
    return "NM" if a is None or b is None or a <= 0 or b <= 0 else f"{((b / a) ** (1 / n) - 1) * 100:.1f}%"


cagr_rows = [(L("Net revenues", "净收入"), lambda y: D[y]["rev"]), (L("Pre-tax income", "税前利润"), lambda y: D[y]["pti"]),
             (L("NI to common", "普通股净利润"), lambda y: D[y]["nic"]), (L("Diluted EPS", "稀释EPS"), lambda y: D[y]["eps"]),
             (L("Div. / Sh.", "每股股息"), lambda y: D[y]["dps"]), (L("Tang. eq. / Sh.", "每股有形权益"), lambda y: D[y]["te"] / D[y]["sh"])]
CAGR = {"title": L("COMPOUND ANNUAL GROWTH RATE", "复合年增长率 | CAGR"), "columns": ["", "1Y", "3Y", "5Y", "10Y", "14Y"],
        "rows": [[lab] + [cg(f, n) for n in (1, 3, 5, 10, 14)] for lab, f in cagr_rows]}
B = lambda v: f"{v / 1000:.1f}"
FP = {"title": L("FINANCIAL POSITION | $B", "财务状况 | $B"), "columns": ["", "FY21", "FY22", "FY23", "FY24", "FY25"],
      "rows": [[L("Tot. assets", "总资产")] + [f"{D[y]['assets'] / 1000:.0f}" for y in range(2021, 2026)],
               [L("Tot. equity", "股东权益")] + [B(D[y]["eq"]) for y in range(2021, 2026)],
               [L("Tang. com. eq.", "有形普通股权益")] + ["71.5", "67.1", "66.5", "71.6", "79.1"],
               [L("Mkt cap*", "市值*")] + ["176.1", "143.7", "153.1", "202.5", "282.2"],
               [L("TBV / sh ($)", "每股有形账面")] + ["39.41", "39.18", "40.42", "44.45", "49.71"],
               [L("Equity/assets", "权益/资产")] + [f"{D[y]['eq'] / D[y]['assets'] * 100:.1f}%" for y in range(2021, 2026)]]}
eps_ps = [D[y]["eps"] for y in Y]
dps_ps = [D[y]["dps"] for y in Y]
spec = {
    "lang": "en",
    "meta_line": L("MS | FY25: Dec 31, 2025 | Q3 26: Sep 30, 2026 | Market: Nov 16, 2026 | USD | Issued: Nov 17, 2026",
                   "MS | FY25：2025年12月31日 | 2026年Q3：2026年9月30日 | 市场日期：2026年11月16日 | 美元 | 发布日期：2026年11月17日"),
    "company": {"name": L("MORGAN STANLEY", "摩根士丹利"), "ticker": "MS", "name_size_pt": 17, "name_width_in": 2.2},
    "header_metrics": [{"value": "291B"}, {"value": "185.57"}, {"value": "68.31"}, {"value": "14.7x"}, {"value": "3.46x"}, {"value": "2.5%"}],
    "labels": {"hm": L([["Mkt", "Cap"], ["Stock", "Price"], ["Book", "Value"], ["P/E", "Ratio"], ["P/TBV", "Ratio"], ["Div", "Yield"]],
                       [["最新", "市值"], ["最新", "股价"], ["账面", "价值"], ["P/E", "倍数"], ["P/TBV", "倍数"], ["股息", "收益率"]]),
               "dcf": L("EQUITY VALUATION (RI + DDM)", "股权估值（剩余收益 + 股利折现）"), "wacc": L("Cost of equity", "股权成本"),
               "sp": L("Street avg target", "华尔街平均目标价"), "bull": L("Guidance", "公司指引"),
               "cap_ret": L("EARNINGS & PAYOUT:", "利润与分配："), "groups": L("Bank metrics", "银行指标")},
    "business_chain": {
        "title": L("HOW IT EARNS MONEY | BUSINESS CHAIN", "盈利路径"),
        "lines": L(["1 Gather | Wealth Management: Q3 2026 net new assets $232B; fee-based, recurring revenue.",
                    "2 Advise & trade | Institutional Securities $33.1B (FY25): banking, equities, fixed income.",
                    "3 Manage | Investment Management $6.5B of fees on client assets.",
                    "4 Control cost | Efficiency ratio 68.4% in FY25 (77.2% in FY23); comp 41% of revenue.",
                    "5 Return | FY25 NI to common $16.2B; DPS $3.85; CET1 14.9% vs 11.8% required."],
                   ["1 聚集 | 财富管理：2026年Q3 净新增资产 $2,320 亿；以收费为主，收入可重复。",
                    "2 顾问与交易 | 机构证券 $331 亿（FY25）：投行、股票、固定收益。",
                    "3 管理 | 投资管理收取客户资产管理费 $65 亿。",
                    "4 控成本 | FY25 效率比 68.4%（FY23 77.2%）；薪酬占收入 41%。",
                    "5 回报 | FY25 普通股净利润 $162 亿；每股股息 $3.85；CET1 14.9%，要求 11.8%。"]),
        "watch": L("Watch: wealth net new assets, trading and banking cycle, and excess capital over 11.8%.",
                   "关注：财富管理净新增资产、交易与投行周期，以及高于 11.8% 要求的超额资本。")},
    "mix_table": {
        "title": L("NET REVENUES BY SEGMENT | FY25", "分部净收入 | FY25"),
        "columns": [L("Segment", "分部"), "$M", L("Mix", "占比"), L("YoY", "同比")],
        "rows": [[L("Institutional Securities", "机构证券"), "33,080", "46.8%", "+17.8%"],
                 [L("Wealth Management", "财富管理"), "31,754", "44.9%", "+11.7%"],
                 [L("Investment Management", "投资管理"), "6,500", "9.2%", "+10.6%"],
                 [L("Intersegment", "分部间抵销"), "-689", "-1.0%", "--"]],
        "total_row": [L("Net revenues", "合计"), "70,645", "100.0%", "+14.4%"],
        "notes": [L("FY25 pre-tax margins: IS 34%, WM 29.3%, IM 21.6% (10-K).", "FY25 税前利润率：机构证券 34%、财富管理 29.3%、投资管理 21.6%（10-K）。")]},
    "chart": {"x_labels": [str(y)[-2:] for y in Y], "ocf_ps": eps_ps, "fcf_ps": dps_ps, "last_price": P, "log": True,
              "price_min": 10, "price_max": 300, "price_ticks": [25, 50, 100], "cash_max": 14, "cash_min": -2,
              "legend": L([f"EPS ${eps_ps[-1]:.2f}", f"Dividend / sh ${dps_ps[-1]:.2f}"], [f"每股收益 ${eps_ps[-1]:.2f}", f"每股股息 ${dps_ps[-1]:.2f}"]),
              "note": L("EPS & DPS $/sh L lin; price R log (Nov 16, 2026)", "EPS 与每股股息：左线性 | 股价：右对数（2026年11月16日）"),
              "annotations": [{"x": 9.6, "text": L("E*TRADE 10/2020", "收购 E*TRADE 10/2020")},
                              {"x": 10.3, "dy": 10, "text": L("Eaton Vance 03/2021", "收购 Eaton Vance 03/2021")}]},
    "value_creation": {
        "title": L("VALUE CREATION", "价值创造"), "columns": [f"FY{str(y)[-2:]}" for y in Y], "money_unit": "$M", "share_unit": "M sh",
        "groups": G,
        "sidebar": [
            {"title": L("Client assets", "客户资产"),
             "text": L("Wealth net new assets $232B in Q3 2026; markets lift fee revenue.",
                       "2026年Q3 财富管理净新增资产 $2,320 亿；市场上涨推高费用收入。")},
            {"title": L("Three segments", "三大分部"), "sub": [
                {"title": L("Institutional", "机构证券"), "text": L("47%; 34% pre-tax margin.", "47%；税前利润率 34%。")},
                {"title": L("Wealth", "财富管理"), "text": L("45%; 29.3% margin.", "45%；利润率 29.3%。")},
                {"title": L("Investment Mgmt", "投资管理"), "text": L("9%; 21.6% margin.", "9%；利润率 21.6%。")}]},
            {"title": L("Operating leverage", "经营杠杆"),
             "text": L("Pre-tax margin rose from 21.8% (FY23) to 31.1% (FY25) and 33.2% TTM as revenue outgrew costs.",
                       "收入增速快于成本，税前利润率由 FY23 的 21.8% 升至 FY25 的 31.1%，TTM 33.2%。")},
            {"title": L("Capital", "资本"),
             "text": L("CET1 14.9% vs 11.8% required (Sep 30, 2026); ~$18.5B of excess capital; $20B buyback authorisation.",
                       "CET1 14.9%，要求 11.8%（2026年9月30日）；超额资本约 $185 亿；$200 亿回购授权。")},
            {"title": L("Return condition", "回报条件"), "final": True,
             "text": L("ROTCE (21.6% in FY25) must stay well above the 10.6% cost of equity through a weaker trading and banking year.",
                       "即使交易与投行业务转弱，ROTCE（FY25 为 21.6%）也须明显高于 10.6% 的股权成本。")}]},
    "dcf": {
        "as_of": L("Nov 17, 2026", "2026年11月17日"), "price": P,
        "scenarios": [{"name": "bear", "value": 117.68}, {"name": "base", "value": 159.64}, {"name": "bull", "value": 164.48}],
        "wacc": "10.6%", "terminal_growth": "3.5% / 2%", "horizon": "2026-30", "morningstar": None, "sp": 211.50, "show_weighted": False,
        "notes": [L("Base = average of residual income ($151.14) and distributable capital ($168.13); beta 1.22.",
                    "基准 = 剩余收益（$151.14）与可分配资本（$168.13）两种方法的平均；beta 1.22。"),
                  L("g: 3.5% for book/payouts, 2% for residual income. Morningstar FV to follow.",
                    "g：账面与分配 3.5%，剩余收益 2%。Morningstar 合理价值待补充。")]},
    "kpi_tracker": {
        "title": L("CORE KPI TRACKER | FY21-25", "核心KPI | FY21-25"),
        "columns": [L("Metric", "指标"), "FY21", "FY22", "FY23", "FY24", "FY25"],
        "rows": [[L("Efficiency ratio", "效率比"), "67.1%", "73.2%", "77.2%", "71.1%", "68.4%"],
                 [L("Pre-tax margin", "税前利润率"), "32.9%", "26.3%", "21.8%", "28.5%", "31.1%"],
                 ["ROTCE", "--", "15.2%", "12.8%", "18.5%", "21.6%"],
                 [L("TBV / share ($)", "每股有形账面（$）"), "39.41", "39.18", "40.42", "44.45", "49.71"],
                 [L("DPS ($)", "每股股息（$）"), "2.10", "2.95", "3.25", "3.55", "3.85"]]},
    "cagr": CAGR,
    "financial_position": FP,
    "lead_paragraphs": [
        {"label": L("EARNINGS & PAYOUT:", "利润与分配："), "text": L(
            "FY12-25 net income to common **$112.5B**; dividends paid **$42.9B** (incl. preferred). DPS rose from $0.20 to **$3.85**. Buybacks are not tagged in XBRL; they show up in the share count.",
            "FY12-25 普通股净利润 **$1,125 亿**；已付股息 **$429 亿**（含优先股）。每股股息由 $0.20 增至 **$3.85**。回购在 XBRL 中没有标注，体现在股数变化上。")},
        {"label": L("NET SHARES:", "净股数变化："), "text": L(
            "Diluted shares FY12 1,919M to FY25 1,592M, **down 17%**, even after issuing stock for E*TRADE and Eaton Vance (FY20-21). **1,566M** diluted in Q3 2026.",
            "稀释股数由 FY12 的 1,919M 降至 FY25 的 1,592M，**减少 17%**，其间还为收购 E*TRADE 和 Eaton Vance（FY20-21）发行了股票。2026年Q3 稀释股数 **15.66 亿股**。")}],
    "commentary": [
        {"headline": L("Wealth changed the business.", "财富管理改变了公司。"),
         "body": L("Net revenues grew from $26.2B (FY12) to $70.6B (FY25). Wealth and Investment Management are now 54% of revenue after E*TRADE and Eaton Vance, giving fee income that cushions trading cycles.",
                   "净收入由 FY12 的 $262 亿增至 FY25 的 $706 亿。收购 E*TRADE 和 Eaton Vance 后，财富管理与投资管理占收入 54%，收费收入缓冲了交易周期。")},
        {"headline": L("Operating leverage is back.", "经营杠杆回来了。"),
         "body": L("The efficiency ratio fell from 77.2% (FY23) to 68.4% (FY25) and pre-tax margin rose to 31.1% (33.2% TTM). 9M 2026 Institutional Securities pre-tax income rose 39%.",
                   "效率比由 FY23 的 77.2% 降至 FY25 的 68.4%，税前利润率升至 31.1%（TTM 33.2%）。2026年前 9 个月机构证券税前利润增长 39%。")},
        {"headline": L("Returns are well above the cost of equity.", "回报明显高于股权成本。"),
         "body": L("ROTCE reached 21.6% in FY25 and 22.6% in Q3 2026, against a 10.6% cost of equity. Tangible book per share rose from $39.18 (FY22) to $53.69 (Q3 2026).",
                   "ROTCE 在 FY25 达到 21.6%，2026年Q3 为 22.6%，股权成本为 10.6%。每股有形账面由 FY22 的 $39.18 增至 2026年Q3 的 $53.69。")},
        {"headline": L("Capital is the payout limit.", "资本决定分配上限。"),
         "body": L("CET1 is 14.9% against an 11.8% requirement (4.5% minimum + 4.3% stress buffer + 3.0% G-SIB). The quarterly dividend is $1.15 and a $20B buyback programme runs at ~$1.5-1.75B a quarter.",
                   "CET1 为 14.9%，要求 11.8%（4.5% 最低 + 4.3% 压力缓冲 + 3.0% G-SIB）。季度股息 $1.15，$200 亿回购计划每季度约 $15-17.5 亿。")},
        {"headline": L("The market pays for the cycle top.", "市场按周期高点定价。"),
         "body": L("At $185.57 the stock trades at 3.5x tangible book and 14.7x TTM EPS, up from 1.4x book at FY22. My model has net revenues growing only ~4.5% a year after a strong 2026.",
                   "按 $185.57 计，股价为有形账面的 3.5 倍、TTM EPS 的 14.7 倍；FY22 年末仅为账面的 1.4 倍。我的模型在 2026 年强劲增长后，净收入每年仅增约 4.5%。")},
        {"headline": L("My value is below the price.", "我的估值低于股价。"),
         "body": L("Base $159.64 averages residual income ($151.14) and distributable capital ($168.13) at a 10.6% cost of equity (beta 1.22), with ROTCE near 26% by 2030. At $185.57 that is -14%; the Street ($211.50) is higher.",
                   "基准价值 $159.64 是剩余收益（$151.14）与可分配资本（$168.13）的平均，股权成本 10.6%（beta 1.22），2030 年 ROTCE 约 26%。按 $185.57 计为 -14%；华尔街（$211.50）更高。")}],
    "footnotes": L([
        "FY11-25 from SEC 10-K XBRL. Net revenues = pre-tax income + non-interest expenses (+ credit provisions from FY20). Efficiency ratio* = non-interest expenses / net revenues.",
        "Tangible equity* = total equity - goodwill - intangibles (incl. preferred, ~$9-10B). ROE*/ROTE* = NI to common / average equity. KPI ROTCE and TBV from the analyst model (excl. preferred, approx.).",
        "Header: Nov 16, 2026 close $185.57 x 1,566M diluted shares; book value = Sep 30, 2026 common equity $107.0B; TTM P/E (EPS $12.63); P/TBV on $53.69. FY21-25 P/E, P/B, yield and Mkt cap* from StockAnalysis.",
        "Valuation: Pythia model MS_Valuation_Model, Nov 17, 2026; residual income + distributable capital (CET1-constrained DDM). Street avg target = average via StockAnalysis/S&P Global. Morningstar FV not yet provided.",
        "Sources: Morgan Stanley 10-K FY2025, Q3 2026 10-Q and release; SEC EDGAR; Federal Reserve stress test (SCB); StockAnalysis."],
        ["FY11-25 数据取自 SEC 10-K XBRL。净收入 = 税前利润 + 非利息费用（FY20 起另加信用损失拨备）。效率比* = 非利息费用 / 净收入。",
         "有形权益* = 股东权益 - 商誉 - 无形资产（含优先股约 $90-100 亿）。ROE*/ROTE* = 普通股净利润 / 平均权益。KPI 中 ROTCE 与每股有形账面取自分析模型（不含优先股，近似）。",
         "首行：2026年11月16日收盘 $185.57 × 15.66 亿稀释股；每股账面 = 2026年9月30日普通股权益 $1,070 亿；TTM P/E（EPS $12.63）；P/TBV 按 $53.69。FY21-25 P/E、P/B、股息率与市值*取自 StockAnalysis。",
         "估值：Pythia 模型 MS_Valuation_Model，2026年11月17日；剩余收益 + 可分配资本（受 CET1 约束的股利折现）。华尔街平均目标价取自 StockAnalysis / S&P Global。Morningstar 合理价值待补充。",
         "来源：Morgan Stanley FY2025 10-K、2026年Q3 10-Q 及业绩公告；SEC EDGAR；美联储压力测试（SCB）；StockAnalysis。"]),
    "brand_mark": "PYTHIA",
    "website": {
        "id": "ms", "name": L("Morgan Stanley", "摩根士丹利"), "exchange": "NYSE", "market": "US", "sector": "Financials", "industry": "Brokerage & Investment Banking",
        "indices": ["S&P 500", "Russell 1000"], "updated": "2026-11-17", "price_date": "2026-11-16", "currency": "USD", "moat": "",
        "summary": L("Wealth management turned a trading house into a fee business earning 20%+ on tangible equity; at 3.5x tangible book the price already assumes that lasts, and my equity value ($159.64) is 14% lower.",
                     "财富管理把一家交易型投行变成了以收费为主、有形权益回报 20% 以上的公司；股价已是有形账面的 3.5 倍，假设这种回报会持续，我的股权价值（$159.64）低 14%。"),
        "tags": [L("Wealth management", "财富管理"), L("Investment banking", "投资银行"), L("Trading", "交易"), L("Bank capital", "银行资本")],
        "business": L(
            "### Three segments\n- **Institutional Securities (47% of FY25 net revenues):** investment banking, equities and fixed-income trading; 34% pre-tax margin.\n- **Wealth Management (45%):** advice and brokerage for individuals, including E*TRADE; 29.3% margin and recurring fees.\n- **Investment Management (9%):** asset management including Eaton Vance; 21.6% margin.\n\n### Why it is valued on equity\nFor a bank, debt and deposits fund trading inventory and loans, so enterprise value and WACC are not meaningful. Value comes from returns on tangible equity above the cost of equity, and from capital that can be paid out above the CET1 requirement.\n\n### Key risks\nMarket downturns (lower fees and trading), regulatory capital changes, and competition for wealth clients.",
            "### 三大分部\n- **机构证券（占 FY25 净收入 47%）：** 投资银行、股票与固定收益交易；税前利润率 34%。\n- **财富管理（45%）：** 为个人客户提供顾问与经纪服务（含 E*TRADE）；利润率 29.3%，收入可重复。\n- **投资管理（9%）：** 资产管理（含 Eaton Vance）；利润率 21.6%。\n\n### 为什么按股权估值\n对银行来说，债务和存款是交易存货和贷款的资金来源，企业价值和 WACC 没有意义。价值来自高于股权成本的有形权益回报，以及高于 CET1 要求、可以分配的资本。\n\n### 关键风险\n市场下行（费用与交易收入下降）、监管资本要求变化，以及财富客户的竞争。"),
        "segments": [{"name": L("Institutional Securities", "机构证券"), "share": 46.8},
                     {"name": L("Wealth Management", "财富管理"), "share": 44.9},
                     {"name": L("Investment Management", "投资管理"), "share": 9.2}],
        "revenue_cagr": "7.0% (2025-30, blended)", "margin": "Pre-tax margin 31% → 32% (2030E)",
        "gap": {
            "summary": L(
                "My blended value is **$159.64**, **14% below** the price (**$185.57**) and 25% below the Street average target (**$211.50**). It averages two equity methods: residual income (**$151.14**) and distributable capital (**$168.13**), at a **10.6% cost of equity** (beta 1.22). After a strong 2026, I grow net revenues only about **4.5% a year** and hold ROTCE near 25-26%; the market price implies either faster growth or a lower discount rate. Morningstar's fair value will be added when the report is uploaded.",
                "我的混合价值为 **$159.64**，比现价（**$185.57**）低 **14%**，比华尔街平均目标价（**$211.50**）低 25%。它是两种股权估值方法的平均：剩余收益（**$151.14**）和可分配资本（**$168.13**），股权成本 **10.6%**（beta 1.22）。在 2026 年强劲增长之后，我只让净收入每年增长约 **4.5%**，ROTCE 保持在 25-26%；市场价格意味着更快的增长或更低的折现率。Morningstar 的合理价值将在上传报告后补充。"),
            "bridge": [],
            "assumptions": [
                {"item": L("Value per share", "每股价值"), "mine": "$159.64", "morningstar": "—", "sp": "$211.50", "note": L("Street = analyst average (S&P Global)", "华尔街 = 分析师平均（S&P Global）")},
                {"item": L("Cost of equity", "股权成本"), "mine": "10.6%", "morningstar": "—", "sp": "—", "note": L("rf 5.15% + 1.22 x 4.5%", "无风险利率 5.15% + 1.22 × 4.5%")},
                {"item": L("Net revenues 2026E / 2030E", "净收入 2026E / 2030E"), "mine": "$82.4B / $99.1B", "morningstar": "—", "sp": "—", "note": ""},
                {"item": L("ROTCE 2026E / 2030E", "ROTCE 2026E / 2030E"), "mine": "24.4% / 26.3%", "morningstar": "—", "sp": "—", "note": L("FY25 actual 21.6%", "FY25 实际 21.6%")},
                {"item": L("Target CET1", "目标 CET1"), "mine": "13.5% (2028+)", "morningstar": "—", "sp": "—", "note": L("Requirement 11.8%", "要求 11.8%")}]},
        "files": [{"type": "onepage", "lang": "en", "label": "One Page", "path": "reports/ms/MS_OnePage_en.pdf", "date": "2026-11-17"},
                  {"type": "onepage", "lang": "zh", "label": "One Page", "path": "reports/ms/MS_OnePage_zh.pdf", "date": "2026-11-17"}],
        "onepage_image": L("reports/ms/MS_OnePage_en.png", "reports/ms/MS_OnePage_zh.png"),
        "history": [{"date": "2026-11-17", "note": L("One Page (bank layout) with equity valuation", "One Page（银行版式）含股权估值")}]},
}
for y in (2012, 2025):
    print(y, {k: round(v, 2) for k, v in D[y].items()})
print("NI common FY12-25", round(sum(D[y]["nic"] for y in range(2012, 2026))), "div", round(sum(D[y]["div"] for y in range(2012, 2026))))
write(spec, "onepage/specs/ms_onepage.json")
