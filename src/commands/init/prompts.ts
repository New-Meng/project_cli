import fs from "fs";
import inquirer from "inquirer";
import { DEFAULT_CONFIG_FILE } from "../../templates/index.js";
import type { ConfigFileInterface } from "../../types/templates.js";
import { readConfig, writeConfig } from "../../core/config.js";

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

export { initPrompts };
