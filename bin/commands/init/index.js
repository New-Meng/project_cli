import { initPrompts } from "./prompts.js";
const init = (program) => {
    return program
        .command("init")
        .description("用于初始化项目")
        .action(async () => {
        await initPrompts();
    });
};
export { init };
//# sourceMappingURL=index.js.map