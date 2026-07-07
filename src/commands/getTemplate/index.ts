import type { Command } from "commander";
import { getFilesDirName } from "../../core/fs-operate.js";
const registerGetTemplateCommand = (program: Command) => {
  return program
    .command("getTemplate [childFile]")
    .alias("listt")
    .description("获取文件模板")
    .action(async (childFile) => {
      const templateList = getFilesDirName(`templates/${childFile}`);
      templateList.forEach((item) => {
        console.log(item);
      });
    });
};

export { registerGetTemplateCommand };
