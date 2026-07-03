import path from "path";
import fs from "fs";
import axios from "axios";
import extractZip from "extract-zip";

import { DEFAULT_DOWNLOAD_NAME } from "../utils/constant.js";

// 下载github or gitee 的 zip，具体取决于用户的配置, 返回下载文件的绝对路径
export const downloadRepoZip = async (
  url: string,
): Promise<string | unknown> => {
  return new Promise(async (resolve, reject) => {
    const res = await axios.get(url, {
      responseType: "stream",
      maxRedirects: 5,
    });

    // 建立临时文件
    const dest = path.resolve(process.cwd(), `${DEFAULT_DOWNLOAD_NAME}`);
    const writer = fs.createWriteStream(dest);

    writer.on("finish", () => {
      resolve(dest);
    });
    writer.on("error", (error) => {
      console.log("写入文件失败:", error);
      reject(error);
    });

    res.data.on("error", (error: unknown) => {
      console.log("下载文件失败:", error);
    });

    res.data.pipe(writer);
  });
};

// 解压文件，并删除文件
export const uncompressZipAndDelete = async (zipPath: string) => {
  try {
    const targetDir = process.cwd(); // 当前工作目录

    await extractZip(zipPath, { dir: targetDir });
    console.log("解压完成!");
  } catch (error) {
    throw new Error("解压文件失败 " + error);
  }
};
