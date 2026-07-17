(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const header = document.querySelector('.site-header');
  const menuBtn = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');

  const onScroll = () => header?.classList.toggle('scrolled', scrollY > 16);
  onScroll(); addEventListener('scroll', onScroll, {passive:true});

  menuBtn?.addEventListener('click', () => {
    const open = menuBtn.classList.toggle('open');
    nav?.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
  });
  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    menuBtn?.classList.remove('open'); nav?.classList.remove('open'); document.body.classList.remove('menu-open');
  }));
  addEventListener('keydown', e => {
    if (e.key === 'Escape') { menuBtn?.classList.remove('open'); nav?.classList.remove('open'); document.body.classList.remove('menu-open'); }
  });

  const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('in-view'); revealObserver.unobserve(entry.target); }
  }), {threshold:.12});
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX-r.left}px`);
      card.style.setProperty('--my', `${e.clientY-r.top}px`);
    });
  });

  document.querySelectorAll('[data-faq]').forEach(btn => {
    btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
    });
  });

  const tabs = [...document.querySelectorAll('.service-tab')];
  const stage = document.querySelector('[data-service-stage]');
  if (tabs.length && stage) {
    tabs.forEach(tab => tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active')); tab.classList.add('active');
      stage.animate([{opacity:.35,transform:'translateY(10px)'},{opacity:1,transform:'none'}],{duration:420,easing:'cubic-bezier(.22,1,.36,1)'});
      stage.querySelector('[data-stage-index]').textContent = tab.dataset.index;
      stage.querySelector('[data-stage-title]').textContent = tab.dataset.title;
      stage.querySelector('[data-stage-text]').textContent = tab.dataset.text;
      stage.querySelector('[data-stage-link]').href = tab.dataset.href;
    }));
  }

  const process = document.querySelector('[data-process]');
  const processFill = document.querySelector('[data-process-fill]');
  if (process && processFill) {
    const updateProcess = () => {
      const r = process.getBoundingClientRect();
      const amount = Math.max(0, Math.min(1, (innerHeight - r.top) / (innerHeight + r.height * .35)));
      if (innerWidth > 920) processFill.style.width = `${amount*100}%`;
      else processFill.style.height = `${amount*100}%`;
    };
    updateProcess(); addEventListener('scroll', updateProcess, {passive:true}); addEventListener('resize', updateProcess);
  }

  document.querySelectorAll('[data-checklist]').forEach(list => {
    const key = `pddg-checklist-${location.pathname}`;
    let saved = {};
    try { saved = JSON.parse(localStorage.getItem(key) || '{}'); } catch {}
    list.querySelectorAll('input[type=checkbox]').forEach((cb,i) => {
      cb.checked = !!saved[i];
      cb.addEventListener('change', () => {
        saved[i] = cb.checked;
        localStorage.setItem(key, JSON.stringify(saved));
        const done = Object.values(saved).filter(Boolean).length;
        const counter = document.querySelector('[data-check-count]');
        if (counter) counter.textContent = `${done} / ${list.querySelectorAll('input').length}`;
      });
    });
  });

  document.querySelectorAll('form[data-mail-form]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const status = form.querySelector('.form-status');
      const fd = new FormData(form);
      const lines = [];
      fd.forEach((value,key) => { if (String(value).trim()) lines.push(`${key}: ${value}`); });
      const subject = form.dataset.subject || 'PDDG website inquiry';
      const mailto = `mailto:Info@pddg.io?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
      if (status) status.textContent = 'Your email application is opening. This website does not store the form data.';
      location.href = mailto;
    });
  });

  if (!reduced && matchMedia('(pointer:fine)').matches) {
    const glow = document.createElement('div'); glow.className='cursor-glow'; document.body.appendChild(glow);
    addEventListener('pointermove', e => { glow.style.left=`${e.clientX}px`; glow.style.top=`${e.clientY}px`; }, {passive:true});
    document.querySelectorAll('[data-tilt]').forEach(el => {
      el.addEventListener('pointermove', e => {
        const r=el.getBoundingClientRect(); const x=(e.clientX-r.left)/r.width-.5; const y=(e.clientY-r.top)/r.height-.5;
        el.style.transform=`perspective(900px) rotateX(${-y*4}deg) rotateY(${x*5}deg)`;
      });
      el.addEventListener('pointerleave',()=>el.style.transform='');
    });
  }

  document.querySelectorAll('canvas[data-network]').forEach(canvas => {
    if (reduced) return;
    const ctx=canvas.getContext('2d'); let w=0,h=0,dpr=1,nodes=[]; let pointer={x:-999,y:-999};
    const resize=()=>{
      const r=canvas.getBoundingClientRect(); dpr=Math.min(devicePixelRatio||1,2); w=r.width;h=r.height;
      canvas.width=w*dpr;canvas.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);
      const count=Math.max(28,Math.round(w/12)); nodes=Array.from({length:count},()=>({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.24,vy:(Math.random()-.5)*.24,r:Math.random()*1.5+.7,p:Math.random()*Math.PI*2}));
    };
    new ResizeObserver(resize).observe(canvas); resize();
    canvas.addEventListener('pointermove',e=>{const r=canvas.getBoundingClientRect();pointer={x:e.clientX-r.left,y:e.clientY-r.top}});
    canvas.addEventListener('pointerleave',()=>pointer={x:-999,y:-999});
    const loop=t=>{
      ctx.clearRect(0,0,w,h);
      const cx=w/2,cy=h/2,rad=Math.min(w,h)*.46;
      nodes.forEach(n=>{
        n.x+=n.vx;n.y+=n.vy;n.p+=.015;
        const dx=n.x-cx,dy=n.y-cy,d=Math.hypot(dx,dy);
        if(d>rad){n.vx-=dx/d*.008;n.vy-=dy/d*.008}else{n.vx*=.999;n.vy*=.999}
        const pd=Math.hypot(n.x-pointer.x,n.y-pointer.y); if(pd<90){n.vx+=(n.x-pointer.x)/(pd||1)*.018;n.vy+=(n.y-pointer.y)/(pd||1)*.018}
      });
      for(let i=0;i<nodes.length;i++)for(let j=i+1;j<nodes.length;j++){
        const a=nodes[i],b=nodes[j],d=Math.hypot(a.x-b.x,a.y-b.y);
        if(d<82){ctx.strokeStyle=`rgba(44,230,209,${(1-d/82)*.16})`;ctx.lineWidth=.6;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}
      }
      nodes.forEach(n=>{
        const pulse=.6+Math.sin(n.p)*.3;ctx.fillStyle=`rgba(111,245,229,${pulse})`;ctx.beginPath();ctx.arc(n.x,n.y,n.r,0,Math.PI*2);ctx.fill();
      });
      requestAnimationFrame(loop);
    }; requestAnimationFrame(loop);
  });
})();
