# Vequity — Exit Radar Learning Canvas

An English learning workspace grounded in the supplied Design Starter, PRD, and design references. Ten connected chapters cover the eight original product topics plus design direction and report data.

## Design direction and report data

Open `http://localhost:3000/` and choose **Design direction**. Chapters 9–10, **Design direction** and **Report & data**, are available in both Learn and Canvas, with source-linked cards and optional knowledge checks. Existing answers to the eight foundational checks are preserved.

Design direction covers the existing Paper foundation, the three requested presentation directions, and lessons from the Scout reference. Report & data embeds the supplied HTML as a visual preview, with adjacent tabs for the documented JSON structure and fictional example. It also explains missing fields and the documentation's implementation snapshot of 21 September 2026. The Paper file has not been inspected here.

`public/sources/client-updates/` bundles the unmodified HTML, Markdown, and supplied video; a readable rendering of the Markdown; its fictional Acme Payroll JSON sample; and an attributed transcript of the design requests. `lib/report-reference.json` contains the three code blocks extracted verbatim from the Markdown for the inline viewer. The VanZandt report and Acme Payroll sample are separate examples. The original eight chapters continue to describe the PRD contract, not verified API readiness.

The GitHub project lives in `vequity-learning-canvas/`. The existing export ZIP is a separate snapshot; rebuild it when a new downloadable package is needed.

## Run locally

Use Node.js 22.13 or newer and npm. `.nvmrc` selects Node.js 22 when using nvm. Run the commands from the folder containing `package.json`.

```sh
npm ci
npm run dev
```

No API keys, database, or environment variables are required to run the learning workspace.

Use the local URL printed by the server. **Learn** is the default on every screen: one question per chapter, readable explanations, a continuing ExampleCo story, and optional knowledge checks. Previous/Next controls and chapter navigation let readers follow the sequence or jump directly to a topic. Requirements and source references expand within each lesson.

**Canvas** is the connected overview. It supports drag-to-pan, wheel panning, Ctrl/Cmd + wheel zoom, chapter navigation, a minimap, and search. Each chapter has a “Read this chapter” control that returns to Learn without zooming.

The canvas measures chapter heights, leaves 420 canvas units between columns and 360 between rows, and routes its connectors through the gaps. Fit-all and the minimap use those same measured bounds. Small screens use chapter navigation and larger canvas controls instead of the miniature map.

## InterfaceKit review

InterfaceKit is a visual editor, not an agent skill or an automatic UI audit. In local development, its paintbrush launcher opens the editor. Select an element, adjust **Style**, **Typography**, or **Layout**, then use **Copy as prompt** to capture the requested changes. Editor adjustments are temporary until applied to the source code.

Canvas gestures and app shortcuts pause while the editor is active. The editor is excluded from production builds. It is mounted through `components/dev/interface-review.tsx`, shared by both app entry points.

The latest source review fixed rigid timeline heights, overview tiles responding to the viewport rather than their available width, clipped dialogs on short screens, small map controls, and hardcoded canvas connectors that could cross expanded chapter content. Browser interaction and screenshot verification are still pending because no browser connection was available in the review session.

## Review

Click a canvas card for its full explanation and links to the original PDF page. The wireframe explorer includes sparse, ExampleCo’s next month, dense, loading, being prepared, five-year fallback, quiet month, and retry scenarios. Both personas and the proposed Watch/Unwatch interaction can be explored. Notification previews link back to the matching report scenario. The continuing example moves from 12 deals on August 15 to 15 on September 15; the dense scenario is a separate illustration of the maximum layout.

The interactive learning scenarios use fictional company names, figures, dates, and quotes; their sample source buttons open a fictional-source preview. The supplied VanZandt HTML is labeled separately as a dated report artifact, while the Acme Payroll JSON is the documentation’s fictional example. No production data is fetched; no subscriptions are created; no emails are sent. Correct knowledge-check answers and acceptance-checklist progress are saved in browser storage only, with a temporary in-memory fallback when writes are blocked. Visiting a chapter does not count as passing its check.

