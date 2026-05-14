# 경기신학교 홈페이지

> 대한예수교장로회 경기총회 경기신학교 (평신도)
> Korean Presbyterian Pyungshindo Gyeonggi General Assembly Gyeonggi Seminary (Laity)

---

## 프로젝트 소개

경기신학교 공식 홈페이지입니다. 성경적 신학공부를 원하는 평신도들이 학부 과정과 대학원 과정을 통해 체계적으로 신학을 공부할 수 있도록 돕는 플랫폼입니다.

- **일산본교**: 토요일 오전·오후
- **서울 분교**: 금요일 오후
- **교수진**: 대한예수교장로회 신학석·박사 학위 소지자
- **모집**: 초교파적 학생 모집

---

## 데모

**[https://hongdangmoo49.github.io/Gyeonggi-Seminary](https://hongdangmoo49.github.io/Gyeonggi-Seminary)**

---

## 기술 스택

| 영역 | 기술 |
|------|------|
| 프레임워크 | React 19 |
| 빌드 도구 | Vite 8 |
| 라우팅 | React Router 7 |
| 스타일 | CSS Modules |
| 아이콘 | react-icons (Material Symbols) |
| 폰트 | Noto Sans KR, Noto Serif KR, Playfair Display |
| 배포 | GitHub Pages (gh-pages) |

---

## 페이지 구성

| 페이지 | 경로 | 설명 |
|--------|------|------|
| 메인 | `/` | 홈페이지 메인 (Hero, 학교소개, 강의실 바로가기) |
| 학교소개 | `/about` | 교육이념, 연혁, 교육과정, 시설안내 (탭 UI) |
| 학장인사 | `/greeting` | 학장 인사말 |
| 입학안내 | `/admission` | 입학자격, 일정, 제출서류, FAQ |
| 학부강의실 | `/undergraduate` | 학부 과정 강의 목록 (분야 필터) |
| 신대원/연구원 | `/graduate` | 신학대학원 및 연구원 강의 (탭 전환) |
| 동영상자료실 | `/video-library` | 강의/특강/예배 영상 (검색, 필터, 페이지네이션) |
| 일반자료실 | `/document-library` | 강의자료, 서식, 학술자료 (다운로드) |
| 커뮤니티 | `/community` | 공지사항, 학사공지, 기도제목, 중고도서, 동문소식 |
| 자유게시판 | `/board` | 자유 게시판 (글쓰기, 댓글, 검색) |
| 경기총회 | `/assembly` | 대한예수교장로회 경기총회 소개 |

---

## 주요 기능

- **반응형 디자인** — Mobile (320px) ~ Desktop (1920px) 대응
- **탭 UI** — 학교소개, 신대원/연구원 강의실
- **아코디언** — FAQ 접기/펼치기
- **카테고리 필터** — 강의실, 자료실 분야별 필터링
- **검색** — 동영상, 문서, 게시글 검색
- **페이지네이션** — 자료실, 게시판 페이지 이동
- **게시판 CRUD** — localStorage 기반 글쓰기/수정/삭제
- **댓글 시스템** — 게시글에 댓글 작성
- **로그인/회원가입** — localStorage 기반 인증
- **권한 분기** — 비로그인: 읽기 전용 / 로그인: 글쓰기, 댓글

---

## 시작하기

### 필수 요구사항

- Node.js 18 이상
- npm 9 이상

### 설치

```bash
git clone https://github.com/hongdangmoo49/Gyeonggi-Seminary.git
cd Gyeonggi-Seminary
npm install
```

### 개발 서버

```bash
npm run dev
```

브라우저에서 `http://localhost:5173/Gyeonggi-Seminary/` 접속

### 프로덕션 빌드

```bash
npm run build
npm run preview
```

### 배포

```bash
npm run deploy
```

---

## 프로젝트 구조

```
src/
├── main.jsx                    # 진입점
├── App.jsx                     # 라우터 + AuthProvider
├── styles/
│   ├── variables.css           # 디자인 토큰 (컬러, 간격, 타이포)
│   └── global.css              # 리셋, 공통 스타일
├── components/
│   ├── layout/
│   │   ├── Header.jsx          # 네비게이션 + 로그인 버튼
│   │   ├── Footer.jsx          # 학교 정보
│   │   └── Layout.jsx          # Header + Outlet + Footer
│   └── ui/
│       ├── PageBanner.jsx      # 페이지 상단 배너
│       ├── Tab.jsx             # 탭 전환
│       ├── Accordion.jsx       # 접기/펼치기
│       ├── Card.jsx            # 콘텐츠 카드
│       ├── FilterTabs.jsx      # 카테고리 필터
│       ├── SearchBar.jsx       # 검색 입력
│       ├── Pagination.jsx      # 페이지네이션
│       ├── PostList.jsx        # 게시글 리스트
│       ├── PostDetail.jsx      # 게시글 상세
│       ├── PostForm.jsx        # 글쓰기/수정 폼
│       ├── Comment.jsx         # 댓글
│       └── LoginModal.jsx      # 로그인/회원가입 모달
├── pages/                      # 11개 페이지 컴포넌트
├── hooks/
│   ├── useAuth.jsx             # 인증 커스텀 훅
│   └── useLocalStorage.js      # localStorage CRUD 훅
├── data/
│   ├── navigation.js           # 네비게이션 메뉴
│   ├── lectures.js             # 강의 데이터 (학부 24, 신대원 13, 연구원 4)
│   ├── videos.js               # 동영상 데이터 (12개)
│   ├── documents.js            # 문서 데이터 (12개)
│   └── posts.js                # 게시글 데이터 (13개)
public/
├── 404.html                    # SPA 리다이렉트
├── robots.txt
└── sitemap.xml
```

---

## 디자인 시스템

### 컬러 팔레트

| 이름 | HEX | 용도 |
|------|-----|------|
| Deep Navy | `#1B2A4A` | 헤더, 네비게이션 |
| Royal Blue | `#2C5F8A` | 버튼, 링크, 강조 |
| Burgundy | `#6B2D3E` | 보조 강조 |
| Warm Gold | `#C8A96E` | 장식, 구분선 |

### 타이포그래피

- 한국어: Noto Sans KR / Noto Serif KR
- 영문: Playfair Display

---

## 향후 계획

| 항목 | 내용 |
|------|------|
| 백엔드 연동 | Firebase Firestore 또는 Supabase |
| 실시간 게시판 | DB 기반 게시글/댓글 관리 |
| 파일 업로드 | 강의자료, 동영상 업로드 기능 |
| 관리자 페이지 | 콘텐츠 관리 시스템 (CMS) |
| 이메일 인증 | 회원가입 시 교회 인증 |

---

## 라이선스

© 2026 경기신학교. 대한예수교장로회 경기총회
