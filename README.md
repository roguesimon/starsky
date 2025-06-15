# Starsky AI - AI-Powered No-Code Web App Builder

A comprehensive Next.js application that replicates the functionality of modern AI-powered web development platforms. Build beautiful, production-ready web applications using natural language descriptions with **multiple specialized AI models**.

## 🌟 Features Overview

### 🤖 Multi-Model AI System
- **AI Orchestration**: Intelligent routing of tasks to specialized AI models
- **7 Specialized AI Models**: Each optimized for specific development tasks
- **Smart Model Selection**: Automatic prompt classification and optimal model routing
- **Real-Time Monitoring**: Live tracking of AI model executions and performance
- **Cost Optimization**: Token usage tracking and budget management across models
- **Streaming Support**: Real-time response generation with WebSocket connections

#### **🔍 GPT-4o (OpenAI) - Core Developer & Architect**
- **Role**: Primary code generation and project architecture
- **Capabilities**: Project scaffolding, component generation, natural language UX
- **Use Cases**: Complete app generation, complex logic implementation, copywriting
- **Availability**: Free and Pro tiers

#### **🧠 Claude 3 (Anthropic) - Thought Partner & Safety Advisor**
- **Role**: Human-like reasoning and business logic verification
- **Capabilities**: Prompt clarification, ethical guardrails, UX tone improvement
- **Use Cases**: Requirements refinement, business logic validation, safety checks
- **Availability**: Pro and Enterprise tiers

#### **📦 Gemini 1.5 (Google) - Data Integration & Cloud Expert**
- **Role**: Backend and cloud services specialist
- **Capabilities**: API integration, database optimization, Google Cloud Platform
- **Use Cases**: Firebase setup, API connections, cloud deployment configurations
- **Availability**: Free and Pro tiers

#### **🛠️ Command R+ (Cohere) - Debugger & Optimizer**
- **Role**: Performance tuning and error resolution
- **Capabilities**: Code optimization, security analysis, runtime error fixing
- **Use Cases**: Bug fixes, performance improvements, security audits
- **Availability**: Pro and Enterprise tiers

#### **📈 Mistral 8x - Lightweight Assistant**
- **Role**: Fast responses and privacy-first processing
- **Capabilities**: Simple completions, boilerplate generation, quick suggestions
- **Use Cases**: Auto-complete, code snippets, offline processing
- **Availability**: All tiers

#### **🤖 LLaVA - UI/UX Visual Assistant** *(Coming Soon)*
- **Role**: Visual design analysis and generation
- **Capabilities**: Screenshot analysis, mockup generation, UI pattern recognition
- **Use Cases**: Design-to-code, visual feedback, component layout optimization
- **Availability**: Pro and Enterprise tiers

#### **🔐 Whisper (OpenAI) - Audio Transcription** *(Coming Soon)*
- **Role**: Voice-to-code functionality
- **Capabilities**: Speech recognition, voice commands, accessibility support
- **Use Cases**: Voice prompts, hands-free coding, accessibility features
- **Availability**: Pro and Enterprise tiers

### 🎯 Intelligent AI Orchestration
- **Automatic Prompt Classification**: AI analyzes prompts to determine optimal model
- **Dynamic Model Routing**: Tasks automatically routed to most suitable AI model
- **Fallback Systems**: Graceful degradation when primary models are unavailable
- **Load Balancing**: Distribute requests across models for optimal performance
- **Context Preservation**: Maintain conversation context across different models

### 📊 Advanced AI Monitoring & Analytics
- **Real-Time Dashboard**: Live monitoring of all AI model executions
- **Performance Metrics**: Track response times, success rates, and token usage
- **Cost Analysis**: Detailed breakdown of costs per model and per project
- **Usage Statistics**: Comprehensive analytics on model usage patterns
- **Export Capabilities**: Download detailed reports and usage logs
- **Alert System**: Notifications for budget limits and performance issues

