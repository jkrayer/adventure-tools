# Project Goldenrod - AI Agent Instructions

## Project Overview

This is a theater-of-the-mind Virtual Tabletop (VTT) application built as a monorepo with separate frontend and backend services. The project emphasizes modern tooling with React 19, TypeScript, and Express.

## Architecture & Structure

**Monorepo Setup**: Uses npm workspaces with root-level shared dependencies

- `backend/` - Express + TypeScript API server with Prisma ORM
- `frontend/` - React 19 + Vite SPA with React Compiler enabled
- `shared/` - Shared TypeScript package (`project_goldenrod-shared`) for validation, types, and utilities used by both backend and frontend
- Root `package.json` manages shared dependencies (`@reduxjs/toolkit`, `react-redux`, `react-router-dom`)

**Key Design Decisions**:

- React Compiler is enabled in Vite config for automatic optimization
- Strict TypeScript configuration with modern ESNext modules
- ESLint flat config format with React hooks and refresh plugins
- Backend uses ES modules (`"type": "module"`) with tsx for development

## Development Workflows

**Starting Development**:

```bash
# Backend with hot reload and .env support
cd backend && npm run start

# Frontend with Vite HMR
cd frontend && npm run dev
```

**Key Commands**:

- Backend: `npx tsx --env-file=.env --watch src/index.ts` (auto-restart on changes)
- Frontend: `tsc -b && vite build` (TypeScript compilation then Vite build)
- Linting: `npm run lint` (uses flat ESLint config in `frontend/`)
- Formatting: `npm run format` (Prettier)

## TypeScript Configuration Patterns

**Multi-Config Setup**: Frontend uses reference-based TypeScript configuration

- `tsconfig.json` - Root references file
- `tsconfig.app.json` - Application code (src/)
- `tsconfig.node.json` - Build tools (vite.config.ts)

**Strict Settings**: Both configs enable strict mode with additional linting rules:

- `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`
- `verbatimModuleSyntax`, `noUncheckedSideEffectImports`

## State Management & Routing

**Redux Toolkit**: Installed at root level, indicating planned centralized state management
**React Router**: v7.9.5 installed for client-side routing (not yet implemented in App.tsx)

## Code Style & Patterns

**React Patterns**:

- Uses React 19 with React Compiler for automatic memoization
- Functional components with hooks (see `App.tsx` example)
- Strict mode enabled in `main.tsx`

**Import Style**: ES modules throughout with explicit `.tsx` extensions
**Backend Pattern**: Express with TypeScript, basic REST structure in `index.ts`

## Critical Files for Understanding

- `package.json` (root) - Workspace configuration and shared dependencies
- `frontend/vite.config.ts` - React Compiler configuration
- `frontend/eslint.config.js` - Flat config with React-specific rules
- `backend/src/index.ts` - Express server entry point
- `frontend/tsconfig.app.json` - Main TypeScript configuration

## Development Notes

- Backend runs on port 3000 by default (configurable via PORT env var)
- Frontend development server typically runs on port 5173 (Vite default)
- React Compiler may impact build performance but provides automatic optimization
- No test setup currently configured (placeholder scripts in package.json files)

When working on this codebase, prioritize maintaining the existing TypeScript strictness, React Compiler compatibility, and the monorepo workspace structure.

## Shared Package

**Location**: `shared/` workspace (`project_goldenrod-shared`)

**Purpose**: Contains code shared between frontend and backend:

- Validation utilities (email, username, etc.)
- Shared TypeScript types and interfaces
- Common constants and utilities

**Usage**:

```typescript
import { validateEmail, type User } from "project_goldenrod-shared";
```

**Development**: After changes, run `npm run build` in `shared/` directory. Both backend and frontend depend on this package via workspace protocol.

## Backend Unit Tests

Unit test the backend Express server to ensure the API endpoints function correctly. Uses Jest with TypeScript ES modules support.

- **Test Framework**: Jest with ts-jest preset for ES modules
- **HTTP Simulation**: Supertest for testing Express routes
- **Database Mocking**: Jest's `unstable_mockModule` to mock Prisma client - no database hits during tests
- **Pattern**: Mock Prisma before importing controllers, use `mockFn<any>()` for flexible mocking
- **Setup**: `__tests__/setup.ts` runs before all tests; suppress console.error with `jest.spyOn(console, "error").mockImplementation()`
- **Key Files**: `backend/jest.config.js`, test files colocated with controllers (e.g., `get.test.ts`)
- **Commands**: `npm test` runs all tests, `npm run test:watch` for watch mode
