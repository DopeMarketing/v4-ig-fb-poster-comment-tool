# CLAUDE.md - V4 Ig Fb Poster Comment Tool

This is the briefing file for AI coding sessions. Always read this file first before making any changes to the project.

## Project Overview

Automated social media comment monitoring and response tool that connects to Facebook and Instagram APIs, uses Claude AI for intelligent responses, and sends Slack notifications for comments requiring manual attention. Built for businesses managing multiple social accounts who need consistent customer engagement at scale.

## Tech Stack
- Next.js 15 (App Router)
- Supabase (PostgreSQL)
- TypeScript
- Tailwind CSS
- Claude AI
- Slack API
- Meta (Facebook/Instagram) APIs
- NextAuth.js for OAuth

## Folder Structure


src/
├── app/                    # Next.js App Router - all routes and layouts
│   ├── (auth)/            # Auth routes: login, signup, forgot-password
│   ├── (dashboard)/       # Protected routes: dashboard, comments, responses, etc.
│   ├── api/               # API routes, webhooks, OAuth handlers
│   └── globals.css        # Global styles and Tailwind imports
├── components/            # Reusable UI components only
├── lib/                   # Business logic, utilities, configurations
├── db/                    # Database access layer - queries and mutations
├── actions/               # Server actions for forms and mutations
└── types/                 # TypeScript type definitions
supabase/
├── migrations/            # Database migrations (SQL files)
└── config.toml           # Supabase configuration


## Coding Conventions

- **TypeScript strict mode**: All code must be properly typed
- **Server Components by default**: Use 'use client' only when necessary
- **Data access**: Only in `/db` folder - never write SQL elsewhere
- **Business logic**: Only in `/lib` and `/actions` folders
- **No secrets in client components**: All API keys server-side only
- **Conventional commits**: Use conventional commit format
- **Small commits**: Commit often with descriptive messages

## Current State - What Has Been Built

This is a fresh scaffold with:
- Complete Next.js 15 app structure
- Supabase integration with 10 database tables
- Authentication setup with NextAuth.js
- Route stubs for all 19 pages from site map
- Integration configuration files for all APIs
- Basic TypeScript types for data models
- Tailwind CSS configuration
- Environment variable template

**Database Tables Created:**
- users, social_accounts, response_templates, monitoring_rules
- comments, automated_responses, slack_notifications
- competitor_tracking, api_integrations, competitive_reports

**Routes Created:**
- Public: /, /features, /pricing, /login, /signup, /forgot-password
- Protected: /onboarding, /dashboard, /integrations, /comments, /responses, /monitoring, /reports, /notifications, /settings
- API: OAuth endpoints, webhooks for Facebook/Instagram

## What to Build Next - V1 Features

1. **Facebook and Instagram API integration** - OAuth authentication to connect business accounts
2. **Automated comment response system** - Customizable templates triggered by keywords
3. **Real-time comment monitoring dashboard** - Filter by sentiment, keywords, engagement
4. **Slack notification system** - Alert when negative comments need manual intervention
5. **Claude AI integration** - Intelligent response generation based on context and brand voice
6. **Competitor mention tracking** - Monitor competitors across platforms with automated reports

## Never Touch Rules

- **Never modify `.env` files** - Only update `.env.example` with new variables
- **Never edit migration files** - Create new migrations for schema changes
- **Never modify RLS policies** - Review with security team first
- **Never commit API keys** - Always use environment variables
- **Never bypass TypeScript** - Fix type errors, don't ignore them

## How to Work on This Project

1. **Always read this file first** before starting any coding session
2. **Run `npm run build`** before committing to catch errors
3. **Commit small and often** with conventional commit messages
4. **Document technical debt** explicitly in TECHNICAL_DEBT.md
5. **Test OAuth flows** in development before pushing
6. **Validate API integrations** with actual API responses
7. **Update types** when adding new database columns or API responses
8. **Follow folder structure** strictly - no exceptions

## API Integration Notes

- **Facebook/Instagram**: Use Graph API v18.0+, handle rate limits
- **Claude**: Stream responses for better UX, handle context limits
- **Slack**: Use Bot tokens, not user tokens for reliability
- **Meta Ads**: Requires business verification for production

## Testing Approach

- Test OAuth flows with real Facebook/Instagram accounts
- Mock API responses for development
- Use Supabase local development for database testing
- Test Slack notifications in development workspace

## Security Considerations

- All social media tokens encrypted in database
- Rate limiting on all external API calls
- Input validation on all comment processing
- Audit logs for all automated responses
- Row Level Security on all user data