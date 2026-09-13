# BDS

## 이 프로젝트의 목표

- **다음 단계 (지금은 아님):** [shadcn/ui](https://ui.shadcn.com/)를 베이스로 우리 팀만의 독자적인 컴포넌트 라이브러리(디자인 시스템)를 구축하고, 그 라이브러리로 실제 웹을 만듭니다.
- **지금 단계:** 팀이 Claude Code로 함께 작업하기 위한 기본 세팅만 갖춰둔 상태입니다.

## 시작하는 법

1. 이 저장소를 clone합니다.
2. **반드시 터미널에서 이 폴더로 먼저 이동한 뒤** `claude`를 실행합니다. 세션 도중에 이 폴더로 이동하는 것은 안 됩니다 — `.claude/settings.json`(권한 정책, SessionStart 훅)은 `claude` 실행 시점의 작업 디렉토리 기준으로만 로드됩니다.
   ```
   cd /path/to/BDS && claude
   ```
   자주 여닫는다면 쉘 alias로 한 번에 실행하는 것도 추천합니다 (`~/.zshrc` 등에 추가):
   ```
   alias bds='cd /path/to/BDS && claude'
   ```
3. 세션이 시작되면 Claude Code 버전 확인 안내가 자동으로 뜹니다.
4. 개인 설정이 필요하면 `.claude/settings.local.json`을 만들어 사용하세요 (git에는 올라가지 않습니다).

## 세부 설정 안내

이 저장소가 어떻게 세팅되어 있는지 (권한 정책, 모델별 서브에이전트, 세션 자동화 등)는 [`CLAUDE.md`](./CLAUDE.md)에 정리되어 있습니다. Claude Code가 이 문서를 자동으로 읽고 따르며, 사람이 참고해도 됩니다.
