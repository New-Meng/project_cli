#!/usr/bin/env node
// 上面时指定启动时，使用node来执行
import { init } from "./commands/init/index.js";
import { registerCommands } from "./core/index.js";
import { Command } from "commander";
const program = new Command();
// 设置基础信息
program.name("cytool").description("主要用于新项目的创建").version("0.0.1");
registerCommands(init(program));
program.action(() => {
    program.help();
});
// --hlep 时，打印基础信息
program.parse();
//# sourceMappingURL=cli.js.map