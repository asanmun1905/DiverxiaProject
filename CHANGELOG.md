# SYSTEM STATE & CHANGELOG (For AI consumption)

## Project Overview
- **Name:** Diverxia Event Manager (Frontend Mockup)
- **Tech Stack:** Vanilla HTML5, CSS3 (No preprocessors), Vanilla JS (ES6). No backend or DB.
- **Goal:** Static presentation of an event management interface allowing dummy navigation, visual checks, and responsive layouts.
- **Theme:** Diverxia Consulting brand. Primary (`#31b7db`), Dark (`#252930`), Light (`#ebebeb`).

## Current Architecture & State
### 1. Global Navigation & Layout
- **Files:** `style.css` (Handles all styling globally), `script.js` (Handles all interactive features acting as a mocked backend controller).
- **Header:** Contains SVG Logo (`img/Recurso-1.svg`) mapped with `border-radius: 12px` and `background: white` safely. Contains a `.hamburger#hamburger-header` toggler.
- **Sidebar (`#sidebar`):** Slides from right (`right: -350px`). Mobile adapts to `100vw`. Contains its own closing hamburger (`#hamburger-sidebar`).
- **Footer:** Static copyright text.
- **Background (`.bg-geometry`):** 3D generic geometric floating shapes animated via CSS keyframes (`float`). Performance handled by scaling down on mobile.

### 2. Mock Authentication Engine (via `localStorage`)
- **Key:** `role`
- **Values Map:**
  - `'admin'` → Grants visibility to `.nav-admin`, `.nav-jueces`, `.nav-invitados`, `.nav-logout`.
  - `'juez'` → Grants visibility to `.nav-jueces`, `.nav-logout`.
  - `'invitado'` → Grants visibility to `.nav-invitados`, `.nav-logout`.
  - Null/Missing → Evaluated as `'guest'` (no restricted links shown).
- **Triggers:** Buttons with specific IDs (`#btn-admin-login`, `#btn-jueces-login`, `#btn-invitados-login`) assign the storage item on click.
- **Logout:** Elements mapped to `.nav-logout` flush the `localStorage` key.

### 3. Events List Engine (`eventos.html`)
- **Data Source:** Hardcoded `const events` JSON array in an inline `<script>`. Contains `title`, `category`, `start` (string YYYY-MM-DD), `end` (string YYYY-MM-DD).
- **Runtime Sorting:** 
  - Tracked via `currentSort` var (default: `'date-desc'`).
  - Buttons (`.filter-btn`) pass `data-sort` rules. Event listener handles re-render.
- **Runtime Parsing:**
  - Comparing `start` and `end` times against `const today = new Date()`.
  - Outputs `.past` (greyed out UI), `.active` (highlighted), or `.upcoming`.
- **UI Render Container:** `.events-list`.

### 4. Accessibility & Mobile Scaling Settings
- **Scaling classes:** Managed actively via `@media` limits `< 900px`, `< 640px`, and `< 380px`.
- **Drag/Swipe Controls:** Added global listeners (`touchstart`, `touchend`) mimicking 60px thresholds allowing the user to swipe the Sidebar to the right to trigger `closeSidebar()`.
- **Scroll Controls:** `overscroll-behavior-y: contain` & `-webkit-overflow-scrolling: touch` mapped to internal lists.
- **Favicon:** Loaded via `img/Favicon.png` in all head tags.

---

## Log History

### Update 001 - Project Init
- Bootstrapped static HTML files (`index`, `roles`, `admin`, `jueces`, `invitados`).
- Created visual 3d backgrounds and sidebar basics in `style.css`.
- Basic `script.js` initialized toggling dummy roles.

### Update 002 - UI Consistency & Sidebar Fix
- Re-architected Sidebar logic providing unique identifiers (`#hamburger-header`, `#hamburger-sidebar`) preventing duplicate tag query errors.
- Applied white-pill style backgrounds on dark mode over `img/Recurso-1.svg`.

### Update 003 - Event Controller Module
- Built `eventos.html` housing dynamic filtering (ASC/DESC by Name and Date).
- Re-routed `roles.html` buttons to aim to `eventos.html` directly instead of individual role pages per user request.

### Update 004 - Mobile Quality of Life
- Updated CSS breakpoints for grid alignment (flex row to column).
- Native-like UX additions:
  - Added `-webkit-overflow-scrolling: touch` to allow natural scroll momentum on iOS.
  - Implemented tactile horizontal sliding on the screen to dismiss the side navigation window in `script.js`.
- Applied global mapping to `img/Favicon.png`.