### 💳 Token-Based Subscription System
- **Flexible Pricing Tiers**: Multiple subscription plans with varying token allocations
  - Free: 200k tokens/month with basic features
  - Pro: $20/month for 10M tokens with full model access
  - Pro 50: $50/month for 26M tokens with team features
  - Pro 100: $100/month for 55M tokens with expanded team access
  - Pro 200: $200/month for 120M tokens with maximum team size
- **Dual Payment Options**: Integrated Stripe for credit cards and Cryptomus for cryptocurrency
- **Token Usage Tracking**: Real-time monitoring of token consumption across all AI models
- **Automatic Deduction**: Tokens automatically deducted based on AI model usage
- **Usage Analytics**: Detailed breakdown of token usage by model, prompt type, and time
- **Low Balance Alerts**: Automatic notifications when token balance falls below 10%
- **Top-Up Options**: Add more tokens without changing subscription tier
- **Team Token Pooling**: Share token allocations across team members
- **Usage Controls**: Set limits and restrictions on token usage per project or user

### 🎨 Development Environment
- **Live Code Editor**: Monaco-based editor with IntelliSense and syntax highlighting
- **Real-time Preview**: Instant preview with responsive design testing
- **Device Simulation**: Preview on desktop, tablet, and mobile with rotation support
- **Dark/Light Mode**: Theme switching with persistent preferences
- **Multi-file Support**: Organized code structure across multiple files
- **Smart File Explorer**: File management with AI prompts in specific files
- **Visual Builder**: Drag-and-drop component builder with live code generation
- **Framework Switcher**: Support for Next.js, Astro, SvelteKit, Remix, and static HTML

### 📁 Project Management
- **Enhanced Projects Dashboard**: Complete dashboard for managing applications
- **Folder Organization**: Organize projects into custom folders with statistics
- **Project Statistics**: Track active, deployed, and starred projects with visual metrics
- **Advanced Search & Filter**: Search with sorting, filtering, and quick filters
- **Grid/List Views**: Toggle between visual grid and detailed list views
- **Project Actions**: Duplicate, rename, delete, export, star, and share projects
- **AI Project Memory**: AI remembers project patterns and preferences across models
- **Project Notes**: Encrypted private notes with templates and auto-save

### 🧩 Template & Plugin System
- **Template Gallery**: Pre-built templates for various app types with categories
- **Plugin Store**: Extensible plugin system for payments, databases, auth, and more
- **Premium Content**: Advanced templates and plugins for Pro users
- **Custom Templates**: Save your own projects as reusable templates
- **Plugin Integration**: One-click installation with automatic setup code generation

### 👥 Collaboration Features
- **Team Collaboration**: Invite team members with role-based permissions
- **Real-time Editing**: Live collaborative code editing with conflict resolution
- **Team Chat**: Built-in chat for project discussions
- **Permission Levels**: Owner, Editor, Viewer roles with granular controls
- **Activity Tracking**: See who's online and what they're working on
- **Collaboration Panel**: Centralized team management interface

### 🔄 Version Control & History
- **AI Conversation History**: Complete history of all AI interactions across models
- **Model Attribution**: Track which AI model handled each response
- **Chat History Panel**: Manage conversation history with favorites and labels
- **Version Rollback**: Restore previous versions of your project
- **Favorite Prompts**: Save and reuse successful prompts
- **Auto-save**: Automatic saving of all changes with timestamps

### 🚀 Deployment & Export
- **GitHub Integration**: Direct export to GitHub repositories with OAuth
- **Live Preview Deploy**: Automatic deployment with preview URLs
- **Mobile Export**: Convert web projects to React Native mobile apps
- **Auto-commit**: Automatic commits with AI-generated messages
- **Multiple Export Options**: ZIP download, GitHub sync, direct deployment
- **Custom Domains**: Deploy with custom domain support
- **One-click Deployment**: Deploy to Netlify, Vercel, and other platforms

### 🔐 Security & Privacy
- **User Authentication**: Secure login/signup with OAuth providers
- **Encrypted Notes**: Private project notes with AES encryption
- **Role-based Access**: Granular permission system
- **Data Privacy**: SOC 2 compliant security measures
- **API Security**: Rate limiting and secure API endpoints
- **Model Privacy**: Secure API key management for all AI providers

