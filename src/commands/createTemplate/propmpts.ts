import inquirer from "inquirer";
import { getFilesDirName } from "../../core/fs-operate.js";

export const getTemplatePrompts = async () => {
  const templateList = getFilesDirName("templates");
  return inquirer.prompt([
    {
      type: "list",
      name: "templateFileName",
      message: "请选择项目模板",
      choices: templateList,
    },
  ]);
};
