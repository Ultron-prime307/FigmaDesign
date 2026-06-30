# Environment Variables Setup

This guide explains all environment variables used in the Flowstate SaaS.

## Development (`.env.local`)

```env
# Database
DATABASE_URL="file:./dev.db"

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-development-secret-key-change-in-production"

# OAuth (Optional)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_ID=
GITHUB_SECRET=
```

## Production

Before deploying, ensure these are set correctly:

### Required

| Variable | Description | Example |
|---|---|---|
| `DATABASE_URL` | Production database connection string | `postgresql://user:pass@host/db` |
| `NEXTAUTH_URL` | Your app URL | `https://flowstate.example.com` |
| `NEXTAUTH_SECRET` | Secure random key for session encryption | `openssl rand -base64 32` |

### Optional (OAuth)

| Variable | Description |
|---|---|
| `GOOGLE_CLIENT_ID` | From Google Cloud Console |
| `GOOGLE_CLIENT_SECRET` | From Google Cloud Console |
| `GITHUB_ID` | From GitHub OAuth app settings |
| `GITHUB_SECRET` | From GitHub OAuth app settings |

## Generating NEXTAUTH_SECRET

```bash
# On macOS/Linux
openssl rand -base64 32

# On Windows (PowerShell)
[Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(24))

# Or use online generator
# https://generate-secret.vercel.app/32
```

## Vercel Deployment

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables in **Settings → Environment Variables**:
   - `DATABASE_URL` (production database)
   - `NEXTAUTH_SECRET` (generate new key)
   - `NEXTAUTH_URL` (your Vercel URL)
   - OAuth keys (if using)
4. Deploy

## Database URLs

### SQLite (Development)
```
DATABASE_URL="file:./dev.db"
```

### PostgreSQL
```
DATABASE_URL="postgresql://username:password@host:5432/database"
```

### MySQL
```
DATABASE_URL="mysql://username:password@host:3306/database"
```

### MongoDB
```
DATABASE_URL="mongodb://username:password@host:27017/database"
```

Note: You must update `prisma/schema.prisma` to match your database provider.

## Checking Env Variables

In Next.js, only variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

**Example:**
```env
NEXT_PUBLIC_API_URL="https://api.example.com"  # Exposed to browser
DATABASE_URL="secret_url"                       # Not exposed
```

## Troubleshooting

### "Environment variable not found"
- Restart dev server after updating `.env.local`
- Check variable name spelling
- Don't add spaces around `=` sign

### OAuth not working
- Verify Client ID and Secret are correct
- Check callback URLs match your app domain
- Ensure credentials are in `.env.local` (not `.env.example`)

### Database connection errors
- Verify `DATABASE_URL` is correct
- Test connection: `npm run db:studio`
- For production, ensure database allows connections from your IP

## Security Tips

- ✅ Never commit `.env.local` to Git
- ✅ Use strong `NEXTAUTH_SECRET` (24+ characters)
- ✅ Rotate secrets periodically in production
- ✅ Use different secrets per environment (dev/staging/prod)
- ✅ Use a secret manager in production (Vercel, AWS Secrets Manager, etc.)
- ✅ Don't paste secrets in code or chat
- ✅ Enable branch protection requiring environment variables

## CI/CD Integration

For GitHub Actions or similar:

```yaml
env:
  DATABASE_URL: ${{ secrets.DATABASE_URL }}
  NEXTAUTH_SECRET: ${{ secrets.NEXTAUTH_SECRET }}
  NEXTAUTH_URL: https://flowstate.example.com
```

Store secrets in your CI/CD platform's secret manager, not in `.env` files.
