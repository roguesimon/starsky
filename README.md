# Starsky AI - AI-Powered No-Code Web App Builder

A comprehensive Next.js application that replicates the functionality of modern AI-powered web development platforms. Build beautiful, production-ready web applications using natural language descriptions.

## 🌟 Features

### Core Functionality
- **AI-Powered Development**: Describe your app in plain English and watch it come to life
- **Live Code Editor**: Monaco-based editor with IntelliSense and syntax highlighting
- **Real-time Preview**: Instant preview with responsive design testing
- **Project Management**: Complete dashboard for managing your applications

### AI Models
- **starsky-01**: Free tier AI model for basic applications
- **starsky-pro**: Advanced AI model with enhanced capabilities

### Development Tools
- **Code Generation**: Automatic HTML, CSS, and JavaScript generation
- **Responsive Design**: Mobile-first approach with multiple breakpoints
- **Version Control**: Built-in version history and GitHub integration
- **Export Options**: Download ZIP, GitHub sync, or deploy directly

### Authentication & Subscription
- **User Authentication**: Secure login/signup with Supabase
- **Subscription Plans**: Free and Pro tiers with Stripe integration
- **Usage Tracking**: Monitor API usage and project limits

### Deployment & Integration
- **Multiple Deployment Options**: GitHub Pages, Netlify, custom domains
- **GitHub Integration**: Direct repository creation and management
- **API Access**: RESTful API for developers

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account
- Stripe account (for subscriptions)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/starsky-ai-clone.git
   cd starsky-ai-clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   
   # Stripe Configuration
   STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_webhook_secret
   
   # AI Model Configuration
   OPENAI_API_KEY=your_openai_key
   ANTHROPIC_API_KEY=your_anthropic_key
   
   # Application Settings
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret
   ```

4. **Set up Supabase**
   - Create a new Supabase project
   - Run the database migrations (see Database Schema section)
   - Configure authentication providers

5. **Configure Stripe**
   - Set up your Stripe products and prices
   - Configure webhooks for subscription management

6. **Start the development server**
   ```bash
   npm run dev
   ```

## 🗄️ Database Schema

### Supabase Tables

```sql
-- Users table (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  subscription_tier TEXT DEFAULT 'free',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Projects table
CREATE TABLE public.projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  code TEXT,
  preview_image TEXT,
  status TEXT DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Usage tracking
CREATE TABLE public.usage_tracking (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  resource_type TEXT NOT NULL,
  amount INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usage_tracking ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own projects" ON public.projects
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own projects" ON public.projects
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own projects" ON public.projects
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own projects" ON public.projects
  FOR DELETE USING (auth.uid() = user_id);
```

## 🎨 Customization

### Styling
The application uses Tailwind CSS with a custom design system:
- **Primary Colors**: Blue gradient with purple accents
- **Typography**: Inter font family with proper hierarchy
- **Components**: shadcn/ui component library
- **Animations**: Framer Motion for smooth transitions

### AI Integration
Currently configured for OpenAI and Anthropic models. To add new AI providers:

1. Create a new service in `lib/ai-providers/`
2. Update the AI model selection in the demo interface
3. Configure environment variables for the new provider

### Themes
Light and dark modes are supported out of the box using next-themes:
- Toggle component in navigation
- Automatic system preference detection
- Persistent user preferences

## 📡 API Routes

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### AI Generation
- `POST /api/generate` - Generate application from prompt
- `POST /api/generate/improve` - Improve existing code

### Project Management
- `GET /api/projects` - List user projects
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Deployment
- `POST /api/deploy/github` - Deploy to GitHub Pages
- `POST /api/deploy/netlify` - Deploy to Netlify
- `POST /api/export/zip` - Export project as ZIP

## 🔧 Configuration

### Environment Variables
All configuration is handled through environment variables. See the `.env.example` file for a complete list.

### Feature Flags
Toggle features using environment variables:
```env
FEATURE_GITHUB_INTEGRATION=true
FEATURE_STRIPE_SUBSCRIPTIONS=true
FEATURE_AI_GENERATION=true
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment
```bash
# Build the application
npm run build

# Start production server
npm start
```

### Docker
```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [https://docs.starsky.ai](https://docs.starsky.ai)
- **Community Forum**: [https://community.starsky.ai](https://community.starsky.ai)
- **Email Support**: support@starsky.ai
- **GitHub Issues**: [Create an issue](https://github.com/yourusername/starsky-ai-clone/issues)

## 🗺️ Roadmap

- [ ] Advanced AI model fine-tuning
- [ ] Team collaboration features
- [ ] Plugin system for extensions
- [ ] Mobile app development
- [ ] Enterprise SSO integration
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Voice-to-code generation

---

Built with ❤️ using Next.js, TypeScript, Tailwind CSS, and Supabase.