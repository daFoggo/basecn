# basecn

## 1. Project Overview

This project serves as a comprehensive base template to help developers quickly bootstrap modern web applications. It focuses on providing a well-structured foundation, essential UI components (layouts, data tables, sidebars), and adherence to current best practices in web development.

**Tech Stack**

- Framework: Next.js (App Router), React
- Language: TypeScript
- Styling: Tailwind CSS v4, shadcn/ui
- State Management & Data Fetching: SWR
- Data Validation: Zod, @t3-oss/env-nextjs
- Table: Tanstack Table, diceui

**Key Features**

- Ready-to-use Layout & Navigation: Out-of-the-box support for Sidebars, Headers, Breadcrumbs, and hierarchical routing.
- Advanced Data Tables: Built-in support for filtering, sorting, and pagination.
- Strict Type-safe Environments: Build-time environment variable validation.
- Feature-based Architecture: Highly maintainable and scalable directory structure.

---

## 2. Installation Setup

This project uses **pnpm** as its package manager. Please ensure you have Node.js and pnpm installed on your system.

**Step 1: Clone the repository**

```bash
git clone https://github.com/daFoggo/basecn
cd basecn
```

**Step 2: Install dependencies**

```bash
pnpm install
```

```bash
pnpm approve-builds
```

**Step 3: Run the development server**

```bash
pnpm run dev
```

---

## 3. Project Configuration

### Environment Variables (.env)

The project is built with strict environment variable validation. The application will fail to start or build if required configuration variables are missing.

Start by copying the example environment file:

```bash
cp .env.example .env
```

Then, update the necessary configurations, including Database connection strings and API keys (Clerk, OpenAI, etc.).

### Global Configurations (`src/configs`)

All shared definitions and configurations are centralized in `src/configs`:

- `env.ts`: Defines and validates the schema for all environment variables (both Server and Client). If you add a new variable to `.env`, you must define its validation logic here.
- `site.ts`: Contains general site metadata (Site title, SEO keywords, author information).

---

## 4. Architecture and Code Conventions

The project implements a **Feature-based architecture** to group code by its domain or feature rather than its file type.

In traditional structures, all components are placed in `src/components`, `app/[route]/components` and APIs in `app/[route]/api`, making large projects difficult to navigate and maintain. The feature-based approach ensures that taking a feature out or deleting it is straightforward without affecting other parts of the system.

**Directory Structure of a Feature (`src/features/...`)**

Using the "Task" feature as an example (`src/features/task`), a typical feature directory looks like this:

- `index.ts`: The public API of the feature. External modules must only import from this `index.ts` file.
- `components/`: Feature-specific UI components. (Generic, reusable components belong in `src/components`).
- `api.ts`: Client-side data fetching logic (API client) calling the backend or BFF.
- `hooks.ts` (or `hooks/`): Custom React hooks, including SWR data-fetching hooks that wrap `api.ts` calls.
- `server.ts`: Server-side logic (e.g., BFF implementation, direct database queries). Intended exclusively for Next.js Server Components, API routes, or Server Actions. Never import this into Client Components.
- `types.ts`: TypeScript interfaces and types for the feature.
- `constants.ts`: Static constant definitions.
- `utils.ts`: Small utility and helper functions specific to the feature.

**Communication Principles:**

- Components outside the `task` directory should only import items explicitly exported via `src/features/task/index.ts`.
- Avoid cross-importing between features that do not share a logical dependency to prevent tight coupling.

## 5. Useful Resources

- **Landing blocks:** [Efferd](https://efferd.com)
- **Decorations:** [React Bits](https://reactbits.dev/)
- **Components:** [shadcn/ui](https://ui.shadcn.com/), [Dice UI](https://www.diceui.com), [ElevenLabs UI](https://ui.elevenlabs.io/), [AI SDK Elements](https://elements.ai-sdk.dev/)
- **Routing concept:** [Next.js App Router Layouts](https://app-router.vercel.app/layouts)