## 🏗️ Technical Architecture

### Frontend Stack
- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS with custom design system
- **Components**: shadcn/ui component library
- **Icons**: Lucide React icon library
- **Animations**: Framer Motion for smooth transitions
- **Code Editor**: Monaco Editor with IntelliSense
- **Drag & Drop**: @dnd-kit for visual builder functionality

### AI Integration Architecture
- **AI Orchestrator**: Central coordination system for multiple AI models
- **Model Router**: Intelligent prompt classification and model selection
- **Streaming Engine**: Real-time response generation with WebSocket support
- **Cost Tracker**: Token usage and cost monitoring across all models
- **Fallback System**: Graceful degradation and error recovery
- **Cache Layer**: Redis caching for frequently used AI responses

### Payment & Subscription System
- **Dual Payment Providers**: Stripe for credit cards and Cryptomus for cryptocurrency
- **Token Management**: Comprehensive token tracking, allocation, and deduction system
- **Webhook Handlers**: Secure webhook processing for payment events
- **Subscription Management**: Plan upgrades, downgrades, and cancellations
- **Usage Analytics**: Detailed token consumption tracking and reporting
- **Automatic Renewal**: Seamless subscription renewal with token replenishment
- **Secure Storage**: Encrypted payment method information
- **Invoicing System**: Automated invoice generation and delivery

### Backend & Database
- **Database**: Supabase (PostgreSQL) with real-time subscriptions
- **Authentication**: Supabase Auth with OAuth providers
- **API**: Next.js API routes with TypeScript
- **File Storage**: AWS S3 or Cloudinary for assets
- **Caching**: Redis for performance optimization and AI response caching
- **Queue System**: Bull Queue for AI job processing

### AI Provider Integration
- **OpenAI**: GPT-4o and Whisper models with streaming support
- **Anthropic**: Claude 3 for reasoning and safety
- **Google**: Gemini 1.5 for cloud and data integration
- **Cohere**: Command R+ for debugging and optimization
- **Mistral AI**: Mistral 8x for lightweight processing
- **Custom Models**: Starsky-01 and Starsky-Pro endpoints

### Deployment & DevOps
- **Hosting**: Vercel (recommended) or Netlify
- **CDN**: Global content delivery for assets
- **Monitoring**: Sentry for error tracking
- **Analytics**: PostHog and Google Analytics
- **CI/CD**: GitHub Actions for automated deployment
- **AI Monitoring**: Custom dashboard for AI model performance

## 🚀 Quick Start Guide

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account
- Stripe account (for subscriptions)
- Cryptomus account (for crypto payments)
- AI Provider API keys:
  - OpenAI API key (GPT-4o, Whisper)
  - Anthropic API key (Claude 3)
  - Google AI API key (Gemini 1.5)
  - Cohere API key (Command R+)
  - Mistral API key (Mistral 8x)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/starsky-ai-clone.git
   cd starsky-ai-clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your actual values including all AI provider keys
   ```

4. **Database setup**
   - Create a new Supabase project
   - Run the database migrations
   - Configure authentication providers

5. **Payment Provider Setup**
   - Configure Stripe API keys and webhook endpoints
   - Set up Cryptomus merchant ID and API keys
   - Test payment flows in sandbox mode

6. **AI Provider Setup**
   - Configure OpenAI API key for GPT-4o
   - Set up Anthropic API key for Claude 3
   - Configure Google AI API key for Gemini 1.5
   - Set up Cohere API key for Command R+
   - Configure Mistral API key for Mistral 8x

7. **Start development server**
   ```bash
   npm run dev
   ```

8. **Access the application**
   - Open http://localhost:3000
   - Create an account or sign in
   - Try the Multi-AI Demo at `/demo-v3`
   - Start building your first AI-powered app!

## 🗄️ Database Schema

### Core Tables

#### `profiles`
```sql
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  subscription_tier TEXT DEFAULT 'free',
  ai_usage_limits JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);
