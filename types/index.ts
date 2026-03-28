export interface User {
  id: string;
  email: string;
  name: string;
  settings: Record<string, any> | null;
  created_at: Date;
  updated_at: Date;
}

export interface SocialAccount {
  id: string;
  user_id: string;
  platform: 'facebook' | 'instagram';
  platform_account_id: string;
  account_name: string;
  access_token: string;
  refresh_token: string | null;
  token_expires_at: Date | null;
  is_active: boolean;
  account_metadata: Record<string, any> | null;
  created_at: Date;
  updated_at: Date;
}

export interface ResponseTemplate {
  id: string;
  user_id: string;
  name: string;
  content: string;
  trigger_keywords: string[] | null;
  sentiment_filter: 'positive' | 'negative' | 'neutral' | 'any' | null;
  is_active: boolean;
  priority: number;
  created_at: Date;
  updated_at: Date;
}

export interface MonitoringRule {
  id: string;
  user_id: string;
  social_account_id: string | null;
  rule_type: 'brand_mention' | 'hashtag' | 'keyword' | 'competitor';
  keywords: string[];
  platforms: string[];
  sentiment_threshold: 'any' | 'negative_only' | 'positive_only' | null;
  is_active: boolean;
  notification_settings: Record<string, any> | null;
  created_at: Date;
  updated_at: Date;
}

export interface Comment {
  id: string;
  user_id: string;
  social_account_id: string;
  platform_comment_id: string;
  platform_post_id: string;
  platform: 'facebook' | 'instagram';
  content: string;
  author_name: string;
  author_id: string;
  sentiment_score: number | null;
  sentiment_label: 'positive' | 'negative' | 'neutral' | null;
  engagement_metrics: Record<string, any> | null;
  triggered_rules: string[] | null;
  status: 'pending' | 'responded' | 'ignored' | 'escalated';
  comment_date: Date;
  created_at: Date;
  updated_at: Date;
}

export interface AutomatedResponse {
  id: string;
  user_id: string;
  comment_id: string;
  response_template_id: string | null;
  response_content: string;
  response_method: 'template' | 'ai_generated' | 'manual';
  platform_response_id: string | null;
  ai_context: Record<string, any> | null;
  status: 'pending' | 'sent' | 'failed';
  error_message: string | null;
  sent_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface SlackNotification {
  id: string;
  user_id: string;
  comment_id: string;
  monitoring_rule_id: string;
  slack_channel: string;
  notification_type: 'negative_sentiment' | 'brand_mention' | 'competitor_mention';
  slack_message_id: string | null;
  status: 'pending' | 'sent' | 'failed';
  error_message: string | null;
  sent_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface CompetitorTracking {
  id: string;
  user_id: string;
  competitor_name: string;
  platform: 'facebook' | 'instagram';
  mention_content: string;
  mention_context: 'comparison' | 'complaint' | 'praise' | 'neutral';
  post_author: string;
  post_url: string | null;
  sentiment_score: number | null;
  engagement_metrics: Record<string, any> | null;
  intelligence_notes: string | null;
  mention_date: Date;
  created_at: Date;
  updated_at: Date;
}

export type Database = {
  users: User;
  social_accounts: SocialAccount;
  response_templates: ResponseTemplate;
  monitoring_rules: MonitoringRule;
  comments: Comment;
  automated_responses: AutomatedResponse;
  slack_notifications: SlackNotification;
  competitor_tracking: CompetitorTracking;
};