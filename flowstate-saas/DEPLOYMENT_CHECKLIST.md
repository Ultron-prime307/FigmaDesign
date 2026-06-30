# Deployment Checklist — Flowstate SaaS

Follow this checklist before deploying to production.

## Code & Security

- [ ] All secrets moved to environment variables (not in code)
- [ ] `.env.local` and `.env` files in `.gitignore`
- [ ] No API keys logged or exposed in console
- [ ] CORS configured correctly (restrict to your domain)
- [ ] Rate limiting implemented on API endpoints
- [ ] Input validation on all endpoints
- [ ] SQL injection protection (using Prisma ORM ✓)
- [ ] CSRF tokens configured (NextAuth handles ✓)

## Configuration

- [ ] `NODE_ENV` set to `production`
- [ ] `NEXTAUTH_URL` points to production domain
- [ ] `NEXTAUTH_SECRET` is a strong random key (24+ chars)
- [ ] `NEXTAUTH_SECRET` is different from development
- [ ] Database URL points to production database
- [ ] OAuth credentials set (Google/GitHub if enabled)
- [ ] Email SMTP configured (optional, for notifications)

## Database

- [ ] Database is PostgreSQL or MySQL (not SQLite)
- [ ] Database backups enabled
- [ ] Database connection is encrypted (SSL/TLS)
- [ ] Database is accessible only from your app
- [ ] Migration scripts have run: `npm run db:push`
- [ ] Indexes created on frequently queried fields
- [ ] Connection pooling configured (for Vercel, use `prisma/@latest`)

## Performance

- [ ] Images optimized (using `next/image` ✓)
- [ ] CSS minified and bundled
- [ ] JavaScript code split and minified
- [ ] Run `npm run build` succeeds without warnings
- [ ] Lighthouse score > 80 on all pages
- [ ] Load time < 2 seconds on 4G
- [ ] API responses cache-controlled

## Monitoring & Logging

- [ ] Error tracking configured (Sentry, Datadog, etc.)
- [ ] Application monitoring enabled
- [ ] Server logs aggregated (Loggly, CloudWatch, etc.)
- [ ] Uptime monitoring configured
- [ ] Alert notifications setup for errors/downtime
- [ ] Health check endpoint created

## SSL/HTTPS

- [ ] HTTPS enabled (automatically on Vercel/Netlify ✓)
- [ ] Certificate auto-renews
- [ ] No mixed content (HTTP + HTTPS)
- [ ] HSTS headers enabled
- [ ] SSL labs score A+ (optional, for security)

## Backups & Recovery

- [ ] Database automatic backups enabled
- [ ] Backup retention policy set (30+ days)
- [ ] Backup restoration tested
- [ ] Disaster recovery plan documented
- [ ] Data export capability available

## Documentation

- [ ] README updated with production details
- [ ] API documentation up-to-date
- [ ] Runbook for common issues
- [ ] Deployment procedure documented
- [ ] Rollback procedure documented

## Testing

- [ ] Unit tests pass: `npm test`
- [ ] E2E tests pass
- [ ] Authentication flow tested
- [ ] Payment flow tested (if applicable)
- [ ] Database migration tested
- [ ] Error handling tested
- [ ] Load testing performed (if expecting >1000 users)

## Analytics & Tracking

- [ ] Google Analytics configured (optional)
- [ ] Event tracking implemented
- [ ] User consent for tracking (GDPR/CCPA ✓)
- [ ] Privacy policy updated
- [ ] Terms of service updated

## Compliance

- [ ] Privacy policy published
- [ ] Terms of service published
- [ ] GDPR compliant (if EU users)
- [ ] CCPA compliant (if US users)
- [ ] Data retention policy set
- [ ] User data deletion implemented

## Third-Party Services

- [ ] OAuth providers (Google/GitHub) configured
- [ ] Email service (if needed) configured
- [ ] Payment processor (if needed) configured
- [ ] CDN (if needed) configured
- [ ] DNS records updated
- [ ] Custom domain SSL certificate installed

## Final Checks

- [ ] Run production build: `npm run build && npm start`
- [ ] Test in production environment
- [ ] Test all user flows
- [ ] Test error scenarios
- [ ] Verify emails send (if applicable)
- [ ] Check all links work
- [ ] Verify redirects work
- [ ] Test on mobile devices
- [ ] Test on different browsers
- [ ] Clear browser cache and test again

## Day 1 Post-Deployment

- [ ] Monitor error logs for issues
- [ ] Check performance metrics
- [ ] Monitor database connections
- [ ] Check for unusual API usage
- [ ] Verify backups are working
- [ ] Test disaster recovery procedure
- [ ] Announce launch to users

## Ongoing Maintenance

- [ ] Weekly: Review error logs
- [ ] Weekly: Check performance metrics
- [ ] Monthly: Security updates
- [ ] Monthly: Dependency updates (`npm update`)
- [ ] Monthly: Database maintenance
- [ ] Quarterly: Full security audit
- [ ] Quarterly: Disaster recovery drill

---

## Deployment Instructions

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod

# Set environment variables in Vercel dashboard
# Settings → Environment Variables
```

### Self-Hosted (DigitalOcean, AWS, etc.)

```bash
# Build
npm run build

# Start production server
npm start

# Or use PM2 for process management
npm install -g pm2
pm2 start npm --name "flowstate" -- start
pm2 save
```

### Docker

```bash
docker build -t flowstate .
docker run -p 3000:3000 -e DATABASE_URL="..." flowstate
```

---

## Post-Deployment Testing

```bash
# Health check
curl https://yourdomain.com

# API test
curl https://yourdomain.com/api/automations

# SignUp test
# Visit https://yourdomain.com/auth/register
# Create account and verify signup flow

# Dashboard test
# Sign in and verify dashboard works
```

---

## Emergency Contacts

- Deployment team: [email]
- On-call support: [phone]
- Database admin: [email]
- Security contact: [email]

---

**Last updated:** [Date]  
**Deployed by:** [Name]  
**Production URL:** [URL]