```

#### `projects`
```sql
CREATE TABLE public.projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  code TEXT,
  preview_image TEXT,
  status TEXT DEFAULT 'draft',
  folder_id UUID REFERENCES folders(id),
  is_starred BOOLEAN DEFAULT false,
  github_repo TEXT,
  framework TEXT DEFAULT 'nextjs',
  theme_config JSONB,
  ai_model_preferences JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### `subscriptions`
```sql
CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  plan_id TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('active', 'trialing', 'past_due', 'canceled', 'incomplete')),
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  payment_provider TEXT CHECK (payment_provider IN ('stripe', 'cryptomus')),
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  cryptomus_customer_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

#### `token_usage`
```sql
CREATE TABLE public.token_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  plan_id TEXT NOT NULL,
  tokens_total INTEGER NOT NULL,
  tokens_used INTEGER NOT NULL DEFAULT 0,
  tokens_remaining INTEGER NOT NULL,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

#### `token_transactions`
```sql
CREATE TABLE public.token_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  amount INTEGER NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('deduction', 'addition', 'reset')),
  source TEXT NOT NULL CHECK (source IN ('prompt', 'subscription', 'topup', 'admin', 'refund')),
  prompt_id TEXT,
  model_id TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

#### `ai_conversations`
```sql
CREATE TABLE public.ai_conversations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  model_used TEXT NOT NULL,
  prompt TEXT NOT NULL,
  response TEXT,
  prompt_type TEXT,
  tokens_used INTEGER DEFAULT 0,
  cost DECIMAL(10,6) DEFAULT 0,
  duration_ms INTEGER DEFAULT 0,
  confidence_score DECIMAL(3,2),
  is_favorite BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### `ai_job_logs`
```sql
CREATE TABLE public.ai_job_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  job_id TEXT UNIQUE NOT NULL,
  model_used TEXT NOT NULL,
  prompt_type TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'running', 'completed', 'failed')),
  tokens_used INTEGER DEFAULT 0,
  cost DECIMAL(10,6) DEFAULT 0,
  duration_ms INTEGER DEFAULT 0,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);
```

### Row Level Security (RLS)
All tables have RLS enabled with policies ensuring users can only access their own data or data they have permission to view.

## 🎯 Core Components

### AI Orchestration Components

#### **AI Orchestrator (`lib/ai-orchestrator.ts`)**
- **Purpose**: Central coordination system for multiple AI models
- **Features**: Job queuing, model routing, cost tracking, error handling
- **Methods**: `processRequest()`, `getJobLogs()`, `getUsageStats()`

#### **AI Models Library (`lib/ai-models.ts`)**
- **Purpose**: Model definitions, capabilities, and routing logic
- **Features**: Model metadata, cost calculation, prompt classification
- **Functions**: `getOptimalModel()`, `classifyPrompt()`, `getModelBySpecialty()`

#### **Enhanced AI Chat (`components/enhanced-ai-chat.tsx`)**
- **Purpose**: Multi-model chat interface with intelligent routing
- **Features**: Model selection, streaming responses, conversation history
- **Props**: `projectId`, `userTier`, `onCodeGenerated`

### Subscription & Payment Components

#### **Token Manager (`lib/token-manager.ts`)**
- **Purpose**: Manage token allocation, usage, and tracking
- **Features**: Token deduction, usage history, balance checking
- **Methods**: `deductTokens()`, `getUserTokenUsage()`, `hasEnoughTokens()`

#### **Stripe Service (`lib/payment-providers/stripe.ts`)**
- **Purpose**: Handle credit card payments and subscriptions
- **Features**: Checkout sessions, webhooks, subscription management
- **Methods**: `createCheckoutSession()`, `handleSubscriptionCreated()`

#### **Cryptomus Service (`lib/payment-providers/cryptomus.ts`)**
- **Purpose**: Process cryptocurrency payments
- **Features**: Payment creation, status checking, webhook verification
- **Methods**: `createPayment()`, `checkPaymentStatus()`, `verifyWebhookSignature()`

#### **Subscription Manager (`components/subscription/subscription-manager.tsx`)**
- **Purpose**: User interface for subscription management
- **Features**: Plan selection, payment method management, usage history
- **Props**: `userId`

