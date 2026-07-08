import path from "path";
import ora from "ora";
import type { Command } from "commander";
import { createTemplateFilePropmpts, initPrompts } from "./prompts.js";
import {
  downloadRepoZip,
  uncompressZipAndDelete,
} from "../../core/download.js";
import {
  checkDirExist,
  getCurrentDir,
  getCurrentDirChidlName,
  getUserConfigDir,
} from "../../core/fs-operate.js";
import { copyFile } from "../../core/fs-operate.js";
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

// 备注： 这里换成两个可选项，然后递归选择文件，支持直接创建指定名称的文件夹
// 7.08号想想怎么弄
const registerUseTemplates = (propgram: Command) => {
  return propgram
    .command("use-templates")
    .alias("uset")
    .option("-t, --targetPath [string]", "指定生成模板的路径")
    .description("用于使用项目模板")
    .action(async (options) => {
      // 没有写目标，就复制到当前目录下
      let targetPath;

      targetPath = getCurrentDir(options?.targetPath);
      console.log(options, "++??options");
      const res = await createTemplateFilePropmpts();

      const fileSuffix = targetPath.split(".")?.[1];
      const selectFileSuffix = (res[res.length - 1] as string).split(".")?.[1];

      if (fileSuffix != selectFileSuffix) {
        console.log("目标路径和模板文件后缀不一致");
        return;
      }

      const coptyPath = res.reduce((prev, cur) => {
        return path.join(prev, cur.replace("(file)", ""));
      }, getUserConfigDir("templates"));
      await copyFile(coptyPath, targetPath, {
        includeFolder: true,
      });
      console.log("模板写入完成");
      return;
    });
};

// 初始化时，生成默认模板
const initCodeTemplate = async () => {
  const relativePath = getCurrentDir("src/templates");
  const targetPath = getUserConfigDir("templates");
  const fileNameListRelative = getCurrentDirChidlName(relativePath);
  const fileNameListRoot = getCurrentDirChidlName(targetPath);

  if (fileNameListRoot.length == 0) {
    for (let item of fileNameListRelative) {
      if (item !== "index.ts" && item !== "index.js") {
        // 除开index.ts 其它文件全部复制
        checkDirExist(path.join(targetPath, item));
        await copyFile(
          path.join(relativePath, item),
          path.join(targetPath, item),
          {
            includeFolder: true,
          },
        );
      }
    }
  }
};

export { registerInitCommand, initCodeTemplate, registerUseTemplates };
