import type { Command } from "commander";
import { initPrompts } from "./prompts.js";
const registerInitCommand = (program: Command) => {
  return program
    .command("init")
    .description("用于初始化项目")
    .action(async (str) => {
      console.log(str, "++??");
      const res = await initPrompts();
      console.log(res, '++??ers')
    });
};

export { registerInitCommand };
