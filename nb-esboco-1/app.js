/* NB Futebol — comportamento do site. O conteúdo já está no HTML; aqui entram links, popups e movimento por cima.
   GSAP 3.13 (ScrollTrigger, SplitText, MotionPath) + Lenis. Com "prefers-reduced-motion", tudo aparece parado. */
(function () {
  var S = window.SITE || {};
  var reduz = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var mouse = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- links de contato (vêm de dados.js) ---------- */
  function wa(assunto) { return 'https://wa.me/' + S.whatsapp + '?text=' + encodeURIComponent(S.mensagem(assunto)); }
  $$('[data-wa]').forEach(function (a) { a.href = wa(a.getAttribute('data-wa')); a.target = '_blank'; a.rel = 'noopener'; });
  $$('[data-insta]').forEach(function (a) { a.href = S.instagram; });
  $$('[data-txt]').forEach(function (e) { var v = S[e.getAttribute('data-txt')]; if (v) e.textContent = v; });

  /* ---------- menu e barra ---------- */
  var topo = $('#topo-bar'), menuBtn = $('.menu-btn');
  function barra() { topo.classList.toggle('solido', window.scrollY > 80); }
  window.addEventListener('scroll', barra, { passive: true }); barra();
  menuBtn.addEventListener('click', function () {
    var aberto = topo.classList.toggle('menu-aberto');
    menuBtn.setAttribute('aria-expanded', aberto);
    menuBtn.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
  });
  $$('.nav a').forEach(function (a) { a.addEventListener('click', function () { topo.classList.remove('menu-aberto'); menuBtn.setAttribute('aria-expanded', 'false'); }); });

  /* ---------- popups dos programas ---------- */
  var dlg = $('#dlg'), ids = $$('[data-abrir]').map(function (b) { return b.getAttribute('data-abrir'); }), atual = 0;
  function mostrar() {
    var el = document.getElementById('d-' + ids[atual]);
    $('#dlg-titulo').textContent = el.getAttribute('data-titulo');
    $('#dlg-sub').textContent = el.getAttribute('data-sub');
    var img = $('#dlg-img'); img.src = el.getAttribute('data-img'); img.alt = el.getAttribute('data-titulo');
    var corpo = $('#dlg-corpo'); corpo.textContent = '';
    $$('p, ul', el).forEach(function (n) { corpo.appendChild(n.cloneNode(true)); });
    $('#dlg-wa').href = wa(el.getAttribute('data-assunto'));
    if (!dlg.open) dlg.showModal();
    dlg.scrollTop = 0;
  }
  function passo(d) { atual = (atual + d + ids.length) % ids.length; mostrar(); }
  $$('[data-abrir]').forEach(function (b) { b.addEventListener('click', function () { atual = ids.indexOf(b.getAttribute('data-abrir')); mostrar(); }); });
  $('#dlg-x').addEventListener('click', function () { dlg.close(); });
  $('#dlg-ant').addEventListener('click', function () { passo(-1); });
  $('#dlg-prox').addEventListener('click', function () { passo(1); });
  dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener('keydown', function (e) { if (e.key === 'ArrowLeft') passo(-1); if (e.key === 'ArrowRight') passo(1); });

  var hv = $('.hero-bg video');
  if (hv && !reduz) { var pp = hv.play(); if (pp && pp.catch) pp.catch(function () {}); }

  if (reduz || !window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  if (window.SplitText) gsap.registerPlugin(SplitText);
  if (window.MotionPathPlugin) gsap.registerPlugin(MotionPathPlugin);
  var EXPO = 'expo.out';

  /* ---------- rolagem suave ---------- */
  if (window.Lenis) {
    var lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
    $$('a[href^="#"]').forEach(function (a) {
      var id = a.getAttribute('href');
      if (id.length < 2 || a.hasAttribute('data-wa')) return;
      a.addEventListener('click', function (e) { var alvo = $(id); if (!alvo) return; e.preventDefault(); lenis.scrollTo(alvo, { offset: -40, duration: 1.5 }); });
    });
  }

  /* ---------- bola-cursor, prévia das fotos e botões magnéticos (só com mouse) ---------- */
  if (mouse) {
    var bola = $('.bola'), rot = $('span', bola), previa = $('.previa'), pimg = $('img', previa);
    var cx = 0, cy = 0, tx = 0, ty = 0, px = 0, py = 0;
    window.addEventListener('mousemove', function (e) { tx = e.clientX; ty = e.clientY; bola.classList.add('on'); });
    gsap.ticker.add(function () {
      cx += (tx - cx) * 0.25; cy += (ty - cy) * 0.25; bola.style.transform = 'translate(' + cx + 'px,' + cy + 'px)';
      px += (tx - px) * 0.12; py += (ty - py) * 0.12; previa.style.transform = 'translate(' + (px + 36) + 'px,' + (py - 120) + 'px) rotate(' + ((tx - px) * 0.04).toFixed(2) + 'deg)';
    });
    $$('[data-cursor]').forEach(function (el) {
      el.addEventListener('mouseenter', function () { rot.textContent = el.getAttribute('data-cursor'); bola.classList.add('txt'); });
      el.addEventListener('mouseleave', function () { bola.classList.remove('txt'); });
    });
    $$('.linha').forEach(function (l) {
      l.addEventListener('mouseenter', function () { pimg.src = l.getAttribute('data-img'); previa.classList.add('on'); });
      l.addEventListener('mouseleave', function () { previa.classList.remove('on'); });
    });
    $$('.mag').forEach(function (b) {
      b.addEventListener('mousemove', function (e) { var r = b.getBoundingClientRect(); gsap.to(b, { x: (e.clientX - r.left - r.width / 2) * 0.25, y: (e.clientY - r.top - r.height / 2) * 0.35, duration: 0.4, ease: 'power3.out' }); });
      b.addEventListener('mouseleave', function () { gsap.to(b, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1,0.45)' }); });
    });
  }

  /* ---------- hero: letras sobem inclinadas (espera as fontes) ---------- */
  var tl = gsap.timeline({ defaults: { ease: EXPO }, paused: true });
  if (window.SplitText) {
    var sp = SplitText.create('.h-gigante span', { type: 'chars', mask: 'chars' });
    tl.from(sp.chars, { yPercent: 120, skewX: -18, duration: 1.1, stagger: 0.02 });
  } else { tl.from('.h-gigante span', { y: 70, opacity: 0, duration: 1, stagger: 0.12 }); }
  tl.from('.hero .eyebrow, .hero-sub, .hero-cta', { y: 24, opacity: 0, filter: 'blur(6px)', duration: 0.9, stagger: 0.1 }, 0.5)
    .from('.hero-fatos li', { y: 24, opacity: 0, duration: 0.8, stagger: 0.1 }, 0.9);
  var iniciaHero = function () { tl.play(); };
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(iniciaHero); else iniciaHero();
  gsap.to('.hero-bg video, .hero-bg img', { yPercent: 9, scale: 1.08, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  gsap.to('.hero-in', { y: -70, opacity: 0.1, ease: 'none', scrollTrigger: { trigger: '.hero', start: '45% top', end: 'bottom top', scrub: true } });

  /* ---------- letreiro: o texto passa inteiro com a rolagem ---------- */
  var sp1 = $('.let span');
  gsap.fromTo(sp1, { x: 0 }, { x: function () { return -Math.max(0, sp1.scrollWidth - window.innerWidth); }, ease: 'none', scrollTrigger: { trigger: '.letreiro', start: 'top bottom', end: 'center 35%', scrub: 0.5, invalidateOnRefresh: true } });

  /* ---------- programas: linhas da quadra se desenham e a lista entra ---------- */
  var quadra = $('.quadra');
  quadra.style.setProperty('--d', 1);
  gsap.to(quadra, { '--d': 0, ease: 'none', scrollTrigger: { trigger: '.programas', start: 'top 70%', end: 'bottom 60%', scrub: true } });
  gsap.from('.linha', { y: 60, opacity: 0, duration: 0.9, stagger: 0.1, ease: EXPO, scrollTrigger: { trigger: '.lista', start: 'top 85%', once: true } });

  /* ---------- Nilo Biazeto: N e B ganham força, o resto do nome recua ---------- */
  var nl = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: '.nilo-nome', start: 'top 85%', end: 'bottom 35%', scrub: 0.6 } });
  nl.fromTo('.rs', { opacity: 1 }, { opacity: 0.12 }, 0)
    .fromTo('.Ln', { x: -60, scale: 0.9 }, { x: 0, scale: 1.06 }, 0)
    .fromTo('.Lb', { x: 60, scale: 0.9 }, { x: 0, scale: 1.06 }, 0);
  gsap.from('.nilo-foto', { clipPath: 'inset(0 100% 0 0)', duration: 1.2, ease: 'power4.inOut', scrollTrigger: { trigger: '.nilo-corpo', start: 'top 80%', once: true } });
  gsap.from('.nilo-tx > *', { y: 40, opacity: 0, filter: 'blur(6px)', duration: 1, stagger: 0.1, ease: EXPO, scrollTrigger: { trigger: '.nilo-tx', start: 'top 82%', once: true } });
  gsap.from('.eq > *', { scale: 0.6, opacity: 0, duration: 0.5, stagger: 0.18, ease: 'back.out(2)', scrollTrigger: { trigger: '.nilo-sel', start: 'top 92%', once: true } });

  /* ---------- placar: números contam ---------- */
  $$('.pl-card .num[data-n]').forEach(function (b) {
    var alvo = parseFloat(b.getAttribute('data-n')), dec = +(b.getAttribute('data-dec') || 0), pre = b.getAttribute('data-pre') || '', suf = b.getAttribute('data-suf') || '', o = { v: 0 };
    function fmt(v) { return pre + v.toFixed(dec).replace('.', ',') + suf; }
    ScrollTrigger.create({ trigger: b, start: 'top 90%', once: true, onEnter: function () {
      gsap.to(o, { v: alvo, duration: 1.8, ease: 'power3.out', onUpdate: function () { b.textContent = fmt(o.v); }, onComplete: function () { b.textContent = fmt(alvo); } });
    } });
  });
  gsap.from('.pl-card', { y: 60, opacity: 0, duration: 0.9, stagger: 0.1, ease: EXPO, scrollTrigger: { trigger: '.placar', start: 'top 88%', once: true } });

  /* ---------- cuidado e galeria: fotos em velocidades diferentes ---------- */
  var mm = gsap.matchMedia();
  mm.add('(min-width: 981px)', function () {
    $$('[data-vel]').forEach(function (f) {
      gsap.to(f, { y: parseFloat(f.getAttribute('data-vel')) * 420, ease: 'none', scrollTrigger: { trigger: f.parentNode, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
  });
  mm.add('(min-width: 981px)', function () {
    gsap.fromTo('.col.c1', { y: 90 }, { y: -90, ease: 'none', scrollTrigger: { trigger: '.colunas', start: 'top bottom', end: 'bottom top', scrub: 0.6 } });
    gsap.fromTo('.col.c2', { y: -50 }, { y: 130, ease: 'none', scrollTrigger: { trigger: '.colunas', start: 'top bottom', end: 'bottom top', scrub: 0.6 } });
    gsap.fromTo('.col.c3', { y: 90 }, { y: -90, ease: 'none', scrollTrigger: { trigger: '.colunas', start: 'top bottom', end: 'bottom top', scrub: 0.6 } });
    /* a bola rola pelo caminho dos 3 passos */
    if (window.MotionPathPlugin) {
      gsap.to('.bola-rola', { motionPath: { path: '#rota', align: '#rota', alignOrigin: [0.5, 0.5] }, rotation: 720, ease: 'none',
        scrollTrigger: { trigger: '.trilha', start: 'top 80%', end: 'bottom 55%', scrub: 0.8 } });
    }
  });
  mm.add('(max-width: 980px)', function () {
    gsap.from('.col figure', { y: 50, opacity: 0, duration: 0.8, stagger: 0.08, ease: EXPO, scrollTrigger: { trigger: '.colunas', start: 'top 85%', once: true } });
  });
  gsap.from('.passos li', { y: 60, opacity: 0, duration: 0.9, stagger: 0.14, ease: EXPO, scrollTrigger: { trigger: '.passos', start: 'top 88%', once: true } });
  gsap.from('.cd-tx > *', { y: 40, opacity: 0, filter: 'blur(6px)', duration: 1, stagger: 0.1, ease: EXPO, scrollTrigger: { trigger: '.cd-tx', start: 'top 82%', once: true } });

  /* títulos */
  $$('h2:not(.sr)').forEach(function (h) {
    if (h.closest('.nilo')) return;
    gsap.from(h, { y: 50, opacity: 0, filter: 'blur(6px)', duration: 1, ease: EXPO, scrollTrigger: { trigger: h, start: 'top 90%', once: true } });
  });

  window.addEventListener('load', function () { ScrollTrigger.refresh(); });
})();
