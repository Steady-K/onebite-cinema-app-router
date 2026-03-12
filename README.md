# 🎬 Onebite Cinema

> Next.js App Router 기반 영화 정보 검색 서비스

<br />

## 📌 프로젝트 소개

**Onebite Cinema**는 영화 목록 조회, 검색, 상세 정보, 리뷰 작성/삭제를 제공하는 서비스입니다.  
Next.js App Router의 핵심 개념인 **서버 컴포넌트, 캐시 전략, Suspense 스트리밍, Server Actions**을 직접 적용해보기 위해 제작했습니다.

- **개발 기간**: 2주 (2024.12.18 ~ 2024.12.30)
- **개발 인원**: 1인
- **배포 URL**: -

<br />

## 🛠 기술 스택

| 분류 | 기술 |
|------|------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| 스타일링 | CSS Modules |
| 배포 | Vercel |

<br />

## ✨ 주요 기능

- 영화 전체 목록 / 추천 영화 조회
- 영화 검색 (`/search?q=...`)
- 영화 상세 정보 조회 (모달 / 전체 페이지 전환)
- 리뷰 작성 및 삭제 (Server Actions)
- 스켈레톤 UI 로딩 처리

<br />

## ⚙️ 기술적 의사결정

### 페이지별 캐시 전략 차별화

데이터의 변경 빈도에 따라 fetch 캐시 전략을 다르게 적용했습니다.

| 데이터 | 캐시 전략 | 이유 |
|---|---|---|
| 전체 영화 목록 | `force-cache` | 자주 바뀌지 않는 데이터 |
| 추천 영화 | `revalidate: 600` | 10분마다 갱신 |
| 검색 결과 | `no-store` | 검색어마다 결과가 달라 캐시 불필요 |
| 리뷰 목록 | `tags: ["review-{id}"]` | 작성/삭제 시 해당 태그만 revalidate |

특히 리뷰는 `revalidateTag`를 활용해 전체 캐시를 초기화하지 않고 해당 영화의 리뷰 캐시만 선택적으로 갱신했습니다.

### Suspense 스트리밍으로 UX 개선

데이터 fetch가 완료될 때까지 페이지 전체를 블로킹하면 사용자는 빈 화면을 봐야 합니다. `Suspense`로 느린 컴포넌트를 감싸면 나머지 UI를 먼저 보여주고, 데이터가 준비되면 해당 영역만 교체됩니다.

```
페이지 진입
→ 레이아웃, 헤더 즉시 표시
→ 데이터 로딩 중인 영역은 스켈레톤 UI 표시 (fallback)
→ 데이터 준비 완료 시 실제 콘텐츠로 교체
```

검색 페이지에서는 `key={q}`를 활용해 검색어가 바뀔 때마다 Suspense가 재실행되도록 처리했습니다.

### Intercepting Route로 모달 상세 구현

목록에서 영화 카드를 클릭하면 페이지 이동 없이 모달로 상세 정보를 보여주고, URL을 직접 입력하거나 새로 고침하면 전체 페이지로 보여주는 방식을 구현했습니다.

```
목록에서 카드 클릭  → 모달로 상세 표시 (URL: /movie/[id])
URL 직접 접근       → 전체 페이지로 상세 표시 (동일 URL)
```

Next.js의 Intercepting Route(`(.)movie/[id]`)와 Parallel Routes(`@modal` 슬롯)를 조합해 구현했습니다.

### Server Actions으로 리뷰 작성/삭제

리뷰 작성과 삭제를 별도 API 라우트 없이 Server Actions으로 처리했습니다. 클라이언트에서 form action으로 직접 서버 함수를 호출하고, 완료 후 `revalidateTag`로 해당 영화의 리뷰 캐시만 갱신합니다.

<br />

## 🔥 트러블슈팅

### 검색어 변경 시 이전 결과가 그대로 남는 문제

**문제**  
검색어를 바꿔도 Suspense fallback(스켈레톤)이 다시 표시되지 않고 이전 결과가 그대로 남아 있었습니다.

**원인**  
같은 컴포넌트 트리에서 props만 바뀌면 React는 컴포넌트를 언마운트하지 않습니다. Suspense도 이미 resolved 상태여서 fallback이 재실행되지 않았습니다.

**해결**  
검색 결과 컴포넌트에 `key={q}`를 추가했습니다. `key`가 바뀌면 React가 컴포넌트를 완전히 새로 마운트하기 때문에 Suspense가 다시 fallback 상태로 돌아가고 스켈레톤 UI가 표시됩니다.

<br />

## 💭 개선하고 싶은 점

- **무한 스크롤**: 현재 전체 목록을 한 번에 불러오는 방식인데, 페이지네이션 또는 무한 스크롤로 개선하고 싶습니다.
- **즐겨찾기 기능**: 관심 영화를 저장할 수 있는 기능을 추가하고 싶습니다.

<br />

## 🚀 로컬 실행 방법

```bash
# 저장소 클론
git clone https://github.com/Steady-K/onebite-cinema-app-router.git

# 의존성 설치
npm install

# 환경 변수 설정
# .env 파일 생성 후 아래 내용 추가
NEXT_PUBLIC_API_SERVER_URL=http://localhost:12345

# 개발 서버 실행
npm run dev
```
