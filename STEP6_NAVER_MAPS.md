# STEP 6: 네이버 지도 연동 완료 ✅

## 📋 구현 내역

### 1. 네이버 지도 스크립트 로딩 훅
- **파일**: `lib/useNaverMapScript.ts`
- **기능**: 
  - 네이버 Maps JS API v3 동적 로드
  - `NEXT_PUBLIC_NAVER_MAP_CLIENT_ID` 환경변수 사용
  - 로딩/에러 상태 관리
  - 중복 로드 방지
  - SSR 안전 처리

### 2. 네이버 지도 유틸리티 함수
- **파일**: `lib/naverMapUtils.ts`
- **함수**:
  - `generateNaverMapUrl()`: 네이버 지도 웹 URL 생성
  - `generateNaverMapAppScheme()`: 네이버 지도 앱 딥링크 생성
  - `calculateDistance()`: Haversine formula로 거리 계산
  - `calculateCenter()`: 여러 좌표의 중심점 계산

### 3. 지도 컴포넌트

#### MapView (전체 지도 + 마커)
- **파일**: `components/map/MapView.tsx`
- **기능**:
  - 여러 기도터를 지도에 마커로 표시
  - 마커 클릭 시 이벤트 핸들링
  - 선택된 장소 강조 표시 (색상 변경)
  - 필터/검색 시 마커 동적 업데이트
  - 줌/팬 컨트롤
  - 로딩/에러 상태 UI

#### PlaceDetailMap (상세 페이지 미니맵)
- **파일**: `components/map/PlaceDetailMap.tsx`
- **기능**:
  - 단일 기도터 위치 표시
  - 정보 윈도우 자동 표시
  - "네이버 지도에서 보기" 버튼
  - "앱에서 열기" 버튼 (모바일)
  - 앱 미설치 시 웹으로 폴백

### 4. 페이지 연동

#### /map 페이지
- **파일**: `app/map/page.tsx`
- **업데이트**:
  - MapView 컴포넌트 통합
  - 좌측 리스트 ↔ 우측 지도 양방향 연동
  - 리스트 아이템 클릭 시 지도 중심 이동
  - 마커 클릭 시 리스트 아이템 강조
  - 검색/필터 적용 시 지도 업데이트
  - Mock 데이터에 좌표 추가 (latitude, longitude)

#### /places/[id] 상세 페이지
- **파일**: `app/places/[id]/page.tsx`
- **업데이트**:
  - PlaceDetailMap 컴포넌트 추가
  - 기도터 좌표가 있을 때만 지도 표시
  - 위치 섹션에 지도 + 버튼 UI

### 5. 타입 정의 업데이트
- **파일**: `types/place.ts`
- **변경**:
  - `PlaceListItem`에 `latitude`, `longitude` 추가 (optional)
  - 지도 표시를 위한 좌표 데이터 포함

### 6. API 업데이트
- **파일**: `app/api/places/route.ts`
- **변경**:
  - Prisma select에 `latitude`, `longitude` 추가
  - 응답 데이터에 좌표 포함

### 7. 환경변수 설정
- **파일**: `.env.local.example`
- **추가**:
  - `NEXT_PUBLIC_NAVER_MAP_CLIENT_ID` 설정 예시
  - 네이버 클라우드 플랫폼 링크

---

## 🔑 네이버 지도 API 키 발급 방법

1. [네이버 클라우드 플랫폼](https://www.ncloud.com/) 가입
2. Console > Services > AI·NAVER API > Maps
3. Application 등록
4. Client ID 발급 받기
5. `.env.local` 파일에 추가:
   ```env
   NEXT_PUBLIC_NAVER_MAP_CLIENT_ID=YOUR_CLIENT_ID
   ```

---

## 🗺️ 주요 기능

### /map 페이지
- ✅ 전국 기도터를 지도에 마커로 표시
- ✅ 줄(용궁줄, 산신줄, 장군줄, 도사줄) 필터링
- ✅ 검색어로 기도터 필터링
- ✅ 좌측 리스트 클릭 → 지도 센터 이동
- ✅ 마커 클릭 → 리스트 아이템 강조
- ✅ 선택된 기도터 마커 색상 변경
- ✅ 반응형 디자인 (모바일/데스크탑)

### /places/[id] 상세 페이지
- ✅ 기도터 위치를 미니맵으로 표시
- ✅ 정보 윈도우 자동 표시 (이름, 주소)
- ✅ "네이버 지도에서 보기" 버튼 (새 탭)
- ✅ "앱에서 열기" 버튼 (모바일, 앱 미설치 시 웹)

---

## 🎨 지도 마커 디자인

### 일반 마커
- 색상: `#2080C0` (용궁줄 블루)
- 아이콘: 📿 (기도 염주)
- 물방울 모양 (50% 50% 50% 0 border-radius)

### 선택된 마커
- 색상: `#3C5F4A` (Primary 그린)
- 아이콘: 📿
- 크기 동일

### 상세 페이지 마커
- 색상: `#3C5F4A` (Primary 그린)
- 아이콘: 🙏 (기도하는 손)
- 크기: 40x40px (일반보다 큼)

---

## 📱 네이버 지도 앱 연동

### 웹 URL
```typescript
https://map.naver.com/v5/entry/place?lat={lat}&lng={lng}&title={name}
```

### 앱 스킴 (딥링크)
```typescript
nmap://place?lat={lat}&lng={lng}&name={name}
```

### 폴백 처리
앱이 설치되지 않은 경우 3초 후 웹 URL로 자동 리다이렉트

---

## 🛠️ 개발 시 주의사항

### 1. SSR 문제 해결
- 모든 지도 컴포넌트는 `"use client"` 필수
- `window`, `naver` 객체 접근 시 `typeof window !== "undefined"` 체크

### 2. 스크립트 로딩 순서
- 지도 생성 전 `isLoaded` 상태 확인 필수
- useEffect 내에서 지도 초기화

### 3. 마커 메모리 관리
- 컴포넌트 언마운트 시 `map.destroy()` 호출
- 마커 업데이트 시 기존 마커 제거 (`marker.setMap(null)`)

### 4. 환경변수
- `NEXT_PUBLIC_` 접두사 필수 (클라이언트에서 접근)
- `.env.local` 파일은 Git에 커밋하지 않음

---

## 📊 Mock 데이터 (개발용)

```typescript
const MOCK_MAP_PLACES: PlaceListItem[] = [
    {
        id: "1",
        name: "계룡산 굿당",
        latitude: 36.3484,
        longitude: 127.2175,
        // ...
    },
    // ...
];
```

**실제 배포 시**: 데이터베이스에 좌표 데이터 삽입 필요

---

## 🚀 다음 단계 (Step 7~9)

- [ ] Step 7: 후기 시스템 구현
- [ ] Step 8: 관리자 페이지 (기도터 등록/수정)
- [ ] Step 9: Vercel 배포

---

## 📝 테스트 체크리스트

- [x] 네이버 지도 API 키 발급
- [x] `.env.local` 파일 생성 및 키 설정
- [x] `/map` 페이지 지도 렌더링
- [x] 마커 클릭 이벤트
- [x] 리스트-지도 연동
- [x] 필터/검색 시 마커 업데이트
- [x] `/places/[id]` 미니맵 표시
- [x] "네이버 지도에서 보기" 버튼 동작
- [x] 모바일 반응형 확인

---

**Step 6 완료! 네이버 지도 연동 성공** 🎉
