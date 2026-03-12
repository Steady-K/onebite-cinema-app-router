# ONEBITE CINEMA (App Router)

영화 목록/추천/검색/상세 조회와 리뷰 작성·삭제를 제공하는 **Next.js App Router** 예제 프로젝트입니다.  
특히 **Suspense 기반 스트리밍 렌더링**, **스켈레톤 UI**, **라우트 캐시 전략(force-cache / revalidate / tag revalidate)**, **Intercepting Route 모달**, **Parallel Routes 데모**를 코드로 확인할 수 있습니다.

## 기술 스택

- **Framework**: Next.js (`16.0.10`) / App Router
- **UI**: React (`19.2.1`)
- **Language**: TypeScript
- **Lint**: ESLint

## 주요 기능

- **영화 목록/추천**
  - 전체 영화: `fetch(..., { cache: "force-cache" })`
  - 추천 영화: `fetch(..., { next: { revalidate: 60 * 10 } })`
- **검색**
  - `q` 쿼리로 검색 (`/search?q=...`)
  - `Suspense` + `key={q}`로 검색어 변경 시 스트리밍 재실행
- **영화 상세**
  - `/movie/[id]` 동적 라우트
  - 404 시 `notFound()` 처리 (`src/app/not-found.tsx`)
- **리뷰 작성/삭제 (Server Actions)**
  - 작성: `src/actions/create-review.action.ts`
  - 삭제: `src/actions/delete-review.action.ts`
  - 리뷰 목록 fetch는 `next: { tags: ["review-${movieId}"] }`
  - 작성/삭제 후 `revalidateTag("review-${movieId}")`로 목록 갱신
- **모달 상세 보기 (Intercepting Route)**
  - `src/app/@modal/(.)movie/[id]/page.tsx`에서 상세 페이지를 모달로 감싸 렌더링
  - 루트 레이아웃에서 `modal` 슬롯 + `#modal-root`로 포탈 렌더링
- **Parallel Routes 데모**
  - `src/app/parallel` 하위에서 `@sidebar` 슬롯을 포함하는 예제

## 라우트 구조(요약)

- **홈(영화 목록/추천)**: `src/app/(with-searchbar)/page.tsx`
- **검색**: `src/app/(with-searchbar)/search/page.tsx`
- **상세**: `src/app/movie/[id]/page.tsx`
- **모달 슬롯**
  - 기본: `src/app/@modal/default.tsx` (null)
  - 인터셉트 상세: `src/app/@modal/(.)movie/[id]/page.tsx`

## 스트리밍(Suspense) & 스켈레톤 UI

- **검색바 스트리밍**: `src/app/(with-searchbar)/layout.tsx`에서 `<Suspense fallback="Loading...">`
- **리스트 스켈레톤**: `src/components/skeleton/*`
  - 홈: 추천/전체 섹션 각각 다른 count/variant로 fallback 제공
  - 검색: 검색 결과 로딩 중 fallback 제공

## 환경 변수

`.env`에 API 서버 주소가 필요합니다.

```bash
NEXT_PUBLIC_API_SERVER_URL=http://localhost:12345
```

> 로컬에서 바로 따라하려면 `.env.example`을 복사해 `.env`를 만들어 주세요.

## API 요구사항(프론트에서 사용하는 엔드포인트)

이 앱은 아래 REST 엔드포인트를 호출합니다. (백엔드는 별도)

- **Movie**
  - `GET /movie` (전체 목록)
  - `GET /movie/random` (추천 목록)
  - `GET /movie/search?q=...` (검색)
  - `GET /movie/:id` (상세)
- **Review**
  - `GET /review/movie/:movieId` (영화별 리뷰 목록)
  - `POST /review` (리뷰 생성: `{ movieId, content, author }`)
  - `DELETE /review/:reviewId` (리뷰 삭제)

## 로컬 실행 방법

```bash
# 1) 설치
npm install

# 2) 환경변수 설정
cp .env.example .env

# 3) 실행
npm run dev
```

브라우저에서 `http://localhost:3000` 접속.

## 커밋 메시지 컨벤션(프로젝트 스타일)

이 레포는 대체로 아래 형태로 커밋 메시지를 작성하고 있습니다.

- **형식**: `<type>(optional-scope): <subject>`
- **예시**
  - `feat(ui): implement Suspense streaming and skeleton UI for index and search pages`
  - `feat(cache): enable full route cache for app router`

### 참고 커밋 메시지(사용자 제공)

- `feat(nextjs): initialize App Router and set up index, search, and dynamic movie routes`
- `feat(search): add Searchbar component`
- `feat(UI) : add index, search, movie-detail page UI`
- `feat(data-fetching): apply page-specific cache strategies for movies`
- `feat(cache): enable full route cache for app router`
- `feat(streaming): add loading.tsx to apply streaming on search page`
- `feat(ui): implement Suspense streaming and skeleton UI for index and search pages`
- `feat(ui): make movie skeleton UI responsive`
- `feat(review) : add review fetch and render logic`
- `feat:Day17 mission`
