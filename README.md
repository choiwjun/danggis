# 당골래 (Danggolrae) 🙏

> 전국 기도터 탐색 플랫폼 - 사찰, 굿당, 산신당, 서낭당을 한눈에

## 프로젝트 개요

당골래는 전국의 다양한 기도터(사찰, 굿당, 서낭당, 산신당 등)를 탐색하고, 
방문 후기를 공유하며, AI 도우미와 상담할 수 있는 풀스택 웹 플랫폼입니다.

### 주요 기능

- 🏯 **기도터 디렉토리**: 전국 기도터 검색 및 상세 정보
- 🗺️ **지도 탐색**: 네이버 지도 기반 위치 검색
- ✍️ **후기 시스템**: 방문 경험 공유 및 조회
- ⭐ **즐겨찾기**: 관심 기도터 저장
- 🤖 **당골래 AI**: 
  - 일반 Q&A 모드 (기도터 정보, 예절 안내)
  - 사주풀이 모드 (만세력 기반 기도 방향 안내)
- 🎯 **줄별 분류**: 용궁줄, 산신줄, 장군줄, 도사줄 등

## 기술 스택

### Frontend & Backend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Icons**: Lucide React

### Database & ORM
- PostgreSQL
- Prisma ORM

### Authentication
- NextAuth (Auth.js)
- Credentials Provider (이메일/비밀번호)

### APIs
- OpenAI API (AI 도우미)
- Naver Maps JS API v3 (지도)
- 만세력 API (사주 계산)

### Deployment
- Vercel
- Supabase (DB) 또는 AWS RDS

## 디자인 시스템

### 브랜드 컬러
- **Primary (솔잎 그린)**: `#3C5F4A`
- **Primary Soft**: `#E3F1E8`
- **Primary Dark**: `#274033`

### 줄별 컬러
- 용궁줄: `#2080C0` (파란색)
- 산신줄: `#3C5F4A` (초록색)
- 장군줄: `#A6472C` (주황색)
- 도사줄: `#7C4AC2` (보라색)

### 폰트
- **기본**: Noto Sans KR

## 시작하기

### 필요 조건
- Node.js >= 20.9.0
- npm 또는 pnpm

### 설치

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

### 빌드

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

## 프로젝트 구조

```
danggis/
├── app/                    # Next.js App Router 페이지
│   ├── layout.tsx         # 공통 레이아웃
│   ├── page.tsx           # 홈페이지
│   ├── places/            # 기도터 목록 & 상세
│   ├── map/               # 지도 탐색
│   ├── ai/                # AI 도우미
│   ├── my/                # 마이페이지
│   └── api/               # API Routes
├── components/            # 재사용 컴포넌트
│   ├── layout/           # Header, Footer
│   └── ui/               # shadcn/ui 컴포넌트
├── lib/                  # 유틸리티, 헬퍼
├── prisma/               # Prisma 스키마 & 마이그레이션
└── public/               # 정적 파일
```

## 환경 변수

`.env.local` 파일 생성:

```env
# Database
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# OpenAI
OPENAI_API_KEY="sk-..."

# Naver Maps
NEXT_PUBLIC_NAVER_MAP_CLIENT_ID="..."

# Image Storage (Supabase or AWS S3)
NEXT_PUBLIC_SUPABASE_URL="..."
NEXT_PUBLIC_SUPABASE_ANON_KEY="..."
```

## 개발 로드맵

- [x] **Step 1**: Next.js 초기 세팅 (완료)
- [x] **Step 2**: Prisma + DB 스키마 (완료)
- [x] **Step 3**: NextAuth 인증 (완료)
- [ ] **Step 4**: 기도터 CRUD
- [ ] **Step 5**: 주변 기도터 검색
- [x] **Step 6**: 네이버 지도 연동 (완료)
- [ ] **Step 7**: AI 도우미 구현
- [ ] **Step 8**: 후기 시스템
- [ ] **Step 9**: 관리자 페이지
- [ ] **Step 10**: Vercel 배포

## 라이선스

MIT

## 면책 조항

당골래는 기도터 정보 제공 플랫폼입니다. 
효험이나 결과를 보장하지 않으며, 건강·법률·재정 관련 결정은 반드시 전문가와 상의하세요.
