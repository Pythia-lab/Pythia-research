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
    "id": "orcl",
    "name": {
      "en": "Oracle",
      "zh": "甲骨文"
    },
    "ticker": "ORCL",
    "exchange": "NYSE",
    "market": "US",
    "sector": "Information Technology",
    "industry": "Systems Software",
    "indices": [
      "S&P 500",
      "Russell 1000"
    ],
    "updated": "2026-11-17",
    "currency": "USD",
    "price": 119.09,
    "priceDate": "2026-11-16",
    "fairValue": {
      "mine": 243.09,
      "bear": 101.32,
      "bull": 251.67,
      "morningstar": 195.0,
      "sp": 235.77
    },
    "moat": "Narrow",
    "summary": {
      "en": "A software cash machine turned AI-infrastructure builder: OCI growth and a $664B backlog are real, but capex now exceeds operating cash flow, so the value depends on capex rolling over before debt and lease commitments bite.",
      "zh": "从软件现金机器转型为 AI 基础设施建设者：OCI 增长和 $6,640 亿未履约合同是真的，但资本开支已超过经营现金流，价值取决于资本开支能否在债务和租约压力加大前见顶回落。"
    },
    "tags": [
      {
        "en": "Cloud infrastructure",
        "zh": "云基础设施"
      },
      "AI",
      {
        "en": "Database & software",
        "zh": "数据库与软件"
      },
      {
        "en": "Capex cycle",
        "zh": "资本开支周期"
      }
    ],
    "business": {
      "en": "### Four revenue lines\n- **Oracle Cloud Infrastructure (OCI):** rents compute and GPU capacity, largely to AI customers; about 27% of FY26 revenue and growing fastest (+121% in Q1 FY27).\n- **Cloud applications (SaaS):** Fusion ERP, NetSuite, health (Cerner); about 23%.\n- **License support and licenses:** the database and middleware installed base; about 36%, flat but very profitable.\n- **Hardware and services:** about 13%.\n\n### The change\nOracle is spending most of its revenue on data centers (capex 82.6% of FY26 revenue) to deliver contracted AI capacity. Remaining performance obligations reached $664B at Aug 31, 2026.\n\n### Key risks\nFunding gap and leverage ($134.5B debt, $288B of uncommenced leases), customer concentration and prepayment timing, delivery delays, AI demand cycle, and the 2026 credit downgrade.",
      "zh": "### 四条收入线\n- **Oracle 云基础设施（OCI）：** 出租算力和 GPU，主要客户是 AI 公司；约占 FY26 营收 27%，增长最快（Q1 FY27 +121%）。\n- **云应用（SaaS）：** Fusion ERP、NetSuite、医疗（Cerner）；约 23%。\n- **许可证支持与许可证：** 数据库和中间件的存量客户；约 36%，持平但利润率很高。\n- **硬件与服务：** 约 13%。\n\n### 发生了什么变化\nOracle 把大部分营收投入数据中心（FY26 资本开支占营收 82.6%），以交付已签约的 AI 算力。截至 2026年8月31日，未履约合同（RPO）达 $6,640 亿。\n\n### 关键风险\n资金缺口与杠杆（债务 $1,345 亿、$2,880 亿未起租租约）、客户集中与预付款时点、交付延迟、AI 需求周期，以及 2026 年信用评级下调。"
    },
    "segments": [
      {
        "name": {
          "en": "License support & license",
          "zh": "许可证支持与许可证"
        },
        "share": 36.4
      },
      {
        "name": {
          "en": "Cloud infrastructure (OCI)",
          "zh": "云基础设施（OCI）"
        },
        "share": 27.0
      },
      {
        "name": {
          "en": "Cloud applications",
          "zh": "云应用"
        },
        "share": 23.5
      },
      {
        "name": {
          "en": "Hardware & services",
          "zh": "硬件与服务"
        },
        "share": 13.1
      }
    ],
    "dcf": {
      "wacc": "9.6%",
      "terminalGrowth": "3.0%",
      "horizon": "FY27-36",
      "revenueCagr": "~19% (FY26-36, blended)",
      "margin": "EBIT margin 31% → 32% (FY27-36)",
      "scenarios": [
        {
          "name": "Bear",
          "prob": null,
          "value": 101.32
        },
        {
          "name": "Base",
          "prob": null,
          "value": 243.09
        },
        {
          "name": "Bull",
          "prob": null,
          "value": 251.67
        }
      ]
    },
    "gap": {
      "summary": {
        "en": "Morningstar's fair value is **$195** (Oct 15, 2026); mine is **$243.09**, **+$48.09** higher. The two models agree on more than they differ: both use a **9.6% WACC**, both have revenue growing about **31% a year to FY31** (Morningstar $264B, mine $256B) and an operating margin near **28-29%** in FY31, and in both the terminal value is **74% of EV**. The gap is the **capex path**. Morningstar has capex peaking at **$120B in FY28** and free cash flow negative until FY31 (**-$111B** over FY27-31); my model peaks at **$84B** and turns positive in FY30 (**+$17B** over FY27-31). Lower capex also leaves a larger normalised cash flow for my terminal value. Partly offsetting: I divide by **3,193M shares** (after the ATM issuance) against Morningstar's 3,026M. The stock at **$119.09** sits below both.",
        "zh": "Morningstar 的合理价值为 **$195**（2026年10月15日）；我的是 **$243.09**，高 **$48.09**。两个模型的共同点多于分歧：WACC 都是 **9.6%**；到 FY31 营收都以每年约 **31%** 增长（Morningstar $2,640 亿，我的 $2,560 亿）；FY31 营业利润率都在 **28-29%**；终值都占 EV 的 **74%**。差距在于 **资本开支路径**。Morningstar 的资本开支在 **FY28 达到 $1,200 亿峰值**，自由现金流到 FY31 才转正（FY27-31 合计 **-$1,110 亿**）；我的模型峰值为 **$840 亿**，FY30 转正（FY27-31 合计 **+$170 亿**）。资本开支更低，也让我的终值所依据的正常化现金流更大。部分抵消的是：我用 **31.93 亿股**（含 ATM 增发）计算，Morningstar 用 30.26 亿股。现价 **$119.09** 低于两者。"
      },
      "bridge": [
        {
          "driver": {
            "en": "Morningstar's own model: equity $568.0B / 3,026M sh = $187.70 (FVE rounded to $195)",
            "zh": "Morningstar 自己的模型：权益 $5,680 亿 / 30.26 亿股 = $187.70（公布值取整为 $195）"
          },
          "impact": -7.3
        },
        {
          "driver": {
            "en": "Forecast-period cash flows: PV $227.9B (mine, FY27-36) vs $173.1B (Morningstar, 15 yrs); capex peak $84B vs $120B",
            "zh": "预测期现金流：现值 $2,279 亿（我的，FY27-36）对 $1,731 亿（Morningstar，15 年）；资本开支峰值 $840 亿对 $1,200 亿"
          },
          "impact": 18.1
        },
        {
          "driver": {
            "en": "Terminal value: PV $646.2B vs $493.5B; my FY36 FCF ~$100B with capex at 13.5% of sales",
            "zh": "终值：现值 $6,462 亿对 $4,935 亿；我的 FY36 FCF 约 $1,000 亿，资本开支占营收 13.5%"
          },
          "impact": 50.44
        },
        {
          "driver": {
            "en": "Net debt: $97.9B vs $98.6B (about the same)",
            "zh": "净债务：$979 亿对 $986 亿（基本相同）"
          },
          "impact": 0.26
        },
        {
          "driver": {
            "en": "Share count: 3,193M (incl. ATM issuance) vs 3,026M",
            "zh": "股数：31.93 亿股（含 ATM 增发）对 30.26 亿股"
          },
          "impact": -13.42
        }
      ],
      "assumptions": [
        {
          "item": {
            "en": "Value per share",
            "zh": "每股价值"
          },
          "mine": "$243.09",
          "morningstar": "$195.00",
          "sp": "$235.77",
          "note": {
            "en": "Street = average of 42 analysts (StockAnalysis / S&P Global)",
            "zh": "华尔街 = 42 位分析师平均（StockAnalysis / S&P Global）"
          }
        },
        {
          "item": "WACC",
          "mine": "9.6%",
          "morningstar": "9.6%",
          "sp": "10.4%",
          "note": {
            "en": "Cost of equity: mine 11.1% (beta 1.4), Morningstar 10.8%; S&P Global WACC estimate",
            "zh": "股权成本：我的 11.1%（beta 1.4），Morningstar 10.8%；S&P Global 的 WACC 估计"
          }
        },
        {
          "item": {
            "en": "Revenue FY27E / FY31E",
            "zh": "营收 FY27E / FY31E"
          },
          "mine": "$90.2B / $255.5B",
          "morningstar": "$91.1B / $264.2B",
          "sp": "—",
          "note": {
            "en": "5-yr revenue CAGR 30.6% vs 31.4%",
            "zh": "5 年营收 CAGR 30.6% 对 31.4%"
          }
        },
        {
          "item": {
            "en": "OCI 5-yr CAGR (FY26-31)",
            "zh": "OCI 5 年 CAGR（FY26-31）"
          },
          "mine": "61%",
          "morningstar": "62%",
          "sp": "—",
          "note": {
            "en": "FY27E OCI growth: mine 114%, consensus 116%",
            "zh": "FY27E OCI 增长：我的 114%，一致预期 116%"
          }
        },
        {
          "item": {
            "en": "Operating margin FY31E",
            "zh": "营业利润率 FY31E"
          },
          "mine": "28.5%",
          "morningstar": "28.8%",
          "sp": "—",
          "note": {
            "en": "Morningstar: back to 33% by FY35; mine 32% by FY36",
            "zh": "Morningstar：FY35 回到 33%；我的 FY36 为 32%"
          }
        },
        {
          "item": {
            "en": "Capex peak",
            "zh": "资本开支峰值"
          },
          "mine": "$84B (FY28)",
          "morningstar": "$120B (FY28)",
          "sp": "—",
          "note": {
            "en": "Main source of the gap",
            "zh": "差距的主要来源"
          }
        },
        {
          "item": {
            "en": "FCF FY27-31 (sum)",
            "zh": "FCF FY27-31（合计）"
          },
          "mine": "+$17B",
          "morningstar": "-$111B",
          "sp": "—",
          "note": {
            "en": "First positive year: FY30 vs FY31",
            "zh": "首个转正年份：FY30 对 FY31"
          }
        },
        {
          "item": {
            "en": "Diluted shares",
            "zh": "稀释股数"
          },
          "mine": "3,193M",
          "morningstar": "3,026M",
          "sp": "—",
          "note": {
            "en": "Mine includes the Q1 FY27 ATM issuance",
            "zh": "我的包含 Q1 FY27 ATM 增发"
          }
        }
      ]
    },
    "files": [
      {
        "type": "onepage",
        "lang": "en",
        "label": "One Page",
        "path": "reports/orcl/ORCL_OnePage_en.pdf",
        "date": "2026-11-17"
      },
      {
        "type": "onepage",
        "lang": "zh",
        "label": "One Page",
        "path": "reports/orcl/ORCL_OnePage_zh.pdf",
        "date": "2026-11-17"
      }
    ],
    "onepageImage": {
      "en": "reports/orcl/ORCL_OnePage_en.png",
      "zh": "reports/orcl/ORCL_OnePage_zh.png"
    },
    "history": [
      {
        "date": "2026-11-17",
        "note": {
          "en": "One Page V2 with DCF; Morningstar FV $195 and gap bridge added",
          "zh": "One Page V2（含 DCF）；补充 Morningstar 合理价值 $195 与差距拆解"
        }
      },
      {
        "date": "2026-11-08",
        "note": {
          "en": "A4 analyses and 10-year DCF",
          "zh": "A4 分析与 10 年 DCF"
        }
      }
    ],
    "labels": {
      "sp": {
        "en": "Street avg target",
        "zh": "华尔街平均目标价"
      }
    }
  },

