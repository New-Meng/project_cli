import fs from "fs";
import path from "path";
import os from "os";
import fse from "fs-extra";

// 获取文件夹下的所有文件名
export const getFilesDirName = (childPath?: string) => {
  const tempPath = childPath ? `.cytool/${childPath}` : ".cytool/";
  const configDir = path.join(os.homedir(), tempPath);
  const fileList = fs.readdirSync(configDir);
  return fileList;
};

// 获取用户配置目录
export const getUserConfigDir = (childPath?: string) => {
  const tempPath = childPath ? `.cytool/${childPath}` : ".cytool/";
  const configDir = path.join(os.homedir(), tempPath);
  return configDir;
};

// 获取当前所在的目录，或者下级目录
export const getCurrentDir = (childPath?: string) => {
  const currentDir = childPath
    ? path.join(process.cwd(), childPath)
    : process.cwd();
  return currentDir;
};

// 判断目录是否有文件夹，没有则创建
export const checkDirExist = (dirPath: string) => {
  if (!fs.existsSync(dirPath)) {
    // 如果父目录不存在，则创建父目录
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

export interface CopyOptions {
  includeFolder?: boolean; // 是否包含文件夹
}
// 复制模板文件，到指定位置
export const copyFile = async (
  srcPath: string,
  destPath: string,
  options?: CopyOptions,
) => {
  const { includeFolder = false } = options || {};
  if (includeFolder) {
    await fse.copy(srcPath, destPath);
  } else {
    const items = await fse.readdir(srcPath);
    for (const item of items) {
      await fse.copy(path.join(srcPath, item), path.join(destPath, item));
    }
  }
};
