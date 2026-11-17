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
    name: "Pythia",
    title: { en: "Leader & Risk Manager, UConn Student Managed Fund", zh: "UConn 学生管理基金 负责人 / 风险经理" },
    intro: {
      en: "I am a graduate student in Financial and Enterprise Risk Management at the University of Connecticut School of Business, where I lead the Student Managed Fund and serve as its risk manager. This library is where I keep my company research: how each business makes money, a one-page view of its long-run economics, and a DCF valuation compared against Morningstar and S&P.",
      zh: "我目前就读于康涅狄格大学（UConn）商学院金融与企业风险管理硕士项目，担任学生管理基金（Student Managed Fund）的负责人兼风险经理。这个研究库收录我做过的公司分析：先讲清楚生意怎么赚钱，再用一页纸看长期经济性，最后用 DCF 估值并与 Morningstar、S&P 对比。"
    },
    contacts: [
      { label: "Email", value: "pythialan@gmail.com" },
      { label: "LinkedIn", value: "linkedin.com/in/wanrong-lan-ksb", url: "https://www.linkedin.com/in/wanrong-lan-ksb" }
    ],
    education: [
      { school: { en: "University of Connecticut, School of Business", zh: "康涅狄格大学 商学院" }, place: "Stamford, CT", date: { en: "Expected May 2027", zh: "预计 2027年5月" },
        degree: { en: "M.S. in Financial and Enterprise Risk Management (MSFERM)", zh: "金融与企业风险管理硕士（MSFERM）" },
        note: { en: "GPA 3.90 / 4.00 · Merit Scholarship", zh: "GPA 3.90 / 4.00 · 优秀奖学金" } },
      { school: { en: "Indiana University, Kelley School of Business", zh: "印第安纳大学 凯利商学院" }, place: "Bloomington, IN", date: "2025",
        degree: { en: "B.S. in Business, Major in Finance", zh: "商学学士，金融专业" }, note: "" }
    ],
    experience: [
      { org: { en: "UConn Student Managed Fund", zh: "UConn 学生管理基金" }, date: { en: "Current", zh: "现任" },
        role: { en: "Leader & Risk Manager", zh: "负责人 / 风险经理" }, points: [] },
      { org: { en: "Shanghai Pudong Development Bank", zh: "上海浦东发展银行" }, place: { en: "Guangzhou", zh: "广州" }, date: "Jul – Aug 2024",
        role: { en: "Intern, Transaction Banking", zh: "交易银行部 实习生" },
        points: [
          { en: "Prepared a report on GAC Group's projects, competition and production status to support a supply-chain-finance review.", zh: "撰写广汽集团项目、行业竞争与生产状况报告，支持供应链金融合作评估。" },
          { en: "Researched Guangzhou's complete-equipment export industry to identify cross-border finance targets.", zh: "研究广州成套设备出口行业，筛选跨境金融目标企业。" },
          { en: "Verified export documents and loan applications for an export-financing project against lending requirements.", zh: "审核出口融资项目的出口单据与贷款申请，确保符合放贷要求。" }] },
      { org: { en: "Mingya Insurance Broker", zh: "明亚保险经纪" }, place: { en: "Guangzhou", zh: "广州" }, date: "May – Jun 2024",
        role: { en: "Team Assistant", zh: "团队助理" },
        points: [
          { en: "Analyzed client protection needs and designed family insurance plans.", zh: "分析客户保障需求，设计家庭保障方案。" },
          { en: "Wrote four client-education articles on recent economic trends and insurance coverage.", zh: "撰写四篇面向客户的经济趋势与保险保障科普文章。" }] },
      { org: { en: "HSBC Wealth & Personal Banking Simulation", zh: "汇丰财富与个人银行 模拟项目" }, date: "Apr – May 2024",
        role: { en: "Investment Advisor", zh: "投资顾问" },
        points: [
          { en: "Built investor profiles from goals, risk preferences and constraints, and recommended tailored portfolios.", zh: "根据投资目标、风险偏好与约束建立客户画像，提供定制化投资建议。" }] }
    ],
    languages: { en: "Chinese (Mandarin), Cantonese, English", zh: "普通话、粤语、英语" },
    skills: [
      { en: "DCF valuation", zh: "DCF 估值" }, { en: "3-statement modelling", zh: "三表建模" },
      { en: "Risk management", zh: "风险管理" }, { en: "Industry & business-model analysis", zh: "行业与商业模式分析" },
      { en: "Spreadsheet modelling", zh: "电子表格建模" }, "Python", "Java", "Microsoft Access"
    ],
    method: [
      { step: { en: "Understand the business", zh: "理解生意" }, text: { en: "How the company makes money, why customers pay, and where the moat is.", zh: "公司靠什么赚钱、客户为什么买单、护城河在哪里。" } },
      { step: { en: "One Page", zh: "One Page" }, text: { en: "Fifteen years of financials, value creation and KPIs on a single sheet to judge quality fast.", zh: "把十五年财务、价值创造、关键 KPI 压缩成一页纸，快速判断公司质量。" } },
      { step: { en: "DCF valuation", zh: "DCF 估值" }, text: { en: "Segment revenue build, margins, reinvestment and WACC, with bear / base / bull scenarios.", zh: "分部收入预测、利润率与再投资假设、WACC，给出悲观 / 基准 / 乐观三情景。" } },
      { step: { en: "Benchmark the Street", zh: "对标外部估值" }, text: { en: "Compare with Morningstar and S&P fair values and break the gap down assumption by assumption.", zh: "与 Morningstar、S&P 的 Fair Value 对比，逐项拆解假设差异，写下我为什么不同意。" } }
    ]
  },

  verdict: { under: 0.15, over: -0.10 },   // ≥ +15% Undervalued 低估, ≤ −10% Overvalued 高估
  labels: { mine: { en: "My DCF", zh: "我的 DCF" }, morningstar: "Morningstar", sp: "S&P" },
  pageSize: 12
};