{
  "id": "dvn",
  "name": {
    "en": "Devon Energy",
    "zh": "戴文能源"
  },
  "ticker": "DVN",
  "exchange": "NYSE",
  "market": "US",
  "sector": "Energy",
  "industry": "Oil & Gas E&P",
  "indices": [
    "S&P 500",
    "Russell 1000"
  ],
  "updated": "2026-11-16",
  "currency": "USD",
  "price": 44.27,
  "priceDate": "2026-11-16",
  "fairValue": {
    "mine": 69.33,
    "bear": 33.5,
    "bull": 110.68,
    "morningstar": 62,
    "sp": 61.69
  },
  "moat": "Narrow",
  "summary": {
    "en": "A low-cost, multi-basin shale producer absorbing Coterra; at $44 the stock is below even Morningstar's $60-oil case, and the upside rests on synergies, asset sales and buybacks.",
    "zh": "低成本、多盆地的页岩油气生产商，正在整合 Coterra；股价 $44 已低于按 Morningstar $60 油价算出的价值，上行空间来自协同效应、出售资产和回购。"
  },
  "tags": [
    {
      "en": "Oil & gas",
      "zh": "油气"
    },
    "E&P",
    {
      "en": "Shale",
      "zh": "页岩"
    },
    {
      "en": "M&A integration",
      "zh": "并购整合"
    }
  ],
  "business": {
    "en": "### A pure upstream producer\nDevon finds, drills and produces oil, natural gas and NGLs and sells them at market prices. Unlike integrated majors it has no refining or chemicals, so profit = price × volume - unit cost.\n\n### Portfolio\n- **Delaware Basin (Permian):** the core, about two-thirds of production and more than 60% of the 2026 budget.\n- **Williston, Anadarko:** oil and liquids; Williston grew with the 2024 Grayson Mill deal.\n- **Marcellus:** gas added by the all-stock Coterra merger (closed May 7, 2026).\n- **Eagle Ford:** being sold to Crescent for $4.2B (closing Q4 2026 or early 2027).\n\n### Key risks\nOil and gas prices, merger integration, well decline and capex intensity, Waha gas basis, reserve estimates and regulation.",
    "zh": "### 纯上游生产商\nDevon 勘探、钻井并生产原油、天然气和 NGL，按市价出售。与综合性石油巨头不同，它没有炼化和化工业务，因此利润 = 价格 × 产量 - 单位成本。\n\n### 资产组合\n- **Delaware 盆地（Permian）：** 核心资产，约占产量三分之二、2026 年预算 60% 以上。\n- **Williston、Anadarko：** 原油与液体；Williston 因 2024 年收购 Grayson Mill 扩大。\n- **Marcellus：** 全股票合并 Coterra（2026年5月7日完成）带来的天然气资产。\n- **Eagle Ford：** 正以 $42 亿出售给 Crescent（预计 2026 年四季度或 2027 年初完成）。\n\n### 关键风险\n油气价格、合并整合、老井递减与资本开支强度、Waha 气价价差、储量估计和监管。"
  },
  "segments": [],
  "dcf": {
    "wacc": "8.31%",
    "terminalGrowth": "1.5%",
    "horizon": "2026-30",
    "revenueCagr": "Price-driven (WTI $79 → $70)",
    "margin": "EBITDA margin 47–49%",
    "scenarios": [
      {
        "name": "Bear",
        "prob": null,
        "value": 33.5
      },
      {
        "name": "Base",
        "prob": null,
        "value": 69.33
      },
      {
        "name": "Bull",
        "prob": null,
        "value": 110.68
      }
    ]
  },
  "gap": {
    "summary": {
      "en": "My base value of **$69.33** is **$7.33 (11.8%)** above Morningstar's **$62**. Two steps explain it.\n\n- **Step 1 — same oil price, my model: −$9.17.** Running my model on Morningstar's own price forecast ($60 WTI long run) gives **$52.83**, below their $62. So apart from prices, my model is the more conservative one (discount rate, terminal value, synergy credit and the Eagle Ford sale), even though Morningstar assumes lower volumes (1,499 vs 1,625 MBoe/d).\n- **Step 2 — my oil price forecast: +$16.50.** I use the EIA path (WTI $79 in 2027 easing to $70) instead of Morningstar's ($73 easing to $60). That lifts the value from $52.83 to **$69.33**.\n\nIn short, the whole gap is about the long-run oil price. If oil settles near $60, my model says DVN is worth about $53.",
      "zh": "我的基准价值 **$69.33** 比 Morningstar 的 **$62** 高 **$7.33（11.8%）**，可以拆成两步。\n\n- **第 1 步——用同样的油价，换成我的模型：−$9.17。** 用 Morningstar 自己的价格预测（长期 $60 WTI）跑我的模型，得到 **$52.83**，比他们的 $62 低。说明除油价以外，我的模型整体更保守（折现率、终值、协同效应和出售 Eagle Ford 的处理），尽管 Morningstar 假设的产量更低（1,499 vs 1,625 千桶油当量/天）。\n- **第 2 步——换成我的油价预测：+$16.50。** 我采用 EIA 的路径（2027 年 WTI $79，之后回落到 $70），而不是 Morningstar 的（$73 回落到 $60），价值因此从 $52.83 升到 **$69.33**。\n\n简单说，差距全部来自对长期油价的判断。如果油价长期在 $60 左右，我的模型认为 DVN 约值 $53。"
    },
    "bridge": [
      {
        "driver": {
          "en": "Same oil price, my model",
          "zh": "同样的油价，换成我的模型"
        },
        "impact": -9.17
      },
      {
        "driver": {
          "en": "My oil price forecast (WTI $79 → $70)",
          "zh": "换成我的油价预测（WTI $79 → $70）"
        },
        "impact": 16.5
      }
    ],
    "assumptions": [
      {
        "item": {
          "en": "WTI / HH 2027E",
          "zh": "2027E WTI / HH"
        },
        "mine": "$79 / $3.16",
        "morningstar": "$73 / $3.42",
        "sp": "—",
        "note": ""
      },
      {
        "item": {
          "en": "Midcycle price",
          "zh": "中周期价格"
        },
        "mine": "$70 / $3.50",
        "morningstar": "$60 / $3.70",
        "sp": "—",
        "note": ""
      },
      {
        "item": {
          "en": "Production 2027E (MBoe/d)",
          "zh": "2027E 产量（千桶油当量/天）"
        },
        "mine": "1,625",
        "morningstar": "1,499",
        "sp": "—",
        "note": ""
      },
      {
        "item": {
          "en": "EBITDA 2027E",
          "zh": "2027E EBITDA"
        },
        "mine": "$13.8B",
        "morningstar": "$9.4B",
        "sp": "$14.6B",
        "note": {
          "en": "S&P = consensus",
          "zh": "S&P 为一致预期"
        }
      },
      {
        "item": {
          "en": "EPS 2027E",
          "zh": "2027E EPS"
        },
        "mine": "$4.12",
        "morningstar": "$2.39",
        "sp": "$5.41",
        "note": {
          "en": "Mine includes Coterra step-up DD&A",
          "zh": "我的口径含 Coterra 增值折耗"
        }
      }
    ]
  },
  "files": [
    {
      "type": "onepage",
      "lang": "en",
      "label": "One Page",
      "path": "reports/dvn/DVN_OnePage_en.pdf",
      "date": "2026-11-16"
    },
    {
      "type": "onepage",
      "lang": "zh",
      "label": "One Page",
      "path": "reports/dvn/DVN_OnePage_zh.pdf",
      "date": "2026-11-16"
    }
  ],
  "onepageImage": {
    "en": "reports/dvn/DVN_OnePage_en.png",
    "zh": "reports/dvn/DVN_OnePage_zh.png"
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
      "date": "2026-11-02",
      "note": {
        "en": "Pitch: preliminary Buy, base $69.33",
        "zh": "推介：初步买入，基准 $69.33"
      }
    }
  ]
},


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
