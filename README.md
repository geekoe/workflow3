# Workflow3 MCP Server

一个为AI编程工具提供三阶段工作流提示词注入的MCP Server。
所有支持MCP配置的工具都可以使用，比如Cursor、Claude Code、Windsurf等。

## 功能特性

- 🚀 一键激活三阶段工作流提示词
- 🎯 内置标准工作流，开箱即用
- 🔧 零配置使用，无需额外设置

## 安装配置

如果你用的是Claude Code，应该通过命令行添加：
```
claude mcp add workflow3 -s user -- npx -y workflow3
```
因为Claude Code程序自己管理配置文件，你手动修改可能会有冲突。

如果你用的是Cursor，配置路径是：Cursor Settings -> Tools & Integrations -> MCP Tools
添加如下代码(如果已经有了mcpServers，则只需要添加关于workflow3的内容)：

```json
{"mcpServers": {
    "workflow3": {
      "command": "npx",
      "args": ["-y", "workflow3"]
    }
  }
}
```
其他的编程工具是类似的。

无需预先安装，npx会自动下载最新版本。

## 使用方法

### 基本用法

在对话的第一行：
```
use workflow3
```
也可用自然语言请求激活工作流：

```
请激活三阶段工作流
```
```
"启用workflow3"
```

Cursor等编程工具会自动识别并调用workflow3，激活完整的三阶段工作流提示词。

### 阶段控制

激活工作流后，默认阶段是分析问题，你也可以指定阶段。


## 三阶段工作流说明

### 阶段一：分析问题 【分析问题】
- 深入理解需求本质
- 搜索所有相关代码
- 识别问题根因
- 提供1~3个解决方案

### 阶段二：细化方案 【细化方案】
- 列出变更文件清单
- 描述每个文件的具体变化
- 确保方案可执行

### 阶段三：执行方案 【执行方案】
- 严格按照方案实现
- 运行必要的检查
- 确保代码质量


## 许可证

MIT License

## 贡献

欢迎提交Issue和Pull Request！

## 支持

如果遇到问题，请在GitHub Issues中报告。
