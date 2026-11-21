# 风格说明（<PROJECT_NAME>）

<!--
模板使用说明（写入项目后删除本注释）：
- 把所有 <PLACEHOLDER> 换成本次提取的真实值；没有的条目删掉，不要留空占位。
- 估测值在数值旁标明 estimated。
- 占位符一览：
  <PROJECT_NAME>       项目名
  <PRIMARY_REF>        主风格来源（URL 或截图路径）
  <SECONDARY_REFS>     局部借鉴及各自借了什么
  <EXTRACT_METHOD>     实测（Playwright / 开发者工具）或估测（仅截图）
  <TOKENS_FILE>        令牌文件路径
  <RULES_FILE>         通常是 .cursor/rules/frontend-ui-standards.mdc
  <SCREENSHOT_DIR>     参考截图与对照截图目录
-->

## 参考来源

- 主风格：<PRIMARY_REF>
- 局部借鉴：<SECONDARY_REFS>

只借风格，未使用参考页的 logo、插画和文案。

## 提取方式

<EXTRACT_METHOD>

原始数据与参考截图：`<SCREENSHOT_DIR>`。

## 令牌摘要

### 颜色

- 背景 / 表面：`<COLOR_BG>` / `<COLOR_SURFACE>`
- 文字层级：`<COLOR_TEXT>` / `<COLOR_TEXT_2>` / `<COLOR_TEXT_3>`
- 边框：`<COLOR_BORDER>`
- 主色及状态：`<COLOR_PRIMARY>`（hover `<COLOR_PRIMARY_HOVER>`，light `<COLOR_PRIMARY_LIGHT>`），强调色上的文字 `<COLOR_ON_ACCENT>`
- 语义色：危险 `<COLOR_DANGER>` / 成功 `<COLOR_SUCCESS>` / 警告 `<COLOR_WARNING>`
- 暗色：`<DARK_NOTES>`（参考中未见则写"需要人决定"，不要编）

对应 CSS 变量以 `<TOKENS_FILE>` 为准。

### 字体

- 字族：`<FONT_SANS>`（等宽：`<FONT_MONO>`）
- 字号阶梯：`<TYPE_SCALE>`
- 字重：`<FONT_WEIGHTS>`
- 行高：正文 `<LEADING_BODY>`，标题 `<LEADING_HEADING>`

### 间距、圆角、阴影

- 间距栅格：`<SPACING_GRID>`；常用档位：`<SPACING_SCALE>`
- 圆角：`<RADIUS_SCALE>`
- 阴影：`<SHADOW_SCALE>`

### 布局

- 密度：`<DENSITY>`（紧凑 / 舒适 / 宽松）
- 内容最大宽：`<MAX_WIDTH>`
- 栅格 / 栏数：`<CONTENT_GRID>`

## 组件形态

- 按钮：`<BUTTON_SHAPE>`（主 / 次 / 幽灵，高度、圆角、是否描边）
- 卡片：`<CARD_SHAPE>`（边框还是阴影、内边距）
- 表格：`<TABLE_SHAPE>`（表头、行分割、悬停、是否斑马纹）
- 输入：`<INPUT_SHAPE>`（高度、边框、焦点环）
- 导航：`<NAV_SHAPE>`（顶栏 / 侧栏、当前项怎么标）
- Badge：`<BADGE_SHAPE>`

## 动效

- 时长与缓动：`<MOTION>`
- 动画遵守 `prefers-reduced-motion`。参考中未见动效则写"需要人决定"。

## 要做 / 不要做

- 要做：
  - <DO_1>
  - <DO_2>
- 不要做：
  - <DONT_1>
  - <DONT_2>

## 落地文件

- 令牌：`<TOKENS_FILE>`
- 规则：`<RULES_FILE>`
- 对照截图：`<SCREENSHOT_DIR>`

## 对照验证

<VERIFICATION_NOTES>

## 与其他 skill

style-extract 定风格；[frontend-design](https://github.com/anthropics/skills/tree/main/skills/frontend-design) 按本说明和规则写页面（规范没写的才即兴发挥）；[ui-review](https://github.com/nis3638/opcworkskill/tree/main/ui-review) 按 `<RULES_FILE>` 验收。
