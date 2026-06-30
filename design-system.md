# Design System — Liquid Glass UI

The visual language is macOS-inspired "liquid glass": translucent frosted panels floating over a deep, slowly drifting gradient field, with a literal nod to macOS window chrome (traffic-light dots, a floating menu bar).

## 1. Color tokens

| Token | Value | Use |
|---|---|---|
| `--bg` | `#0a0c16` | Page background base |
| `--bg-2` | `#0d1020` | Background radial gradient inner stop |
| `--glass` | `rgba(255,255,255,0.06)` | Default glass panel fill |
| `--glass-strong` | `rgba(255,255,255,0.10)` | Hover/elevated glass fill, mini-cards |
| `--glass-border` | `rgba(255,255,255,0.14)` | Glass panel border |
| `--text-1` | `#f3f4fb` | Primary text |
| `--text-2` | `#a4a9c1` | Secondary text / body copy |
| `--text-3` | `#6c7191` | Tertiary text / captions / labels |
| `--accent-violet` | `#8b7bff` | Primary accent, gradients, CTAs |
| `--accent-cyan` | `#5ce1ff` | Secondary accent, gradients, links |
| `--accent-pink` | `#ff7ab8` | Tertiary accent, ambient blob only |

Accents are never used as flat fills on their own — always as part of a gradient (`linear-gradient(135deg, var(--accent-violet), var(--accent-cyan))`) to keep the "liquid" feel rather than flat brand blocks.

## 2. Typography

| Role | Family | Weight | Usage |
|---|---|---|---|
| Display | `Space Grotesk` | 500–700 | H1/H2/H3, logo |
| Body | `Inter` | 400–600 | Paragraphs, UI labels, buttons |
| Mono/utility | `JetBrains Mono` | 400–500 | Eyebrows, stat numbers, window-bar title |

Type scale (desktop):
- H1: `clamp(38px, 6.4vw, 72px)`, line-height 1.04
- H2: `clamp(28px, 4vw, 42px)`
- Body lead: `18px` / line-height 1.65
- Body: `14–15px` / line-height 1.6–1.65
- Eyebrow/mono labels: `13px`, letter-spacing `0.08em`, uppercase

## 3. The glass effect (`.glass`)

```css
.glass{
  background: var(--glass);
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(24px) saturate(160%);
  -webkit-backdrop-filter: blur(24px) saturate(160%);
  border-radius: var(--radius-lg);
  box-shadow:
    0 8px 32px rgba(0,0,0,0.35),     /* drop shadow for depth */
    inset 0 1px 0 rgba(255,255,255,0.08); /* top inner highlight = "glass edge" */
}
```

Recipe: translucent fill + blur + saturate boost + soft outer shadow + a 1px inner highlight on top. The saturate boost is what makes colors behind the glass feel rich instead of washed out — don't drop it.

## 4. Radii

| Token | Value | Use |
|---|---|---|
| `--radius-lg` | `28px` | Large panels (hero window, cards) |
| `--radius-md` | `18px` | Buttons, mid-size elements |
| `--radius-sm` | `12px` | Small chips, icon tiles |
| `999px` | — | Pills (menu bar, badges, nav CTA) |

## 5. Ambient background

Three large blurred radial "blobs" (violet, cyan, pink) positioned off-canvas at the corners, `filter: blur(90px)`, animating slowly (`22s ease-in-out infinite alternate`) between two transform states. A faint SVG noise overlay (`opacity: 0.025`) sits on top to prevent flat gradient banding. This is what gives the glass panels something interesting to refract.

```css
.blob{ filter: blur(90px); opacity: 0.55; animation: drift 22s ease-in-out infinite alternate; }
@keyframes drift{
  from{ transform: translate(0,0) scale(1); }
  to{ transform: translate(40px,-30px) scale(1.08); }
}
```

Respect `prefers-reduced-motion` — all animations are disabled via a single media query at the top of the stylesheet.

## 6. Elevation / hover behavior

Glass panels lift on hover with a combination of `transform: translateY(-2px to -4px)` and a swap from `--glass` to `--glass-strong`. Never use heavier shadows for elevation — depth comes from blur + background brightness, not shadow size, to stay consistent with the macOS "frosted layer" metaphor.

## 7. Signature element

The **floating menu bar**: a pill-shaped glass bar fixed to the top of the viewport containing macOS traffic-light dots (red/yellow/green), the product logo, nav links, and a CTA — directly referencing a macOS window's title bar. This motif repeats in the hero's "app window" mockup, tying the marketing page visually to the product it's selling.

## 8. Spacing

- Section vertical padding: `120px` top/bottom (desktop)
- Content max-width: `1180px`, centered, `24px` horizontal gutter
- Card internal padding: `28–32px`
- Grid gaps: `20px` standard

## 9. Reusing this system elsewhere

To re-theme: change the 6 color tokens and the 3 font-family tokens in `:root`. Everything else (glass recipe, radii, spacing) is built on those variables and will follow automatically.
