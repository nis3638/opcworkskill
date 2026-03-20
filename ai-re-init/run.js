#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

function printHelp() {
  console.log(`
ai-re-init

用法:
  ai-re-init \\
    --project_name <name> \\
    --project_type <type> \\
    --tech_stack <stack> \\
    --one_line_requirement <requirement>

示例:
  ai-re-init \\
    --project_name alarm-dashboard \\
    --project_type "web application" \\
    --tech_stack "React + TypeScript + Node.js" \\
    --one_line_requirement "实现一个最近7天告警统计展示页面"
`);
}

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i++) {
    const item = argv[i];
    if (item === "--help" || item === "-h") {
      args.help = true;
      continue;
    }
    if (item.startsWith("--")) {
      const key = item.slice(2);
      const value = argv[i + 1];
      args[key] = value;
      i++;
    }
  }
  return args;
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function readTemplate(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function writeFile(filePath, content) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content, "utf8");
}

function renderTemplate(template, variables) {
  return template.replace(/\{\{(.*?)\}\}/g, (_, key) => {
    const cleanKey = key.trim();
    return variables[cleanKey] ?? "";
  });
}

function main() {
  const args = parseArgs(process.argv);

  if (args.help) {
    printHelp();
    process.exit(0);
  }

  const requiredFields = [
    "project_name",
    "project_type",
    "tech_stack",
    "one_line_requirement"
  ];

  const missingFields = requiredFields.filter((field) => !args[field]);
  if (missingFields.length > 0) {
    console.error("缺少必要参数：");
    missingFields.forEach((field) => {
      console.error(`- --${field}`);
    });
    console.error("");
    printHelp();
    process.exit(1);
  }

  const skillRoot = __dirname;
  const templatesDir = path.join(skillRoot, "templates");
  const outputRoot = process.cwd();

  const variables = {
    project_name: args.project_name,
    project_type: args.project_type,
    tech_stack: args.tech_stack,
    one_line_requirement: args.one_line_requirement
  };

  const filesToGenerate = [
    {
      template: "engineering_rules.md",
      output: ".ai/context/engineering_rules.md",
      useRender: false
    },
    {
      template: "demand.md",
      output: ".ai/input/demand.md",
      useRender: true
    },
    {
      template: "clarify.prompt.md",
      output: ".ai/prompts/clarify.md",
      useRender: false
    },
    {
      template: "spec.prompt.md",
      output: ".ai/prompts/spec.md",
      useRender: false
    },
    {
      template: "README_AI_RE.md",
      output: "README_AI_RE.md",
      useRender: false
    }
  ];

  for (const item of filesToGenerate) {
    const templatePath = path.join(templatesDir, item.template);
    const outputPath = path.join(outputRoot, item.output);
    const templateContent = readTemplate(templatePath);
    const finalContent = item.useRender
      ? renderTemplate(templateContent, variables)
      : templateContent;

    writeFile(outputPath, finalContent);
    console.log(`已生成: ${item.output}`);
  }

  writeFile(path.join(outputRoot, "docs/01_requirement.md"), "");
  writeFile(path.join(outputRoot, "docs/02_spec.md"), "");

  console.log("\nai-re-init 执行完成。");
}

main();