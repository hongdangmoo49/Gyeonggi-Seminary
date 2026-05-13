# Checkpoint — 경기신학교 홈페이지 진행 상황

> 업데이트: 2026-05-13

---

## 완료

### Phase 1 — 기반 구축 (완료)

| 커밋 | 내용 |
|------|------|
| `9af6444` | 프로젝트 init (콘텐츠 MD 10개, 디자인.md, 계획.md) |
| `8752e2f` | React 프로젝트 초기 설정 (Vite, package.json, vite.config.js) |
| `aa83001` | CSS 디자인 시스템 (variables.css, global.css) |
| `f6c2ffb` | 네비게이션 데이터 (navigation.js) |
| `85d8046` | React 진입점 + 라우터 (main.jsx, App.jsx — 11개 라우트) |
| `2df55f2` | 레이아웃 컴포넌트 (Header + 드롭다운/모바일, Footer, Layout) |
| `3c52199` | PageBanner 공통 컴포넌트 |
| `379d821` | 11개 페이지 셸 생성 |

### Phase 2 — 정적 콘텐츠 페이지 (완료)

| 커밋 | 내용 |
|------|------|
| `be816c6` | 공통 UI 컴포넌트 (Tab, Accordion, Card) |
| `8c4767b` | 메인 홈페이지 — Hero, 빠른이동, 학교소개, 강의실 바로가기 |
| `feb88a1` | 학교 소개 콘텐츠 수정 (실제 학교 정보 반영) |
| `b185a7d` | 학교소개 — 탭 UI (교육이념/연혁/교육과정/시설안내) |
| `365803d` | 학장인사, 입학안내(FAQ), 경기총회 |

### 완료된 페이지 (5/11)

| 페이지 | 경로 | 상태 |
|--------|------|------|
| 메인 홈페이지 | `/` | 완료 |
| 학교소개 | `/about` | 완료 |
| 학장인사 | `/greeting` | 완료 |
| 입학안내 | `/admission` | 완료 |
| 경기총회 | `/assembly` | 완료 |

---

## 다음 할 일

### Phase 3 — 강의실 & 자료실 (4페이지)

| 페이지 | 경로 | 주요 기능 |
|--------|------|-----------|
| 학부강의실 | `/undergraduate` | 카테고리 필터, 강의 테이블/카드, 아코디언 |
| 신대원 및 연구원 강의실 | `/graduate` | 신대원/연구원 탭, 강의 리스트 |
| 동영상자료실 | `/video-library` | 검색, 카테고리 필터, 카드 그리드, 페이지네이션 |
| 일반자료실 | `/document-library` | 검색, 카테고리 필터, 다운로드, 페이지네이션 |

**필요 작업:**
- [ ] `data/lectures.js` — 학부/신대원 강의 더미 데이터
- [ ] `data/videos.js` — 동영상 더미 데이터 (12개)
- [ ] `data/documents.js` — 문서 더미 데이터 (12개)
- [ ] `FilterTabs.jsx` + `SearchBar.jsx` + `Pagination.jsx` 공통 컴포넌트
- [ ] 4개 페이지 컴포넌트 + CSS Modules 작성

### Phase 4 — 커뮤니티 & 게시판 (2페이지)

| 페이지 | 경로 | 주요 기능 |
|--------|------|-----------|
| 커뮤니티 | `/community` | 서브 게시판 탭, 공지 고정, 게시글 리스트 |
| 자유게시판 | `/board` | 글쓰기, 상세보기, 댓글, 검색, 페이지네이션 |

**필요 작업:**
- [ ] `hooks/useLocalStorage.js` — localStorage CRUD 훅
- [ ] `data/posts.js` — 더미 게시글 데이터
- [ ] `PostList.jsx`, `PostDetail.jsx`, `PostForm.jsx`, `Comment.jsx` 컴포넌트
- [ ] 2개 페이지 컴포넌트 + CSS Modules 작성

### Phase 5 — 마무리 & 배포

- [ ] 반응형 교차 검증 (Mobile / Tablet / Desktop)
- [ ] SEO 메타 태그, sitemap.xml, robots.txt
- [ ] 성능 최적화 (이미지 lazy loading, Lighthouse)
- [ ] GitHub Pages 배포 (`npm run deploy`)
- [ ] 404.html (SPA 라우팅)

---

## 남은 페이지 (6/11)

| 페이지 | 상태 | Phase |
|--------|------|-------|
| 학부강의실 | 빈 셸 | Phase 3 |
| 신대원 및 연구원 강의실 | 빈 셸 | Phase 3 |
| 동영상자료실 | 빈 셸 | Phase 3 |
| 일반자료실 | 빈 셸 | Phase 3 |
| 커뮤니티 | 빈 셸 | Phase 4 |
| 자유게시판 | 빈 셸 | Phase 4 |

---

## 전체 진행률

```
Phase 1 ████████████████████ 100%  기반 구축
Phase 2 ████████████████████ 100%  정적 페이지 (5/5)
Phase 3 ░░░░░░░░░░░░░░░░░░░░   0%  강의실 & 자료실 (0/4)
Phase 4 ░░░░░░░░░░░░░░░░░░░░   0%  커뮤니티 & 게시판 (0/2)
Phase 5 ░░░░░░░░░░░░░░░░░░░░   0%  마무리 & 배포
```