#### **Token Usage Display (`components/subscription/token-usage-display.tsx`)**
- **Purpose**: Visual representation of token usage
- **Features**: Progress bars, low balance warnings, usage statistics
- **Props**: `tokenUsage`, `currentPlan`, `onUpgrade`

### Enhanced Demo Pages

#### **Enhanced Demo Page V3 (`components/enhanced-demo-page-v3.tsx`)**
- **Purpose**: Showcase multi-model AI capabilities
- **Features**: AI orchestration, model monitoring, advanced chat interface
- **Route**: `/demo-v3`

#### **Enhanced Demo Page V2 (`components/enhanced-demo-page-v2.tsx`)**
- **Purpose**: Advanced development environment with framework switching
- **Features**: Visual builder, framework switcher, comprehensive tooling
- **Route**: `/demo`

## 🔧 API Endpoints

### AI Model Management
- `GET /api/ai/models` - List available AI models and capabilities
- `POST /api/ai/generate` - Generate content using optimal AI model
- `POST /api/ai/chat` - Multi-model chat with intelligent routing
- `GET /api/ai/usage` - Get AI usage statistics across all models

### Subscription & Payment
- `POST /api/subscriptions/create-checkout` - Create checkout session for subscription
- `POST /api/subscriptions/customer-portal` - Create customer portal session
- `GET /api/tokens/get-usage` - Get token usage and transaction history
- `POST /api/tokens/check-availability` - Check if user has enough tokens
- `POST /api/tokens/deduct` - Deduct tokens for AI usage
- `POST /api/tokens/top-up` - Add tokens to user account
- `POST /api/webhooks/stripe` - Handle Stripe webhook events
- `POST /api/webhooks/cryptomus` - Handle Cryptomus webhook events

### Model-Specific Endpoints
- `POST /api/ai/gpt4o` - Direct GPT-4o integration for core development
- `POST /api/ai/claude` - Claude 3 for reasoning and safety checks
- `POST /api/ai/gemini` - Gemini 1.5 for cloud and data integration
- `POST /api/ai/command-r` - Command R+ for debugging and optimization
- `POST /api/ai/mistral` - Mistral 8x for lightweight processing

## 🎨 AI Model Integration UI

### Model Selection Interface
- **Visual Model Cards**: Each model displayed with icon, capabilities, and cost
- **Auto-Select Toggle**: Enable/disable intelligent model routing
- **Real-time Recommendations**: Suggest optimal model based on current prompt
- **Tier-based Access**: Show available models based on subscription tier

### AI Conversation Interface
- **Model Attribution**: Clear indication of which model handled each response
- **Streaming Responses**: Real-time response generation with typing indicators
- **Model Switching**: Ability to regenerate responses with different models
- **Confidence Scores**: Display AI confidence levels and suggestions

### Token Usage Interface
- **Usage Dashboard**: Visual representation of token consumption
- **Model Breakdown**: Token usage by AI model and prompt type
- **Usage History**: Detailed transaction history with filtering
- **Low Balance Alerts**: Warnings when token balance is low
- **Upgrade Options**: Easy access to plan upgrade options

## 🔒 Security Features

### AI Security
- **API Key Management**: Secure storage and rotation of AI provider keys
- **Rate Limiting**: Per-model rate limiting to prevent abuse
- **Cost Controls**: Budget limits and alerts for AI usage
- **Model Access Control**: Tier-based access to premium AI models
- **Audit Logging**: Complete audit trail of all AI interactions

### Payment Security
- **PCI Compliance**: Secure handling of payment information
- **Encryption**: End-to-end encryption for payment data
- **Webhook Verification**: Signature verification for payment webhooks
- **Fraud Prevention**: Advanced fraud detection for subscriptions
- **Secure Refunds**: Protected refund process with verification

## 📊 Analytics & Monitoring

### AI-Specific Analytics
- **Model Performance**: Track response quality and user satisfaction per model
- **Cost Optimization**: Identify opportunities to reduce AI costs
- **Usage Patterns**: Understand which models are most effective for different tasks
- **Error Analysis**: Monitor and analyze AI model failures and errors

