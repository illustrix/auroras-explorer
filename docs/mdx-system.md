# MDX Documentation System

MDX docs live under `/catalog/docs/:slug`, sharing the catalog layout with a secondary sidebar.

## Tech stack

- `@mdx-js/rollup` — Vite plugin, compiles `.mdx` to React components
- `remark-gfm` — tables, task lists, strikethrough
- `remark-frontmatter` — YAML front matter support
- `rehype-slug` — auto `id` on headings
- `@tailwindcss/typography` — `prose` classes for rendered content
- `mermaid` — client-side diagram rendering

## Key files

| File | Role |
|------|------|
| `src/content/docs/registry.ts` | Doc registry — maps slug to i18n title/description keys |
| `src/content/docs/{lang}/{slug}.mdx` | Content files, one per language |
| `src/routes/catalog/route.tsx` | Secondary sidebar layout (materials nav + docs nav) |
| `src/routes/catalog/docs/$slug.tsx` | Dynamic MDX loader — `import.meta.glob`, `React.lazy()`, `MdxErrorBoundary` |
| `src/routes/catalog/docs/index.tsx` | `/catalog/docs/` — doc list page with cards |
| `src/components/mdx/mdx-layout.tsx` | `<article class="prose">` wrapper |
| `src/components/mdx/mermaid.tsx` | `<Mermaid chart={string} />` — renders Mermaid SVG client-side |
| `src/types/mdx.d.ts` | Ambient `*.mdx` module declaration for TypeScript |
| `public/locales/{en,zh}/translation.json` | UI strings under `docs.*` and `catalog.*` |

## Vite plugin order

In `vite.config.ts`, `@mdx-js/rollup` must be **before** `@vitejs/plugin-react-swc`:

```
tanstackRouter → mdx → react → tailwindcss → icons
```

## MDX loading mechanism

1. `$slug.tsx` calls `import.meta.glob<{ default: ComponentType }>('/src/content/docs/**/*.mdx')` — Vite statically analyzes this at build time and produces a map of file paths to lazy import functions.
2. `resolveDocModule(slug, lang)` looks up `/src/content/docs/${lang}/${slug}.mdx`, falls back to `en/${slug}.mdx`.
3. The matched loader is wrapped in `React.lazy()` for code-splitting.
4. `MdxErrorBoundary` (class component with `getDerivedStateFromError`) catches render-time errors from MDX content.
5. `<Suspense>` handles the loading state.

## i18n

- Each doc has one file per language directory: `en/{slug}.mdx` and `zh/{slug}.mdx`.
- Active language is read from `i18n.resolvedLanguage` via `react-i18next`.
- UI text (page titles, sidebar labels, descriptions) lives in `public/locales/{en,zh}/translation.json` under `docs.*`.

## Adding a new doc page

1. Create `src/content/docs/en/{slug}.mdx` and `zh/{slug}.mdx`
2. Add entry to `src/content/docs/registry.ts`:
   ```ts
   { slug: '{slug}', titleKey: 'docs.{key}.title', descriptionKey: 'docs.{key}.description' }
   ```
3. Add i18n keys to both `public/locales/en/translation.json` and `zh/translation.json`:
   ```json
   "docs": {
     "{key}": {
       "title": "...",
       "description": "..."
     }
   }
   ```
4. No route changes needed — `import.meta.glob` auto-discovers new `.mdx` files.
5. **Restart dev server** after adding new files (Vite glob is static).

## Using React components in MDX

MDX files can import from `@/` paths. Reusable MDX components go in `src/components/mdx/`.

```mdx
import { Mermaid } from '@/components/mdx/mermaid'

<Mermaid chart={`graph LR; A-->B`} />
```

### Available components

| Component | Props | Description |
|-----------|-------|-------------|
| `<Mermaid>` | `chart: string`, `className?: string` | Renders Mermaid diagram with dark theme via `mermaid.render()` |

## Catalog layout (secondary sidebar)

`src/routes/catalog/route.tsx` renders a `flex` layout:

- Left: `<aside>` (w-52) with two sections — "All Materials" link + docs nav from `docsRegistry`
- Right: `<Outlet />` for child routes (`/catalog/` material grid or `/catalog/docs/*`)

Active nav item is determined by matching `useMatches()` leaf route `fullPath` and `params.slug`.

## Known issues

- `import.meta.glob` is statically analyzed — **new `.mdx` files require dev server restart**.
- Mermaid's color parser does not support `oklch()` — use hex colors in `mermaid.initialize()` theme variables.
