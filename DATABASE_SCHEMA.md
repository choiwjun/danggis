# 당골래 데이터베이스 스키마 다이어그램

## 📊 전체 모델 구조

```
┌─────────────────────────────────────────────────────────────────┐
│                        당골래 데이터베이스                         │
└─────────────────────────────────────────────────────────────────┘

👤 사용자 관련
├── User (회원)
│   ├── id, email, password, nickname
│   └── Relations: reviews, favorites, admin, aiSessions
├── Admin (관리자)
│   ├── id, userId, role
│   └── Relations: user, auditLogs, createdPlaces
└── UserSajuProfile (사주 프로필) [옵션]
    ├── id, userId, birthDate, birthTime, isLunar, gender, sajuJson
    └── Relations: user

🏯 기도터 관련
├── PrayerPlace (기도터)
│   ├── id, name, slug, description, addressFull
│   ├── regionId, placeTypeId, latitude, longitude
│   ├── naverPlaceId, staticMapUrl, isActive
│   └── Relations: region, placeType, images, deityTags, reviews, favorites
├── PlaceType (기도터 유형)
│   ├── id, code, nameKo
│   └── Relations: places
├── DeityTag (줄/신령 태그)
│   ├── id, code, nameKo
│   └── Relations: placeTags
├── PlaceDeityTag (기도터-줄 연결)
│   ├── id, placeId, deityTagId
│   └── Relations: place, deityTag
├── RegionArea (지역)
│   ├── id, name, parentId
│   └── Relations: parent, children, places (계층 구조)
└── PlaceImage (기도터 이미지)
    ├── id, placeId, url, isMain, order
    └── Relations: place

📝 후기 관련
├── Review (후기)
│   ├── id, placeId, userId, rating, content
│   └── Relations: place, user, images
├── ReviewImage (후기 이미지)
│   ├── id, reviewId, url, order
│   └── Relations: review
└── Favorite (즐겨찾기)
    ├── id, userId, placeId
    └── Relations: user, place

🤖 AI 도우미 관련
├── AiSession (AI 대화 세션)
│   ├── id, userId, title, mode, startedAt, lastActivityAt, isPinned
│   └── Relations: user, messages
├── AiMessage (메시지)
│   ├── id, sessionId, senderType, content, placeId, metadata
│   └── Relations: session, place, feedbacks
└── AiFeedback (피드백)
    ├── id, messageId, userId, feedback, comment
    └── Relations: message, user

🔐 관리자 관련
└── AuditLog (감사 로그)
    ├── id, adminId, action, targetType, targetId, details
    └── Relations: admin
```

---

## 🔗 주요 관계 (Relationships)

### 1:1 관계
- User ↔ Admin
- User ↔ UserSajuProfile

### 1:N 관계
- User → Reviews (한 명의 사용자가 여러 후기 작성)
- User → Favorites (한 명의 사용자가 여러 즐겨찾기)
- User → AiSessions (한 명의 사용자가 여러 AI 세션)
- PrayerPlace → Reviews (한 기도터에 여러 후기)
- PrayerPlace → PlaceImages (한 기도터에 여러 이미지)
- PrayerPlace → Favorites (한 기도터를 여러 사용자가 즐겨찾기)
- Review → ReviewImages (한 후기에 여러 이미지)
- AiSession → AiMessages (한 세션에 여러 메시지)
- AiMessage → AiFeedbacks (한 메시지에 여러 피드백)

### N:N 관계 (조인 테이블 사용)
- PrayerPlace ↔ DeityTag (PlaceDeityTag 테이블 사용)
  - 한 기도터가 여러 줄을 가질 수 있음
  - 한 줄이 여러 기도터에 속할 수 있음

### 계층 구조 (Self-Referencing)
- RegionArea → RegionArea (parent-children)
  - 예: 서울특별시 → 강남구 → 역삼동

---

## 📋 주요 코드 값 (Code Values)

### PlaceType (기도터 유형)
```
temple      - 사찰
shrine      - 산신당
gutdang     - 굿당
seonangdang - 서낭당
```

### DeityTag (줄/신령)
```
yonggung - 용궁줄
sansin   - 산신줄
janggun  - 장군줄
dosa     - 도사줄
etc      - 기타
```

### Admin Role
```
admin       - 일반 관리자
super_admin - 최고 관리자
```

### AiMessage SenderType
```
user      - 사용자 메시지
assistant - AI 응답
system    - 시스템 메시지
```

### AiSession Mode
```
general - 일반 Q&A 모드
saju    - 사주풀이 모드
```

