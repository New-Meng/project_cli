import fs from "fs";
import type { Command } from "commander";
import { readConfig } from "../../core/config.js";
const registerGetConfigCommand = (program: Command) => {
  return program
    .command("getConfig [name]")
    .alias("get")
    .description("获取项目的配置项")
    .action((optionKey: string) => {
      const configObj = readConfig();
      if (optionKey) {
        const result = configObj[optionKey];
        if (result === undefined) {
          console.log("配置项不存在");
        } else {
          console.log(result);
        }
      } else {
        console.log(configObj);
      }
    });
};

export { registerGetConfigCommand };
