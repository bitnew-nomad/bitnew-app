# AI Copilot Instructions for bitnew-app

## Project Overview
**bitnew-app** is a Next.js 16 application that generates GDPR/App Store/Google Play-compliant privacy policies for indie app developers. The app uses a two-step form-to-preview pattern with a monetization layer (Ko-fi integration).

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, Shadcn UI, Radix UI

## Model
- **Preferred model:** GPT-5 mini — use for code generation and suggestions when available. Mention the model only when explicitly asked.
## Architecture & Key Patterns

### Component Structure
- **UI Components** (`components/ui/`): Shadcn-based components using CVA (Class Variance Authority) for variants
  - `button.tsx`: Uses Radix Slot pattern for flexible component composition
  - `card.tsx`: Container component with header/title/description/content slots
  - `input.tsx`, `label.tsx`, `textarea.tsx`: Form elements with consistent styling
- **Key Pattern**: All UI components use `cn()` utility (from `lib/utils.ts`) to merge Tailwind classes via `clsx` + `tailwind-merge`

### App Structure & Routing
- **Layout** (`app/layout.tsx`): Root layout with Geist fonts, metadata, CSS variables
- **Main Page** (`app/page.tsx`): Client component (`'use client'`) with step-based form state (1: Input → 2: Preview)
- **Success Page** (`app/success/page.tsx`): Thank-you page after Ko-fi payment
- **Styling**: Global CSS variables in `app/globals.css` (@theme inline blocks)

### Data Flow
1. Form input (step 1) → State updates via `setFormData` and `setPolicy`
2. Template generation: Simple string interpolation with user input → renders in textarea
3. Ko-fi link hardcoded in JSX (external payment handler)
4. No backend API calls or database (static template generation)

### Styling Conventions
- **Tailwind 4** with `@import "tailwindcss"` and custom animation library (`tw-animate-css`)
- CSS variables for theming (sidebar, chart colors, fonts)
- Shadcn "new-york" style, neutral base color, `@/` path aliases
- Dark mode support via `@custom-variant dark`

## Development Workflow

### Running the App
```bash
npm run dev        # Start dev server (localhost:3000 with hot reload)
npm run build      # Production build
npm start          # Run production build locally
npm run lint       # Run ESLint
```

### Key Commands
- Linting uses ESLint 9 with Next.js core-web-vitals + TypeScript configs
- No test suite currently configured

## Project-Specific Conventions

### Form Handling
- Use `useState` for form data and multi-step state management
- State shape: `formData` object + separate `policy` string + `step` counter
- **Pattern**: Validate before generation (`alert` for user feedback)

### Template Generation
- Privacy policy is plain-text with newlines and variable interpolation
- Uses `new Date().toLocaleDateString()` for timestamps
- Conditional rendering: `formData.url ? `...` : ''` for optional fields

### UI Composition
- Cards organize content into sections (Header → Title + Description, Content)
- Buttons use variants: "default" (primary), "ghost", "outline"
- Form groups use `Label` + `Input` pairs with `space-y-2` divs

### Aliases & Import Conventions
Use short path aliases defined in `components.json` and `tsconfig.json`:
- `@/components/ui/*` → Form/layout components
- `@/lib/utils` → `cn()` utility
- Root imports: `app/`, `lib/`, `components/`, `public/`

## Integration Points & External Dependencies

### External Services
- **Ko-fi**: Hardcoded payment link in homepage for $1 "Get Hosted URL" offering
  - Link: `https://ko-fi.com/s/d0afdef925`
  - Expected flow: User clicks → Ko-fi handles payment → redirects (no callback URL configured yet)

### Critical Dependencies
- `@radix-ui/*`: Unstyled primitives (Label, Slot)
- `class-variance-authority` (CVA): Type-safe variant generation for components
- `lucide-react`: Icon library (imported but not actively used in current pages)
- `tailwind-merge`: Prevents Tailwind class conflicts in component composition

## Common Tasks & Patterns

### Adding New Pages
1. Create `app/[route]/page.tsx` (Next.js App Router)
2. Use `'use client'` if state/interactivity needed
3. Import UI components from `@/components/ui/`
4. Wrap content in Card for consistency

### Creating New Components
1. Place in `components/ui/` if reusable
2. Use CVA for variants (see `button.tsx` example)
3. Export `cn()`-merged className
4. Include TypeScript props from native HTML elements

### Styling & Dark Mode
- Use inline `@theme` blocks in CSS for CSS variables
- Tailwind classes: use `dark:` prefix for dark mode
- Example: `"text-slate-900 dark:text-slate-50"`

## Known Limitations & Future Considerations
- No backend API (static generation only)
- Ko-fi integration lacks redirect callback handling
- No multi-language support or i18n
- Privacy policy template is hardcoded (not database-driven)
- No analytics or form submission logging
