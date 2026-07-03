#!/usr/bin/env node
// 上面时指定启动时，使用node来执行

import { registerInitCommand } from "./commands/init/index.js";
import { registerGetConfigCommand } from "./commands/getConfig/index.js";
import { registerSetConfigCommand } from "./commands/setConfig/index.js";

import { Command } from "commander";
const a: number = 1;
const program = new Command();

// 设置基础信息
program.name("cytool").description("主要用于新项目的创建").version("0.0.1");
registerInitCommand(program);
registerGetConfigCommand(program);
registerSetConfigCommand(program);
// --hlep 时，打印基础信息
program.parseAsync();
