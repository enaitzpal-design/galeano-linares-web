(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- Splash de entrada (home, una vez por sesión) ----------
  var splash = document.querySelector('[data-intro-splash]');
  if (splash && !splash.classList.contains('is-hidden')) {
    var dismissSplash = function () {
      if (splash.classList.contains('is-leaving') || splash.classList.contains('is-hidden')) return;
      try { sessionStorage.setItem('gl_intro_seen', '1'); } catch (e) {}
      splash.classList.add('is-leaving');
      setTimeout(function () { splash.classList.add('is-hidden'); }, 550);
    };
    // Toca en cualquier sitio para saltárselo — quien llega con prisa no debe esperar.
    splash.addEventListener('click', dismissSplash);
    setTimeout(dismissSplash, 900);
  }

  // ---------- Menú móvil ----------
  var toggle = document.querySelector('[data-menu-toggle]');
  var mobileNav = document.querySelector('[data-mobile-nav]');
  if (toggle && mobileNav) {
    var setMenu = function (open) {
      mobileNav.classList.toggle('is-open', open);
      mobileNav.setAttribute('aria-hidden', String(!open));
      toggle.setAttribute('aria-expanded', String(open));
      // Bloqueo de scroll por clase (definida en CSS), no con estilo en línea: así un
      // cierre que no llegue a ejecutarse (bfcache, rotación...) nunca deja la página
      // sin scroll — pageshow y el media query de escritorio lo limpian siempre.
      document.documentElement.classList.toggle('menu-open', open);
    };
    toggle.addEventListener('click', function () {
      setMenu(!mobileNav.classList.contains('is-open'));
    });
    var backdrop = mobileNav.querySelector('[data-menu-backdrop]');
    if (backdrop) {
      backdrop.addEventListener('click', function () { setMenu(false); });
    }
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
        setMenu(false);
        toggle.focus();
      }
    });
    mobileNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setMenu(false); });
    });
    // Acordeón de "Serveis": despliega/pliega el submenú de servicios
    var servicesToggle = mobileNav.querySelector('[data-services-toggle]');
    var servicesPanel = mobileNav.querySelector('[data-services-panel]');
    if (servicesToggle && servicesPanel) {
      servicesToggle.addEventListener('click', function () {
        var expand = !servicesPanel.classList.contains('is-expanded');
        servicesPanel.classList.toggle('is-expanded', expand);
        servicesToggle.setAttribute('aria-expanded', String(expand));
      });
    }
    // iOS Safari ignora overflow:hidden para el gesto táctil: con el menú abierto, la
    // página de detrás se podía seguir arrastrando hasta otras secciones. Se cancela el
    // touchmove que no ocurre dentro de la lámina (o el de la lámina cuando no tiene
    // nada propio que desplazar), dejando quieta la página hasta cerrar el menú.
    var sheet = mobileNav.querySelector('.mobile-nav-sheet');
    document.addEventListener('touchmove', function (e) {
      if (!mobileNav.classList.contains('is-open')) return;
      if (!sheet || !sheet.contains(e.target) || sheet.scrollHeight <= sheet.clientHeight) {
        e.preventDefault();
      }
    }, { passive: false });
    // Al volver desde bfcache el DOM se restaura tal cual quedó: cerrar siempre.
    window.addEventListener('pageshow', function (e) {
      if (e.persisted) setMenu(false);
    });
    // Si el viewport pasa a escritorio (rotación/redimensión) el menú deja de existir
    // visualmente: soltar también el bloqueo de scroll.
    if (window.matchMedia) {
      var desktopMq = window.matchMedia('(min-width: 1280px)');
      var onDesktop = function (mq) { if (mq.matches) setMenu(false); };
      if (desktopMq.addEventListener) desktopMq.addEventListener('change', onDesktop);
      else if (desktopMq.addListener) desktopMq.addListener(onDesktop);
    }
  }

  // ---------- Banner de cookies (RGPD — solo cookies técnicas, brief §9) ----------
  var COOKIE_KEY = 'gl_cookie_consent';
  var banner = document.querySelector('[data-cookie-banner]');
  if (banner) {
    try {
      if (!localStorage.getItem(COOKIE_KEY)) {
        banner.classList.add('is-visible');
      }
    } catch (e) { /* localStorage no disponible */ }
    var acceptBtn = banner.querySelector('[data-cookie-accept]');
    if (acceptBtn) {
      acceptBtn.addEventListener('click', function () {
        try { localStorage.setItem(COOKIE_KEY, '1'); } catch (e) {}
        banner.classList.remove('is-visible');
      });
    }
  }

  // ---------- Header: transparente arriba del todo, cristal líquido al hacer scroll ----------
  var header = document.querySelector('.site-header');
  if (header) {
    var headerTicking = false;
    var updateHeader = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
      headerTicking = false;
    };
    window.addEventListener('scroll', function () {
      if (!headerTicking) {
        requestAnimationFrame(updateHeader);
        headerTicking = true;
      }
    }, { passive: true });
    updateHeader();
  }

  // ---------- Resplandor que sigue el cursor — sutil, solo con ratón real ----------
  var glow = document.querySelector('[data-cursor-glow]');
  var hasFinePointer = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (glow && hasFinePointer && !prefersReducedMotion) {
    var glowTicking = false;
    var lastX = 0, lastY = 0;
    var applyGlow = function () {
      document.documentElement.style.setProperty('--mx', lastX + 'px');
      document.documentElement.style.setProperty('--my', lastY + 'px');
      glowTicking = false;
    };
    window.addEventListener('mousemove', function (e) {
      lastX = e.clientX;
      lastY = e.clientY;
      glow.classList.add('is-active');
      if (!glowTicking) {
        requestAnimationFrame(applyGlow);
        glowTicking = true;
      }
    }, { passive: true });
  }

  // ---------- Red de partículas del hero — versión propia y discreta ----------
  // Inspirada en un componente de fondo animado que trajo el cliente, pero reescrita en JS
  // plano (sin React/canvas de pantalla completa/colores oscuros): confinada al hero, en
  // tonos cobre muy tenues, pausada cuando no está en pantalla y desactivada con
  // prefers-reduced-motion — el brief (§10) pide "discreta y al servicio de la calma".
  var particleCanvas = document.querySelector('[data-hero-particles]');
  if (particleCanvas && !prefersReducedMotion && window.innerWidth > 640) {
    var pCtx = particleCanvas.getContext('2d');
    var heroEl = particleCanvas.closest('.hero');
    var particles = [];
    var pMouse = { x: null, y: null, radius: 140 };
    var particlesRunning = false;
    var particlesRafId = null;
    var DOT_COLOR = 'rgba(184, 115, 51, 0.55)';
    var LINE_COLOR = '197, 106, 60';
    var MAX_LINE_DIST = 150;

    var EXTRA_BLEED = 140; // px de más por debajo del hero, para difuminarse hacia la siguiente seccion
    function sizeCanvas() {
      var rect = heroEl.getBoundingClientRect();
      var h = rect.height + EXTRA_BLEED;
      particleCanvas.width = rect.width;
      particleCanvas.height = h;
      particleCanvas.style.height = h + 'px';
      var count = Math.min(90, Math.round((rect.width * h) / 12000));
      particles = [];
      for (var i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * rect.width,
          y: Math.random() * h,
          dx: (Math.random() - 0.5) * 0.3,
          dy: (Math.random() - 0.5) * 0.3,
          r: Math.random() * 1.6 + 1,
        });
      }
    }

    function stepParticles() {
      var w = particleCanvas.width, h = particleCanvas.height;
      pCtx.clearRect(0, 0, w, h);

      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        if (p.x > w || p.x < 0) p.dx = -p.dx;
        if (p.y > h || p.y < 0) p.dy = -p.dy;

        if (pMouse.x !== null) {
          var mdx = pMouse.x - p.x, mdy = pMouse.y - p.y;
          var dist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (dist < pMouse.radius) {
            var force = (pMouse.radius - dist) / pMouse.radius;
            p.x -= (mdx / dist) * force * 1.2;
            p.y -= (mdy / dist) * force * 1.2;
          }
        }

        p.x += p.dx;
        p.y += p.dy;

        pCtx.beginPath();
        pCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        pCtx.fillStyle = DOT_COLOR;
        pCtx.fill();
      }

      for (var a = 0; a < particles.length; a++) {
        for (var b = a + 1; b < particles.length; b++) {
          var ddx = particles[a].x - particles[b].x;
          var ddy = particles[a].y - particles[b].y;
          var d = Math.sqrt(ddx * ddx + ddy * ddy);
          if (d < MAX_LINE_DIST) {
            var alpha = (1 - d / MAX_LINE_DIST) * 0.26;
            pCtx.strokeStyle = 'rgba(' + LINE_COLOR + ', ' + alpha.toFixed(3) + ')';
            pCtx.lineWidth = 1;
            pCtx.beginPath();
            pCtx.moveTo(particles[a].x, particles[a].y);
            pCtx.lineTo(particles[b].x, particles[b].y);
            pCtx.stroke();
          }
        }
      }

      particlesRafId = requestAnimationFrame(stepParticles);
    }

    function startParticles() {
      if (particlesRunning) return;
      particlesRunning = true;
      particlesRafId = requestAnimationFrame(stepParticles);
    }
    function stopParticles() {
      particlesRunning = false;
      if (particlesRafId) cancelAnimationFrame(particlesRafId);
    }

    window.addEventListener('mousemove', function (e) {
      var rect = heroEl.getBoundingClientRect();
      if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
        pMouse.x = e.clientX - rect.left;
        pMouse.y = e.clientY - rect.top;
      } else {
        pMouse.x = null;
        pMouse.y = null;
      }
    }, { passive: true });

    var resizeRafPending = false;
    window.addEventListener('resize', function () {
      if (resizeRafPending) return;
      resizeRafPending = true;
      requestAnimationFrame(function () { sizeCanvas(); resizeRafPending = false; });
    });

    sizeCanvas();
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) startParticles();
          else stopParticles();
        });
      }, { threshold: 0.05 });
      io.observe(heroEl);
    } else {
      startParticles();
    }
  }

  // ---------- Formulario -> WhatsApp prerellenado ----------
  var waNumber = '34685518536';
  document.querySelectorAll('[data-wa-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      // Honeypot anti-spam: si el campo oculto tiene valor, es un bot
      var honeypot = form.querySelector('input[name="company"]');
      if (honeypot && honeypot.value) return;

      var lang = form.getAttribute('data-wa-lang') || 'ca';
      var name = (form.querySelector('[name="name"]') || {}).value || '';
      var phone = (form.querySelector('[name="phone"]') || {}).value || '';
      var message = (form.querySelector('[name="message"]') || {}).value || '';

      var text = lang === 'es'
        ? 'Hola, soy ' + name + ' (tel. ' + phone + '). ' + message
        : 'Hola, sóc ' + name + ' (tel. ' + phone + '). ' + message;

      window.open('https://wa.me/' + waNumber + '?text=' + encodeURIComponent(text), '_blank', 'noopener');
    });
  });

  // ---------- Revelado de secciones al hacer scroll — IntersectionObserver ----------
  // Antes dependía de GSAP + ScrollTrigger dentro de gsap.matchMedia() con una única
  // condición (prefers-reduced-motion) que casi nunca se cumple: el callback no llegaba a
  // ejecutarse y ni el revelado ni los contadores se creaban — y cuando sí se cumplía,
  // podía dejar secciones ocultas. Ahora el estado oculto solo existe si el observer está
  // listo (clase js-reveal en <html>) y cualquier fallo deja el contenido visible.
  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    var revealEls = document.querySelectorAll('[data-reveal]');
    if (revealEls.length) {
      document.documentElement.classList.add('js-reveal');
      // Cascada dentro de cada grupo (tarjetas, pasos, pueblos): retardo por posición
      document.querySelectorAll('[data-reveal-group]').forEach(function (group) {
        group.querySelectorAll('[data-reveal]').forEach(function (el, i) {
          el.style.setProperty('--reveal-delay', (i * 0.12).toFixed(2) + 's');
        });
      });
      var revealIo = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            revealIo.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -12% 0px' });
      revealEls.forEach(function (el) { revealIo.observe(el); });
    }
  }

  // ---------- Contadores de la franja de confianza (4,8★ / 1988) ----------
  // El valor final ya viene en el HTML: la animación solo lo re-cuenta al entrar en
  // pantalla. Sin observer o con reduced-motion, se queda el valor final — nunca un "0★".
  document.querySelectorAll('[data-counter]').forEach(function (el) {
    var to = parseFloat(el.getAttribute('data-count-to'));
    var suffix = el.getAttribute('data-suffix') || '';
    var decimals = to % 1 !== 0;
    var fmt = function (v) { return (decimals ? v.toFixed(1).replace('.', ',') : String(Math.round(v))) + suffix; };
    el.textContent = fmt(to);
    if (prefersReducedMotion || !('IntersectionObserver' in window)) return;
    var counterIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        counterIo.disconnect();
        var start = null;
        var stepCount = function (ts) {
          if (start === null) start = ts;
          var p = Math.min(1, (ts - start) / 1400);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = fmt(to * eased);
          if (p < 1) requestAnimationFrame(stepCount);
        };
        requestAnimationFrame(stepCount);
      });
    }, { rootMargin: '0px 0px -10% 0px' });
    counterIo.observe(el);
  });

  // ---------- Parallax decorativo (GSAP) — colage del hero y manchas de fondo ----------
  // Solo efectos prescindibles: si el CDN no carga o hay reduced-motion, no se pierde
  // ningún contenido (el revelado y los contadores ya no dependen de GSAP).
  if (window.gsap && window.ScrollTrigger && !prefersReducedMotion) {
    gsap.registerPlugin(ScrollTrigger);

    // Paralaje sutil del colage del hero: se desplaza más despacio que el scroll,
    // dando sensación de profundidad mientras el hero desaparece de la vista.
    var heroCollage = document.querySelector('.hero-collage');
    if (heroCollage) {
      gsap.to(heroCollage, {
        y: 60,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
      });
    }

    // Parallax muy suave de las manchas de color de fondo — el mismo lenguaje que el
    // colage del hero, para que las demás secciones no se sientan estáticas al lado.
    document.querySelectorAll('.section-glow').forEach(function (el) {
      gsap.fromTo(el, { '--blob-shift': '-30px' }, {
        '--blob-shift': '30px',
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    });
  }
})();
