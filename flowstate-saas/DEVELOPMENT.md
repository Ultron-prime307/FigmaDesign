# Development Guide

## Project Structure Deep Dive

```
app/
├── api/                          # Backend API routes
│   ├── auth/
│   │   ├── [...]nextauth]/      # NextAuth.js endpoint
│   │   └── register/            # Custom registration endpoint
│   ├── automations/             # Automation CRUD
│   └── analytics/               # Analytics data
├── auth/                        # Authentication pages
│   ├── signin/                  # Sign in form
│   └── register/                # Registration form
├── dashboard/                   # Protected dashboard
├── globals.css                  # Global styles with tokens
├── layout.tsx                   # Root layout (all pages)
└── page.tsx                     # Landing page (/)

components/
└── Navbar.tsx                   # Reusable navbar

lib/
└── prisma.ts                    # Prisma client singleton

prisma/
└── schema.prisma                # Database models
```

## How It Works

### Landing Page Flow

1. User visits `/` (root)
2. `app/page.tsx` renders
3. Includes `<Navbar>` component
4. Shows features, pricing, FAQ
5. Links to `/auth/register` and `/auth/signin`

### Registration Flow

1. User clicks "Get started"
2. Redirects to `/auth/register`
3. `app/auth/register/page.tsx` renders form
4. Form submits to `POST /api/auth/register`
5. Password hashed with bcryptjs
6. User created in database
7. Redirects to signin page

### Authentication Flow

1. User fills signin form
2. NextAuth.js handles credentials check
3. `POST /api/auth/[...nextauth]` processes
4. If valid, session created
5. Cookie set in browser
6. Redirects to `/dashboard`

### Dashboard Flow

1. User visits `/dashboard`
2. Middleware checks session
3. If not authenticated, redirects to signin
4. `app/dashboard/page.tsx` renders
5. Fetches automations from `GET /api/automations`
6. Displays list of user's automations
7. Can create, edit, or delete

### Automation API Flow

1. Request to `/api/automations`
2. `getServerSession()` verifies user
3. Query database filtered by `userId`
4. Return JSON response
5. Frontend renders data

## Key Patterns

### Protected Routes

Routes under `/dashboard` are protected by middleware in `middleware.ts`:
- Checks if user has valid session
- If not, redirects to `/auth/signin`

To protect a new route:
1. Create it under `/dashboard/your-route/`
2. Middleware automatically protects it

### API Authentication

All API endpoints check auth via:
```typescript
const session = await getServerSession(authOptions)
if (!session?.user?.id) {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
}
```

### Database Queries

Use Prisma for type-safe queries:

```typescript
// Get all automations for user
const automations = await prisma.automation.findMany({
  where: { userId: session.user.id },
  orderBy: { createdAt: "desc" },
})

// Create new automation
const automation = await prisma.automation.create({
  data: {
    name: "My Automation",
    userId: session.user.id,
    config: JSON.stringify({...}),
  },
})
```

## Common Tasks

### Add a New API Endpoint

1. Create file: `app/api/my-endpoint/route.ts`
2. Import dependencies:
   ```typescript
   import { NextRequest, NextResponse } from "next/server"
   import { getServerSession } from "next-auth"
   import { authOptions } from "@/app/api/auth/[...nextauth]/route"
   import { prisma } from "@/lib/prisma"
   ```
3. Implement handler:
   ```typescript
   export async function GET(req: NextRequest) {
     const session = await getServerSession(authOptions)
     if (!session?.user?.id) {
       return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
     }
     // Your logic here
     return NextResponse.json(data)
   }
   ```

### Add a Database Model

1. Edit `prisma/schema.prisma`
2. Add model:
   ```prisma
   model MyModel {
     id String @id @default(cuid())
     userId String
     user User @relation(fields: [userId], references: [id], onDelete: Cascade)
     // ... fields
   }
   ```
3. Run migration:
   ```bash
   npm run db:push
   ```

### Add a Protected Page

1. Create file: `app/dashboard/my-page/page.tsx`
2. Add `'use client'` if it uses hooks
3. Import `useSession`:
   ```typescript
   'use client'
   import { useSession } from "next-auth/react"
   import { useRouter } from "next/navigation"
   
   export default function MyPage() {
     const { data: session } = useSession()
     const router = useRouter()
     
     if (!session) {
       return <div>Loading...</div>
     }
     
     return <div>Protected content</div>
   }
   ```

### Style with Tailwind

Use Tailwind classes and CSS variables:

```tsx
<div className="bg-[var(--bg)] text-[var(--text-1)]">
  <h1 className="text-3xl font-bold">
    Gradient Text
  </h1>
  <button className="btn btn-primary">
    Click Me
  </button>
</div>
```

CSS variables defined in `app/globals.css`:
```css
:root {
  --bg: #0a0c16;
  --text-1: #f3f4fb;
  --accent-violet: #8b7bff;
}
```

### Debug with Prisma Studio

```bash
npm run db:studio
```

Opens [http://localhost:5555](http://localhost:5555) to browse database.

## Testing

### Test Registration

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "testpass123",
    "name": "Test"
  }'
```

### Test API Endpoint

1. Sign in via `/auth/signin`
2. Check Application → Cookies → `next-auth.session-token`
3. Call API:
   ```bash
   curl http://localhost:3000/api/automations \
     -H "Cookie: next-auth.session-token=VALUE"
   ```

## Environment Variables Reference

| Variable | Purpose | Default |
|---|---|---|
| `DATABASE_URL` | Database connection | `file:./dev.db` |
| `NEXTAUTH_URL` | App URL for auth | `http://localhost:3000` |
| `NEXTAUTH_SECRET` | Session encryption key | Required for production |
| `NODE_ENV` | Environment | `development` |

## Debugging

### Enable Debug Logging

In `app/api/auth/[...nextauth]/route.ts`:
```typescript
export const authOptions = {
  debug: true, // Show auth logs
  // ...
}
```

### Check Database

```bash
npm run db:studio
```

### View Build Output

```bash
npm run build
```

## Performance Tips

1. Use `next/image` for images
2. Lazy load components with `dynamic()`
3. Cache API responses where possible
4. Use `<Suspense>` for loading states
5. Minimize re-renders with `useMemo`

## Next Steps

1. **Add Email Verification** — Send verification email on signup
2. **Add Two-Factor Auth** — Implement 2FA
3. **Add Team Management** — Support multiple users per team
4. **Add Webhooks** — Allow third-party integrations
5. **Add Audit Logs** — Track all user actions
6. **Add Admin Panel** — Manage system and users
7. **Add Billing** — Integrate Stripe for payments

---

For more, see [README.md](./README.md) and [API.md](./API.md)
