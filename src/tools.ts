import { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { getWorkflowPrompts } from './prompts.js';

export function handleWorkflowTool(_args: any): CallToolResult {
  const prompts = getWorkflowPrompts();
  
  return {
    content: [
      {
        type: 'text',
        text: prompts.fullWorkflow,
      },
    ],
  };
}