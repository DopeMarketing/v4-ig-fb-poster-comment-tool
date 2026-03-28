import axios from 'axios';

interface ZapierTrigger {
  trigger_url: string;
  data: Record<string, any>;
}

interface ZapierWebhook {
  id: string;
  url: string;
  event: string;
}

const client = axios.create({
  baseURL: 'https://hooks.zapier.com/hooks/catch',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.ZAPIER_API_KEY}`,
  },
});

export async function triggerZap(trigger: ZapierTrigger): Promise<any> {
  try {
    const response = await axios.post(trigger.trigger_url, trigger.data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    return response.data;
  } catch (error) {
    throw new Error(`Zapier API error: ${error}`);
  }
}

export async function createWebhook(webhook: ZapierWebhook): Promise<any> {
  try {
    const response = await client.post('/webhooks', webhook);
    return response.data;
  } catch (error) {
    throw new Error(`Zapier API error: ${error}`);
  }
}