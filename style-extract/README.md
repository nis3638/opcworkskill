# style-extract

从用户喜欢的**参考网址或截图**中提取 UI 风格，写成设计令牌、风格说明和项目规则文件，让后续页面沿用同一套风格。只借风格，不抄 logo、插画和文案。

## 如何触发

```
按这个网站的风格给我的项目定一套设计规范：https://example.com
```

```
这几张截图是我喜欢的界面，提取成令牌和规则，主风格用第一张，第二张只借表格
```

```
帮我从参考页抽一套 CSS 变量，并生成 .cursor/rules/frontend-ui-standards.mdc
```

## 工作流程 & 产出物

| 步骤 | 做什么 |
|---|---|
| Step 0 | 收集参考，定一个主风格，其他只借明确的局部 |
| Step 1 | 有网址就用 Playwright 抓 `getComputedStyle` 和 `:root` 变量；只有截图则估测并标 `estimated` |
| Step 2 | 整理颜色（含暗色）、字体、间距、圆角、阴影、布局、组件形态、动效、要做/不要做 |
| Step 3 | 写入令牌文件、`docs` 下的风格说明、`.cursor/rules/frontend-ui-standards.mdc` |
| Step 4 | 用令牌做样板组件，与参考截图并排对比，按差异迭代 |
| 输出 | 提取摘要 → 落地文件路径 → 令牌要点 → 要做/不要做 → 对照验证 → 需要人决定 |

## 与其他 skill 的关系

- **style-extract**（本 skill）：写之前定"长什么样"，产出令牌和规则。
- [Anthropic frontend-design](https://github.com/anthropics/skills/tree/main/skills/frontend-design)：按已有规范写页面；规范没写的地方才即兴发挥。
- [ui-review](https://github.com/nis3638/opcworkskill/tree/main/ui-review)：写完之后按同一份 `frontend-ui-standards.mdc` 查项目一致性。

## 配套模板与脚本

- `templates/tokens.template.css`：CSS 变量（及可选 Tailwind `@theme` 片段）。把占位符换成提取值，估测值标 `estimated`。
- `templates/style-brief.template.md`：给人读的风格说明，写到项目的 `docs/`。
- `templates/frontend-ui-standards.template.mdc`：与 ui-review 模板格式相同。复制到项目的 `.cursor/rules/frontend-ui-standards.mdc`，把 `<TOKENS_FILE>`、`<COLOR_TOKENS>`、`<TYPE_SCALE>` 等换成提取结果和本项目路径。
- `scripts/extract-styles.js`：对一个网址转储计算样式和整页截图。依赖 Playwright：`npx playwright install chromium`。

## 安装

复制 `style-extract/` 到 `~/.cursor/skills/`（全局）或项目的 `.cursor/skills/`。

## 注意事项

- 多个参考必须先定主风格，不要混合成四不像。
- 有网址时不要只靠看图估颜色和字号。
- 参考里没有的暗色或组件，不要编造，列为"需要人决定"。
- 项目已有令牌命名时，映射到现有变量，不要另起一套。