The interface is predominantly grayscale: white cards, neutral gray surfaces, and 0.5–1px outlines using black at 10% opacity (8% for quiet dividers). Vibrant blue from [Vequity’s website](https://vequity.ai/) (#036AD3) anchors the intro card, window-rule strip, monthly-refresh strip, and chapter badges, with white text and icons. The rule’s default window uses a white number tile with blue text; its conditional fallback uses a darker blue tile with white text. Actions inside blue strips use white buttons with blue labels and arrows. Other explanatory cards remain neutral. Blue also marks primary actions, active controls, links, and small markers. Primary-button icons inherit the label color so they stay white on blue. Canvas keeps a neutral dotted background. Font weights remain capped at medium (500) across lessons, canvas cards, navigation, and dialogs. The supplied [Power Overview](https://futuristic-ui-exploration.vercel.app/power-overview/index.html), [Interactive Timeline](https://futuristic-ui-exploration.vercel.app/interactive-timeline/dist/index.html), and [Liquid Priority Stack](https://futuristic-ui-exploration.vercel.app/liquid-priority-stack/dist/index.html) inspired the metric tiles, selectable ExampleCo timeline, and expandable “What to remember” cards. These are learning interactions: they do not introduce new product requirements. Motion respects the reader’s reduced-motion preference.

Capability-overlap chips use blue with check marks, preserving the meaning of the green chips specified in the PRD. Requirements, design proposals, document context, and review observations are labeled separately. The EPD-2389 layout mock remains pending. The PDF's September 14, 2026 production snapshot is historical context, not live metrics.

## Validate

```sh
npm run typecheck
npm run lint
npm test
npm run build
npm run build:vercel
```

`build` preserves the Sites/Vinext scaffold. `build:vercel` creates a static Vite build of the same React application in `dist-web`; there are no backend dependencies. Type checking covers both entry points.

## Upload to GitHub

If using the prepared ZIP, extract it first. Upload the **contents** of `vequity-learning-canvas/` to the repository, with `package.json`, `README.md`, and `vercel.json` at the repository root. Do not upload the ZIP itself as the project.

Include the dotfiles and the `.openai/` folder: `.openai/hosting.json` is a non-secret configuration file used by the local development setup. Include `package-lock.json` for reproducible installs and `public/` for the social preview and both source PDFs. The `.gitignore` excludes dependencies, build outputs, caches, and local environment files.

Alternatively, create an empty GitHub repository and run these commands from the extracted project folder, replacing the example repository URL:

```sh
git init -b main
git add .
git commit -m "Add Vequity Exit Radar learning workspace"
git remote add origin https://github.com/YOUR-USERNAME/vequity-learning-canvas.git
git push -u origin main
```

## Vercel, after local review

Import the GitHub repository into Vercel. When `package.json` is at the repository root, leave **Root Directory** at its default. If you instead uploaded the whole original `canvas/` folder, set **Root Directory** to `canvas`.

The included `vercel.json` specifies these settings:

- Framework: Vite.
- Build command: `npm run build:vercel`.
- Output directory: `dist-web`.

Use `npm ci` if setting an explicit install command. No application environment variables are required. Vercel deployment environment variables provide the absolute social-preview origin; optionally set `SITE_ORIGIN` to a full URL for a custom domain. The source PDFs are included as learning resources.

When this repository is connected to Vercel, updates to its production branch can trigger a deployment. Check the deployment status to confirm which revision is live.

Official deployment reference: https://vercel.com/docs/frameworks/frontend/vite

## Source structure

- `app/page.tsx`: workspace, canvas controls, navigation, dialogs, and local learning progress.
- `lib/knowledge.ts`: source-linked requirements, glossary, and acceptance checklist.
- `lib/learning-path.ts`: ten lessons, continuing examples, and knowledge-check validation.
- `lib/client-updates.ts`: source-linked client direction, artifact observations, readiness notes, and the two update lessons.
- `components/learning/learning-path.tsx`: readable lessons, visual examples, quizzes, and inline reference details.
- `components/learning/exploration-widgets.tsx`: product overview, selectable report timeline, and expandable learning cards.
- `components/learning/chapter-content.tsx`: the ten visual chapters.
- `components/learning/client-updates.tsx`: design direction, artifact observations, readiness details, and reference video.
- `components/learning/report-artifact-viewer.tsx`: rendered HTML and keyboard-accessible JSON reference tabs, shared by Learn and Canvas.
- `components/learning/wireframes.tsx`: interactive scenarios and email previews.
- `components/dev/interface-review.tsx`: local InterfaceKit editor integration.
- `hooks/use-browser-storage.ts`: hydration-safe progress persistence with a temporary fallback.
- `lib/viewport.ts`: pure pan/zoom and fit calculations.
- `lib/canvas-layout.ts`: measured chapter layout, canvas bounds, and connector routing.
- `public/sources/`: unmodified copies of the supplied PDFs.

Known content clarifications are collected in chapter 8: missing acquisition-reason quotes, unclassified buyer cards, fallback re-evaluation on refresh, and a user-facing definition of “space.” These do not change the PRD's explicit statement that no blocking decisions remain.