### Subscription Analytics
- **Revenue Tracking**: Monitor subscription revenue and growth
- **Churn Analysis**: Track and analyze subscription cancellations
- **Conversion Rates**: Measure free-to-paid conversion performance
- **Plan Distribution**: Analyze user distribution across subscription tiers
- **Token Consumption**: Track token usage patterns for capacity planning

## 🚀 Deployment Guide

### Payment Provider Setup
1. **Stripe Configuration**
   - Create a Stripe account and get API keys
   - Set up webhook endpoints for subscription events
   - Configure products and price IDs for subscription plans
   - Enable Strong Customer Authentication (SCA) for European users

2. **Cryptomus Setup**
   - Create a Cryptomus merchant account
   - Generate API keys and configure webhook endpoints
   - Set up supported cryptocurrencies
   - Configure payment notification settings

### AI Provider Setup
1. **OpenAI Configuration**
   - Set up OpenAI API key for GPT-4o and Whisper
   - Configure organization ID and usage limits
   - Enable streaming for real-time responses

2. **Anthropic Setup**
   - Configure Claude 3 API key
   - Set up safety and content filtering
   - Configure rate limits and quotas

### Environment Variables
```bash
# Payment Provider Keys
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
CRYPTOMUS_API_KEY=your_cryptomus_api_key
CRYPTOMUS_MERCHANT_ID=your_cryptomus_merchant_id

# AI Provider Keys
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key
GOOGLE_AI_API_KEY=your_google_ai_key
COHERE_API_KEY=your_cohere_key
MISTRAL_API_KEY=your_mistral_key

# Subscription Configuration
STRIPE_PRO_MONTHLY_PRICE_ID=price_pro_monthly_id
STRIPE_PRO_50_MONTHLY_PRICE_ID=price_pro_50_monthly_id
STRIPE_PRO_100_MONTHLY_PRICE_ID=price_pro_100_monthly_id
STRIPE_PRO_200_MONTHLY_PRICE_ID=price_pro_200_monthly_id
```

## 🧪 Testing

### Payment Testing
```bash
# Test Stripe webhooks locally
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Test subscription creation
npm run test:subscription:create

# Test subscription cancellation
npm run test:subscription:cancel

# Test payment failure handling
npm run test:payment:failure
```

### AI Model Testing
```bash
# Test individual AI models
npm run test:ai:gpt4o
npm run test:ai:claude
npm run test:ai:gemini
npm run test:ai:command-r
npm run test:ai:mistral

# Test AI orchestration
npm run test:ai:orchestrator

# Test model routing
npm run test:ai:routing
```

## 🤝 Contributing

### Payment Integration
- Follow PCI compliance guidelines for payment handling
- Implement proper error handling for payment failures
- Add comprehensive tests for payment flows
- Document webhook handling and subscription lifecycle

### AI Model Integration
- Follow the established pattern for adding new AI models
- Implement proper error handling and fallback mechanisms
- Add comprehensive tests for new AI integrations
- Update documentation for new model capabilities

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support & Community

### Payment & Subscription Support
- **Billing Issues**: Help with subscription and payment problems
- **Plan Changes**: Assistance with upgrading or downgrading plans
- **Refunds**: Support for processing refunds when needed
- **Invoice Requests**: Help with obtaining invoices for payments

### AI-Specific Support
- **Model Issues**: Report AI model performance issues
- **Cost Optimization**: Get help optimizing AI usage costs
- **Integration Help**: Assistance with AI provider setup
- **Custom Models**: Enterprise support for custom AI model training

## 🗺️ AI Roadmap

### Q1 2024
- [x] Multi-model AI orchestration system
- [x] Intelligent prompt routing and classification
- [x] Real-time AI job monitoring and analytics
- [x] Cost tracking and optimization tools

### Q2 2024
- [x] Token-based subscription system with multiple tiers
- [x] Dual payment options (credit card and cryptocurrency)
- [x] Usage analytics and token consumption tracking
- [x] Team collaboration features with shared token pools
- [ ] LLaVA visual AI integration for design analysis
- [ ] Whisper voice-to-code functionality

