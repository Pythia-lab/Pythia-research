/* Site logic · 网站逻辑。一般不需要修改；内容请改 data/ 下的文件。 */
(function () {
  "use strict";
  var SITE = window.SITE || {}, TAX = window.TAXONOMY || [], INDICES = window.INDICES || [], MARKETS = window.MARKETS || {};
  var ALL = (window.COMPANIES || []).slice();
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var app = $("#app");

  /* ---------- language ---------- */
  var LANG = "en";
  try { LANG = localStorage.getItem("pythia-lang") || SITE.defaultLang || "en"; } catch (e) { LANG = SITE.defaultLang || "en"; }
  if (LANG !== "zh") LANG = "en";
  function T(v) {
    if (v == null) return "";
    if (typeof v === "object" && !Array.isArray(v)) { var x = v[LANG]; return x != null && x !== "" ? x : (v.en || v.zh || ""); }
    return v;
  }
  var UI = {
    en: {
      companies: "Companies", onepage: "One Page", about: "About", search: "Search company or ticker…",
      eyebrowHome: "Company Research Library", browseDir: "Browse sectors ↓", viewAll: "All companies ↓",
      nCompanies: "Companies covered", nIndustries: "Industries", nFiles: "Report files", lastUpdate: "Last updated",
      sectorDir: "Sector Directory", sectorDirT: "Sectors", allCo: "All Companies", allCoT: "All companies", unitCo: "",
      searchList: "Search company, ticker, industry or tag", allSectors: "All sectors", allInd: "All industries", allMkts: "All markets",
      sortUpd: "Recently updated", sortUp: "Upside", sortName: "Name", sortInd: "By industry", reset: "Clear filters", allIdx: "All indices",
      thCo: "Company", thInd: "Industry", thTk: "Ticker · Market", thIdx: "Indices", thPx: "Price", thUp: "Upside", thUpd: "Updated", thFiles: "Reports",
      count: function (n, t) { return n + " companies" + (n !== t ? " (of " + t + ")" : ""); }, none: "No companies match these filters.",
      example: "Example", exBanner: "Example company — the numbers only demonstrate the layout. Replace it with your own analysis in data/companies.js, then delete it.",
      under: "Undervalued", fair: "Fairly valued", over: "Overvalued", updatedOn: "Updated ", asOf: "As of ",
      price: "Price", impliedUp: "Implied upside", mineVsPx: "My FV / price", waccG: "WACC / terminal g", vsIt: "Mine vs theirs ", moat: "Moat: ",
      secSummary: "Conclusion", secFV: "Fair value comparison", secGap: "Gap analysis", secBiz: "Business", secDcf: "DCF summary", secFiles: "Report files", secHist: "History",
      subFV: "Price and three fair values on one scale; the shaded band is my bear-to-bull range.",
      gapTitle: "Why my valuation differs", subGap: function (m) { return "Starting from " + m + "'s fair value, step by step to mine."; }, subGapCmp: "My assumptions next to the outside view.",
      fvAria: "Fair value comparison", needFV: "Add a price and at least one fair value to show the chart.", range: "My bear – bull range",
      other: "Other / unexplained", axisFrom: function (v) { return "Axis starts at " + v + " to make the differences visible."; },
      brHow: "How to read: start from Morningstar's fair value, apply each step in order — red lowers the value, green raises it — and you arrive at my fair value. The right-hand column is the running value after each step.", brStart: "Start", brEnd: "Result", brStep: "Step", brChange: "Change", brRunning: "Running value", brTitle: "Bridge: Morningstar → my fair value",
      thAssump: "Key assumption", thNote: "Comment", noGap: "Gap analysis not filled in yet.",
      revMix: "Revenue mix", horizon: "Forecast horizon ", tg: "Terminal growth", cagr: "Revenue CAGR", margin: "Margin assumption",
      prob: "Probability ", pw: "Probability-weighted", vsPx: " vs price", noDcf: "DCF summary not filled in yet.",
      subFiles: "Original One Page, DCF model and other analysis files.", notUp: "Not uploaded yet", noFiles: "No files yet.", noHist: "No history yet.",
      file: "File",
      howIAnalyse: "How I analyse a company", eduT: "Education", expT: "Experience", langT: "Languages", contact: "Contact", skills: "Skills", coverage: "Coverage",
      covText: function (n) { return n + (n === 1 ? " company" : " companies") + " analysed. "; }, seeAll: "See all →",
      addCo: "Add a company", allCompaniesLink: "All companies", disclaimer: "Personal research for learning purposes only. Not investment advice.",
      opBrowse: "Browse One Pages ↓", opLatest: "Latest One Page", opView: "View One Page →", opPdf: "Download PDF ↓", zoom: "Click to enlarge", close: "Close", opCompany: "Full analysis →",
      opHow: "How to read a One Page", opHowLede: "A One Page starts with the business, not the share price: how it operates, how it earns, how it turns profit into cash, where that cash goes — and only then, what the market pays for it.",
      opHowSub: "Business first, market last",
      flow: [["Business", "Customers & revenue"], ["Profit", "Margins"], ["Cash", "OCF / FCF"], ["Reinvest", "Capex / M&A"], ["Allocate", "Buybacks / dividends"], ["Returns", "ROIC"], ["Per share", "Value per share"], ["Market", "Price & valuation"]],
      opFind: "Find a company, or start from a sector", opNew: "Latest", opBySec: "By sector", opSearch: "Search One Pages…", opNone: "No One Page yet. Add a file with type \"onepage\" to any company and it appears here.",
      opPh: "Add a PNG preview (onepageImage)", opBack: "← All One Pages", total: "One Pages",
      genTitle: "Copy into data/companies.js", genHint: "Paste right after <b>window.COMPANIES = [</b>. Keep the trailing comma if other companies follow.",
      copy: "Copy code", copied: "Copied", selected: "Selected — press Ctrl/⌘ + C",
      basics: "Basics", valuation: "Valuation", texts: "Text (fill English, Chinese, or both)", files: "Files (put them in reports/<id>/)",
      verdictLbl: { under: "Undervalued", fair: "Fairly valued", over: "Overvalued" }
    },
    zh: {
      companies: "公司", onepage: "One Page", about: "关于我", search: "搜索公司或 Ticker…",
      eyebrowHome: "Company Research Library", browseDir: "浏览行业目录 ↓", viewAll: "查看全部公司 ↓",
      nCompanies: "覆盖公司", nIndustries: "细分行业", nFiles: "报告文件", lastUpdate: "最近更新",
      sectorDir: "Sector Directory", sectorDirT: "行业目录", allCo: "All Companies", allCoT: "全部公司", unitCo: " 家",
      searchList: "搜索公司、Ticker、行业或标签", allSectors: "全部大类", allInd: "全部细分行业", allMkts: "全部市场",
      sortUpd: "最近更新", sortUp: "上涨空间", sortName: "公司名称", sortInd: "按行业", reset: "清除筛选", allIdx: "全部指数",
      thCo: "公司", thInd: "行业", thTk: "Ticker · 市场", thIdx: "指数", thPx: "现价", thUp: "空间", thUpd: "更新", thFiles: "报告",
      count: function (n, t) { return "共 " + n + " 家" + (n !== t ? "（全部 " + t + " 家）" : ""); }, none: "没有符合条件的公司。",
      example: "示例", exBanner: "这是示例公司，数字仅用于演示版式。在 data/companies.js 中替换为你自己的分析后删除此条。",
      under: "低估", fair: "合理", over: "高估", updatedOn: "更新于 ", asOf: "截至 ",
      price: "现价", impliedUp: "隐含空间", mineVsPx: "我的 FV / 现价", waccG: "WACC / 永续增长", vsIt: "我的 vs 它 ", moat: "护城河：",
      secSummary: "结论", secFV: "Fair Value 对比", secGap: "差距拆解", secBiz: "公司业务", secDcf: "DCF 摘要", secFiles: "报告文件", secHist: "更新记录",
      subFV: "现价与三方估值在同一刻度上；阴影区间是我的悲观到乐观情景。",
      gapTitle: "我的估值为什么不同", subGap: function (m) { return "从 " + m + " 的 Fair Value 出发，逐项走到我的 Fair Value。"; }, subGapCmp: "我的假设与外部观点逐项对照。",
      fvAria: "Fair Value 对比", needFV: "填写现价和至少一个 Fair Value 后显示对比图。", range: "我的悲观 – 乐观区间",
      other: "其他 / 未归因", axisFrom: function (v) { return "横轴从 " + v + " 起，以便看清各项差异。"; },
      brHow: "怎么看：从 Morningstar 的合理价值出发，按顺序加上每一步——红色代表让价值变低，绿色代表让价值变高——最后得到我的合理价值。最右一列是每一步之后的累计价值。", brStart: "起点", brEnd: "结果", brStep: "第", brChange: "变动", brRunning: "累计价值", brTitle: "从 Morningstar 走到我的估值",
      thAssump: "关键假设", thNote: "说明", noGap: "尚未填写差距分析。",
      revMix: "收入结构", horizon: "预测期 ", tg: "永续增长率", cagr: "收入 CAGR", margin: "利润率假设",
      prob: "概率 ", pw: "概率加权", vsPx: " vs 现价", noDcf: "尚未填写 DCF 摘要。",
      subFiles: "One Page、DCF 模型和其他分析的原始文件。", notUp: "尚未上传", noFiles: "暂无文件。", noHist: "暂无记录。",
      file: "文件",
      howIAnalyse: "我怎么分析一家公司", eduT: "教育背景", expT: "经历", langT: "语言", contact: "联系方式", skills: "技能", coverage: "覆盖情况",
      covText: function (n) { return "已完成 " + n + " 家公司分析，"; }, seeAll: "查看全部 →",
      addCo: "生成新公司条目", allCompaniesLink: "全部公司", disclaimer: "所有内容仅为个人学习与研究，不构成投资建议。",
      opBrowse: "浏览全部 One Page ↓", opLatest: "最新 One Page", opView: "查看 One Page →", opPdf: "下载 PDF ↓", zoom: "点击放大", close: "关闭", opCompany: "完整分析 →",
      opHow: "One Page 怎么看", opHowLede: "One Page 不从股价开始，而是沿着生意往下看：公司怎么经营、怎么赚钱、怎么产生现金，赚到的钱又去了哪里，最后才看市场愿意付多少钱。",
      opHowSub: "先看生意，再看市场",
      flow: [["经营", "客户与收入"], ["利润", "盈利能力"], ["现金", "OCF / FCF"], ["再投资", "Capex / 并购"], ["资本配置", "回购 / 股息"], ["资本效率", "ROIC"], ["每股价值", "长期传导"], ["市场", "价格与估值"]],
      opFind: "找一家公司，或者从一个行业开始", opNew: "最新发布", opBySec: "按行业浏览", opSearch: "搜索 One Page…", opNone: "还没有 One Page。给任意公司加上 type 为 \"onepage\" 的文件，它就会自动出现在这里。",
      opPh: "添加 PNG 预览图（onepageImage）", opBack: "← 全部 One Page", total: "份 One Page",
      genTitle: "复制到 data/companies.js", genHint: "粘贴到 <b>window.COMPANIES = [</b> 的下一行；如果下面还有其他公司，末尾的逗号保留即可。",
      copy: "复制代码", copied: "已复制", selected: "已选中，按 Ctrl/⌘ + C 复制",
      basics: "基本信息", valuation: "估值", texts: "文字内容（中英文填一种或都填）", files: "文件（放到 reports/网址id/ 文件夹里）"
    }
  };
  function u(k) { var v = UI[LANG][k]; return v != null ? v : UI.en[k]; }

  /* ---------- lookups ---------- */
  var secMap = {}, indMap = {}, idxMap = {};
  TAX.forEach(function (s) {
    secMap[s.zh] = secMap[s.en] = s;
    s.industries.forEach(function (i) { var o = { zh: i[0], en: i[1], sector: s }; indMap[i[0]] = indMap[i[1]] = o; });
  });
  INDICES.forEach(function (i) { var o = { en: i[0], zh: i[1] }; idxMap[i[0]] = idxMap[i[1]] = o; });
  var mktAlias = { "美国": "US", "中国A股": "CN", "中国 A 股": "CN", "A股": "CN", "港股": "HK", "香港": "HK", "其他": "Other" };
  var moatMap = { "宽": "Wide", "窄": "Narrow", "无": "None" }, moatZh = { Wide: "宽", Narrow: "窄", None: "无" };

  // normalise each company once: canonical keys for sector / industry / indices / market
  ALL.forEach(function (c) {
    var ind = indMap[c.industry];
    c._sec = ind ? ind.sector : secMap[c.sector] || { zh: c.sector || "—", en: c.sector || "—", industries: [] };
    c._ind = ind || { zh: c.industry || "—", en: c.industry || "—", sector: c._sec };
    c._idx = (c.indices || []).map(function (i) { return idxMap[i] || { en: i, zh: i }; });
    c._mkt = MARKETS[c.market] ? c.market : mktAlias[c.market] || c.market || "";
  });
  function secName(s) { return s ? s[LANG] || s.en : ""; }
  function mktName(code) { var m = MARKETS[code]; return m ? (LANG === "zh" ? m[1] : m[0]) : code; }
  function idxName(o) { return o[LANG] || o.en; }
  function moatName(m) { var en = moatMap[m] || m; return LANG === "zh" ? moatZh[en] || m : en; }
  function cname(c) { return T(c.name); }
  function cnameAlt(c) { var n = c.name; if (n && typeof n === "object") return LANG === "zh" ? n.en || "" : (n.zh || ""); return c.nameEn || ""; }

  /* ---------- helpers ---------- */
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function E(v) { return esc(T(v)); }
  function isNum(v) { return typeof v === "number" && isFinite(v) && v !== 0; }
  function cur(c) { return { USD: "$", CNY: "¥", RMB: "¥", HKD: "HK$", EUR: "€", GBP: "£", JPY: "¥" }[c && c.toUpperCase()] || ""; }
  function money(v, c, d) { if (!isNum(v)) return "—"; var dd = d == null ? (Math.abs(v) < 100 ? 2 : 0) : d; return (v < 0 ? "−" : "") + cur(c) + Math.abs(v).toLocaleString("en-US", { minimumFractionDigits: dd, maximumFractionDigits: dd }); }
  function pct(v) { return v == null || !isFinite(v) ? "—" : (v > 0 ? "+" : v < 0 ? "−" : "") + Math.abs(v * 100).toFixed(1) + "%"; }
  function fv(c) { return c.fairValue || {}; }
  function upside(c) { var m = fv(c).mine; return isNum(m) && isNum(c.price) ? m / c.price - 1 : null; }
  function verdict(c) {
    var x = upside(c), t = SITE.verdict || { under: .15, over: -.1 };
    if (x == null) return null;
    return x >= t.under ? { k: "under", t: u("under") } : x <= t.over ? { k: "over", t: u("over") } : { k: "fair", t: u("fair") };
  }
  // CUR = company being rendered; its own "labels" (e.g. sp: "Street avg target") override the site-wide names
  var CUR = null;
  function L(k) { var o = CUR && CUR.labels && T(CUR.labels[k]); if (o) return o; var l = SITE.labels || {}; return T(l[k]) || { mine: u("thCo"), morningstar: "Morningstar", sp: "S&P" }[k]; }
  function LFV(k) { return CUR && CUR.labels && CUR.labels[k] ? L(k) : L(k) + " FV"; }
  function fileKind(p) {
    var e = (String(p || "").split(".").pop() || "").toLowerCase();
    return { pdf: "PDF", xlsx: "XLS", xls: "XLS", xlsm: "XLS", csv: "CSV", docx: "DOC", doc: "DOC", pptx: "PPT", png: "IMG", jpg: "IMG", jpeg: "IMG", webp: "IMG", md: "TXT", html: "WEB" }[e] || "FILE";
  }
  function typeKind(t) { return { onepage: "1P", dcf: "DCF", business: "BIZ", gap: "FV", other: "DOC" }[t] || "DOC"; }
  function scenName(n) {
    var s = T(n), z = { Bear: "悲观", Base: "基准", Bull: "乐观" }, e = { "悲观": "Bear", "基准": "Base", "乐观": "Bull" };
    return LANG === "zh" ? z[s] || s : e[s] || s;
  }

  function md(src) {
    src = T(src); if (!src) return "";
    var out = [], list = null, para = [];
    function inline(s) { return esc(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"); }
    function flushP() { if (para.length) { out.push("<p>" + inline(para.join(LANG === "zh" ? "" : " ")) + "</p>"); para = []; } }
    function flushL() { if (list) { out.push("<ul>" + list.map(function (x) { return "<li>" + inline(x) + "</li>"; }).join("") + "</ul>"); list = null; } }
    String(src).split(/\r?\n/).forEach(function (raw) {
      var line = raw.trim();
      if (!line) { flushP(); flushL(); return; }
      var h = line.match(/^#{1,4}\s+(.*)/);
      if (h) { flushP(); flushL(); out.push("<h3>" + inline(h[1]) + "</h3>"); return; }
      var li = line.match(/^[-*•]\s+(.*)/);
      if (li) { flushP(); (list = list || []).push(li[1]); return; }
      flushL(); para.push(line);
    });
    flushP(); flushL();
    return out.join("");
  }

  /* ---------- chrome (header / footer) ---------- */
  function renderChrome(active) {
    var brand = '<span class="brand-mark">' + esc((SITE.brand || "P").trim().charAt(0)) + '</span><span><b>' + esc(SITE.brand || "") + "</b><small>" + E(SITE.brandSub) + "</small></span>";
    $("#hdr").innerHTML = '<div class="wrap nav"><a class="brand" href="#">' + brand + "</a>" +
      '<nav class="menu">' +
      '<a href="#" class="' + (active === "home" ? "active" : "") + '">' + u("companies") + "</a>" +
      '<a href="#onepage" class="op-nav ' + (active === "onepage" ? "active" : "") + '">' + u("onepage") + "</a>" +
      '<a href="#about" class="' + (active === "about" ? "active" : "") + '">' + u("about") + "</a></nav>" +
      '<input class="top-search" id="top-q" type="search" placeholder="' + esc(u("search")) + '" aria-label="' + esc(u("search")) + '">' +
      '<div class="lang" role="group" aria-label="Language"><button data-lang="en" class="' + (LANG === "en" ? "on" : "") + '">EN</button><button data-lang="zh" class="' + (LANG === "zh" ? "on" : "") + '">中文</button></div></div>';
    $("#ftr").innerHTML = '<div class="wrap foot"><div><a class="brand" href="#">' + brand + "</a><p>" + esc(u("disclaimer")) + " © " + new Date().getFullYear() + "</p></div>" +
      '<nav><a href="#">' + u("allCompaniesLink") + '</a><a href="#onepage">One Page</a><a href="#about">' + u("about") + '</a><a href="#add">' + u("addCo") + "</a></nav>" +
      '<div class="motto">' + E(SITE.footerMotto) + "</div></div>";
    document.documentElement.lang = LANG === "zh" ? "zh-CN" : "en";
  }

  /* ---------- home ---------- */
  var st = { q: "", sector: "", industry: "", index: "", market: "", sort: "updated", dir: -1, page: 1 };

  function hay(c) {
    var n = c.name;
    return [typeof n === "object" ? (n.en || "") + " " + (n.zh || "") : n, c.nameEn, c.ticker, c._sec.en, c._sec.zh, c._ind.en, c._ind.zh,
      (c.tags || []).map(function (t) { return typeof t === "object" ? t.en + " " + t.zh : t; }).join(" "),
      c._idx.map(function (i) { return i.en + " " + i.zh; }).join(" ")].join(" ").toLowerCase();
  }
  function filtered() {
    var q = st.q.trim().toLowerCase();
    var list = ALL.filter(function (c) {
      if (st.sector && c._sec.en !== st.sector) return false;
      if (st.industry && c._ind.en !== st.industry) return false;
      if (st.market && c._mkt !== st.market) return false;
      if (st.index && !c._idx.some(function (i) { return i.en === st.index; })) return false;
      return !q || hay(c).indexOf(q) >= 0;
    });
    var k = st.sort, d = st.dir;
    list.sort(function (a, b) {
      if (k === "name") return d * cname(a).localeCompare(cname(b), LANG === "zh" ? "zh" : "en");
      if (k === "industry") return d * (secName(a._sec) + secName(a._ind)).localeCompare(secName(b._sec) + secName(b._ind), LANG === "zh" ? "zh" : "en");
      if (k === "upside") { var x = upside(a), y = upside(b); return d * ((x == null ? -9 : x) - (y == null ? -9 : y)); }
      return d * String(a.updated || "").localeCompare(String(b.updated || ""));
    });
    return list;
  }

  function viewHome() {
    var nFiles = ALL.reduce(function (a, c) { return a + (c.files || []).filter(function (f) { return f.path; }).length; }, 0);
    var nInd = {}; ALL.forEach(function (c) { nInd[c._ind.en] = 1; });
    var last = ALL.map(function (c) { return c.updated || ""; }).sort().pop() || "—";
    var mkts = []; ALL.forEach(function (c) { if (c._mkt && mkts.indexOf(c._mkt) < 0) mkts.push(c._mkt); });
    var sid = function (s) { return "sec-" + s.en.replace(/\W+/g, "-").toLowerCase(); };

    var h = '<section class="hero"><div class="wrap hero-grid"><div>' +
      '<p class="eyebrow">' + u("eyebrowHome") + "</p><h1>" + E(SITE.heroTitle) + "</h1><p>" + E(SITE.heroText) + "</p>" +
      '<div class="btns"><button class="btn" data-scroll="dir">' + u("browseDir") + '</button><button class="btn" data-scroll="list">' + u("viewAll") + "</button></div>" +
      '</div><div class="stats">' +
      '<div class="stat"><b>' + ALL.length + "</b><span>" + u("nCompanies") + "</span></div>" +
      '<div class="stat"><b>' + Object.keys(nInd).length + "</b><span>" + u("nIndustries") + "</span></div>" +
      '<div class="stat"><b>' + nFiles + "</b><span>" + u("nFiles") + "</span></div>" +
      '<div class="stat"><b style="font-size:20px;padding-top:8px">' + esc(last) + "</b><span>" + u("lastUpdate") + "</span></div></div></div></section>";

    h += '<section class="section" id="dir"><div class="wrap"><p class="eyebrow">' + u("sectorDir") + "</p><h2>" + u("sectorDirT") + "</h2>" +
      '<div class="sector-tabs">' + TAX.map(function (s) {
        var n = ALL.filter(function (c) { return c._sec === s; }).length;
        return '<button data-jump="' + sid(s) + '">' + esc(secName(s)) + (n ? '<span class="n">' + n + "</span>" : "") + "</button>";
      }).join("") + '</div><div class="sector-grid">' + TAX.map(function (s) {
        var n = ALL.filter(function (c) { return c._sec === s; }).length;
        return '<div class="sector-card" id="' + sid(s) + '"><h3>' + esc(secName(s)) + '<span class="n">' + n + u("unitCo") + '</span></h3><div class="en">' + esc(LANG === "zh" ? s.en : s.zh) + "</div>" +
          '<div class="ind-list">' + s.industries.map(function (i) {
            var k = ALL.filter(function (c) { return c._ind.en === i[1]; }).length, nm = LANG === "zh" ? i[0] : i[1];
            return k ? '<button class="has" data-ind="' + esc(i[1]) + '" data-sec="' + esc(s.en) + '">' + esc(nm) + '<span class="n">' + k + "</span></button>"
                     : '<button tabindex="-1" aria-disabled="true">' + esc(nm) + "</button>";
          }).join("") + "</div></div>";
      }).join("") + "</div></div></section>";

    h += '<section class="section" id="list" style="border-bottom:0"><div class="wrap"><p class="eyebrow">' + u("allCo") + "</p><h2>" + u("allCoT") + "</h2>" +
      '<div class="filters"><input id="f-q" type="search" placeholder="' + esc(u("searchList")) + '" value="' + esc(st.q) + '">' +
      '<select id="f-sector"><option value="">' + u("allSectors") + "</option>" + TAX.map(function (s) { return '<option value="' + esc(s.en) + '"' + (st.sector === s.en ? " selected" : "") + ">" + esc(secName(s)) + "</option>"; }).join("") + "</select>" +
      '<select id="f-ind"><option value="">' + u("allInd") + "</option>" + industryOptions() + "</select>" +
      '<select id="f-market"><option value="">' + u("allMkts") + "</option>" + mkts.map(function (m) { return '<option value="' + esc(m) + '"' + (st.market === m ? " selected" : "") + ">" + esc(mktName(m)) + "</option>"; }).join("") + "</select>" +
      '<select id="f-sort"><option value="updated">' + u("sortUpd") + '</option><option value="upside">' + u("sortUp") + '</option><option value="name">' + u("sortName") + '</option><option value="industry">' + u("sortInd") + "</option></select>" +
      '<button class="reset" id="f-reset">' + u("reset") + "</button></div>" +
      '<div class="index-chips"><button data-idx="" class="' + (st.index ? "" : "on") + '">' + u("allIdx") + "</button>" + INDICES.map(function (i) {
        var n = ALL.filter(function (c) { return c._idx.some(function (x) { return x.en === i[0]; }); }).length;
        return '<button data-idx="' + esc(i[0]) + '" class="' + (st.index === i[0] ? "on" : "") + '">' + esc(LANG === "zh" ? i[1] : i[0]) + (n ? " · " + n : "") + "</button>";
      }).join("") + "</div>" +
      '<div class="result-meta" id="meta"></div><div class="table-wrap"><table class="co"><thead><tr>' +
      '<th data-sort="name">' + u("thCo") + '</th><th data-sort="industry">' + u("thInd") + "</th><th>" + u("thTk") + "</th><th>" + u("thIdx") + "</th>" +
      '<th class="r">' + u("thPx") + '</th><th class="r">' + esc(L("mine")) + '</th><th class="r" data-sort="upside">' + u("thUp") + '</th><th data-sort="updated">' + u("thUpd") + "</th><th>" + u("thFiles") + "</th><th></th>" +
      '</tr></thead><tbody id="rows"></tbody></table></div><div class="pager" id="pager"></div></div></section>';
    app.innerHTML = h;
    $("#f-sort").value = st.sort;
    renderRows();
  }
  function industryOptions() {
    var used = {}; ALL.forEach(function (c) { used[c._ind.en] = 1; });
    return TAX.filter(function (s) { return !st.sector || s.en === st.sector; }).map(function (s) {
      var o = s.industries.filter(function (i) { return used[i[1]]; });
      return o.length ? '<optgroup label="' + esc(secName(s)) + '">' + o.map(function (i) { return '<option value="' + esc(i[1]) + '"' + (st.industry === i[1] ? " selected" : "") + ">" + esc(LANG === "zh" ? i[0] : i[1]) + "</option>"; }).join("") + "</optgroup>" : "";
    }).join("");
  }
  function renderRows() {
    var list = filtered(), size = SITE.pageSize || 12, pages = Math.max(1, Math.ceil(list.length / size));
    if (st.page > pages) st.page = pages;
    var slice = list.slice((st.page - 1) * size, st.page * size);
    $("#meta").textContent = u("count")(list.length, ALL.length);
    $("#rows").innerHTML = slice.length ? slice.map(function (c) {
      var x = upside(c);
      return '<tr data-go="' + esc(c.id) + '" tabindex="0">' +
        '<td class="co-name"><b>' + esc(cname(c)) + '</b><div class="sub2">' + (cnameAlt(c) ? "<small>" + esc(cnameAlt(c)) + "</small>" : "") + '<span class="tk">' + esc(c.ticker) + "</span></div></td>" +
        '<td class="nw">' + esc(secName(c._ind)) + '<br><small style="color:var(--muted)">' + esc(secName(c._sec)) + "</small></td>" +
        '<td class="num nw" style="font-size:13px">' + esc(c.ticker) + " · " + esc(c._mkt) + "</td>" +
        '<td><div class="idx">' + c._idx.map(function (i) { return '<span class="chip">' + esc(idxName(i)) + "</span>"; }).join("") + "</div></td>" +
        '<td class="r num">' + money(c.price, c.currency) + '</td><td class="r num">' + money(fv(c).mine, c.currency) + "</td>" +
        '<td class="r num ' + (x == null ? "" : x >= 0 ? "up" : "down") + '">' + pct(x) + "</td>" +
        '<td class="num nw" style="font-size:12.5px;color:var(--muted)">' + esc(c.updated || "") + "</td>" +
        '<td><div class="files">' + (pubFiles(c).map(function (f) { return '<span class="ficon' + (f.path ? "" : " off") + '" title="' + E(f.label) + '">' + typeKind(f.type) + "</span>"; }).join("") || "—") + "</div></td>" +
        '<td class="arrow">→</td></tr>';
    }).join("") : '<tr><td colspan="10" class="empty">' + u("none") + "</td></tr>";
    var p = "";
    if (pages > 1) {
      p += '<button data-page="' + (st.page - 1) + '"' + (st.page === 1 ? " disabled" : "") + ' aria-label="prev">‹</button>';
      for (var i = 1; i <= pages; i++) p += '<button data-page="' + i + '" class="' + (i === st.page ? "on" : "") + '">' + i + "</button>";
      p += '<button data-page="' + (st.page + 1) + '"' + (st.page === pages ? " disabled" : "") + ' aria-label="next">›</button>';
    }
    $("#pager").innerHTML = p;
  }

  /* ---------- company ---------- */
  function viewCompany(c) {
    CUR = c;
    var f = fv(c), x = upside(c), v = verdict(c), C = c.currency;
    var h = '<div class="wrap"><div class="crumb"><a href="#">' + u("companies") + '</a> / <a href="#" data-filter-sec="' + esc(c._sec.en) + '">' + esc(secName(c._sec)) + "</a> / " + esc(secName(c._ind)) + "</div>";
    h += '<div class="co-head"><div><h1>' + esc(cname(c)) + "<small>" + esc(cnameAlt(c)) + "</small></h1>" +
      '<div class="meta"><b class="num">' + esc(c.ticker) + "</b><span>" + esc(c.exchange || "") + '</span><span class="sep">|</span><span>' + esc(mktName(c._mkt)) + '</span><span class="sep">|</span>' +
      c._idx.map(function (i) { return '<span class="chip">' + esc(idxName(i)) + "</span>"; }).join("") +
      (c.moat ? '<span class="chip">' + u("moat") + esc(moatName(c.moat)) + "</span>" : "") + "</div></div>" +
      '<div class="verdict">' + (v ? '<span class="chip v-' + v.k + '">' + v.t + " " + pct(x) + "</span>" : "") + "<small>" + u("updatedOn") + esc(c.updated || "—") + "</small></div></div>" +
      (c.example ? '<div class="ex-banner">' + u("exBanner") + "</div>" : "");
    h += '<div class="metric-bar">' +
      metric(u("price"), money(c.price, C), c.priceDate ? u("asOf") + c.priceDate : "") +
      metric(LFV("mine"), money(f.mine, C), isNum(f.bear) && isNum(f.bull) ? money(f.bear, C) + " – " + money(f.bull, C) : "") +
      metric(LFV("morningstar"), money(f.morningstar, C), diffTxt(f.mine, f.morningstar)) +
      metric(LFV("sp"), money(f.sp, C), diffTxt(f.mine, f.sp)) +
      metric(u("impliedUp"), '<span class="' + (x == null ? "" : x >= 0 ? "up" : "down") + '">' + pct(x) + "</span>", u("mineVsPx")) +
      metric(u("waccG"), c.dcf && c.dcf.wacc ? esc(c.dcf.wacc) : "—", c.dcf && c.dcf.terminalGrowth ? "g = " + esc(c.dcf.terminalGrowth) : "") + "</div>";
    var secs = [["summary", u("secSummary")], ["valuation", u("secFV")], ["gap", u("secGap")], ["business", u("secBiz")], ["dcf", u("secDcf")], ["files", u("secFiles")], ["history", u("secHist")]];
    h += '<div class="detail"><nav class="toc">' + secs.map(function (s) { return '<a href="#' + esc(c.id) + '" data-jump="b-' + s[0] + '">' + s[1] + "</a>"; }).join("") + '</nav><div class="blocks">';
    h += block("summary", u("secSummary"), "", '<p class="lead">' + E(c.summary) + "</p>" + (c.tags && c.tags.length ? '<div class="tags">' + c.tags.map(function (t) { return '<span class="chip">' + E(t) + "</span>"; }).join("") + "</div>" : ""));
    h += block("valuation", u("secFV"), u("subFV"), fvChart(c));
    h += block("gap", u("gapTitle"), isNum(f.morningstar) && c.gap && (c.gap.bridge || []).length ? u("subGap")(L("morningstar")) : u("subGapCmp"), gapBlock(c));
    h += block("business", u("secBiz"), "", segBlock(c) + '<div class="prose">' + md(c.business) + "</div>");
    h += block("dcf", u("secDcf"), c.dcf && c.dcf.horizon ? u("horizon") + T(c.dcf.horizon) : "", dcfBlock(c));
    h += block("files", u("secFiles"), u("subFiles"), filesBlock(c));
    h += block("history", u("secHist"), "", c.history && c.history.length ? '<ul class="timeline">' + c.history.map(function (y) { return "<li><time>" + esc(y.date) + "</time>" + E(y.note) + "</li>"; }).join("") + "</ul>" : '<p class="sub">' + u("noHist") + "</p>");
    app.innerHTML = h + "</div></div></div>";
  }
  function metric(l, val, sub) { return '<div class="metric"><span>' + esc(l) + "</span><b>" + val + "</b><em>" + (sub ? esc(sub) : "&nbsp;") + "</em></div>"; }
  function diffTxt(a, b) { return isNum(a) && isNum(b) ? u("vsIt") + pct(a / b - 1) : ""; }
  function block(id, title, sub, body) { return '<section class="block" id="b-' + id + '"><h2>' + esc(title) + "</h2>" + (sub ? '<p class="sub">' + esc(sub) + "</p>" : "") + body + "</section>"; }

  function fvChart(c) {
    var f = fv(c), C = c.currency;
    var pts = [{ k: "price", label: u("price"), v: c.price, color: "var(--c-price)" }, { k: "mine", label: L("mine"), v: f.mine, color: "var(--c-mine)" },
      { k: "ms", label: L("morningstar"), v: f.morningstar, color: "var(--c-ms)" }, { k: "sp", label: L("sp"), v: f.sp, color: "var(--c-sp)" }].filter(function (p) { return isNum(p.v); });
    if (pts.length < 2) return '<p class="sub">' + u("needFV") + "</p>";
    var vals = pts.map(function (p) { return p.v; }); if (isNum(f.bear)) vals.push(f.bear); if (isNum(f.bull)) vals.push(f.bull);
    var lo = Math.min.apply(null, vals), hi = Math.max.apply(null, vals), pad = (hi - lo) * 0.12 || hi * 0.1;
    lo = Math.max(0, lo - pad); hi += pad;
    var X0 = 20, X1 = 780, ay = 92, x = function (v) { return X0 + (v - lo) / (hi - lo) * (X1 - X0); };
    var step = niceStep((hi - lo) / 5), s = '<svg viewBox="0 0 800 150" role="img" aria-label="' + esc(u("fvAria")) + '">';
    for (var t = Math.ceil(lo / step) * step; t <= hi; t += step)
      s += '<line x1="' + x(t) + '" x2="' + x(t) + '" y1="30" y2="' + (ay + 6) + '" stroke="var(--line2)"/><text x="' + x(t) + '" y="' + (ay + 22) + '" text-anchor="middle" font-size="11" fill="var(--muted)" font-family="var(--mono)">' + esc(cur(C) + fmtTick(t)) + "</text>";
    s += '<line x1="' + X0 + '" x2="' + X1 + '" y1="' + ay + '" y2="' + ay + '" stroke="var(--muted2)"/>';
    if (isNum(f.bear) && isNum(f.bull)) s += '<rect x="' + x(f.bear) + '" y="' + (ay - 9) + '" width="' + Math.max(2, x(f.bull) - x(f.bear)) + '" height="18" rx="3" fill="var(--accent-soft)" stroke="var(--c-mine)" stroke-dasharray="3 3"/>';
    // Fair-value labels. Points closer than 130px form a cluster; a cluster's labels are stacked in one column beside
    // it and joined to their dots with elbow leader lines, ordered so that no line crosses another line or label.
    var fvs = pts.filter(function (p) { return p.k !== "price"; }).sort(function (a, b) { return a.v - b.v; });
    var clusters = [];
    fvs.forEach(function (p) {
      p.px = x(p.v);
      var c = clusters[clusters.length - 1];
      if (c && p.px - c[c.length - 1].px < 130) c.push(p); else clusters.push([p]);
    });
    clusters.forEach(function (c) {
      var dot = function (p) { return '<circle cx="' + p.px + '" cy="' + ay + '" r="6.5" fill="' + p.color + '" stroke="var(--card)" stroke-width="2"/>'; };
      var txt = function (p, tx, ty, an) { return '<text x="' + tx + '" y="' + ty + '" text-anchor="' + an + '" font-size="12.5" fill="' + p.color + '" font-weight="600">' + esc(p.label + " " + money(p.v, C)) + "</text>"; };
      if (c.length === 1) {
        var p = c[0], an = p.px > X1 - 60 ? "end" : p.px < X0 + 60 ? "start" : "middle";
        s += '<line x1="' + p.px + '" x2="' + p.px + '" y1="54" y2="' + (ay - 7) + '" stroke="' + p.color + '"/>' + dot(p) + txt(p, p.px, 48, an);
        return;
      }
      var lo = c[0].px, hi = c[c.length - 1].px;
      var right = hi + 240 < X1 + 20;             // put the label column right of the cluster when it fits, else left
      var colX = right ? hi + 16 : lo - 16;
      // right column: lowest value on the top row; left column: highest value on the top row
      var order = right ? c : c.slice().reverse();
      order.forEach(function (p, i) {
        var ty = 16 + i * 17, ly = ty - 4;
        s += '<polyline points="' + p.px + "," + (ay - 7) + " " + p.px + "," + ly + " " + (colX + (right ? -4 : 4)) + "," + ly + '" fill="none" stroke="' + p.color + '"/>' +
          dot(p) + txt(p, colX, ty, right ? "start" : "end");
      });
    });
    var pr = pts.filter(function (p) { return p.k === "price"; })[0];
    if (pr) { var px = x(pr.v), an = px > X1 - 60 ? "end" : px < X0 + 60 ? "start" : "middle";
      s += '<path d="M' + px + " " + (ay + 4) + ' l-7 12 h14 z" fill="var(--c-price)"/><text x="' + px + '" y="' + (ay + 46) + '" text-anchor="' + an + '" font-size="12.5" fill="var(--ink)" font-weight="600">' + esc(u("price") + " " + money(pr.v, C)) + "</text>"; }
    s += "</svg>";
    return '<div class="fv-chart"><div class="svgbox">' + s + '</div><div class="legend"><span><i style="background:var(--c-price)"></i>' + u("price") + "</span>" +
      '<span><i style="background:var(--c-mine)"></i>' + esc(L("mine")) + "</span>" +
      (isNum(f.morningstar) ? '<span><i style="background:var(--c-ms)"></i>' + esc(L("morningstar")) + "</span>" : "") +
      (isNum(f.sp) ? '<span><i style="background:var(--c-sp)"></i>' + esc(L("sp")) + "</span>" : "") +
      (isNum(f.bear) && isNum(f.bull) ? '<span><i class="band"></i>' + u("range") + "</span>" : "") + "</div></div>";
  }
  function niceStep(r) { var p = Math.pow(10, Math.floor(Math.log10(r))), n = r / p; return (n < 1.5 ? 1 : n < 3 ? 2 : n < 7 ? 5 : 10) * p; }
  function fmtTick(t) { return Math.abs(t) >= 1000 ? Math.round(t).toLocaleString("en-US") : String(Math.round(t * 100) / 100); }

  function gapBlock(c) {
    var g = c.gap || {}, f = fv(c), C = c.currency, h = "";
    if (T(g.summary)) h += '<div class="prose">' + md(g.summary) + "</div>";
    var br = (g.bridge || []).filter(function (b) { return T(b.driver) && isFinite(b.impact) && b.impact !== 0; });
    if (isNum(f.morningstar) && isNum(f.mine) && br.length) {
      var sum = br.reduce(function (a, b) { return a + b.impact; }, 0), resid = f.mine - f.morningstar - sum;
      if (Math.abs(resid) > 0.005 * f.mine) br = br.concat([{ driver: u("other"), impact: resid, other: true }]);
      var run = f.morningstar, steps = [{ lab: L("morningstar") + " Fair Value", b: run, total: true, v: run, color: "var(--c-ms)" }];
      br.forEach(function (b) { steps.push({ lab: T(b.driver), a: run, b: run + b.impact, v: b.impact, delta: true, other: b.other }); run += b.impact; });
      steps.push({ lab: L("mine") + " Fair Value", b: f.mine, total: true, v: f.mine, color: "var(--c-mine)" });
      var ends = [f.morningstar, f.mine]; steps.forEach(function (s) { if (!s.total) ends.push(s.a, s.b); });
      var lo = Math.min.apply(null, ends), hi = Math.max.apply(null, ends), pad = (hi - lo) * 0.35 || hi * .05;
      lo = Math.max(0, lo - pad); hi += pad * .3;
      var x = function (v) { return (v - lo) / (hi - lo) * 100; };
      var cell = function (s, i) {
        var a = s.total ? lo : Math.min(s.a, s.b), b = s.total ? s.b : Math.max(s.a, s.b);
        var col = s.total ? s.color : s.other ? "var(--muted2)" : s.v >= 0 ? "var(--green)" : "var(--neg)";
        var tag = i === 0 ? u("brStart") : i === steps.length - 1 ? u("brEnd") : (LANG === "zh" ? u("brStep") + " " + i + " 步" : u("brStep") + " " + i);
        var change = s.delta ? '<span class="' + (s.v >= 0 ? "up" : "down") + '">' + (s.v >= 0 ? "+" : "−") + money(Math.abs(s.v), C) + "</span>" : "";
        return '<div class="br-row' + (s.total ? " total" : "") + '"><span class="br-tag">' + esc(tag) + '</span><span class="lab">' + esc(s.lab) + "</span>" +
          '<div class="br-track"><div class="br-bar" style="left:' + x(a).toFixed(2) + "%;width:" + Math.max(.4, x(b) - x(a)).toFixed(2) + "%;background:" + col + '"></div></div>' +
          '<span class="val">' + change + '</span><span class="run">' + money(s.total ? s.v : s.b, C) + "</span></div>";
      };
      h += '<div class="bridge"><p class="br-title">' + esc(u("brTitle")) + '</p><p class="br-how">' + esc(u("brHow")) + "</p>" +
        '<div class="br-row br-head"><span></span><span></span><span></span><span class="val">' + esc(u("brChange")) + '</span><span class="run">' + esc(u("brRunning")) + "</span></div>" +
        steps.map(cell).join("") + '<p class="sub" style="margin:8px 0 0">' + esc(u("axisFrom")(money(lo, C))) + "</p></div>";
    }
    var rows = g.assumptions || [];
    if (rows.length) h += '<div class="scroll" style="margin-top:26px"><table class="cmp"><thead><tr><th>' + u("thAssump") + '</th><th class="m">' + esc(L("mine")) + "</th><th>" + esc(L("morningstar")) + "</th><th>" + esc(L("sp")) + "</th><th>" + u("thNote") + "</th></tr></thead><tbody>" +
      rows.map(function (r) { return "<tr><td>" + E(r.item) + '</td><td class="n m">' + (E(r.mine) || "—") + '</td><td class="n">' + (E(r.morningstar) || "—") + '</td><td class="n">' + (E(r.sp) || "—") + '</td><td class="note">' + E(r.note) + "</td></tr>"; }).join("") + "</tbody></table></div>";
    return h || '<p class="sub">' + u("noGap") + "</p>";
  }

  var SEGC = ["var(--accent)", "var(--c-ms)", "var(--brass)", "var(--ink2)", "var(--green)", "var(--muted2)"];
  function segBlock(c) {
    var s = (c.segments || []).filter(function (x) { return T(x.name) && x.share > 0; });
    if (!s.length) return "";
    var tot = s.reduce(function (a, b) { return a + b.share; }, 0);
    return '<p class="sub" style="margin-bottom:4px">' + u("revMix") + '</p><div class="seg-bar">' + s.map(function (x, i) { return '<div title="' + E(x.name) + " " + x.share + '%" style="flex:' + x.share + ";background:" + SEGC[i % SEGC.length] + '"></div>'; }).join("") +
      '</div><div class="seg-legend" style="margin-bottom:24px">' + s.map(function (x, i) { return '<span><i style="background:' + SEGC[i % SEGC.length] + '"></i>' + E(x.name) + ' <b class="num">' + Math.round(x.share / tot * 100) + "%</b></span>"; }).join("") + "</div>";
  }
  function dcfBlock(c) {
    var d = c.dcf || {}, C = c.currency, h = "";
    var kv = [["WACC", d.wacc], [u("tg"), d.terminalGrowth], [u("cagr"), d.revenueCagr], [u("margin"), d.margin]].filter(function (x) { return T(x[1]); });
    if (kv.length) h += '<div class="kv">' + kv.map(function (x) { return "<div><span>" + esc(x[0]) + "</span><b>" + E(x[1]) + "</b></div>"; }).join("") + "</div>";
    var sc = (d.scenarios || []).filter(function (x) { return isNum(x.value); });
    if (sc.length) {
      var w = sc.reduce(function (a, b) { return a + (b.prob || 0); }, 0), ev = w ? sc.reduce(function (a, b) { return a + b.value * (b.prob || 0); }, 0) / w : null;
      h += '<div class="scen">' + sc.map(function (x) {
        return '<div class="' + (/基准|base/i.test(T(x.name)) ? "base" : "") + '"><span>' + esc(scenName(x.name)) + "</span><b>" + money(x.value, C) + "</b><em>" + (x.prob ? u("prob") + x.prob + "%" : "") + (isNum(c.price) ? " · " + pct(x.value / c.price - 1) : "") + "</em></div>";
      }).join("") + (ev ? "<div><span>" + u("pw") + "</span><b>" + money(ev, C) + "</b><em>" + (isNum(c.price) ? pct(ev / c.price - 1) + u("vsPx") : "") + "</em></div>" : "") + "</div>";
    }
    if (T(d.note)) h += '<div class="prose" style="margin-top:18px">' + md(d.note) + "</div>";
    return h || '<p class="sub">' + u("noDcf") + "</p>";
  }
  // files may carry "lang": "en" | "zh" — show only those for the current language (or untagged ones)
  function langFiles(c) { return (c.files || []).filter(function (f) { return !f.lang || f.lang === LANG; }); }
  // Only PDFs are offered to visitors; Word / Excel masters are never linked from the site.
  function isPdf(f) { return /\.pdf$/i.test(f.path || ""); }
  function pubFiles(c) { return langFiles(c).filter(function (f) { return !f.path || isPdf(f); }); }
  function dl(path, cls, label) {
    var name = String(path).split("/").pop();
    return '<a class="' + cls + '" href="' + esc(path) + '" download="' + esc(name) + '" data-dl>' + label + "</a>";
  }
  function filesBlock(c) {
    var fs = pubFiles(c), h = fs.length ? '<div class="file-list">' + fs.map(function (f) {
      var inner = '<span class="ficon' + (f.path ? "" : " off") + '">' + (f.path ? fileKind(f.path) : typeKind(f.type)) + "</span><span><b>" + (E(f.label) || u("file")) + "</b><small>" + (f.path ? esc(f.path.split("/").pop()) : u("notUp")) + "</small></span>";
      return f.path ? '<a class="file" href="' + esc(f.path) + '" download="' + esc(f.path.split("/").pop()) + '" data-dl>' + inner + '<span class="dl">↓</span></a>' : '<div class="file missing">' + inner + "</div>";
    }).join("") + "</div>" : '<p class="sub">' + u("noFiles") + "</p>";
    if (T(c.onepageImage)) h += '<div class="onepage-img" data-zoom="' + esc(T(c.onepageImage)) + '" title="' + esc(u("zoom")) + '"><img src="' + esc(T(c.onepageImage)) + '" alt="' + esc(cname(c)) + ' One Page" loading="lazy"></div>';
    return h;
  }

  /* ---------- One Page ---------- */
  // Any company with a file of type "onepage" or an onepageImage appears here automatically.
  function onePages() {
    return ALL.filter(function (c) { return c.onepageImage || (c.files || []).some(function (f) { return f.type === "onepage"; }); }).map(function (c) {
      var f = langFiles(c).filter(function (x) { return x.type === "onepage" && isPdf(x); })[0] || (c.files || []).filter(function (x) { return x.type === "onepage" && isPdf(x); })[0] || {};
      return { c: c, pdf: f.path || "", img: T(c.onepageImage) || (/\.(png|jpe?g|webp)$/i.test(f.path || "") ? f.path : ""), date: f.date || c.updated || "" };
    }).sort(function (a, b) { return String(b.date).localeCompare(String(a.date)); });
  }
  function sheet(op, cls) {
    if (op.img) return '<div class="op-sheet has-img ' + (cls || "") + '"' + (cls === "big" ? ' data-zoom="' + esc(op.img) + '" title="' + esc(u("zoom")) + '"' : "") + '><img src="' + esc(op.img) + '" alt="' + esc(cname(op.c)) + ' One Page" loading="lazy"></div>';
    var cells = ""; for (var i = 0; i < 96; i++) cells += "<i></i>";
    return '<div class="op-sheet ph ' + (cls || "") + '" aria-hidden="true"><div class="t"><b>' + esc(cname(op.c)) + "</b><span>" + esc(op.c.ticker) + '</span></div><div class="bar"><i></i><i></i><i></i><i></i><i></i><i></i></div><div class="grid">' + cells + '</div><div class="row2"><i></i><i></i></div>' +
      (cls === "big" ? '<div class="note">' + esc(u("opPh")) + "</div>" : "") + "</div>";
  }
  var opState = { tab: "new", q: "" };
  function viewOnePage() {
    var ops = onePages(), op = SITE.onepage || {}, latest = ops[0];
    var t = T(op.title), parts = t.split(/[，,]\s*/);
    var title = parts.length > 1 ? esc(parts[0]) + (LANG === "zh" ? "，" : ", ") + "<em>" + esc(parts.slice(1).join(", ")) + "</em>" : esc(t);
    var h = '<section class="op-hero"><div class="wrap"><p class="mark">One Page</p><h1>' + title + "</h1><p>" + E(op.text) + '</p><div class="btns"><button class="btn solid" data-scroll="op-list">' + u("opBrowse") + "</button></div></div></section>";
    if (latest) {
      var c = latest.c;
      h += '<section class="op-feature"><div class="wrap"><div class="head"><h2 class="op-title">' + u("opLatest") + '</h2><span class="num" style="color:var(--muted);font-size:13px">' + ops.length + " " + esc(u("total")) + "</span></div>" +
        '<div class="op-stage">' + sheet(latest, "big") + '<div class="op-side"><p class="k">' + esc(secName(c._ind)) + " · " + esc(latest.date) + "</p><h3>" + esc(cname(c)) + '</h3><p class="m">' + esc(c.ticker) + " · " + esc(c.exchange || "") + "</p>" +
        '<div class="btns"><a class="btn" href="#op-' + esc(c.id) + '">' + u("opView") + "</a>" + (latest.pdf ? dl(latest.pdf, "btn", u("opPdf")) : "") +
        '<a class="btn" href="#' + esc(c.id) + '">' + u("opCompany") + "</a></div></div></div></div></section>";
    }
    h += '<section class="op-how"><div class="wrap"><h2 class="op-title">' + u("opHow") + '</h2><p class="lede">' + u("opHowLede") + '</p><div class="flow">' +
      u("flow").map(function (f, i) { return "<div><b>" + String(i + 1).padStart(2, "0") + "</b><strong>" + esc(f[0]) + "</strong><small>" + esc(f[1]) + "</small></div>"; }).join("") + "</div></div></section>";
    h += '<section class="op-list" id="op-list"><div class="wrap"><h2 class="op-title">' + u("opFind") + '</h2><div class="op-tools"><div class="seg"><button data-optab="new" class="' + (opState.tab === "new" ? "on" : "") + '">' + u("opNew") + '</button><button data-optab="sec" class="' + (opState.tab === "sec" ? "on" : "") + '">' + u("opBySec") + "</button></div>" +
      '<input id="op-q" type="search" placeholder="' + esc(u("opSearch")) + '" value="' + esc(opState.q) + '"></div><div id="op-body"></div></div></section>';
    app.innerHTML = h;
    renderOpList();
  }
  function opCard(o) {
    return '<div class="op-card" data-go="op-' + esc(o.c.id) + '" tabindex="0"><div class="thumb">' + sheet(o) + '</div><div class="cap"><b>' + esc(cname(o.c)) + "</b><span>" + esc(String(o.date).slice(0, 7).replace("-", ".")) + "</span></div><small>" + esc(o.c.ticker) + " · " + esc(secName(o.c._ind)) + "</small></div>";
  }
  function renderOpList() {
    var q = opState.q.trim().toLowerCase(), ops = onePages().filter(function (o) { return !q || hay(o.c).indexOf(q) >= 0; }), body = $("#op-body");
    if (!ops.length) { body.innerHTML = '<p class="empty">' + u("opNone") + "</p>"; return; }
    if (opState.tab === "new") { body.innerHTML = '<div class="op-grid">' + ops.map(opCard).join("") + "</div>"; return; }
    body.innerHTML = TAX.map(function (s) {
      var g = ops.filter(function (o) { return o.c._sec === s; });
      return g.length ? '<div class="op-sector"><h3>' + esc(secName(s)) + "<span>" + g.length + '</span></h3><div class="op-grid">' + g.map(opCard).join("") + "</div></div>" : "";
    }).join("");
  }
  function viewOpOne(c) {
    CUR = c;
    var o = onePages().filter(function (x) { return x.c === c; })[0] || { c: c, pdf: "", img: T(c.onepageImage) || "", date: c.updated }, f = fv(c), C = c.currency;
    app.innerHTML = '<div class="wrap"><div class="crumb"><a href="#onepage">' + u("opBack") + '</a></div><div class="opv"><div>' + sheet(o, "big") + "</div><aside>" +
      '<p class="eyebrow" style="margin:0">One Page · ' + esc(o.date) + "</p><h1>" + esc(cname(c)) + '</h1><p class="meta">' + esc(c.ticker) + " · " + esc(c.exchange || "") + " · " + esc(secName(c._ind)) + "</p>" +
      '<div class="kv"><div><span>' + u("price") + "</span><b>" + money(c.price, C) + "</b></div><div><span>" + esc(L("mine")) + " FV</span><b>" + money(f.mine, C) + "</b></div>" +
      "<div><span>" + esc(L("morningstar")) + "</span><b>" + money(f.morningstar, C) + "</b></div><div><span>" + esc(L("sp")) + "</span><b>" + money(f.sp, C) + "</b></div></div>" +
      '<p style="margin:0;font-size:14.5px;line-height:1.75;color:var(--ink2)">' + E(c.summary) + "</p>" +
      (o.pdf ? dl(o.pdf, "btn solid", u("opPdf")) : "") +
      '<a class="btn" href="#' + esc(c.id) + '">' + u("opCompany") + "</a></aside></div></div>";
  }

  /* ---------- about ---------- */
  function cvBlock(title, items) {
    return items.length ? '<p class="eyebrow" style="margin-top:40px">' + esc(title) + '</p><div class="cv">' + items.join("") + "</div>" : "";
  }
  function viewAbout() {
    var a = SITE.about || {};
    app.innerHTML = '<div class="wrap about-grid"><div><p class="eyebrow">About</p><h1>' + E(a.name) + '</h1><p class="role">' + E(a.title) + '</p><div class="prose"><p>' + E(a.intro) + "</p></div>" +
      cvBlock(u("expT"), (a.experience || []).map(function (x) {
        return '<div class="cv-item"><div class="cv-head"><b>' + E(x.org) + "</b><span>" + [E(x.place), E(x.date)].filter(Boolean).join(" · ") + '</span></div><div class="cv-role">' + E(x.role) + "</div>" +
          ((x.points || []).length ? "<ul>" + x.points.map(function (pt) { return "<li>" + E(pt) + "</li>"; }).join("") + "</ul>" : "") + "</div>";
      })) +
      cvBlock(u("eduT"), (a.education || []).map(function (x) {
        return '<div class="cv-item"><div class="cv-head"><b>' + E(x.school) + "</b><span>" + [E(x.place), E(x.date)].filter(Boolean).join(" · ") + '</span></div><div class="cv-role">' + E(x.degree) + "</div>" +
          (T(x.note) ? '<div class="cv-note">' + E(x.note) + "</div>" : "") + "</div>";
      })) +
      '<p class="eyebrow" style="margin-top:44px">' + u("howIAnalyse") + '</p><div class="method">' + (a.method || []).map(function (m) { return "<div><b>" + E(m.step) + "</b><p>" + E(m.text) + "</p></div>"; }).join("") + "</div></div>" +
      '<aside class="side-box"><h3>' + u("contact") + "</h3>" + (a.contacts || []).map(function (x) {
        return '<div class="contact"><span>' + E(x.label) + "</span>" + (x.url ? '<a href="' + esc(x.url) + '" target="_blank" rel="noopener"><b>' + E(x.value) + "</b></a>" : "<b>" + E(x.value) + "</b>") + "</div>";
      }).join("") + '<h3 style="margin-top:22px">' + u("skills") + '</h3><div class="skills">' + (a.skills || []).map(function (s) { return '<span class="chip">' + E(s) + "</span>"; }).join("") + "</div>" +
      (T(a.languages) ? '<h3 style="margin-top:22px">' + u("langT") + '</h3><p style="margin:0;font-size:14px">' + E(a.languages) + "</p>" : "") +
      '<h3 style="margin-top:22px">' + u("coverage") + '</h3><p style="margin:0;font-size:14px">' + esc(u("covText")(ALL.length)) + '<a href="#" style="color:var(--accent)">' + u("seeAll") + "</a></p></aside></div>";
  }

  /* ---------- generator ---------- */
  function viewAdd() {
    var zh = LANG === "zh";
    var F = function (id, en, cn, ph, type) { return '<div><label for="g-' + id + '">' + (zh ? cn : en) + '</label><input id="g-' + id + '" data-k="' + id + '"' + (type ? ' type="' + type + '" step="any"' : "") + ' placeholder="' + esc(ph || "") + '"></div>'; };
    var A = function (id, en, cn, ph) { return '<label for="g-' + id + '">' + (zh ? cn : en) + '</label><textarea id="g-' + id + '" data-k="' + id + '" placeholder="' + esc(ph || "") + '"></textarea>'; };
    var S = function (id, en, cn, opts) { return '<div><label for="g-' + id + '">' + (zh ? cn : en) + '</label><select id="g-' + id + '" data-k="' + id + '">' + opts + "</select></div>"; };
    app.innerHTML = '<div class="wrap"><div class="crumb"><a href="#">' + u("companies") + "</a> / " + u("addCo") + '</div></div><div class="wrap gen"><form id="gen" autocomplete="off">' +
      "<fieldset><legend>" + u("basics") + '</legend><div class="row">' + F("nameEn", "English name", "英文名", "Johnson & Johnson") + F("nameZh", "Chinese name", "中文名", "强生") + F("ticker", "Ticker", "Ticker", "JNJ") + F("id", "URL id (auto)", "网址 id（自动）", "jnj") + "</div>" +
      '<div class="row">' + F("exchange", "Exchange", "交易所", "NYSE") + S("market", "Market", "市场", Object.keys(MARKETS).map(function (k) { return '<option value="' + k + '">' + esc(mktName(k)) + "</option>"; }).join("")) +
      S("currency", "Currency", "货币", "<option>USD</option><option>CNY</option><option>HKD</option><option>EUR</option>") + F("updated", "Updated", "更新日期", "", "date") + "</div>" +
      '<div class="row">' + S("sector", "Sector", "行业大类", TAX.map(function (s) { return '<option value="' + esc(s.en) + '">' + esc(secName(s)) + "</option>"; }).join("")) + S("industry", "Industry", "细分行业", "") +
      S("moat", "Moat (optional)", "护城河（可选）", '<option value="">—</option><option value="Wide">' + moatName("Wide") + '</option><option value="Narrow">' + moatName("Narrow") + '</option><option value="None">' + moatName("None") + "</option>") + "</div>" +
      "<label>" + (zh ? "所属指数" : "Indices") + '</label><div class="checks">' + INDICES.map(function (i, n) { return '<label><input type="checkbox" id="g-idx' + n + '" data-idx="' + esc(i[0]) + '">' + esc(zh ? i[1] : i[0]) + "</label>"; }).join("") + "</div>" +
      F("tags", "Tags (comma-separated)", "标签（用逗号分隔）", "Pharma, MedTech") + "</fieldset>" +
      "<fieldset><legend>" + u("valuation") + '</legend><div class="row">' + F("price", "Price", "现价", "158", "number") + F("priceDate", "Price date", "价格日期", "", "date") + "</div>" +
      '<div class="row">' + F("mine", "My FV (base)", "我的 FV（基准）", "176", "number") + F("bear", "My bear", "我的悲观", "142", "number") + F("bull", "My bull", "我的乐观", "205", "number") + "</div>" +
      '<div class="row">' + F("morningstar", "Morningstar FV", "Morningstar FV", "164", "number") + F("sp", "S&P FV / target", "S&P FV / 目标价", "170", "number") + "</div>" +
      '<div class="row">' + F("wacc", "WACC", "WACC", "7.1%") + F("tg", "Terminal growth", "永续增长率", "2.5%") + F("cagr", "Revenue CAGR", "收入 CAGR", "4.8%") + F("margin", "Margin assumption", "利润率假设", "EBIT 28% → 31%") + "</div></fieldset>" +
      "<fieldset><legend>" + u("texts") + "</legend>" + A("summaryEn", "Conclusion · English", "结论 · 英文") + A("summaryZh", "Conclusion · Chinese", "结论 · 中文") +
      A("businessEn", "Business · English (### heading, - list, **bold**)", "公司业务 · 英文（支持 ### 标题、- 列表、**加粗**）") + A("businessZh", "Business · Chinese", "公司业务 · 中文") +
      A("gapEn", "Why my FV differs · English", "为什么我的 FV 不同 · 英文") + A("gapZh", "Why my FV differs · Chinese", "为什么我的 FV 不同 · 中文") +
      A("bridge", "Gap bridge: one per line「reason | $ per share」", "差距拆解：每行一条「原因 | 每股影响」", "Higher oncology peak sales | 6.5\nFaster MedTech margin recovery | 4\nLarger litigation reserve | -2") +
      A("assumptions", "Assumptions: 「item | mine | Morningstar | S&P | note」", "假设对比：「项目 | 我的 | Morningstar | S&P | 说明」", "Revenue CAGR | 5.2% | 4.3% | 4.8% | new launches") +
      A("segments", "Revenue mix: 「segment | %」", "收入结构：「分部 | 占比%」", "Innovative Medicine | 64\nMedTech | 36") + "</fieldset>" +
      "<fieldset><legend>" + u("files") + '</legend><div class="row">' + F("fOne", "One Page file", "One Page 文件名", "JNJ_OnePage.pdf") + F("fImg", "One Page image (PNG)", "One Page 图片（PNG）", "JNJ_OnePage.png") + "</div>" +
      '<div class="row">' + F("fDcf", "DCF model file", "DCF 模型文件名", "JNJ_DCF.xlsx") + F("fBiz", "Business analysis file", "业务分析文件名", "JNJ_Business.docx") + "</div></fieldset>" +
      '</form><div class="out"><p class="eyebrow">Output</p><h2 style="margin:0 0 8px;font-size:24px">' + u("genTitle") + '</h2><p class="hint">' + u("genHint") + "</p>" +
      '<button class="btn solid" id="g-copy" type="button">' + u("copy") + '</button> <span id="g-msg" class="hint"></span><pre id="g-out"></pre></div></div>';
    var today = new Date().toISOString().slice(0, 10);
    $("#g-updated").value = today; $("#g-priceDate").value = today;
    fillInd(); $("#g-sector").addEventListener("change", fillInd);
    $("#gen").addEventListener("input", genOut); $("#gen").addEventListener("change", genOut);
    $("#g-copy").addEventListener("click", function () {
      var msg = $("#g-msg"), sel = function () { var r = document.createRange(); r.selectNodeContents($("#g-out")); var s = getSelection(); s.removeAllRanges(); s.addRange(r); msg.textContent = u("selected"); };
      try { navigator.clipboard.writeText($("#g-out").textContent).then(function () { msg.textContent = u("copied"); }, sel); } catch (e) { sel(); }
    });
    genOut();
  }
  function fillInd() { var s = secMap[$("#g-sector").value]; $("#g-industry").innerHTML = (s ? s.industries : []).map(function (i) { return '<option value="' + esc(i[1]) + '">' + esc(LANG === "zh" ? i[0] : i[1]) + "</option>"; }).join(""); genOut(); }
  function genOut() {
    var g = function (k) { var el = document.querySelector('#gen [data-k="' + k + '"]'); return el ? el.value.trim() : ""; };
    var n = function (k) { var v = parseFloat(g(k)); return isFinite(v) ? v : 0; };
    var bi = function (en, zh) { var a = g(en), b = g(zh); return a && b ? { en: a, zh: b } : a || b; };
    var lines = function (k) { return g(k).split(/\n/).map(function (l) { return l.split("|").map(function (x) { return x.trim(); }); }).filter(function (a) { return a[0]; }); };
    var id = (g("id") || g("ticker")).toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-|-$/g, "") || "new-company";
    var path = function (f) { return f ? "reports/" + id + "/" + f : ""; };
    var o = {
      id: id, name: bi("nameEn", "nameZh"), ticker: g("ticker").toUpperCase(), exchange: g("exchange"), market: g("market"),
      sector: g("sector"), industry: g("industry"),
      indices: Array.prototype.slice.call(document.querySelectorAll("#gen [data-idx]:checked")).map(function (x) { return x.getAttribute("data-idx"); }),
      updated: g("updated"), currency: g("currency"), price: n("price"), priceDate: g("priceDate"),
      fairValue: { mine: n("mine"), bear: n("bear"), bull: n("bull"), morningstar: n("morningstar"), sp: n("sp") },
      moat: g("moat"), summary: bi("summaryEn", "summaryZh"),
      tags: g("tags").split(/[,，]/).map(function (x) { return x.trim(); }).filter(Boolean),
      business: bi("businessEn", "businessZh"),
      segments: lines("segments").map(function (a) { return { name: a[0], share: parseFloat(a[1]) || 0 }; }),
      dcf: { wacc: g("wacc"), terminalGrowth: g("tg"), revenueCagr: g("cagr"), margin: g("margin"), horizon: "10Y",
        scenarios: [{ name: "Bear", prob: 25, value: n("bear") }, { name: "Base", prob: 50, value: n("mine") }, { name: "Bull", prob: 25, value: n("bull") }] },
      gap: { summary: bi("gapEn", "gapZh"),
        bridge: lines("bridge").map(function (a) { return { driver: a[0], impact: parseFloat(a[1]) || 0 }; }),
        assumptions: lines("assumptions").map(function (a) { return { item: a[0], mine: a[1] || "", morningstar: a[2] || "", sp: a[3] || "", note: a[4] || "" }; }) },
      files: [{ type: "onepage", label: "One Page", path: path(g("fOne")), date: g("updated") }, { type: "dcf", label: { en: "DCF model", zh: "DCF 模型" }, path: path(g("fDcf")) },
        { type: "business", label: { en: "Business analysis", zh: "业务分析" }, path: path(g("fBiz")) }].filter(function (f) { return f.path; }),
      onepageImage: path(g("fImg")),
      history: [{ date: g("updated"), note: { en: "Initiated coverage", zh: "首次覆盖" } }]
    };
    $("#g-out").textContent = JSON.stringify(o, null, 2) + ",";
  }

  /* ---------- router ---------- */
  function route() {
    var h = decodeURIComponent((location.hash || "").replace(/^#/, ""));
    CUR = null;
    var find = function (id) { return ALL.filter(function (x) { return x.id === id; })[0]; };
    var c = find(h), brand = SITE.brand || "";
    if (c) { renderChrome("home"); viewCompany(c); document.title = cname(c) + " (" + c.ticker + ") · " + brand; return window.scrollTo(0, 0); }
    if (/^op-/.test(h) && find(h.slice(3))) { renderChrome("onepage"); viewOpOne(find(h.slice(3))); document.title = "One Page · " + cname(find(h.slice(3))) + " · " + brand; return window.scrollTo(0, 0); }
    if (h === "onepage") { renderChrome("onepage"); viewOnePage(); document.title = "One Page · " + brand; return window.scrollTo(0, 0); }
    if (h === "about") { renderChrome("about"); viewAbout(); document.title = u("about") + " · " + brand; return window.scrollTo(0, 0); }
    if (h === "add") { renderChrome(""); viewAdd(); document.title = u("addCo") + " · " + brand; return window.scrollTo(0, 0); }
    renderChrome("home"); viewHome(); document.title = T(SITE.heroTitle) + " · " + brand;
    if (h === "companies") jump("list");
  }
  function jump(id) { var el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); }

  /* ---------- events ---------- */
  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-lang],[data-scroll],[data-jump],[data-ind],[data-idx],[data-page],[data-go],[data-filter-sec],[data-optab],th[data-sort],#f-reset");
    if (!t || (t.closest("#gen") && !t.hasAttribute("data-lang"))) return;
    if (t.hasAttribute("data-lang")) {
      LANG = t.getAttribute("data-lang"); try { localStorage.setItem("pythia-lang", LANG); } catch (er) {}
      var y = window.scrollY; route(); window.scrollTo(0, y);
    }
    else if (t.hasAttribute("data-scroll")) jump(t.getAttribute("data-scroll"));
    else if (t.hasAttribute("data-jump")) { e.preventDefault(); jump(t.getAttribute("data-jump")); }
    else if (t.hasAttribute("data-ind")) { st.sector = t.getAttribute("data-sec"); st.industry = t.getAttribute("data-ind"); st.page = 1; viewHome(); jump("list"); }
    else if (t.hasAttribute("data-idx")) { st.index = t.getAttribute("data-idx"); st.page = 1; document.querySelectorAll(".index-chips button").forEach(function (b) { b.classList.toggle("on", b === t); }); renderRows(); }
    else if (t.hasAttribute("data-page")) { st.page = +t.getAttribute("data-page"); renderRows(); jump("list"); }
    else if (t.hasAttribute("data-go")) location.hash = t.getAttribute("data-go");
    else if (t.hasAttribute("data-optab")) { opState.tab = t.getAttribute("data-optab"); document.querySelectorAll("[data-optab]").forEach(function (b) { b.classList.toggle("on", b === t); }); renderOpList(); }
    else if (t.hasAttribute("data-filter-sec")) { e.preventDefault(); st = Object.assign(st, { sector: t.getAttribute("data-filter-sec"), industry: "", page: 1 }); location.hash = "companies"; }
    else if (t.tagName === "TH") { var k = t.getAttribute("data-sort"); st.dir = st.sort === k ? -st.dir : (k === "name" || k === "industry" ? 1 : -1); st.sort = k; $("#f-sort").value = k; renderRows(); }
    else if (t.id === "f-reset") { st = { q: "", sector: "", industry: "", index: "", market: "", sort: "updated", dir: -1, page: 1 }; viewHome(); jump("list"); }
  });
  document.addEventListener("input", function (e) {
    var id = e.target.id;
    if (id === "f-q") { st.q = e.target.value; st.page = 1; renderRows(); }
    if (id === "op-q") { opState.q = e.target.value; renderOpList(); }
    if (id === "top-q") {
      st.q = e.target.value; st.page = 1;
      if (!$("#rows")) { var v = st.q; location.hash = "companies"; setTimeout(function () { var q = $("#top-q"); if (q) { q.value = v; q.focus(); } }, 0); return; }
      var fq = $("#f-q"); if (fq) fq.value = st.q; renderRows(); jump("list");
    }
  });
  document.addEventListener("change", function (e) {
    var id = e.target.id;
    if (id === "f-sector") { st.sector = e.target.value; st.industry = ""; st.page = 1; $("#f-ind").innerHTML = '<option value="">' + u("allInd") + "</option>" + industryOptions(); renderRows(); }
    if (id === "f-ind") { st.industry = e.target.value; st.page = 1; renderRows(); }
    if (id === "f-market") { st.market = e.target.value; st.page = 1; renderRows(); }
    if (id === "f-sort") { st.sort = e.target.value; st.dir = st.sort === "name" || st.sort === "industry" ? 1 : -1; renderRows(); }
  });
  document.addEventListener("keydown", function (e) { var r = e.key === "Enter" && e.target.closest && e.target.closest("[data-go]"); if (r) location.hash = r.getAttribute("data-go"); });

  // PDF downloads. On a normal website the <a download> link does the job. Inside the claude.ai artifact viewer plain
  // downloads are blocked, so there we fetch the published file and hand it to the viewer's "downloads" capability.
  var DL = null;
  try { if (window.claude && window.claude.use) window.claude.use("downloads").then(function (d) { DL = d; }, function () {}); } catch (e) {}
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a[data-dl]");
    if (!a || !DL) return;
    e.preventDefault();
    var href = a.getAttribute("href"), name = a.getAttribute("download") || href.split("/").pop();
    fetch(href).then(function (r) { if (!r.ok) throw new Error(r.status); return r.blob(); })
      .then(function (blob) { return DL.save({ filename: name, data: blob }); })
      .catch(function () {});
  });

  // click a One Page image to view it full size (works everywhere, including previews that block downloads)
  document.addEventListener("click", function (e) {
    var z = e.target.closest && e.target.closest("[data-zoom]");
    if (z) {
      var box = document.createElement("div"); box.className = "lightbox"; box.setAttribute("role", "dialog");
      box.innerHTML = '<button class="lb-close" aria-label="' + esc(u("close")) + '">✕</button><img src="' + esc(z.getAttribute("data-zoom")) + '" alt="One Page">';
      document.body.appendChild(box); document.body.style.overflow = "hidden";
      return;
    }
    var lb = e.target.closest && e.target.closest(".lightbox");
    if (lb && (e.target.classList.contains("lb-close") || e.target === lb)) { lb.remove(); document.body.style.overflow = ""; }
  });
  document.addEventListener("keydown", function (e) { var lb = document.querySelector(".lightbox"); if (lb && e.key === "Escape") { lb.remove(); document.body.style.overflow = ""; } });

  window.addEventListener("hashchange", route);
  route();
})();
