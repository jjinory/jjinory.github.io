const slides = [
{feature:0,label:'시작',title:'매일의 물류 업무를 한곳에서.',copy:'기능 알아보기를 누르거나 오른쪽 화살표로 화면을 넘겨보세요.'},
{feature:1,label:'가입 정보',title:'가입에 필요한 정보를 입력합니다.',copy:'아이디와 비밀번호, 이름, 이메일을 입력한 뒤 이메일 인증을 진행합니다.',image:'01-form',alt:'CountHub 회원가입 정보 입력 화면'},
{feature:1,label:'인증 메일',title:'입력한 이메일로 인증번호가 도착합니다.',copy:'메일로 받은 6자리 인증번호는 10분 동안 사용할 수 있습니다.',image:'03-email',alt:'CountHub에서 실제 발송한 인증번호 메일'},
{feature:1,label:'번호 확인',title:'앱 안에서 인증번호를 확인합니다.',copy:'6자리 번호를 입력해 인증을 마치고 회원가입을 요청합니다.',image:'02-verification',alt:'앱 안의 이메일 인증번호 입력 화면'},
{feature:1,label:'관리자 승인',title:'관리자 승인 후 업무를 시작합니다.',copy:'관리자만 회원 관리 메뉴에서 가입 요청을 확인하고 승인할 수 있습니다.',image:'04-approval',alt:'관리자 전용 회원 관리 및 승인 화면'},
{feature:2,label:'파일 준비',title:'변환할 입출고 파일을 준비합니다.',copy:'거래처마다 다른 엑셀 파일을 업무에 맞는 양식으로 정리하는 과정입니다.'},
{feature:2,label:'양식 변환',title:'업무에 필요한 양식으로 변환합니다.',copy:'반복해서 정리하던 엑셀 데이터를 WMS 등록 등 필요한 양식으로 바꿉니다.'},
{feature:2,label:'결과 활용',title:'변환한 파일을 업무에 사용합니다.',copy:'변환 결과를 확인하고 입출고 전산 등록 작업에 활용합니다.'},
{feature:3,label:'품목 찾기',title:'찾으려는 품목을 확인합니다.',copy:'직원들과 공유하는 품목위치 데이터에서 필요한 품목을 찾습니다.'},
{feature:3,label:'위치 등록',title:'품목의 보관 위치를 기록합니다.',copy:'품목과 위치 정보를 등록하거나 변경된 내용을 수정합니다.'},
{feature:3,label:'직원과 공유',title:'같은 위치 정보를 함께 확인합니다.',copy:'저장한 품목위치를 PC와 Android에서 함께 사용합니다.'},
{feature:4,label:'업무 등록',title:'함께 처리할 업무를 등록합니다.',copy:'직원들이 확인할 수 있도록 처리할 업무를 공유합니다.'},
{feature:4,label:'진행 상태',title:'업무 진행 상태를 관리합니다.',copy:'작업 상황에 따라 시작·중단·완료 상태를 변경합니다.'},
{feature:4,label:'공유 확인',title:'동료의 업무 현황을 확인합니다.',copy:'PC와 Android에서 같은 처리업무와 상태를 확인합니다.'},
{feature:5,label:'일정 등록',title:'함께 확인할 일정을 등록합니다.',copy:'직원들과 공유할 업무 일정을 일정표에 기록합니다.'},
{feature:5,label:'자료 첨부',title:'일정에 필요한 자료를 함께 관리합니다.',copy:'일정과 관련된 첨부파일을 함께 공유합니다.'},
{feature:5,label:'일정 공유',title:'공용 폴더로 일정을 공유합니다.',copy:'직원들이 함께 사용하는 폴더를 통해 일정과 자료를 확인합니다.'},
{feature:6,label:'양식 준비',title:'안전교육일지 양식을 준비합니다.',copy:'반복 작성하는 안전교육일지를 엑셀 양식으로 제작하는 과정입니다.'},
{feature:6,label:'사진 활용',title:'교육 사진을 문서에 활용합니다.',copy:'교육일지에 필요한 사진을 준비해 문서 작성에 활용합니다.'},
{feature:6,label:'일지 제작',title:'안전교육일지를 제작합니다.',copy:'엑셀 양식과 사진으로 반복 문서를 작성합니다.'}
];
const names=['','이메일 인증 회원가입','입출고 파일 변환','품목위치 저장·공유','처리업무 공유','일정표 공유','안전교육일지 제작'];
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
  else{const label=document.createElement('span');label.className='tour-steps-label';label.textContent='진행 단계';steps.append(label);slides.forEach((s,index)=>{if(s.feature!==slide.feature)return;const button=document.createElement('button');button.type='button';button.textContent=(stepButtons.length+1)+'. '+s.label;button.addEventListener('click',()=>show(index));steps.append(button);stepButtons.push({button,index});});}
 }
 stepButtons.forEach(({button,index})=>{if(index===current)button.setAttribute('aria-current','step');else button.removeAttribute('aria-current');});
}
function show(index){current=Math.max(0,Math.min(slides.length-1,index));const slide=slides[current];get('tour-welcome').hidden=current!==0;get('tour-image').hidden=!slide.image;get('tour-summary').hidden=current===0||!!slide.image;
if(slide.image){get('tour-image').src='./assets/signup/'+slide.image+'.png';get('tour-image').alt=slide.alt;}
get('summary-number').textContent='PC FEATURE / '+String(slide.feature).padStart(2,'0');get('summary-title').textContent=slide.title;get('summary-copy').textContent=slide.copy;
get('tour-category').textContent=slide.feature?'0'+slide.feature+' / '+names[slide.feature]:'PC 기능 둘러보기';get('tour-title').textContent=slide.title;get('tour-copy').textContent=slide.copy;const featureSlides=slides.filter(s=>s.feature===slide.feature);get('tour-counter').textContent=slide.feature?'0'+slide.feature+' 기능 · '+(featureSlides.indexOf(slide)+1)+' / '+featureSlides.length+' 단계':'PC / 06 FEATURES';get('tour-prev').disabled=current===0;get('tour-next').disabled=current===slides.length-1;
updatePages(slide);document.querySelectorAll('.tour-feature').forEach(button=>{const active=Number(button.dataset.feature)===slide.feature;button.classList.toggle('is-current',active);if(active)button.setAttribute('aria-current','step');else button.removeAttribute('aria-current');});}
get('tour-start').addEventListener('click',()=>{show(1);get('tour-next').focus({preventScroll:true});});get('tour-prev').addEventListener('click',()=>show(current-1));get('tour-next').addEventListener('click',()=>show(current+1));
const development=[
{stack:['Electron','Supabase Auth','Edge Functions API'],copy:'앱에서 이메일 인증번호 발송·확인 API를 호출합니다. 서버에서 인증 여부를 검증하고, 가입 요청과 관리자 승인을 나누어 처리했습니다.'},
{stack:['JavaScript','ExcelJS','XLSX'],copy:'엑셀 파일을 읽어 업무 양식에 맞게 데이터를 정리하고 결과 파일을 생성합니다. 거래처마다 다른 양식을 반복해서 수작업으로 바꾸는 과정을 줄였습니다.'},
{stack:['PostgreSQL','Edge Functions API','Electron'],copy:'품목과 위치 정보를 데이터베이스에 저장하고 API로 조회·등록·수정합니다. PC와 Android가 같은 정보를 공유하도록 연결했습니다.'},
{stack:['PostgreSQL','Edge Functions API','JavaScript'],copy:'처리업무를 등록하고 시작·중단·완료 상태를 API로 관리합니다. 직원들이 PC와 Android에서 같은 업무 현황을 확인할 수 있게 구현했습니다.'},
{stack:['Node.js','파일 시스템','Electron IPC'],copy:'공용 폴더에 일정과 첨부파일을 저장해 직원들과 공유합니다. 화면의 요청을 Electron 메인 프로세스로 전달하고 파일을 읽고 저장하도록 구성했습니다.'},
{stack:['JSZip','XML','Node.js'],copy:'엑셀 양식 내부의 XML과 이미지 데이터를 처리해 안전교육일지를 만듭니다. 기존 양식에 필요한 내용과 사진을 반영하는 반복 문서 작성 기능을 구현했습니다.'}
];
const devDialog=get('dev-dialog');let devTrigger;
document.querySelectorAll('.tour-feature').forEach(button=>button.addEventListener('click',()=>{const feature=Number(button.dataset.feature);const detail=development[feature-1];devTrigger=button;get('dev-number').textContent='PC / DEVELOPMENT 0'+feature;get('dev-title').textContent=names[feature];get('dev-copy').textContent=detail.copy;get('dev-stack').replaceChildren(...detail.stack.map(name=>{const badge=document.createElement('span');badge.textContent=name;return badge;}));devDialog.showModal();}));
get('dev-close').addEventListener('click',()=>devDialog.close());
devDialog.addEventListener('click',event=>{if(event.target!==devDialog)return;const rect=devDialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)devDialog.close();});
devDialog.addEventListener('close',()=>devTrigger?.focus({preventScroll:true}));
document.addEventListener('keydown',event=>{if(devDialog.open||event.altKey||event.ctrlKey||event.metaKey||event.shiftKey||event.target.closest('header, input, textarea, select, [contenteditable="true"]'))return;if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();show(current+(event.key==='ArrowRight'?1:-1));}});
show(0);
