# Deep Interview Spec: 팀 협업용 Claude Code 기본 세팅 (비개발자 디자이너 3인)

## Metadata
- Interview ID: di-20260721-shadcn-team-setup
- Rounds: 4
- Final Ambiguity Score: 11.5%
- Type: greenfield
- Generated: 2026-07-21
- Threshold: 20%
- Threshold Source: default
- Initial Context Summarized: no
- Status: PASSED

## Clarity Breakdown
| Dimension | Score | Weight | Weighted |
|-----------|-------|--------|----------|
| Goal Clarity | 0.9 | 40% | 0.36 |
| Constraint Clarity | 0.85 | 30% | 0.255 |
| Success Criteria | 0.9 | 30% | 0.27 |
| **Total Clarity** | | | **0.885** |
| **Ambiguity** | | | **0.115 (11.5%)** |

## Topology

| Component | Status | Description | Coverage / Deferral Note |
|-----------|--------|--------------|---------------------------|
| 팀 협업 기본 세팅 | active | 비개발자 디자이너 3인이 공유하는 `.claude/settings.json`, 권한 정책, CLAUDE.md, 모델 정책 | 본 스펙에서 전량 커버 |
| 세션 자동화 | active | SessionStart hook: (a) Claude Code CLI 최신 버전 체크 (b) skill 자동 로딩 메커니즘 | 본 스펙에서 전량 커버 (skill 자체 내용은 추후 채움) |
| 디자인 시스템 구축 (shadcn 컴포넌트 라이브러리) | deferred | shadcn/ui 기반 자체 컴포넌트 라이브러리 구축 | 사용자 확정 제외 — 다음 단계에서 별도 진행 |
| 팀 개발환경 표준화 | deferred | 레포 구조/린트/포맷/패키지매니저 표준화 | 사용자 확정 제외 — 팀원이 비개발자라 불필요, 그러나 GitHub 공유를 위한 최소 git 초기화는 baseline에 포함 |

## Goal
디자이너 3명(비개발자)이 각자 노트북에서 Claude Code CLI를 직접 실행하고, 결과물을 GitHub repo에 공유해 함께 수정/추가하는 협업 구조를 지원하는 **Claude Code 기본 세팅**을 지금 구축한다. 이 세팅은 (1) 매 세션 반복되는 수동 설정/승인 작업을 최소화하고, (2) 세션 시작 시 Claude Code CLI가 최신 버전인지 자동으로 확인해 알려주며, (3) 세션 시작 시 skill을 자동으로 불러오는 hook 메커니즘을 갖추고, (4) 팀 전체가 동일한 세팅을 공유하도록 git으로 배포 가능해야 한다. 이 모든 세팅은 향후 "shadcn/ui 기반 디자인 시스템 구축 + 그 라이브러리로 웹 구축"이라는 최종 목표에 자연스럽게 이어지도록(=나중에 뜯어고칠 필요 없도록) 설계한다.

## Constraints
- 팀원은 3명, 전원 비개발자(디자이너), 각자 로컬 환경에서 Claude Code CLI를 직접 실행
- 협업은 GitHub 공유 저장소 기반 (수정/추가 워크플로)
- 권한 승인 방식은 **준자동(semi-auto)**: 읽기/파일 편집 등 안전한 작업은 자동 승인, `git push`·삭제 등 위험한 작업만 확인받는다
- Figma MCP 연동은 이번 범위에서 제외 (디자이너 온보딩 시점에 별도 진행)
- 디자인 시스템(컴포넌트 라이브러리) 자체 구축, 레포 구조/린트/패키지매니저 표준화는 이번 범위에서 제외
- 세션 시작 시 로드할 특정 skill은 아직 존재하지 않음 — 이번 범위는 "로딩되는 메커니즘"까지만 구축, skill 내용 자체는 추후 채움
- 버전 체크 대상은 Claude Code CLI 자체 버전 (프로젝트에 아직 package.json 등 의존성이 없음)

## Non-Goals
- shadcn/ui 기반 컴포넌트 라이브러리(디자인 시스템) 실제 구현
- 레포 구조, 린트/포맷터, 패키지 매니저 등 개발환경 표준화
- Figma MCP 실제 연동
- 특정 skill의 내용 작성 (로딩 메커니즘만 준비)

## Acceptance Criteria
- [ ] `.claude/settings.json`이 생성되고, 준자동 권한 정책(안전 작업 자동 승인 / push·삭제 등 위험 작업만 확인)이 설정되어 있다
- [ ] 기본 모델이 설정값에 반영되어 있고, CLAUDE.md에 용도별 모델 사용 가이드(디자인/Figma MCP 작업 vs 어려운 코드 수정/디버깅 vs 일반 질의응답)가 문서화되어 있다
- [ ] SessionStart hook이 설정되어 세션 시작마다 Claude Code CLI의 로컬 버전과 최신 버전을 비교해 알려준다
- [ ] SessionStart hook이 skill 자동 로딩을 트리거하는 메커니즘을 갖추고 있다 (현재는 로드할 대상 skill이 없으므로 플레이스홀더/추후 채움 방식으로 구성)
- [ ] `CLAUDE.md`에 프로젝트 목적(디자인 시스템 구축 + 웹 구축 예정), 협업 방식, 권한/hook 동작 설명, 디자이너가 알아야 할 최소 워크플로가 문서화되어 있다
- [ ] 위 설정 파일들이 git으로 커밋되어 3명의 디자이너가 저장소를 clone하면 동일한 baseline을 그대로 받을 수 있다
- [ ] Figma MCP, 디자인 시스템 구축, 개발환경 표준화가 "지금 범위 아님"으로 CLAUDE.md 또는 README에 명시되어 향후 혼동을 방지한다

