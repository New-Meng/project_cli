import path from "path";
import fs from "fs";
import axios from "axios";
import extractZip from "extract-zip";

import { DEFAULT_DOWNLOAD_NAME } from "../utils/constant.js";

// 下载github or gitee 的 zip，具体取决于用户的配置, 返回下载文件的绝对路径
export const downloadRepoZip = async (url: string): Promise<string> => {
  const res = await axios.get(url, {
    responseType: "stream",
    maxRedirects: 5,
    headers: {
      "User-Agent": "my-cli", // GitHub API 必需
    },
  });

  // 建立临时文件
  const dest = path.resolve(process.cwd(), `${DEFAULT_DOWNLOAD_NAME}.zip`);
  const writer = fs.createWriteStream(dest);

  res.data.pipe(writer);

  return new Promise<string>((resolve, reject) => {
    writer.on("finish", () => resolve(dest));
    writer.on("error", reject);
  });
};

// 解压文件，并删除文件
export const uncompressZipAndDelete = async (zipPath: string) => {
  const targetDir = process.cwd(); // 当前工作目录

  await extractZip(zipPath, { dir: targetDir });
  console.log("解压完成!");
};
