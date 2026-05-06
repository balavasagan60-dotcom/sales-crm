# Design Brief

## Direction

Sales CRM dashboard — Dark editorial, information-dense B2B sales platform with professional enterprise aesthetic and role-based dashboards.

## Tone

Minimalist brutalist restraint: no decoration, pure functional clarity with strong visual hierarchy. Professional enterprise SaaS inspired by Linear and Vercel.

## Differentiation

Dense card-based layouts with micro-interactions for call workflows, lead status transitions, and pipeline visualization. Every surface intentional, every pixel earns space.

## Color Palette

| Token              | OKLCH            | Role                                           |
| ------------------ | ---------------- | ---------------------------------------------- |
| background         | 0.145 0.014 260  | Dark charcoal base, minimal visual load        |
| foreground         | 0.95 0.01 260    | Clean white text for primary readability       |
| card               | 0.18 0.014 260   | Subtle lifted surfaces, section boundaries     |
| primary            | 0.68 0.18 250    | Cyan-teal for CTAs, active states, headers     |
| accent             | 0.72 0.17 70     | Warm amber for alerts, status, warnings        |
| muted              | 0.22 0.02 260    | Neutral gray for secondary content, borders    |
| destructive        | 0.55 0.22 25     | Red for closed/lost leads, destructive actions |

## Typography

- Display: Space Grotesk — headers, labels, metric titles; bold, tight tracking, 1.1–1.2 line height
- Body: DM Sans — paragraphs, UI labels, table text; regular weight, 1.5 line height
- Mono: JetBrains Mono — phone numbers, IDs, codes; monospace utility for data density
- Scale: Hero `text-5xl font-bold tracking-tight`, H2 `text-3xl font-bold tracking-tight`, H3 `text-lg font-semibold`, Body `text-sm md:text-base`

## Elevation & Depth

Subtle shadow hierarchy: card backgrounds 1–2 steps lighter than base, minimal shadow-sm/md for interactive depth, no glow effects. Borders define zones better than shadows.

## Structural Zones

| Zone         | Background           | Border                  | Notes                                                   |
| ------------ | -------------------- | ----------------------- | ------------------------------------------------------- |
| Header/Nav   | 0.145 0.014 260      | bottom muted border     | Persistent top bar with logo, user menu, quick actions |
| Sidebar      | 0.18 0.014 260       | right muted border      | Role-specific nav, condensable on mobile               |
| Main Content | 0.145 0.014 260      | —                       | Base background, card-grid layout                      |
| Card         | 0.18 0.014 260       | subtle muted border     | Metric cards, forms, lists with alternating sections   |
| Footer       | 0.18 0.014 260       | top muted border        | Spacious padding, secondary actions, legal links       |

## Spacing & Rhythm

Section gaps 2rem–4rem, card internal padding 1.25–1.5rem, micro-spacing 0.5–0.75rem for button/input grouping. Dense grids on dashboard, spacious forms and detail views.

## Component Patterns

- Buttons: Pill-shaped `rounded-full`, primary cyan for CTAs, secondary muted for secondary actions, hover scales slightly
- Cards: `rounded-lg`, 0.18 background, muted border, hover lifts with shadow-md-elevated
- Badges: Inline `rounded-full`, semantic colors (green success, amber accent, red destructive), always uppercase 10px font
- Inputs: `rounded-md`, 0.28 background, focus ring cyan primary, placeholder muted-foreground
- Status Indicators: Circular dot with text label; colors: green (active/interested), amber (pending), red (closed/lost)

## Motion

- Entrance: fade-in 0.3s ease-out for modals, slide-down 0.3s ease-out for notifications
- Hover: Button scale(1.02) 0.2s ease-out, card shadow lift 0.2s ease-out
- Decorative: None — motion strictly functional for state transitions

## Constraints

- No full-page gradients, no blur effects, no neon glows
- Cyan primary and amber accent only; no rainbow palettes
- Every card must have explicit background/border treatment, never ghost text on flat base
- Mobile-first responsive: stack vertically until md breakpoint, then grid
- Accessibility: WCAG AA+ contrast in all modes, semantic HTML, no color-only status indicators

## Signature Detail

Call workflow branching UI with visual flow: step-by-step status transitions with connected nodes and conditional field visibility. Product category selection (Agri/Civil/Industrial) with subsidy/sale branching logic visualized as expanding tree. This micro-interaction becomes the CRM's distinctive signature — role-specific call capture experience.
