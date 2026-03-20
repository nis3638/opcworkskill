---
name: ai-re-init
description: 初始化基于需求工程的 AI 开发项目骨架，生成规则、输入文件、基础提示词和文档骨架。
---

# Purpose

为一个新项目初始化 AI 需求工程工作区，确保后续开发遵循
需求澄清 → Spec → 设计 → 开发 → 验证
的基本路径。

# When to use

当用户：
- 开启一个新项目
- 只有一句话需求
- 希望先建立规范开发骨架
- 不想让 AI 直接写代码
- 希望后续可以继续执行 ai-re-clarify 和 ai-re-spec

# Inputs

- project_name
- project_type
- tech_stack
- one_line_requirement

# Outputs

初始化以下内容：

- .ai/context/engineering_rules.md
- .ai/input/demand.md
- .ai/prompts/clarify.md
- .ai/prompts/spec.md
- docs/01_requirement.md
- docs/02_spec.md
- README_AI_RE.md

# Rules

- 不直接生成业务代码
- 优先生成工程规则和流程骨架
- 目录和文件命名保持固定
- 输出结果必须能被后续 ai-re-clarify 和 ai-re-spec 使用

# Success Criteria

初始化后，用户可以：
1. 查看需求工程规则
2. 修改一句话需求
3. 直接继续执行 ai-re-clarify
4. 再执行 ai-re-spec

# Execution Flow

1. 读取用户输入：
   - project_name
   - project_type
   - tech_stack
   - one_line_requirement

2. 初始化目录：
   - .ai/context
   - .ai/input
   - .ai/prompts
   - docs

3. 生成文件：
   - .ai/context/engineering_rules.md
   - .ai/input/demand.md
   - .ai/prompts/clarify.md
   - .ai/prompts/spec.md
   - docs/01_requirement.md
   - docs/02_spec.md
   - README_AI_RE.md

4. 将模板中的变量替换为用户输入

5. 返回初始化结果摘要

# Template Variables

支持替换以下变量：

- {{project_name}}
- {{project_type}}
- {{tech_stack}}
- {{one_line_requirement}}

