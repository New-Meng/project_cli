import type { Command } from "commander";
import { writeConfig } from "../../core/config.js";
const registerSetConfigCommand = (program: Command) => {
  return program
    .command("setConfig [name] [value]")
    .alias("setc")
    .description("设置项目的配置项")
    .action((optionKey: string, optionValue: string) => {
      writeConfig(optionKey, optionValue);
      console.log("配置项设置成功");
    });
};

export { registerSetConfigCommand };
