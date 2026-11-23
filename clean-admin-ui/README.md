# clean-admin-ui

一套去业务化、开箱即用的现代 B 端中后台 UI 视觉与组件规范 Skill（适用于 React + Tailwind + shadcn/ui，也可直接迁移至任意前端框架）。

## 核心特点

- **一体化三区衔接**：桌面端浅灰外底（`#F2F4F7` / 暗 `#111419`）托起左侧**纯白浮起小卡菜单**（含顶部 `⌘K` 全局搜索入口）与右侧**一整张大圆角连续纯白纸面**；页头去硬横线，与下方 1px 细描边圆角数据卡片左右严格对齐，彻底消除 T 字硬切与灰沟割裂。
- **1 行换品牌色**：内置 `--action-primary` 语义别名，默认青绿 Jade（`#087F6B` / 暗 `#3CC4A7`），修改 2 行 RGB 即可无缝切换炭黑或任意品牌主色。
- **高频决策形态**：融合双栏队列与详情、轻决策 Popover、1px 细描边无重影卡片、高风险影响前置确认弹窗、1/2/3 列自适应短表单弹窗与浅冰蓝内联提示块。
- **开箱可验收**：自带完整的亮/暗色 `tokens.css`、Tailwind 扩展配置、响应式侧栏应用壳 CSS 与 `frontend-ui-standards.mdc` 自查规则（可直接配合 `ui-review` 使用）。

## 包含文件

```text
clean-admin-ui/
├── README.md
├── SKILL.md
└── templates/
    ├── tokens.css                  # 完整亮/暗色语义令牌（WCAG AA 对比度已校核）
    ├── tailwind.extend.js          # Tailwind v3 theme.extend 片段
    ├── shell-side-nav.css          # 纯白侧栏 + 浅灰画布响应式应用壳样式
    └── frontend-ui-standards.mdc   # 可直接放进 .cursor/rules/ 的 UI 验收规则
```

## 快速复用

1. 将本目录安装到你的全局 skills 目录（如 `~/.gemini/config/skills/clean-admin-ui` 或 `~/.config/magpie/library/skills/clean-admin-ui`）。
2. 在新项目中对 Agent 说：
   > 按 `clean-admin-ui` 规范初始化设计令牌、侧栏应用壳和 `.cursor/rules/frontend-ui-standards.mdc`。
3. 如需把默认青绿换为其他品牌色（例如炭黑极简风），只需在 `tokens.css` 中修改 `--action-primary-rgb` 与 `--action-primary-hover-rgb`。
