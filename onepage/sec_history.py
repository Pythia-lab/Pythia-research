"""Build a One Page working table (FY history) from an SEC XBRL companyfacts file.
Usage: python onepage/sec_history.py <companyfacts.json> <first_fy> <last_fy> <out.json> [overrides.json]
Fetch the companyfacts file first, e.g.
  curl -A "<app name> <contact>" https://data.sec.gov/api/xbrl/companyfacts/CIK0000789019.json -o msft_cf.json
Annual values come from 10-K filings (fp=FY, ~12-month duration); the latest filing wins, so restated figures are used.
Each output year has: rev op da ebitda ni ocf capex fcf acq sbc bb div sh eps intx assets eq eqt cash debt roic roe roa
(values in $M, shares in M). Missing inputs stay null and are printed so they can be filled from the model or footnoted.
`overrides.json` = {"2019": {"capex": 1234}, ...} wins over SEC values (e.g. numbers from the user's model).
"""
import json, os, sys
from datetime import date

# Foreign filers (20-F) tag the same fact in the reporting currency and a USD convenience translation.
# Keep only one currency: SEC_CCY=CNY python onepage/sec_history.py ...  (default USD)
CCY = os.environ.get("SEC_CCY", "USD")
_CCYS = {"USD", "CNY", "EUR", "GBP", "JPY", "HKD", "CAD", "CHF", "TWD", "KRW", "INR", "BRL", "AUD"}

TAGS = {
    "rev": ["Revenues", "RevenueFromContractWithCustomerExcludingAssessedTax", "SalesRevenueNet",
            "RevenueFromContractWithCustomerIncludingAssessedTax", "SalesRevenueGoodsNet", "OilAndGasRevenue"],
    "op": ["OperatingIncomeLoss"],
    "da": ["DepreciationDepletionAndAmortization", "DepreciationAmortizationAndAccretionNet", "DepreciationAndAmortization",
           "DepreciationAmortizationAndOther", "Depreciation"],
    "ni": ["NetIncomeLoss", "NetIncomeLossAvailableToCommonStockholdersBasic"],
    "ocf": ["NetCashProvidedByUsedInOperatingActivities", "NetCashProvidedByUsedInOperatingActivitiesContinuingOperations"],
    "capex": ["PaymentsToAcquirePropertyPlantAndEquipment", "PaymentsToAcquireOilAndGasPropertyAndEquipment",
              "PaymentsToAcquireProductiveAssets", "PaymentsToAcquireOilAndGasProperty"],
    "acq": ["PaymentsToAcquireBusinessesNetOfCashAcquired", "PaymentsToAcquireBusinessesGross"],
    "sbc": ["ShareBasedCompensation", "AllocatedShareBasedCompensationExpense"],
    "bb": ["PaymentsForRepurchaseOfCommonStock"],
    "div": ["PaymentsOfDividendsCommonStock", "PaymentsOfDividends", "PaymentsOfOrdinaryDividends"],
    "sh": ["WeightedAverageNumberOfDilutedSharesOutstanding"],
    "eps": ["EarningsPerShareDiluted"],
    "intx": ["InterestExpense", "InterestExpenseDebt", "InterestExpenseNonoperating"],
    "assets": ["Assets"],
    "eq": ["StockholdersEquity", "StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest"],
    "eqt": ["StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest", "StockholdersEquity"],
    "cash": ["CashAndCashEquivalentsAtCarryingValue", "CashCashEquivalentsRestrictedCashAndRestrictedCashEquivalents"],
    "sti": ["ShortTermInvestments", "MarketableSecuritiesCurrent", "AvailableForSaleSecuritiesDebtSecuritiesCurrent"],
    "debt_lt": ["LongTermDebtNoncurrent", "LongTermNotesPayable", "LongTermDebtAndCapitalLeaseObligations"],
    "debt_cur": ["LongTermDebtCurrent", "DebtCurrent", "LongTermDebtAndCapitalLeaseObligationsCurrent", "CommercialPaper"],
    "debt_tot": ["LongTermDebt", "DebtLongtermAndShorttermCombinedAmount"],
}
INSTANT = {"assets", "eq", "eqt", "cash", "sti", "debt_lt", "debt_cur", "debt_tot"}


