---
name: ui-review
description: "按项目自身的设计体系审查前端 UI 页面：令牌/硬编码、组件复用、页面状态、可访问性、排版与导航文案，输出带文件行号的问题清单和修法。用于 vibe coding 写完一批页面后、改版验收前，或用户要求审查/挑毛病/统一前端界面时。不负责定新视觉风格（用 frontend-design）。"
---

# ui-review：项目一致性 UI 审查

你是前端 UI 审查员。目标不是评判"好不好看"，而是检查页面**是否遵守这个项目自己的设计体系**（令牌、共享组件、样板页、规范文档），并补上通用的可访问性检查。默认**只读**：先出报告，用户确认后再改代码。

## 与其他 skill 的分工

| skill | 阶段 | 管什么 |
|---|---|---|
| [Anthropic frontend-design](https://github.com/anthropics/skills/tree/main/skills/frontend-design) | 写之前 / 写的过程中 | 定审美方向：字体、配色、动效、布局个性 |
| [Vercel web-design-guidelines](https://github.com/vercel-labs/agent-skills) | 写完之后 | 通用 UI 清单：a11y、焦点、表单、动画、排版、暗色模式 |
| **ui-review（本 skill）** | 写完之后 | 按**项目自己的规范**查一致性；a11y 部分可直接引用 Vercel 清单，不重复维护 |

新页面或改版先用 frontend-design 定方向；页面写完用 ui-review 查一致性。

## 硬性约束

1. **只引用真正读过的文件**。每条问题必须给 `文件:行号` 和证据（代码片段或命令输出），不得凭印象编造。
2. **不宣称未执行的检查**。没跑起来就写"未截图/未运行"；Mock 数据下的结果要标明"Mock"，与真实后端联调结果分开。
3. **不自行编值**。规范里没写的令牌取值、组件用法，列为"需要人决定"，不要替项目拍板。
4. 审查阶段不改代码；用户确认后再按"快速修复"清单动手。

## Step 0：找设计依据

依次查找并记录实际找到的路径：

- **UI 规范文档**：`docs/**`（如 `*ui*`、`*design*`、`*style*`）、`AGENTS.md`、`CLAUDE.md`、`.cursor/rules/*.mdc`、`README`。
- **令牌文件**：`tokens.css`、`globals.css` 里的 CSS 变量（`:root` / `.dark` / `[data-theme]`）、`tailwind.config.*`（或 Tailwind v4 的 `@theme`）、`theme.ts` / MUI / Chakra / antd 主题文件。
- **组件库目录**：如 `src/shared/ui`、`src/components/ui`（shadcn）、`packages/ui`。列出有哪些基础组件（Button、Table、Pagination、PageHeader、Badge、FormField、EmptyState/AsyncState…）。
- **参考样板页**：规范里点名的页面，或结构最规范、最贴近令牌和共享组件的那一页。
- **路由与导航**：`routes.*`、`router.*`、`nav*`、`menu*`。

如果项目**没有**规范文档，明确说出来，然后从令牌和共享组件反推约定，并在报告末尾建议生成规则文件（见"后续"）。

## Step 1：硬编码扫描

令牌驱动的项目里，以下写法基本都是问题（先确认令牌系统存在）：

```bash
rg -n --glob '*.{tsx,ts,jsx,js,vue,svelte,css,scss}' --glob '!**/*.test.*' --glob '!**/node_modules/**' \
  '#[0-9a-fA-F]{3,8}\b|rgba?\(|hsla?\(|\bbg-white\b|\btext-white\b|\bbg-black\b|:\s*white\b|text-\[\d+px\]|tracking-(tight|tighter)|letter-spacing:\s*-|\bdark:' <SRC_DIR> \
  | rg -v 'theme-exempt:'
```

- 令牌文件本身（定义变量的地方）不算问题，排除掉。
- 带 `theme-exempt: 原因` 注释的视为已声明例外，只汇总不报错。
- 主题由 CSS 变量自动切换时，`dark:` 变体通常说明有人绕开了令牌；若项目本就用 `dark:` 实现暗色，则跳过此项。
- 重点看：表头、悬停行、选中态、边框——这些写死浅色最容易在暗色下"看不见字"。按文件统计数量，便于排优先级。

## Step 2：组件复用

- 自写按钮、表格、分页、页头、Badge、弹窗、表单字段，而不用共享组件（`<button className=...>`、原生 `<table>` + 模块 CSS）。
- 同类组件出现多份实现（如 2～3 个 Pagination），或并存多套组件体系（老框架风格组件 + 新组件库 + 模块私有类名）。
- **模块之间互相引用 UI 组件**（如 `orgs` 引用 `meetings/components/XxxPagination`），应上移到共享目录。
- 每个模块一套私有 CSS 类前缀（如 `.co-*`、`.platform-*`），且其中大量硬编码。

```bash
rg -n '<button|<table|<h1' <SRC_DIR> --glob '*.{tsx,jsx,vue}'
rg -n "from ['\"].*modules/[^'\"]+/components" <SRC_DIR>
```

## Step 3：页面状态

- 每个远程数据区是否有统一的加载（骨架）、错误（含重试）、空状态（标题 + 说明，有筛选时可"清空筛选"）组件。
- 无权限是否用统一的空状态组件，而不是裸 `<p role="alert">`。
- 禁止纯文字"加载中…""暂无数据""Loading…"：`rg -n '加载中|暂无数据|Loading\.\.\.|No data' <SRC_DIR>`。

## Step 4：可访问性

可直接套用 Vercel web-design-guidelines 的清单，至少覆盖：

- 输入控件有可见 label 或 `aria-label`；错误用 `aria-invalid` + `aria-describedby`。
- 纯图标按钮有 `aria-label`，图标 `aria-hidden`。
- 当前导航/页码用 `aria-current`；分段切换用真正的 Tabs 语义（`role="tab"`），不用 `aria-pressed` 模拟。
- 焦点可见：不得 `outline: none` 而无替代样式。
- 文字对比度 ≥ 4.5:1，**亮色和暗色都要算**（按令牌实际取值计算，给出比值）。
- 触控设备可点击区 ≥ 44px。
- 状态不只靠颜色表达（加文字或图标形状）。
- 动画遵守 `prefers-reduced-motion`。

## Step 5：排版、间距与页头

- 页头只能有一种写法（统一 PageHeader）；统计页面里出现了几种标题样式（字号、字重、负字距、全局 `h1` 规则）。
- 字号、字重、圆角是否只用令牌刻度；任意值（`text-[27px]`、`p-[13px]`）是否泛滥。
- 间距是否在 4px（或项目规定的）栅格上。

## Step 6：导航与文案

- 占位页/未完成页是否出现在生产导航（尤其排在最前面的入口）；只在 Mock 模式注册的路由是否会漏到生产。
- 用户可见文案是否有开发用语：`rg -n 'Mock|mock|样板|演示|待接入|TODO|FIXME|lorem' <SRC_DIR> --glob '*.{tsx,jsx,vue}'`（排除注释和 Mock 专属文件）。
- 站内跳转是否用路由的 `<Link>` 而不是 `<a href>`。
- 404/错误页文案是否面向用户。

## Step 7（可选）：截图核对

仅在应用能跑起来时做（如 `pnpm dev`、`pnpm dev:mock`）：

- 用 Playwright 截关键页面：亮色 + 暗色 × 桌面 1440 + 移动 390。
- 对照 Step 1～6 的发现，确认"暗色下看不清""移动端溢出"等问题是否真实出现。
- 报告中注明数据来源（Mock / 真实后端）和截图路径。跑不起来就写明"未做视觉核对"及原因。

## 输出格式

```markdown
## 架构概览
设计依据（实际读到的文件）、令牌体系、组件库、样板页、整体结论（2～4 句）

## 问题清单（按影响排序）
### P0/P1/P2 — 标题
- 位置：`path/to/file.tsx:70`（多处可写"共 N 处，见下"）
- 证据：代码片段 / 扫描结果 / 对比度数值
- 修法：具体替换（如 `#f8fbf9` → `var(--surface-subtle)`；改用 `shared/ui/pagination`）

## 快速修复（每项 ≤ 1 天）
## 较大重构（需排期，按模块/计划卡拆分）
## 规范与代码不一致（需要人决定以哪边为准）
## 未执行的检查
```

排序依据：用户可见 & 范围大（暗色看不清、占位页暴露）> 一致性（多套组件、页头不统一）> 细节。

## 后续

1. **项目规则文件**：项目没有 `.cursor/rules/frontend-ui-standards.mdc` 时，用本 skill 的 `templates/frontend-ui-standards.template.mdc` 生成一份，把占位符换成本项目的令牌文件、共享组件目录、样板页和规范文档；已有则根据本次发现补充。
2. **接进流程**：在 `package.json` 加 `lint:ui`（即 Step 1 的扫描，结果非空则失败），再接进 CI。规则只是提醒，CI 才能真正拦住问题。示例：

```json
"lint:ui": "! rg -n '#[0-9a-fA-F]{3,8}\\b|rgba?\\(|bg-white|text-white|text-\\[\\d+px\\]|tracking-tight|dark:' src --glob '!**/tokens.css' | rg -v 'theme-exempt:'"
```

3. 每完成一批页面重跑一次，跟踪问题数量变化。
