import axios from 'axios';

interface MetaAdAccount {
  id: string;
  name: string;
  currency: string;
}

interface MetaCampaign {
  name: string;
  objective: string;
  status: 'ACTIVE' | 'PAUSED';
  special_ad_categories?: string[];
}

const client = axios.create({
  baseURL: 'https://graph.facebook.com/v18.0',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.META_ADS_API_KEY}`,
  },
});

export async function getAdAccounts(): Promise<MetaAdAccount[]> {
  try {
    const response = await client.get('/me/adaccounts', {
      params: {
        fields: 'id,name,currency',
      },
    });
    
    return response.data.data || [];
  } catch (error) {
    throw new Error(`Meta Ads API error: ${error}`);
  }
}

export async function createCampaign(accountId: string, campaign: MetaCampaign): Promise<any> {
  try {
    const response = await client.post(`/${accountId}/campaigns`, campaign);
    return response.data;
  } catch (error) {
    throw new Error(`Meta Ads API error: ${error}`);
  }
}