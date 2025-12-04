# Prisma + PostgreSQL 설정 가이드

## Step 2 완료 체크리스트 ✅

- ✅ Prisma 스키마 정의 (`prisma/schema.prisma`)
- ✅ 환경 변수 템플릿 (`ENV_SETUP.md`)
- ✅ Prisma Client 유틸리티 (`lib/prisma.ts`)

---

## 📦 Prisma 패키지 설치

**주의**: Node.js 20.9.0 이상 필요

```bash
# Prisma CLI (개발 의존성)
npm install -D prisma

# Prisma Client (런타임)
npm install @prisma/client
```

---

## 🗄️ 데이터베이스 준비

### Option 1: 로컬 PostgreSQL (Docker 사용)

```bash
# Docker로 PostgreSQL 실행
docker run --name danggolrae-db \
  -e POSTGRES_PASSWORD=mysecretpassword \
  -e POSTGRES_DB=danggolrae \
  -p 5432:5432 \
  -d postgres:16
```

### Option 2: Supabase (추천)

1. [Supabase](https://supabase.com/) 가입
2. 새 프로젝트 생성
3. Settings → Database → Connection String 복사
4. `.env` 파일에 `DATABASE_URL` 설정

### Option 3: Neon, Railway, Render 등

클라우드 PostgreSQL 서비스 선택 후 연결 문자열 획득

---

## ⚙️ 환경 변수 설정

1. **프로젝트 루트에 `.env` 파일 생성**

```bash
# .env 파일 생성
touch .env
```

2. **ENV_SETUP.md 내용을 복사하여 `.env`에 붙여넣기**

최소 필수 설정:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/danggolrae?schema=public"
```

---

## 🔧 Prisma 초기화 및 마이그레이션

### 1. Prisma Client 생성

```bash
npx prisma generate
```

이 명령어는:
- `node_modules/.prisma/client` 생성
- TypeScript 타입 정의 생성
- `@prisma/client` import 가능하게 함

### 2. 데이터베이스 마이그레이션 (초기 설정)

```bash
# 개발 환경 마이그레이션
npx prisma migrate dev --name init
```

이 명령어는:
- `prisma/migrations` 폴더 생성
- SQL 마이그레이션 파일 생성
- 데이터베이스에 테이블 생성
- Prisma Client 자동 재생성

### 3. 마이그레이션 확인

```bash
# 데이터베이스 스키마 시각화 (브라우저 열림)
npx prisma studio
```

Prisma Studio에서 다음을 확인:
- 모든 테이블이 생성되었는지
- 관계(Relations)가 올바른지
- 데이터 추가/수정/삭제 가능

---

## 📊 정의된 데이터 모델

### 사용자 관련
- ✅ **User**: 회원 정보 (NextAuth 호환)
- ✅ **Admin**: 관리자 권한
- ✅ **UserSajuProfile**: 사주 프로필 (옵션)

### 기도터 관련
- ✅ **PrayerPlace**: 기도터 정보
- ✅ **PlaceType**: 기도터 유형 (사찰, 굿당 등)
- ✅ **DeityTag**: 줄(신령) 태그
- ✅ **PlaceDeityTag**: 기도터-줄 연결
- ✅ **RegionArea**: 지역 정보 (계층 구조)
- ✅ **PlaceImage**: 기도터 이미지

### 후기 관련
- ✅ **Review**: 후기
- ✅ **ReviewImage**: 후기 이미지
- ✅ **Favorite**: 즐겨찾기

### AI 도우미 관련
- ✅ **AiSession**: AI 대화 세션
- ✅ **AiMessage**: 메시지
- ✅ **AiFeedback**: 피드백 (좋아요/싫어요)

### 관리자 관련
- ✅ **AuditLog**: 감사 로그

---

## 🔄 마이그레이션 명령어 정리

```bash
# 개발 환경: 새 마이그레이션 생성 및 적용
npx prisma migrate dev --name [migration_name]

# 프로덕션: 마이그레이션 적용만 (생성 없음)
npx prisma migrate deploy

# 마이그레이션 상태 확인
npx prisma migrate status

# 스키마 초기화 (주의: 모든 데이터 삭제)
npx prisma migrate reset

# Prisma Client 재생성
npx prisma generate

# Prisma Studio 실행 (GUI 데이터 관리)
npx prisma studio
```

---

## 💡 사용 예시

### Prisma Client 사용법

```typescript
import prisma from '@/lib/prisma'

// 기도터 목록 조회
const places = await prisma.prayerPlace.findMany({
  where: { isActive: true },
  include: {
    placeType: true,
    region: true,
    deityTags: {
      include: { deityTag: true }
    }
  },
  take: 10
})

// 새 후기 작성
const review = await prisma.review.create({
  data: {
    placeId: 'place_id_here',
    userId: 'user_id_here',
    rating: 5,
    content: '좋은 기도터입니다!'
  }
})

// 즐겨찾기 추가
await prisma.favorite.create({
  data: {
    userId: 'user_id_here',
    placeId: 'place_id_here'
  }
})
```

---

## 🌱 시드 데이터 (옵션)

초기 데이터를 넣고 싶다면 `prisma/seed.ts` 파일 생성:

```typescript
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // PlaceType 초기 데이터
  await prisma.placeType.createMany({
    data: [
      { code: 'temple', nameKo: '사찰' },
      { code: 'shrine', nameKo: '산신당' },
      { code: 'gutdang', nameKo: '굿당' },
      { code: 'seonangdang', nameKo: '서낭당' },
    ]
  })

  // DeityTag 초기 데이터
  await prisma.deityTag.createMany({
    data: [
      { code: 'yonggung', nameKo: '용궁줄' },
      { code: 'sansin', nameKo: '산신줄' },
      { code: 'janggun', nameKo: '장군줄' },
      { code: 'dosa', nameKo: '도사줄' },
      { code: 'etc', nameKo: '기타' },
    ]
  })

  console.log('✅ 시드 데이터 생성 완료')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```

`package.json`에 추가:
```json
{
  "prisma": {
    "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
  }
}
```

실행:
```bash
npx prisma db seed
```

---

## 🚨 트러블슈팅

### 1. Prisma Client 업데이트 안 됨
```bash
npx prisma generate
```

### 2. 마이그레이션 충돌
```bash
npx prisma migrate reset  # 주의: 모든 데이터 삭제
npx prisma migrate dev
```

### 3. DATABASE_URL 오류
- `.env` 파일이 프로젝트 루트에 있는지 확인
- 연결 문자열 형식이 올바른지 확인
- PostgreSQL 서버가 실행 중인지 확인

---

## 📚 다음 단계 (Step 3)

- [ ] NextAuth 설정
- [ ] User 회원가입/로그인 API
- [ ] 세션 관리

---

**Step 2 완료! 🎉**
데이터베이스 스키마가 준비되었습니다.
