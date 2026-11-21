---
name: Blklight
description: Hub criativo e de aprendizado onde cada texto é um objeto impresso que o autor desenha.
colors:
  ink: "oklch(0.2645 0 0)"
  paper-white: "oklch(0.9761 0 0)"
  grey-wash: "oklch(0.937 0 0)"
  grey-medium: "oklch(79.837% 0 0)"
  grey-rule: "oklch(76.555% 0 0)"
  grey-muted-text: "oklch(52.153% 0 0)"
  sepia-page: "oklch(95.774% 0.03248 85.48)"
  sepia-medium: "oklch(92.557% 0.04465 80.23)"
  sepia-grey: "oklch(90.409% 0.00583 84.567)"
  ultravioleta: "oklch(56.344% 0.24855 282.35)"
  ultravioleta-light: "oklch(65.318% 0.19568 287.05)"
  sky: "oklch(71.539% 0.16143 243.05)"
  sky-deep: "oklch(64.587% 0.17095 247.28)"
  cyber-yellow: "oklch(96.038% 0.20105 108.44)"
  cyber-yellow-ink: "oklch(70.146% 0.15164 108.44)"
  signal-orange: "oklch(73.926% 0.1769 51.335)"
  hot-magenta: "oklch(73.752% 0.27514 327.93)"
  crimson: "oklch(60.147% 0.23101 24.347)"
typography:
  display:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "3rem"
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  title:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.1em"
  body:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  reading:
    fontFamily: "EB Garamond, ui-serif, Georgia, serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.5
  wordmark:
    fontFamily: "Inter, sans-serif"
    fontSize: "1rem"
    fontWeight: 700
    letterSpacing: "-0.025em"
  label:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.05em"
  pixel:
    fontFamily: "Geist Pixel Square, monospace"
    fontWeight: 400
rounded:
  none: "0px"
  xs: "0.125rem"
  base: "0.125rem"
  full: "9999px"
spacing:
  hairline: "1px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  chamfer-xs: "4px"
  chamfer-sm: "8px"
  chamfer: "16px"
  chamfer-lg: "24px"
  chamfer-xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper-white}"
    rounded: "{rounded.xs}"
    padding: "0 10px"
    height: "36px"
  button-outline:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xs}"
    padding: "0 10px"
    height: "36px"
  input:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xs}"
    padding: "4px 10px"
    height: "36px"
  type-tab-article:
    backgroundColor: "{colors.cyber-yellow}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
  type-tab-tutorial:
    backgroundColor: "{colors.signal-orange}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
  type-tab-project:
    backgroundColor: "{colors.hot-magenta}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
  navbar:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.ink}"
    height: "48px"
---

# Design System: Blklight

## Overview

**Creative North Star: "The Open Press"**

Blklight is a print shop with the doors open. Everything borrows from the physical world of print: paper with grain, ink rules, letterheads, signatures, stamps, cut corners, a modular grid you could lay out on a light table. The platform builds the press and sets the paper; the user is the one who designs what gets printed. That is why the chrome stays blunt and monochrome while documents, covers and cards carry the color, the typefaces and the variety.

The system sits between web standardization and web brutalism. It is loud where identity lives (type colors, varied card models, the pixel and mono type) and conventional where usability lives (navigation, forms, focus, labels). Layouts run full width on a 1px ink grid rather than in a centered column. Three themes share one structure: light (white paper, ink), dark (ink paper, white), and book (sepia paper).

**Key Characteristics:**
- Monospace by default; serif only for long reading; sans only for the wordmark.
- Ink-on-paper monochrome chrome; saturated color reserved for content type and user-chosen surfaces.
- Near-square corners everywhere; chamfered (cut) corners as the signature silhouette.
- Analog texture (noise grain, paper tones) layered over a digital grid.
- Variety with stability: every card model differs, but the same item always renders the same way.

## Colors

Ink-and-paper neutrals carry the interface; a small set of saturated print inks marks content type and identity.

