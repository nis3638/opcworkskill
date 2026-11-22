---
name: clean-admin-ui
description: "开箱即用的现代 B 端后台 UI 视觉与组件规范（青绿 Jade 主操作色可单点换色、纯白侧栏与浅灰画布清晰分区、1px 细描边卡片、双栏工作台、轻决策 Popover、短表单弹窗与亮/暗双主题）。用于快速为新的中后台/SaaS 项目落地统一设计令牌、应用壳样式与前端验收规则。"
---

# clean-admin-ui：现代极简 B 端后台 UI 规范

这是一套**去业务化、开箱即用**的 B 端后台视觉与组件规范：以高净度中性色骨架（纯白侧栏 + 浅灰工作区画布 + 1px 细描边卡片）承载高频决策信息，以克制的语义色标识状态，支持亮/暗双主题自动切换，并通过 `--action-primary` 语义别名实现 **1 行代码换品牌主色**（默认青绿 Jade）。

## 与其他 skill 的分工

| skill | 阶段 | 职责 |
|---|---|---|
| **clean-admin-ui（本 skill）** | 项目初始化 / 改版定标 | 直接提供已定稿的设计令牌、应用壳样式、组件形态与验收规则 |
| `style-extract` | 需要从其他参考页另提风格时 | 提取新参考风格；若直接沿用本规范，可跳过 |
| `frontend-design` | 编写具体页面时 | 遵守本 skill 的令牌、圆角与组件形态，规范未覆盖的布局创意再发挥 |
| `ui-review` | 写完页面验收时 | 按本 skill 生成的 `frontend-ui-standards.mdc` 检查偏差与硬编码 |

## 落地步骤（将本套 UI 套用到新项目）

### Step 1：导入设计令牌与 Tailwind 映射
1. 将 `templates/tokens.css` 复制到项目样式目录（如 `src/shared/styles/tokens.css`），并在入口样式中最先引入。
2. 若使用 Tailwind CSS v3，将 `templates/tailwind.extend.js` 的 `theme.extend` 合并到项目的 `tailwind.config.js`。
3. **如需更换品牌主色**：只需修改 `tokens.css` 亮/暗块中的 `--action-primary-rgb` 与 `--action-primary-hover-rgb`（例如切为炭黑 `29 29 32` / 暗色 `240 242 245`），其余中性色、语义色与组件无需改动。

### Step 2：搭建应用壳（左右背景清晰区分）
- 参考 `templates/shell-side-nav.css` 构建桌面与移动响应式壳层：
  - **桌面（≥ 1024px）**：左侧菜单宽 `224px`（收起图标轨 `56px`），使用 `var(--surface)` 底色（亮色纯白 `#FFFFFF` / 暗色 `#1B1F26`）+ 右侧 `1px solid var(--border-light)`；右侧主工作区使用 `var(--paper)` 画布底色（亮色 `#F5F6F8` / 暗色 `#14171C`），左右分区一目了然。
  - **移动（< 1024px）**：顶部 `48px` `surface` 移动栏，侧栏转为 `surface` 抽屉，触控区不小于 `44×44px`。
  - **导航激活项**：使用 `var(--selected)` 柔和灰底 + `inset 0 0 0 1px var(--border)` 内描边 + `var(--ink)` 500 字重，不浮起、不染高饱和大色块。

### Step 3：写入项目验收规则
- 将 `templates/frontend-ui-standards.mdc` 复制到项目的 `.cursor/rules/frontend-ui-standards.mdc`（或项目文档目录），替换 `<TOKENS_FILE>`、`<SHARED_UI_DIR>` 为项目真实路径，供后续开发与 `ui-review` 验收使用。

### Step 4：按组件形态编写页面
实现业务页时遵循以下核心形态约定：

| 组件 | 规范形态 |
|---|---|
| **按钮（Button）** | 默认高 `32px`、行内小按钮 `28px`、圆角 `6px–8px`。每个局部操作区最多 1 个实心主按钮（`bg-action-primary text-on-accent`）；次按钮白底 `1px border`；危险确认用 `bg-cinnabar text-on-accent`。全站按钮统一矩形圆角，不用全圆角药丸主按钮。 |
| **卡片与双栏工作台** | 纯白 `surface` 底 + `1px solid var(--border-light)`，圆角 `12px`，静态卡片无重阴影。高频审核/处理场景优先采用「左侧队列（约 60%）+ 右侧选中详情（约 40%）」双栏联动；选中卡切为 `var(--selected)` 浅灰底，不加彩色粗边框。 |
| **表格与列表** | 桌面列表无斑马纹、1px 极淡行分隔、浅灰悬停；支持紧凑 `36px` / 常规 `40px` / 双行摘要 `64px` 三档行高；数字与金额强制 `tabular-nums`。 |
| **输入与表单控件** | 高 `32px–36px`，圆角 `6px–8px`，聚焦 `var(--action-primary)` 边框 + 柔和外环。Checkbox（`4px` 圆角）、Radio、Switch 开启态及多选胶囊选中态统一使用 `var(--action-primary)`。 |
| **短表单弹窗（Dialog）** | 圆角 `16px`、`shadow-lg`、遮罩 `var(--overlay)`。顶部配标题 + 1 行副说明；字段按长度分 1/2/3 列；少量离散特性用全圆角多选胶囊组；提交前如有系统联动或默认规则，在底部操作栏上方放浅冰蓝提示块（`bg-navy-light border-navy-border`）；底部采用左次右主分布。 |
| **轻决策与高风险确认** | 委托、筛选、轻量配置优先用锚定 **Popover**（无需全屏遮罩）；驳回、删除、批量提交用居中 **Dialog**，并在确认按钮上方明确列出受影响对象、汇总金额/数量或不可逆后果。 |
| **Badge / 状态标签** | 圆角全圆（`rounded-full`），高 `20px–24px`，采用**浅语义底 + 同色系深字 + 1px 浅描边**（可选左侧 6px 圆点）。同一行最多 1 个彩色状态胶囊，普通属性直接显示纯文字。 |

## 要做 / 不要做

### 要做
1. **90% 以上面积保持中性色骨架**：纯白侧栏、浅灰画布、1px 细描边；彩色只留给主按钮、状态胶囊、校验图标、图表与危险确认。
2. **暗色由令牌自动切换**：业务代码只写语义类名（如 `bg-surface`、`text-ink-3`），不写 Tailwind `dark:` 变体与十六进制硬编码。
3. **对比度底线**：正文、说明和占位提示至少使用 `ink-3`（亮/暗均 ≥ 4.5:1）；`ink-4` 仅用于禁用文字、装饰图标和分隔符；实心主/危险按钮上的文字一律用 `on-accent`。
4. **动效与无障碍**：默认过渡 `0.16s cubic-bezier(0.2, 0, 0, 1)`，严格遵守 `prefers-reduced-motion: reduce`。

### 不要做
1. 不要彩色侧栏、渐变大表头、重阴影卡片或高饱和实心状态大标签。
2. 不要用彩色粗边框表示列表或卡片选中态。
3. 不要把低频轻操作全部塞进全屏遮罩弹窗。
4. 不要把桌面宽表格直接缩小当作移动端适配（移动端改用单列摘要卡 + `44px` 最小触控区）。
