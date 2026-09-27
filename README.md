# 안정용 포트폴리오

물류 운영 경험과 CountHub PC·Android 앱의 구현 과정을 소개하는 정적 웹사이트입니다. HTML·CSS·JavaScript를 사용하며 별도 패키지 설치나 빌드가 필요하지 않습니다.

## 로컬 검토

```sh
node preview.mjs
```

브라우저에서 <http://127.0.0.1:4173>을 엽니다. 서버는 로컬 주소에만 바인딩하며 `dist`의 파일을 제공합니다. 변경 내용은 새로고침으로 확인할 수 있습니다.

- 메인: `/index.html`
- PC 상세: `/counthub.html`
- Android 상세: `/counthub-mobile.html`
- 특정 기능: `/counthub.html#feature-2` (입출고 파일 변환)

## 구성

- `dist/index.html`: 기존 첫 화면 + 스크린샷 프레임 → 01 소개 → 02 프로젝트 → 03 수기 → VBA → CountHub 개발 히스토리 → 04 기술 → 05 경험 → 06 연락처
- `dist/home.css`: 이전 메인 디자인을 복원한 스타일과 추가한 hero 프레임·개발 히스토리 영역
- `dist/style.css`: 현재 PC·Android 상세 페이지의 기본 스타일 (메인과 분리)
- `dist/app.js`: 드롭다운 메뉴·키보드 조작·현재 메뉴 표시
- `dist/counthub.html`, `dist/counthub-mobile.html`: 플랫폼별 상세 페이지
- `dist/counthub-tour.css`: PC를 기준으로 공유하는 상세 스타일과 Android 스마트폰 프레임
- `dist/counthub-tour.js`: 기존 PC 화면·설명 데이터, Android 4개 기능 데이터, 공통 탐색·대화상자 동작
- `dist/assets/`: 기존 PC 캡처 이미지. 경로와 파일을 유지합니다.

메인 hero에는 제공받은 CountHub 메인 화면을 넣었습니다. Android에는 제공받은 실제 캡처 8장을 연결했습니다. 이미지별 내용과 교체 위치는 [이미지 안내](docs/image-slots.md)를 참고하세요. 기존 PC의 6개 기능·29개 화면 탐색은 그대로 유지합니다.

기간과 정량 성과는 임의로 기재하지 않았습니다. 소개 및 실무 사용 여부는 본인 제공 내용을 따릅니다.

## 상세 페이지 화면 구성

PC 모니터 받침을 없애고 화면 높이에 맞춰 이미지 크기를 조절합니다. 설명과 이전·다음·처음 화면 버튼은 한 줄로 모았으며, 기능 번호와 이름도 같은 줄에 배치했습니다. Android는 넓은 화면에서 휴대폰 왼쪽·설명과 탭 오른쪽으로 구성합니다. 좁은 모바일에서는 Android 기능 탭을 목업 위로 옮기고 읽기 편한 크기를 유지하며 세로로 스크롤합니다. 화면이 하나뿐인 Android 기능은 중복 단계 행을 숨기고, 여러 화면이 추가되면 단계 선택을 표시합니다.

## 검증

```sh
node --check preview.mjs
node --check dist/app.js
node --check dist/counthub-tour.js
node --check scripts/verify.mjs
node --check scripts/audit-readability.mjs
```

로컬 서버가 실행 중이고 Playwright와 Chrome을 사용할 수 있으면 다음으로 반응형·탐색 검증을 재실행합니다. 사이트 실행에는 Playwright가 필요하지 않습니다.

```sh
node scripts/verify.mjs
node scripts/audit-readability.mjs
node scripts/verify-tour-fit.mjs
# 기존 Playwright 설치를 사용할 때
node scripts/verify.mjs "절대경로/playwright/index.mjs"
```

검증 스크립트는 1440×1000, 1024×768, 768×1024, 390×844, 360×800, 320×740 화면에서 가로 넘침·모바일 콘텐츠 순서·키보드 메뉴를 확인합니다. PC 이미지 29장 로딩과 단계 탐색, Android 4개 기능·실제 캡처 8장, 대화상자 닫기·포커스 복귀, 방향키·플랫폼 이동·기능 바로가기도 검사합니다.

`audit-readability.mjs`는 메인·상세·팝업의 본문 대비, 기기 프레임 안의 잘림, 내부 링크를 추가 검사합니다. 위와 같이 Playwright 경로를 인자로 전달할 수 있습니다. 이는 전체 접근성 인증을 대신하지 않습니다.

화면 캡처와 실행 결과는 배포 대상 밖의 `artifacts/redesign/`에 생성됩니다.

공개 연락처: https_2009@naver.com · GitHub: <https://github.com/jjinory>

배포는 기존 GitHub Pages 워크플로를 사용합니다. 검증한 변경 사항을 main 브랜치에 푸시하면 dist 폴더가 https://jjinory.github.io/ 에 게시됩니다. artifacts와 .preview 폴더는 배포 대상에서 제외합니다.

`verify-tour-fit.mjs`는 PC 30개 화면 상태와 Android 8개 상태에서 이미지·설명·기능/단계 탭의 화면 내 배치를 검사합니다. 확인 크기는 1920×1080, 1440×900, 1366×768, 1280×720, 1280×640, 1024×768입니다. Playwright 모듈 경로를 동일하게 인자로 전달할 수 있습니다.

`verify-mobile-tour.mjs`는 터치 환경을 모사하여 320·360·390·430px 세로 화면, 768px 태블릿 및 844×390 가로 화면을 검사합니다. 4개 기능 전환·팝업, 목업 내부 잘림, 기능 번호의 줄바꿈, 회전 시 탭 순서와 중복 여부를 확인합니다.

Android 바코드 변환은 기능 소개 → 그룹 추가 → 등록·수정 → 전체화면의 4단계로 구성했습니다. 카메라 입력과 모바일 전용 그룹 관리, 뒤 4자리 표시 및 바코드를 눌러 전체 번호 확인·수정, 스캐너 활용 목적을 설명하며 물류계산기에는 1,234개 = 35박스 + 낱개 9개의 예시를 담았습니다. 스마트폰 화면은 원본 1080×2520 비율을 유지하고 원본 크게 보기 링크를 제공합니다. 그룹 선택·등록 위치의 강조 테두리는 CSS로만 표시합니다.

Android 탐색은 상단의 이전·다음·처음 화면 → 기능 탭 → 해당 기능의 단계 탭 → 설명 순서로 배치합니다. 화면 수와 설명 길이가 달라져도 이동 버튼 위치는 유지됩니다. 모바일에서도 이동 버튼은 기능 선택 영역 맨 위에 있습니다. `verify-stable-navigation.mjs`는 9개 화면 크기에서 같은 포인터 좌표로 8개 화면을 왕복하여 버튼 위치가 변하지 않는지 검사합니다.
