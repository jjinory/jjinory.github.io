const stories = {
  "desktop": "<h2 id=\"dialog-title\">CountHub PC</h2><p>Electron 기반 물류 업무 앱 · 1인 개발 · 실무 사용 중</p><h3>VBA 매크로에서 함께 쓰는 앱으로</h3><p>월드비즈에서 재고·입출고·인원·일정을 관리하며, 거래처마다 다른 입고 엑셀 파일을 WMS 등록 양식으로 바꾸는 일을 반복했습니다. VBA 매크로를 사용하다 더 편리한 도구를 만들기 위해 직접 앱 개발을 시작했습니다.</p><h3>업무에 맞춰 확장한 기능</h3><ul><li><strong>이메일 인증 회원가입</strong><p>이메일 인증을 완료한 뒤 계정을 만드는 회원가입 시스템을 구현했습니다. 직원들이 각자의 계정으로 앱을 이용할 수 있습니다.</p></li><li><strong>입출고 파일 변환</strong><p>거래처마다 다른 엑셀 파일을 업무에 필요한 등록 양식으로 변환합니다. VBA 매크로로 시작한 작업을 앱으로 옮겨, 입출고 파일 처리를 한곳에서 할 수 있게 만들었습니다.</p></li><li><strong>품목위치 저장·공유</strong><p>품목명과 위치 정보를 저장하고 직원들과 공유합니다. PC와 모바일의 품목찾기가 같은 데이터를 사용해 현장에서도 정보를 확인하고 관리할 수 있습니다.</p></li><li><strong>처리업무 공유</strong><p>처리할 업무를 등록하고 직원들과 함께 확인합니다. 작업 시작·중단·완료 상태를 관리하며, 모바일에서도 같은 처리업무를 확인하고 사용할 수 있습니다.</p></li><li><strong>일정표 공유</strong><p>입출고 일정과 업무 일정을 함께 관리합니다. 같은 공용 폴더를 연결한 PC끼리 일정과 첨부파일을 공유해 업무 계획을 확인할 수 있습니다.</p></li><li><strong>안전교육일지 제작</strong><p>반복해서 작성하는 안전교육일지를 앱에서 쉽게 만듭니다. 기존 엑셀 양식을 활용하고 교육 사진을 넣어 일지 파일을 저장하도록 구성했습니다.</p></li></ul><h3>구현에서 다룬 부분</h3><ul><li><strong>이메일 인증 확인:</strong> 인증된 이메일과 인증 정보의 만료 여부를 확인한 뒤 가입 요청을 처리합니다.</li><li><strong>거래처별 양식 연결:</strong> 거래처의 양식과 컬럼 설정을 불러와 입력 항목에 적용합니다. 이전 조회 결과가 현재 선택을 덮어쓰지 않도록 요청 순번을 확인합니다.</li><li><strong>안전교육일지 양식 처리:</strong> 엑셀 양식의 셀과 사진 영역 구조를 확인하고, 교육 사진을 반영해 일지 파일을 생성합니다.</li></ul><h3>API로 연결한 인증과 업무 데이터</h3><p>Supabase Edge Functions의 인증 API로 이메일 인증·회원가입을 요청하고, 데이터 API로 업무 데이터를 조회·변경합니다. 데이터 요청에 로그인 토큰을 전달하며, 데이터가 변경되면 이전 조회 결과를 재사용하지 않도록 처리했습니다.</p><h3>직접 맡은 역할과 사용</h3><p>현장의 요구사항을 정하고 AI를 활용해 혼자 제작했습니다. 개인의 반복 작업 개선에서 출발해 직원들과 데이터·업무·일정을 공유하는 도구로 확장했으며, 현재 실제 회사 업무에 사용 중입니다.</p><div class=\"tags\"><span>Electron</span><span>JavaScript</span><span>PostgreSQL</span><span>ExcelJS</span><span>JSZip</span></div>",
  "mobile": "<h2 id=\"dialog-title\">CountHub Mobile</h2><p>React Native 기반 안드로이드 앱 · 1인 개발 · 실무 사용 중</p><h3>PC와 현장을 연결하는 앱</h3><p>PC의 품목찾기와 처리업무를 휴대폰에서도 같은 데이터로 사용할 수 있도록 만들었습니다. 현장 업무에 실질적으로 도움이 될 것이라 생각한 바코드 변환과 물류계산기도 직접 개발해 사용하고 있습니다.</p><h3>PC와 공유하는 기능</h3><ul><li><strong>품목찾기</strong><p>PC와 같은 품목위치 데이터를 사용합니다. 휴대폰으로 품명과 위치를 검색하고, 현장에서 품목 정보를 등록·수정할 수 있습니다.</p></li><li><strong>처리업무</strong><p>PC에 연결된 처리업무를 모바일에서도 확인하고 관리합니다. 해야 할 일을 등록하고 작업 상태를 공유해 사무실과 현장의 업무를 이어줍니다.</p></li></ul><h3>현장을 위해 더한 기능</h3><ul><li><strong>바코드 변환</strong><p>문자와 숫자를 바코드로 변환해 휴대폰 화면에 표시합니다. 바코드를 그룹별로 저장하고 불러올 수 있어, 현장에서 필요할 때 바로 사용할 수 있습니다.</p></li><li><strong>물류계산기</strong><p>반복수량·작업당 수량·박스 입수량으로 필요한 총수량을 계산합니다. 박스와 낱개 수량으로 나눠 보여주어 현장 작업에 활용하고 있습니다.</p></li></ul><h3>구현에서 다룬 부분</h3><ul><li><strong>처리업무 관리:</strong> 업무 등록과 수정, 작업 상태 관리 기능을 모바일 화면에서 제공합니다.</li><li><strong>바코드 관리:</strong> 문자·숫자와 기본 기호를 바코드로 변환하고, 그룹별로 저장한 바코드를 불러옵니다.</li><li><strong>수량 입력 검증:</strong> 양의 정수와 계산 가능한 범위를 확인하고 입수량을 1~999로 제한합니다. 전체 수량을 입수량으로 나눈 몫과 나머지로 박스·낱개 수량을 표시합니다.</li></ul><h3>PC와 같은 데이터를 사용하는 API 연동</h3><p>Supabase Edge Functions의 모바일 REST API를 호출해 품목위치와 처리업무를 조회·변경합니다. GET·POST·PUT·DELETE 등의 HTTP 메서드와 JSON을 사용하고, 응답 상태를 확인해 오류를 안내합니다. PC와 모바일이 공통 업무 데이터를 이용하도록 연결했습니다.</p><h3>직접 맡은 역할과 사용</h3><p>물류 실무 경험을 바탕으로 기능을 정하고, AI를 활용해 안드로이드 앱을 혼자 제작했습니다. PC와 연결되는 공유 기능과 현장 전용 도구 모두 실제 업무에 사용하고 있습니다.</p><div class=\"tags\"><span>React Native</span><span>Expo</span><span>TypeScript</span><span>Android</span></div>"
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

