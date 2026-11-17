# PYTHIA Research — 网站工作守则（每次对话开始时先读）

这个仓库就是用户的个人公司研究网站（GitHub Pages）：公司分析库、One Page、DCF 估值和 Fair Value 差距拆解，中英双语。
用户用它积累研究、在求职时展示能力。**这个网站是长期项目，每次对话都要为它服务。**

## 每次对话开始

1. 先了解网站现状，再回答：读 `data/companies.js`（已覆盖哪些公司）、`data/site.js`（个人信息、默认语言），
   用 `git log --oneline -15` 看最近改了什么。不必向用户复述，除非他问。
2. **默认这次对话会调整网站。** 对话中定下的任何改动（新增/更新公司、文字、排版、配色、功能）都直接改进仓库，
   检查后提交并推送到 `main`，GitHub Pages 会在 1–2 分钟内上线。
   只有当用户明确说「此次对话不涉及网站调整」时才不改网站。
3. 改完用一两句话告诉用户改了什么、线上地址，以及需要他确认的地方。

## 网站结构

```
index.html            单页应用入口（hash 路由：#cvs 公司页、#onepage、#op-cvs、#about、#add）
assets/app.js         全部逻辑与中英文界面文字（UI 字典 en / zh）
assets/style.css      样式；颜色在最上方 :root（--accent 藏青、--paper 米色、--ink 正文黑）
data/companies.js     公司数据（每家一个对象，文字可写 {en, zh}）
data/site.js          品牌名、首页文字、关于我、阈值
data/taxonomy.js      GICS 行业分类与指数列表
reports/<id>/         每家公司的 PDF（供下载）和 PNG（网页显示）
onepage/specs/        每家公司 One Page 的 JSON 规格（重新生成 One Page 用）
.claude/skills/pythia-onepage/   One Page 生成技能（Word 母版 → PDF/PNG）
使用说明.md            给用户看的中文操作指南
```

## 用户已确定的偏好（不要再改回去）

- **配色与品牌：** 藏青 + 近黑文字 + 米色底，衬线大标题；左上角品牌名为 PYTHIA。
- **双语：** 默认英文，右上角 EN / 中文切换。英文界面显示英文 One Page，中文界面显示中文 One Page（文件带 `lang` 字段）。
- **公司列表：** 第一行写当前语言的全称，第二行写另一种语言的名称加股票代码标签；不显示「Example」标签。
- **悬停效果：** 行业、指数和切换按钮悬停时为藏青底白字。下拉框用自绘箭头，不得超出框。
- **下载：** 只提供 PDF 下载（`Download PDF ↓`），绝不链接 Word / Excel / PPT。One Page 图片点击可放大。
- **Word 原件绝不进仓库**（`.gitignore` 已屏蔽 docx/xlsx/xlsm/pptx）。公开仓库里的任何文件都能被别人下载。
- **网站上的「我的估值」** 用用户自己的基准目标价；DCF 只作交叉验证时写在说明里。

## 新增或更新一家公司

1. 用 `pythia-onepage` 技能（本仓库 `.claude/skills/` 里有一份）读用户上传的材料，生成中英文 One Page：
   Word 母版交给用户，PDF + PNG 放进 `reports/<id>/`，规格 JSON 存到 `onepage/specs/<id>_onepage.json`。
2. 把技能生成的 `_site_entry.js` 内容合并进 `data/companies.js`（已有条目就替换，不要重复）。
3. 本地检查：`node -e "global.window={};require('./data/companies.js')"` 能加载；
   用 Playwright 打开 `index.html#<id>` 和 `#onepage`，中英文各看一遍，确认没有报错、图片和下载按钮正常。
4. 提交并推送。

## 质量要求

- 交付前自己先看一遍（截图），别让用户来发现对齐、裁切、贴线、换行这类问题。
- 不编造数据：示例或占位数字不得出现在线上网站；拿不到的数据标 `--` 并在脚注说明。
- 外部数据注明来源与日期（SEC、StockAnalysis、Morningstar 等）。

## 发布

- 分支：`main`；GitHub Pages 从 `main` 根目录发布（仓库含 `.nojekyll`）。
- 提交信息用中文或英文简洁说明改动。
