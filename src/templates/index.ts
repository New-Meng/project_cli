import type { ConfigFileInterface, TemplateItem } from "../types/templates.js";

// 默认的项目模板配置
export const DEFAULT_PROJECT_TEMPLATE: TemplateItem[] = [
  {
    name: "vue3项目模板",
    value: "vue",
  },
  {
    name: "react项目模板",
    value: "react",
  },
];

// 默认配置文件
export const DEFAULT_CONFIG_FILE: ConfigFileInterface = {
  projectTemplate: DEFAULT_PROJECT_TEMPLATE,
};
