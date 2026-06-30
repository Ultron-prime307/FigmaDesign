# Deployment Guide

This is a single static HTML file with no build step — deployment is just "put the file on a host."

## Option 1: Netlify (drag and drop)

1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the `flowstate` folder (or just `index.html`) onto the page
3. Netlify gives you a live URL immediately; add a custom domain under **Site settings → Domain management** if needed

## Option 2: Vercel

```bash
npm install -g vercel
cd flowstate
vercel --prod
```
Follow the prompts (no framework preset needed — choose "Other" if asked).

## Option 3: GitHub Pages

1. Push the `flowstate` folder to a GitHub repo
2. Repo → **Settings → Pages**
3. Source: **Deploy from a branch**, branch: `main`, folder: `/ (root)` (or `/docs` if you move `index.html` there)
4. Your site is live at `https://<username>.github.io/<repo>/`

## Option 4: Any static file host (S3, Cloudflare Pages, Firebase Hosting, plain Nginx/Apache)

Just upload `index.html`. There's nothing to compile — any host that serves static files works:

```bash
# Cloudflare Pages CLI example
npx wrangler pages deploy flowstate --project-name=flowstate-landing

# Firebase Hosting example
firebase init hosting   # point public dir at the flowstate folder
firebase deploy
```

## Pre-deploy checklist

- [ ] Replace placeholder copy (pricing, testimonials, feature text) with real product content
- [ ] Replace logo strip placeholder names with real customer logos (as images) if you have permission to display them
- [ ] Update all CTA buttons to link to your actual sign-up / demo URLs (`href="#"` placeholders need real destinations)
- [ ] Add a `<meta name="description">` tag and Open Graph tags (`og:title`, `og:image`, etc.) for link previews
- [ ] Add a favicon (`<link rel="icon" href="...">`)
- [ ] Run a Lighthouse audit — `backdrop-filter` is GPU-intensive, so check mobile performance on a mid-range device
- [ ] Verify the page on Safari specifically, since `backdrop-filter` support and blur rendering can differ slightly from Chromium browsers

## Performance notes

- Fonts load from Google Fonts via `<link>` — for production, consider self-hosting the three font files to remove the external request and avoid layout shift.
- The animated ambient blobs use `filter: blur()` and `transform`, both GPU-accelerated — avoid adding `box-shadow` animations elsewhere on the page, as those are more expensive.
- No images are used in the current build (everything is CSS gradients/shapes), so there's nothing to optimize/compress yet — but any logos or screenshots you add should be served as compressed WebP/AVIF with explicit `width`/`height` to avoid layout shift.

## Custom domain + HTTPS

All four hosting options above provision free HTTPS automatically (Let's Encrypt) once you attach a custom domain — no extra configuration needed beyond pointing your domain's DNS (typically a `CNAME` or `A` record) at the host.
