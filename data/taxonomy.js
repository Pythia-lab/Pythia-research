/* =========================================================
   Sectors & industries (GICS-style) · 行业分类
   Each industry is [中文, English]. In companies.js you may write
   sector / industry in either language — both are recognised.
   公司数据里的 sector / industry 写中文或英文都可以。
   ========================================================= */
window.TAXONOMY = [
  { zh: "信息技术", en: "Information Technology", industries: [
    ["系统软件", "Systems Software"], ["应用软件", "Application Software"], ["IT服务与咨询", "IT Services & Consulting"],
    ["半导体", "Semiconductors"], ["半导体设备", "Semiconductor Equipment"], ["电脑与外围设备", "Computers & Peripherals"],
    ["通信设备", "Communications Equipment"], ["电子元器件与仪器", "Electronic Components & Instruments"] ]},
  { zh: "通信服务", en: "Communication Services", industries: [
    ["互联网平台与数字广告", "Interactive Media & Advertising"], ["流媒体与娱乐", "Streaming & Entertainment"],
    ["游戏与互动娱乐", "Video Games"], ["电信运营商", "Telecom Carriers"], ["有线与卫星", "Cable & Satellite"], ["出版与广播", "Publishing & Broadcasting"] ]},
  { zh: "非必需消费品", en: "Consumer Discretionary", industries: [
    ["电商与综合零售", "E-commerce & Broadline Retail"], ["专业零售", "Specialty Retail"], ["家居建材零售", "Home Improvement Retail"],
    ["餐饮", "Restaurants"], ["酒店、邮轮与度假", "Hotels, Cruise & Leisure"], ["博彩", "Casinos & Gaming"],
    ["汽车整车", "Automobiles"], ["汽车零部件", "Auto Parts"], ["服装、鞋履与奢侈品", "Apparel, Footwear & Luxury"],
    ["家电与耐用消费品", "Household Durables"], ["教育服务", "Education Services"] ]},
  { zh: "必需消费品", en: "Consumer Staples", industries: [
    ["饮料", "Beverages"], ["酒类", "Brewers, Spirits & Wine"], ["包装食品", "Packaged Foods"],
    ["食品与日用品零售", "Food & Staples Retail"], ["家庭用品", "Household Products"], ["个护与美妆", "Personal Care & Beauty"],
    ["烟草", "Tobacco"], ["农产品", "Agricultural Products"] ]},
  { zh: "医疗保健", en: "Health Care", industries: [
    ["制药", "Pharmaceuticals"], ["生物科技", "Biotechnology"], ["医疗器械", "Medical Devices"],
    ["医疗服务与设施", "Health Care Services & Facilities"], ["管理式医疗", "Managed Care"],
    ["生命科学工具与CRO", "Life Science Tools & CROs"], ["医疗信息化", "Health Care Technology"], ["医药分销", "Health Care Distribution"] ]},
  { zh: "金融", en: "Financials", industries: [
    ["银行", "Banks"], ["保险", "Insurance"], ["支付与金融科技", "Payments & Fintech"], ["资产管理与托管", "Asset Management & Custody"],
    ["券商与投行", "Brokerage & Investment Banking"], ["交易所与金融数据", "Exchanges & Financial Data"],
    ["消费金融", "Consumer Finance"], ["多元化金融与控股", "Diversified Financials & Holdings"] ]},
  { zh: "工业", en: "Industrials", industries: [
    ["航空航天与国防", "Aerospace & Defense"], ["工业机械", "Industrial Machinery"], ["电气设备", "Electrical Equipment"],
    ["建筑与工程", "Construction & Engineering"], ["铁路", "Railroads"], ["航空运输", "Airlines"],
    ["物流与快递", "Logistics & Parcel"], ["专业服务", "Professional Services"], ["环境服务", "Environmental Services"], ["多元化工业", "Industrial Conglomerates"] ]},
  { zh: "能源", en: "Energy", industries: [
    ["油气一体化", "Integrated Oil & Gas"], ["油气勘探与生产", "Oil & Gas E&P"], ["炼化与销售", "Refining & Marketing"],
    ["油服与设备", "Oilfield Services & Equipment"], ["油气中游与管道", "Midstream & Pipelines"], ["天然气", "Natural Gas"], ["煤炭", "Coal"] ]},
  { zh: "原材料", en: "Materials", industries: [
    ["基础化工", "Commodity Chemicals"], ["特种化工", "Specialty Chemicals"], ["工业气体", "Industrial Gases"],
    ["金属与矿业", "Metals & Mining"], ["贵金属", "Precious Metals"], ["钢铁", "Steel"], ["建材", "Construction Materials"],
    ["包装与容器", "Packaging & Containers"], ["纸业与林产品", "Paper & Forest Products"] ]},
  { zh: "公用事业", en: "Utilities", industries: [
    ["电力公用事业", "Electric Utilities"], ["综合公用事业", "Multi-Utilities"], ["独立发电与新能源", "IPPs & Renewables"],
    ["燃气公用事业", "Gas Utilities"], ["水务", "Water Utilities"] ]},
  { zh: "房地产", en: "Real Estate", industries: [
    ["工业与物流 REIT", "Industrial & Logistics REITs"], ["数据中心 REIT", "Data Center REITs"], ["通信塔 REIT", "Tower REITs"],
    ["住宅 REIT", "Residential REITs"], ["零售与写字楼 REIT", "Retail & Office REITs"], ["医疗 REIT", "Health Care REITs"],
    ["房地产开发与服务", "Real Estate Development & Services"] ]}
];

/* Index / universe tags · 指数标签  —  [English, 中文] */
window.INDICES = [
  ["S&P 500", "标普500"], ["Nasdaq-100", "纳斯达克100"], ["Dow 30", "道琼斯30"], ["Russell 1000", "罗素1000"],
  ["Russell 2000", "罗素2000"], ["S&P MidCap 400", "标普中盘400"], ["CSI 300", "沪深300"], ["Hang Seng", "恒生指数"], ["Other", "其他"]
];

/* Markets · 市场  —  code: [English, 中文] */
window.MARKETS = { US: ["United States", "美国"], CN: ["China A-shares", "中国A股"], HK: ["Hong Kong", "港股"], Other: ["Other", "其他"] };
