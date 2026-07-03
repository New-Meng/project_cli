import fs from "fs";
import path from "path";
import os from "os";
import { DEFAULT_CONFIG_FILE } from "../templates/index.js";
import type { ConfigFileInterface } from "../types/templates.js";

export const resetConfig = () => {
  try {
    const configDir = path.join(os.homedir(), ".cytool");
    const configPath = path.join(configDir, "config.json");
    fs.writeFileSync(
      configPath,
      JSON.stringify(DEFAULT_CONFIG_FILE, null, 2),
      "utf-8",
    );
    return true;
  } catch (error) {
    throw new Error("设置配置文件重置失败");
  }
};

// 确认文件，没有初始化
export const ensureConfigFile = (): string => {
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

//配置写入
export const writeConfig = (key?: string, value?: unknown, reset?: boolean) => {
  if (reset) {
    resetConfig();
    return;
  }

  const configPath = ensureConfigFile();
  const configObj = JSON.parse(fs.readFileSync(configPath, "utf-8"));
  if (!value) {
    throw new Error("配置值不能为空");
  } else if (!key) {
    throw new Error("配置键不能为空");
  }
  try {
    configObj[key] = value;

    fs.writeFileSync(configPath, JSON.stringify(configObj, null, 2));
  } catch (error) {
    throw new Error("配置写入失败" + error);
  }
};

export const readConfig = (key?: keyof ConfigFileInterface) => {
  try {
    const configPath = ensureConfigFile();
    const configObj = JSON.parse(fs.readFileSync(configPath, "utf-8"));
    if (key) {
      return configObj[key];
    } else {
      return configObj;
    }
  } catch (error) {
    throw new Error("配置读取失败" + error);
  }
};
