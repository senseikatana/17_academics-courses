# Changelog

All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.7-14.7] - 2026-07-14

### Added
- **Final Academics Course Tracker stable release**.
- Alignment and validation of build configurations following final folder renames.
- Documented full repository changelog history under the `v1.0.7-14` release cycle.

---

## [1.0.7-14.6] - 2026-07-14

### Added
- **Multi-Course Folder Architecture**: Organized directory structures under `[platform]/[instructor]/[course]` (e.g. `udemy/juanpablo-ccj/astro/`).
- **Bun Migration**: Migrated all dependencies and lockfiles from `pnpm` back to `bun`.
- Dynamic Astro DB configuration mapping to a shared sqlite `local.db` in the workspace root.

---

## [1.0.7-14.5] - 2026-07-14

### Added
- **SEO & Social Open Graph Tags**: Integrated detailed metadata, canonical links, Facebook Open Graph (OG) tags, and Twitter Cards to `BaseLayout.astro`.

---

## [1.0.7-14.4] - 2026-07-14

### Fixed
- **SSR Hydration Fixes**: Prevented React 18/19 `getServerSnapshot` console warnings by maintaining stable selector references and implementing a client-side `hasHydrated` lock to resolve hydration mismatches.

---

## [1.0.7-14.3] - 2026-07-14

### Added
- **Zustand & LocalStorage State**: Unified client state with Zustand store coupled with `persist` middleware to survive Astro DB local dev server wipes.
- **Auto-Healing State Sync**: Background sync algorithm (`syncSectionProgress`) that detects discrepancies between client `localStorage` and server DB states to automatically re-populate/heal the database on restart.

---

## [1.0.7-14.2] - 2026-07-14

### Added
- **Global State Management**: Integrated Zustand store for course completed state and asynchronous database updates.

---

## [1.0.7-14.1] - 2026-07-14

### Added
- **Astro DB & Dynamic Queries**: Migrated from static Content Collections to full SSR dynamic queries to support real-time rendering of sections and lessons from Astro DB.
- **Dynamic Content Creator**: API endpoint (`/api/crear`) that writes markdown files to disk and instantly inserts sections/lessons into the database for real-time creation.
- **React Hydration**: Created React Island `SeccionProgressTracker.tsx` to handle progress checkboxes.

---

## [1.0.7-14] - 2026-07-14

### Added
- Initial commit of the course tracking structure and foundational project template.
