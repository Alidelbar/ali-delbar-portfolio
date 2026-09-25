
const root = document.documentElement;
const langBtn = document.getElementById('langSwitch');
function setLang(lang){
  const fa=lang==='fa';
  root.lang=lang; root.dir=fa?'rtl':'ltr';
  langBtn.textContent=fa?'EN':'FA';
  document.querySelectorAll('[data-fa][data-en]').forEach(el=>el.textContent=el.getAttribute(fa?'data-fa':'data-en'));
  localStorage.setItem('ali-v4-lang',lang);
}
langBtn.addEventListener('click',()=>setLang(root.lang==='fa'?'en':'fa'));
setLang(localStorage.getItem('ali-v4-lang')||'fa');

const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}
  });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const progress=document.getElementById('progress');
window.addEventListener('scroll',()=>{
  const h=document.documentElement.scrollHeight-innerHeight;
  progress.style.transform=`scaleX(${h>0?scrollY/h:0})`;
});

document.querySelectorAll('.magnetic').forEach(el=>{
  el.addEventListener('pointermove',e=>{
    const r=el.getBoundingClientRect(),x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;
    el.style.transform=`translate(${x*.08}px,${y*.08}px)`;
  });
  el.addEventListener('pointerleave',()=>el.style.transform='translate(0,0)');
});

const stage=document.getElementById('zarpayStage');
if(stage){
  stage.addEventListener('pointermove',e=>{
    const r=stage.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
    stage.style.transform=`translate(${x*10}px,${y*8}px)`;
  });
  stage.addEventListener('pointerleave',()=>stage.style.transform='translate(0,0)');
}