### AiFeedback Feedback
```
like    - 좋아요
dislike - 싫어요
```

---

## 🔍 인덱스 설정

성능 최적화를 위해 다음 필드에 인덱스 생성:

```prisma
// PrayerPlace
@@index([slug])
@@index([regionId])
@@index([placeTypeId])
@@index([isActive])

// Review
@@index([placeId])
@@index([userId])

// Favorite
@@index([userId])
@@index([placeId])

// AiSession
@@index([userId])

// AiMessage
@@index([sessionId])
@@index([placeId])

// AuditLog
@@index([adminId])
@@index([targetType, targetId])
```

---

## 🗂️ Unique Constraints

중복 방지를 위한 유니크 제약:

- `User.email` - 이메일 중복 불가
- `PrayerPlace.slug` - URL slug 중복 불가
- `PrayerPlace.naverPlaceId` - 네이버 플레이스 ID 중복 불가
- `PlaceType.code` - 유형 코드 중복 불가
- `DeityTag.code` - 줄 코드 중복 불가
- `PlaceDeityTag.[placeId, deityTagId]` - 같은 기도터-줄 조합 중복 불가
- `Favorite.[userId, placeId]` - 같은 사용자-기도터 즐겨찾기 중복 불가
- `Admin.userId` - 한 사용자당 하나의 관리자 계정
- `UserSajuProfile.userId` - 한 사용자당 하나의 사주 프로필
- `AiFeedback.[messageId, userId]` - 한 메시지당 사용자별 하나의 피드백

---

## 🛡️ 삭제 정책 (Cascade)

관계 데이터 삭제 시 동작:

```
User 삭제 시:
├── Reviews 삭제 (Cascade)
├── Favorites 삭제 (Cascade)
├── Admin 삭제 (Cascade)
└── AiSessions 유지 (SetNull - userId만 null)

PrayerPlace 삭제 시:
├── PlaceImages 삭제 (Cascade)
├── PlaceDeityTags 삭제 (Cascade)
├── Reviews 삭제 (Cascade)
├── Favorites 삭제 (Cascade)
└── AiMessages 유지 (SetNull - placeId만 null)

Review 삭제 시:
└── ReviewImages 삭제 (Cascade)

AiSession 삭제 시:
└── AiMessages 삭제 (Cascade)

AiMessage 삭제 시:
└── AiFeedbacks 삭제 (Cascade)
```

---

## 💾 JSON 필드

유연한 데이터 저장을 위한 JSON 필드:

- `UserSajuProfile.sajuJson` - 사주팔자 계산 결과
- `AiMessage.metadata` - AI 메시지 메타데이터 (컨텍스트, 설정 등)
- `AuditLog.details` - 감사 로그 상세 정보

---

## 🌱 초기 시드 데이터 (권장)

```typescript
// PlaceType
{ code: 'temple', nameKo: '사찰' }
{ code: 'shrine', nameKo: '산신당' }
{ code: 'gutdang', nameKo: '굿당' }
{ code: 'seonangdang', nameKo: '서낭당' }

// DeityTag
{ code: 'yonggung', nameKo: '용궁줄' }
{ code: 'sansin', nameKo: '산신줄' }
{ code: 'janggun', nameKo: '장군줄' }
{ code: 'dosa', nameKo: '도사줄' }
{ code: 'etc', nameKo: '기타' }

// RegionArea (예시)
{ name: '서울특별시', parentId: null }
{ name: '부산광역시', parentId: null }
{ name: '경기도', parentId: null }
```

---

## 📊 데이터 흐름 시나리오

### 사용자가 기도터 후기 작성
```
1. User 로그인
2. PrayerPlace 선택
3. Review 생성 (placeId, userId, rating, content)
4. ReviewImage 생성 (reviewId, url)
```

### 관리자가 새 기도터 등록
```
1. Admin 로그인
2. PrayerPlace 생성 (createdByAdminId)
3. PlaceImage 생성 (placeId, url, isMain)
4. PlaceDeityTag 생성 (placeId, deityTagId)
5. AuditLog 생성 (adminId, action: 'create', targetType: 'PrayerPlace')
```

### AI 도우미 대화
```
1. User가 AiSession 시작 (또는 기존 세션 재사용)
2. AiMessage 생성 (senderType: 'user', content: '질문')
3. OpenAI API 호출
4. AiMessage 생성 (senderType: 'assistant', content: 'AI 답변')
5. User가 AiFeedback 생성 (messageId, feedback: 'like')
```

---

**Step 2 완료! 데이터베이스 설계 완료**
