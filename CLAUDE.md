@AGENTS.md

# Design System Rules

## Stack

- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript 5
- **Styling:** Tailwind CSS 4 + CSS custom properties (design tokens)
- **Utilities:** `clsx` + `tailwind-merge` via `cn()` helper

## Project Structure

```
src/
├── app/                    # Next.js App Router (pages, layouts, routes)
│   ├── globals.css         # Tailwind import + token bridge
│   ├── layout.tsx          # Root layout (fonts, metadata)
│   └── page.tsx            # Home page
├── components/
│   ├── ui/                 # Primitive, reusable UI components (Button, Input, Card…)
│   │   └── index.ts        # Barrel export for all UI components
│   ├── layout/             # Layout components (Header, Footer, Sidebar…)
│   └── icons/              # SVG icon components
├── lib/                    # Shared utilities (cn.ts, formatters, constants)
├── styles/
│   └── tokens.css          # Design tokens — single source of truth
└── assets/
    └── images/             # Static image assets
public/                     # Public static files (favicons, OG images)
```

## Design Tokens

All design values live in `src/styles/tokens.css` as CSS custom properties.
They are bridged into Tailwind via `@theme inline` in `globals.css`.

| Category   | Token pattern              | Example                    |
|------------|----------------------------|----------------------------|
| Colors     | `--color-{name}`           | `--color-primary`          |
| Typography | `--text-{size}`, `--font-` | `--text-lg`, `--font-sans` |
| Spacing    | `--space-{n}`              | `--space-4` (16px)         |
| Radii      | `--radius-{size}`          | `--radius-md` (8px)        |
| Shadows    | `--shadow-{size}`          | `--shadow-md`              |
| Transitions| `--transition-{speed}`     | `--transition-fast`        |

**Rules:**
- Never hardcode colors, spacing, or radii — always use tokens.
- To add a new token, add it to `tokens.css` and map it in `globals.css` `@theme inline`.
- Dark mode is handled automatically via `prefers-color-scheme` overrides in `tokens.css`.

## Components

### Location & Naming
- Primitive UI → `src/components/ui/{name}.tsx` (lowercase filename)
- Layout shells → `src/components/layout/{name}.tsx`
- Feature-specific → co-located in the feature's route folder

### Patterns
- Use `forwardRef` for all primitive components.
- Accept `className` prop and merge with `cn()` from `src/lib/cn.ts`.
- Use variant/size props with mapped style records — no conditional class strings.
- Export from `src/components/ui/index.ts` barrel.

### Example usage
```tsx
import { Button, Card, CardHeader, CardTitle, CardContent } from "@/components/ui";

<Button variant="primary" size="md">Click me</Button>
<Button variant="outline" size="sm">Cancel</Button>
```

## Styling Rules

1. **Use Tailwind utility classes** as the primary styling approach.
2. **Reference tokens** in Tailwind via the mapped theme names: `bg-primary`, `text-foreground`, `border-border`, etc.
3. **Use `cn()`** (`src/lib/cn.ts`) to merge conditional classes — never concatenate strings.
4. **Responsive:** mobile-first with `sm:`, `md:`, `lg:` breakpoints.
5. **Dark mode:** handled by CSS token overrides, not Tailwind `dark:` prefix (unless needed for one-off adjustments).
6. **No inline styles** — use Tailwind or token-backed CSS variables.

## Icons

Place SVG icon components in `src/components/icons/`. Each icon should:
- Accept `className` and spread remaining props onto `<svg>`.
- Default to `currentColor` for fill/stroke.
- Use `w-5 h-5` as default size.

## Assets

- Static images → `src/assets/images/` (imported via Next.js `Image` component)
- Public assets (favicons, OG) → `public/`
- Use `next/image` for all rendered images.

## ⚠️ 소비자에 반영되게 하려면 `package.json` 의 `version` 을 반드시 올린다

이 레포는 npm 레지스트리가 아니라 `github:caratteam/carat-a2ui#main` 으로 소비된다
(소비자는 `carat-web-client-v2` 하나). 소비자 쪽 `package-lock.json` 의 커밋 해시만
갱신하고 여기 `version` 을 그대로 두면, **소비자 빌드가 옛 코드를 그대로 쓴다.**

webpack 은 `node_modules` 를 managed path 로 취급해서 파일 «내용»이 아니라 패키지
`version` 으로만 캐시 유효성을 판단한다. Vercel 은 빌드마다 이전 배포의 빌드 캐시를
복원하므로, `version` 이 그대로면 npm 이 새 코드를 정상적으로 설치했더라도 webpack 이
캐시에 있는 «옛 모듈»을 재사용한다. 새 브랜치의 첫 프리뷰는 캐시가 없어 정상으로
나오기 때문에, 프리뷰만 보고 머지하면 dev/prod 에서만 조용히 안 먹는다
(2026-08-31 실측: dev 배포가 4.77MB 아이콘 청크를 계속 내려줬다).

**규칙 — `src/` 를 바꾸는 PR 은 `package.json` 의 `version` 도 같이 올린다.**

## Figma Integration

When implementing a Figma design:
1. Map Figma color styles → `--color-*` tokens.
2. Map Figma text styles → `--text-*` + `--font-*` tokens.
3. Map Figma spacing → `--space-*` tokens.
4. Reuse existing `src/components/ui/*` components before creating new ones.
5. If a new primitive is needed, follow the component patterns above.
