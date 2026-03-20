# ai-re-init

初始化基于需求工程的 AI 开发项目骨架，生成工程规则、输入文件、基础提示词和文档骨架。

## 背景

在 AI 辅助开发中，直接让 AI 写代码往往会跳过需求澄清和规格定义，导致返工。`ai-re-init` 为新项目建立一套规范的需求工程工作区，确保后续开发遵循：

```
需求澄清 → Spec → 设计 → 开发 → 验证
```

## 适用场景

- 开启一个新项目，只有一句话需求
- 希望先建立规范开发骨架，而不是直接让 AI 写代码
- 需要后续配合 `ai-re-clarify` 和 `ai-re-spec` 继续推进

## 输入参数

| 参数 | 说明 | 示例 |
|------|------|------|
| `--project_name` | 项目名称 | `alarm-dashboard` |
| `--project_type` | 项目类型 | `"web application"` |
| `--tech_stack` | 技术栈 | `"React + TypeScript + Node.js"` |
| `--one_line_requirement` | 一句话需求 | `"实现一个最近7天告警统计展示页面"` |

## 使用方式

```bash
node run.js \
  --project_name alarm-dashboard \
  --project_type "web application" \
  --tech_stack "React + TypeScript + Node.js" \
  --one_line_requirement "实现一个最近7天告警统计展示页面"
```

## 生成的目录结构

执行后会在当前工作目录下生成以下文件：

```
.ai/
├── context/
│   └── engineering_rules.md    # AI 工程规则（禁止跳步、结构化输出等）
├── input/
│   └── demand.md               # 项目基本信息和一句话需求
└── prompts/
    ├── clarify.md              # 需求澄清提示词（供 ai-re-clarify 使用）
    └── spec.md                 # Spec 生成提示词（供 ai-re-spec 使用）
docs/
├── 01_requirement.md           # 需求澄清结果（初始为空，待填充）
└── 02_spec.md                  # 规格说明书（初始为空，待填充）
README_AI_RE.md                 # Spec 编写指引
```

## 后续流程

初始化完成后，按以下顺序继续推进：

1. **修改需求** — 编辑 `.ai/input/demand.md`，补充或调整一句话需求
2. **需求澄清** — 执行 `ai-re-clarify`，基于提示词引导 AI 生成结构化需求，输出到 `docs/01_requirement.md`
3. **生成 Spec** — 执行 `ai-re-spec`，基于需求文档生成软件需求规格说明书，输出到 `docs/02_spec.md`

## 设计原则

- **不生成业务代码** — 只生成工程骨架和流程文件
- **目录和文件命名固定** — 保证后续工具链可以识别和复用
- **阶段产物串联** — 每个阶段以上一阶段的产物为输入，确保可追溯
