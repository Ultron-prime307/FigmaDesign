# Flowstate SaaS — Complete Full-Stack Application

A production-ready SaaS platform built with **Next.js 14**, **TypeScript**, **Prisma ORM**, and **NextAuth.js** for managing automated workflows.

**Features:**
- ✅ Landing page with liquid glass design system
- ✅ User authentication (Email/Password + OAuth with Google/GitHub)
- ✅ Dashboard for managing automations
- ✅ REST API for automation CRUD operations
- ✅ Analytics tracking system
- ✅ Real-time data persistence with SQLite
- ✅ Type-safe backend and frontend
- ✅ Responsive design with Tailwind CSS
- ✅ Ready for deployment to Vercel, Netlify, or any Node.js host

## Project Structure

```
flowstate-saas/
├── app/                          # Next.js app directory (App Router)
│   ├── api/                      # API routes
│   │   ├── auth/                 # Authentication endpoints
│   │   ├── automations/          # Automation CRUD endpoints
│   │   └── analytics/            # Analytics endpoints
│   ├── auth/                     # Authentication pages
│   │   ├── signin/               # Sign in page
│   │   └── register/             # Registration page
│   ├── dashboard/                # Protected dashboard
│   ├── globals.css               # Global styles with design tokens
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Landing page
├── components/                   # Reusable React components
│   └── Navbar.tsx                # Navigation component
├── lib/                          # Utility functions
│   └── prisma.ts                 # Prisma client instance
├── prisma/                       # Database configuration
│   └── schema.prisma             # Database models
├── .env.local                    # Local environment variables
├── .env.example                  # Environment template
├── next.config.js                # Next.js configuration
├── tailwind.config.js            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies and scripts

```

## Quick Start

### 1. Install Dependencies

```bash
cd flowstate-saas
npm install
```

### 2. Set Up Environment Variables

Copy `.env.example` to `.env.local` and update values:

```bash
cp .env.example .env.local
```

**Key variables:**
- `DATABASE_URL`: SQLite database path (default: `file:./dev.db`)
- `NEXTAUTH_URL`: Your app URL (default: `http://localhost:3000`)
- `NEXTAUTH_SECRET`: Generate a secure secret for production
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`: For Google OAuth (optional)
- `GITHUB_ID` / `GITHUB_SECRET`: For GitHub OAuth (optional)

### 3. Initialize the Database

```bash
npm run db:push
```

This creates the SQLite database with all tables defined in `prisma/schema.prisma`.

### 4. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Core Features

### Authentication System

**Built with NextAuth.js:**
- Email/Password registration and login
- OAuth integration (Google, GitHub)
- Secure session management with JWT
- Password hashing with bcryptjs
- Protected routes and API endpoints

**Sign up:** [http://localhost:3000/auth/register](http://localhost:3000/auth/register)  
**Sign in:** [http://localhost:3000/auth/signin](http://localhost:3000/auth/signin)

### Automation Management

**API Endpoints:**
- `GET /api/automations` — List all automations for the user
- `POST /api/automations` — Create a new automation
- `GET /api/automations/[id]` — Get automation details
- `PATCH /api/automations/[id]` — Update automation
- `DELETE /api/automations/[id]` — Delete automation

**Database Model:**
```typescript
model Automation {
  id: string
  name: string
  description?: string
  enabled: boolean
  config: string (JSON)
  userId: string
  createdAt: DateTime
  updatedAt: DateTime
  lastRun?: DateTime
}
```

### Analytics System

**API Endpoints:**
- `GET /api/analytics` — Get analytics summary and events

**Tracked Events:**
- `automation_run` — When an automation executes
- `automation_error` — When an automation fails
- Custom events via API

**Database Model:**
```typescript
model AnalyticsEvent {
  id: string
  userId: string
  event: string (automation_run, automation_error, etc.)
  metadata?: string (JSON)
  createdAt: DateTime
}
```

### Dashboard

**Protected route:** [http://localhost:3000/dashboard](http://localhost:3000/dashboard)

**Features:**
- View all automations
- Create new automations
- Edit automation settings
- Delete automations
- Monitor automation status
- View last run date

## Database Schema

### User
- Stores user accounts and OAuth connections
- Linked to automations, sessions, and analytics events

### Automation
- Workflow configurations for users
- JSON config field for flexible workflow definitions
- Enable/disable toggles and run tracking

### AnalyticsEvent
- Tracks automation executions and errors
- Flexible metadata field for custom event data

### Account & Session (NextAuth.js)
- OAuth provider information
- Session tokens for authentication

### VerificationToken
- For email verification (future feature)

## API Examples

### Create an Automation

```bash
curl -X POST http://localhost:3000/api/automations \
  -H "Content-Type: application/json" \
  -b "sessionToken=YOUR_TOKEN" \
  -d '{
    "name": "Daily Report",
    "description": "Generate and send daily reports",
    "config": {
      "trigger": "schedule",
      "schedule": "0 9 * * MON-FRI",
      "actions": [
        { "type": "fetch_data", "source": "analytics" },
        { "type": "generate_report" },
        { "type": "send_email", "to": "team@example.com" }
      ]
    }
  }'
