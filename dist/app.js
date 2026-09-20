const stories = {
  desktop: `<h2 id="dialog-title">CountHub Desktop</h2><p>Electron 기반 입고 업무 도구 · 1인 개발 · 실무 사용 중</p><h3>시작은 매번 달라지는 엑셀 양식이었습니다.</h3><p>여러 곳에서 받는 입고 엑셀 파일의 양식이 달라, WMS 등록 양식으로 바꾸는 작업이 번거로웠습니다. 처음에는 엑셀 VBA 매크로를 사용했고, 앱으로 만들면 더 편리하게 사용할 수 있겠다는 생각으로 개발을 시작했습니다.</p><h3>파일 처리부터 공유 데이터까지</h3><ul><li>엑셀 입고 데이터를 불러오고 필요한 정보를 입력합니다.</li><li>템플릿을 활용해 입고 파일과 검수 파일을 생성합니다.</li><li>PostgreSQL DB 데이터를 활용해 직원들과 정보를 공유합니다.</li></ul><h3>구현에서 다룬 부분</h3><ul><li><strong>거래처별 양식 연결:</strong> 거래처를 선택하면 연결된 양식과 컬럼 설정을 불러와 입력 항목에 적용합니다.</li><li><strong>빠른 선택 변경 처리:</strong> 조회 요청에 순번을 두어, 뒤늦게 도착한 이전 결과가 현재 선택을 덮어쓰지 않도록 처리합니다.</li><li><strong>화면과 처리 로직의 연결:</strong> Electron IPC를 통해 화면에서 양식과 기준 데이터를 요청합니다.</li></ul><h3>직접 맡은 역할</h3><p>업무에서 필요한 기능을 정하고, AI를 활용해 앱을 100% 혼자 제작했습니다. 개인의 반복 작업을 줄이려던 시도에서 출발해 회사 직원들과 함께 사용할 수 있는 도구로 발전시켰습니다.</p><h3>현재의 결과</h3><p>현재 회사 업무에서 실제로 사용하고 있습니다. 엑셀 VBA 매크로로 처리하던 업무를 앱으로 옮기고, DB 데이터를 공유하는 사용 방식으로 확장했습니다.</p><div class="tags"><span>Electron</span><span>JavaScript</span><span>PostgreSQL</span><span>ExcelJS</span></div>`,
  mobile: `<h2 id="dialog-title">CountHub Mobile</h2><p>React Native 기반 안드로이드 앱 · 1인 개발 · 실무 사용 중</p><h3>물류 업무를 휴대폰에서도</h3><p>CountHub의 모바일 앱으로, React Native와 Expo를 사용해 제작했습니다. 품목 위치를 찾고 관리하는 기능과 물류 작업에 필요한 수량 계산 기능을 제공합니다.</p><h3>주요 기능</h3><ul><li><strong>품목찾기:</strong> 품명과 위치 검색, 품목 등록·수정, 그룹 정보 관리</li><li><strong>물류계산기:</strong> 반복수량과 들어가는 수량, 박스 입수량을 바탕으로 총수량과 박스·낱개 수량 계산</li></ul><h3>구현에서 다룬 부분</h3><ul><li><strong>수량 입력 검증:</strong> 양의 정수와 계산 가능한 범위를 확인하고, 입수량은 1~999로 제한합니다.</li><li><strong>박스·낱개 분리:</strong> 전체 수량을 입수량으로 나눈 몫과 나머지로 작업 수량을 보여줍니다.</li><li><strong>조회 결과 관리:</strong> 입수량 설정을 불러올 때 요청 순번을 확인해 오래된 응답의 반영을 방지합니다.</li></ul><h3>직접 맡은 역할</h3><p>현장에서 사용할 기능을 기획하고 AI를 활용해 안드로이드 앱을 혼자 제작했습니다. 재고와 입출고를 관리하는 실제 업무 경험을 바탕으로 필요한 기능을 구성했습니다.</p><h3>현재의 결과</h3><p>데스크톱 앱과 함께 실제 업무에 사용 중입니다. PC에서 시작한 업무 도구를 안드로이드 환경으로 확장했습니다.</p><div class="tags"><span>React Native</span><span>Expo</span><span>TypeScript</span><span>Android</span></div>`
};
const dialog = document.querySelector('#project-dialog');
document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => {
  document.querySelector('#dialog-body').innerHTML = stories[button.dataset.project];
  dialog.showModal();
  dialog.scrollTop = 0;
}));
document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});
const navLinks = [...document.querySelectorAll('nav a')];
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => {
      const active = link.hash === '#' + entry.target.id;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  });
}, { rootMargin: '-15% 0px -55% 0px' });
document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));

