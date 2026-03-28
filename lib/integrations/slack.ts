import { WebClient } from '@slack/web-api';

interface SlackMessage {
  channel: string;
  text: string;
  attachments?: any[];
}

interface SlackChannel {
  id: string;
  name: string;
  is_private: boolean;
}

const client = new WebClient(process.env.SLACK_API_KEY);

export async function sendMessage(message: SlackMessage): Promise<any> {
  try {
    const result = await client.chat.postMessage({
      channel: message.channel,
      text: message.text,
      attachments: message.attachments,
    });
    
    return result;
  } catch (error) {
    throw new Error(`Slack API error: ${error}`);
  }
}

export async function getChannels(): Promise<SlackChannel[]> {
  try {
    const result = await client.conversations.list({
      types: 'public_channel,private_channel',
    });
    
    return (result.channels as SlackChannel[]) || [];
  } catch (error) {
    throw new Error(`Slack API error: ${error}`);
  }
}