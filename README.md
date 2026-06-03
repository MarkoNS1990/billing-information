# Billing Information

A React application for browsing Irish Oireachtas legislation. It fetches bill data from the [Oireachtas API](https://api.oireachtas.ie/) and presents it in a searchable, filterable table with detail views and local favourites.

## Features

- Paginated bills table with bill number, type, status, and sponsor
- Filter bills by type on the **All Bills** tab
- Favourite bills locally and view them on the **Favourites** tab
- Bill detail modal with English and Irish (Gaeilge) titles
- Responsive layout for smaller screens

## Tech stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) for development and production builds
- [Material UI (MUI)](https://mui.com/) for UI components
- [TanStack Query](https://tanstack.com/query) for API data fetching
- [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) for unit tests

## Prerequisites

- [Node.js](https://nodejs.org/) 20 or later
- npm (included with Node.js)

## Run locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The app runs at [http://localhost:5173](http://localhost:5173). Vite opens the browser automatically when possible.

Other useful commands:

```bash
npm run build      # Type-check and create a production build
npm run preview    # Serve the production build locally
npm run test       # Run unit tests once
npm run test:watch # Run unit tests in watch mode
```

## Linting and type checking

This project does not use ESLint or Prettier. Static analysis is handled by the **TypeScript compiler** in **strict mode** (`tsconfig.app.json`).

Enabled checks include:

- `strict` — full strict type checking
- `noUnusedLocals` / `noUnusedParameters` — unused code is reported
- `noFallthroughCasesInSwitch` — switch statements must be exhaustive

### How to run type checks

Type-check the project without building:

```bash
npx tsc -b
```

Type-checking also runs as part of the production build:

```bash
npm run build
```

If TypeScript reports errors, fix them before committing. Most editors with the TypeScript language service (including VS Code and Cursor) surface these issues inline as you edit.

## Project structure

```
src/
  api/           # Oireachtas API client and React Query hooks
  components/    # BillsTable, BillModal, and their tests
  pages/         # Page-level layout
  test/          # Shared test utilities and fixtures
```

## API

Bill data is loaded from:

```
https://api.oireachtas.ie/v1/legislation
```

No API key is required. A network connection is needed for the bills table to load data.
