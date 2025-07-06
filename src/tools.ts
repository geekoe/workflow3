import { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { getWorkflowPrompts } from './prompts.js';

export async function handleWorkflowTool(args: any): Promise<CallToolResult> {
  const { stage } = args || {};
  
  try {
    const prompts = await getWorkflowPrompts();
    
    let content = '';
    
    if (stage) {
      switch (stage) {
        case 'analyze':
          content = prompts.stageAnalyze;
          break;
        case 'refine':
          content = prompts.stageRefine;
          break;
        case 'execute':
          content = prompts.stageExecute;
          break;
        default:
          content = prompts.fullWorkflow;
      }
    } else {
      content = prompts.fullWorkflow;
    }
    
    return {
      content: [
        {
          type: 'text',
          text: content,
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error loading workflow prompts: ${error instanceof Error ? error.message : 'Unknown error'}`,
        },
      ],
      isError: true,
    };
  }
}