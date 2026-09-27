# 실제 이미지 안내

메인 hero는 제공받은 CountHub 메인 화면을 `dist/assets/portfolio/counthub-main.jpg`에 저장했습니다. 3번 개발 히스토리는 `dist/assets/history/`의 수기 문서·VBA·CountHub SVG를 사용합니다. PC 상세의 기존 이미지 파일과 경로는 유지했습니다.

## Android 실제 캡처

제공받은 PNG 8장을 원본 그대로 `dist/assets/android/`에 복사했습니다. 별도로 필요한 이미지는 없습니다.

| 전달 순서 | 파일 | 화면과 설명 |
| --- | --- | --- |
| 1 | home.png | 로그인 후 홈, 네 기능과 하단 탭 |
| 2 | item-location.png | 품목 검색, 위치·그룹 확인, PC 연동 |
| 3 | barcode-overview.png | 모바일 전용 Code128 바코드와 그룹 관리 |
| 4 | barcode-group.png | 예시그룹 추가, 등록 전 빈 목록 |
| 5 | barcode-register.png | 두 바코드 등록 결과, 뒤 4자리(5181·4884) 표시, 누르면 전체 번호 확인·수정 |
| 6 | barcode-fullscreen.png | 스캔하기 어려운 상품을 위한 전체화면, 아래 숫자는 번호의 뒤 4자리 |
| 7 | calculator.png | 1,234건 × 1개, 박스당 35개 → 35박스 + 낱개 9개 |
| 8 | tasks.png | 중요도, 나의업무, 등록·작업시작·처리완료 |

기존 기능 번호와 바로가기를 유지했습니다: `#feature-1` 품목찾기, `#feature-2` 처리업무, `#feature-3` 바코드 변환, `#feature-4` 물류계산기. 바코드만 네 단계로 구성되며 화면이 하나인 기능은 중복 단계 행을 숨깁니다.

## 이미지·설명 교체

`dist/counthub-tour.js`의 `androidSlides`에서 각 화면의 `imageSrc`(경로), `alt`(대체 설명), `label`(단계 이름), `title`, `copy`, `note`를 수정합니다. 이미지는 세로 1080×2520(3:7)이며 `object-fit: contain`으로 전체를 표시합니다. 원본 크게 보기 링크도 현재 화면과 함께 갱신됩니다.

`focus`의 `left/top/width/height`는 이미지 기준 백분율입니다. 그룹 선택과 입력란을 강조하는 테두리는 CSS 요소로 겹쳐 표시하며 원본 파일은 수정하지 않습니다. 바코드 전체화면에는 테두리를 추가하지 않습니다.

## 메인 이미지 교체

전달받은 이미지를 `dist/assets/portfolio/counthub-main.jpg`에 저장하고 `dist/index.html`의 `data-image-slot="hero-main"` 안에 있는 이미지의 크기·대체 설명·캐시 버전을 갱신합니다. 현재 메인 이미지는 가로 1600×1000(16:10)입니다.
