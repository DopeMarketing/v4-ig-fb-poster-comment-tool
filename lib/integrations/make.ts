import axios from 'axios';

interface MakeScenario {
  name: string;
  blueprint: any;
  folder?: string;
}

interface MakeWebhook {
  url: string;
  data: Record<string, any>;
}

const client = axios.create({
  baseURL: 'https://eu1.make.com/api/v2',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Token ${process.env.MAKE_API_KEY}`,
  },
});

export async function triggerWebhook(webhook: MakeWebhook): Promise<any> {
  try {
    const response = await axios.post(webhook.url, webhook.data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    return response.data;
  } catch (error) {
    throw new Error(`Make API error: ${error}`);
  }
}

export async function createScenario(scenario: MakeScenario): Promise<any> {
  try {
    const response = await client.post('/scenarios', scenario);
    return response.data;
  } catch (error) {
    throw new Error(`Make API error: ${error}`);
  }
}