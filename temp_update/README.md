# Auwal Business

> Building Smart Websites & Apps That Grow Your Business

A full-stack AI-powered portfolio and business platform built with Next.js 16, featuring an AI assistant, client management system, social media command center, and CV builder.

## Features

### Public Website
- **Modern Landing Page** - Neural Dark design system with glassmorphism, particle effects, and smooth animations
- **Services Showcase** - Bento grid layout displaying all business offerings
- **Portfolio Gallery** - Filterable project showcase with category tabs
- **Security Research** - Dedicated section for bug bounty and security work
- **AI Chat Assistant** - Claude-powered chatbot for business consultation
- **Multi-Step Contact Form** - 3-step form with AI-generated proposals

### Admin Dashboard (`/hidden-portal`)
- **Overview Panel** - Stats, recent activity, and system status
- **Client Management** - Full data table with status tracking and CSV export
- **Social AI Command Center** - Enhance content with AI, preview and publish to Twitter, Facebook, WhatsApp
- **AI CV Builder** - Generate professional CVs with ATS scoring and PDF export

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS 4 |
| Animations | CSS Keyframes |
| AI Provider | Anthropic Claude (via Vercel AI SDK) |
| Database | Supabase (PostgreSQL) |
| Email | Resend |
| Icons | Lucide React |
| Fonts | Syne, DM Sans, Space Mono |

## Environment Variables

Create a `.env.local` file with the following:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Admin Dashboard
ADMIN_PASSWORD=your_secure_admin_password

# Email (Resend)
RESEND_API_KEY=re_xxxxx

# Social Media APIs (optional)
TWITTER_API_KEY=xxxxx
TWITTER_API_SECRET=xxxxx
TWITTER_ACCESS_TOKEN=xxxxx
TWITTER_ACCESS_SECRET=xxxxx
```

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/auwntech-audit/security-research-portfolio.git
cd security-research-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (copy `.env.example` to `.env.local` and fill in values)

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Database Schema

The app uses 4 Supabase tables:
- `client_requests` - Form submissions with AI proposals
- `social_broadcasts` - Social media posts and history
- `chat_conversations` - AI assistant session storage
- `cv_history` - Generated CVs and templates

## Deployment

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/auwntech-audit/security-research-portfolio)

## License

MIT License - see [LICENSE](LICENSE) for details.

## Contact

- Email: awntechdigitalservices@gmail.com
- GitHub: [@auwntech-audit](https://github.com/auwntech-audit)
- Website: [auwal.business](https://auwal.business)
