# Rounded Navbar Implementation Plan

> **For agentic workers:** Execute inline using executing-plans. User approved the HTML preview and requested application.

**Goal:** Match navbar corners to existing soft panels.
**Architecture:** Change only the shared `.header` CSS and its mobile override.
**Tech Stack:** Existing CSS, Next.js, TypeScript.
**Spec:** `docs/design/2026-10-25-navbar-rounded-preview.html` (approved).

## Global Constraints
- Desktop: border-radius 30px; padding-inline 24px.
- Mobile (max-width 760px): border-radius 25px; padding-inline 20px.
- Retain existing palette, shadows, sticky behavior and responsive rules.
- AGENTS.md forbids adding tests without approval; run standard checks instead.

## Review Focus
- Compare all four CSS values against the approved preview.
- Ensure later media rules retain the mobile horizontal padding and radius.

## Task 1: Apply approved navbar styling
- [x] Modify `src/app/globals.css` with the four approved declarations.
- [x] Run `npx tsc --noEmit`, `npm run lint`, and `npm run build`; inspect exit codes and output.
- [x] Review diff for unrelated changes.

Execution ruling: Apply in the current workspace as requested; do not create a worktree, add tests, or commit changes as additional workflow.

Verification: TypeScript, ESLint, production build and git diff --check all exited 0. Diff contains only four approved CSS declarations. No browser visual check performed.

