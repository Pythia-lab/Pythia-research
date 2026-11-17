/* =========================================================
   Site settings · 网站基本信息
   Text can be a plain string, or { en: "...", zh: "..." } for both languages.
   文字可以只写一种语言，也可以写成 { en: "英文", zh: "中文" }。
   ========================================================= */
window.SITE = {
  brand: "PYTHIA",
  brandSub: "Equity Research",
  defaultLang: "en",                   // "en" or "zh" — 默认语言

  heroTitle: { en: "Company Research", zh: "公司研究档案" },
  heroText: {
    en: "Every company I have studied: what the business really does, what it is worth on my DCF, and exactly where my fair value differs from Morningstar and S&P — and why.",
    zh: "我研究过的每一家公司：先讲清楚生意本身，再用 DCF 估值，并逐项拆解我的 Fair Value 与 Morningstar、S&P 的差距从何而来。"
  },
  footerMotto: { en: "Business first. Valuation second.", zh: "先看生意，再看估值。" },

  onepage: {
    title: { en: "A decade of a business, on one page.", zh: "把一家公司的十年，放进一页纸。" },
    text: {
      en: "Each One Page compresses ten-plus years of financials, value creation, KPIs and my commentary into a single sheet — the fastest way to judge a company's quality before valuing it.",
      zh: "每份 One Page 把十年以上的财务数据、价值创造、关键 KPI 和我的点评压缩到一页纸上——在估值之前，用最快的方式判断一家公司的质量。"
    }
  },

  about: {
    name: "Pythia Lan",
    title: { en: "Equity Research · Valuation", zh: "股票研究 / 估值分析" },
    intro: {
      en: "Two or three sentences about you: education, the roles you are looking for, and the analysis you do best.",
      zh: "这里放 2–3 句自我介绍：教育背景、正在找的岗位方向、你最擅长的分析能力。"
    },
    contacts: [
      { label: "Email", value: "your.name@example.com" },
      { label: "LinkedIn", value: "linkedin.com/in/your-name", url: "https://www.linkedin.com/" }
    ],
    skills: [
      { en: "3-statement modelling", zh: "三表建模" }, { en: "DCF / reverse DCF", zh: "DCF / 反向 DCF" },
      { en: "Comparable companies", zh: "可比公司估值" }, { en: "Industry & business-model analysis", zh: "行业与商业模式分析" },
      "Excel / Python"
    ],
    method: [
      { step: { en: "Understand the business", zh: "理解生意" }, text: { en: "How the company makes money, why customers pay, and where the moat is.", zh: "公司靠什么赚钱、客户为什么买单、护城河在哪里。" } },
      { step: { en: "One Page", zh: "One Page" }, text: { en: "Ten years of financials, value creation and KPIs on a single sheet to judge quality fast.", zh: "把十年财务、价值创造、关键 KPI 压缩成一页纸，快速判断公司质量。" } },
      { step: { en: "DCF valuation", zh: "DCF 估值" }, text: { en: "Segment revenue build, margins, reinvestment and WACC, with bear / base / bull scenarios.", zh: "分部收入预测、利润率与再投资假设、WACC，给出悲观 / 基准 / 乐观三情景。" } },
      { step: { en: "Benchmark the Street", zh: "对标外部估值" }, text: { en: "Compare with Morningstar and S&P fair values and break the gap down assumption by assumption.", zh: "与 Morningstar、S&P 的 Fair Value 对比，逐项拆解假设差异，写下我为什么不同意。" } }
    ]
  },

  verdict: { under: 0.15, over: -0.10 },   // ≥ +15% Undervalued 低估, ≤ −10% Overvalued 高估
  labels: { mine: { en: "My DCF", zh: "我的 DCF" }, morningstar: "Morningstar", sp: "S&P" },
  pageSize: 12
};
