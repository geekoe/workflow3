# Workflow3 MCP Server

一个为Cursor等AI编辑器提供三阶段工作流提示词注入的MCP Server。

## 功能特性

- 🚀 一键激活三阶段工作流提示词
- 📝 自动读取项目中的CLAUDE.md配置文件
- 🎯 支持单独调用特定阶段的提示词
- 🔧 零配置使用，开箱即用

## 安装

### 方法1：从源码构建

```bash
git clone <repository-url>
cd workflow3
npm install
npm run build
```

### 方法2：全局安装

```bash
npm install -g workflow3
```

## 配置

### Cursor配置

在Cursor中添加MCP server配置：

1. 打开Cursor设置
2. 找到"MCP Servers"部分
3. 添加新的server配置：

```json
{
  "workflow3": {
    "command": "npx",
    "args": ["-y", "workflow3"]
  }
}
```

## 使用方法

### 基本用法

在Cursor对话中使用以下工具：

```
@workflow3
```

这将激活完整的三阶段工作流提示词。

### 阶段控制

激活工作流后，你可以用自然语言控制阶段：

```
"现在开始分析阶段"
"进入细化方案阶段" 
"开始执行阶段"
```

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

## 自定义配置

服务器会自动搜索以下位置的CLAUDE.md文件：
- 当前工作目录
- 上级目录
- 上上级目录

如果找到包含"三阶段工作流"的CLAUDE.md文件，将使用其内容替代默认提示词。

## 开发

```bash
# 开发模式运行
npm run dev

# 构建
npm run build

# 生产运行
npm start
```

## 项目结构

```
workflow3/
├── src/
│   ├── index.ts      # 主入口文件
│   ├── tools.ts      # 工具处理逻辑
│   └── prompts.ts    # 提示词配置
├── dist/             # 编译输出
├── package.json
├── tsconfig.json
└── README.md
```

## 许可证

MIT License

## 贡献

欢迎提交Issue和Pull Request！

## 支持

如果遇到问题，请在GitHub Issues中报告。