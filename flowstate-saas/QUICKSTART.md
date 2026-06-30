# Quick Start Guide — Flowstate SaaS

## Prerequisites

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** or **yarn**
- A code editor (VS Code recommended)

## 5-Minute Setup

### Step 1: Clone or Download

```bash
cd flowstate-saas
```

### Step 2: Install

```bash
npm install
```

### Step 3: Database Setup

```bash
npm run db:push
```

### Step 4: Start Dev Server

```bash
npm run dev
```

### Step 5: Open in Browser

Go to **[http://localhost:3000](http://localhost:3000)**

---

## Test the Application

### 1. **Visit Landing Page**
   - [http://localhost:3000](http://localhost:3000)
   - Browse features, pricing, FAQ

### 2. **Create an Account**
   - Click "Get started" or go to [http://localhost:3000/auth/register](http://localhost:3000/auth/register)
   - Enter name, email, password
   - You're registered!

### 3. **Sign In**
   - Go to [http://localhost:3000/auth/signin](http://localhost:3000/auth/signin)
   - Use your credentials
   - Redirects to dashboard

### 4. **Dashboard**
   - [http://localhost:3000/dashboard](http://localhost:3000/dashboard)
   - Create automations
   - View your automations
   - Delete automations

### 5. **Sign Out**
   - Click "Sign out" button

---

## Useful Commands

```bash
# Start development server
npm run dev

# View database in browser
npm run db:studio

# Build for production
npm run build

# Run production build
npm start

# Lint code
npm run lint
```

---

## OAuth Setup (Optional)

To enable Google/GitHub login:

### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable **Google+ API**
4. Create **OAuth 2.0 Credentials** (Web application)
5. Add redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Client Secret to `.env.local`:
   ```
   GOOGLE_CLIENT_ID=your_client_id
   GOOGLE_CLIENT_SECRET=your_client_secret
   ```

### GitHub OAuth

1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Create **New OAuth App**
3. Set Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. Copy Client ID and Client Secret to `.env.local`:
   ```
   GITHUB_ID=your_client_id
   GITHUB_SECRET=your_client_secret
   ```

Restart dev server after updating `.env.local`.

---

## Customizing

### Change Colors

Edit `:root` variables in **`app/globals.css`**:

```css
:root {
  --bg: #0a0c16;                    /* Page background */
  --accent-violet: #8b7bff;         /* Primary accent */
  --accent-cyan: #5ce1ff;           /* Secondary accent */
  /* ... rest of colors */
}
```

### Add a New Page

1. Create a file: `app/my-page/page.tsx`
2. Add your content:
   ```tsx
   export default function MyPage() {
     return <div>Hello</div>
   }
   ```
3. Access at [http://localhost:3000/my-page](http://localhost:3000/my-page)

### Add an API Endpoint

1. Create a file: `app/api/my-endpoint/route.ts`
2. Add handler:
   ```tsx
   export async function GET(req) {
     return Response.json({ message: "Hello" })
   }
   ```
3. Call at [http://localhost:3000/api/my-endpoint](http://localhost:3000/api/my-endpoint)

### Update Database Model

1. Edit `prisma/schema.prisma`
2. Run: `npm run db:push`

---

## Troubleshooting

### "Cannot find module" error
```bash
npm install
npm run db:generate
```

### Database locked error
Delete `prisma/dev.db` and run `npm run db:push` again

### Port 3000 already in use
```bash
npm run dev -- -p 3001
```

### Environment variables not loading
Restart dev server after updating `.env.local`

---

## Next Steps

1. ✅ Explore the codebase
2. ✅ Customize branding in `app/page.tsx`
3. ✅ Add your own automations logic
4. ✅ Deploy to [Vercel](https://vercel.com) or [Netlify](https://netlify.com)

---

For more details, see [README.md](./README.md)
