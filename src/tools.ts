import { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { getOrCreateWorkflowFile } from './utils.js';

export function handleWorkflowTool(_args: any): CallToolResult {
  const workflowContent = getOrCreateWorkflowFile();
  
  return {
    content: [
      {
        type: 'text',
        text: workflowContent,
      },
    ],
  };
}