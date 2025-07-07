// This file is kept for backward compatibility and fallback purposes
// The actual workflow content is now managed through template files and user customization

export interface WorkflowPrompts {
  fullWorkflow: string;
}

// This is now deprecated - use utils.ts functions instead
const WORKFLOW_PROMPTS: WorkflowPrompts = {
  fullWorkflow: `# AI助手核心规则 (默认模板)

这是默认的workflow3配置。正常情况下，您应该在项目根目录看到workflow3.md文件。

如果您看到这条消息，可能是文件读取出现了问题。请检查：
1. 项目根目录是否有workflow3.md文件
2. 文件权限是否正确

默认工作流将在下方显示...

---

## 三阶段工作流

### 阶段一：分析问题
**声明格式**：\`【分析问题】\`

**必须做的事**：
- 深入理解需求本质
- 搜索所有相关代码
- 识别问题根因
- 发现架构问题

### 阶段二：细化方案
**声明格式**：\`【细化方案】\`

### 阶段三：执行方案
**声明格式**：\`【执行方案】\`

记住：每次回复必须声明当前阶段，不允许例外。`,
};

/**
 * @deprecated Use getOrCreateWorkflowFile from utils.ts instead
 */
export function getWorkflowPrompts(): WorkflowPrompts {
  return WORKFLOW_PROMPTS;
}

