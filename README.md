# V4 - Ig Fb Poster Comment Tool

Automated social media comment monitoring and response tool for Facebook and Instagram.

## What it does

This tool automatically monitors Facebook and Instagram comments, responds to customers using AI-generated replies, and sends Slack notifications for comments requiring manual attention. Built for businesses managing multiple social media accounts who need to maintain consistent customer engagement at scale.

## Who it's for

- Social media managers handling multiple business accounts
- Customer service teams managing social inquiries
- Marketing teams tracking brand mentions and sentiment
- Businesses needing automated social media engagement

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Database**: Supabase (PostgreSQL)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI**: Claude (Anthropic)
- **Notifications**: Slack
- **Automation**: Zapier, Make
- **CRM**: HubSpot
- **Ads**: Meta Ads
- **Deployment**: Vercel

## Prerequisites

- Node.js 18+ and npm
- Supabase CLI
- Facebook Developer Account
- Instagram Business Account
- Claude API key
- Slack workspace and bot token

## Local Setup

1. **Clone the repository**
   bash
   git clone <repository-url>
   cd v4-ig-fb-poster-comment-tool
   

2. **Install dependencies**
   bash
   npm install
   

3. **Set up environment variables**
   bash
   cp .env.example .env.local
   
   Fill in the required environment variables (see table below).

4. **Start Supabase locally**
   bash
   npx supabase start
   

5. **Run the development server**
   bash
   npm run dev
   

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-side only) |
| `FACEBOOK_APP_ID` | Facebook App ID for OAuth |
| `FACEBOOK_APP_SECRET` | Facebook App Secret |
| `INSTAGRAM_APP_ID` | Instagram App ID |
| `INSTAGRAM_APP_SECRET` | Instagram App Secret |
| `CLAUDE_API_KEY` | Anthropic Claude API key |
| `SLACK_BOT_TOKEN` | Slack Bot User OAuth Token |
| `SLACK_WEBHOOK_URL` | Slack webhook URL for notifications |
| `HUBSPOT_API_KEY` | HubSpot API key |
| `META_ADS_ACCESS_TOKEN` | Meta Ads API access token |
| `ZAPIER_WEBHOOK_URL` | Zapier webhook URL |
| `MAKE_WEBHOOK_URL` | Make.com webhook URL |
| `NEXTAUTH_SECRET` | NextAuth.js secret key |
| `NEXTAUTH_URL` | NextAuth.js URL |

## Database Setup

1. **Apply migrations**
   bash
   npx supabase db reset
   

2. **Verify tables created**
   Check your Supabase dashboard to ensure all 10 tables are created:
   - users
   - social_accounts
   - response_templates
   - monitoring_rules
   - comments
   - automated_responses
   - slack_notifications
   - competitor_tracking
   - api_integrations
   - competitive_reports

## Deploy to Vercel

1. **Connect to Vercel**
   bash
   npx vercel
   

2. **Set environment variables**
   Copy all environment variables from `.env.local` to Vercel dashboard.

3. **Deploy**
   bash
   npx vercel --prod
   

## Project Structure


src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication routes
│   ├── (dashboard)/       # Protected dashboard routes
│   ├── api/               # API routes and webhooks
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
├── lib/                   # Utility functions and configurations
├── db/                    # Database access layer
├── actions/               # Server actions
└── types/                 # TypeScript type definitions
supabase/
├── migrations/            # Database migrations
└── config.toml           # Supabase configuration
