# Repository Guidelines

## Project Structure & Module Organization
- Source: `src/` (features, services, UI). Entrypoints like `src/index.*` or `src/main.*`.
- Tests: `tests/` mirrors `src/` (e.g., `src/foo/bar.ts` → `tests/foo/bar.test.ts`).
- Assets: `assets/` (images/fonts); static site files in `public/`.
- Scripts: `scripts/` for dev/CI helpers; docs in `docs/`.
Example paths: `src/components/`, `src/services/`, `tests/components/`, `assets/icons/`.

## Build, Test, and Development Commands
- Install deps: `npm ci` or `pip install -r requirements.txt` or `dotnet restore`.
- Run locally: `npm run dev` (hot reload) or `dotnet run`.
- Build: `npm run build` or `make build` or `dotnet build`.
- Test: `npm test` or `pytest -q` or `dotnet test`.
- Lint/format: `npm run lint && npm run format` (or language equivalents).
Prefer repo scripts/Make targets over global tools.

## Coding Style & Naming Conventions
- Indentation: 2 spaces (JS/TS), 4 spaces (Python/.NET). Max line length 100–120.
- Names: `camelCase` vars/functions, `PascalCase` classes/components, `kebab-case` filenames.
- Tests: `*.test.*` (JS/TS) or `test_*.py`. Keep modules small and cohesive.
- Tools: Prettier + ESLint (JS/TS) or Black + Ruff (Python). Use `.editorconfig`.

## Testing Guidelines
- Focus on fast, deterministic unit tests; mock network/FS.
- Coverage target ≥ 80%. Add new tests with new code and bug fixes.
- Run in watch mode during development: `npm test -- --watch` or `pytest -q -k <pattern>`.

## Commit & Pull Request Guidelines
- Commits: Conventional Commits (e.g., `feat(ui): add color picker`, `fix(core): guard null refs`).
- PRs: concise description, linked issues (`#123`), screenshots/GIFs for UI, updated docs/changelogs, passing CI, at least one reviewer.

## Security & Configuration
- Never commit secrets. Use `.env.local` or user secrets; provide `.env.example`.
- Pin and audit dependencies (`npm audit`, `pip-audit`) and update regularly.

