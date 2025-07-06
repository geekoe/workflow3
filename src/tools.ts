import { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { getWorkflowPrompts } from './prompts.js';

export async function handleWorkflowTool(args: any): Promise<CallToolResult> {
  try {
    const prompts = await getWorkflowPrompts();
    
    return {
      content: [
        {
          type: 'text',
          text: prompts.fullWorkflow,
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