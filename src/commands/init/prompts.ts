import path, { join } from "path";
import inquirer from "inquirer";
import type { ConfigFileInterface } from "../../types/templates.js";
import { readConfig, writeConfig } from "../../core/config.js";
import {
  getCurrentDirChidlName,
  getUserConfigDir,
} from "../../core/fs-operate.js";

// 项目生成选项
const initPrompts = async () => {
  // 读取 config.json 文件；文件不存在时自动创建默认文件。
  let templateList: ConfigFileInterface["projectTemplate"] =
    readConfig("projectTemplate");

  try {
    if (templateList && templateList.length > 0) {
      const answers = await inquirer.prompt([
        {
          type: "list",
          name: "templateGitUrl",
          message: "请选择项目模板",
          choices: templateList,
        },
      ]);
      return answers;
    }
  } catch (error) {
    // 配置文件内容损坏时，回退为默认配置，并覆盖为合法 JSON。
    console.warn("检测到配置文件格式异常，已自动重置为默认配置。", error);
    writeConfig(undefined, undefined, true);
  }
};

// 创建模板选项
const createTemplateFilePropmpts = async (childFile?: string) => {
  const resultList: string[] = [];
  const templatesDir = getUserConfigDir(
    path.join("templates", childFile || ""),
  );
  const fileListName = getCurrentDirChidlName(templatesDir);
  const promptList: { name: string; value: string }[] = [];
  fileListName.forEach((item) => {
    if (!item.includes(".")) {
      promptList.push({
        name: item,
        value: item,
      });
      // 如果是文件夹，需要区分，文件夹复制，还是单文件复制
      promptList.push({
        name: item + "(file)",
        value: item + "(file)",
      });
    } else {
      promptList.push({
        name: item,
        value: item,
      });
    }
  });

  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "templatePath",
      message: "请选择项目模板",
      choices: promptList,
    },
  ]);
  if (answers.templatePath.includes("(file)")) {
    resultList.push(answers.templatePath);
    const jointPath = childFile
      ? path.join(childFile, answers.templatePath.replace("(file)", ""))
      : path.join(answers.templatePath.replace("(file)", ""), "");
    const res = await createTemplateFilePropmpts(jointPath);
    resultList.push(...res);
    return resultList;
  } else {
    resultList.push(answers.templatePath);
    // 单文件复制
    return resultList;
  }
};

export { initPrompts, createTemplateFilePropmpts };
