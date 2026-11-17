"""Shared One Page spec pieces built from a working table (sec_history.py output).
Company scripts (build_<id>_spec.py) supply the prose; this module builds the numeric blocks the same way every time.
"""
import json

L = lambda en, zh: {"en": en, "zh": zh}


def load(path):
    return {int(k): v for k, v in json.load(open(path)).items()}


def grid(D, Y, valuation=None, first_metric=None):
    """The standard 6-group VALUE CREATION grid. valuation = {"pe": [...], "fcfy": [...], "divy": [...]} aligned to Y
    (None where not available). first_metric overrides the margin row (default EBITDA margin)."""
    col = lambda f: [f(D[y], y) for y in Y]
    r = lambda k: col(lambda d, y: d[k])
    nz = lambda k: col(lambda d, y: d[k] if d[k] else None)
    pct = lambda a, b: col(lambda d, y: (d[a] / d[b] * 100 if d[b] > 0 else "NM") if d[a] is not None and d[b] else None)
    prev = lambda y: D.get(y - 1)
    yoy = col(lambda d, y: (d["rev"] / prev(y)["rev"] - 1) * 100 if prev(y) and prev(y)["rev"] else None)
    roe = col(lambda d, y: "NM*" if not d["eq"] or d["eq"] <= 0 or d["eq"] / d["assets"] < 0.08 else d["ni"] / d["eq"] * 100)
    roic = col(lambda d, y: d["roic"] if d["roic"] is not None else "NM*")
    per = lambda k: col(lambda d, y: d[k] / d["sh"] if d[k] is not None and d.get("sh") else None)
    ratio = lambda a, b: col(lambda d, y: d[a] / d[b] if d[a] is not None and d[b] and d[b] > 0 else "NM")
    v = valuation or {}
    n = len(Y)
    pad = lambda xs: xs if xs else [None] * n
    return [
        [{"key": "revenue", "values": r("rev")},
         {"key": "rev_yoy", "values": yoy},
         first_metric or {"key": "gross_margin", "metric": L("EBITDA Margin*", "EBITDA率*"), "values": pct("ebitda", "rev")},
         {"key": "op_income", "values": r("op")},
         {"key": "op_margin", "values": pct("op", "rev")},
         {"key": "net_income", "values": r("ni")},
         {"key": "net_margin", "values": pct("ni", "rev")}],
        [{"key": "ocf", "values": r("ocf")},
         {"key": "ocf_margin", "values": pct("ocf", "rev")},
         {"key": "ocf_ni", "fmt": "x", "values": ratio("ocf", "ni")},
         {"key": "capex", "values": r("capex")},
         {"key": "capex_ocf", "values": pct("capex", "ocf")},
         {"key": "fcf", "values": r("fcf")},
         {"key": "fcf_margin", "values": pct("fcf", "rev")}],
        [{"key": "acq", "metric": L("Acquisitions", "收购支出"), "values": nz("acq") if any(D[y]["acq"] is not None for y in Y) else [None] * n},
         {"key": "acq_ocf", "metric": L("Acquisitions / OCF", "收购/OCF"), "values": col(lambda d, y: (d["acq"] / d["ocf"] * 100 if d["ocf"] > 0 else "NM") if d["acq"] else None)},
         {"key": "sbc", "values": r("sbc")},
         {"key": "sbc_ocf", "values": pct("sbc", "ocf")},
         {"key": "buybacks", "values": nz("bb")},
         {"key": "buybacks_ocf", "values": pct("bb", "ocf")},
         {"key": "dividends", "values": r("div")},
         {"key": "dividends_ocf", "values": pct("div", "ocf")}],
        [{"key": "roic", "metric": "ROIC*", "values": roic},
         {"key": "roe", "metric": "ROE*", "values": roe},
         {"key": "roa", "values": r("roa")}],
        [{"key": "shares", "values": r("sh")},
         {"key": "rev_ps", "values": per("rev")},
         {"key": "eps", "values": r("eps")},
         {"key": "ocf_ps", "values": per("ocf")},
         {"key": "capex_ps", "values": per("capex")},
         {"key": "fcf_ps", "values": per("fcf")},
         {"key": "div_ps", "metric": L("Dividend / Sh.*", "每股股息*"), "values": per("div")}],
        [{"key": "avg_pe", "metric": L("P/E (FY-end)*", "年末P/E*"), "values": pad(v.get("pe"))},
         {"key": "fcf_yield", "metric": L("FCF Yield*", "FCF收益率*"), "values": pad(v.get("fcfy"))},
         {"key": "div_yield", "metric": L("Dividend Yield*", "股息率*"), "values": pad(v.get("divy"))}],
    ]


