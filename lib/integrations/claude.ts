import Anthropic from '@anthropic-ai/sdk';

interface ClaudeMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ClaudeResponse {
  content: Array<{ text: string; type: string }>;
  role: string;
  usage: { input_tokens: number; output_tokens: number };
}

const client = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
});

export async function generateText(prompt: string, model: string = 'claude-3-sonnet-20240229'): Promise<string> {
  try {
    const response = await client.messages.create({
      model,
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }],
    }) as ClaudeResponse;
    
    return response.content[0]?.text || '';
  } catch (error) {
    throw new Error(`Claude API error: ${error}`);
  }
}

export async function createConversation(messages: ClaudeMessage[], model: string = 'claude-3-sonnet-20240229'): Promise<string> {
  try {
    const response = await client.messages.create({
      model,
      max_tokens: 1000,
      messages,
    }) as ClaudeResponse;
    
    return response.content[0]?.text || '';
  } catch (error) {
    throw new Error(`Claude API error: ${error}`);
  }
}