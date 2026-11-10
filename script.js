const nav=document.getElementById('nav');
const menu=document.getElementById('menu');
menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.innerHTML=open?'CLOSE <b>×</b>':'MENU <b>＋</b>'});
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.innerHTML='MENU <b>＋</b>'}));
const root=document.documentElement;
document.getElementById('theme').onclick=()=>{const c=root.getAttribute('data-theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');root.setAttribute('data-theme',c==='dark'?'light':'dark')};
const orbit=document.querySelector('.orbit-art'),fine=matchMedia('(pointer:fine)').matches;
if(fine){document.addEventListener('pointermove',e=>{const x=(e.clientX/innerWidth-.5),y=(e.clientY/innerHeight-.5);orbit.style.transform=`perspective(900px) rotateY(${x*14}deg) rotateX(${-y*14}deg)`});
}
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.1});
document.querySelectorAll('.section-top,.work-heading,.project-row,.manifesto p,.manifesto-foot,.about-layout>div,.toolkit-head,.tool-grid span,.archive-layout>*,.contact>.eyebrow,.contact h2,.mail-link,.social-row a').forEach((el,i)=>{el.classList.add('rv');if(el.matches('.tool-grid span,.social-row a'))el.style.transitionDelay=(i%5)*70+'ms';io.observe(el)});

// live IST clock
const ck=document.querySelector('.announcement span:last-child');
const tick=()=>{ck.textContent='INDIA · IST '+new Date().toLocaleTimeString('en-GB',{timeZone:'Asia/Kolkata',hour:'2-digit',minute:'2-digit'})};tick();setInterval(tick,30000);
// nav highlights the section in view
const links=[...document.querySelectorAll('nav a')];
const spy=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(l=>l.classList.toggle('on',l.getAttribute('href')==='#'+e.target.id))}),{rootMargin:'-45% 0px -50% 0px'});
['work','about','contact'].forEach(id=>spy.observe(document.getElementById(id)));
// headline: letter-by-letter entrance
const h1=document.querySelector('.hero h1');h1.setAttribute('aria-label','Building what’s next.');let n=0;
(function split(el){[...el.childNodes].forEach(nd=>{if(nd.nodeType===3){const f=document.createDocumentFragment();[...nd.textContent].forEach(c=>{const s=document.createElement('span');s.className='ch';s.setAttribute('aria-hidden','true');s.style.setProperty('--i',n++);s.textContent=c;f.appendChild(s)});nd.replaceWith(f)}else if(nd.nodeType===1&&nd.tagName!=='BR')split(nd)})})(h1);
// copy email
document.getElementById('copy').onclick=async()=>{const t=document.getElementById('toast'),m='roshanzam63@gmail.com';try{await navigator.clipboard.writeText(m)}catch(e){const a=document.createElement('textarea');a.value=m;document.body.appendChild(a);a.select();try{document.execCommand('copy')}catch(_){}a.remove()}t.textContent='COPIED ✓ '+m;setTimeout(()=>t.textContent='',2400)};
