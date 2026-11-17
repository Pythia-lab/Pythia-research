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
    "id": "swk",
    "name": {
      "en": "Stanley Black & Decker",
      "zh": "史丹利百得"
    },
    "ticker": "SWK",
    "exchange": "NYSE",
    "market": "US",
    "sector": "Industrials",
    "industry": "Industrial Machinery",
    "indices": [
      "S&P 500",
      "Russell 1000"
    ],
    "updated": "2026-11-17",
    "currency": "USD",
    "price": 112.92,
    "priceDate": "2026-11-16",
    "fairValue": {
      "mine": 101.85,
      "bear": 68.65,
      "bull": 103.64,
      "morningstar": null,
      "sp": 113.36
    },
    "moat": "",
    "summary": {
      "en": "A tool brand house repairing margins and paying down debt after the 2022 inventory bust; my DCF ($101.85) is 10% below the price, which already prices most of the margin recovery.",
      "zh": "在 2022 年库存危机后修复利润率、降低债务的工具品牌公司；我的 DCF（$101.85）比股价低 10%，股价已反映了大部分利润率修复。"
    },
    "tags": [
      {
        "en": "Tools",
        "zh": "工具"
      },
      {
        "en": "Housing cycle",
        "zh": "房地产周期"
      },
      {
        "en": "Turnaround",
        "zh": "扭转"
      },
      {
        "en": "Dividend",
        "zh": "股息"
      }
    ],
    "business": {
      "en": "### Two segments\n- **Tools & Outdoor (87% of FY25 sales, 10.1% margin):** power tools, hand tools and outdoor equipment under DEWALT, CRAFTSMAN, STANLEY and other brands.\n- **Engineered Fastening (13%, 10.0%):** fasteners for autos and industry; CAM aerospace fasteners sold to Howmet in early 2026.\n\n### What changed\nAfter the 2022 inventory glut, a cost programme and divestments rebuilt gross margin to ~31% and cut debt; 2026 margins are boosted by one-time tariff refunds.\n\n### Key risks\nHousing and DIY demand, tariffs and input costs, retailer inventories, and leverage.",
      "zh": "### 两个分部\n- **工具与户外（占 FY25 销售 87%，利润率 10.1%）：** DEWALT、CRAFTSMAN、STANLEY 等品牌的电动工具、手动工具与户外设备。\n- **工程紧固件（13%，10.0%）：** 汽车与工业紧固件；CAM 航空紧固件已于 2026 年初出售给 Howmet。\n\n### 发生了什么变化\n2022 年库存积压后，降本计划和资产出售使毛利率回升至约 31% 并降低了债务；2026 年利润率受一次性关税退款推高。\n\n### 关键风险\n房地产与 DIY 需求、关税与原材料成本、零售商库存，以及杠杆。"
    },
    "segments": [
      {
        "name": {
          "en": "Tools & Outdoor",
          "zh": "工具与户外"
        },
        "share": 87.0
      },
      {
        "name": {
          "en": "Engineered Fastening",
          "zh": "工程紧固件"
        },
        "share": 13.0
      }
    ],
    "dcf": {
      "wacc": "9.1%",
      "terminalGrowth": "2.0%",
      "horizon": "2026-30",
      "revenueCagr": "2.3% (2025-30, blended)",
      "margin": "EBIT margin 7.8% → 11.6% (2030E)",
      "scenarios": [
        {
          "name": "Bear",
          "prob": null,
          "value": 68.65
        },
        {
          "name": "Base",
          "prob": null,
          "value": 101.85
        },
        {
          "name": "Bull",
          "prob": null,
          "value": 103.64
        }
      ]
    },
    "gap": {
      "summary": {
        "en": "My blended base value is **$101.85**, **10% below** the price (**$112.92**) and the Street average target (**$113.36**). Revenue grows only **2.3% a year** to 2030 and the EBIT margin recovers to **11.6%**, close to consensus; the difference is mostly the **discount rate**: with the raw beta of **1.16** my WACC is 9.1%, while a 1.0 beta (WACC 8.6%) gives **$112.81**, about the market price. Morningstar's fair value will be added when the report is uploaded.",
        "zh": "我的混合基准价值为 **$101.85**，比股价（**$112.92**）和华尔街平均目标价（**$113.36**）低 **10%**。营收到 2030 年每年只增长 **2.3%**，EBIT 利润率回升至 **11.6%**，与一致预期接近；差距主要来自 **折现率**：用原始 beta **1.16**，WACC 为 9.1%；若 beta 为 1.0（WACC 8.6%），价值为 **$112.81**，约等于市价。Morningstar 的合理价值将在上传报告后补充。"
      },
      "bridge": [],
      "assumptions": [
        {
          "item": {
            "en": "Value per share",
            "zh": "每股价值"
          },
          "mine": "$101.85",
          "morningstar": "—",
          "sp": "$113.36",
          "note": {
            "en": "Street = average of 15 analysts (S&P Global)",
            "zh": "华尔街 = 15 位分析师平均（S&P Global）"
          }
        },
        {
          "item": "WACC",
          "mine": "9.1%",
          "morningstar": "—",
          "sp": "9.6%",
          "note": {
            "en": "S&P Global WACC estimate",
            "zh": "S&P Global 的 WACC 估计"
          }
        },
        {
          "item": {
            "en": "Revenue 2026E / 2030E",
            "zh": "营收 2026E / 2030E"
          },
          "mine": "$15.2B / $17.0B",
          "morningstar": "—",
          "sp": "—",
          "note": {
            "en": "2026 after the CAM sale",
            "zh": "2026 年为出售 CAM 后"
          }
        },
        {
          "item": {
            "en": "EBIT margin 2030E",
            "zh": "EBIT 利润率 2030E"
          },
          "mine": "11.6%",
          "morningstar": "—",
          "sp": "—",
          "note": {
            "en": "FY25 7.8% (S&P)",
            "zh": "FY25 7.8%（S&P）"
          }
        },
        {
          "item": {
            "en": "2026 GAAP EPS",
            "zh": "2026 GAAP EPS"
          },
          "mine": "—",
          "morningstar": "—",
          "sp": {
            "en": "Guide $5.45-5.85",
            "zh": "指引 $5.45-5.85"
          },
          "note": {
            "en": "Incl. tariff refunds",
            "zh": "含关税退款"
          }
        }
      ]
    },
    "files": [
      {
        "type": "onepage",
        "lang": "en",
        "label": "One Page",
        "path": "reports/swk/SWK_OnePage_en.pdf",
        "date": "2026-11-17"
      },
      {
        "type": "onepage",
        "lang": "zh",
        "label": "One Page",
        "path": "reports/swk/SWK_OnePage_zh.pdf",
        "date": "2026-11-17"
      }
    ],
    "onepageImage": {
      "en": "reports/swk/SWK_OnePage_en.png",
      "zh": "reports/swk/SWK_OnePage_zh.png"
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
    "id": "xpev",
    "name": {
      "en": "XPeng",
      "zh": "小鹏汽车"
    },
    "ticker": "XPEV",
    "exchange": "NYSE",
    "market": "CN",
    "sector": "Consumer Discretionary",
    "industry": "Automobiles",
    "indices": [
      "Other"
    ],
    "updated": "2026-11-17",
    "currency": "USD",
    "price": 9.67,
    "priceDate": "2026-11-16",
    "fairValue": {
      "mine": 17.99,
      "bear": 3.67,
      "bull": 19.8,
      "morningstar": null,
      "sp": 16.25
    },
    "moat": "",
    "summary": {
      "en": "A Chinese smart-EV maker that has reached scale and a 19% gross margin but is not yet profitable; my DCF ($17.99 per ADS) is well above the price, with a very wide range ($3.67 bear).",
      "zh": "已实现规模、毛利率达 19% 但尚未盈利的中国智能电动车企；我的 DCF（每 ADS $17.99）明显高于股价，但区间很宽（悲观 $3.67）。"
    },
    "tags": [
      {
        "en": "Electric vehicles",
        "zh": "电动车"
      },
      {
        "en": "China",
        "zh": "中国"
      },
      {
        "en": "Autonomous driving",
        "zh": "智能驾驶"
      },
      {
        "en": "Loss-making",
        "zh": "亏损期"
      }
    ],
    "business": {
      "en": "### Two revenue lines\n- **Vehicle sales (89% of FY25 revenue, +91%):** smart electric cars sold in China and abroad; deliveries reached 118,390 in Q3 2026.\n- **Services & others (11%, +66%):** technology fees from Volkswagen, software, parts and services.\n\n### What changed\nAfter the 2023 price war cut gross margin to 1.7%, XPeng rebuilt it to 19% with scale and technology fees, and turned FCF positive in FY25. It still loses money at the operating level.\n\n### Key risks\nPrice competition in China, cash needs and dilution, technology execution, and US-China tensions (ADR listing).",
      "zh": "### 两条收入线\n- **汽车销售（占 FY25 营收 89%，+91%）：** 在中国及海外销售智能电动车；2026年Q3 交付 118,390 辆。\n- **服务及其他（11%，+66%）：** 来自大众的技术服务费、软件、零部件与服务。\n\n### 发生了什么变化\n2023 年价格战使毛利率降至 1.7%，之后小鹏依靠规模和技术服务费使其回升至 19%，并在 FY25 实现正 FCF。经营层面仍在亏损。\n\n### 关键风险\n中国市场价格竞争、资金需求与股权稀释、技术落地，以及中美关系（ADR 上市）。"
    },
    "segments": [
      {
        "name": {
          "en": "Vehicle sales",
          "zh": "汽车销售"
        },
        "share": 89.1
      },
      {
        "name": {
          "en": "Services & others",
          "zh": "服务及其他"
        },
        "share": 10.9
      }
    ],
    "dcf": {
      "wacc": "10.1%",
      "terminalGrowth": "2.5%",
      "horizon": "2026-35",
      "revenueCagr": "10.4% (2025-35, blended)",
      "margin": "EBIT margin -3.3% → 6.5% (2035E)",
      "scenarios": [
        {
          "name": "Bear",
          "prob": null,
          "value": 3.67
        },
        {
          "name": "Base",
          "prob": null,
          "value": 17.99
        },
        {
          "name": "Bull",
          "prob": null,
          "value": 19.8
        }
      ]
    },
    "gap": {
      "summary": {
        "en": "My blended base value is **$17.99 per ADS**, **86% above** the price (**$9.67**) and 11% above the Street average target (**$16.25**). It needs revenue to grow **10.4% a year to $31.0B in 2035** and the EBIT margin to turn positive in **2028** and reach **6.5%**; I use a **1.3 beta** (WACC 10.1%) rather than the raw 0.98, which would give $21.71. The market is pricing something closer to my bear case. Morningstar's fair value will be added when the report is uploaded.",
        "zh": "我的混合基准价值为 **每 ADS $17.99**，比股价（**$9.67**）高 **86%**，比华尔街平均目标价（**$16.25**）高 11%。它要求营收 **每年增长 10.4%，2035 年达 $310 亿**，EBIT 利润率在 **2028 年** 转正并达到 **6.5%**；我用 **1.3 的 beta**（WACC 10.1%），而不是原始的 0.98（对应 $21.71）。市场定价更接近我的悲观情景。Morningstar 的合理价值将在上传报告后补充。"
      },
      "bridge": [],
      "assumptions": [
        {
          "item": {
            "en": "Value per ADS",
            "zh": "每 ADS 价值"
          },
          "mine": "$17.99",
          "morningstar": "—",
          "sp": "$16.25",
          "note": {
            "en": "Street = average of 25 analysts (S&P Global)",
            "zh": "华尔街 = 25 位分析师平均（S&P Global）"
          }
        },
        {
          "item": "WACC",
          "mine": "10.1%",
          "morningstar": "—",
          "sp": "—",
          "note": {
            "en": "Beta 1.3 (raw 0.98)",
            "zh": "Beta 1.3（原始 0.98）"
          }
        },
        {
          "item": {
            "en": "Revenue 2026E / 2035E",
            "zh": "营收 2026E / 2035E"
          },
          "mine": "$13.3B / $31.0B",
          "morningstar": "—",
          "sp": "—",
          "note": ""
        },
        {
          "item": {
            "en": "EBIT margin 2026E / 2035E",
            "zh": "EBIT 利润率 2026E / 2035E"
          },
          "mine": "-5.3% / 6.5%",
          "morningstar": "—",
          "sp": "—",
          "note": {
            "en": "Positive from 2028",
            "zh": "2028 年起为正"
          }
        },
        {
          "item": {
            "en": "Deliveries 2030E",
            "zh": "2030E 交付量"
          },
          "mine": "~865k",
          "morningstar": "—",
          "sp": "—",
          "note": {
            "en": "Blend of guidance 930k and consensus 800k",
            "zh": "指引 93 万与一致预期 80 万的平均"
          }
        }
      ]
    },
    "files": [
      {
        "type": "onepage",
        "lang": "en",
        "label": "One Page",
        "path": "reports/xpev/XPEV_OnePage_en.pdf",
        "date": "2026-11-17"
      },
      {
        "type": "onepage",
        "lang": "zh",
        "label": "One Page",
        "path": "reports/xpev/XPEV_OnePage_zh.pdf",
        "date": "2026-11-17"
      }
    ],
    "onepageImage": {
      "en": "reports/xpev/XPEV_OnePage_en.png",
      "zh": "reports/xpev/XPEV_OnePage_zh.png"
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
      },
      "mine": {
        "en": "My DCF / ADS",
        "zh": "我的 DCF / ADS"
      }
    }
  },

  {
    "id": "gd",
    "name": {
      "en": "General Dynamics",
      "zh": "通用动力"
    },
    "ticker": "GD",
    "exchange": "NYSE",
    "market": "US",
    "sector": "Industrials",
    "industry": "Aerospace & Defense",
    "indices": [
      "S&P 500",
      "Russell 1000"
    ],
    "updated": "2026-11-17",
    "currency": "USD",
    "price": 359.69,
    "priceDate": "2026-11-16",
    "fairValue": {
      "mine": 342.81,
      "bear": 249.58,
      "bull": 348.64,
      "morningstar": 438.0,
      "sp": 419.29
    },
    "moat": "Wide",
    "summary": {
      "en": "A defence prime with a $220B backlog and a Gulfstream business jet arm; growth is back, but submarine margins are thin, and my DCF ($342.81) sits just below the price and well below Morningstar ($438).",
      "zh": "拥有 $2,200 亿积压订单的国防主承包商，另有湾流公务机业务；增长已经回来，但潜艇利润率很薄，我的 DCF（$342.81）略低于股价，明显低于 Morningstar（$438）。"
    },
    "tags": [
      {
        "en": "Defence",
        "zh": "国防"
      },
      {
        "en": "Submarines",
        "zh": "潜艇"
      },
      {
        "en": "Business jets",
        "zh": "公务机"
      },
      {
        "en": "Backlog",
        "zh": "积压订单"
      }
    ],
    "business": {
      "en": "### Four segments\n- **Marine Systems (32% of FY25 revenue, 7.0% margin):** Virginia- and Columbia-class submarines and surface ships for the US Navy.\n- **Technologies (26%, 9.5%):** GDIT IT services and Mission Systems.\n- **Aerospace (25%, 13.3%):** Gulfstream business jets and Jet Aviation services.\n- **Combat Systems (18%, 14.4%):** land vehicles, weapons and munitions.\n\n### How it makes money\nLong government contracts give visibility (backlog $220B); Gulfstream adds higher-margin, more cyclical growth. Capex is about 2% of revenue, so most profit converts to cash.\n\n### Key risks\nSubmarine execution and margins, business-jet demand, and US defence budget timing.",
      "zh": "### 四个分部\n- **海事系统（占 FY25 营收 32%，利润率 7.0%）：** 为美国海军建造弗吉尼亚级与哥伦比亚级潜艇及水面舰艇。\n- **技术（26%，9.5%）：** GDIT 信息技术服务与任务系统。\n- **航空航天（25%，13.3%）：** 湾流公务机与 Jet Aviation 服务。\n- **作战系统（18%，14.4%）：** 陆地车辆、武器与弹药。\n\n### 怎样赚钱\n长期政府合同带来可见度（积压订单 $2,200 亿）；湾流带来利润率更高但周期性更强的增长。资本开支约为营收的 2%，大部分利润能转化为现金。\n\n### 关键风险\n潜艇交付与利润率、公务机需求，以及美国国防预算时点。"
    },
    "segments": [
      {
        "name": {
          "en": "Marine Systems",
          "zh": "海事系统"
        },
        "share": 31.8
      },
      {
        "name": {
          "en": "Technologies",
          "zh": "技术"
        },
        "share": 25.6
      },
      {
        "name": {
          "en": "Aerospace",
          "zh": "航空航天"
        },
        "share": 24.9
      },
      {
        "name": {
          "en": "Combat Systems",
          "zh": "作战系统"
        },
        "share": 17.6
      }
    ],
    "dcf": {
      "wacc": "8.2%",
      "terminalGrowth": "2.5%",
      "horizon": "2026-30",
      "revenueCagr": "6.0% (2025-30, blended)",
      "margin": "EBIT margin 10.2% → 10.9% (2030E)",
      "scenarios": [
        {
          "name": "Bear",
          "prob": null,
          "value": 249.58
        },
        {
          "name": "Base",
          "prob": null,
          "value": 342.81
        },
        {
          "name": "Bull",
          "prob": null,
          "value": 348.64
        }
      ]
    },
    "gap": {
      "summary": {
        "en": "Morningstar's fair value is **$438** (Nov 1, 2026; wide moat, Medium uncertainty); mine is **$342.81**, **$95.19 lower**, and the price is **$359.69**. My revenue is actually higher (**$70.4B** in 2030 vs Morningstar's $67.5B), but Morningstar's operating margin reaches **11.7%** against my 10.9%, and its 20-year horizon keeps growing earnings at 6.4% before the terminal value. At its **7.9% WACC** my forecasts are worth **$365.54**; my **8.2% WACC** (beta 0.75) takes off another $22.73.",
        "zh": "Morningstar 的合理价值为 **$438**（2026年11月1日；宽护城河，中等不确定性）；我的是 **$342.81**，低 **$95.19**，股价为 **$359.69**。我的营收其实更高（2030 年 **$704 亿**，Morningstar $675 亿），但 Morningstar 的营业利润率达到 **11.7%**（我的 10.9%），且其 20 年预测期在进入终值前让利润保持 6.4% 的增长。按其 **7.9% 的 WACC**，我的预测值 **$365.54**；我 **8.2% 的 WACC**（beta 0.75）再减去 $22.73。"
      },
      "bridge": [
        {
          "driver": {
            "en": "Morningstar's own DCF: equity $113.3B / 273M sh = $414.92 (FVE $438)",
            "zh": "Morningstar 自己的 DCF：权益 $1,133 亿 / 2.73 亿股 = $414.92（公布值 $438）"
          },
          "impact": -23.08
        },
        {
          "driver": {
            "en": "My forecasts at Morningstar's 7.9% WACC: $365.54 (10.9% vs 11.7% margin, 5-year vs 20-year horizon)",
            "zh": "按 Morningstar 7.9% 的 WACC 计算我的预测：$365.54（利润率 10.9% 对 11.7%，5 年对 20 年预测期）"
          },
          "impact": -49.38
        },
        {
          "driver": {
            "en": "My 8.2% WACC (beta 0.75) instead of 7.9%",
            "zh": "改用我的 8.2% WACC（beta 0.75）"
          },
          "impact": -22.73
        }
      ],
      "assumptions": [
        {
          "item": {
            "en": "Value per share",
            "zh": "每股价值"
          },
          "mine": "$342.81",
          "morningstar": "$438.00",
          "sp": "$419.29",
          "note": {
            "en": "Street = average of 24 analysts (S&P Global)",
            "zh": "华尔街 = 24 位分析师平均（S&P Global）"
          }
        },
        {
          "item": "WACC",
          "mine": "8.2%",
          "morningstar": "7.9%",
          "sp": "—",
          "note": {
            "en": "Cost of equity: mine 8.5%, Morningstar 8.1%",
            "zh": "股权成本：我的 8.5%，Morningstar 8.1%"
          }
        },
        {
          "item": {
            "en": "Revenue 2026E / 2030E",
            "zh": "营收 2026E / 2030E"
          },
          "mine": "$56.9B / $70.4B",
          "morningstar": "$56.5B / $67.5B",
          "sp": "—",
          "note": ""
        },
        {
          "item": {
            "en": "Op. margin 2030E",
            "zh": "营业利润率 2030E"
          },
          "mine": "10.9%",
          "morningstar": "11.7%",
          "sp": "—",
          "note": {
            "en": "FY25 actual 10.2%",
            "zh": "FY25 实际 10.2%"
          }
        },
        {
          "item": {
            "en": "Explicit horizon",
            "zh": "明确预测期"
          },
          "mine": {
            "en": "5 years",
            "zh": "5 年"
          },
          "morningstar": {
            "en": "20 years",
            "zh": "20 年"
          },
          "sp": "—",
          "note": {
            "en": "TV 81% of my EV",
            "zh": "终值占我的 EV 81%"
          }
        }
      ]
    },
    "files": [
      {
        "type": "onepage",
        "lang": "en",
        "label": "One Page",
        "path": "reports/gd/GD_OnePage_en.pdf",
        "date": "2026-11-17"
      },
      {
        "type": "onepage",
        "lang": "zh",
        "label": "One Page",
        "path": "reports/gd/GD_OnePage_zh.pdf",
        "date": "2026-11-17"
      }
    ],
    "onepageImage": {
      "en": "reports/gd/GD_OnePage_en.png",
      "zh": "reports/gd/GD_OnePage_zh.png"
    },
    "history": [
      {
        "date": "2026-11-17",
        "note": {
          "en": "One Page V2 with DCF and Morningstar gap",
          "zh": "One Page V2（含 DCF 与 Morningstar 差距拆解）"
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
    "id": "gev",
    "name": {
      "en": "GE Vernova",
      "zh": "GE Vernova"
    },
    "ticker": "GEV",
    "exchange": "NYSE",
    "market": "US",
    "sector": "Industrials",
    "industry": "Electrical Equipment",
    "indices": [
      "S&P 500",
      "Russell 1000"
    ],
    "updated": "2026-11-17",
    "currency": "USD",
    "price": 763.57,
    "priceDate": "2026-11-16",
    "fairValue": {
      "mine": 484.19,
      "bear": 318.24,
      "bull": 498.92,
      "morningstar": null,
      "sp": 1176.0
    },
    "moat": "",
    "summary": {
      "en": "Gas turbines and grid equipment for the AI power build-out: orders nearly doubled and customers prepay, but my DCF ($484.19) is 37% below the price because I discount at 10% and let margins rise only to 16%.",
      "zh": "为 AI 电力建设提供燃气轮机和电网设备：订单几乎翻倍，客户预付货款；但我的 DCF（$484.19）比股价低 37%，因为我用 10% 的折现率，并只让利润率升到 16%。"
    },
    "tags": [
      {
        "en": "Power generation",
        "zh": "发电设备"
      },
      {
        "en": "Grid",
        "zh": "电网"
      },
      {
        "en": "Data centres",
        "zh": "数据中心"
      },
      {
        "en": "Spin-off",
        "zh": "分拆"
      }
    ],
    "business": {
      "en": "### Three segments\n- **Power (52% of FY25 revenue, 14.7% margin):** gas turbines, nuclear, hydro and steam, plus a large services base.\n- **Electrification (25%, 14.9%):** grid equipment, power conversion and software; growing fastest (+27.7%).\n- **Wind (24%, -6.6%):** onshore and offshore wind; still loss-making.\n\n### What changed\nSince the April 2024 spin-off from GE, orders have surged on data-centre and grid demand; backlog is $197B and customers pay deposits to reserve turbine slots.\n\n### Key risks\nA slowdown in power orders, Wind losses, execution on a large backlog, and the Trench Group acquisition.",
      "zh": "### 三个分部\n- **电力（占 FY25 营收 52%，利润率 14.7%）：** 燃气轮机、核电、水电和蒸汽轮机，以及庞大的服务业务。\n- **电气化（25%，14.9%）：** 电网设备、电力转换与软件；增长最快（+27.7%）。\n- **风电（24%，-6.6%）：** 陆上与海上风电；仍在亏损。\n\n### 发生了什么变化\n2024年4月从 GE 分拆后，数据中心与电网需求推动订单激增；积压订单 $1,970 亿，客户支付定金预订燃气轮机产能。\n\n### 关键风险\n电力订单放缓、风电亏损、大量积压订单的交付，以及 Trench Group 收购。"
    },
    "segments": [
      {
        "name": {
          "en": "Power",
          "zh": "电力"
        },
        "share": 51.9
      },
      {
        "name": {
          "en": "Electrification",
          "zh": "电气化"
        },
        "share": 25.3
      },
      {
        "name": {
          "en": "Wind",
          "zh": "风电"
        },
        "share": 23.9
      }
    ],
    "dcf": {
      "wacc": "10.0%",
      "terminalGrowth": "3.0%",
      "horizon": "2026-30",
      "revenueCagr": "12.5% (2025-30, blended)",
      "margin": "EBIT margin 3.6% (GAAP FY25) → 16.1% (2030E)",
      "scenarios": [
        {
          "name": "Bear",
          "prob": null,
          "value": 318.24
        },
        {
          "name": "Base",
          "prob": null,
          "value": 484.19
        },
        {
          "name": "Bull",
          "prob": null,
          "value": 498.92
        }
      ]
    },
    "gap": {
      "summary": {
        "en": "My blended base value is **$484.19**, **37% below** the price (**$763.57**) and far below the Street average target (**$1,176**). Revenue follows guidance and consensus (12.5% a year to **$68.6B** in 2030), so the gap is the **margin path and discount rate**: I take the EBIT margin to **16.1%** and discount at **10.0%** (beta 1.10). At a 0.6 beta (WACC 7.8%) the value would be **$691**. Morningstar's fair value will be added when the report is uploaded.",
        "zh": "我的混合基准价值为 **$484.19**，比股价（**$763.57**）低 **37%**，远低于华尔街平均目标价（**$1,176**）。营收按公司指引与一致预期（每年 12.5%，2030 年 **$686 亿**），差距来自 **利润率路径与折现率**：我让 EBIT 利润率升至 **16.1%**，并以 **10.0%**（beta 1.10）折现。若 beta 为 0.6（WACC 7.8%），价值约 **$691**。Morningstar 的合理价值将在上传报告后补充。"
      },
      "bridge": [],
      "assumptions": [
        {
          "item": {
            "en": "Value per share",
            "zh": "每股价值"
          },
          "mine": "$484.19",
          "morningstar": "—",
          "sp": "$1,176",
          "note": {
            "en": "Street = average of 37 analysts (S&P Global)",
            "zh": "华尔街 = 37 位分析师平均（S&P Global）"
          }
        },
        {
          "item": "WACC",
          "mine": "10.0%",
          "morningstar": "—",
          "sp": "—",
          "note": {
            "en": "Cost of equity 10.1% (beta 1.10)",
            "zh": "股权成本 10.1%（beta 1.10）"
          }
        },
        {
          "item": {
            "en": "Revenue 2026E / 2030E",
            "zh": "营收 2026E / 2030E"
          },
          "mine": "$46.7B / $68.6B",
          "morningstar": "—",
          "sp": {
            "en": "2026 guide ~$47B",
            "zh": "2026 指引约 $470 亿"
          },
          "note": ""
        },
        {
          "item": {
            "en": "EBIT margin 2030E",
            "zh": "EBIT 利润率 2030E"
          },
          "mine": "16.1%",
          "morningstar": "—",
          "sp": "—",
          "note": {
            "en": "Power 25%, Electrification 19.5%, Wind 3%",
            "zh": "电力 25%、电气化 19.5%、风电 3%"
          }
        },
        {
          "item": {
            "en": "Trench Group deal",
            "zh": "Trench Group 收购"
          },
          "mine": {
            "en": "Not modelled",
            "zh": "未计入"
          },
          "morningstar": "—",
          "sp": "—",
          "note": {
            "en": "~$9.0B, announced Oct 2026",
            "zh": "约 $90 亿，2026年10月宣布"
          }
        }
      ]
    },
    "files": [
      {
        "type": "onepage",
        "lang": "en",
        "label": "One Page",
        "path": "reports/gev/GEV_OnePage_en.pdf",
        "date": "2026-11-17"
      },
      {
        "type": "onepage",
        "lang": "zh",
        "label": "One Page",
        "path": "reports/gev/GEV_OnePage_zh.pdf",
        "date": "2026-11-17"
      }
    ],
    "onepageImage": {
      "en": "reports/gev/GEV_OnePage_en.png",
      "zh": "reports/gev/GEV_OnePage_zh.png"
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
    "id": "bidu",
    "name": {
      "en": "Baidu",
      "zh": "百度"
    },
    "ticker": "BIDU",
    "exchange": "NASDAQ",
    "market": "CN",
    "sector": "Communication Services",
    "industry": "Interactive Media & Advertising",
    "indices": [
      "Other"
    ],
    "updated": "2026-11-17",
    "currency": "USD",
    "price": 73.94,
    "priceDate": "2026-11-16",
    "fairValue": {
      "mine": 147.81,
      "bear": 101.74,
      "bull": 153.97,
      "morningstar": null,
      "sp": 124.86
    },
    "moat": "",
    "summary": {
      "en": "China's search leader is shrinking its old ad business and spending heavily on AI cloud; the stock trades below its cash and investments, and my DCF ($147.81 per ADS) is double the price.",
      "zh": "中国搜索龙头的传统广告业务在萎缩，正大举投入 AI 云；股价低于其现金与投资，我的 DCF（每 ADS $147.81）是股价的两倍。"
    },
    "tags": [
      {
        "en": "China internet",
        "zh": "中国互联网"
      },
      "AI",
      {
        "en": "Search",
        "zh": "搜索"
      },
      {
        "en": "Cloud",
        "zh": "云计算"
      }
    ],
    "business": {
      "en": "### Three businesses\n- **Legacy business (48% of FY25 revenue):** traditional search and online advertising; down 20% in FY25 and 22% in Q3 2026.\n- **AI-powered business (31%, +48%):** AI Cloud Infra (GPU cloud), AI applications and AI-native marketing.\n- **iQIYI (21%):** online video, consolidated with a ~45% economic stake.\n\n### What changed\nBaidu is spending about a fifth of revenue on AI infrastructure while its high-margin search ads shrink; free cash flow turned negative in FY25.\n\n### Key risks\nSearch decline outpacing AI growth, AI pricing competition in China, capex discipline, regulation, and US-China tensions (ADR listing).",
      "zh": "### 三块业务\n- **传统业务（占 FY25 营收 48%）：** 传统搜索与在线广告；FY25 下降 20%，2026年Q3 下降 22%。\n- **AI 业务（31%，+48%）：** AI 云基础设施（GPU 云）、AI 应用和 AI 原生营销。\n- **爱奇艺（21%）：** 在线视频，持股约 45% 并表。\n\n### 发生了什么变化\n百度把约五分之一的营收投入 AI 基础设施，而高利润的搜索广告在萎缩；FY25 自由现金流转负。\n\n### 关键风险\n搜索下滑快于 AI 增长、中国 AI 价格竞争、资本开支纪律、监管，以及中美关系（ADR 上市）。"
    },
    "segments": [
      {
        "name": {
          "en": "Legacy business",
          "zh": "传统业务"
        },
        "share": 47.9
      },
      {
        "name": {
          "en": "AI-powered business",
          "zh": "AI 业务"
        },
        "share": 31.0
      },
      {
        "name": "iQIYI",
        "share": 21.1
      }
    ],
    "dcf": {
      "wacc": "8.2%",
      "terminalGrowth": "2.0%",
      "horizon": "2026-30",
      "revenueCagr": "5.9% (2025-30, blended)",
      "margin": "EBIT margin 8.0% → 11.5% (2030E)",
      "scenarios": [
        {
          "name": "Bear",
          "prob": null,
          "value": 101.74
        },
        {
          "name": "Base",
          "prob": null,
          "value": 147.81
        },
        {
          "name": "Bull",
          "prob": null,
          "value": 153.97
        }
      ]
    },
    "gap": {
      "summary": {
        "en": "My blended base value is **$147.81 per ADS**, about **double** the price (**$73.94**) and 18% above the Street average target (**$124.86**). The difference with the market is mostly **the balance sheet and the terminal value**: I add net cash and long-term investments (at 70% of book) and assume margins recover to **11.5%** with capex falling to **12%** of revenue, so 86% of EV is terminal. The market is pricing years of cash burn and a China discount. Morningstar's fair value will be added when the report is uploaded.",
        "zh": "我的混合基准价值为 **每 ADS $147.81**，约为股价（**$73.94**）的 **两倍**，比华尔街平均目标价（**$124.86**）高 18%。与市场的差距主要来自 **资产负债表和终值**：我加回净现金和按账面 70% 计的长期投资，并假设利润率回升至 **11.5%**、资本开支降到营收的 **12%**，因此终值占 EV 86%。市场在为多年的现金消耗和中国折价定价。Morningstar 的合理价值将在上传报告后补充。"
      },
      "bridge": [],
      "assumptions": [
        {
          "item": {
            "en": "Value per ADS",
            "zh": "每 ADS 价值"
          },
          "mine": "$147.81",
          "morningstar": "—",
          "sp": "$124.86",
          "note": {
            "en": "Street = average of 30 analysts (S&P Global)",
            "zh": "华尔街 = 30 位分析师平均（S&P Global）"
          }
        },
        {
          "item": "WACC",
          "mine": "8.2%",
          "morningstar": "—",
          "sp": "—",
          "note": {
            "en": "Beta 1.0 (raw 0.58)",
            "zh": "Beta 1.0（原始 0.58）"
          }
        },
        {
          "item": {
            "en": "Revenue 2026E / 2030E",
            "zh": "营收 2026E / 2030E"
          },
          "mine": "$19.0B / $25.8B",
          "morningstar": "—",
          "sp": "—",
          "note": {
            "en": "AI share 43% (2026E) → 65% (2030E)",
            "zh": "AI 占比 43%（2026E）→ 65%（2030E）"
          }
        },
        {
          "item": {
            "en": "EBIT margin 2030E",
            "zh": "EBIT 利润率 2030E"
          },
          "mine": "11.5%",
          "morningstar": "—",
          "sp": "—",
          "note": {
            "en": "FY25 8.0% (S&P)",
            "zh": "FY25 8.0%（S&P）"
          }
        },
        {
          "item": {
            "en": "Long-term investments",
            "zh": "长期投资"
          },
          "mine": {
            "en": "70% of book ($9.5B)",
            "zh": "账面 70%（$95 亿）"
          },
          "morningstar": "—",
          "sp": "—",
          "note": ""
        }
      ]
    },
    "files": [
      {
        "type": "onepage",
        "lang": "en",
        "label": "One Page",
        "path": "reports/bidu/BIDU_OnePage_en.pdf",
        "date": "2026-11-17"
      },
      {
        "type": "onepage",
        "lang": "zh",
        "label": "One Page",
        "path": "reports/bidu/BIDU_OnePage_zh.pdf",
        "date": "2026-11-17"
      }
    ],
    "onepageImage": {
      "en": "reports/bidu/BIDU_OnePage_en.png",
      "zh": "reports/bidu/BIDU_OnePage_zh.png"
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
      },
      "mine": {
        "en": "My DCF / ADS",
        "zh": "我的 DCF / ADS"
      }
    }
  },

  {
    "id": "etn",
    "name": {
      "en": "Eaton",
      "zh": "伊顿"
    },
    "ticker": "ETN",
    "exchange": "NYSE",
    "market": "US",
    "sector": "Industrials",
    "industry": "Electrical Equipment",
    "indices": [
      "S&P 500",
      "Russell 1000"
    ],
    "updated": "2026-11-17",
    "currency": "USD",
    "price": 336.88,
    "priceDate": "2026-11-16",
    "fairValue": {
      "mine": 240.02,
      "bear": 161.49,
      "bull": 248.5,
      "morningstar": 333.0,
      "sp": 468.74
    },
    "moat": "Wide",
    "summary": {
      "en": "A power-management company riding data-centre and grid demand, with margins up sharply and a $20B backlog; my DCF ($240.02) is well below the price because I discount at 9.6% and let growth fade to 7.5% by 2030.",
      "zh": "受益于数据中心与电网需求的电力管理公司，利润率大幅提升，积压订单 $200 亿；我的 DCF（$240.02）明显低于股价，因为我用 9.6% 的折现率，并让增长在 2030 年降到 7.5%。"
    },
    "tags": [
      {
        "en": "Electrification",
        "zh": "电气化"
      },
      {
        "en": "Data centres",
        "zh": "数据中心"
      },
      {
        "en": "Aerospace",
        "zh": "航空航天"
      },
      {
        "en": "Industrials",
        "zh": "工业"
      }
    ],
    "business": {
      "en": "### Segments\n- **Electrical Americas (48% of FY25 sales, 29.9% margin):** switchgear, power distribution and backup power for data centres, utilities and buildings.\n- **Electrical Global (25%, 19.4%):** the same outside the Americas, plus Boyd Thermal liquid cooling from March 2026.\n- **Aerospace (15%, 23.8%):** fuel, hydraulic and power systems for commercial and defence aircraft.\n- **Mobility (11%, 13.0%):** vehicle components; split off in early 2027.\n\n### What changed\nData-centre orders doubled and the electrical backlog reached $20B; the $9.55B Boyd deal doubled debt.\n\n### Key risks\nA pause in AI data-centre spending, project delays, integration of Boyd, and leverage.",
      "zh": "### 分部\n- **美洲电气（占 FY25 销售 48%，利润率 29.9%）：** 为数据中心、电力公司和建筑提供开关设备、配电和备用电源。\n- **全球电气（25%，19.4%）：** 美洲以外的同类业务，2026年3月起包括 Boyd Thermal 液冷。\n- **航空航天（15%，23.8%）：** 民用与军用飞机的燃油、液压和电力系统。\n- **出行（11%，13.0%）：** 汽车零部件；2027 年初剥离。\n\n### 发生了什么变化\n数据中心订单翻倍，电气积压订单达 $200 亿；$95.5 亿收购 Boyd 使债务翻倍。\n\n### 关键风险\nAI 数据中心投资放缓、项目延期、Boyd 整合，以及杠杆。"
    },
    "segments": [
      {
        "name": {
          "en": "Electrical Americas",
          "zh": "美洲电气"
        },
        "share": 48.4
      },
      {
        "name": {
          "en": "Electrical Global",
          "zh": "全球电气"
        },
        "share": 24.8
      },
      {
        "name": {
          "en": "Aerospace",
          "zh": "航空航天"
        },
        "share": 15.5
      },
      {
        "name": {
          "en": "Mobility (leaving)",
          "zh": "出行（将剥离）"
        },
        "share": 11.3
      }
    ],
    "dcf": {
      "wacc": "9.6%",
      "terminalGrowth": "3.0%",
      "horizon": "2026-30",
      "revenueCagr": "10.4% (2025-30, blended)",
      "margin": "EBIT margin 19% → 22% (2030E)",
      "scenarios": [
        {
          "name": "Bear",
          "prob": null,
          "value": 161.49
        },
        {
          "name": "Base",
          "prob": null,
          "value": 240.02
        },
        {
          "name": "Bull",
          "prob": null,
          "value": 248.5
        }
      ]
    },
    "gap": {
      "summary": {
        "en": "Morningstar's fair value is **$333** (Jul 31, 2026); mine is **$240.02**, **$92.98 lower**, and the Street average target is **$468.74**. Revenue paths are similar (Morningstar $46.3B in 2030 incl. a slower Mobility exit, mine $44.9B), and margins are close (23.1% vs 22.1%). The gap is mainly the **discount rate**: Morningstar uses an **8.5% WACC** with a 20-year explicit period; I use **9.6%** (beta 1.14, 10-year Treasury 5.15%). At their WACC my model gives about **$296**.",
        "zh": "Morningstar 的合理价值为 **$333**（2026年7月31日）；我的是 **$240.02**，低 **$92.98**；华尔街平均目标价为 **$468.74**。营收路径相近（Morningstar 2030 年 $463 亿，出行业务剥离较慢；我的 $449 亿），利润率也接近（23.1% 对 22.1%）。差距主要来自 **折现率**：Morningstar 用 **8.5% 的 WACC** 和 20 年明确预测期；我用 **9.6%**（beta 1.14，10 年期美债 5.15%）。按他们的 WACC，我的模型约为 **$296**。"
      },
      "bridge": [
        {
          "driver": {
            "en": "Morningstar's own model: equity $121.6B / 389M sh = $312.53 (FVE dated Jul 31)",
            "zh": "Morningstar 自己的模型：权益 $1,216 亿 / 3.89 亿股 = $312.53（公布值日期 7月31日）"
          },
          "impact": -20.47
        },
        {
          "driver": {
            "en": "My forecasts at Morningstar's 8.5% WACC: $296.0 (5-year horizon, Mobility valued separately)",
            "zh": "按 Morningstar 8.5% 的 WACC 计算我的预测：$296.0（5 年预测期，出行业务单独估值）"
          },
          "impact": -16.53
        },
        {
          "driver": {
            "en": "My 9.6% WACC (beta 1.14) instead of 8.5%",
            "zh": "改用我的 9.6% WACC（beta 1.14）"
          },
          "impact": -55.98
        }
      ],
      "assumptions": [
        {
          "item": {
            "en": "Value per share",
            "zh": "每股价值"
          },
          "mine": "$240.02",
          "morningstar": "$333.00",
          "sp": "$468.74",
          "note": {
            "en": "Street = average of 29 analysts (S&P Global)",
            "zh": "华尔街 = 29 位分析师平均（S&P Global）"
          }
        },
        {
          "item": "WACC",
          "mine": "9.6%",
          "morningstar": "8.5%",
          "sp": "9.4%",
          "note": {
            "en": "Cost of equity: mine 10.3%, Morningstar 9.4%",
            "zh": "股权成本：我的 10.3%，Morningstar 9.4%"
          }
        },
        {
          "item": {
            "en": "Revenue 2027E / 2030E",
            "zh": "营收 2027E / 2030E"
          },
          "mine": "$34.8B / $44.9B",
          "morningstar": "$37.7B / $46.3B",
          "sp": "—",
          "note": {
            "en": "Mine excludes Mobility from 2027",
            "zh": "我的 2027 年起不含出行业务"
          }
        },
        {
          "item": {
            "en": "EBIT margin 2030E",
            "zh": "EBIT 利润率 2030E"
          },
          "mine": "22.1%",
          "morningstar": "23.1%",
          "sp": "—",
          "note": ""
        },
        {
          "item": {
            "en": "Explicit horizon",
            "zh": "明确预测期"
          },
          "mine": {
            "en": "5 years",
            "zh": "5 年"
          },
          "morningstar": {
            "en": "20 years",
            "zh": "20 年"
          },
          "sp": "—",
          "note": {
            "en": "TV 78% of my EV",
            "zh": "终值占我的 EV 78%"
          }
        }
      ]
    },
    "files": [
      {
        "type": "onepage",
        "lang": "en",
        "label": "One Page",
        "path": "reports/etn/ETN_OnePage_en.pdf",
        "date": "2026-11-17"
      },
      {
        "type": "onepage",
        "lang": "zh",
        "label": "One Page",
        "path": "reports/etn/ETN_OnePage_zh.pdf",
        "date": "2026-11-17"
      }
    ],
    "onepageImage": {
      "en": "reports/etn/ETN_OnePage_en.png",
      "zh": "reports/etn/ETN_OnePage_zh.png"
    },
    "history": [
      {
        "date": "2026-11-17",
        "note": {
          "en": "One Page V2 with DCF and Morningstar gap",
          "zh": "One Page V2（含 DCF 与 Morningstar 差距拆解）"
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
        "en": "Morningstar's fair value is **$600** (set Jul 31, 2025 and kept after Q1 FY27); mine is **$404.69**, **$195.31 lower**, and the Street average target is **$636.12**. Two things drive it. **Forecasts**: Morningstar has revenue growing 17% a year to **$715B in FY31** (Azure +51% in FY27, +37% in FY28) versus my **$631B**; at its **8.4% WACC** my forecasts are worth **$514**. **Discount rate**: my 9.7% WACC (10-year Treasury 5.15%, beta 1.05) takes another $110.",
        "zh": "Morningstar 的合理价值为 **$600**（2025年7月31日设定，Q1 FY27 后维持）；我的是 **$404.69**，低 **$195.31**；华尔街平均目标价为 **$636.12**。原因有两点。**预测**：Morningstar 的营收每年增长 17%，FY31 达 **$7,150 亿**（FY27 Azure +51%、FY28 +37%），我的为 **$6,310 亿**；按其 **8.4% 的 WACC**，我的预测值 **$514**。**折现率**：我 9.7% 的 WACC（10 年期美债 5.15%，beta 1.05）再减去 $110。"
      },
      "bridge": [
        {
          "driver": {
            "en": "Morningstar's own DCF: equity $4,349.5B / 7,430M sh = $585.40 (FVE $600)",
            "zh": "Morningstar 自己的 DCF：权益 $43,495 亿 / 74.30 亿股 = $585.40（公布值 $600）"
          },
          "impact": -14.6
        },
        {
          "driver": {
            "en": "My forecasts at Morningstar's 8.4% WACC: $514.47 (FY31 revenue $631B vs $715B)",
            "zh": "按 Morningstar 8.4% 的 WACC 计算我的预测：$514.47（FY31 营收 $6,310 亿对 $7,150 亿）"
          },
          "impact": -70.93
        },
        {
          "driver": {
            "en": "My 9.7% WACC (beta 1.05) instead of 8.4%",
            "zh": "改用我的 9.7% WACC（beta 1.05）"
          },
          "impact": -109.78
        }
      ],
      "assumptions": [
        {
          "item": {
            "en": "Value per share",
            "zh": "每股价值"
          },
          "mine": "$404.69",
          "morningstar": "$600.00",
          "sp": "$636.12",
          "note": {
            "en": "Street = average of 58 analysts",
            "zh": "华尔街 = 58 位分析师平均"
          }
        },
        {
          "item": "WACC",
          "mine": "9.7%",
          "morningstar": "8.4%",
          "sp": "9.7%",
          "note": {
            "en": "Morningstar cost of equity 8.4%",
            "zh": "Morningstar 股权成本 8.4%"
          }
        },
        {
          "item": {
            "en": "Revenue FY27E / FY31E",
            "zh": "营收 FY27E / FY31E"
          },
          "mine": "$396B / $631B",
          "morningstar": "$399B / $715B",
          "sp": "$396B / —",
          "note": {
            "en": "5-yr CAGR 13.7% vs 16.6%",
            "zh": "5 年 CAGR 13.7% 对 16.6%"
          }
        },
        {
          "item": {
            "en": "Op. margin FY31E",
            "zh": "营业利润率 FY31E"
          },
          "mine": "47.6%",
          "morningstar": "47.3%",
          "sp": "—",
          "note": ""
        },
        {
          "item": {
            "en": "FY27E Azure growth",
            "zh": "FY27E Azure 增长"
          },
          "mine": "~49%",
          "morningstar": "51%",
          "sp": "—",
          "note": {
            "en": "Mine: guided +49-50% for Q2",
            "zh": "我的：Q2 指引 +49-50%"
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
          "en": "One Page V2 with DCF; Morningstar FV and gap bridge added",
          "zh": "One Page V2（含 DCF）；补充 Morningstar 合理价值与差距拆解"
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
      "morningstar": 186.0,
      "sp": 211.5
    },
    "moat": "Wide",
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
        "en": "Morningstar's fair value is **$186** (Oct 14, 2026; wide moat, High uncertainty), right at the **$185.57** price; mine is **$159.64**, **$26.36 lower**. My earnings path is, if anything, higher than Morningstar's (2027 EPS ~$12.95 vs **$11.80**). The gap is the **cost of equity**: at Morningstar's **9.6%** my two methods average **$182.66**; at my **10.6%** (beta 1.22) they average $159.64.",
        "zh": "Morningstar 的合理价值为 **$186**（2026年10月14日；宽护城河，高不确定性），与 **$185.57** 的股价基本相同；我的是 **$159.64**，低 **$26.36**。我的盈利路径甚至高于 Morningstar（2027 年 EPS 约 $12.95，对 **$11.80**）。差距来自 **股权成本**：按 Morningstar 的 **9.6%**，我的两种方法平均为 **$182.66**；按我的 **10.6%**（beta 1.22）为 $159.64。"
      },
      "bridge": [
        {
          "driver": {
            "en": "Morningstar's own model: equity $274.1B / 1,554M sh = $176.38 (FVE $186)",
            "zh": "Morningstar 自己的模型：权益 $2,741 亿 / 15.54 亿股 = $176.38（公布值 $186）"
          },
          "impact": -9.62
        },
        {
          "driver": {
            "en": "My forecasts at Morningstar's 9.6% cost of equity: $182.66 (RI + DDM average)",
            "zh": "按 Morningstar 9.6% 的股权成本计算我的预测：$182.66（两种方法平均）"
          },
          "impact": 6.28
        },
        {
          "driver": {
            "en": "My 10.6% cost of equity (beta 1.22) instead of 9.6%",
            "zh": "改用我的 10.6% 股权成本（beta 1.22）"
          },
          "impact": -23.02
        }
      ],
      "assumptions": [
        {
          "item": {
            "en": "Value per share",
            "zh": "每股价值"
          },
          "mine": "$159.64",
          "morningstar": "$186.00",
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
          "morningstar": "9.6%",
          "sp": "—",
          "note": {
            "en": "Mine: rf 5.15% + 1.22 x 4.5%",
            "zh": "我的：无风险利率 5.15% + 1.22 × 4.5%"
          }
        },
        {
          "item": {
            "en": "EPS 2027E",
            "zh": "EPS 2027E"
          },
          "mine": "$12.95",
          "morningstar": "$11.80",
          "sp": "—",
          "note": {
            "en": "Mine at constant shares",
            "zh": "我的按股数不变计算"
          }
        },
        {
          "item": {
            "en": "ROE / ROTCE 2030E",
            "zh": "ROE / ROTCE 2030E"
          },
          "mine": {
            "en": "ROTCE 26.3%",
            "zh": "ROTCE 26.3%"
          },
          "morningstar": {
            "en": "ROE 16.3%",
            "zh": "ROE 16.3%"
          },
          "sp": "—",
          "note": {
            "en": "Different bases (tangible vs total equity)",
            "zh": "口径不同（有形权益 vs 总权益）"
          }
        },
        {
          "item": {
            "en": "Net income growth",
            "zh": "净利润增长"
          },
          "mine": {
            "en": "~4% a year 2027-30",
            "zh": "2027-30 年约 4%"
          },
          "morningstar": {
            "en": "6.3% (Stage II)",
            "zh": "6.3%（第二阶段）"
          },
          "sp": "—",
          "note": ""
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
      "mine": {
        "en": "My value",
        "zh": "我的估值"
      },
      "waccG": {
        "en": "Cost of equity / g",
        "zh": "股权成本 / 永续增长"
      },
      "wacc": {
        "en": "Cost of equity",
        "zh": "股权成本"
      },
      "secDcf": {
        "en": "Valuation summary",
        "zh": "估值摘要"
      },
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
      "morningstar": 88.0,
      "sp": 101.7
    },
    "moat": "Wide",
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
        "en": "Morningstar's fair value is **$88** (Aug 3, 2026; wide moat, Low uncertainty); mine is **$82.56**, **$5.44 lower**, and both sit below the **$100.99** price (Morningstar rates the stock 2 stars). Morningstar models slightly lower sales (**$23.9B** in 2030 vs my $24.7B) and a slightly higher margin (22.8% vs 22.2%): at its **7.0% WACC** my forecasts are worth **$94.83**, so the gap is the **discount rate**: my beta 0.6 gives a 7.5% WACC. The Street ($101.70) prices in the raw 0.31 beta.",
        "zh": "Morningstar 的合理价值为 **$88**（2026年8月3日；宽护城河，低不确定性）；我的是 **$82.56**，低 **$5.44**，两者都低于 **$100.99** 的股价（Morningstar 评级 2 星）。Morningstar 的销售略低（2030 年 **$239 亿**，我的 $247 亿），利润率略高（22.8% 对 22.2%）：按其 **7.0% 的 WACC**，我的预测值 **$94.83**，所以差距来自 **折现率**：我用 0.6 的 beta，WACC 为 7.5%。华尔街（$101.70）相当于采用原始 beta 0.31。"
      },
      "bridge": [
        {
          "driver": {
            "en": "Morningstar's own DCF: equity $68.6B / 809M sh = $84.77 (FVE $88)",
            "zh": "Morningstar 自己的 DCF：权益 $686 亿 / 8.09 亿股 = $84.77（公布值 $88）"
          },
          "impact": -3.23
        },
        {
          "driver": {
            "en": "My forecasts at Morningstar's 7.0% WACC: $94.83 (higher sales, slightly lower margin)",
            "zh": "按 Morningstar 7.0% 的 WACC 计算我的预测：$94.83（销售更高，利润率略低）"
          },
          "impact": 10.06
        },
        {
          "driver": {
            "en": "My 7.5% WACC (beta 0.6) instead of 7.0%",
            "zh": "改用我的 7.5% WACC（beta 0.6）"
          },
          "impact": -12.27
        }
      ],
      "assumptions": [
        {
          "item": {
            "en": "Value per share",
            "zh": "每股价值"
          },
          "mine": "$82.56",
          "morningstar": "$88.00",
          "sp": "$101.70",
          "note": {
            "en": "Street = average of 21 analysts",
            "zh": "华尔街 = 21 位分析师平均"
          }
        },
        {
          "item": "WACC",
          "mine": "7.5%",
          "morningstar": "7.0%",
          "sp": "5.6%",
          "note": {
            "en": "Cost of equity: mine 7.85%, Morningstar 8.4%",
            "zh": "股权成本：我的 7.85%，Morningstar 8.4%"
          }
        },
        {
          "item": {
            "en": "Revenue 2027E / 2030E",
            "zh": "营收 2027E / 2030E"
          },
          "mine": "$22.2B / $24.7B",
          "morningstar": "$21.7B / $23.9B",
          "sp": "$22.1B / —",
          "note": {
            "en": "Street = consensus",
            "zh": "华尔街 = 一致预期"
          }
        },
        {
          "item": {
            "en": "Op. margin 2030E",
            "zh": "营业利润率 2030E"
          },
          "mine": "22.2%",
          "morningstar": "22.8%",
          "sp": "—",
          "note": {
            "en": "Morningstar: adjusted",
            "zh": "Morningstar 为调整后口径"
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
          "en": "One Page V2 with DCF; Morningstar FV and gap bridge added",
          "zh": "One Page V2（含 DCF）；补充 Morningstar 合理价值与差距拆解"
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
      "morningstar": 152.0,
      "sp": 167.14
    },
    "moat": "Narrow",
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
        "en": "Morningstar's fair value is **$152** (Nov 10, 2026; narrow moat, Medium uncertainty); mine is **$146.17**, only **$5.83 lower**, but for opposite reasons. Morningstar has higher prices near term (WTI **$83** in 2027 vs my $79) and a lower mid-cycle deck (**WTI $60**, gas $3.70, vs my $70 and $3.50). At its **7.4% WACC** my forecasts are worth **$177.89**, so my higher mid-cycle oil price adds value and my **8.6% WACC** (beta 0.9) takes it back.",
        "zh": "Morningstar 的合理价值为 **$152**（2026年11月10日；窄护城河，中等不确定性）；我的是 **$146.17**，只低 **$5.83**，但原因相反。Morningstar 的近期价格更高（2027 年 WTI **$83**，我的 $79），中周期价格更低（**WTI $60**、天然气 $3.70；我的 $70 和 $3.50）。按其 **7.4% 的 WACC**，我的预测值 **$177.89**：我更高的中周期油价增加了价值，而我 **8.6% 的 WACC**（beta 0.9）又把它扣回。"
      },
      "bridge": [
        {
          "driver": {
            "en": "Morningstar's own DCF: equity $79.2B / 539M sh = $146.95 (FVE $152)",
            "zh": "Morningstar 自己的 DCF：权益 $792 亿 / 5.39 亿股 = $146.95（公布值 $152）"
          },
          "impact": -5.05
        },
        {
          "driver": {
            "en": "My forecasts at Morningstar's 7.4% WACC: $177.89 (mid-cycle WTI $70 vs $60)",
            "zh": "按 Morningstar 7.4% 的 WACC 计算我的预测：$177.89（中周期 WTI $70 对 $60）"
          },
          "impact": 30.94
        },
        {
          "driver": {
            "en": "My 8.6% WACC (beta 0.9) instead of 7.4%",
            "zh": "改用我的 8.6% WACC（beta 0.9）"
          },
          "impact": -31.72
        }
      ],
      "assumptions": [
        {
          "item": {
            "en": "Value per share",
            "zh": "每股价值"
          },
          "mine": "$146.17",
          "morningstar": "$152.00",
          "sp": "$167.14",
          "note": {
            "en": "Street = average of 33 analysts",
            "zh": "华尔街 = 33 位分析师平均"
          }
        },
        {
          "item": "WACC",
          "mine": "8.6%",
          "morningstar": "7.4%",
          "sp": "6.0%",
          "note": {
            "en": "S&P Global uses the raw beta 0.37",
            "zh": "S&P Global 使用原始 beta 0.37"
          }
        },
        {
          "item": {
            "en": "WTI 2027E / mid-cycle",
            "zh": "WTI 2027E / 中周期"
          },
          "mine": "$79 / $70",
          "morningstar": "$83 / $60",
          "sp": "—",
          "note": {
            "en": "Mine reaches $70 in 2030",
            "zh": "我的在 2030 年达到 $70"
          }
        },
        {
          "item": {
            "en": "Henry Hub 2027E / mid-cycle",
            "zh": "Henry Hub 2027E / 中周期"
          },
          "mine": "$3.16 / $3.50",
          "morningstar": "$3.36 / $3.70",
          "sp": "—",
          "note": ""
        },
        {
          "item": {
            "en": "2026E production",
            "zh": "2026E 产量"
          },
          "mine": {
            "en": "~1,400 MBoe/d (guidance)",
            "zh": "约 140 万桶油当量/日（指引）"
          },
          "morningstar": "1,412 MBoe/d",
          "sp": "—",
          "note": ""
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
          "en": "One Page V2 with DCF; Morningstar FV and gap bridge added",
          "zh": "One Page V2（含 DCF）；补充 Morningstar 合理价值与差距拆解"
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
      "morningstar": 67.0,
      "sp": 66.27
    },
    "moat": "None",
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
        "en": "Morningstar's fair value is **$67** (Oct 26, 2026; no moat, High uncertainty); mine is **$54.40**, **$12.60 lower**. Morningstar's model already includes the **acquisition of Range Resources** (expected to close in early 2027), which mine does not; even so, at Morningstar's **7.5% WACC** my standalone forecasts are worth **$64.33**, almost the same. The gap is the **discount rate**: my 0.9 beta gives an **8.5% WACC**. Morningstar notes that EQT holders need quick delivery of the Range synergies to break even.",
        "zh": "Morningstar 的合理价值为 **$67**（2026年10月26日；无护城河，高不确定性）；我的是 **$54.40**，低 **$12.60**。Morningstar 的模型已计入 **收购 Range Resources**（预计 2027 年初完成），我的模型没有；即便如此，按 Morningstar **7.5% 的 WACC**，我的独立预测值 **$64.33**，几乎相同。差距来自 **折现率**：我用 0.9 的 beta，WACC 为 **8.5%**。Morningstar 指出，EQT 股东需要尽快兑现 Range 的协同效应才能不亏。"
      },
      "bridge": [
        {
          "driver": {
            "en": "Morningstar's own DCF: equity $40.2B / 630M sh = $63.82 (FVE $67)",
            "zh": "Morningstar 自己的 DCF：权益 $402 亿 / 6.30 亿股 = $63.82（公布值 $67）"
          },
          "impact": -3.18
        },
        {
          "driver": {
            "en": "My standalone forecasts (no Range deal) at Morningstar's 7.5% WACC: $64.33",
            "zh": "按 Morningstar 7.5% 的 WACC 计算我的独立预测（不含 Range）：$64.33"
          },
          "impact": 0.51
        },
        {
          "driver": {
            "en": "My 8.5% WACC (beta 0.9) instead of 7.5%",
            "zh": "改用我的 8.5% WACC（beta 0.9）"
          },
          "impact": -9.93
        }
      ],
      "assumptions": [
        {
          "item": {
            "en": "Value per share",
            "zh": "每股价值"
          },
          "mine": "$54.40",
          "morningstar": "$67.00",
          "sp": "$66.27",
          "note": {
            "en": "Street = average of 22 analysts",
            "zh": "华尔街 = 22 位分析师平均"
          }
        },
        {
          "item": "WACC",
          "mine": "8.5%",
          "morningstar": "7.5%",
          "sp": "7.4%",
          "note": {
            "en": "Cost of equity: mine 9.0%, Morningstar 8.0%",
            "zh": "股权成本：我的 9.0%，Morningstar 8.0%"
          }
        },
        {
          "item": {
            "en": "Range Resources deal",
            "zh": "收购 Range Resources"
          },
          "mine": {
            "en": "Not included",
            "zh": "未计入"
          },
          "morningstar": {
            "en": "Included (close early 2027)",
            "zh": "已计入（2027 年初完成）"
          },
          "sp": "—",
          "note": ""
        },
        {
          "item": {
            "en": "Revenue 2026E / 2030E",
            "zh": "营收 2026E / 2030E"
          },
          "mine": "$8.6B / $9.0B",
          "morningstar": "$9.2B / $17.5B",
          "sp": "$9.1B / —",
          "note": {
            "en": "Morningstar 2030 includes Range",
            "zh": "Morningstar 2030 年含 Range"
          }
        },
        {
          "item": {
            "en": "Henry Hub 2027E / 2030E",
            "zh": "Henry Hub 2027E / 2030E"
          },
          "mine": "$3.16 / $3.50",
          "morningstar": "$3.36 / $3.70",
          "sp": "—",
          "note": {
            "en": "Morningstar: mid-cycle $3.70",
            "zh": "Morningstar 中周期 $3.70"
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
          "en": "One Page V2 with DCF; Morningstar FV and gap bridge added",
          "zh": "One Page V2（含 DCF）；补充 Morningstar 合理价值与差距拆解"
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
