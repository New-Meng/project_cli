// 项目模板类型定义
export interface TemplateItem {
  name: string; // 展示给用户看的名称
  value: string; // git 仓库地址
}

export interface ConfigFileInterface {
  projectTemplate?: TemplateItem[];
  [key: string]: any;
}
