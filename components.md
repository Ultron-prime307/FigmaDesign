# Component Guide

Each component below maps to a CSS class block in `index.html`. Class names match the selectors in the stylesheet so you can find/edit them directly.

## Menu bar — `.menubar`

Fixed, centered pill at the top of the viewport (`position: fixed; top: 18px; transform: translateX(-50%)`). Contains:
- `.traffic` — three colored dots (`.red`, `.yellow`, `.green`) mimicking macOS window controls
- `.logo` — wordmark with a small gradient dot
- `nav` — horizontal link list, hidden under `760px`
- `.menu-cta` — pill button, right-aligned

**To add a nav link:** add an `<a href="#section-id">Label</a>` inside `<nav>`, and give the matching section that `id`.

## Hero — `.hero`

Centered text block (`eyebrow` + `h1` + lead paragraph + CTA pair) followed by `.window`, a mock macOS app window built from:
- `.window-bar` — fake title bar with traffic lights + centered title text
- `.window-body` — two-column grid: `.window-nav` (sidebar items) + `.window-cards` (2×2 stat grid using `.mini-card`)

**To swap the mockup content:** edit the `.mini-card` stat/label pairs, or replace the whole `.window-body` with a screenshot of the real product (wrap an `<img>` in `.window` instead).

## Buttons — `.btn`

Two variants:
- `.btn-primary` — gradient fill, dark text, used for the main conversion action
- `.btn-ghost` — glass fill, light text, used for secondary actions

Both share base padding/radius/hover-lift from `.btn`. Add new variants by extending this pattern rather than writing one-off button styles.

## Feature card — `.feature-card`

Glass panel containing a `.feature-icon` (gradient tile with a single glyph/character), an `<h3>`, and a `<p>`. Grid is `repeat(3, 1fr)` on desktop, collapsing to 2 then 1 column.

**To add a feature:** copy one `.feature-card` block, change the icon glyph, heading, and description. No JS or numbering required — the grid reflows automatically.

## Pricing card — `.price-card`

Three cards in `.pricing-grid`. The middle/featured plan adds the `.featured` modifier class, which adds a colored border, glow shadow, and a `.badge` ("Most popular") positioned absolutely at the top-right corner.

**To reorder or change the highlighted plan:** move the `.featured` class to a different `.price-card`, and update its `.badge` text or remove the badge entirely.

## Testimonial card — `.testi-card`

Quote (`<p>`) + `.testi-person` (avatar circle + name + role). The avatar is currently a CSS gradient circle (`.avatar`) — swap in a real `<img class="avatar">` to use photos.

## FAQ accordion — `.faq-item`

Built with native `<details>`/`<summary>` — no JavaScript needed for expand/collapse. The `+` indicator rotates to an `×` via `[open] summary::after { transform: rotate(45deg) }`. Accessible by default (keyboard-operable, screen-reader friendly).

**To add a question:** copy one `<details class="faq-item glass">` block.

## CTA band — `.cta-band`

Single large glass panel used as a closing conversion moment before the footer. Just a heading, paragraph, and one `.btn-primary`.

## Footer — `footer` / `.footer-grid`

4-column grid: brand blurb + three link columns (`<h4>` heading + `<ul>` of links). Collapses to 2 columns under `760px`. `.footer-bottom` is a flex row with copyright text, separated by a top border.

## Adding a new section

1. Wrap it in `<section id="your-id" class="wrap">` (or add `.glass` directly to an inner container).
2. Reuse `.section-head` for the eyebrow + heading + intro paragraph pattern.
3. Reuse existing card classes (`.feature-card`, `.testi-card`, etc.) or compose a new grid following the same gap (`20px`) and radius (`var(--radius-lg)`) conventions documented in `design-system.md`.
4. If it should appear in navigation, add a link in `.menubar nav`.
