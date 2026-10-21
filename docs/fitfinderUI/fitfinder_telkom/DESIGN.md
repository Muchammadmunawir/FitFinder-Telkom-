---
name: FitFinder Telkom
colors:
  surface: '#fbf9f9'
  surface-dim: '#dbdad9'
  surface-bright: '#fbf9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f3'
  surface-container: '#efeded'
  surface-container-high: '#e9e8e7'
  surface-container-highest: '#e3e2e2'
  on-surface: '#1b1c1c'
  on-surface-variant: '#444748'
  inverse-surface: '#303031'
  inverse-on-surface: '#f2f0f0'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c8c6c5'
  secondary: '#4d6700'
  on-secondary: '#ffffff'
  secondary-container: '#c8f169'
  on-secondary-container: '#526d00'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1c1b1a'
  on-tertiary-container: '#868382'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474746'
  secondary-fixed: '#c8f169'
  secondary-fixed-dim: '#add450'
  on-secondary-fixed: '#151f00'
  on-secondary-fixed-variant: '#394d00'
  tertiary-fixed: '#e6e2df'
  tertiary-fixed-dim: '#cac6c4'
  on-tertiary-fixed: '#1c1b1a'
  on-tertiary-fixed-variant: '#484645'
  background: '#fbf9f9'
  on-background: '#1b1c1c'
  surface-variant: '#e3e2e2'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 44px
    letterSpacing: -0.03em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '800'
    lineHeight: 34px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 30px
    letterSpacing: -0.02em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '700'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-numeric:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '700'
    lineHeight: 20px
    letterSpacing: -0.02em
  label-caps:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '800'
    lineHeight: 14px
    letterSpacing: 0.08em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  margin: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

The design system is an athletic, functional-minimalist framework tailored for the student and collegiate fitness ecosystem surrounding Telkom University in South Bandung (Sukapura, Sukabirus, Ciganitri, Buah Batu). It rejects generic tech tropes, decorative gradients, blur filters, and AI slop in favor of purposeful utility, structural legibility, and high-density editorial clarity.

### Personality & Demographics
- **Target Audience:** Telkom University students seeking budget-friendly, walkable, or motorbike-accessible gyms, paired with local gym owners needing unpretentious operational interfaces.
- **Tone & Mood:** Direct, disciplined, utilitarian, and honest. The experience mirrors physical sports apparel and editorial print manifests: high utility, zero fluff, explicit numbers, and immediate scannability.
- **Visual Aesthetic:** Editorial Minimalism meets athletic equipment utility. Flat planar surfaces layered on warm newsprint-like backings, defined by crisp divider lines, hairline borders, and targeted micro-bursts of high-visibility electric lime for performance validation (match scores, active subscriptions, live capacity counters).

## Colors

The palette is deliberately restrained, using high-contrast ink-on-paper foundations punctuated by an athletic electric lime reserved strictly for actionable or qualitative validation.

### Core Roles
- **Primary (`#171717`):** Deep ink charcoal. Used for primary interactive containers, bold primary typography, key actionable buttons, and dominant UI outlines.
- **Secondary / Accent (`#C8F169`):** Electric lime highlight. Applied with strict conservatism (less than 5% total screen real estate) exclusively for Match Scores, active toggle indicators, verified gym badges, and critical state confirmations.
- **Neutral / Secondary Text (`#737373`):** Neutral gray. Delivers secondary information, student location distances (e.g., "350m from Gate 2"), walking times, and metadata.
- **Surface Canvas (`#F7F7F2`):** Warm off-white, reminiscent of technical newsprint or archival editorial paper. Serves as the primary app canvas and backdrop.
- **Surface Elevation (`#FFFFFF`):** Pure white. Applied to interactive cards, input containers, bottom sheets, and sticky header modules to provide soft flat separation without shadows.
- **Border / Hairline (`#E5E5E0`):** Subtle neutral rule lines for cards, dividers, and table grids.
- **Semantic Error (`#D92D20`):** Pure signal red for capacity limits, pass expirations, and invalid form data.

### Contrast Discipline
Never tint backgrounds with primary or accent colors. Colored gradients are strictly prohibited. The electric lime accent must always sit against `#171717` ink or pure `#FFFFFF` borders with primary charcoal text to guarantee WCAG AAA legibility.

## Typography

The typographic scale uses **Plus Jakarta Sans** across all roles, relying on weight contrast, tight tracking, and tabular alignment to convey athletic discipline.

### Rules of Usage
- **Tabular Numerics:** All currency (`IDR / Rp`), distance metrics (`m`, `km`), match scores (`%`), and opening times must enable proportional/tabular figures (`tnum`) to maintain structural vertical alignment across data rows and gym discovery lists.
- **Editorial Eyebrows:** Category tags, section labels, and verification chips utilize `label-caps` in uppercase styling with deliberate positive tracking (`+0.08em`).
- **Hierarchy Stacking:** Pair heavy `headline-sm` titles with muted `body-sm` coordinates to prevent visual clutter in compact mobile card layouts.

## Layout & Spacing

The layout operates on a mobile-first 4-column structure (scaling to 8 columns on tablet/desktop companion dashboards for gym owners) with strict 4px/8px incremental rhythm.

