# Frontend Clean Code Guide

This project uses Next.js App Router, TypeScript, Tailwind CSS, and a feature-first structure. Use this guide as a checklist before adding or accepting AI-generated code.

## Folder Rules

Keep routing thin and business logic modular.

```txt
src/
  app/                    # Routes, layouts, metadata, loading/error UI
  components/             # Truly shared UI and layout components
  features/               # Product features and domain logic
  lib/                    # Shared utilities, env, API primitives
  config/                 # App-level config
  types/                  # Shared global types only
```

Preferred feature shape:

```txt
src/features/auth/
  api/                    # Auth API URLs and requests
  components/             # Auth-specific UI
  hooks/                  # Auth-specific hooks
  lib/                    # Auth-specific helpers
  types.ts                # Auth-specific types
```

## App Router Rules

- Keep `src/app/**/page.tsx` small.
- Pages should mostly import and render a feature component.
- Use route files for routing concerns only: `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`.
- Do not put large UI, fetch logic, auth parsing, or business rules directly in route files.

Good:

```tsx
import { HomePage } from "@/features/dashboard/components/home-page";

export default function Page() {
  return <HomePage />;
}
```

Avoid:

```tsx
export default function Page() {
  // 300 lines of UI, fetches, state, redirects, and helpers
}
```

## Server And Client Components

- Server Components are the default.
- Add `"use client"` only when the component needs browser behavior.
- Browser behavior includes `useState`, `useEffect`, event handlers, `localStorage`, `window`, `document`, and client redirects.
- Keep client components small and isolate them.

Example:

```txt
login-page.tsx            # Server component layout/composition
google-auth-button.tsx    # Client component for click/loading state
auth-hash-handler.tsx     # Client component for window.location/localStorage
```

## API Rules

- Do not scatter raw URLs across components.
- Put feature API helpers in `src/features/<feature>/api`.
- Put generic API primitives in `src/lib/api-client.ts`.
- Use `src/lib/env.ts` for environment variables.
- For OAuth redirect endpoints, prefer browser navigation with `<a href="...">` instead of `fetch()`.

Good:

```ts
// src/features/auth/api/google-auth.ts
import { env } from "@/lib/env";

export function getGoogleAuthStartUrl() {
  return `${env.apiBaseUrl}/api/v1/auth/google`;
}
```

## Auth Session Rules

- Keep auth parsing and storage out of UI components.
- Store auth helpers under `src/features/auth/lib`.
- Remove tokens from the URL after reading hash/query params.
- Do not log access tokens, refresh tokens, or provider tokens.
- Later, prefer secure cookie/session handling if the backend supports it.

Current frontend flow:

```txt
Google button -> backend /api/v1/auth/google -> Supabase -> frontend hash -> save session -> /home
```

## Component Rules

- One component should have one clear responsibility.
- Split only when it improves readability or isolates client behavior.
- Keep files around 250-300 lines when practical.
- If a component becomes hard to scan, split by visual sections or behavior.
- Shared components go in `src/components` only when reused by multiple features.
- Feature-specific components stay inside that feature.

## Styling Rules

- Use Tailwind classes for most styling.
- Keep design tokens in `src/app/globals.css`.
- Keep global CSS minimal: tokens, fonts, base styles, rare global effects.
- Avoid random one-off colors if a token exists.
- Use `cn()` from `src/lib/utils.ts` when combining conditional classes.

Good:

```tsx
className={cn(
  "rounded-sm border-2 px-6 py-4 transition-all",
  isActive && "border-secondary shadow-[6px_6px_0px_0px_#4c5e85]",
)}
```

## TypeScript Rules

- Avoid `any` unless there is no reasonable alternative.
- Put feature-specific types in `src/features/<feature>/types.ts`.
- Put truly shared API/global types in `src/types`.
- Type API responses explicitly.
- Keep parsing/validation close to the boundary where data enters the app.

## Vibe Coding Checklist

Before accepting generated code, check:

- Is the route file still thin?
- Did the code go into the correct feature folder?
- Did it introduce unnecessary `"use client"`?
- Are API URLs centralized?
- Are secrets or tokens being logged?
- Are types explicit enough?
- Is there duplicated UI or logic?
- Did it add a dependency that is actually needed?
- Does it pass `pnpm lint`, `pnpm typecheck`, and `pnpm build`?

## Dependency Rules

- Do not install libraries casually.
- Prefer small, well-known packages.
- Before adding a dependency, ask if the same thing can be done cleanly with existing tools.
- Good current dependencies: Next.js, React, Tailwind, clsx, tailwind-merge.

## Verification Commands

Run these from `frontend/` after meaningful changes:

```bash
pnpm lint
pnpm typecheck
pnpm build
```

## Practical Rule

If a future change feels messy, stop and ask:

```txt
Is this routing, UI, API, auth/session, shared utility, or feature logic?
```

Then put it in the matching folder. That one habit prevents most frontend mess.