### Primary
- **Ultravioleta** (`ultravioleta`): the Blklight brand ink. Brand moments, the publisher app accent, selected states that need a brand voice. Lighter step (`ultravioleta-light`) for text on ink surfaces.

### Secondary
- **Sky Blue** (`sky`): links in prose (`sky-deep` on light paper), inline code, note documents, secondary brand accent.

### Tertiary (content-type inks)
- **Cyber Yellow** (`cyber-yellow`): articles. Solid fills only with ink text on top; as text on light paper use the darker `cyber-yellow-ink` step.
- **Signal Orange** (`signal-orange`): tutorials.
- **Hot Magenta** (`hot-magenta`): projects.
- **Crimson** (`crimson`): contracts and destructive actions.

### Neutral
- **Ink** (`ink`): text, primary buttons, rules and borders that carry structure; the page background in dark theme.
- **Paper White** (`paper-white`): page and card background in light theme; text in dark theme.
- **Grey Wash** (`grey-wash`): muted and secondary surfaces.
- **Grey Rule** (`grey-rule`): default borders and inputs in light theme.
- **Grey Muted Text** (`grey-muted-text`): secondary text.
- **Sepia Page / Sepia Medium / Sepia Grey**: the book theme's paper, muted surfaces and accents.

Each brand ink has a full 50–950 scale in `src/app/globals.css` (`--color-blklight-*`, `--color-bluesky-*`, `--color-cyber-yellow-*`, `--color-orange-*`, `--color-magenta-*`, `--color-crimson-*`). Semantic tokens (`--background`, `--foreground`, `--muted`, `--border`, …) are redefined per theme under `:root`, `.dark` and `.book`.

### Named Rules
**The Type Ink Rule.** Article is yellow, tutorial is orange, project is magenta. In the feed the type ink is a filter state, not decoration: the filter buttons always show it as a legend, and card tabs wear it only while the feed is filtered to that type. Unfiltered, the tab is neutral ink or paper with the type's name and symbol, and card bodies may use any surface, yellow, orange and magenta included.

**The Ink-On-Ink Rule.** Saturated solids (yellow, orange, magenta, sky, ultravioleta) take ink text, never white. Yellow as text on light paper uses the 700 step.

**The Chrome Stays Monochrome Rule.** Navigation, forms, menus and dialogs use only the neutral semantic tokens. Color enters through content.

## Typography

**Display Font:** JetBrains Mono (with monospace)
**Body Font:** JetBrains Mono (with monospace)
**Reading Font:** EB Garamond (with ui-serif, Georgia)
**Wordmark Font:** Inter (with sans-serif)
**Accent Font:** Geist Pixel Square / Geist Pixel Circle

**Character:** A typewriter-and-terminal voice for the whole interface, softened by a book serif wherever someone reads at length. The pixel face is a stamp, used sparingly for big numerals and display moments.

### Hierarchy
- **Display** (700, 3rem at md, 2.25rem mobile, line-height 0.95, uppercase, tight tracking): page titles and section openers.
- **Headline** (700, 1.5rem, tight tracking): card titles and panel headings.
- **Title** (600, 0.875rem, uppercase, widest tracking): section labels and small headings.
- **Body** (400, 0.875rem, 1.5): interface text.
- **Reading** (400, EB Garamond): document bodies and the editor. Paragraphs indent 2rem and stack without gaps, like a printed page.
- **Label** (500, 0.75rem, uppercase, wide tracking): metadata, tabs, chips, buttons.

Documents may override all of this: the author picks the document's font, paper and colors in "Editar design".

### Named Rules
**The Mono Default Rule.** If no role is specified, text is monospace. Serif is for reading, sans is for the wordmark.

**The Uppercase Is Small Rule.** Uppercase with wide tracking is for short labels and display titles, never for sentences or body copy.

## Layout