def fy_of(end):
    y, m = int(end[:4]), int(end[5:7])
    return y - 1 if m <= 2 else y


def series(facts, tag, instant):
    out = {}
    for ns in ("us-gaap", "dei"):
        node = facts.get(ns, {}).get(tag)
        if not node:
            continue
        for unit, rows in node["units"].items():
            if unit.split("/")[0] in _CCYS and unit.split("/")[0] != CCY:
                continue
            for r in rows:
                if r.get("form") not in ("10-K", "10-K/A", "10-KT", "20-F", "20-F/A", "40-F") or r.get("fp") != "FY":
                    continue
                if not instant:
                    if "start" not in r:
                        continue
                    d = (date.fromisoformat(r["end"]) - date.fromisoformat(r["start"])).days
                    if not 350 <= d <= 380:
                        continue
                fy = fy_of(r["end"])
                # the filing's own fiscal year must cover this end date (skip prior-year comparatives only if a newer filing exists)
                prev = out.get(fy)
                if prev is None or r["filed"] > prev[1]:
                    out[fy] = (r["val"], r["filed"])
    return {k: v[0] for k, v in out.items()}


def pick(facts, key, years):
    res = {}
    for tag in TAGS[key]:
        s = series(facts, tag, key in INSTANT)
        for y in years:
            if res.get(y) is None and s.get(y) is not None and not (key == "rev" and s[y] == 0):
                res[y] = s[y]
    return res


def main():
    cf, y0, y1, out = sys.argv[1], int(sys.argv[2]), int(sys.argv[3]), sys.argv[4]
    ov = json.load(open(sys.argv[5])) if len(sys.argv) > 5 else {}
    facts = json.load(open(cf))["facts"]
    years = list(range(y0, y1 + 1))
    raw = {k: pick(facts, k, years) for k in TAGS}
    M = lambda v: None if v is None else v / 1e6
    D = {}
    for y in years:
        g = lambda k: raw[k].get(y)
        d = {k: M(g(k)) for k in ("rev", "op", "da", "ni", "ocf", "capex", "acq", "sbc", "bb", "div", "intx", "assets", "eq", "eqt")}
        d["sh"] = M(g("sh")); d["eps"] = g("eps")
        d["cash"] = None if g("cash") is None else M(g("cash") + (g("sti") or 0))
        if g("debt_tot") is not None:
            d["debt"] = M(g("debt_tot"))
        elif g("debt_lt") is not None:
            d["debt"] = M(g("debt_lt") + (g("debt_cur") or 0))
        else:
            d["debt"] = None
        for k in ("acq", "bb"):
            d[k] = d[k] or 0.0
        d.update({k: v for k, v in ov.get(str(y), {}).items()})
        D[y] = d
    for y, d in D.items():
        d["ebitda"] = d["op"] + d["da"] if d["op"] is not None and d["da"] is not None else None
        d["fcf"] = d["ocf"] - d["capex"] if d["ocf"] is not None and d["capex"] is not None else None
        ic = (d["eqt"] or 0) + (d["debt"] or 0) - (d["cash"] or 0)
        d["roic"] = d["op"] * 0.79 / ic * 100 if d["op"] is not None and ic > 0 else None
        d["roe"] = d["ni"] / d["eq"] * 100 if d["ni"] is not None and d["eq"] else None
        d["roa"] = d["ni"] / d["assets"] * 100 if d["ni"] is not None and d["assets"] else None
    miss = {y: [k for k, v in d.items() if v is None] for y, d in D.items()}
    for y, m in miss.items():
        if m:
            print(y, "missing:", ", ".join(m))
    json.dump(D, open(out, "w"), indent=1)
    print("wrote", out)


if __name__ == "__main__":
    main()
