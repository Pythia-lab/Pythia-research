/* =====================================================================
   Companies · 公司数据 —— 以后你只需要改这一个文件
   ---------------------------------------------------------------------
   新增一家公司：
     1. 打开网站底部「Add a company / 生成新公司条目」，填表 → 复制代码；
        或者直接复制下面的「空白模板」。
     2. 粘贴到 COMPANIES 列表里（两个公司之间用英文逗号隔开）。
     3. 文件放进 reports/公司id/ 文件夹，files 里写上路径。
        只要 files 里有 type: "onepage" 的文件，或者填了 onepageImage，
        这家公司就会自动出现在 One Page 页面上。
   双语：
     - 文字可以写成 "只有一种语言"，也可以写成 { en: "English", zh: "中文" }。
       缺哪种语言，网站就自动显示另一种。
   格式：
     - 长段落用反引号 ` `，支持 ### 小标题、- 列表、**加粗**、空一行分段。
     - 数字不要加引号，例如 price: 72.5
     - example: true 的是示例公司，换成你自己的公司后删掉即可。
   ===================================================================== */

/* ---------------- 空白模板 Blank template ----------------
{
  id: "ticker-lowercase",            // used in the URL, e.g. "jnj"
  name: { en: "English Name", zh: "中文名" },
  ticker: "TICKER",
  exchange: "NYSE",
  market: "US",                      // US / CN / HK / Other
  sector: "Health Care",             // 英文或中文都可以，见 taxonomy.js
  industry: "Pharmaceuticals",
  indices: ["S&P 500", "Russell 1000"],
  updated: "2026-11-16",
  currency: "USD",
  price: 0, priceDate: "2026-11-16",
  fairValue: { mine: 0, bear: 0, bull: 0, morningstar: 0, sp: 0 },
  moat: "",                          // Wide / Narrow / None
  summary: { en: ``, zh: `` },
  tags: [],
  business: { en: ``, zh: `` },
  segments: [ { name: "Segment A", share: 60 }, { name: "Segment B", share: 40 } ],
  dcf: {
    wacc: "", terminalGrowth: "", revenueCagr: "", margin: "", horizon: "10Y",
    scenarios: [ { name: "Bear", prob: 25, value: 0 }, { name: "Base", prob: 50, value: 0 }, { name: "Bull", prob: 25, value: 0 } ],
    note: { en: ``, zh: `` }
  },
  gap: {
    summary: { en: ``, zh: `` },
    bridge: [ { driver: { en: "Reason", zh: "原因" }, impact: 0 } ],   // from Morningstar FV to my FV, $/share
    assumptions: [ { item: "Revenue CAGR", mine: "", morningstar: "", sp: "", note: "" } ]
  },
  files: [ { type: "onepage", label: "One Page", path: "reports/xxx/xxx_OnePage.pdf", date: "2026-11-16" } ],
  onepageImage: "reports/xxx/xxx_OnePage.png",
  history: [ { date: "2026-11-16", note: { en: "Initiated coverage", zh: "首次覆盖" } } ]
}
------------------------------------------------------------------ */

