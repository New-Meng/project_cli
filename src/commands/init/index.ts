import type { Command } from "commander";
import { initPrompts } from "./prompts.js";
import {
  downloadRepoZip,
  uncompressZipAndDelete,
} from "../../core/download.js";
const registerInitCommand = (program: Command) => {
  return program
    .command("init")
    .description("用于初始化项目")
    .action(async (str) => {
      console.log(str, "++??");
      const res = await initPrompts();
      if (res && res.templateGitUrl) {
        const zipPath = await downloadRepoZip(res.templateGitUrl);
        if (zipPath) {
          await uncompressZipAndDelete(zipPath as string);
          console.log("项目初始化完成!");
        } else {
          console.log("下载文件失败");
        }
      }
    });
};

export { registerInitCommand };
