# Autopilot Implementation Plan: 팀 협업용 Claude Code 기본 세팅

Source spec: `.omc/specs/deep-interview-team-claude-baseline-settings.md` (ambiguity 11.5%, PASSED)

## Scope
Small, well-specified configuration task (no application code). Executed directly rather than via multi-agent parallelization — the file set is small (5 files) and fully specified in the spec's acceptance criteria, so Ralph/Ultrawork parallel-executor overhead isn't warranted. QA phase is replaced with direct validation (JSON syntax check, script dry-run, git status check).

## Files to create
1. `.gitignore` — exclude local-only Claude Code overrides and OS cruft
2. `.claude/settings.json` — shared team settings: semi-auto permissions, default model, SESSION_START_SKILL env placeholder, SessionStart hook wiring
3. `.claude/hooks/session-start.py` — SessionStart hook: (a) compare local vs latest Claude Code CLI version (b) inject skill-load instruction (placeholder until a real skill exists)
4. `CLAUDE.md` — project purpose, model-usage policy by task type, permission/hook explanation, minimal designer workflow
5. `git init` — local repo initialization (no remote/push — user adds their own GitHub remote)

## Out of scope (per spec Non-Goals)
- shadcn/ui component library implementation
- Repo/lint/package-manager standardization
- Figma MCP connection

## Validation
- `python3 -m json.tool .claude/settings.json` succeeds
- `python3 .claude/hooks/session-start.py` runs without error and prints valid JSON with `hookSpecificOutput.additionalContext`
- `git status` shows a clean initialized repo