Full-width pages on a modular grid, not a centered max-width column. The feed is a deterministic bento grid (`src/components/bento/`) whose cells vary in size and model. Sections are separated by 1px ink rules (`border-foreground`) rather than whitespace alone. The navbar is a 48px sticky bar with an ink bottom rule and paper texture. The published article uses a named-column article grid that collapses at 1024px and 768px. Spacing follows the Tailwind 4px scale; dense UI uses 8–16px gaps, page sections 24px and up.

## Elevation & Depth

Flat by default. Structure comes from ink borders, 1px rules and paper tone changes, not from shadows. Two depth moves exist. On hover, rectangular interactive elements may lift with the stepped "shadow pop": eight stacked 1px hard shadows in the current color plus an 8px translate, like a block lifted off the page. Feed cards use it only on square models (`data-hover="pop"`): on chamfered and pill silhouettes the extrusion pixelates. Floating layers (popovers, dropdowns, dialogs, command menu) may use a soft blurred shadow plus a faint ink ring so they read as above the page.

### Shadow Vocabulary
- **Shadow pop** (`.shadow-pop-bl/br/tl/tr`: eight stacked 1px hard shadows in `currentColor` plus an 8px translate, 0.3s): hover lift for rectangular interactive elements only.
- **Overlay ring** (`ring-1 ring-foreground/10` with `shadow-md`/`shadow-lg`): popovers, menus, dialogs.

### Named Rules
**The Flat-At-Rest Rule.** Nothing on the page casts a shadow at rest. Hard shadows answer hover; soft shadows belong only to layers floating above the page.

## Shapes

Near-square everywhere: the base radius is 2px (`--radius: 0.125rem`), and most chrome uses `rounded-xs` or none. The signature silhouette is the chamfer, a clipped 45° corner (`chamfer` utility, 4–32px, any combination of corners). Full rounding is reserved for avatars-as-dots and pills in specific card models. Hard ink borders (1px, sometimes 2px) outline structure; `.background-frame` uses an 8px ink frame.

### Named Rules
**The Varied Silhouette Rule.** Card models each wear their own shape (chamfered, rounded, square). Never give every card the same corner treatment; variety among models is the point, stability for a given item is required.

## Components

**Varied by design.** Buttons, inputs and menus are consistent and conventional; cards and content surfaces are deliberately different from each other.

### Buttons
- **Shape:** near-square (2px).
- **Primary:** ink fill with paper text, 36px tall, 10px horizontal padding, medium weight.
- **Outline / Ghost / Secondary:** paper or transparent with a rule border; hover fills with the muted surface.
- **Focus:** visible ring in `--ring` at 50% (3px); pressed state nudges down 1px.

### Chips and Type Tabs
- **Type tab:** a square tab flush with a top corner: type symbol (article Newspaper, tutorial BookOpen, project Hammer) plus uppercase label. Unfiltered it is neutral, ink on light bodies and paper on dark bodies; when the feed is filtered to a type it takes that type's solid ink with an inset ink ring, so it never merges with a same-colored body.
- **Badge:** small label (20px tall), neutral fills.

