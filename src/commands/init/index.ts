import ora from "ora";
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
      const res = await initPrompts();
      const spinner = ora("下载中...").start();
      if (res && res.templateGitUrl) {
        try {
          const zipPath = await downloadRepoZip(res.templateGitUrl);
          if (zipPath) {
            spinner.text = "解压中...";
            await uncompressZipAndDelete(zipPath as string);
            spinner.succeed("项目初始化完成!");
          } else {
            spinner.fail("新增模板文件失败");
          }
        } catch (error) {
          spinner.fail(error as string);
        }
      }
    });
};

export { registerInitCommand };
