# createProjectCli

`cytool` 是一个创建项目的 CLI 工具。

## 安装依赖

```bash
yarn
```

## 开发运行

```bash
yarn dev -- <命令>
```

示例：

```bash
yarn dev -- init
```

## 构建后使用

```bash
yarn build
node ./bin/cli.js <命令>
```

或全局安装后直接使用 `cytool`：

```bash
cytool <命令>
```

## 命令说明

### init

初始化项目，选择模板后下载并解压。

```bash
cytool init
```

### getConfig

查看全部或指定配置项。

别名：`getc`

```bash
# 查看所有配置
cytool getConfig

# 查看指定配置
cytool getConfig projectTemplate
```

### setConfig

设置配置项。

别名：`setc`

```bash
cytool setConfig <key> <value>
```

示例：

```bash
cytool setConfig baseUrl https://github.com/
```

### getTemplate

列出可用的文件模板。

别名：`listt`

```bash
# 列出所有模板
cytool getTemplate

# 列出 templates 下指定子目录的模板
cytool getTemplate <子目录名>
```

### generatorTemplate

创建模板文件，需要将模板，放在 .cytool/templates 目录下。

别名：`gt`

```bash
cytool generatorTemplate <目标路径>
```

示例：

```bash
# 复制模板到当前目录下的 src/components
cytool gt src/components
```

## 配置文件

配置文件位置：

```text
~/.cytool/config.json
```

首次运行时会自动创建默认配置，无需手动创建。
模板首次运行，是空的，需要自己在 .cytool/templates 目录下创建模板文件，才可以使用。
