# createProjectCli

`createProjectCli` 是一个 CLI 工具，当前命令名为 `cytool`。

## 安装依赖

```bash
yarn
```

## 开发运行

查看帮助：

```bash
yarn dev -- --help
```

执行初始化命令：

```bash
yarn dev -- init
```

## 构建后使用

```bash
yarn build
node ./bin/cli.js --help
```

如果已经全局安装或本地链接，也可以直接执行：

```bash
cytool --help
```

## 命令说明

初始化项目：

```bash
cytool init
```

查看全部配置：

```bash
cytool getConfig
cytool get
```

查看指定配置：

```bash
cytool getConfig projectTemplate
cytool get projectTemplate
```

设置配置：

```bash
cytool setConfig baseUrl https://github.com/用户名/仓库名/archive/refs/heads/main.zip
cytool set baseUrl https://github.com/用户名/仓库名/archive/refs/heads/main.zip
```

## 配置文件

配置文件默认位置：

```text
~/.cytool/config.json
```

首次运行时，如果文件不存在，会自动创建默认配置。
