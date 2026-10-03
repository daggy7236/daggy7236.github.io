const navToggle=document.querySelector('.nav-toggle');
const nav=document.querySelector('.nav');
if(navToggle&&nav){
  navToggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');navToggle.setAttribute('aria-expanded',String(open));navToggle.setAttribute('aria-label',open?'Close navigation':'Open navigation')});
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');navToggle.setAttribute('aria-expanded','false')}));
}
document.querySelectorAll('[data-whatsapp-quote]').forEach(form=>{
  form.addEventListener('submit',event=>{
    event.preventDefault();
    const data=new FormData(form);
    const message=['Hi BITO ELECTRICAL, I would like a free quote.',`Name: ${data.get('name')||''}`,`Phone: ${data.get('phone')||''}`,`Area/Suburb: ${data.get('area')||''}`,`Service: ${data.get('service')||''}`,`Details: ${data.get('message')||''}`].join('\n');
    const success=form.querySelector('.success-msg');if(success)success.classList.add('show');
    window.open(`https://wa.me/27783240147?text=${encodeURIComponent(message)}`,'_blank','noopener');
  });
});
const filterButtons=document.querySelectorAll('.gallery-filter');
const galleryItems=document.querySelectorAll('.gallery-filter-grid [data-category]');
if(filterButtons.length&&galleryItems.length){filterButtons.forEach(button=>button.addEventListener('click',()=>{const filter=button.dataset.filter;filterButtons.forEach(b=>b.classList.toggle('active',b===button));galleryItems.forEach(item=>item.classList.toggle('is-hidden',filter!=='all'&&item.dataset.category!==filter));}))}


// Client-requested interaction upgrade: 2026-08
const siteHeader=document.querySelector('.header');
const updateHeader=()=>{if(siteHeader)siteHeader.classList.toggle('is-scrolled',window.scrollY>18)};
updateHeader();window.addEventListener('scroll',updateHeader,{passive:true});

const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealTargets=[...document.querySelectorAll('.section-head,.service-card,.why-item,.split>*,.review-card,.gallery-item,.area-panel,.faq,.contact-card,.quote-form,.event-home-card,.event-visual-panel,.card,.detail-card')];
revealTargets.forEach((el,i)=>{el.classList.add('reveal'); if(el.matches('.split>*:first-child'))el.classList.add('reveal-left'); if(el.matches('.split>*:last-child'))el.classList.add('reveal-right'); el.style.transitionDelay=`${Math.min((i%4)*70,210)}ms`;});
if(reduceMotion){revealTargets.forEach(el=>el.classList.add('is-visible'));}
else if('IntersectionObserver' in window){
  const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');revealObserver.unobserve(entry.target);}}),{threshold:.12,rootMargin:'0px 0px -35px'});
  revealTargets.forEach(el=>revealObserver.observe(el));
}else{revealTargets.forEach(el=>el.classList.add('is-visible'));}

const counters=[...document.querySelectorAll('[data-counter]')];
const runCounter=el=>{
  const target=Number(el.dataset.counter||0),decimals=Number(el.dataset.decimals||0),suffix=el.dataset.suffix||'';
  if(reduceMotion){el.textContent=target.toFixed(decimals)+suffix;return;}
  const duration=1100,start=performance.now();
  const tick=now=>{const p=Math.min((now-start)/duration,1);const eased=1-Math.pow(1-p,3);const value=target*eased;el.textContent=value.toFixed(decimals)+suffix;if(p<1)requestAnimationFrame(tick);};
  requestAnimationFrame(tick);
};
if('IntersectionObserver' in window){
  const counterObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){runCounter(entry.target);counterObserver.unobserve(entry.target);}}),{threshold:.55});
  counters.forEach(el=>counterObserver.observe(el));
}else counters.forEach(runCounter);


// More electrical visual effects
const decorateElectricSection=(selector, lineCount=4, sparkCount=5)=>{
  document.querySelectorAll(selector).forEach(section=>{
    if(section.querySelector('.electric-lines')) return;
    const lines=document.createElement('div');
    lines.className='electric-lines';
    for(let i=0;i<lineCount;i++){
      const span=document.createElement('span');
      span.style.setProperty('--dur',`${5.4 + (i*0.85)}s`);
      lines.appendChild(span);
    }
    section.appendChild(lines);
    if(!reduceMotion){
      const sparks=document.createElement('div');
      sparks.className='electric-sparks';
      for(let i=0;i<sparkCount;i++){
        const span=document.createElement('span');
        span.style.setProperty('--dur',`${6.6 + (i*0.7)}s`);
        sparks.appendChild(span);
      }
      section.appendChild(sparks);
    }
  });
};

decorateElectricSection('.hero',4,5);
decorateElectricSection('.page-hero',3,4);
decorateElectricSection('.section-dark',3,4);
