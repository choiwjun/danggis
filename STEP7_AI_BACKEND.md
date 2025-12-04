# STEP 7: AI 도우미 백엔드 구현 ✅

## 📋 구현 내역

### 1. 타입 정의
- **파일**: `types/saju.ts`, `types/ai.ts`
- **기능**:
  - 사주팔자 관련 타입 (천간, 지지, 오행, 사주사기둥 등)
  - AI 채팅 요청/응답 타입
  - OpenAI 메시지 타입

### 2. 사주 계산 시스템
- **파일**: `lib/sajuCalculator.ts`
- **기능**:
  - Mock 사주 계산 함수 (`calculateSaju`)
  - 천간/지지 매핑
  - 오행 균형 계산
  - 십성 분석 (Mock)
  - 대운 계산 (Mock)
  - AI 프롬프트용 텍스트 요약 (`summarizeSajuForAI`)
- **특징**:
  - 실제 만세력 라이브러리로 교체 가능한 구조
  - 추천 라이브러리: `lunar-javascript`

### 3. OpenAI 클라이언트
- **파일**: `lib/openai.ts`
- **기능**:
  - OpenAI SDK 싱글톤 인스턴스
  - 환경변수 `OPENAI_API_KEY` 사용
  - 개발/프로덕션 환경 분리

### 4. AI 프롬프트 시스템
- **파일**: `lib/aiPrompts.ts`
- **기능**:
  - 기본 시스템 프롬프트 (공통 정책)
  - 일반 Q&A 모드 프롬프트 (`getGeneralModePrompt`)
  - 사주풀이 모드 프롬프트 (`getSajuModePrompt`)
  - 면책 문구 (`DISCLAIMER_MESSAGE`, `SAJU_DISCLAIMER`)
- **정책**:
  - ✅ 효험/결과 보장 금지
  - ✅ 건강/법률/재정 관련 전문가 상담 권유
  - ✅ 사주 해석은 참고용임을 강조
  - ✅ 친절하고 공감하는 어조

### 5. API 엔드포인트

#### POST /api/saju/calc
- **파일**: `app/api/saju/calc/route.ts`
- **요청 Body**:
  ```typescript
  {
    "birthDate": "1991-03-15",  // YYYY-MM-DD (필수)
    "birthTime": "10:30",       // HH:mm (선택)
    "isLunar": false,           // 음력 여부
    "gender": "male"            // "male" | "female" (필수)
  }
  ```
- **응답**:
  ```typescript
  {
    "pillars": { ... },        // 사주 사기둥
    "dayMaster": { ... },      // 일간 정보
    "elementsBalance": { ... }, // 오행 균형
    "tenGodsSummary": { ... }, // 십성 요약
    "luck": { ... },           // 대운
    "birthInfo": { ... }       // 입력 정보
  }
  ```
- **검증**:
  - 필수 필드 확인 (birthDate, gender)
  - 날짜 형식 검증 (YYYY-MM-DD)
  - 시간 형식 검증 (HH:mm)
  - 성별 검증 (male/female)

#### POST /api/ai/chat
- **파일**: `app/api/ai/chat/route.ts`
- **요청 Body**:
  ```typescript
  {
    "sessionId": "session123",     // 선택 (없으면 새 세션 생성)
    "mode": "general",             // "general" | "saju" (필수)
    "placeId": "place123",         // 선택 (일반 모드)
    "sajuResult": { ... },         // 선택 (사주 모드 필수)
    "messages": [                  // 필수
      { "role": "user", "content": "..." }
    ]
  }
  ```
- **응답**:
  ```typescript
  {
    "sessionId": "session123",
    "assistantMessage": {
      "content": "...",
      "createdAt": "2024-01-01T00:00:00Z"
    },
    "usage": {
      "promptTokens": 100,
      "completionTokens": 200,
      "totalTokens": 300
    }
  }
  ```
- **동작**:
  1. 세션 ID 확인 (없으면 새 세션 생성)
  2. 모드에 따라 시스템 프롬프트 생성
     - `general`: 기도터 정보 포함
     - `saju`: 사주 결과 포함
  3. OpenAI ChatCompletion 호출 (gpt-4o-mini)
  4. 사용자 메시지 및 AI 응답 DB 저장
  5. 5번째 메시지마다 면책 문구 추가

---

## 🔑 환경변수 설정

### 필수 환경변수
```env
OPENAI_API_KEY=sk-proj-YOUR_KEY
```