### Q3 2024
- [ ] AI-powered testing suite with multiple models
- [ ] Advanced AI analytics and business intelligence
- [ ] Multi-language AI model support
- [ ] AI model marketplace for custom integrations

### Q4 2024
- [ ] Edge AI deployment for offline functionality
- [ ] Advanced AI safety and content filtering
- [ ] AI model performance optimization
- [ ] Enterprise AI compliance tools

## 📈 AI Performance Optimization

### Model Selection Optimization
- **Prompt Analysis**: Advanced prompt classification for optimal routing
- **Cost-Performance Balance**: Automatically balance cost vs. quality
- **Response Caching**: Cache AI responses to reduce costs
- **Batch Processing**: Optimize multiple AI requests

### Monitoring & Analytics
- **Real-time Metrics**: Live monitoring of all AI model performance
- **Cost Alerts**: Automated alerts for budget overruns
- **Quality Scoring**: Track AI response quality and user satisfaction
- **Usage Optimization**: Recommendations for optimal AI usage

---

## 🏆 AI Model Comparison

| Feature | GPT-4o | Claude 3 | Gemini 1.5 | Command R+ | Mistral 8x | LLaVA | Whisper |
|---------|--------|----------|------------|------------|------------|-------|---------|
| **Primary Role** | Core Dev | Reasoning | Cloud/Data | Debug/Optimize | Lightweight | Visual | Audio |
| **Availability** | Free/Pro | Pro/Enterprise | Free/Pro | Pro/Enterprise | All Tiers | Pro/Enterprise | Pro/Enterprise |
| **Streaming** | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| **Cost (per 1K tokens)** | $0.03 | $0.015 | $0.0075 | $0.003 | $0.0007 | $0.001 | $0.006 |
| **Max Tokens** | 128K | 200K | 1M | 128K | 32K | 4K | N/A |
| **Latency** | Medium | Medium | Low | Low | Low | High | Low |
| **Best For** | Code Gen | Business Logic | APIs/Backend | Debugging | Quick Tasks | UI Analysis | Voice Input |

## 🔧 AI Technical Specifications

### System Requirements for AI Integration
- **Memory**: 8GB RAM minimum (16GB recommended for multiple models)
- **CPU**: Multi-core processor for concurrent AI requests
- **Network**: Stable internet connection for AI API calls
- **Storage**: Additional space for AI response caching

### AI Provider Dependencies
- **OpenAI SDK**: Latest version with streaming support
- **Anthropic SDK**: Claude 3 integration with safety features
- **Google AI SDK**: Gemini 1.5 with cloud integration
- **Cohere SDK**: Command R+ with optimization features
- **Mistral SDK**: Lightweight processing capabilities

## 💳 Subscription Plans

| Feature | Free | Pro ($20/mo) | Pro 50 ($50/mo) | Pro 100 ($100/mo) | Pro 200 ($200/mo) |
|---------|------|--------------|-----------------|-------------------|-------------------|
| **Tokens/Month** | 200K | 10M | 26M | 55M | 120M |
| **AI Models** | Basic | All | All | All | All |
| **Team Members** | 1 | 1 | 3 | 5 | 10 |
| **Priority Support** | ❌ | ❌ | ✅ | ✅ | ✅ |
| **Upload Limit** | 5MB | 20MB | 50MB | 100MB | 200MB |
| **Payment Options** | N/A | Card/Crypto | Card/Crypto | Card/Crypto | Card/Crypto |
| **Custom Domains** | ❌ | ✅ | ✅ | ✅ | ✅ |
| **Token Top-ups** | ❌ | ✅ | ✅ | ✅ | ✅ |

Built with ❤️ using Next.js, TypeScript, Tailwind CSS, Supabase, and **7 specialized AI models** for the ultimate development experience.

For the latest AI model updates and announcements, follow us on [Twitter](https://twitter.com/starskyai) and [GitHub](https://github.com/starsky-ai).