### Cards / Containers
- **Corner Style:** per model: chamfer, 2px, or square.
- **Background:** one of nine surfaces (ultravioleta, sky, yellow, orange, magenta, …) as solid or pale wash, independent of the content type.
- **Hover vocabulary:** several effects on purpose, not one shared signal. Each model has its own flourish (zoom, duotone fade, dither, tilt, title underline) and may add a shared one via `data-hover`: `pop` (the original `shadow-pop-bl` keyframes: 8 stacked 1px shadows and an 8px lift, square cards only) and `misreg` (the title's ink plates slip off register in cyan and magenta). The static bento cell owns `:hover`, so a moving card never flickers. New effects join this vocabulary rather than replacing it. The Texto dither is drawn in the surface's solid step (full in light, 30% in dark), so ink text over a dot keeps the solid's contrast.
- **Border:** 1px ink or none, per model.
- **Focus:** a 3px foreground outline 4px outside the card's cell, so chamfered and pill silhouettes never clip it.
- **Themes:** in dark, the ink Manchete gets a 2px foreground border; in book, sepia surfaces step to sepia-medium and pale washes multiply into the page.
- **Models:** Cover, Media, Selo, Paper, Texto, Manchete, chosen from the item's id; images may take an SVG duotone in the surface ink. The Ficha (library catalog card) was removed on 2026-11-18 for clashing with the rest; models for documents without a cover are still open.
- **Type tab shape:** 2px radius on every corner (`rounded-xs`, the global default), flush or inset.
- **Type tab placement:** no single fixed spot. Each model ships a default: flush on square cards (Texto, Selo); inset on curved and chamfered ones, on the same 24px margin as the content so tab and title share one left edge. A per-document choice of position is planned.

### Inputs / Fields
- **Style:** 1px rule border, transparent background, 36px tall, near-square.
- **Focus:** border shifts to `--ring` with a 3px ring at 50%.
- **Error:** crimson border and 20% crimson ring.

### Navigation
- **Navbar:** 48px sticky, paper with noise texture, ink bottom rule. Three columns: brand + navigation dropdown (`LayoutGrid`, lists Feed and Escrever, shows the current section) | command bar, centered, max 36rem | theme toggle + account menu.
- **Command bar** (`CommandBar`, `src/components/command-menu.tsx`): looks like a browser address bar (`blklight.dev/current/path`); focus or ⌘K turns it into search with the results panel attached below (same groups as before: texts, go to, explore, appearance). Only exists where the navbar does, so the landing page has none.
- **Account menu** (`ProfileMenu`, `src/components/profile-menu.tsx`): the avatar card grows into the panel (shared layout); theme segmented control (light, dark, book, system), shortcuts, and sign out that needs a 1.2s hold.

### App fichas (Tally style)
- **Shape:** double fillet frame (`FichaFace` in `src/components/onboarding/simple-flip-card.tsx`): app paper stock with `background-texture`, 3px inner border that turns ink when selected, chamfer always bottom-right (`br`; the back face mirrors to `bl`).
- **Onboarding:** flip card, 384px tall. Front opens the back with a `ChamferButton` (`src/components/ui/chamfer-button.tsx`, copied from Tally). The back has "Voltar" and a scrollable body inside the corner brackets, faded at the edges with `ScrollFade` from `@animate-ui/react`. Hover tilts the card up to 8° (`Tilt` from `@animate-ui/react`, flat under reduced motion).
- **Dashboard:** `AppTile`, two per row in an 18rem side column.
- **Tile** (`AppTile`, `src/components/onboarding/app-tile.tsx`): the cover at square tile size (label and mark on top, name and description in the brackets), with tilt. Used on the onboarding confirmation and in the dashboard, which no longer has its own markup.
- **Em breve:** an app with no screens yet is always hatched and washed out (`LockedVeil`), with a tilted "Em breve" stamp where the checkbox would be. It still flips to explain itself, but it can't be selected (`aria-disabled`).

### Onboarding
- **One object across the flow:** the member badge (`Badge model="classic"`, `src/components/badge/`): a rounded plastic card with an ink rim and lanyard slot (not chamfered: badges aren't), paper texture and tilt. Front: centered photo (`avatarUrl` or initials until upload exists), name, @handle, Blklight logo at the base. Back (click to flip): profile URL, status, the apps. Step 1 shows it being built (handle updates live, empty app slots); the last step shows it with the chosen apps, and the "Confirmado" stamp lands on the front when setup finishes.
- **Badge models:** `src/components/badge/index.tsx` maps model names to components that all take the same `BadgeData` (name, handle, avatar, member since, id, apps) and an optional `status` (`draft` in onboarding, `confirmed` right after it, none for someone else's badge). Models today: `classic` and `holo` (dark card, rainbow foil and glare following the pointer via `--mx`/`--my`; compare them at `/lab/cracha`). New looks are new entries in `BADGE_MODELS`, so profile and user search can render any member with any model.
- **Badge stage:** on the first and last steps the badge sits on the Grainient panel (`BadgeStage`), always in a 25rem column on the right (`BADGE_LAYOUT`).
- **Step anatomy:** title + lede, content, then `StepFooter` (`src/components/onboarding/step-footer.tsx`), the same fixed bar on every step.
- **Steps animate** 16px in the direction of travel with a fade (`AnimatePresence` in `src/app/onboarding/page.tsx`); reduced motion keeps only the fade. Finished steps on the progress bar are buttons back to them, until setup starts: then navigation locks.
- **Tilt + flip:** pass `style={FLAT}` (exported from `simple-flip-card.tsx`) to `Tilt` whenever its content flips; its default `preserve-3d` breaks hit-testing in Firefox.
- **Setup feedback:** confirming runs the real calls as rows (`SetupProgress`): pending, spinner, check; a failure marks its row and retries from there.

### Fixed patterns (the exceptions to "no patterns")
The cards, covers and layouts vary; these never do:
- **Primary action:** one per screen, dark `ChamferButton` (`bg-foreground`, chamfer `br`) with an arrow, mono uppercase label. `Enter` triggers it when focus isn't on a control.
- **Back:** ghost button labelled "Voltar", left of the primary action.
- **App cards:** `FichaFace` + tilt wherever an app appears (onboarding, confirmation, dashboard), chamfer `br`.
- **Not available yet:** hatch + "Em breve" stamp, never only a muted color.
- **Status after an action:** short text in an `aria-live` region next to the action, not a toast.

### Dev showcase
`/componentes` lists every component with a live demo (`src/components/showcase/`, port of the tpl-ui showcase). The page is `page.dev.tsx`, which `pageExtensions` in `next.config.ts` only picks up outside production. Add a demo to `demos/blklight.tsx` when a project component is created.

### Page transitions (installed, not wired)
- `src/components/animate-ui/components/page-transition.tsx` (Animate UI, via shadcn) is installed but not imported anywhere. It runs on the browser View Transitions API through `motion/react-animate-view`; to try it, wrap `{children}` in `src/app/layout.tsx` with `<PageTransition effect="fade">`, keeping the navbar outside, and mark back links with `transitionTypes={['nav-back']}`.
- Alternative: React's `<ViewTransition>` directly, which the App Router supports with no config (`node_modules/next/dist/docs/01-app/02-guides/view-transitions.md`). Better for shared-element morphs such as a feed card cover into the document cover.
- Check both under `cacheComponents: true` and reduced motion before choosing.

### Document Paper (signature)
The editor and published document render as a sheet of paper: author-chosen font, paper color, texture and grain overlay, letterhead (`{{tipo}} de {{publicador}}`), cover, and an always-present digital signature block.

## Do's and Don'ts

### Do:
- **Do** default to monospace and switch to EB Garamond only for long reading.
- **Do** identify content type by name and symbol first; light up the type ink (article yellow, tutorial orange, project magenta) only when the feed is filtered to that type.
- **Do** put full-strength ink text on saturated solids (no alpha), and use the 700 yellow step for yellow text on light paper.
- **Do** run pages full width on 1px ink rules.
- **Do** vary card models and shapes, deterministically by item id.
- **Do** keep every surface correct in light, dark and book themes.
- **Do** keep focus visible on every interactive element (outline or ring).

### Don't:
- **Don't** fade text with alpha on saturated surfaces; `text-dark/70` on mid-tone solids fails AA. Secondary text on pale washes uses `text-foreground/75` at minimum.
- **Don't** give every card the same corner or chamfer; the user rejected uniform chamfers as "too standardized".
- **Don't** cast shadows on resting surfaces or use soft shadows on in-page cards.
- **Don't** put white text on yellow, orange, magenta or sky solids.
- **Don't** color the chrome (navbar, forms, menus) with brand or type inks.
- **Don't** center pages in a narrow max-width column outside of reading text.
- **Don't** go below 12px for text that people must read; 8–10px uppercase labels are a known debt, not a pattern to repeat.
