#!/usr/bin/env python3
import json
import os
import re
import subprocess


def get_local_version():
    try:
        result = subprocess.run(
            ["claude", "--version"], capture_output=True, text=True, timeout=5
        )
        match = re.search(r"\d+\.\d+\.\d+", result.stdout)
        return match.group(0) if match else None
    except Exception:
        return None


def get_latest_version():
    try:
        result = subprocess.run(
            ["npm", "view", "@anthropic-ai/claude-code", "version"],
            capture_output=True,
            text=True,
            timeout=5,
        )
        version = result.stdout.strip()
        return version or None
    except Exception:
        return None


def build_version_message():
    local_version = get_local_version()
    latest_version = get_latest_version()

    if local_version and latest_version:
        if local_version != latest_version:
            return (
                f"⚠️ Claude Code 업데이트가 있습니다. "
                f"현재: {local_version} → 최신: {latest_version}. "
                "`npm install -g @anthropic-ai/claude-code@latest` 로 업데이트하세요."
            )
        return f"✅ Claude Code가 최신 버전입니다 ({local_version})."

    return "ℹ️ Claude Code 버전을 확인할 수 없습니다 (오프라인이거나 npm 미설치일 수 있음)."


def build_skill_message():
    skill_name = os.environ.get("SESSION_START_SKILL", "").strip()
    if skill_name:
        return f"세션 시작 시 '{skill_name}' skill을 먼저 불러오세요."
    return (
        "세션 시작 시 자동으로 불러올 skill이 아직 지정되지 않았습니다. "
        ".claude/settings.json의 env.SESSION_START_SKILL 값을 채우면 "
        "다음 세션부터 해당 skill이 자동으로 로딩됩니다."
    )


def main():
    context = f"{build_version_message()}\n\n{build_skill_message()}"
    print(
        json.dumps(
            {
                "hookSpecificOutput": {
                    "hookEventName": "SessionStart",
                    "additionalContext": context,
                }
            }
        )
    )


if __name__ == "__main__":
    main()