```

### Get Analytics

```bash
curl http://localhost:3000/api/analytics \
  -b "sessionToken=YOUR_TOKEN"
```

## Deployment

### Deploy to Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

Vercel will automatically detect Next.js and deploy. Update `NEXTAUTH_SECRET` and database connection in the Vercel dashboard.

### Deploy to Netlify

```bash
npm run build
netlify deploy --prod --dir=.next
```

### Deploy to Any Node.js Host

```bash
npm run build
npm start
```

**Environment variables to set:**
- `NODE_ENV=production`
- `NEXTAUTH_SECRET` (generate with: `openssl rand -base64 32`)
- `DATABASE_URL` (point to production database)
- Database must support the provider in `prisma/schema.prisma`

### Using a Production Database

For production, replace SQLite with PostgreSQL or MySQL:

**For PostgreSQL:**
```prisma
// In prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

**For MySQL:**
```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

Then update `DATABASE_URL` environment variable with your connection string.

## Development

### Database Management

**View database:**
```bash
npm run db:studio
```

Opens Prisma Studio at [http://localhost:5555](http://localhost:5555)

**Push schema changes:**
```bash
npm run db:push
```

**Generate Prisma client:**
```bash
npm run db:generate
```

### Linting

```bash
npm run lint
```

### Build for production

```bash
npm run build
```

## Security Checklist

- [ ] Change `NEXTAUTH_SECRET` to a secure random value
- [ ] Set `NEXTAUTH_URL` to your production domain
- [ ] Enable HTTPS in production
- [ ] Use a production database (PostgreSQL/MySQL, not SQLite)
- [ ] Set up OAuth credentials securely
- [ ] Enable CORS restrictions if needed
- [ ] Implement rate limiting on API endpoints
- [ ] Add CSRF protection
- [ ] Keep dependencies updated: `npm audit fix`

## Technologies Used

- **Framework:** Next.js 14 (React 18)
- **Language:** TypeScript
- **Database:** Prisma ORM + SQLite (dev) / PostgreSQL/MySQL (prod)
- **Authentication:** NextAuth.js 4
- **Styling:** Tailwind CSS + CSS variables
- **Password Hashing:** bcryptjs
- **API:** REST with Next.js API Routes
- **Validation:** Zod (ready to integrate)

## Next Steps for Production

1. **Add Email Verification** — Implement email confirmation flow
2. **Enable OAuth** — Set up Google/GitHub OAuth credentials
3. **Add Rate Limiting** — Prevent abuse on API endpoints
4. **Implement Webhooks** — Allow third-party integrations
5. **Add Audit Logs** — Track all user actions
6. **Set Up Monitoring** — Use Sentry or similar for error tracking
7. **Create Admin Panel** — Manage users and system health
8. **Add Payment Processing** — Integrate Stripe for billing
9. **Implement Teams** — Multi-user collaboration features
10. **Build Workflow Builder UI** — Visual automation designer

## License

MIT — Use this template freely for your projects.

## Support

For questions or issues, refer to the documentation files:
- [Design System](../design-system.md)
- [Component Guide](../components.md)
- [Deployment Guide](../deployment.md)

---

Built with ❤️ using Next.js and Flowstate's liquid glass design system.
