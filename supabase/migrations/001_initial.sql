BEGIN;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    settings JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Social accounts table
CREATE TABLE social_accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    platform TEXT NOT NULL CHECK (platform IN ('facebook', 'instagram')),
    platform_account_id TEXT NOT NULL,
    account_name TEXT NOT NULL,
    access_token TEXT NOT NULL,
    refresh_token TEXT,
    token_expires_at TIMESTAMPTZ,
    is_active BOOLEAN NOT NULL DEFAULT true,
    account_metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    UNIQUE(platform, platform_account_id)
);

-- Response templates table
CREATE TABLE response_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    content TEXT NOT NULL,
    trigger_keywords TEXT[],
    sentiment_filter TEXT CHECK (sentiment_filter IN ('positive', 'negative', 'neutral', 'any')),
    is_active BOOLEAN NOT NULL DEFAULT true,
    priority INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Monitoring rules table
CREATE TABLE monitoring_rules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    social_account_id UUID REFERENCES social_accounts(id) ON DELETE CASCADE,
    rule_type TEXT NOT NULL CHECK (rule_type IN ('brand_mention', 'hashtag', 'keyword', 'competitor')),
    keywords TEXT[] NOT NULL,
    platforms TEXT[] NOT NULL,
    sentiment_threshold TEXT CHECK (sentiment_threshold IN ('any', 'negative_only', 'positive_only')),
    is_active BOOLEAN NOT NULL DEFAULT true,
    notification_settings JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Comments table
CREATE TABLE comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    social_account_id UUID NOT NULL REFERENCES social_accounts(id) ON DELETE CASCADE,
    platform_comment_id TEXT NOT NULL,
    platform_post_id TEXT NOT NULL,
    platform TEXT NOT NULL CHECK (platform IN ('facebook', 'instagram')),
    content TEXT NOT NULL,
    author_name TEXT NOT NULL,
    author_id TEXT NOT NULL,
    sentiment_score DECIMAL,
    sentiment_label TEXT CHECK (sentiment_label IN ('positive', 'negative', 'neutral')),
    engagement_metrics JSONB,
    triggered_rules UUID[],
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'responded', 'ignored', 'escalated')),
    comment_date TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Automated responses table
CREATE TABLE automated_responses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    comment_id UUID NOT NULL REFERENCES comments(id) ON DELETE CASCADE,
    response_template_id UUID REFERENCES response_templates(id) ON DELETE SET NULL,
    response_content TEXT NOT NULL,
    response_method TEXT NOT NULL CHECK (response_method IN ('template', 'ai_generated', 'manual')),
    platform_response_id TEXT,
    ai_context JSONB,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed')),
    error_message TEXT,
    sent_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Slack notifications table
CREATE TABLE slack_notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    comment_id UUID NOT NULL REFERENCES comments(id) ON DELETE CASCADE,
    monitoring_rule_id UUID NOT NULL REFERENCES monitoring_rules(id) ON DELETE CASCADE,
    slack_channel TEXT NOT NULL,
    notification_type TEXT NOT NULL CHECK (notification_type IN ('negative_sentiment', 'brand_mention', 'competitor_mention')),
    slack_message_id TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed')),
    error_message TEXT,
    sent_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Competitor tracking table
CREATE TABLE competitor_tracking (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    competitor_name TEXT NOT NULL,
    platform TEXT NOT NULL CHECK (platform IN ('facebook', 'instagram')),
    mention_content TEXT NOT NULL,
    mention_context TEXT NOT NULL CHECK (mention_context IN ('comparison', 'complaint', 'praise', 'neutral')),
    post_author TEXT NOT NULL,
    post_url TEXT,
    sentiment_score DECIMAL,
    engagement_metrics JSONB,
    intelligence_notes TEXT,
    mention_date TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Indexes
-- Users
CREATE UNIQUE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_created_at ON users(created_at);

-- Social accounts
CREATE INDEX idx_social_accounts_user_id ON social_accounts(user_id);
CREATE INDEX idx_social_accounts_created_at ON social_accounts(created_at);

-- Response templates
CREATE INDEX idx_response_templates_user_id ON response_templates(user_id);
CREATE INDEX idx_response_templates_trigger_keywords ON response_templates USING GIN(trigger_keywords);
CREATE INDEX idx_response_templates_created_at ON response_templates(created_at);

-- Monitoring rules
CREATE INDEX idx_monitoring_rules_user_id ON monitoring_rules(user_id);
CREATE INDEX idx_monitoring_rules_social_account_id ON monitoring_rules(social_account_id);
CREATE INDEX idx_monitoring_rules_keywords ON monitoring_rules USING GIN(keywords);
CREATE INDEX idx_monitoring_rules_created_at ON monitoring_rules(created_at);

-- Comments
CREATE INDEX idx_comments_user_id ON comments(user_id);
CREATE INDEX idx_comments_social_account_id ON comments(social_account_id);
CREATE INDEX idx_comments_platform_comment_id ON comments(platform_comment_id);
CREATE INDEX idx_comments_sentiment_label ON comments(sentiment_label);
CREATE INDEX idx_comments_status ON comments(status);
CREATE INDEX idx_comments_comment_date ON comments(comment_date);
CREATE INDEX idx_comments_created_at ON comments(created_at);

-- Automated responses
CREATE INDEX idx_automated_responses_user_id ON automated_responses(user_id);
CREATE INDEX idx_automated_responses_comment_id ON automated_responses(comment_id);
CREATE INDEX idx_automated_responses_response_template_id ON automated_responses(response_template_id);
CREATE INDEX idx_automated_responses_created_at ON automated_responses(created_at);

-- Slack notifications
CREATE INDEX idx_slack_notifications_user_id ON slack_notifications(user_id);
CREATE INDEX idx_slack_notifications_comment_id ON slack_notifications(comment_id);
CREATE INDEX idx_slack_notifications_monitoring_rule_id ON slack_notifications(monitoring_rule_id);
CREATE INDEX idx_slack_notifications_created_at ON slack_notifications(created_at);

-- Competitor tracking
CREATE INDEX idx_competitor_tracking_user_id ON competitor_tracking(user_id);
CREATE INDEX idx_competitor_tracking_competitor_name ON competitor_tracking(competitor_name);
CREATE INDEX idx_competitor_tracking_platform ON competitor_tracking(platform);
CREATE INDEX idx_competitor_tracking_mention_context ON competitor_tracking(mention_context);
CREATE INDEX idx_competitor_tracking_mention_date ON competitor_tracking(mention_date);
CREATE INDEX idx_competitor_tracking_created_at ON competitor_tracking(created_at);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE response_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE monitoring_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE automated_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE slack_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE competitor_tracking ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "owner_all" ON users FOR ALL USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON social_accounts FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON response_templates FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON monitoring_rules FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON comments FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON automated_responses FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON slack_notifications FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON competitor_tracking FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

COMMIT;