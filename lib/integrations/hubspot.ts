import { Client } from '@hubspot/api-client';

interface HubSpotContact {
  email: string;
  firstname?: string;
  lastname?: string;
  company?: string;
}

interface HubSpotDeal {
  dealname: string;
  amount?: string;
  dealstage: string;
  pipeline?: string;
}

const client = new Client({
  accessToken: process.env.HUBSPOT_API_KEY,
});

export async function createContact(contact: HubSpotContact): Promise<any> {
  try {
    const response = await client.crm.contacts.basicApi.create({
      properties: contact,
    });
    
    return response;
  } catch (error) {
    throw new Error(`HubSpot API error: ${error}`);
  }
}

export async function createDeal(deal: HubSpotDeal): Promise<any> {
  try {
    const response = await client.crm.deals.basicApi.create({
      properties: deal,
    });
    
    return response;
  } catch (error) {
    throw new Error(`HubSpot API error: ${error}`);
  }
}