def _cagr(f, last, n):
    try:
        a, b = f(last - n), f(last)
    except (TypeError, ZeroDivisionError, KeyError):
        return "NM"
    if a is None or b is None:
        return "--"
    if a <= 0 or b <= 0:
        return "NM"
    s = f"{((b / a) ** (1 / n) - 1) * 100:.1f}%"
    return s.replace("0.", ".", 1) if s.startswith(("0.", "-0.")) else s


def cagr_block(D, last, spans=(1, 3, 5, 10, 14)):
    spans = [n for n in spans if last - n in D]
    ps = lambda k: (lambda y: D[y][k] / D[y]["sh"] if D[y][k] is not None and D[y].get("sh") else None)
    rows = [(L("Revenue", "营收"), lambda y: D[y]["rev"]), (L("Op. Income", "营业利润"), lambda y: D[y]["op"]),
            (L("OCF", "OCF"), lambda y: D[y]["ocf"]), (L("Capex", "资本开支"), lambda y: D[y]["capex"]),
            (L("Diluted EPS", "稀释EPS"), lambda y: D[y]["eps"]), (L("FCF / Sh.", "每股FCF"), ps("fcf")),
            (L("Div. / Sh.", "每股股息"), ps("div"))]
    return {"title": L("COMPOUND ANNUAL GROWTH RATE", "复合年增长率 | CAGR"),
            "columns": [""] + [f"{n}Y" for n in spans],
            "rows": [[lab] + [_cagr(f, last, n) for n in spans] for lab, f in rows]}


def fin_position(D, years, mktcap, unit="B"):
    B = 1000.0 if unit == "B" else 1.0
    f = lambda g: [f"{g(D[y]) / B:.1f}" if g(D[y]) is not None else "--" for y in years]
    return {"title": L(f"FINANCIAL POSITION | ${unit}", f"财务状况 | ${unit}"),
            "columns": [""] + [f"FY{str(y)[-2:]}" for y in years],
            "rows": [[L("Tot. assets", "总资产")] + f(lambda d: d["assets"]),
                     [L("Tot. liabilities", "总负债")] + f(lambda d: d["assets"] - d["eqt"]),
                     [L("Total debt", "总债务")] + f(lambda d: d["debt"]),
                     [L("Mkt cap*", "市值*")] + [f"{m / B:.1f}" if m else "--" for m in mktcap],
                     [L("Cash + ST", "现金及短投")] + f(lambda d: d["cash"]),
                     [L("Liab./assets", "负债/资产")] + [f"{(D[y]['assets'] - D[y]['eqt']) / D[y]['assets'] * 100:.1f}%" for y in years]]}


def chart(D, Y, last_price, **kw):
    Y = [y for y in Y if D[y].get("sh")]
    ocf = [D[y]["ocf"] / D[y]["sh"] for y in Y]
    fcf = [D[y]["fcf"] / D[y]["sh"] for y in Y]
    sgn = lambda v: f"-${-v:.2f}" if v < 0 else f"${v:.2f}"
    c = {"x_labels": [str(y)[-2:] for y in Y], "ocf_ps": ocf, "fcf_ps": fcf, "last_price": last_price, "log": True,
         "legend": L([f"OCF / sh {sgn(ocf[-1])}", f"FCF / sh {sgn(fcf[-1])}"], [f"OCF /股 {sgn(ocf[-1])}", f"FCF /股 {sgn(fcf[-1])}"])}
    c.update(kw)
    return c


def totals(D, ys):
    s = lambda k: sum((D[y][k] or 0) for y in ys)
    return {k: s(k) for k in ("ocf", "capex", "fcf", "bb", "div", "acq", "sbc")}


def write(spec, path):
    json.dump(spec, open(path, "w"), ensure_ascii=False, indent=1)
    print("wrote", path)
