import { supabase } from '@/lib/supabase';
import type {
  User,
  SocialAccount,
  ResponseTemplate,
  MonitoringRule,
  Comment,
  AutomatedResponse,
  SlackNotification,
  CompetitorTracking
} from '@/types';

// Users
export async function getUsers(): Promise<User[]> {
  const { data, error } = await supabase
    .from('users')
    .select('id, email, name, settings, created_at, updated_at')
    .order('created_at', { ascending: false });
  if (error) throw new Error(`Failed to fetch users: ${error.message}`);
  return data || [];
}

export async function getUserById(id: string): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .select('id, email, name, settings, created_at, updated_at')
    .eq('id', id)
    .single();
  if (error && error.code !== 'PGRST116') throw new Error(`Failed to fetch user: ${error.message}`);
  return data;
}

export async function createUser(user: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User> {
  const { data, error } = await supabase
    .from('users')
    .insert([user])
    .select('id, email, name, settings, created_at, updated_at')
    .single();
  if (error) throw new Error(`Failed to create user: ${error.message}`);
  return data;
}

export async function updateUser(id: string, updates: Partial<Omit<User, 'id' | 'created_at'>>): Promise<User> {
  const { data, error } = await supabase
    .from('users')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select('id, email, name, settings, created_at, updated_at')
    .single();
  if (error) throw new Error(`Failed to update user: ${error.message}`);
  return data;
}

export async function deleteUser(id: string): Promise<void> {
  const { error } = await supabase.from('users').delete().eq('id', id);
  if (error) throw new Error(`Failed to delete user: ${error.message}`);
}

// Social Accounts
export async function getSocialAccounts(): Promise<SocialAccount[]> {
  const { data, error } = await supabase
    .from('social_accounts')
    .select('id, user_id, platform, platform_account_id, account_name, access_token, refresh_token, token_expires_at, is_active, account_metadata, created_at, updated_at')
    .order('created_at', { ascending: false });
  if (error) throw new Error(`Failed to fetch social accounts: ${error.message}`);
  return data || [];
}

export async function getSocialAccountById(id: string): Promise<SocialAccount | null> {
  const { data, error } = await supabase
    .from('social_accounts')
    .select('id, user_id, platform, platform_account_id, account_name, access_token, refresh_token, token_expires_at, is_active, account_metadata, created_at, updated_at')
    .eq('id', id)
    .single();
  if (error && error.code !== 'PGRST116') throw new Error(`Failed to fetch social account: ${error.message}`);
  return data;
}

export async function createSocialAccount(account: Omit<SocialAccount, 'id' | 'created_at' | 'updated_at'>): Promise<SocialAccount> {
  const { data, error } = await supabase
    .from('social_accounts')
    .insert([account])
    .select('id, user_id, platform, platform_account_id, account_name, access_token, refresh_token, token_expires_at, is_active, account_metadata, created_at, updated_at')
    .single();
  if (error) throw new Error(`Failed to create social account: ${error.message}`);
  return data;
}

export async function updateSocialAccount(id: string, updates: Partial<Omit<SocialAccount, 'id' | 'created_at'>>): Promise<SocialAccount> {
  const { data, error } = await supabase
    .from('social_accounts')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select('id, user_id, platform, platform_account_id, account_name, access_token, refresh_token, token_expires_at, is_active, account_metadata, created_at, updated_at')
    .single();
  if (error) throw new Error(`Failed to update social account: ${error.message}`);
  return data;
}

export async function deleteSocialAccount(id: string): Promise<void> {
  const { error } = await supabase.from('social_accounts').delete().eq('id', id);
  if (error) throw new Error(`Failed to delete social account: ${error.message}`);
}

// Response Templates
export async function getResponseTemplates(): Promise<ResponseTemplate[]> {
  const { data, error } = await supabase
    .from('response_templates')
    .select('id, user_id, name, content, trigger_keywords, sentiment_filter, is_active, priority, created_at, updated_at')
    .order('priority', { ascending: false });
  if (error) throw new Error(`Failed to fetch response templates: ${error.message}`);
  return data || [];
}

export async function getResponseTemplateById(id: string): Promise<ResponseTemplate | null> {
  const { data, error } = await supabase
    .from('response_templates')
    .select('id, user_id, name, content, trigger_keywords, sentiment_filter, is_active, priority, created_at, updated_at')
    .eq('id', id)
    .single();
  if (error && error.code !== 'PGRST116') throw new Error(`Failed to fetch response template: ${error.message}`);
  return data;
}

export async function createResponseTemplate(template: Omit<ResponseTemplate, 'id' | 'created_at' | 'updated_at'>): Promise<ResponseTemplate> {
  const { data, error } = await supabase
    .from('response_templates')
    .insert([template])
    .select('id, user_id, name, content, trigger_keywords, sentiment_filter, is_active, priority, created_at, updated_at')
    .single();
  if (error) throw new Error(`Failed to create response template: ${error.message}`);
  return data;
}

export async function updateResponseTemplate(id: string, updates: Partial<Omit<ResponseTemplate, 'id' | 'created_at'>>): Promise<ResponseTemplate> {
  const { data, error } = await supabase
    .from('response_templates')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select('id, user_id, name, content, trigger_keywords, sentiment_filter, is_active, priority, created_at, updated_at')
    .single();
  if (error) throw new Error(`Failed to update response template: ${error.message}`);
  return data;
}

export async function deleteResponseTemplate(id: string): Promise<void> {
  const { error } = await supabase.from('response_templates').delete().eq('id', id);
  if (error) throw new Error(`Failed to delete response template: ${error.message}`);
}

// Monitoring Rules
export async function getMonitoringRules(): Promise<MonitoringRule[]> {
  const { data, error } = await supabase
    .from('monitoring_rules')
    .select('id, user_id, social_account_id, rule_type, keywords, platforms, sentiment_threshold, is_active, notification_settings, created_at, updated_at')
    .order('created_at', { ascending: false });
  if (error) throw new Error(`Failed to fetch monitoring rules: ${error.message}`);
  return data || [];
}

export async function getMonitoringRuleById(id: string): Promise<MonitoringRule | null> {
  const { data, error } = await supabase
    .from('monitoring_rules')
    .select('id, user_id, social_account_id, rule_type, keywords, platforms, sentiment_threshold, is_active, notification_settings, created_at, updated_at')
    .eq('id', id)
    .single();
  if (error && error.code !== 'PGRST116') throw new Error(`Failed to fetch monitoring rule: ${error.message}`);
  return data;
}

export async function createMonitoringRule(rule: Omit<MonitoringRule, 'id' | 'created_at' | 'updated_at'>): Promise<MonitoringRule> {
  const { data, error } = await supabase
    .from('monitoring_rules')
    .insert([rule])
    .select('id, user_id, social_account_id, rule_type, keywords, platforms, sentiment_threshold, is_active, notification_settings, created_at, updated_at')
    .single();
  if (error) throw new Error(`Failed to create monitoring rule: ${error.message}`);
  return data;
}

export async function updateMonitoringRule(id: string, updates: Partial<Omit<MonitoringRule, 'id' | 'created_at'>>): Promise<MonitoringRule> {
  const { data, error } = await supabase
    .from('monitoring_rules')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select('id, user_id, social_account_id, rule_type, keywords, platforms, sentiment_threshold, is_active, notification_settings, created_at, updated_at')
    .single();
  if (error) throw new Error(`Failed to update monitoring rule: ${error.message}`);
  return data;
}

export async function deleteMonitoringRule(id: string): Promise<void> {
  const { error } = await supabase.from('monitoring_rules').delete().eq('id', id);
  if (error) throw new Error(`Failed to delete monitoring rule: ${error.message}`);
}

// Comments
export async function getComments(): Promise<Comment[]> {
  const { data, error } = await supabase
    .from('comments')
    .select('id, user_id, social_account_id, platform_comment_id, platform_post_id, platform, content, author_name, author_id, sentiment_score, sentiment_label, engagement_metrics, triggered_rules, status, comment_date, created_at, updated_at')
    .order('comment_date', { ascending: false });
  if (error) throw new Error(`Failed to fetch comments: ${error.message}`);
  return data || [];
}

export async function getCommentById(id: string): Promise<Comment | null> {
  const { data, error } = await supabase
    .from('comments')
    .select('id, user_id, social_account_id, platform_comment_id, platform_post_id, platform, content, author_name, author_id, sentiment_score, sentiment_label, engagement_metrics, triggered_rules, status, comment_date, created_at, updated_at')
    .eq('id', id)
    .single();
  if (error && error.code !== 'PGRST116') throw new Error(`Failed to fetch comment: ${error.message}`);
  return data;
}

export async function createComment(comment: Omit<Comment, 'id' | 'created_at' | 'updated_at'>): Promise<Comment> {
  const { data, error } = await supabase
    .from('comments')
    .insert([comment])
    .select('id, user_id, social_account_id, platform_comment_id, platform_post_id, platform, content, author_name, author_id, sentiment_score, sentiment_label, engagement_metrics, triggered_rules, status, comment_date, created_at, updated_at')
    .single();
  if (error) throw new Error(`Failed to create comment: ${error.message}`);
  return data;
}

export async function updateComment(id: string, updates: Partial<Omit<Comment, 'id' | 'created_at'>>): Promise<Comment> {
  const { data, error } = await supabase
    .from('comments')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select('id, user_id, social_account_id, platform_comment_id, platform_post_id, platform, content, author_name, author_id, sentiment_score, sentiment_label, engagement_metrics, triggered_rules, status, comment_date, created_at, updated_at')
    .single();
  if (error) throw new Error(`Failed to update comment: ${error.message}`);
  return data;
}

export async function deleteComment(id: string): Promise<void> {
  const { error } = await supabase.from('comments').delete().eq('id', id);
  if (error) throw new Error(`Failed to delete comment: ${error.message}`);
}

// Automated Responses
export async function getAutomatedResponses(): Promise<AutomatedResponse[]> {
  const { data, error } = await supabase
    .from('automated_responses')
    .select('id, user_id, comment_id, response_template_id, response_content, response_method, platform_response_id, ai_context, status, error_message, sent_at, created_at, updated_at')
    .order('created_at', { ascending: false });
  if (error) throw new Error(`Failed to fetch automated responses: ${error.message}`);
  return data || [];
}

export async function getAutomatedResponseById(id: string): Promise<AutomatedResponse | null> {
  const { data, error } = await supabase
    .from('automated_responses')
    .select('id, user_id, comment_id, response_template_id, response_content, response_method, platform_response_id, ai_context, status, error_message, sent_at, created_at, updated_at')
    .eq('id', id)
    .single();
  if (error && error.code !== 'PGRST116') throw new Error(`Failed to fetch automated response: ${error.message}`);
  return data;
}

export async function createAutomatedResponse(response: Omit<AutomatedResponse, 'id' | 'created_at' | 'updated_at'>): Promise<AutomatedResponse> {
  const { data, error } = await supabase
    .from('automated_responses')
    .insert([response])
    .select('id, user_id, comment_id, response_template_id, response_content, response_method, platform_response_id, ai_context, status, error_message, sent_at, created_at, updated_at')
    .single();
  if (error) throw new Error(`Failed to create automated response: ${error.message}`);
  return data;
}

export async function updateAutomatedResponse(id: string, updates: Partial<Omit<AutomatedResponse, 'id' | 'created_at'>>): Promise<AutomatedResponse> {
  const { data, error } = await supabase
    .from('automated_responses')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select('id, user_id, comment_id, response_template_id, response_content, response_method, platform_response_id, ai_context, status, error_message, sent_at, created_at, updated_at')
    .single();
  if (error) throw new Error(`Failed to update automated response: ${error.message}`);
  return data;
}

export async function deleteAutomatedResponse(id: string): Promise<void> {
  const { error } = await supabase.from('automated_responses').delete().eq('id', id);
  if (error) throw new Error(`Failed to delete automated response: ${error.message}`);
}