### OpenAI API 키 발급 방법
1. [OpenAI Platform](https://platform.openai.com/) 가입
2. API Keys 페이지 이동
3. "Create new secret key" 클릭
4. API 키 복사 및 `.env.local` 파일에 추가

---

## 🗄️ 데이터베이스 스키마 (사용)

### AiSession (AI 세션)
- `id`, `userId`, `title`, `mode`, `startedAt`, `lastActivityAt`, `isPinned`

### AiMessage (메시지)
- `id`, `sessionId`, `senderType`, `content`, `placeId`, `metadata`, `createdAt`

### AiFeedback (피드백)
- `id`, `messageId`, `userId`, `feedback`, `comment`, `createdAt`

---

## 🎨 AI 프롬프트 정책

### 공통 정책
1. ❌ **효험/결과 보장 금지**
   - "반드시", "확실히", "100%" 등의 단정적 표현 금지
2. ⚠️ **전문가 상담 권유**
   - 건강, 법률, 재정 관련 결정은 전문가와 상담 안내
3. 📌 **참고용 정보임을 명시**
   - 사주 해석이나 기도 정보는 참고용이라는 문구 주기적 안내
4. 💬 **친절하고 공감하는 어조**
   - 존댓말 사용, 따뜻하고 친근한 어조
5. 🔬 **과학적 검증 표현**
   - "전통적으로", "민간에서는" 등의 표현 사용

### 일반 Q&A 모드
- 기도터 정보 제공 (위치, 특징, 방문 방법)
- 기도 예절 및 준비물 안내
- 사용자 고민에 공감 및 위로

### 사주풀이 모드
- 오행 균형 분석
- 십성 분석을 통한 운세 해석
- 기도터(줄) 추천:
  - 목(木) 부족 → 산신줄
  - 화(火) 부족 → 장군줄
  - 토(土) 부족 → 산신당, 토지신
  - 금(金) 부족 → 장군줄
  - 수(水) 부족 → 용궁줄
- ❌ 단정적인 미래 예언 금지

---

## 📊 사주 계산 (Mock)

### 현재 구현 (Mock)
- 생년월일 기반 간지 생성
- 오행 균형 계산
- 십성 강도 계산 (간단한 알고리즘)
- 대운 계산 (Mock)

### 실제 구현 교체 방법
1. **lunar-javascript** 라이브러리 사용:
   ```bash
   npm install lunar-javascript
   ```
2. `lib/sajuCalculator.ts`의 `calculateSaju` 함수 교체
3. 음력-양력 변환 로직 추가
4. 정확한 천간지지 계산 알고리즘 적용

### 대안
- 외부 만세력 API 사용
- 전문 명리학 라이브러리 도입

---

## 🧪 테스트 예시

### 1. 사주 계산 테스트
```bash
curl -X POST http://localhost:3000/api/saju/calc \
  -H "Content-Type: application/json" \
  -d '{
    "birthDate": "1991-03-15",
    "birthTime": "10:30",
    "isLunar": false,
    "gender": "male"
  }'
```

**예상 응답:**
```json
{
  "pillars": {
    "year": { "stem": "辛", "branch": "未" },
    "month": { "stem": "甲", "branch": "寅" },
    "day": { "stem": "丙", "branch": "子" },
    "hour": { "stem": "戊", "branch": "午" }
  },
  "dayMaster": {
    "stem": "丙",
    "element": "fire",
    "yinYang": "yang"
  },
  "elementsBalance": {
    "wood": 2,
    "fire": 3,
    "earth": 1,
    "metal": 1,
    "water": 2
  },
  "tenGodsSummary": {
    "wealth": "normal",
    "officer": "weak",
    "resource": "normal",
    "companion": "normal",
    "output": "strong"
  },
  "luck": {
    "majorLuck": [...]
  },
  "birthInfo": {
    "birthDate": "1991-03-15",
    "birthTime": "10:30",
    "isLunar": false,
    "gender": "male"
  }
}
```

### 2. AI 채팅 테스트 (일반 모드)
```bash
curl -X POST http://localhost:3000/api/ai/chat \
  -H "Content-Type: application/json" \
  -d '{
    "mode": "general",
    "placeId": "place123",
    "messages": [
      { "role": "user", "content": "이 기도터는 어떤 곳인가요?" }
    ]
  }'
```

### 3. AI 채팅 테스트 (사주 모드)
```bash
curl -X POST http://localhost:3000/api/ai/chat \
  -H "Content-Type: application/json" \
  -d '{
    "mode": "saju",
    "sajuResult": { ... },
    "messages": [
      { "role": "user", "content": "제 사주를 봐주세요" }
    ]
  }'
```

---

## 🔒 보안 & 에러 처리

### API 키 보안
- ✅ 환경변수로 관리 (`.env.local`)
- ✅ Git에 커밋 금지 (`.gitignore`)
- ✅ 서버 사이드에서만 사용

### 에러 처리
- ✅ OpenAI API 401 (인증 실패)
- ✅ OpenAI API 429 (요청 한도 초과)
- ✅ 필수 필드 검증
- ✅ 날짜/시간 형식 검증
- ✅ 세션 존재 여부 확인

### Rate Limiting (추후 구현)
- 사용자당 API 호출 제한
- Redis 기반 Rate Limiter

---

## 💡 향후 개선 사항

### 1. 사주 계산
- [ ] 실제 만세력 라이브러리 도입
- [ ] 음력-양력 변환 정확도 개선
- [ ] 세밀한 십성 분석 알고리즘

### 2. AI 기능
- [ ] 대화 히스토리 관리 (컨텍스트 유지)
- [ ] 스트리밍 응답 (Server-Sent Events)
- [ ] 멀티모달 (이미지 분석)
- [ ] Fine-tuning 모델 (당골래 전용)

### 3. 성능 최적화
- [ ] OpenAI 응답 캐싱
- [ ] Rate Limiting
- [ ] 토큰 사용량 모니터링

### 4. 사용자 경험
- [ ] 대화 히스토리 UI
- [ ] 음성 입력/출력
- [ ] 추천 질문 제공

---

## 📝 다음 단계 (Step 8~10)

- [ ] **Step 8**: 후기 시스템 구현
- [ ] **Step 9**: 관리자 페이지
- [ ] **Step 10**: Vercel 배포

---

**Step 7 완료! AI 도우미 백엔드 구현 완료** 🎉
