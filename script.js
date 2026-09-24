
/* All features also work when opened directly from disk. No framework or server. */
const menu=document.querySelector('.menu'), nav=document.querySelector('#navigation');
menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',open);nav.classList.toggle('open',open);menu.textContent=open?'Close':'Menu';});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav?.classList.contains('open')){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.textContent='Menu';menu.focus();}});
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reduced && 'IntersectionObserver' in window){document.documentElement.classList.add('motion');const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.remove('pending');io.unobserve(e.target);}}),{threshold:.08});document.querySelectorAll('.reveal').forEach(el=>{el.classList.add('pending');io.observe(el);});}
let queued=false;function progress(){const max=document.documentElement.scrollHeight-innerHeight;document.querySelector('.progress').style.width=(max>0?scrollY/max*100:0)+'%';queued=false;}addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(progress);}},{passive:true});addEventListener('resize',progress);progress();
const search=document.querySelector('#search');let category='all';function filter(){let visible=0;const query=(search?.value||'').toLowerCase();document.querySelectorAll('.pub').forEach(p=>{const show=(category==='all'||p.dataset.type===category)&&p.textContent.toLowerCase().includes(query);p.hidden=!show;if(show)visible++;});const empty=document.querySelector('#empty'),count=document.querySelector('#result-count');if(empty)empty.hidden=visible>0;if(count)count.textContent=visible+' item'+(visible===1?'':'s')+' shown';}
search?.addEventListener('input',filter);document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{category=b.dataset.filter;document.querySelectorAll('[data-filter]').forEach(x=>x.setAttribute('aria-pressed',x===b));filter();}));
document.querySelectorAll('[data-copy]').forEach(b=>b.addEventListener('click',async()=>{const value=document.getElementById(b.dataset.copy).textContent;const status=b.parentElement.querySelector('.status');try{if(!navigator.clipboard)throw Error();await navigator.clipboard.writeText(value);status.textContent='Citation copied.';}catch{const range=document.createRange();range.selectNodeContents(document.getElementById(b.dataset.copy));const selection=getSelection();selection.removeAllRanges();selection.addRange(range);status.textContent='Citation selected. Use your device’s Copy command.';}}));
document.querySelector('[data-print]')?.addEventListener('click',()=>window.print());
const cvButtons=document.querySelectorAll('[data-cv-filter]');
cvButtons.forEach(button=>button.addEventListener('click',()=>{
 const selected=button.dataset.cvFilter;
 cvButtons.forEach(item=>item.setAttribute('aria-pressed',item===button));
 document.querySelectorAll('[data-cv-section]').forEach(section=>section.hidden=selected!=='all'&&section.dataset.cvSection!==selected);
 const status=document.querySelector('#cv-filter-status');
 if(status)status.textContent=selected==='all'?'Showing all CV sections':'Showing '+button.textContent.trim();
}));


// Color mode: respect a saved choice, otherwise follow the device preference.
const themeButton=document.querySelector('.theme-toggle');
const savedTheme=localStorage.getItem('camp-signal-theme');
const systemDark=matchMedia('(prefers-color-scheme: dark)').matches;
function setTheme(theme,persist=false){
 document.documentElement.dataset.theme=theme;
 if(persist)localStorage.setItem('camp-signal-theme',theme);
 if(themeButton){
  const dark=theme==='dark';
  themeButton.querySelector('.theme-icon').textContent=dark?'☀':'☾';
  themeButton.querySelector('.theme-label').textContent=dark?'Light':'Dark';
  themeButton.setAttribute('aria-label',dark?'Switch to light mode':'Switch to dark mode');
 }
}
setTheme(savedTheme|| (systemDark?'dark':'light'));
themeButton?.addEventListener('click',()=>setTheme(document.documentElement.dataset.theme==='dark'?'light':'dark',true));

// Lightweight homepage site search. Results point to the relevant page/section.
const siteSearch=document.querySelector('#site-search');
const siteSearchResults=document.querySelector('#site-search-results');
const siteIndex=[
 {title:'Research',url:'research.html',text:'research chatbots conversational ai culture cross-cultural communication anthropology hci privacy accessibility projects questions methods'},
 {title:'Publications',url:'publications.html',text:'publications papers articles cscw chi prism autism generative ai chatbot persuasion privacy education research papers'},
 {title:'CV',url:'cv.html',text:'cv curriculum vitae education experience awards service teaching presentations skills computer science anthropology byu'},
 {title:'About Katie',url:'index.html#profile',text:'about katie klabacka biography background anthropology computer science social technology privacy lab byu hci'},
 {title:'Recent work',url:'index.html#main',text:'recent news papers projects workshop cscw prism privacy research generative ai'},
 {title:'Contact',url:'index.html#contact',text:'contact email linkedin scholar get in touch collaborate'}
];
function renderSiteSearch(){
 if(!siteSearch||!siteSearchResults)return;
 const q=siteSearch.value.trim().toLowerCase();
 if(!q){siteSearchResults.innerHTML='<p class="search-hint">Search across Katie’s research, publications, CV, and background.</p>';return;}
 const words=q.split(/\s+/).filter(Boolean);
 const hits=siteIndex.filter(item=>words.every(word=>(item.title+' '+item.text).toLowerCase().includes(word)));
 siteSearchResults.innerHTML=hits.length?hits.map(item=>`<a class="site-result" href="${item.url}"><span>${item.title}</span><span aria-hidden="true">↗</span></a>`).join(''):'<p class="search-hint">No exact match. Try “research,” “privacy,” “chatbots,” “publications,” or “CV.”</p>';
}
siteSearch?.addEventListener('input',renderSiteSearch);
document.addEventListener('keydown',e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'&&siteSearch){e.preventDefault();siteSearch.focus();}});
