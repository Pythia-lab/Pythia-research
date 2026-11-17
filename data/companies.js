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
    "id": "msft",
    "name": {
      "en": "Microsoft",
      "zh": "微软"
    },
    "ticker": "MSFT",
    "exchange": "NASDAQ",
    "market": "US",
    "sector": "Information Technology",
    "industry": "Systems Software",
    "indices": [
      "S&P 500",
      "Nasdaq-100",
      "Dow 30",
      "Russell 1000"
    ],
    "updated": "2026-11-17",
    "currency": "USD",
    "price": 517.99,
    "priceDate": "2026-11-16",
    "fairValue": {
      "mine": 404.69,
      "bear": 283.37,
      "bull": 416.25,
      "morningstar": 600.0,
      "sp": 636.12
    },
    "moat": "Wide",
    "summary": {
      "en": "Cloud and AI growth has reaccelerated, but capex now takes 63% of operating cash flow; my DCF ($404.69) is below the price because I discount at 9.7% and need capex to fall back to ~21% of revenue.",
      "zh": "云与 AI 增长重新加速，但资本开支已占经营现金流的 63%；我的 DCF（$404.69）低于股价，因为我用 9.7% 的折现率，并要求资本开支回落到营收的约 21%。"
    },
    "tags": [
      {
        "en": "Cloud",
        "zh": "云计算"
      },
      "AI",
      {
        "en": "Software",
        "zh": "软件"
      },
      {
        "en": "Capex cycle",
        "zh": "资本开支周期"
      }
    ],
    "business": {
      "en": "### Two segments (from FY2027)\n- **Agents and Infra (81% of FY26 revenue, 50.9% margin):** Azure, Microsoft 365 cloud, Dynamics, server products and industry solutions.\n- **Devices and Consumer (19%, 29.6% margin):** Windows OEM and devices, search and advertising, Xbox.\n\n### What changed\nAI demand pushed Azure growth to +48% and commercial RPO to $677B, but capex rose to 35% of revenue in FY26 and about 50% (incl. leases) in FY27.\n\n### Key risks\nAI demand and pricing, depreciation of the capex wave, capacity constraints, and the value of the OpenAI stake.",
      "zh": "### 两大分部（FY2027 起）\n- **智能体与基础设施（占 FY26 营收 81%，利润率 50.9%）：** Azure、Microsoft 365 云、Dynamics、服务器产品与行业解决方案。\n- **设备与消费者（19%，利润率 29.6%）：** Windows OEM 与设备、搜索与广告、Xbox。\n\n### 发生了什么变化\nAI 需求把 Azure 增速推到 +48%，商业 RPO 达 $6,770 亿；但资本开支在 FY26 升至营收的 35%，FY27（含租赁）约 50%。\n\n### 关键风险\nAI 需求与定价、资本开支浪潮带来的折旧、算力供给约束，以及 OpenAI 股权的价值。"
    },
    "segments": [
      {
        "name": {
          "en": "Agents and Infra",
          "zh": "智能体与基础设施"
        },
        "share": 80.8
      },
      {
        "name": {
          "en": "Devices and Consumer",
          "zh": "设备与消费者"
        },
        "share": 19.2
      }
    ],
    "dcf": {
      "wacc": "9.7%",
      "terminalGrowth": "3.0%",
      "horizon": "FY27-31",
      "revenueCagr": "13.7% (FY26-31, blended)",
      "margin": "EBIT margin 46.8% → 47.6% (FY31E)",
      "scenarios": [
        {
          "name": "Bear",
          "prob": null,
          "value": 283.37
        },
        {
          "name": "Base",
          "prob": null,
          "value": 404.69
        },
        {
          "name": "Bull",
          "prob": null,
          "value": 416.25
        }
      ]
    },
    "gap": {
      "summary": {
        "en": "My blended base value is **$404.69**, **33% below** Morningstar's **$600** (dated Jul 30, 2026) and 36% below the Street average target (**$636.12**). My revenue path is close to consensus (FY27 $396B), so the gap comes from **valuation inputs**: a **9.7% WACC** (10-year Treasury 5.15%, beta 1.05) and capex that only falls to **21% of revenue by FY31**, keeping FCF well below operating earnings. At a 0.6 beta the value would be **$584**, close to Morningstar. A step-by-step bridge will be added when the Morningstar report is uploaded.",
        "zh": "我的混合基准价值为 **$404.69**，比 Morningstar 的 **$600**（2026年7月30日）低 **33%**，比华尔街平均目标价（**$636.12**）低 36%。我的营收路径接近一致预期（FY27 $3,960 亿），差距来自 **估值参数**：**9.7% 的 WACC**（10 年期美债 5.15%，beta 1.05），以及资本开支到 **FY31 才降到营收的 21%**，使 FCF 明显低于经营利润。若 beta 为 0.6，价值为 **$584**，接近 Morningstar。上传 Morningstar 报告后将补充逐项拆解。"
      },
      "bridge": [],
      "assumptions": [
        {
          "item": {
            "en": "Value per share",
            "zh": "每股价值"
          },
          "mine": "$404.69",
          "morningstar": "$600",
          "sp": "$636.12",
          "note": {
            "en": "Street = average of 58 analysts (S&P Global)",
            "zh": "华尔街 = 58 位分析师平均（S&P Global）"
          }
        },
        {
          "item": "WACC",
          "mine": "9.7%",
          "morningstar": "—",
          "sp": "9.7%",
          "note": {
            "en": "S&P Global WACC estimate",
            "zh": "S&P Global 的 WACC 估计"
          }
        },
        {
          "item": {
            "en": "FY27E / FY28E revenue",
            "zh": "FY27E / FY28E 营收"
          },
          "mine": "$396B / $458B",
          "morningstar": "—",
          "sp": "$396B / $437B",
          "note": {
            "en": "Street = consensus",
            "zh": "华尔街 = 一致预期"
          }
        },
        {
          "item": {
            "en": "FY27E capex / revenue",
            "zh": "FY27E 资本开支/营收"
          },
          "mine": "50%",
          "morningstar": "—",
          "sp": "—",
          "note": {
            "en": "Incl. finance leases; 21% by FY31",
            "zh": "含融资租赁；FY31 为 21%"
          }
        },
        {
          "item": {
            "en": "FY27E FCF",
            "zh": "FY27E FCF"
          },
          "mine": "—",
          "morningstar": "—",
          "sp": "$32.6B",
          "note": {
            "en": "S&P consensus",
            "zh": "S&P 一致预期"
          }
        }
      ]
    },
    "files": [
      {
        "type": "onepage",
        "lang": "en",
        "label": "One Page",
        "path": "reports/msft/MSFT_OnePage_en.pdf",
        "date": "2026-11-17"
      },
      {
        "type": "onepage",
        "lang": "zh",
        "label": "One Page",
        "path": "reports/msft/MSFT_OnePage_zh.pdf",
        "date": "2026-11-17"
      }
    ],
    "onepageImage": {
      "en": "reports/msft/MSFT_OnePage_en.png",
      "zh": "reports/msft/MSFT_OnePage_zh.png"
    },
    "history": [
      {
        "date": "2026-11-17",
        "note": {
          "en": "One Page V2 with DCF",
          "zh": "One Page V2（含 DCF）"
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
    "id": "ms",
    "name": {
      "en": "Morgan Stanley",
      "zh": "摩根士丹利"
    },
    "ticker": "MS",
    "exchange": "NYSE",
    "market": "US",
    "sector": "Financials",
    "industry": "Brokerage & Investment Banking",
    "indices": [
      "S&P 500",
      "Russell 1000"
    ],
    "updated": "2026-11-17",
    "currency": "USD",
    "price": 185.57,
    "priceDate": "2026-11-16",
    "fairValue": {
      "mine": 159.64,
      "bear": 117.68,
      "bull": 164.48,
      "morningstar": null,
      "sp": 211.5
    },
    "moat": "",
    "summary": {
      "en": "Wealth management turned a trading house into a fee business earning 20%+ on tangible equity; at 3.5x tangible book the price already assumes that lasts, and my equity value ($159.64) is 14% lower.",
      "zh": "财富管理把一家交易型投行变成了以收费为主、有形权益回报 20% 以上的公司；股价已是有形账面的 3.5 倍，假设这种回报会持续，我的股权价值（$159.64）低 14%。"
    },
    "tags": [
      {
        "en": "Wealth management",
        "zh": "财富管理"
      },
      {
        "en": "Investment banking",
        "zh": "投资银行"
      },
      {
        "en": "Trading",
        "zh": "交易"
      },
      {
        "en": "Bank capital",
        "zh": "银行资本"
      }
    ],
    "business": {
      "en": "### Three segments\n- **Institutional Securities (47% of FY25 net revenues):** investment banking, equities and fixed-income trading; 34% pre-tax margin.\n- **Wealth Management (45%):** advice and brokerage for individuals, including E*TRADE; 29.3% margin and recurring fees.\n- **Investment Management (9%):** asset management including Eaton Vance; 21.6% margin.\n\n### Why it is valued on equity\nFor a bank, debt and deposits fund trading inventory and loans, so enterprise value and WACC are not meaningful. Value comes from returns on tangible equity above the cost of equity, and from capital that can be paid out above the CET1 requirement.\n\n### Key risks\nMarket downturns (lower fees and trading), regulatory capital changes, and competition for wealth clients.",
      "zh": "### 三大分部\n- **机构证券（占 FY25 净收入 47%）：** 投资银行、股票与固定收益交易；税前利润率 34%。\n- **财富管理（45%）：** 为个人客户提供顾问与经纪服务（含 E*TRADE）；利润率 29.3%，收入可重复。\n- **投资管理（9%）：** 资产管理（含 Eaton Vance）；利润率 21.6%。\n\n### 为什么按股权估值\n对银行来说，债务和存款是交易存货和贷款的资金来源，企业价值和 WACC 没有意义。价值来自高于股权成本的有形权益回报，以及高于 CET1 要求、可以分配的资本。\n\n### 关键风险\n市场下行（费用与交易收入下降）、监管资本要求变化，以及财富客户的竞争。"
    },
    "segments": [
      {
        "name": {
          "en": "Institutional Securities",
          "zh": "机构证券"
        },
        "share": 46.8
      },
      {
        "name": {
          "en": "Wealth Management",
          "zh": "财富管理"
        },
        "share": 44.9
      },
      {
        "name": {
          "en": "Investment Management",
          "zh": "投资管理"
        },
        "share": 9.2
      }
    ],
    "dcf": {
      "wacc": "10.6%",
      "terminalGrowth": "3.5% / 2%",
      "horizon": "2026-30",
      "revenueCagr": "7.0% (2025-30, blended)",
      "margin": "Pre-tax margin 31% → 32% (2030E)",
      "scenarios": [
        {
          "name": "Bear",
          "prob": null,
          "value": 117.68
        },
        {
          "name": "Base",
          "prob": null,
          "value": 159.64
        },
        {
          "name": "Bull",
          "prob": null,
          "value": 164.48
        }
      ]
    },
    "gap": {
      "summary": {
        "en": "My blended value is **$159.64**, **14% below** the price (**$185.57**) and 25% below the Street average target (**$211.50**). It averages two equity methods: residual income (**$151.14**) and distributable capital (**$168.13**), at a **10.6% cost of equity** (beta 1.22). After a strong 2026, I grow net revenues only about **4.5% a year** and hold ROTCE near 25-26%; the market price implies either faster growth or a lower discount rate. Morningstar's fair value will be added when the report is uploaded.",
        "zh": "我的混合价值为 **$159.64**，比现价（**$185.57**）低 **14%**，比华尔街平均目标价（**$211.50**）低 25%。它是两种股权估值方法的平均：剩余收益（**$151.14**）和可分配资本（**$168.13**），股权成本 **10.6%**（beta 1.22）。在 2026 年强劲增长之后，我只让净收入每年增长约 **4.5%**，ROTCE 保持在 25-26%；市场价格意味着更快的增长或更低的折现率。Morningstar 的合理价值将在上传报告后补充。"
      },
      "bridge": [],
      "assumptions": [
        {
          "item": {
            "en": "Value per share",
            "zh": "每股价值"
          },
          "mine": "$159.64",
          "morningstar": "—",
          "sp": "$211.50",
          "note": {
            "en": "Street = analyst average (S&P Global)",
            "zh": "华尔街 = 分析师平均（S&P Global）"
          }
        },
        {
          "item": {
            "en": "Cost of equity",
            "zh": "股权成本"
          },
          "mine": "10.6%",
          "morningstar": "—",
          "sp": "—",
          "note": {
            "en": "rf 5.15% + 1.22 x 4.5%",
            "zh": "无风险利率 5.15% + 1.22 × 4.5%"
          }
        },
        {
          "item": {
            "en": "Net revenues 2026E / 2030E",
            "zh": "净收入 2026E / 2030E"
          },
          "mine": "$82.4B / $99.1B",
          "morningstar": "—",
          "sp": "—",
          "note": ""
        },
        {
          "item": {
            "en": "ROTCE 2026E / 2030E",
            "zh": "ROTCE 2026E / 2030E"
          },
          "mine": "24.4% / 26.3%",
          "morningstar": "—",
          "sp": "—",
          "note": {
            "en": "FY25 actual 21.6%",
            "zh": "FY25 实际 21.6%"
          }
        },
        {
          "item": {
            "en": "Target CET1",
            "zh": "目标 CET1"
          },
          "mine": "13.5% (2028+)",
          "morningstar": "—",
          "sp": "—",
          "note": {
            "en": "Requirement 11.8%",
            "zh": "要求 11.8%"
          }
        }
      ]
    },
    "files": [
      {
        "type": "onepage",
        "lang": "en",
        "label": "One Page",
        "path": "reports/ms/MS_OnePage_en.pdf",
        "date": "2026-11-17"
      },
      {
        "type": "onepage",
        "lang": "zh",
        "label": "One Page",
        "path": "reports/ms/MS_OnePage_zh.pdf",
        "date": "2026-11-17"
      }
    ],
    "onepageImage": {
      "en": "reports/ms/MS_OnePage_en.png",
      "zh": "reports/ms/MS_OnePage_zh.png"
    },
    "history": [
      {
        "date": "2026-11-17",
        "note": {
          "en": "One Page (bank layout) with equity valuation",
          "zh": "One Page（银行版式）含股权估值"
        }
      }
    ],
    "labels": {
      "mine": {"en": "My value", "zh": "我的估值"},
      "waccG": {"en": "Cost of equity / g", "zh": "股权成本 / 永续增长"},
      "wacc": {"en": "Cost of equity", "zh": "股权成本"},
      "secDcf": {"en": "Valuation summary", "zh": "估值摘要"},
      "sp": {
        "en": "Street avg target",
        "zh": "华尔街平均目标价"
      }
    }
  },

  {
    "id": "cl",
    "name": {
      "en": "Colgate-Palmolive",
      "zh": "高露洁棕榄"
    },
    "ticker": "CL",
    "exchange": "NYSE",
    "market": "US",
    "sector": "Consumer Staples",
    "industry": "Household Products",
    "indices": [
      "S&P 500",
      "Russell 1000"
    ],
    "updated": "2026-11-17",
    "currency": "USD",
    "price": 100.99,
    "priceDate": "2026-11-16",
    "fairValue": {
      "mine": 82.56,
      "bear": 67.96,
      "bull": 84.04,
      "morningstar": null,
      "sp": 101.7
    },
    "moat": "",
    "summary": {
      "en": "A steady oral-care and pet-food cash machine that pays out more than it earns in FCF; my DCF ($82.56) sits below the price because I use a normal staples beta, not the unusually low raw beta.",
      "zh": "稳健的口腔护理与宠物食品现金机器，分配额超过 FCF；我的 DCF（$82.56）低于股价，因为我用的是正常的必需消费品 beta，而不是异常低的原始 beta。"
    },
    "tags": [
      {
        "en": "Consumer staples",
        "zh": "必需消费品"
      },
      {
        "en": "Oral care",
        "zh": "口腔护理"
      },
      {
        "en": "Pet food",
        "zh": "宠物食品"
      },
      {
        "en": "Emerging markets",
        "zh": "新兴市场"
      }
    ],
    "business": {
      "en": "### Two businesses\n- **Oral, Personal & Home Care (77% of FY25 sales):** toothpaste, toothbrushes, soap, home care, sold through five regions; Latin America is the largest ($4.8B) and most profitable (29.5% margin).\n- **Hill's Pet Nutrition (23%):** premium and therapeutic pet food; 23.1% margin.\n\n### How it makes money\nPricing power keeps gross margin near 60%; capex is under 3% of sales, so most operating cash flow is free cash flow, which is paid out as dividends and buybacks.\n\n### Key risks\nInput-cost inflation, emerging-market currencies, private-label trade-down, and slower Hill's growth.",
      "zh": "### 两大业务\n- **口腔、个人与家居护理（占 FY25 销售 77%）：** 牙膏、牙刷、香皂、家居清洁，分五个地区经营；拉丁美洲规模最大（$48 亿）、利润率最高（29.5%）。\n- **Hill's 宠物营养（23%）：** 高端与处方宠物食品；利润率 23.1%。\n\n### 怎样赚钱\n定价能力让毛利率保持在 60% 左右；资本开支不到销售的 3%，经营现金流大部分成为自由现金流，用于分红和回购。\n\n### 关键风险\n原材料成本上涨、新兴市场汇率、消费降级至自有品牌、Hill's 增长放缓。"
    },
    "segments": [
      {
        "name": {
          "en": "Oral, Personal & Home Care",
          "zh": "口腔、个人与家居护理"
        },
        "share": 77.4
      },
      {
        "name": {
          "en": "Hill's Pet Nutrition",
          "zh": "Hill's 宠物营养"
        },
        "share": 22.6
      }
    ],
    "dcf": {
      "wacc": "7.5%",
      "terminalGrowth": "2.5%",
      "horizon": "2026-30",
      "revenueCagr": "3.9% (2025-30, blended)",
      "margin": "EBIT margin 16% → 22% (2030E, before one-offs)",
      "scenarios": [
        {
          "name": "Bear",
          "prob": null,
          "value": 67.96
        },
        {
          "name": "Base",
          "prob": null,
          "value": 82.56
        },
        {
          "name": "Bull",
          "prob": null,
          "value": 84.04
        }
      ]
    },
    "gap": {
      "summary": {
        "en": "My blended base value is **$82.56**, **19% below** the Street average target (**$101.70**) and the price (**$100.99**). Revenue and margins are close to consensus (my consensus case is $81.09), so the gap is the **discount rate**: I use a **beta of 0.6** (WACC 7.5%) because the raw five-year beta of 0.31 is abnormally low; with the raw beta the value is **$111.82**. Morningstar's fair value will be added when the report is uploaded.",
        "zh": "我的混合基准价值为 **$82.56**，比华尔街平均目标价（**$101.70**）和现价（**$100.99**）低 **19%**。营收和利润率与一致预期接近（我的一致预期情景为 $81.09），差距来自 **折现率**：我用 **0.6 的 beta**（WACC 7.5%），因为 5 年原始 beta 0.31 异常偏低；若用原始 beta，价值为 **$111.82**。Morningstar 的合理价值将在上传报告后补充。"
      },
      "bridge": [],
      "assumptions": [
        {
          "item": {
            "en": "Value per share",
            "zh": "每股价值"
          },
          "mine": "$82.56",
          "morningstar": "—",
          "sp": "$101.70",
          "note": {
            "en": "Street = average of 21 analysts (S&P Global)",
            "zh": "华尔街 = 21 位分析师平均（S&P Global）"
          }
        },
        {
          "item": "WACC",
          "mine": "7.5%",
          "morningstar": "—",
          "sp": "5.6%",
          "note": {
            "en": "S&P Global WACC uses the raw beta",
            "zh": "S&P Global 的 WACC 使用原始 beta"
          }
        },
        {
          "item": "Beta",
          "mine": "0.60",
          "morningstar": "—",
          "sp": "0.31",
          "note": {
            "en": "Raw 5-year beta",
            "zh": "5 年原始 beta"
          }
        },
        {
          "item": {
            "en": "Revenue 2026E / 2027E",
            "zh": "营收 2026E / 2027E"
          },
          "mine": "$21.4B / $22.2B",
          "morningstar": "—",
          "sp": "$21.4B / $22.1B",
          "note": {
            "en": "Street = consensus",
            "zh": "华尔街 = 一致预期"
          }
        },
        {
          "item": {
            "en": "2030E EBIT margin",
            "zh": "2030E EBIT 利润率"
          },
          "mine": "22.2%",
          "morningstar": "—",
          "sp": "—",
          "note": {
            "en": "FY25 GAAP 16.2% incl. impairments",
            "zh": "FY25 GAAP 16.2%（含减值）"
          }
        }
      ]
    },
    "files": [
      {
        "type": "onepage",
        "lang": "en",
        "label": "One Page",
        "path": "reports/cl/CL_OnePage_en.pdf",
        "date": "2026-11-17"
      },
      {
        "type": "onepage",
        "lang": "zh",
        "label": "One Page",
        "path": "reports/cl/CL_OnePage_zh.pdf",
        "date": "2026-11-17"
      }
    ],
    "onepageImage": {
      "en": "reports/cl/CL_OnePage_en.png",
      "zh": "reports/cl/CL_OnePage_zh.png"
    },
    "history": [
      {
        "date": "2026-11-17",
        "note": {
          "en": "One Page V2 with DCF",
          "zh": "One Page V2（含 DCF）"
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
    "id": "eog",
    "name": {
      "en": "EOG Resources",
      "zh": "EOG资源"
    },
    "ticker": "EOG",
    "exchange": "NYSE",
    "market": "US",
    "sector": "Energy",
    "industry": "Oil & Gas E&P",
    "indices": [
      "S&P 500",
      "Russell 1000"
    ],
    "updated": "2026-11-17",
    "currency": "USD",
    "price": 155.47,
    "priceDate": "2026-11-16",
    "fairValue": {
      "mine": 146.17,
      "bear": 73.24,
      "bull": 231.36,
      "morningstar": null,
      "sp": 167.14
    },
    "moat": "",
    "summary": {
      "en": "A low-cost U.S. oil producer whose value is set by the price deck: at mid-cycle WTI ~$70 my base value ($146.17) is a little below the price.",
      "zh": "低成本的美国石油生产商，估值由油气价格假设决定：在 WTI 约 $70 的中周期价格下，我的基准价值（$146.17）略低于股价。"
    },
    "tags": [
      {
        "en": "Oil & gas",
        "zh": "油气"
      },
      {
        "en": "Shale",
        "zh": "页岩油"
      },
      {
        "en": "Natural gas",
        "zh": "天然气"
      },
      {
        "en": "Commodity cycle",
        "zh": "商品周期"
      }
    ],
    "business": {
      "en": "### What EOG sells\n- **Crude oil & condensate (55% of FY25 revenue):** Delaware Basin, Eagle Ford and other U.S. shale plays.\n- **Natural gas (12%) and NGLs (10%):** growing after the Encino (Utica) acquisition in Aug 2025 and the Dorado gas play.\n- **Gathering, processing & marketing (22%):** mostly resale of third-party volumes at a thin margin.\n\n### How it makes money\nEOG is a price-taker, so it competes on cost: cash operating cost has stayed near $10.3/Boe, and in FY21-25 it reinvested 41-61% of operating cash flow, paying out the rest as dividends and buybacks.\n\n### Key risks\nOil and gas prices, well productivity and cost inflation, and the integration of Encino.",
      "zh": "### EOG 卖什么\n- **原油与凝析油（占 FY25 营收 55%）：** Delaware 盆地、Eagle Ford 等美国页岩区。\n- **天然气（12%）与 NGL（10%）：** 2025年8月收购 Encino（Utica）及 Dorado 气田后增长。\n- **集输、处理与营销（22%）：** 主要是转售第三方油气，利润很薄。\n\n### 怎样赚钱\nEOG 无法决定价格，只能靠成本竞争：现金经营成本保持在约 $10.3/桶油当量，FY21-25 把经营现金流的 41-61% 用于再投资，其余用于分红和回购。\n\n### 关键风险\n油气价格、单井产量与成本通胀，以及 Encino 的整合。"
    },
    "segments": [
      {
        "name": {
          "en": "Crude oil & condensate",
          "zh": "原油与凝析油"
        },
        "share": 55.2
      },
      {
        "name": {
          "en": "Gathering, marketing & other",
          "zh": "集输、营销及其他"
        },
        "share": 22.0
      },
      {
        "name": {
          "en": "Natural gas",
          "zh": "天然气"
        },
        "share": 12.3
      },
      {
        "name": {
          "en": "Natural gas liquids",
          "zh": "天然气凝液"
        },
        "share": 10.5
      }
    ],
    "dcf": {
      "wacc": "8.6%",
      "terminalGrowth": "1.5%",
      "horizon": "2026-30",
      "revenueCagr": "-2.9% (2026-30E, base deck)",
      "margin": "EBIT margin 38% (2026E) → 29% (2030E)",
      "scenarios": [
        {
          "name": "Bear",
          "prob": null,
          "value": 73.24
        },
        {
          "name": "Base",
          "prob": null,
          "value": 146.17
        },
        {
          "name": "Bull",
          "prob": null,
          "value": 231.36
        }
      ]
    },
    "gap": {
      "summary": {
        "en": "My base value is **$146.17**, **6% below** the price (**$155.47**) and 13% below the Street average target (**$167.14**). Volumes and costs follow company guidance, so the gap is mostly the **price deck**: I let WTI fade from $87 in 2026 to **$70 by 2030** and use a **0.9 beta** (WACC 8.6%) instead of the raw 0.37. With the raw beta the value would be $213. Morningstar's fair value will be added when the report is uploaded.",
        "zh": "我的基准价值为 **$146.17**，比现价（**$155.47**）低 **6%**，比华尔街平均目标价（**$167.14**）低 13%。产量和成本按公司指引，差距主要来自 **价格假设**：我让 WTI 从 2026 年的 $87 回落到 **2030 年的 $70**，并用 **0.9 的 beta**（WACC 8.6%）而不是原始的 0.37。若用原始 beta，价值约 $213。Morningstar 的合理价值将在上传报告后补充。"
      },
      "bridge": [],
      "assumptions": [
        {
          "item": {
            "en": "Value per share",
            "zh": "每股价值"
          },
          "mine": "$146.17",
          "morningstar": "—",
          "sp": "$167.14",
          "note": {
            "en": "Street = average of 33 analysts (S&P Global)",
            "zh": "华尔街 = 33 位分析师平均（S&P Global）"
          }
        },
        {
          "item": "WACC",
          "mine": "8.6%",
          "morningstar": "—",
          "sp": "6.0%",
          "note": {
            "en": "S&P Global WACC uses the raw beta 0.37",
            "zh": "S&P Global 的 WACC 使用原始 beta 0.37"
          }
        },
        {
          "item": {
            "en": "WTI 2027E / 2030E",
            "zh": "WTI 2027E / 2030E"
          },
          "mine": "$79 / $70",
          "morningstar": "—",
          "sp": "—",
          "note": {
            "en": "2027 from EIA STEO less WTI-Brent spread",
            "zh": "2027 年取 EIA STEO 减 WTI-Brent 价差"
          }
        },
        {
          "item": {
            "en": "Henry Hub 2027E / 2030E",
            "zh": "Henry Hub 2027E / 2030E"
          },
          "mine": "$3.16 / $3.50",
          "morningstar": "—",
          "sp": "—",
          "note": {
            "en": "EIA STEO Oct 2026, then LNG demand",
            "zh": "EIA 2026年10月 STEO，之后看 LNG 需求"
          }
        },
        {
          "item": {
            "en": "2026E revenue",
            "zh": "2026E 营收"
          },
          "mine": "$31.0B",
          "morningstar": "—",
          "sp": "$29.9B",
          "note": {
            "en": "Street = S&P consensus",
            "zh": "华尔街 = S&P 一致预期"
          }
        }
      ]
    },
    "files": [
      {
        "type": "onepage",
        "lang": "en",
        "label": "One Page",
        "path": "reports/eog/EOG_OnePage_en.pdf",
        "date": "2026-11-17"
      },
      {
        "type": "onepage",
        "lang": "zh",
        "label": "One Page",
        "path": "reports/eog/EOG_OnePage_zh.pdf",
        "date": "2026-11-17"
      }
    ],
    "onepageImage": {
      "en": "reports/eog/EOG_OnePage_en.png",
      "zh": "reports/eog/EOG_OnePage_zh.png"
    },
    "history": [
      {
        "date": "2026-11-17",
        "note": {
          "en": "One Page V2 with DCF",
          "zh": "One Page V2（含 DCF）"
        }
      },
      {
        "date": "2026-10-30",
        "note": {
          "en": "DCF model (price deck)",
          "zh": "DCF 模型（价格假设）"
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
    "id": "eqt",
    "name": {
      "en": "EQT Corporation",
      "zh": "EQT公司"
    },
    "ticker": "EQT",
    "exchange": "NYSE",
    "market": "US",
    "sector": "Energy",
    "industry": "Oil & Gas E&P",
    "indices": [
      "S&P 500",
      "Russell 1000"
    ],
    "updated": "2026-11-17",
    "currency": "USD",
    "price": 51.24,
    "priceDate": "2026-11-16",
    "fairValue": {
      "mine": 54.4,
      "bear": 24.15,
      "bull": 85.28,
      "morningstar": null,
      "sp": 66.27
    },
    "moat": "",
    "summary": {
      "en": "The largest U.S. natural-gas producer, now with its own pipelines: after years of share-funded growth it generates real FCF and is paying down debt; my base value ($54.40) is close to the price.",
      "zh": "美国最大的天然气生产商，现在拥有自己的管道：经历多年发股扩张后，已产生真实的 FCF 并在还债；我的基准价值（$54.40）接近股价。"
    },
    "tags": [
      {
        "en": "Natural gas",
        "zh": "天然气"
      },
      {
        "en": "Appalachia",
        "zh": "阿巴拉契亚"
      },
      {
        "en": "Midstream",
        "zh": "中游管道"
      },
      {
        "en": "LNG demand",
        "zh": "LNG 需求"
      }
    ],
    "business": {
      "en": "### What EQT does\n- **Upstream (81% of FY25 segment revenue):** natural gas from the Marcellus and Utica shales in Appalachia; 2,382 Bcfe sold in FY25.\n- **Gathering (13%) and Transmission (6%):** pipelines reacquired with Equitrans in 2024; most of their revenue is EQT's own gas, plus a stake in the Mountain Valley Pipeline.\n\n### How it makes money\nVolume x realised gas price, less a low unit cost (~$1.09/Mcfe). Owning the pipes lowers cost and gives access to more markets.\n\n### Key risks\nHenry Hub prices, Appalachian takeaway capacity, hedging results, and execution on integrating acquisitions.",
      "zh": "### EQT 做什么\n- **上游（占 FY25 分部收入 81%）：** 阿巴拉契亚地区 Marcellus 和 Utica 页岩气；FY25 销售 2,382 Bcfe。\n- **集输（13%）与输气（6%）：** 2024 年随 Equitrans 重新收购的管道；大部分收入来自自产气，另持有 Mountain Valley 管道股权。\n\n### 怎样赚钱\n销量 × 实现气价，减去较低的单位成本（约 $1.09/Mcfe）。拥有管道降低了成本，并能进入更多市场。\n\n### 关键风险\nHenry Hub 价格、阿巴拉契亚外输能力、套保结果，以及收购整合。"
    },
    "segments": [
      {
        "name": {
          "en": "Upstream",
          "zh": "上游"
        },
        "share": 81.1
      },
      {
        "name": {
          "en": "Gathering",
          "zh": "集输"
        },
        "share": 13.1
      },
      {
        "name": {
          "en": "Transmission",
          "zh": "输气"
        },
        "share": 5.8
      }
    ],
    "dcf": {
      "wacc": "8.5%",
      "terminalGrowth": "1.5%",
      "horizon": "2026-30",
      "revenueCagr": "1.3% (2026-30E, base deck)",
      "margin": "EBIT margin 40% (2026E) → 41% (2030E)",
      "scenarios": [
        {
          "name": "Bear",
          "prob": null,
          "value": 24.15
        },
        {
          "name": "Base",
          "prob": null,
          "value": 54.4
        },
        {
          "name": "Bull",
          "prob": null,
          "value": 85.28
        }
      ]
    },
    "gap": {
      "summary": {
        "en": "My base value is **$54.40**, **6% above** the price (**$51.24**) but 18% below the Street average target (**$66.27**). Volumes and capex follow guidance; the difference is the **gas deck** (Henry Hub $3.16 in 2027 rising to $3.50) and the **0.9 beta** (WACC 8.5%; S&P Global uses 7.4%). With a 0.65 beta the value is about $64, close to the Street. Morningstar's fair value will be added when the report is uploaded.",
        "zh": "我的基准价值为 **$54.40**，比现价（**$51.24**）高 **6%**，但比华尔街平均目标价（**$66.27**）低 18%。产量和资本开支按公司指引；差距来自 **天然气价格假设**（Henry Hub 2027 年 $3.16，逐步升至 $3.50）和 **0.9 的 beta**（WACC 8.5%；S&P Global 用 7.4%）。若 beta 为 0.65，价值约 $64，接近华尔街。Morningstar 的合理价值将在上传报告后补充。"
      },
      "bridge": [],
      "assumptions": [
        {
          "item": {
            "en": "Value per share",
            "zh": "每股价值"
          },
          "mine": "$54.40",
          "morningstar": "—",
          "sp": "$66.27",
          "note": {
            "en": "Street = average of 22 analysts (S&P Global)",
            "zh": "华尔街 = 22 位分析师平均（S&P Global）"
          }
        },
        {
          "item": "WACC",
          "mine": "8.5%",
          "morningstar": "—",
          "sp": "7.4%",
          "note": {
            "en": "S&P Global WACC estimate",
            "zh": "S&P Global 的 WACC 估计"
          }
        },
        {
          "item": {
            "en": "Henry Hub 2027E / 2030E",
            "zh": "Henry Hub 2027E / 2030E"
          },
          "mine": "$3.16 / $3.50",
          "morningstar": "—",
          "sp": "—",
          "note": {
            "en": "EIA STEO Oct 2026, then LNG demand",
            "zh": "EIA 2026年10月 STEO，之后看 LNG 需求"
          }
        },
        {
          "item": {
            "en": "2026E revenue",
            "zh": "2026E 营收"
          },
          "mine": "$8.6B",
          "morningstar": "—",
          "sp": "$9.1B",
          "note": {
            "en": "Street = S&P consensus",
            "zh": "华尔街 = S&P 一致预期"
          }
        },
        {
          "item": {
            "en": "2026E capex",
            "zh": "2026E 资本开支"
          },
          "mine": "$2.68B",
          "morningstar": "—",
          "sp": "—",
          "note": {
            "en": "Company guidance",
            "zh": "公司指引"
          }
        }
      ]
    },
    "files": [
      {
        "type": "onepage",
        "lang": "en",
        "label": "One Page",
        "path": "reports/eqt/EQT_OnePage_en.pdf",
        "date": "2026-11-17"
      },
      {
        "type": "onepage",
        "lang": "zh",
        "label": "One Page",
        "path": "reports/eqt/EQT_OnePage_zh.pdf",
        "date": "2026-11-17"
      }
    ],
    "onepageImage": {
      "en": "reports/eqt/EQT_OnePage_en.png",
      "zh": "reports/eqt/EQT_OnePage_zh.png"
    },
    "history": [
      {
        "date": "2026-11-17",
        "note": {
          "en": "One Page V2 with DCF",
          "zh": "One Page V2（含 DCF）"
        }
      },
      {
        "date": "2026-10-30",
        "note": {
          "en": "DCF model (price deck)",
          "zh": "DCF 模型（价格假设）"
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
