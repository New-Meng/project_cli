import fs from "fs";
import path from "path";
import os from "os";
import inquirer from "inquirer";
import { DEFAULT_CONFIG_FILE } from "../../templates/index.js";
import type { ConfigFileInterface } from "../../types/templates.js";

// 确认文件，没有初始化
const ensureConfigFile = () => {
  const configDir = path.join(os.homedir(), ".cytool");
  const configPath = path.join(configDir, "config.json");

  // 首次使用时，先确保配置目录存在。
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
  }

  // 配置文件不存在时，写入一份默认配置，避免 CLI 直接报错退出。
  if (!fs.existsSync(configPath)) {
    fs.writeFileSync(
      configPath,
      JSON.stringify(DEFAULT_CONFIG_FILE, null, 2),
      "utf-8",
    );
  }

  return configPath;
};

const initPrompts = async () => {
  // 读取 config.json 文件；文件不存在时自动创建默认文件。
  const configPath = ensureConfigFile();
  let config: ConfigFileInterface = {};

  try {
    config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
    const templateList = config.projectTemplate;
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
    fs.writeFileSync(
      configPath,
      JSON.stringify(DEFAULT_CONFIG_FILE, null, 2),
      "utf-8",
    );
  }
};

export { initPrompts };
