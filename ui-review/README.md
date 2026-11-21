# ui-review

按**项目自己的设计体系**审查前端 UI：硬编码颜色/字号、组件复用、加载/错误/空/无权限状态、可访问性、页头与排版、导航与文案，输出带 `文件:行号` 的问题清单和具体修法。

## 如何触发

```
帮我审查一下 frontend/ 的页面，列出 UI 问题和修改建议
```

```
这批页面是 vibe coding 出来的，按项目规范挑挑毛病
```

```
检查暗色模式和可访问性，看看哪些地方没用令牌
```

## 工作流程 & 产出物

| 步骤 | 做什么 |
|---|---|
| Step 0 | 找设计依据：规范文档、令牌文件、共享组件目录、样板页 |
| Step 1 | `rg` 扫描硬编码（支持 `theme-exempt:` 例外） |
| Step 2–6 | 组件复用、页面状态、可访问性、排版页头、导航文案 |
| Step 7（可选） | Playwright 截图：亮/暗 × 1440/390 |
| 输出 | 按影响排序的问题清单 → 快速修复 / 较大重构 / 规范与代码不一致 / 未执行的检查 |

## 与其他 skill 的关系

- [Anthropic frontend-design](https://github.com/anthropics/skills/tree/main/skills/frontend-design)：写之前定视觉方向。
- [Vercel web-design-guidelines](https://github.com/vercel-labs/agent-skills)：通用 UI/a11y 清单，ui-review 的可访问性部分直接引用它。
- ui-review：写完之后查**项目一致性**，这是前两者覆盖不到的。

## 配套模板

`templates/frontend-ui-standards.template.mdc`：项目级规则模板。复制到项目的 `.cursor/rules/frontend-ui-standards.mdc`，把 `<TOKENS_FILE>`、`<SHARED_UI_DIR>`、`<REFERENCE_PAGE>`、`<UI_SPEC_DOC>` 等占位符换成本项目的值。skill 管"怎么查"，规则文件管"这个项目的标准是什么"。

## 安装

复制 `ui-review/` 到 `~/.cursor/skills/`（全局）或项目的 `.cursor/skills/`。

## 注意事项

- 默认只读，先出报告，确认后再改。
- 只引用实际读过的文件；没跑的检查会明确写"未执行"，Mock 结果与真实联调分开标注。
- 建议把 Step 1 的扫描写成 `lint:ui` 脚本并接进 CI。
