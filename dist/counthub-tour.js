const slides = [
{feature:0,label:'시작',title:'매일의 물류 업무를 한곳에서.',copy:'기능 알아보기를 누르거나 오른쪽 화살표로 화면을 넘겨보세요.'},
{feature:1,label:'가입 정보',title:'가입에 필요한 정보를 입력합니다.',copy:'아이디와 비밀번호, 이름, 이메일을 입력한 뒤 이메일 인증을 진행합니다.',image:'01-form',alt:'CountHub 회원가입 정보 입력 화면'},
{feature:1,label:'인증 메일',title:'입력한 이메일로 인증번호가 도착합니다.',copy:'메일로 받은 6자리 인증번호는 10분 동안 사용할 수 있습니다.',image:'03-email',alt:'CountHub에서 실제 발송한 인증번호 메일'},
{feature:1,label:'번호 확인',title:'앱 안에서 인증번호를 확인합니다.',copy:'6자리 번호를 입력해 인증을 마치고 회원가입을 요청합니다.',image:'02-verification',alt:'앱 안의 이메일 인증번호 입력 화면'},
{feature:1,label:'관리자 승인',title:'관리자 승인 후 업무를 시작합니다.',copy:'관리자만 회원 관리 메뉴에서 가입 요청을 확인하고 승인할 수 있습니다.',image:'04-approval',alt:'관리자 전용 회원 관리 및 승인 화면'},
{feature:2,label:'파일 변환',title:'입출고 파일 변환',copy:'서로 다른 입고 엑셀 파일을 WMS 등록 등 업무에 필요한 양식으로 변환합니다.'},
{feature:3,label:'품목위치',title:'품목위치 저장·공유',copy:'품목과 보관 위치를 저장하고 직원들과 같은 데이터를 확인합니다.'},
{feature:4,label:'처리업무',title:'처리업무 공유',copy:'업무를 등록하고 시작·중단·완료 상태를 직원들과 공유합니다.'},
{feature:5,label:'일정표',title:'일정표 공유',copy:'공용 폴더를 통해 일정과 첨부파일을 함께 관리합니다.'},
{feature:6,label:'안전교육일지',title:'안전교육일지 제작',copy:'엑셀 양식과 사진을 활용해 반복해서 작성하는 문서를 만듭니다.'}
];
const names=['','이메일 인증 회원가입','입출고 파일 변환','품목위치 저장·공유','처리업무 공유','일정표 공유','안전교육일지 제작'];
let current=0;
const get=id=>document.getElementById(id);
const pageButtons=slides.map((slide,index)=>{const button=document.createElement('button');button.type='button';button.textContent=String(index+1).padStart(2,'0')+' '+slide.label;button.addEventListener('click',()=>show(index));get('tour-pages').append(button);return button;});
function show(index){current=Math.max(0,Math.min(slides.length-1,index));const slide=slides[current];get('tour-welcome').hidden=current!==0;get('tour-image').hidden=!slide.image;get('tour-summary').hidden=current===0||!!slide.image;
if(slide.image){get('tour-image').src='./assets/signup/'+slide.image+'.png';get('tour-image').alt=slide.alt;}
get('summary-number').textContent='PC FEATURE / '+String(slide.feature).padStart(2,'0');get('summary-title').textContent=slide.title;get('summary-copy').textContent=slide.copy;
get('tour-category').textContent=slide.feature?'0'+slide.feature+' / '+names[slide.feature]:'PC 기능 둘러보기';get('tour-title').textContent=slide.title;get('tour-copy').textContent=slide.copy;get('tour-counter').textContent=String(current+1).padStart(2,'0')+' / '+String(slides.length).padStart(2,'0');get('tour-prev').disabled=current===0;get('tour-next').disabled=current===slides.length-1;
pageButtons.forEach((button,i)=>{if(i===current)button.setAttribute('aria-current','step');else button.removeAttribute('aria-current');});document.querySelectorAll('.tour-feature').forEach(button=>{const active=Number(button.dataset.feature)===slide.feature;button.classList.toggle('is-current',active);if(active)button.setAttribute('aria-current','step');else button.removeAttribute('aria-current');});}
get('tour-start').addEventListener('click',()=>{show(1);get('tour-next').focus({preventScroll:true});});get('tour-prev').addEventListener('click',()=>show(current-1));get('tour-next').addEventListener('click',()=>show(current+1));
document.querySelectorAll('.tour-feature').forEach(button=>button.addEventListener('click',()=>{show(slides.findIndex(s=>s.feature===Number(button.dataset.feature)));document.querySelector('.monitor-tour').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});}));
document.addEventListener('keydown',event=>{if(event.altKey||event.ctrlKey||event.metaKey||event.shiftKey||event.target.closest('header, input, textarea, select, [contenteditable="true"]'))return;if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();show(current+(event.key==='ArrowRight'?1:-1));}});
show(0);
