import type { ConfigFileInterface } from "../../types/templates.js";
import { readConfig } from "../../core/config.js";

export const getPrompts = (key: keyof ConfigFileInterface) => {
  try {
    const config = readConfig(key);
    return config;
  } catch (error) {}
};
