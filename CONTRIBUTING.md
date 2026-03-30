# Contributing to Auroras Explorer

Thank you for your interest in contributing to Auroras Explorer! This guide will help you get started.

## Prerequisites

- [Bun](https://bun.sh/) (latest version)
- [Git](https://git-scm.com/)
- A PostgreSQL instance (for server-side features)

## Getting Started

1. Fork the repository and clone your fork:

   ```bash
   git clone https://github.com/<your-username>/prun-planner.git
   cd prun-planner
   ```

2. Install dependencies:

   ```bash
   bun install
   ```

## Project Structure

```
src/
├── components/   # Reusable UI components
├── hooks/        # Custom React hooks
├── i18n/         # Internationalization (Chinese & English)
├── lib/          # Shared utilities
├── routes/       # TanStack Router page routes
├── server/       # Hono API server
└── assets/       # Static assets
scripts/          # Database migrations and CLI tools
tests/            # Test suites
```

## Development Guidelines

### Tech Stack

- **Runtime**: Bun
- **Frontend**: React 18, TanStack Router, TanStack Query, Tailwind CSS 4, Shadcn UI
- **Backend**: Hono
- **Database**: PostgreSQL with Knex query builder
- **Linting/Formatting**: Biome

### Code Style

This project uses [Biome](https://biomejs.dev/) for linting and formatting. Run the formatter before committing:

```bash
bun run biome check --write . src
```

### Testing

Write tests alongside the code they cover. Run the test suite with:

```bash
bun run test
```

### Internationalization

The project supports Chinese and English. When adding user-facing strings, add translations to the locale files under `src/i18n/`.

### Commits

- Write clear, concise commit messages.
- Use conventional commit format when possible (e.g., `feat:`, `fix:`, `docs:`, `refactor:`).
- Keep commits focused — one logical change per commit.

## Submitting Changes

1. Create a feature branch from `main`:

   ```bash
   git checkout -b feat/your-feature
   ```

2. Make your changes and ensure:
   - The code compiles without errors (`bun run build`)
   - Tests pass (`bun run test`)
   - Linting passes (`bun run biome check .`)

3. Push your branch and open a Pull Request against `main`.
4. In your PR description, include:
   - A summary of the changes
   - Any relevant context or motivation
   - Screenshots for UI changes

## Reporting Issues

If you find a bug or have a feature request, please open an issue with:

- A clear title and description
- Steps to reproduce (for bugs)
- Expected vs actual behavior
- Screenshots if applicable

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.
