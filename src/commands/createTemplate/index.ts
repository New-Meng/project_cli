import ora from "ora";
import type { Command } from "commander";
import { getTemplatePrompts } from "./propmpts.js";
import {
  checkDirExist,
  getUserConfigDir,
  copyFile,
} from "../../core/fs-operate.js";
const registerGeneratorTemplateCommand = (program: Command) => {
  return program
    .command("generatorTemplate [relativePath]")
    .alias("gt")
    .description("生成文件模板")
    .action(async (relativePath) => {
      const { templateFileName } = await getTemplatePrompts();
      const spinner = ora("生成中...").start();
      if (!relativePath) {
        spinner.fail("请输入相对路径");
        return;
      }
      try {
        const basePath = getUserConfigDir(`templates/${templateFileName}`);
        if (!basePath) {
          spinner.fail("模板不存在");
          return;
        }
        checkDirExist(relativePath);
        await copyFile(basePath, relativePath, { includeFolder: true });
        spinner.succeed("生成完成");
      } catch (error: any) {
        spinner.fail((error.message as string) || "生成失败");
        return;
      }
    });
};

export { registerGeneratorTemplateCommand };
