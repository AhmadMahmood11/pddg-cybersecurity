/**
 * PDDG premium motion system
 * Stack: vanilla JavaScript + GSAP 3 + ScrollTrigger + Lenis.
 * Every effect is guarded so the website remains usable if a CDN is unavailable.
 */
(() => {
  'use strict';

  const root = document.documentElement;
  const body = document.body;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;
  const compactViewport = window.matchMedia('(max-width: 760px)').matches;
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  root.classList.toggle('reduced-motion', reducedMotion);

  /* --------------------------------------------------------------------------
   * 01. Global navigation, progress indicator, and accessible mobile menu
   * -------------------------------------------------------------------------- */
  const header = $('.site-header');
  const menuButton = $('.menu-toggle');
  const nav = $('.nav');
  const progressBar = $('.scroll-progress i');

  const updateChrome = () => {
    const y = window.scrollY || document.documentElement.scrollTop;
    header?.classList.toggle('scrolled', y > 18);
    header?.classList.toggle('header-compact', y > 140);

    if (progressBar) {
      const scrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      progressBar.style.transform = `scaleX(${Math.min(1, Math.max(0, y / scrollable))})`;
    }
  };

  updateChrome();
  window.addEventListener('scroll', updateChrome, { passive: true });
  window.addEventListener('resize', updateChrome, { passive: true });

  const closeMenu = () => {
    menuButton?.classList.remove('open');
    nav?.classList.remove('open');
    body.classList.remove('menu-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  };

  menuButton?.addEventListener('click', () => {
    const open = !menuButton.classList.contains('open');
    menuButton.classList.toggle('open', open);
    nav?.classList.toggle('open', open);
    body.classList.toggle('menu-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
  });

  nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  /* --------------------------------------------------------------------------
   * 02. Lenis smooth scrolling, synchronized with GSAP ScrollTrigger
   * Disabled for reduced-motion users and compact touch-first screens.
   * -------------------------------------------------------------------------- */
  let lenis = null;
  const canUseLenis = !reducedMotion && !compactViewport && typeof window.Lenis === 'function';
  const hasGSAP = typeof window.gsap !== 'undefined';
  const hasScrollTrigger = typeof window.ScrollTrigger !== 'undefined';

  if (canUseLenis) {
    lenis = new window.Lenis({
      duration: 1.05,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1,
      anchors: { offset: -92 },
    });

    if (hasGSAP && hasScrollTrigger) {
      lenis.on('scroll', window.ScrollTrigger.update);
      window.gsap.ticker.add((time) => lenis.raf(time * 1000));
      window.gsap.ticker.lagSmoothing(0);
    } else {
      const raf = (time) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    }
  }

  /* --------------------------------------------------------------------------
   * 03. Cinematic page entrance and GSAP hero timeline
   * -------------------------------------------------------------------------- */
  const initializeGSAP = () => {
    if (!hasGSAP || !hasScrollTrigger || reducedMotion) {
      root.classList.add('motion-fallback');
      // Keep real values visible when animation is unavailable or intentionally reduced.
      $$('[data-count]').forEach((counter) => { counter.textContent = counter.dataset.count || counter.textContent; });
      return;
    }

    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);
    root.classList.add('motion-ready');

    // Hero load sequence: eyebrow, title, line, CTA, then the visual system.
    const hero = $('[data-hero]');
    if (hero) {
      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
      timeline
        .from(hero.querySelector('.eyebrow'), { autoAlpha: 0, y: 18, duration: 0.55 })
        .from(hero.querySelector('[data-hero-title]'), { autoAlpha: 0, y: 46, filter: 'blur(8px)', duration: 0.9 }, '-=0.24')
        .from(hero.querySelector('[data-hero-lede]'), { autoAlpha: 0, y: 24, duration: 0.68 }, '-=0.52')
        .from(hero.querySelectorAll('.button-row .btn'), { autoAlpha: 0, y: 18, stagger: 0.1, duration: 0.55 }, '-=0.38')
        .from(hero.querySelector('[data-hero-visual]'), { autoAlpha: 0, scale: 0.94, x: 30, duration: 1.05 }, '-=0.72')
        .from(hero.querySelectorAll('.orbit-label, .signal-stat'), { autoAlpha: 0, scale: 0.9, stagger: 0.08, duration: 0.45 }, '-=0.55');
    }

    // Scroll-triggered reveal batches. Grouping creates a refined card-by-card stagger.
    const reveals = $$('.reveal').filter((element) => !element.closest('[data-hero]'));
    gsap.set(reveals, { autoAlpha: 0, y: 30 });
    ScrollTrigger.batch(reveals, {
      start: 'top 88%',
      once: true,
      interval: 0.08,
      batchMax: 5,
      onEnter: (batch) => gsap.to(batch, {
        autoAlpha: 1,
        y: 0,
        duration: 0.76,
        stagger: 0.09,
        ease: 'power3.out',
        overwrite: true,
      }),
    });

    // Groups that do not already carry the reveal class still animate as one composition.
    $$('[data-gsap-group]').forEach((group) => {
      const children = [...group.children].filter((child) => !child.classList.contains('reveal'));
      if (!children.length) return;
      gsap.from(children, {
        scrollTrigger: { trigger: group, start: 'top 86%', once: true },
        autoAlpha: 0,
        y: 26,
        stagger: 0.075,
        duration: 0.7,
        ease: 'power3.out',
      });
    });

    // Slow, GPU-friendly depth movement for visual layers.
    if (!compactViewport) {
      $$('[data-parallax]').forEach((element) => {
        const amount = Number(element.dataset.parallax || -5);
        gsap.to(element, {
          yPercent: amount,
          ease: 'none',
          scrollTrigger: {
            trigger: element.closest('[data-parallax-root]') || element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.1,
          },
        });
      });

      $$('[data-parallax-shell]').forEach((element, index) => {
        gsap.to(element, {
          backgroundPosition: `${index % 2 ? 56 : 44}% ${index % 2 ? 40 : 62}%`,
          ease: 'none',
          scrollTrigger: { trigger: element, start: 'top bottom', end: 'bottom top', scrub: 1.4 },
        });
      });
    }

    // Animated SVG line drawing when icon groups enter the viewport.
    $$('[data-svg-motion]').forEach((svg) => {
      const drawable = $$('path, circle, rect, line, polyline, polygon', svg);
      drawable.forEach((shape) => {
        if (typeof shape.getTotalLength !== 'function') return;
        let length = 0;
        try { length = shape.getTotalLength(); } catch { return; }
        if (!Number.isFinite(length) || length <= 0) return;
        gsap.set(shape, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(shape, {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: { trigger: svg, start: 'top 90%', once: true },
        });
      });
    });

    // Count up numeric report data when the assessment preview becomes visible.
    $$('[data-count]').forEach((counter) => {
      const destination = Number(counter.dataset.count || 0);
      counter.textContent = '0';
      const state = { value: 0 };
      gsap.to(state, {
        value: destination,
        duration: 1.35,
        ease: 'power2.out',
        scrollTrigger: { trigger: counter, start: 'top 92%', once: true },
        onUpdate: () => { counter.textContent = String(Math.round(state.value)); },
      });
    });

    // Report bars animate after the counters, revealing prioritization visually.
    $$('.risk-bar i').forEach((bar) => {
      const finalWidth = bar.style.width || '0%';
      gsap.fromTo(bar, { width: '0%' }, {
        width: finalWidth,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: bar, start: 'top 92%', once: true },
      });
    });

    // Ambient icon motion is subtle and pauses naturally when ScrollTrigger is inactive.
    $$('[data-icon-motion] .icon-box, .credential img').forEach((icon, index) => {
      gsap.to(icon, {
        y: index % 2 ? 4 : -4,
        rotate: index % 2 ? 1.5 : -1.5,
        duration: 2.8 + (index % 4) * 0.35,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: (index % 6) * 0.12,
      });
    });

    ScrollTrigger.refresh();
  };

  // Defer until external scripts marked `defer` have executed.
  window.addEventListener('DOMContentLoaded', initializeGSAP, { once: true });

  /* --------------------------------------------------------------------------
   * 04. Magnetic buttons and premium card/icon micro-interactions
   * -------------------------------------------------------------------------- */
  if (!reducedMotion && finePointer) {
    $$('[data-magnetic]').forEach((button) => {
      button.addEventListener('pointermove', (event) => {
        const bounds = button.getBoundingClientRect();
        const x = event.clientX - bounds.left - bounds.width / 2;
        const y = event.clientY - bounds.top - bounds.height / 2;
        if (hasGSAP) {
          window.gsap.to(button, { x: x * 0.14, y: y * 0.18, duration: 0.28, ease: 'power2.out' });
        } else {
          button.style.transform = `translate(${x * 0.08}px, ${y * 0.1}px)`;
        }
      });
      button.addEventListener('pointerleave', () => {
        if (hasGSAP) window.gsap.to(button, { x: 0, y: 0, duration: 0.55, ease: 'elastic.out(1, .45)' });
        else button.style.transform = '';
      });
    });

    $$('[data-card-motion]').forEach((card) => {
      card.addEventListener('pointermove', (event) => {
        const bounds = card.getBoundingClientRect();
        const x = event.clientX - bounds.left;
        const y = event.clientY - bounds.top;
        card.style.setProperty('--mx', `${x}px`);
        card.style.setProperty('--my', `${y}px`);
        card.style.setProperty('--rx', `${((y / bounds.height) - 0.5) * -1.4}deg`);
        card.style.setProperty('--ry', `${((x / bounds.width) - 0.5) * 1.6}deg`);
      });
      card.addEventListener('pointerleave', () => {
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
      });
    });

    $$('[data-icon-motion]').forEach((item) => {
      item.addEventListener('pointerenter', () => {
        const icon = $('.icon-box, svg, img', item);
        if (icon && hasGSAP) window.gsap.to(icon, { scale: 1.08, rotate: 2.5, duration: 0.3, ease: 'power2.out' });
      });
      item.addEventListener('pointerleave', () => {
        const icon = $('.icon-box, svg, img', item);
        if (icon && hasGSAP) window.gsap.to(icon, { scale: 1, rotate: 0, duration: 0.5, ease: 'power3.out' });
      });
    });
  }

  /* --------------------------------------------------------------------------
   * 05. Existing interactive functionality retained exactly
   * -------------------------------------------------------------------------- */
  $$('[data-faq]').forEach((button) => {
    button.addEventListener('click', () => {
      const opening = button.getAttribute('aria-expanded') !== 'true';
      // Premium accordion behavior: close peers, then open the selected question.
      const list = button.closest('.faq-list');
      list?.querySelectorAll('[data-faq]').forEach((peer) => peer.setAttribute('aria-expanded', 'false'));
      button.setAttribute('aria-expanded', String(opening));
    });
  });

  const serviceTabs = $$('.service-tab');
  const serviceStage = $('[data-service-stage]');
  if (serviceTabs.length && serviceStage) {
    serviceTabs.forEach((tab) => tab.addEventListener('click', () => {
      serviceTabs.forEach((item) => item.classList.remove('active'));
      tab.classList.add('active');

      const update = () => {
        $('[data-stage-index]', serviceStage).textContent = tab.dataset.index;
        $('[data-stage-title]', serviceStage).textContent = tab.dataset.title;
        $('[data-stage-text]', serviceStage).textContent = tab.dataset.text;
        $('[data-stage-link]', serviceStage).href = tab.dataset.href;
      };

      if (hasGSAP && !reducedMotion) {
        window.gsap.timeline()
          .to(serviceStage, { autoAlpha: 0.35, y: 10, duration: 0.16, ease: 'power2.in', onComplete: update })
          .to(serviceStage, { autoAlpha: 1, y: 0, duration: 0.42, ease: 'power3.out' });
      } else {
        update();
      }
    }));
  }

  const process = $('[data-process]');
  const processFill = $('[data-process-fill]');
  if (process && processFill) {
    const updateProcess = () => {
      const bounds = process.getBoundingClientRect();
      const amount = Math.max(0, Math.min(1, (window.innerHeight - bounds.top) / (window.innerHeight + bounds.height * 0.35)));
      if (window.innerWidth > 920) processFill.style.width = `${amount * 100}%`;
      else processFill.style.height = `${amount * 100}%`;
    };
    updateProcess();
    window.addEventListener('scroll', updateProcess, { passive: true });
    window.addEventListener('resize', updateProcess, { passive: true });
  }

  $$('[data-checklist]').forEach((list) => {
    const key = `pddg-checklist-${location.pathname}`;
    let saved = {};
    try { saved = JSON.parse(localStorage.getItem(key) || '{}'); } catch { saved = {}; }
    const checkboxes = $$('input[type="checkbox"]', list);
    const updateCount = () => {
      const done = checkboxes.filter((checkbox) => checkbox.checked).length;
      const counter = $('[data-check-count]');
      if (counter) counter.textContent = `${done} / ${checkboxes.length}`;
    };
    checkboxes.forEach((checkbox, index) => {
      checkbox.checked = Boolean(saved[index]);
      checkbox.addEventListener('change', () => {
        saved[index] = checkbox.checked;
        localStorage.setItem(key, JSON.stringify(saved));
        updateCount();
      });
    });
    updateCount();
  });

  $$('form[data-mail-form]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const status = $('.form-status', form);
      const data = new FormData(form);
      const lines = [];
      data.forEach((value, key) => {
        if (String(value).trim()) lines.push(`${key}: ${value}`);
      });
      const subject = form.dataset.subject || 'PDDG website inquiry';
      const mailto = `mailto:Info@pddg.io?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
      if (status) status.textContent = 'Your email application is opening. This website does not store the form data.';
      location.href = mailto;
    });
  });

  /* --------------------------------------------------------------------------
   * 06. Animated cybersecurity network canvas, paused when off-screen
   * -------------------------------------------------------------------------- */
  $$('canvas[data-network]').forEach((canvas) => {
    if (reducedMotion) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let nodes = [];
    let active = false;
    let frame = 0;
    let pointer = { x: -999, y: -999 };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.max(1, width * dpr);
      canvas.height = Math.max(1, height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = compactViewport ? 28 : Math.max(34, Math.round(width / 11));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        radius: Math.random() * 1.45 + 0.65,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const draw = () => {
      if (!active || document.hidden) return;
      context.clearRect(0, 0, width, height);
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) * 0.46;

      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;
        node.phase += 0.014;
        const dx = node.x - centerX;
        const dy = node.y - centerY;
        const distance = Math.hypot(dx, dy);
        if (distance > radius) {
          node.vx -= (dx / distance) * 0.008;
          node.vy -= (dy / distance) * 0.008;
        } else {
          node.vx *= 0.999;
          node.vy *= 0.999;
        }
        const pointerDistance = Math.hypot(node.x - pointer.x, node.y - pointer.y);
        if (pointerDistance < 90) {
          node.vx += ((node.x - pointer.x) / (pointerDistance || 1)) * 0.016;
          node.vy += ((node.y - pointer.y) / (pointerDistance || 1)) * 0.016;
        }
      });

      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const a = nodes[i];
          const b = nodes[j];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          if (distance < 84) {
            const strength = (1 - distance / 84) * 0.2;
            const gradient = context.createLinearGradient(a.x, a.y, b.x, b.y);
            gradient.addColorStop(0, `rgba(50, 226, 255, ${strength})`);
            gradient.addColorStop(1, `rgba(148, 102, 255, ${strength * 0.9})`);
            context.strokeStyle = gradient;
            context.lineWidth = 0.62;
            context.beginPath();
            context.moveTo(a.x, a.y);
            context.lineTo(b.x, b.y);
            context.stroke();
          }
        }
      }

      nodes.forEach((node, index) => {
        const pulse = 0.52 + Math.sin(node.phase) * 0.28;
        context.fillStyle = index % 5 === 0
          ? `rgba(160, 117, 255, ${pulse})`
          : `rgba(99, 235, 255, ${pulse})`;
        context.beginPath();
        context.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        context.fill();
      });

      frame = requestAnimationFrame(draw);
    };

    new ResizeObserver(resize).observe(canvas);
    resize();
    canvas.addEventListener('pointermove', (event) => {
      const bounds = canvas.getBoundingClientRect();
      pointer = { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
    });
    canvas.addEventListener('pointerleave', () => { pointer = { x: -999, y: -999 }; });

    new IntersectionObserver((entries) => {
      active = entries[0]?.isIntersecting ?? false;
      cancelAnimationFrame(frame);
      if (active) frame = requestAnimationFrame(draw);
    }, { rootMargin: '180px 0px' }).observe(canvas);
  });

  /* --------------------------------------------------------------------------
   * 07. Multi-page fade/slide transitions for internal navigation
   * -------------------------------------------------------------------------- */
  const transition = $('.page-transition');
  const revealPage = () => {
    body.classList.add('page-ready');
    if (!transition) return;
    if (hasGSAP && !reducedMotion) {
      window.gsap.set(transition, { autoAlpha: 1, scaleY: 1, transformOrigin: 'top' });
      window.gsap.to(transition, { autoAlpha: 0, scaleY: 0, duration: 0.72, ease: 'power3.inOut' });
    } else {
      transition.classList.add('is-hidden');
    }
  };

  window.addEventListener('pageshow', revealPage, { once: true });
  if (document.readyState === 'complete') revealPage();

  $$('a[href]').forEach((link) => {
    link.addEventListener('click', (event) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (link.target === '_blank' || link.hasAttribute('download')) return;
      const href = link.getAttribute('href') || '';
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) return;

      let target;
      try { target = new URL(link.href, location.href); } catch { return; }
      if (target.origin !== location.origin || target.href === location.href) return;

      event.preventDefault();
      closeMenu();
      if (lenis) lenis.stop();

      const navigate = () => { location.href = target.href; };
      if (transition && hasGSAP && !reducedMotion) {
        window.gsap.fromTo(transition,
          { autoAlpha: 0, scaleY: 0, transformOrigin: 'bottom' },
          { autoAlpha: 1, scaleY: 1, duration: 0.58, ease: 'power3.inOut', onComplete: navigate }
        );
      } else {
        navigate();
      }
    });
  });
})();
