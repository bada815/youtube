# Role
당신은 Google API와 최신 웹 트렌드에 능통한 10년 경력의 시니어 프론트엔드 개발자이자 UX 디자이너입니다.

# Context
나는 현재 GitHub Pages로 호스팅 중인 정적 웹사이트(YouTube 분석 도구)를 운영 중입니다. 이 도구는 단일 HTML 파일(CSS/JS 포함)로 작동하며, 키워드 검색을 통해 경쟁 채널과 영상의 성과를 분석하는 것이 목표입니다.

# Task
다음 요구사항을 완벽하게 수행하는 **단일 HTML 파일(`index.html`)**을 작성해 주세요. 외부 라이브러리는 CDN을 통해 로드하고, 별도의 설치 없이 브라우저에서 바로 실행되어야 합니다.

# Technical Constraints & API Logic (매우 중요)
YouTube Data API v3의 특성을 고려하여 아래 로직을 엄격히 준수하세요.
1. **API 호출 최적화 (Quota 절약):**
   - `search` API로는 '영상 길이', '태그', '구독자 수', '조회수'를 알 수 없습니다.
   - **Step 1:** `search` API로 영상 ID 30개를 가져옵니다.
   - **Step 2:** 가져온 30개의 ID를 콤마(,)로 연결하여 `videos` API를 **1회 호출**합니다. (여기서 duration, tags, statistics 조회)
   - **Step 3:** `videos` 결과에서 channelId를 추출, 중복을 제거한 뒤 `channels` API를 **1회 호출**합니다. (여기서 subscriberCount 조회)
   - **Step 4:** 위 데이터를 병합(Mapping)하여 최종 리스트를 생성합니다.
2. **ISO 8601 Duration 파싱:**
   - API가 반환하는 시간 포맷(예: PT2M15S)을 '02:15' 형식으로 변환하고, 이를 기준으로 숏폼/롱폼 필터를 적용하세요.

# UI/UX & Functional Requirements
1. **API Key 관리:**
   - 상단에 API Key 입력 Input 제공 + `localStorage` 저장/로드 기능 (새로고침 시 유지).
   - API 오류(403, 400 등) 발생 시 직관적인 Alert 및 콘솔 로그 출력.
   - API 사용가능 용량 브라우저 콘솔로 출력. 
2. **검색 및 히스토리:**
   - 좌측 사이드바: 로컬 스토리지 기반 '최근 검색어' 목록 (클릭 시 재검색).
   - 메인 화면: 검색 결과 리스트 (카드형 또는 테이블형).
3. **고급 필터링 (Client-side Filtering):**
   - 데이터 로드 후 화면에서 즉시 필터링 (API 재호출 X).
   - **길이:** 숏폼(2분 미만) / 롱폼(2분 이상).
   - **날짜:** 최근 1개월 / 3개월 / 6개월 / 1년 /  2년 / 3년 / 4년/ 5년/ 6년/ 7년/ 8년/9년/ 10년/ 전체.
   - **성과 점수 (구독자 대비 조회수 %):**
     - 계산: `(조회수 / 구독자 수) * 100`
     - 5단계 필터: [10% 미만] [10~50%] [50~150%] [150~300%] [300% 이상].
4. **Design & Interaction:**
   - **Skeleton UI:** 데이터 로딩 중 유튜브 스타일의 스켈레톤 UI 표시.
   - **Dark/Light Mode:** 시스템 설정(`prefers-color-scheme`)에 따라 자동 테마 변경.
   - **AdSense:** 하단 Footer 영역에 반응형 애드센스 컨테이너 배치 (CLS 방지용 min-height 적용).
   - **SEO:** Head 태그 내 메타 태그(Description, OG Image) 포함.
   - **다국어을 지원해야합니다. 중국어, 일본어, 한국어, 영어을 변경 가능하다록 

# Code Guidelines
- HTML, CSS, Vanilla JavaScript를 하나의 파일에 작성. 
- CSS는 Flexbox/Grid를 활용하여 모바일 반응형으로 제작.
- 코드는 가독성을 위해 기능별(API 호출, UI 렌더링, 유틸리티)로 함수를 분리하고 주석을 상세히 달 것.
# Advertisement Configuration

이 프로젝트는 하단 Footer 영역에 광고 배너(Advertisement Space)를 포함하고 있습니다. 현재는 플레이스홀더(Placeholder) 형태로 구현되어 있으며, 실제 광고(Google AdSense 등)를 연동하려면 아래 절차를 따르세요.

### 광고 코드 적용 방법

1.  **`index.html` 파일 열기**
    -   텍스트 에디터(VS Code 등)로 프로젝트 폴더의 `index.html` 파일을 엽니다.

2.  **광고 영역 찾기**
    -   `id="ad-banner-container"`를 검색합니다. (약 300번 줄 근처)

3.  **플레이스홀더 교체**
    -   아래의 플레이스홀더 `div`를 삭제하고, AdSense 또는 타 광고 네트워크의 스크립트 코드로 대체하세요.

    ```html
    <!-- 변경 전 (현재 상태) -->
    <div id="ad-banner-container" class="w-full mb-8 px-4">
        <div class="max-w-7xl mx-auto h-24 border-2 ...">
            <span>Advertisement Space</span>
        </div>
    </div>

    <!-- 변경 후 (예시: 구글 애드센스) -->
    <div id="ad-banner-container" class="w-full mb-8 px-4 flex justify-center">
        <ins class="adsbygoogle"
             style="display:block"
             data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
             data-ad-slot="XXXXXXXXXX"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
        <script>
             (adsbygoogle = window.adsbygoogle || []).push({});
        </script>
    </div>
    ```

4.  **스타일 조정 (옵션)**
    -   필요에 따라 `div` 컨테이너의 클래스(`w-full`, `mb-8`, `px-4`)를 수정하여 여백이나 너비를 조정할 수 있습니다.