### Grid & Margins
- **Canvas Margins:** Mobile viewport margins are locked at `1rem` (16px) to maximize usable touch surface area for rapid thumb scanning.
- **Gutters:** Gutter width is fixed at `1rem` (16px).
- **Component Padding:**
  - Micro components (badges, chips, tags): `space-xs` (4px) vertical, `space-sm` (8px) horizontal.
  - Standard inputs and buttons: `space-sm` (8px) to `space-md` (16px).
  - Cards and list items: `space-md` (16px) internal padding.

### Responsive Breakpoints
- **Compact (Mobile, 0–599dp):** 4 columns, single-column gym feeds, bottom-sheet operational modals, fixed bottom utility dock for primary interactions.
- **Medium (Tablet, 600–1023dp):** 8 columns, 2-column discovery grids, side-anchored drawer filters.
- **Expanded (Desktop/Admin, 1024dp+):** 12 columns, split-screen live telemetry for gym check-ins, fixed analytical tables.

## Elevation & Depth

Visual hierarchy is constructed exclusively through **tonal planar surfaces and crisp low-contrast outlines**. 

### No Faux Depth
- **Zero Blurs:** No frosted glass or background blur filters (`backdrop-filter`) are permitted anywhere in the system.
- **Zero Drop Shadows:** Elevation levels 0 to 2 utilize zero box-shadows. Depth is articulated purely by placing `#FFFFFF` surface containers against the `#F7F7F2` paper canvas, delineated by a 1px solid border (`#E5E5E0`).
- **Sticky / Overlay Boundaries:** Sticky app bars, navigation bars, and pinned bottom booking sheets apply a single, continuous 1px bottom or top rule (`#E5E5E0`) rather than drop shadows.
- **Active Lift (Exceptions):** Active drag states or modal dialogs may introduce a single flat hard-edge offset shadow: `2px 2px 0px #171717` to preserve physical tactile print styling without softness.

## Shapes

The design system enforces a restrained corner radius level (`roundedness: 2`) representing an 8px base radius, maintaining a geometric, compact profile that feels tactile and structured.

### Corner Radius Mapping
- **Base Components (`8px`):** Buttons, text fields, chips, match score pills, and filter buttons.
- **Compound Cards (`12px` / `rounded-lg`):** Gym listing cards, membership vouchers, pass cards, and preview frames.
- **Sheets & Modals (`16px` / `rounded-xl`):** Bottom sheets and action panels (top corners only).
- **Pill Exceptions (`9999px`):** Strictly restricted to counter badges and availability dots (e.g., live occupancy counters: "12/40 active").

## Components

All components are directly translatable to Flutter `StatelessWidget` and `StatefulWidget` primitives with precise declarative parameters.

### Buttons
- **Primary Action Button:** Solid `#171717` background with `#FFFFFF` text, 8px corner radius, height 48px, font weight 700. Pressed state: `#2A2A2A`.
- **Accent High-Priority Button:** Solid `#C8F169` background with `#171717` text. Used solely for definitive purchase or check-in verification triggers (e.g., "Confirm Student Pass").
- **Secondary / Ghost Button:** Transparent background, 1px solid border `#E5E5E0`, `#171717` text. On tap/hover: background shifts to `#FFFFFF`.

### Chips & Filter Pills
- **Unselected Filter:** Surface `#FFFFFF`, border 1px solid `#E5E5E0`, text `#737373`, height 32px, corner radius 8px.
- **Selected Filter:** Surface `#171717`, border 1px solid `#171717`, text `#FFFFFF`, font weight 600.
- **District Quick-Filter (Sukapura, Sukabirus, etc.):** Horizontal scrollable strip with 8px gaps.

### Gym Listing Cards
- **Structure:** Surface `#FFFFFF`, border 1px solid `#E5E5E0`, corner radius 12px, internal padding 16px.
- **Header:** Gym name in `headline-sm` with district tag (`Sukabirus • 250m from Gate 2`).
- **Match Score Badge:** Positioned top-right. Pill container with `#171717` background, text `#C8F169` displaying calculated fit percentage (`98% Match`).
- **Pricing:** Tabular text `IDR 15.000 / visit` or `IDR 150.000 / mo` in `label-numeric`.
- **Perk Indicators:** Compact row of mono-style micro-tags (e.g., `AC`, `Shower`, `Free Weights`, `Women-Only Hours`).

### Input Fields
- **Container:** Background `#FFFFFF`, 1px solid `#E5E5E0`, height 48px, corner radius 8px, padding horizontal 16px.
- **Typography:** Placeholder text in `#737373`, active input in `#171717` (`body-md`).
- **Focus State:** 1.5px solid border in `#171717`. No glow, no rings, no shadows.

### Lists & Tables
- **Divider:** Continuous 1px hairline `#E5E5E0`.
- **List Tile:** 56px minimum touch target, zero background tint, with icon/avatar on left, title and distance metadata in vertical stack, price or arrow chevron on right.

### Custom Component: Student Pass Token
- Dedicated mobile check-in component consisting of an inverted `#171717` card containing an athletic tabular countdown, Telkom Student ID verification badge, and an offline QR-code frame bordered in `#C8F169`.