window.COMPANIES = [

{
  "id": "cvs",
  "name": {
    "en": "CVS Health",
    "zh": "CVS健康"
  },
  "ticker": "CVS",
  "exchange": "NYSE",
  "market": "US",
  "sector": "Health Care",
  "industry": "Managed Care",
  "indices": [
    "S&P 500",
    "Russell 1000"
  ],
  "updated": "2026-11-16",
  "currency": "USD",
  "price": 89.35,
  "priceDate": "2026-11-13",
  "fairValue": {
    "mine": 115,
    "bear": 80,
    "bull": 132,
    "morningstar": 110,
    "sp": 116.28
  },
  "moat": "",
  "summary": {
    "en": "An insurer-PBM-pharmacy whose earnings recovery is led by Aetna margins; the stock prices little durability, so my $115 base needs only a partial rerating.",
    "zh": "集保险、PBM 与药房于一体，盈利修复由 Aetna 利润率带动；股价几乎没有反映修复的持续性，因此 $115 的基准价值只需部分估值修复。"
  },
  "tags": [
    {
      "en": "Managed care",
      "zh": "管理式医疗"
    },
    "PBM",
    {
      "en": "Retail pharmacy",
      "zh": "零售药房"
    },
    {
      "en": "Turnaround",
      "zh": "困境反转"
    }
  ],
  "business": {
    "en": "### Three profit pools\n- **Health Care Benefits (Aetna)**: premiums and fees from ~26M medical members; the margin depends on the medical benefit ratio (MBR).\n- **Health Services (Caremark)**: PBM for ~87M plan members, specialty pharmacy and care delivery.\n- **Pharmacy & Consumer Wellness**: ~9,000 CVS pharmacies and >1,000 clinics.\n\n### Why integration matters\nOne member can be insured by Aetna, have drug benefits managed by Caremark and fill prescriptions at CVS. Segments trade with each other, so each profit pool must be judged separately.\n\n### Key risks\nMedical-cost trend, PBM reform and drug-pricing rules, and leverage (~$61B debt).",
    "zh": "### 三个利润池\n- **医疗福利（Aetna）**：向约 2,600 万医疗会员收取保费和服务费；利润率取决于医疗福利比率（MBR）。\n- **健康服务（Caremark）**：为约 8,700 万计划会员提供 PBM，并经营专科药房与医疗服务。\n- **药房与消费健康**：约 9,000 家 CVS 药房和 1,000 余家诊所。\n\n### 整合的意义\n同一会员可由 Aetna 承保、由 Caremark 管理药品福利、在 CVS 药房取药。分部之间互有交易，因此要分别评估每个利润池。\n\n### 关键风险\n医疗成本趋势、PBM 改革与药价政策，以及杠杆（约 $61B 债务）。"
  },
  "segments": [
    {
      "name": {
        "en": "Health Services",
        "zh": "健康服务"
      },
      "share": 40.2
    },
    {
      "name": {
        "en": "Health Care Benefits",
        "zh": "医疗福利"
      },
      "share": 30.3
    },
    {
      "name": {
        "en": "Pharmacy & Consumer",
        "zh": "药房与消费健康"
      },
      "share": 29.4
    }
  ],
  "dcf": {
    "wacc": "6.69%",
    "terminalGrowth": "— (8.0x exit)",
    "horizon": "2026-31",
    "revenueCagr": "~5.1% (FY25-31)",
    "margin": "Adj. op. margin 3.6% → ~4.3%",
    "scenarios": [
      {
        "name": "Bear",
        "prob": 25,
        "value": 80
      },
      {
        "name": "Base",
        "prob": 50,
        "value": 115
      },
      {
        "name": "Bull",
        "prob": 25,
        "value": 132
      }
    ]
  },
  "gap": {
    "summary": {
      "en": "My base value of **$115** is 4.5% above Morningstar's **$110** and close to the S&P Global MI consensus target (**$116.28**). The difference is a judgement on durability: I assume better pricing and medical-cost management keep Aetna's margin improving after the favorable prior-year reserve development fades. The exit-multiple DCF ($131.83) is a cross-check, not the target.",
      "zh": "我的基准价值 **$115** 比 Morningstar 的 **$110** 高 4.5%，与 S&P Global MI 一致预期目标价（**$116.28**）接近。差别在于对持续性的判断：我认为在往年准备金有利释放消退后，更好的定价和医疗成本管理仍能让 Aetna 的利润率继续改善。退出倍数 DCF（$131.83）只是交叉验证，不是目标价。"
    },
    "bridge": [],
    "assumptions": [
      {
        "item": {
          "en": "Method",
          "zh": "估值方法"
        },
        "mine": {
          "en": "13.5-14x 2027 EPS; DCF check",
          "zh": "2027年EPS 13.5-14x；DCF 交叉验证"
        },
        "morningstar": "DCF",
        "sp": {
          "en": "Consensus",
          "zh": "一致预期"
        },
        "note": ""
      },
      {
        "item": {
          "en": "2027 adj. EPS",
          "zh": "2027年调整后EPS"
        },
        "mine": "$8.52",
        "morningstar": "—",
        "sp": "~$8.52",
        "note": {
          "en": "Mgmt floor ≥$8.44",
          "zh": "管理层下限 ≥$8.44"
        }
      },
      {
        "item": "WACC",
        "mine": "6.69%",
        "morningstar": "—",
        "sp": "—",
        "note": ""
      },
      {
        "item": {
          "en": "Long-run adj. op. margin",
          "zh": "长期调整后营业利润率"
        },
        "mine": "~4.3%",
        "morningstar": "—",
        "sp": "—",
        "note": {
          "en": "FY31 in the model",
          "zh": "模型中 FY31"
        }
      }
    ]
  },
  "files": [
    {
      "type": "onepage",
      "lang": "en",
      "label": "One Page",
      "path": "reports/cvs/CVS_OnePage_en.pdf",
      "date": "2026-11-16"
    },
    {
      "type": "onepage",
      "lang": "zh",
      "label": "One Page",
      "path": "reports/cvs/CVS_OnePage_zh.pdf",
      "date": "2026-11-16"
    }
  ],
  "onepageImage": {
    "en": "reports/cvs/CVS_OnePage_en.png",
    "zh": "reports/cvs/CVS_OnePage_zh.png"
  },
  "history": [
    {
      "date": "2026-11-16",
      "note": {
        "en": "One Page V2 with DCF",
        "zh": "One Page V2（含 DCF）"
      }
    },
    {
      "date": "2026-10-01",
      "note": {
        "en": "Initiated: Buy, base $115",
        "zh": "首次覆盖：买入，基准 $115"
      }
    }
  ]
}

];
