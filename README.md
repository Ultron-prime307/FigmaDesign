# Flowstate — Landing Page

A responsive SaaS landing page built with a macOS-inspired **liquid glass UI**: frosted, translucent surfaces, soft ambient blobs, and a floating menu bar styled after the macOS traffic-light window chrome.

## What's included

```
flowstate/
├── index.html              # The full landing page (HTML + CSS + minimal JS, single file)
└── docs/
    ├── README.md            # This file
    ├── design-system.md     # Glass UI tokens: color, type, spacing, effects
    ├── components.md        # Component-by-component guide
    └── deployment.md        # How to ship it
```

No build step, no dependencies, no package.json. It's a single static HTML file that runs in any browser.

## Run it locally

**Option 1 — just open it**
Double-click `index.html`, or drag it into a browser tab.

**Option 2 — local server (recommended, avoids font/asset edge cases)**

```bash
# Python
cd flowstate
python3 -m http.server 8000
# then open http://localhost:8000

# Node (if you have it)
npx serve .
```

## Sections included

| Section | Purpose |
|---|---|
| Menu bar | Sticky glass nav styled like a macOS window's title bar |
| Hero | Headline, CTA pair, and a live "app window" mockup showing the product |
| Logo strip | Social proof / customer logos |
| Features | 6-card grid of product capabilities |
| Pricing | 3-tier pricing with a highlighted "Team" plan |
| Testimonials | 3 customer quotes |
| FAQ | Expand/collapse accordion (native `<details>`, no JS needed) |
| Final CTA | Closing conversion band |
| Footer | Link columns + legal |

## Editing content

All copy lives directly in `index.html` — search for the section by its `id` (`#features`, `#pricing`, `#testimonials`, `#faq`) and edit the text in place. There's no templating layer, so changes are plain HTML edits.

For visual changes, see `design-system.md` — every color, blur, and radius is a CSS custom property at the top of the `<style>` block in `:root`, so you can re-theme the whole page by editing a handful of variables.

## Browser support

Relies on `backdrop-filter` for the glass effect (supported in all modern evergreen browsers — Safari, Chrome, Edge, Firefox 103+). On unsupported browsers the glass panels will render as solid translucent boxes without blur — still legible, just less fancy.

## Responsive behavior

- **Desktop (>900px):** full multi-column grids, side nav in the app-window mockup
- **Tablet (600–900px):** feature/testimonial grids collapse to 2 columns, app-window nav hides
- **Mobile (<600px):** single-column stacking throughout, top nav links hide behind the logo + CTA only

Test breakpoints are at `900px`, `760px`, and `600px` in the CSS.
