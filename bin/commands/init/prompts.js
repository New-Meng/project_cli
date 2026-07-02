import inquirer from "inquirer";
import { TEMPLATE_QINGYAN_LIST } from "../../types/templates.js";
const initPrompts = async () => {
    const answers = await inquirer.prompt([
        {
            type: "input",
            name: "projectName",
            message: "请输入项目名称",
        },
        {
            type: "list",
            name: "template",
            message: "请选择项目模板",
            choices: TEMPLATE_QINGYAN_LIST.map((item) => {
                return {
                    name: item.name,
                    value: item.value,
                };
            }),
            default: TEMPLATE_QINGYAN_LIST[0]?.value,
        },
    ]);
    console.log(answers);
};
export { initPrompts };
//# sourceMappingURL=prompts.js.map