## Assumptions Exposed & Resolved
| Assumption | Challenge | Resolution |
|------------|-----------|------------|
| "기본 세팅"이 개발환경(린트/패키지매니저) 표준화를 포함할 것 | 팀 구성을 먼저 확인 | 팀원이 비개발자라 개발환경 표준화는 불필요, 대신 Claude Code 자체 설정에 집중 |
| 버전 체크가 프로젝트 의존성(npm 패키지) 버전을 의미할 것 | 프로젝트에 package.json이 없음을 확인 | Claude Code CLI 자체 버전 체크로 확정 |
| SessionStart hook이 로드할 skill이 이미 정해져 있을 것 | 직접 질문 | 아직 없음 — 로딩 메커니즘만 먼저 구축, 추후 skill 내용만 채우면 되는 구조로 설계 |
| 권한 정책이 "매번 확인" 또는 "완전 자동" 둘 중 하나일 것 | 두 옵션 + 절충안 제시 | 준자동(위험 작업만 확인) 채택 |
| 결과물이 추천 문서일 것 | 직접 질문 | 실제 설정 파일을 프로젝트에 바로 생성하는 것으로 확정 |

## Technical Context (greenfield)
- 현재 프로젝트 디렉터리는 비어 있음 (`.omc/`만 존재, git 미초기화, package.json 없음)
- GitHub 공유 저장소 기반 협업을 위해 최소한의 git 초기화(`git init`, remote 연결 안내)가 필요 — 단, 레포 구조/브랜치 전략 표준화는 범위 밖
- Claude Code 설정 파일 위치: `.claude/settings.json` (팀 공유), 개인별 오버라이드는 `.claude/settings.local.json` (git-ignore 대상)
- Hooks는 `.claude/settings.json`의 `hooks` 필드 또는 별도 스크립트(`.claude/hooks/`)로 구성 가능
- 모델: Claude 5 패밀리(Opus 4.8 / Sonnet 5 / Haiku 4.5) 기준으로 정책 수립

## Ontology (Key Entities)
| Entity | Type | Fields | Relationships |
|--------|------|--------|----------------|
| Designer | core domain | role: non-developer, count: 3, device: own laptop | Claude Code CLI 직접 실행, GitHub repo에 커밋 |
| GitHubRepo | core domain | shared, modify/add workflow | 팀 산출물 + `.claude/` 설정 공유 저장소 |
| PermissionPolicy | core domain | semi-auto: 안전 작업 자동 승인, 위험 작업(push/삭제) 확인 | `.claude/settings.json`에 정의 |
| SessionStartHook | core domain | CLI 버전 체크 + skill 로딩 트리거 | SessionStart 이벤트에서 실행 |
| Skill | supporting | 아직 미생성, 메커니즘만 준비 | SessionStartHook을 통해 로드됨 |
| ModelPolicy | core domain | 용도별 모델 추천(디자인/Figma=Sonnet, 어려운 문제=Opus 등) | CLAUDE.md에 문서화 |
| FigmaMCP | external system | 추후 연동 예정 | 이번 범위 제외 |

## Ontology Convergence
| Round | Entity Count | New | Changed | Stable | Stability Ratio |
|-------|-------------|-----|---------|--------|-----------------|
| 1 | 4 | 4 | - | - | N/A |
| 4 | 7 | 3 | 0 | 4 | 50% |

엔티티가 라운드 2~3의 구두 답변을 통해 PermissionPolicy, ModelPolicy, FigmaMCP로 구체화되며 확장되었고, 핵심 엔티티(Designer, GitHubRepo, Skill)는 안정적으로 유지됨.

## Interview Transcript
<details>
<summary>Full Q&A (4 rounds + 2 topology clarifications)</summary>

### Topology 확인 (1차)
**Q:** 디자인 시스템 + 개발환경 표준화 + 세션 자동화, 3개 컴포넌트로 이해했는데 맞는지
**A:** 디자인 시스템 구축과 개발환경 표준화는 지금 필요 없음. 팀 협업을 위한 Claude Code 기본 세팅이 필요.

### Topology 확인 (2차, 재조정 후)
**Q:** 팀 협업 기본 세팅 + 세션 자동화, 2개 컴포넌트로 재조정 확인
**A:** 맞음, 이대로 진행

### Round 1 — 팀 협업 기본 세팅 / Goal
**Q:** 팀원 구성과 반복 작업의 구체적 내용
**A:** 디자이너 3명, 각자 노트북, Claude Code CLI 직접 실행, GitHub repo로 협업(수정/추가). 반복 작업 구체 내용은 모름 → 그래서 베스트프랙티스 요청. 구체적이지 않으면 기본 세팅만 하고 넘어가도 됨.
**Ambiguity:** 63%

### Round 2 — 세션 자동화 / Goal
**Q:** 버전 체크 대상, skill 로딩 방식, 모델 정책, 기타 기본 세팅
**A:** CLI 자체 버전 체크. skill은 아직 없음, 로딩 메커니즘만. 용도별 모델 추천 원함(Figma MCP/UI=Sonnet 등 예시). 모든 세팅은 최종 목표(디자인시스템+웹구축)에 호환되어야 함.
**Ambiguity:** 28%

### Round 3 — Constraints
**Q:** 권한 승인 방식, Figma MCP 연결 시점
**A:** 준자동(안전 작업 자동승인, push/삭제만 확인). Figma MCP는 나중에.
**Ambiguity:** 20.5%

### Round 4 — Success Criteria
**Q:** 결과물을 문서로 받을지, 파일로 바로 생성할지
**A:** 바로 파일로 생성 (권장안 채택)
**Ambiguity:** 11.5%

</details>
