# DishaStack

DishaStack is a free, project-first technology learning site. Learners can browse without an account. Their bookmarks, lesson progress, challenge results, project checklists, and reflection notes are stored in that browser only.

## Stack

- **Astro 7** renders the routes to static HTML at build time.
- **TypeScript** defines the curriculum and implements the small browser interactions.
- **Native browser APIs** provide form handling, filtering, clipboard access, and local storage. There is no React, Next.js, or client-side UI framework.
- **Plain CSS** provides the responsive visual system; there is no Tailwind dependency.
- **Astro/Vite** bundles only the scripts used on a page.
- **Sites static hosting** serves the generated `dist/` directory.

This fits the product because lesson text, path summaries, and project briefs are mostly stable content. Astro sends those pages as HTML and adds small scripts only to controls that need them. Accounts, cloud sync, payments, analytics, and server code are not part of this MVP.

## Directory map

```text
disha-stack/
├── .openai/
│   └── hosting.json          # Site project ID and static output directory
├── public/
│   └── favicon.svg           # Browser tab icon, copied without processing
├── src/
│   ├── components/           # Reusable Astro markup: cards, navigation, lessons
│   ├── data/
│   │   └── learning.ts       # Typed paths, topics, lessons, projects, and lookups
│   ├── layouts/
│   │   └── SiteLayout.astro  # Shared HTML document, metadata, header, and footer
│   ├── pages/                # File-based URLs; dynamic slugs are prebuilt
│   ├── scripts/              # Small browser-only TypeScript modules
│   │   ├── dashboard.ts      # Local progress dashboard rendering
│   │   ├── filters.ts        # Path and topic search and filters
│   │   ├── goal-finder.ts    # Goal-to-path recommendation form
│   │   ├── lesson.ts         # Quiz, hints, bookmarks, copy, completion
│   │   ├── practice.ts       # Challenge feedback and completion
│   │   ├── progress.ts       # Version-compatible localStorage helpers
│   │   ├── progress-ui.ts    # Progress bars and lesson status labels
│   │   └── project.ts        # Checklists and reflection notes
│   └── styles/
│       └── global.css        # Shared tokens, layout, responsive and component styles
├── astro.config.mjs          # Static output and trailing slash behavior
├── package.json              # Runtime and build commands
├── package-lock.json         # Reproducible npm dependency versions
└── tsconfig.json             # Strict TypeScript settings
```

### Routes

Astro maps files under `src/pages/` to URLs:

- `index.astro` → `/`
- `paths/index.astro` → `/paths/`
- `paths/[slug].astro` → one generated route per learning path
- `learn/[slug].astro` → one generated route per lesson
- `topics/index.astro` → `/topics/`
- `practice/index.astro` → `/practice/`
- `projects/index.astro` → `/projects/`
- `projects/[slug].astro` → one generated route per project
- `dashboard/index.astro` → `/dashboard/`
- `about/index.astro` → `/about/`
- `404.astro` → the not-found page

The bracketed `[slug]` files use `getStaticPaths()` to produce the concrete pages during `npm run build`.

### Content model

`src/data/learning.ts` is the source of truth. It exports typed `LearningPath` and `Lesson` data, topic and project arrays, status labels, and lookup helpers. The web path is fully authored; Python/data and AI are clearly labeled previews. Add content there before adding pages by hand—the route templates render the data consistently.

### Browser state

`src/scripts/progress.ts` owns the `dishastack-progress-v1` local storage record and preserves existing MVP progress when the shape grows. Other scripts call its helpers rather than writing progress separately. Data stays on the device and does not sync across browsers.

## Develop and build

Use Node.js 22.22 or newer and npm:

```sh
npm install
npm run dev
npm run check
npm run build
npm run preview
```

The production build is static HTML, CSS, and page-specific JavaScript under `dist/`. `.openai/hosting.json` points the Site publisher to that directory.
