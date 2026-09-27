const slides = [
{feature:0,label:'시작',title:'기능 알아보기를 눌러 PC 업무 기능을 살펴보세요.',copy:'기능 알아보기를 누르거나 오른쪽 화살표로 화면을 넘겨보세요.'},
{feature:1,label:'가입 정보',title:'가입 정보를 입력하고 이메일 인증을 시작합니다.',copy:'아이디와 비밀번호, 이름, 이메일을 입력한 뒤 이메일 인증을 진행합니다.',image:'01-form',alt:'CountHub 회원가입 정보 입력 화면'},
{feature:1,label:'인증 메일',title:'이메일로 받은 6자리 인증번호는 10분 동안 유효합니다.',copy:'메일로 받은 6자리 인증번호는 10분 동안 사용할 수 있습니다.',image:'03-email',alt:'CountHub에서 실제 발송한 인증번호 메일'},
{feature:1,label:'번호 확인',title:'앱에서 인증번호를 확인한 뒤 회원가입을 요청합니다.',copy:'6자리 번호를 입력해 인증을 마치고 회원가입을 요청합니다.',image:'02-verification',alt:'앱 안의 이메일 인증번호 입력 화면'},
{feature:1,label:'관리자 승인',title:'관리자 전용 메뉴에서 가입 요청을 승인하면 업무를 시작할 수 있습니다.',copy:'관리자만 회원 관리 메뉴에서 가입 요청을 확인하고 승인할 수 있습니다.',image:'04-approval',alt:'관리자 전용 회원 관리 및 승인 화면'},
{feature:2,intro:true,label:'기능 진입',image:'00-entry',imageFolder:'conversion',alt:'CountHub 메인 화면에서 입출고 메뉴 위치를 표시한 화면',title:'메인 화면에서 입출고를 선택해 파일 변환을 시작합니다.',copy:''},
{feature:2,label:'기준정보 설정',image:'01-reference',imageFolder:'conversion',alt:'CountHub 입출고 파일 변환 — 기준정보 설정 화면',title:'설정 버튼에서 셀러·상품구분·쇼핑몰·양식지를 등록하고 관리합니다.',copy:'설정 → DB: 변환 화면에서 사용할 기준정보를 추가하고 목록 순서를 정합니다.'},
{feature:2,label:'양식지 컬럼',image:'02-columns',imageFolder:'conversion',alt:'CountHub 입출고 파일 변환 — 양식지 컬럼 화면',title:'양식지마다 상품명·수량·SKU 등이 들어 있는 엑셀 열을 지정합니다.',copy:'설정 → 양식지 컬럼: SKU, 상품명, 유통기한, LOT, 입고예정수량의 열 위치를 연결합니다.'},
{feature:2,label:'셀러별 양식',image:'03-seller-form',imageFolder:'conversion',alt:'CountHub 입출고 파일 변환 — 셀러별 양식 화면',title:'셀러별 기본 양식지를 연결해 셀러 선택 시 자동으로 불러옵니다.',copy:'설정 → 셀러-양식지: 거래처마다 사용할 양식을 지정하고 필요하면 연결을 해제합니다.'},
{feature:2,label:'기본 템플릿',image:'04-templates',imageFolder:'conversion',alt:'CountHub 입출고 파일 변환 — 기본 템플릿 화면',title:'입고·검수·거래명세서에 사용할 기본 엑셀 양식을 등록합니다.',copy:'설정 → 템플릿 기본양식: 입고파일, 입고검수, 거래명세서, 출고검수 양식을 클릭하거나 드래그해 등록합니다.'},
{feature:2,label:'입·출고지 관리',image:'05-locations',imageFolder:'conversion',alt:'CountHub 입출고 파일 변환 — 입·출고지 관리 화면',title:'입·출고지의 이름·주소·담당자·전화번호를 등록하고 수정합니다.',copy:'설정 → 입/출고지 관리: 입고와 출고에서 사용할 장소 정보를 저장하고 검색합니다.'},
{feature:2,label:'파일 준비',image:'06-source',imageFolder:'conversion',alt:'CountHub 입출고 파일 변환 — 파일 준비 화면',title:'양식이 서로 다른 거래처의 입출고 엑셀 파일을 준비합니다.',copy:'거래처마다 다른 엑셀 파일을 업무에 맞는 양식으로 정리하는 과정입니다.'},
{feature:2,label:'양식 변환',image:'07-convert',imageFolder:'conversion',alt:'CountHub 입출고 파일 변환 — 양식 변환 화면',title:'엑셀 데이터를 WMS 등록 등 업무에 필요한 양식으로 변환합니다.',copy:'반복해서 정리하던 엑셀 데이터를 WMS 등록 등 필요한 양식으로 바꿉니다.'},
{feature:2,label:'결과 활용',image:'08-results',imageFolder:'conversion',alt:'CountHub 입출고 파일 변환 — 결과 활용 화면',title:'변환 결과를 확인하고 입출고 전산 등록에 활용합니다.',copy:'변환 결과를 확인하고 입출고 전산 등록 작업에 활용합니다.'},
{feature:3,intro:true,label:'기능 진입',image:'00-entry',imageFolder:'schedule',alt:'CountHub 메인 화면의 일정표 메뉴 위치',title:'메인 화면에서 일정표를 선택해 공유 일정을 확인합니다.',copy:''},
{feature:3,label:'공용폴더 선택',image:'01-folder',imageFolder:'schedule',alt:'일정표의 공용 폴더 선택 버튼',title:'직원들과 같은 일정을 사용할 공용 폴더를 선택합니다.',copy:'일정과 첨부파일을 함께 관리할 공용 폴더를 연결합니다.'},
{feature:3,label:'일정 등록',image:'02-register',imageFolder:'schedule',alt:'일정 등록 창의 날짜·셀러·엑셀 첨부·메모 입력 화면',title:'날짜와 일정 내용을 입력하고 필요한 엑셀 파일을 첨부해 저장합니다.',copy:'업무 일정과 관련 자료를 함께 등록합니다.'},
{feature:3,label:'일정 공유',image:'03-share',imageFolder:'schedule',alt:'공유 일정표에서 등록된 일정과 첨부파일을 확인하는 화면',title:'공용 폴더에 저장된 일정과 첨부파일을 직원들과 함께 확인합니다.',copy:'등록한 일정을 일정표에서 선택해 상세 내용을 확인합니다.'},
{feature:4,intro:true,label:'기능 진입',image:'00-entry',imageFolder:'item-location',alt:'CountHub 메인 화면에서 품목 위치 메뉴를 표시한 화면',title:'메인 화면에서 품목 위치를 선택해 보관 위치를 관리합니다.',copy:''},
{feature:4,label:'품목등록',image:'01-register',imageFolder:'item-location',alt:'품목 등록 창의 품명·그룹·위치·메모 입력 화면',title:'품명과 그룹, 보관 위치, 메모를 입력해 품목을 등록합니다.',copy:'품목과 보관 위치 정보를 등록합니다.'},
{feature:4,label:'공유',image:'02-share',imageFolder:'item-location',alt:'등록된 품목과 위치가 직원들과 공유되는 목록 화면',title:'등록한 품목과 보관 위치를 직원들과 함께 확인합니다.',copy:'저장한 품목위치를 직원들과 공유합니다.'},
{feature:4,label:'품목찾기',image:'03-search',imageFolder:'item-location',alt:'품명 일부를 검색해 해당 품목의 보관 위치를 찾는 화면',title:'품명의 일부를 검색해 필요한 품목의 보관 위치를 찾습니다.',copy:'공유된 품목 정보에서 필요한 보관 위치를 검색합니다.'},
{feature:5,intro:true,label:'기능 진입',image:'00-entry',imageFolder:'tasks',alt:'CountHub 메인 화면의 처리업무 메뉴 위치',title:'메인 화면에서 처리업무를 선택해 직원들과 업무를 공유합니다.',copy:''},
{feature:5,label:'업무등록',image:'01-register',imageFolder:'tasks',alt:'처리업무 등록 창의 업무내용과 중요도 입력 화면',title:'업무내용과 중요도를 입력해 함께 처리할 업무를 등록합니다.',copy:'처리할 업무의 내용과 중요도를 정해 저장합니다.'},
{feature:5,label:'업무공유',image:'02-share',imageFolder:'tasks',alt:'등록한 업무가 직원들과 공유되는 처리업무 목록',title:'등록한 업무를 직원들과 공유하고 목록에서 함께 확인합니다.',copy:'등록한 업무를 공통 목록에서 확인합니다.'},
{feature:5,label:'진행상태 확인',image:'03-status',imageFolder:'tasks',alt:'작업 중인 업무의 진행상태와 작업자를 표시하는 화면',title:'업무별 진행상태와 작업자를 확인해 누가 처리 중인지 파악합니다.',copy:'직원들이 업무의 진행 상황과 작업자를 함께 확인합니다.'},
{"feature":6,"intro":true,"label":"기능 진입","image":"00-entry","imageFolder":"safety-journal","alt":"CountHub 메인 화면의 안전교육일지 메뉴 위치","title":"메인 화면에서 안전교육일지를 선택해 교육일지 제작을 시작합니다.","copy":""},
{"feature":6,"label":"사진첨부","image":"01-photos","imageFolder":"safety-journal","alt":"안전교육일지에 교육 사진 두 장을 첨부하는 화면","title":"교육 사진 두 장을 첨부하고 위치와 크기를 조절합니다.","copy":""},
{"feature":6,"label":"정보작성","image":"02-info","imageFolder":"safety-journal","alt":"안전교육일지의 교육 날짜와 인원 입력 화면","title":"교육 날짜와 인원을 입력한 뒤 엑셀 만들기를 선택합니다.","copy":""},
{"feature":6,"label":"일지제작","image":"03-output","imageFolder":"safety-journal","alt":"등록된 엑셀 양식과 교육 정보 및 사진이 반영된 안전교육일지 비교","title":"등록된 엑셀 양식에 교육 정보와 사진을 반영해 안전교육일지를 제작합니다.","copy":""}
];
const names=['','이메일 인증 회원가입','입출고 파일 변환','일정표 공유','품목위치 저장·공유','처리업무 공유','안전교육일지 제작'];
let current=0;
const get=id=>document.getElementById(id);
const groups=document.createElement('div');groups.className='tour-groups';groups.setAttribute('aria-label','PC 주요 기능');
const steps=document.createElement('div');steps.className='tour-steps';steps.setAttribute('aria-label','선택한 기능의 단계');
const home=document.createElement('button');home.type='button';home.className='tour-home';home.textContent='처음 화면';home.addEventListener('click',()=>show(0));
get('tour-pages').append(groups,steps,home);
const groupButtons=names.slice(1).map((name,i)=>{const button=document.createElement('button');button.type='button';button.innerHTML='<span>0'+(i+1)+'</span>'+name;button.addEventListener('click',()=>show(slides.findIndex(s=>s.feature===i+1)));groups.append(button);return button;});
let renderedFeature=-1;let stepButtons=[];
function updatePages(slide){
 groupButtons.forEach((button,i)=>{if(i+1===slide.feature)button.setAttribute('aria-current','true');else button.removeAttribute('aria-current');});
 if(renderedFeature!==slide.feature){renderedFeature=slide.feature;steps.replaceChildren();stepButtons=[];
  if(!slide.feature){const hint=document.createElement('p');hint.textContent='기능을 선택하면 아래에 단계가 펼쳐집니다.';steps.append(hint);}
  else{const label=document.createElement('span');label.className='tour-steps-label';label.textContent='진행 단계';steps.append(label);slides.forEach((s,index)=>{if(s.feature!==slide.feature||s.intro)return;const button=document.createElement('button');button.type='button';button.textContent=(stepButtons.length+1)+'. '+s.label;button.addEventListener('click',()=>show(index));steps.append(button);stepButtons.push({button,index});});}
 }
 stepButtons.forEach(({button,index})=>{if(index===current)button.setAttribute('aria-current','step');else button.removeAttribute('aria-current');});
}
function show(index){current=Math.max(0,Math.min(slides.length-1,index));const slide=slides[current];get('tour-welcome').hidden=current!==0;get('tour-image').toggleAttribute('hidden',!slide.image);get('tour-summary').hidden=current===0||!!slide.image;
if(slide.image){get('tour-image').src='./assets/'+(slide.imageFolder||'signup')+'/'+slide.image+'.jpg';get('tour-image').alt=slide.alt;}
get('summary-number').textContent='PC FEATURE / '+String(slide.feature).padStart(2,'0');get('summary-title').textContent=slide.title;get('summary-copy').textContent=slide.copy;
get('tour-category').textContent=slide.feature?'0'+slide.feature+' / '+names[slide.feature]:'PC 기능 둘러보기';get('tour-title').textContent=slide.title;const featureSlides=slides.filter(s=>s.feature===slide.feature&&!s.intro);get('tour-counter').textContent=slide.intro?'0'+slide.feature+' 기능 · 시작 안내':slide.feature?'0'+slide.feature+' 기능 · '+(featureSlides.indexOf(slide)+1)+' / '+featureSlides.length+' 단계':'PC / 06 FEATURES';get('tour-prev').disabled=current===0;get('tour-next').disabled=current===slides.length-1;
updatePages(slide);document.querySelectorAll('.tour-feature').forEach(button=>{const active=Number(button.dataset.feature)===slide.feature;button.classList.toggle('is-current',active);if(active)button.setAttribute('aria-current','step');else button.removeAttribute('aria-current');});}
get('tour-start').addEventListener('click',()=>{show(1);get('tour-next').focus({preventScroll:true});});get('tour-prev').addEventListener('click',()=>show(current-1));get('tour-next').addEventListener('click',()=>show(current+1));
const development=[
{stack:['Electron','Supabase Auth','Edge Functions API'],copy:'앱에서 이메일 인증번호 발송·확인 API를 호출합니다. 서버에서 인증 여부를 검증하고, 가입 요청과 관리자 승인을 나누어 처리했습니다.'},
{stack:['JavaScript','ExcelJS','XLSX'],copy:'설정 화면에서 거래처별 엑셀 열 위치와 기본 양식을 지정하고, 셀러 선택 시 연결된 양식을 불러오도록 구현했습니다. 등록한 템플릿으로 결과 파일을 생성하며, 기준정보와 입·출고지 정보도 관리할 수 있습니다.'},
{stack:['Node.js','파일 시스템','Electron IPC'],copy:'공용 폴더에 일정과 첨부파일을 저장해 직원들과 공유합니다. 화면의 요청을 Electron 메인 프로세스로 전달하고 파일을 읽고 저장하도록 구성했습니다.'},
{stack:['PostgreSQL','Edge Functions API','Electron'],copy:'품목과 위치 정보를 데이터베이스에 저장하고 API로 조회·등록·수정합니다. PC와 Android가 같은 정보를 공유하도록 연결했습니다.'},
{stack:['PostgreSQL','Edge Functions API','JavaScript'],copy:'처리업무를 등록하고 시작·중단·완료 상태를 API로 관리합니다. 직원들이 PC와 Android에서 같은 업무 현황을 확인할 수 있게 구현했습니다.'},
{stack:['JSZip','XML','Node.js'],copy:'엑셀 양식 내부의 XML과 이미지 데이터를 처리해 안전교육일지를 만듭니다. 기존 양식에 필요한 내용과 사진을 반영하는 반복 문서 작성 기능을 구현했습니다.'}
];
const devDialog=get('dev-dialog');let devTrigger;
document.querySelectorAll('.tour-feature').forEach(button=>button.addEventListener('click',()=>{const feature=Number(button.dataset.feature);const detail=development[feature-1];devTrigger=button;get('dev-number').textContent='PC / DEVELOPMENT 0'+feature;get('dev-title').textContent=names[feature];get('dev-copy').textContent=detail.copy;get('dev-stack').replaceChildren(...detail.stack.map(name=>{const badge=document.createElement('span');badge.textContent=name;return badge;}));devDialog.showModal();}));
get('dev-close').addEventListener('click',()=>devDialog.close());
devDialog.addEventListener('click',event=>{if(event.target!==devDialog)return;const rect=devDialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)devDialog.close();});
devDialog.addEventListener('close',()=>devTrigger?.focus({preventScroll:true}));
document.addEventListener('keydown',event=>{if(devDialog.open||event.altKey||event.ctrlKey||event.metaKey||event.shiftKey||event.target.closest('header, input, textarea, select, [contenteditable="true"]'))return;if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();show(current+(event.key==='ArrowRight'?1:-1));}});
show(0);
