# 안정용 포트폴리오

GitHub Pages에 배포하는 정적 포트폴리오입니다. 별도 패키지 설치, 앱 서버, DB가 필요하지 않습니다.

## 로컬 미리보기

`node preview.mjs` 실행 후 http://127.0.0.1:4173 에서 확인합니다.

## 수정

- `dist/index.html`: 소개, 프로젝트, 기술, 경험
- `dist/style.css`: 디자인과 반응형 구성
- `dist/app.js`: 프로젝트 상세 내용 및 인터랙션

현재 프로젝트 이미지는 실제 화면 캡처가 아닌 기능/업무 흐름을 설명하는 도식입니다. 이름과 회사명, 실무 사용 여부 및 1인 제작 내용은 본인 제공 정보를 바탕으로 작성했습니다. 기간, 정량 성과 등 미확인 정보는 기재하지 않았습니다.

## GitHub Pages 배포

1. 본인 GitHub 계정에 포트폴리오용 공개 저장소를 만듭니다. CountHub 원본 프로젝트는 업로드하지 않습니다.
2. 이 폴더의 파일을 `main` 브랜치에 업로드합니다. `.github/workflows/pages.yml`도 포함합니다.
3. 저장소 Settings → Pages → Build and deployment → Source를 **GitHub Actions**로 설정합니다.
4. Actions에서 **Deploy portfolio to GitHub Pages**를 실행합니다. 이후 main 브랜치 변경 시 자동 배포됩니다.
5. 완료되면 Pages 설정에 표시되는 주소를 사용합니다. 일반 저장소는 `https://계정명.github.io/저장소명/`, `계정명.github.io`라는 이름의 저장소는 `https://계정명.github.io/`입니다.

공개 연락처: https_2009@naver.com / GitHub: https://github.com/jjinory. 게시 전 공개 콘텐츠와 회사 관련 설명을 검토합니다.



## 프로젝트 소개 구성

메인에는 CountHub 카드 한 개를 표시합니다. 카드를 선택하면 PC의 6개 기능과 모바일의 4개 기능, API 공유 설명이 요약 창에 표시됩니다. 기능 구현 자세히보기는 준비 중 표시만 제공하며 사진 및 상세 페이지는 추후 작업 범위입니다.

기존 상세 설명은 docs/project-details-draft.json에 보관합니다. 이 파일은 공개 웹사이트 배포 대상(dist)에 포함되지 않습니다.

