# STEP 8: AI 채팅 UI + 기도터 상세 연동 ✅

## 📋 구현 내역

### 1. 재사용 가능한 컴포넌트

#### ChatBubble (`components/ai/ChatBubble.tsx`)
- **기능**:
  - 사용자/AI 메시지 말풍선 렌더링
  - 역할별 스타일 구분 (user, assistant, system)
  - 아바타 아이콘 표시 (User/Bot)
  - 타임스탬프 표시
- **스타일**:
  - 사용자 메시지: Primary 그린 배경, 우측 정렬
  - AI 메시지: 흰색 배경 + 회색 테두리, 좌측 정렬
  - 시스템 메시지: 중앙 정렬, 작은 폰트

#### SajuInputForm (`components/ai/SajuInputForm.tsx`)
- **기능**:
  - 생년월일 입력 (date input)
  - 출생 시간 입력 (time input, 선택)
  - 양력/음력 선택 (라디오 버튼)
  - 성별 선택 (라디오 버튼)
  - `/api/saju/calc` API 호출
  - 유효성 검증 및 에러 처리
- **UI**: Sparkles 아이콘, 보라색 테마 (도사줄 컬러)

#### PlaceChatDrawer (`components/ai/PlaceChatDrawer.tsx`)
- **기능**:
  - 기도터 상세 페이지용 채팅 드로어
  - 우측에서 슬라이드 인 애니메이션
  - 배경 오버레이 (클릭 시 닫기)
  - `placeId`를 포함한 채팅 세션
  - 자동 스크롤
- **UI**: 모바일/데스크탑 반응형 (최대 너비 512px)

### 2. 채팅 상태 관리 훅

#### useChatSession (`lib/useChatSession.ts`)
- **기능**:
  - 채팅 메시지 상태 관리
  - 세션 ID 관리 (새 세션/기존 세션)
  - `/api/ai/chat` API 호출
  - 로딩/에러 상태 관리
  - 메시지 전송 및 응답 처리
  - 채팅 초기화 기능
- **파라미터**:
  - `mode`: "general" | "saju"
  - `placeId`: 기도터 ID (선택)
  - `sajuResult`: 사주 결과 (선택)

### 3. /ai 페이지 전면 개편

#### 주요 기능
- ✅ 모드 선택 (일반 질문 / 사주풀이)
- ✅ 채팅 메시지 리스트 (ChatBubble 사용)
- ✅ 입력창 + 전송 버튼
- ✅ 자동 스크롤
- ✅ 로딩 상태 표시
- ✅ 에러 메시지 표시
- ✅ 면책 문구

#### 일반 모드
- 단순히 질문 입력 및 전송
- `mode="general"`로 API 호출

#### 사주풀이 모드
1. 좌측에 SajuInputForm 표시
2. 생년월일 입력 후 "사주 계산하기" 버튼
3. `/api/saju/calc` 호출하여 사주 결과 획득
4. 사주 결과를 메모리에 저장
5. 이후 메시지 전송 시 `mode="saju"`, `sajuResult` 포함
6. "초기화" 버튼으로 사주 결과 및 채팅 리셋

### 4. /places/[id] 페이지 연동

#### AI 버튼 추가
- 우측 사이드바 "당골래 AI" 카드
- "AI에게 물어보기" 버튼 클릭 시 PlaceChatDrawer 오픈

#### PlaceChatDrawer 연동
- `placeId`를 포함하여 채팅 시작
- 백엔드에서 해당 기도터 정보를 Prisma로 조회
- 시스템 프롬프트에 기도터 정보 포함
- 사용자는 해당 기도터에 대해 구체적인 질문 가능

---

## 🎨 디자인 스타일 가이드

### 말풍선 스타일
- **사용자 메시지**:
  - 배경: Primary 그린 (`#3C5F4A`)
  - 텍스트: 흰색
  - 정렬: 우측
  - Border Radius: `rounded-2xl` + `rounded-tr-sm` (우상단만 각짐)
  
- **AI 메시지**:
  - 배경: 흰색
  - 테두리: 회색 (`border-gray-200`)
  - 텍스트: 검은색 (`text-gray-900`)
  - 정렬: 좌측
  - Border Radius: `rounded-2xl` + `rounded-tl-sm` (좌상단만 각짐)

### 아바타
- **사용자**: Primary 그린 배경 + User 아이콘
- **AI**: 회색 배경 (`bg-gray-200`) + Bot 아이콘

