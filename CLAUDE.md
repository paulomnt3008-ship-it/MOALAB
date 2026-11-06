# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Sales page for one star product (MOALAB Spray Nº1: a black bottle with white MOALAB lettering). Two independent projects:

- `frontend/`: React 19 + Vite, CSS Modules, React Router, Zustand.
- `backend/`: Node.js + Express (ES modules), Sequelize over the MySQL (MariaDB 10.4) that ships with XAMPP.

The user writes in Spanish; UI copy is Spanish.

## Commands

From the root:

- `npm run install:all`: install root, backend and frontend dependencies.
- `npm run seed`: create the `moalab` database if missing and upsert the sample products.
- `npm run dev`: backend (http://localhost:4000/api) and frontend (http://localhost:5173) together via `concurrently`.

Per project: `backend`: `npm run dev` (node --watch), `npm start`, `npm run seed`. `frontend`: `npm run dev`, `npm run build`, `npm run preview`.

There are no tests or linter configured yet. MySQL must be running in the XAMPP panel (user `root`, no password by default; see `backend/.env`).

## Architecture

### Backend (`backend/src`), strict layers

`routes/` → `controllers/` (only read the request and respond) → `services/` (business rules: totals, shipping, stock) → `models/` (Sequelize).

- `app.js` only assembles Express (cors, json, `optionalAuth`, `/api` router, `notFound`, `errorHandler`). `server.js` only connects the DB and listens.
- `config/database.js` creates the database if missing, then `sequelize.sync()`.
- Controllers are wrapped in `utils/asyncHandler`; throw `utils/httpError` helpers and `middlewares/errorHandler` turns them into `{ error: { message, details } }`. Success responses are `{ data }`.
- Validation is in `middlewares/validate.js` (validator functions that return a list of messages).
- `cartService.calculateCartSummary` always uses database prices, never client prices. Shipping rules are constants at the top of that file. `orderService.createOrder` runs in a transaction and decrements stock.
- Payments (`paymentService`) and auth (`middlewares/auth.js`) are placeholders.
- MariaDB returns JSON columns as strings; `Product.images` has a getter that parses them. Do the same for any new JSON column.

### Frontend (`frontend/src`)

- `pages/` only assemble components. Routes are declared in `App.jsx`; `layouts/MainLayout` wraps every page (Header + Outlet + Footer).
- Demo mode: the GitHub Pages build (`.github/workflows/deploy.yml`) sets `VITE_DEMO_MODE=true`, and `apiClient` then answers from `services/demoApi.js` + `services/demoData.js` (sample products, stock and orders in localStorage) instead of the backend. Keep `demoData.js` in sync with `backend/src/utils/seedProducts.js` and the cart rules. Production builds use `base: '/MOALAB/'`, so plain `<a href>` links go through `utils/withBase`; router `<Link>`s already handle it.
- `services/apiClient.js` is the only place that calls `fetch`. Components and pages never fetch; they go through `services/*` and the hooks in `hooks/` (`useProducts`, `useAsync`).
- `content/landingContent.js` holds all landing-page copy. The product's name, price and stock come from the backend (`backend/src/utils/seedProducts.js`).
- `utils/productImages.js` maps the image keys stored in the DB (`bottle-front`, …) to files in `assets/images/`. The current images are SVG drawings standing in for real product photos.
- `store/cartStore.js` and `store/userStore.js` are Zustand stores persisted to localStorage. The background colour choice lives in `userStore` and `hooks/useBackground` writes it to `<html data-background="…">`.
- Styling: `styles/variables.css` holds every token. The five backgrounds are `[data-background='beige'|'stone'|'sage'|'blush'|'mist']` rules that redefine `--color-bg`; the same attribute on any element (e.g. a swatch) shows that colour. Derived colours (`--color-surface`) use `color-mix` with `--color-bg`, so they follow the chosen background.
- Motion: scroll reveals use `hooks/useReveal` (sets `data-reveal` on a group; the CSS in `styles/utilities.css` staggers its direct children). Scroll-linked motion uses `hooks/useScrollProgress`, which writes `--progress` (0–1) on the element for its stylesheet to use. Everything respects `prefers-reduced-motion`.

## Rules set by the user (apply to all new work)

- Every component lives in its own folder with three files: `Name.jsx` (markup and view logic only), `Name.module.css` (styles only), `index.js` (named export). Pages and layouts follow the same pattern.
- No inline styles or `<style>` in `.jsx`, and no markup in CSS.
- Components use the tokens in `styles/variables.css` only: never hand-written colours or sizes. Add a token when one is missing.
- Naming: PascalCase for components and their folders/files; camelCase for functions and logic files (`cartService.js`, `formatPrice.js`, `useCart.js`).
- If something does not fit the existing folders, ask the user before creating a new folder.

## Git

`MOALAB/` is its own repository (remote `paulomnt3008-ship-it/MOALAB`). `.gitignore` keeps out `node_modules/`, `dist/` and `.env` files.

## Project-local tooling

`.claude/skills/` holds skills installed for this project (pinned in `skills-lock.json`): `design-taste-frontend` (art direction and a lint/inspect gate for pages), `web-design-guidelines` (UI review) and `playwright-cli` (browser automation). They are tooling, not project source.