### 모드 선택 버튼
- **일반 모드**: Primary 그린 배경 (선택 시)
- **사주 모드**: 도사줄 보라색 (`#7C4AC2`) 배경 (선택 시)

---

## 🔄 사용자 플로우

### 일반 질문 모드
```
1. /ai 페이지 접속
2. "일반 질문 모드" 선택 (기본값)
3. 채팅 입력창에 질문 입력
4. "전송" 버튼 클릭
5. AI 응답 대기
6. 응답 표시
7. 계속 대화 가능
```

### 사주풀이 모드
```
1. /ai 페이지 접속
2. "사주풀이 모드" 선택
3. 좌측 폼에 생년월일, 시간, 성별 입력
4. "사주 계산하기" 버튼 클릭
5. 사주 결과 계산 완료
6. 우측 채팅에서 질문 입력
7. AI가 사주를 바탕으로 답변
8. "초기화" 버튼으로 새로 시작 가능
```

### 기도터 상세에서 AI 질문
```
1. /places/[id] 페이지 접속
2. 우측 "AI에게 물어보기" 버튼 클릭
3. PlaceChatDrawer 오픈 (우측 슬라이드 인)
4. 해당 기도터에 대해 질문 입력
5. AI가 기도터 정보를 포함하여 답변
6. X 버튼 또는 배경 클릭으로 닫기
```

---

## 🧪 주요 기능 테스트

### ChatBubble 컴포넌트
```tsx
<ChatBubble 
  role="user" 
  content="안녕하세요" 
  timestamp="2024-01-01T12:00:00Z" 
/>
<ChatBubble 
  role="assistant" 
  content="안녕하세요! 무엇을 도와드릴까요?" 
/>
```

### useChatSession 훅
```tsx
const { messages, isLoading, sendMessage } = useChatSession({
  mode: "general",
  placeId: "place123"
});

// 메시지 전송
await sendMessage("이 기도터는 어떤 곳인가요?");
```

### PlaceChatDrawer
```tsx
<PlaceChatDrawer
  placeId="place123"
  placeName="계룡산 굿당"
  isOpen={true}
  onClose={() => setIsOpen(false)}
/>
```

---

## 📱 반응형 디자인

### 모바일 (< 768px)
- 채팅 드로어: 전체 너비
- 사주 입력 폼: 채팅 위에 배치
- 모드 선택 버튼: 세로 배치

### 태블릿/데스크탑 (>= 768px)
- 채팅 드로어: 최대 512px 너비
- 사주 입력 폼: 좌측 (1/3), 채팅: 우측 (2/3)
- 모드 선택 버튼: 가로 배치

---

## 🔒 보안 & UX

### 입력 검증
- ✅ 빈 메시지 전송 방지
- ✅ 로딩 중 중복 전송 방지
- ✅ 사주 모드에서 사주 결과 없을 때 전송 불가

### 에러 처리
- ✅ API 호출 실패 시 에러 메시지 표시
- ✅ 사용자에게 명확한 피드백 제공

### 사용성
- ✅ 자동 스크롤 (새 메시지 추가 시)
- ✅ 로딩 상태 표시 (스피너 + "답변 작성 중...")
- ✅ Enter 키로 메시지 전송
- ✅ 면책 문구 표시

---

## 💡 향후 개선 사항

### UI/UX
- [ ] 메시지 전송 애니메이션
- [ ] 타이핑 인디케이터 (실시간 애니메이션)
- [ ] 음성 입력 기능
- [ ] 다크 모드 지원
- [ ] 메시지 복사 버튼

### 기능
- [ ] 대화 히스토리 저장 (로컬 스토리지)
- [ ] 이전 대화 불러오기
- [ ] 추천 질문 버튼 (Quick Reply)
- [ ] 이미지 첨부 (기도터 사진 등)
- [ ] 음성 읽어주기 (TTS)

### 성능
- [ ] 스트리밍 응답 (Server-Sent Events)
- [ ] 무한 스크롤 (긴 대화 히스토리)
- [ ] 메시지 캐싱

---

## 📝 다음 단계 (Step 9~10)

- [ ] **Step 9**: 후기 시스템 구현
- [ ] **Step 10**: Vercel 배포

---

**Step 8 완료! AI 채팅 UI 구현 완료** 🎉
