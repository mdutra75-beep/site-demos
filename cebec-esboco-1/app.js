/* Escola CEBEC — comportamento do site. O conteúdo já está no HTML; aqui entram só links, popups e movimento. */
(function () {
  var S = window.SITE || {};
  var reduz = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var mouse = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- links de contato (vêm de dados.js) ---------- */
  function wa(msg) { return 'https://wa.me/' + S.whatsapp + '?text=' + encodeURIComponent(msg || ''); }
  $$('[data-wa]').forEach(function (a) {
    var tipo = a.getAttribute('data-wa');
    a.href = wa(tipo === 'matricula' ? S.mensagemMatricula : S.mensagemVisita);
    a.target = '_blank'; a.rel = 'noopener';
  });
  $$('[data-tel]').forEach(function (a) { a.href = 'tel:' + S.telefoneLink; });
  $$('[data-rota]').forEach(function (a) { a.href = S.rota; });
  $$('[data-insta]').forEach(function (a) { a.href = S.instagram; });
  $$('[data-mail]').forEach(function (a) { a.href = 'mailto:' + S.email; });
  $$('[data-txt]').forEach(function (e) { var v = S[e.getAttribute('data-txt')]; if (v) e.textContent = v; });

  /* vídeo do topo: alguns navegadores só tocam se mandarmos */
  var hv = $('.hero-bg video');
  if (hv && !reduz) { var pp = hv.play(); if (pp && pp.catch) pp.catch(function () {}); }

  /* ---------- menu e barra ---------- */
  var topo = $('#topo-bar'), menuBtn = $('.menu-btn');
  function barra() { topo.classList.toggle('solido', window.scrollY > 60); }
  window.addEventListener('scroll', barra, { passive: true }); barra();
  menuBtn.addEventListener('click', function () {
    var aberto = topo.classList.toggle('menu-aberto');
    document.body.classList.toggle('menu-aberto', aberto);
    menuBtn.setAttribute('aria-expanded', aberto);
    menuBtn.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
  });
  $$('.nav a').forEach(function (a) {
    a.addEventListener('click', function () { topo.classList.remove('menu-aberto'); document.body.classList.remove('menu-aberto'); menuBtn.setAttribute('aria-expanded', 'false'); });
  });

  /* ---------- popups dos projetos ---------- */
  var dlg = $('#dlg'), grupo = $$('[data-abrir]').map(function (n) { return n.getAttribute('data-abrir'); }), atual = 0;
  function mostrar() {
    var el = document.getElementById(grupo[atual]);
    $('#dlg-titulo').textContent = $('h4', el).textContent;
    $('#dlg-rotulo').textContent = el.getAttribute('data-rotulo') || '';
    var img = $('#dlg-img'); img.src = el.getAttribute('data-img'); img.alt = $('h4', el).textContent;
    var corpo = $('#dlg-corpo'); corpo.textContent = '';
    $$('p, ul', el).forEach(function (n) { corpo.appendChild(n.cloneNode(true)); });
    var av = document.createElement('p'); av.className = 'aviso';
    var chip = document.createElement('span'); chip.className = 'ex'; chip.textContent = 'EXEMPLO';
    av.appendChild(chip); av.appendChild(document.createTextNode('Texto de apoio baseado no site da escola, a ser revisado por ela.'));
    corpo.appendChild(av);
    if (!dlg.open) dlg.showModal();
    dlg.scrollTop = 0;
  }
  function passo(d) { atual = (atual + d + grupo.length) % grupo.length; mostrar(); }
  $$('[data-abrir]').forEach(function (b) { b.addEventListener('click', function () { atual = grupo.indexOf(b.getAttribute('data-abrir')); mostrar(); }); });
  $('#dlg-x').addEventListener('click', function () { dlg.close(); });
  $('#dlg-ant').addEventListener('click', function () { passo(-1); });
  $('#dlg-prox').addEventListener('click', function () { passo(1); });
  dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener('keydown', function (e) { if (e.key === 'ArrowLeft') passo(-1); if (e.key === 'ArrowRight') passo(1); });

  if (reduz || !window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  /* ---------- rolagem suave ---------- */
  if (window.Lenis) {
    var lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
    $$('a[href^="#"]').forEach(function (a) {
      var id = a.getAttribute('href');
      if (id.length < 2 || a.hasAttribute('data-wa')) return;
      a.addEventListener('click', function (e) { var alvo = $(id); if (!alvo) return; e.preventDefault(); lenis.scrollTo(alvo, { offset: -60 }); });
    });
  }

  /* ---------- cursor, botões magnéticos e inclinação (só com mouse) ---------- */
  if (mouse) {
    var cur = $('.cursor'), cx = 0, cy = 0, tx = 0, ty = 0;
    window.addEventListener('mousemove', function (e) { tx = e.clientX; ty = e.clientY; cur.classList.add('on'); });
    gsap.ticker.add(function () { cx += (tx - cx) * 0.2; cy += (ty - cy) * 0.2; cur.style.transform = 'translate(' + cx + 'px,' + cy + 'px)'; });
    $$('a, button, summary').forEach(function (el) {
      el.addEventListener('mouseenter', function () { cur.classList.add('grande'); });
      el.addEventListener('mouseleave', function () { cur.classList.remove('grande'); });
    });
    $$('.mag').forEach(function (b) {
      b.addEventListener('mousemove', function (e) {
        var r = b.getBoundingClientRect();
        gsap.to(b, { x: (e.clientX - r.left - r.width / 2) * 0.3, y: (e.clientY - r.top - r.height / 2) * 0.4, duration: 0.3 });
      });
      b.addEventListener('mouseleave', function () { gsap.to(b, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1,0.4)' }); });
    });
    $$('.tile').forEach(function (t) {
      t.addEventListener('mousemove', function (e) {
        var r = t.getBoundingClientRect(), px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
        gsap.to(t, { rotateY: px * 10, rotateX: -py * 10, y: -6, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
      });
      t.addEventListener('mouseleave', function () { gsap.to(t, { rotateX: 0, rotateY: 0, y: 0, duration: 0.6, ease: 'power3.out', overwrite: 'auto' }); });
    });
  }

  /* ---------- hero ---------- */
  var tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
  tl.from('.hero h1 .ln > span', { yPercent: 115, duration: 1.1, stagger: 0.12 })
    .from('.hero .eyebrow, .hero-sub, .hero-cta', { y: 24, opacity: 0, duration: 0.8, stagger: 0.1 }, 0.5)
    .from('.hero-fatos li', { y: 20, opacity: 0, duration: 0.7, stagger: 0.1 }, 0.9)
    .from('.selo', { scale: 0, opacity: 0, duration: 1, ease: 'back.out(1.6)' }, 0.7);
  gsap.to('.hero-bg video, .hero-bg img', { yPercent: 8, scale: 1.08, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  gsap.to('.hero-in', { y: -60, opacity: 0.2, ease: 'none', scrollTrigger: { trigger: '.hero', start: '55% top', end: 'bottom top', scrub: true } });

  /* ---------- letreiros: andam em sentidos opostos e mostram o texto inteiro ---------- */
  $$('.let span').forEach(function (sp, i) {
    var dist = function () { return Math.max(0, sp.scrollWidth - window.innerWidth); };
    gsap.fromTo(sp, { x: function () { return i ? -dist() : 0; } }, { x: function () { return i ? 0 : -dist(); }, ease: 'none',
      scrollTrigger: { trigger: '.letreiros', start: 'top bottom', end: 'center 40%', scrub: 0.5, invalidateOnRefresh: true } });
  });

  /* ---------- a escola: palavras acendem, fotos flutuam ---------- */
  $$('[data-acende]').forEach(function (p) {
    p.innerHTML = p.textContent.trim().split(/\s+/).map(function (w) { return '<span class="w">' + w + '</span>'; }).join(' ');
    var ws = $$('.w', p);
    gsap.set(ws, { opacity: 0.2 });
    gsap.to(ws, { opacity: 1, ease: 'none', stagger: 0.1, scrollTrigger: { trigger: p, start: 'top 80%', end: 'bottom 45%', scrub: 0.4 } });
  });
  gsap.matchMedia().add('(min-width: 981px)', function () {
    $$('[data-speed]').forEach(function (f) {
      var v = parseFloat(f.getAttribute('data-speed'));
      gsap.to(f, { y: v * 400, ease: 'none', scrollTrigger: { trigger: '.escola', start: 'top bottom', end: 'bottom top', scrub: true } });
    });
  });
  gsap.from('.recado', { scale: 0.3, opacity: 0, duration: 0.9, ease: 'back.out(2)', scrollTrigger: { trigger: '.recado', start: 'top 95%', once: true } });

  /* ---------- números: contagem ---------- */
  $$('.num-grade b').forEach(function (b) {
    var alvo = +b.getAttribute('data-n'), sep = b.hasAttribute('data-sep'), mais = b.hasAttribute('data-mais');
    var o = { v: 0 };
    function fmt(v) { v = Math.round(v); var s = sep ? String(v).replace(/\B(?=(\d{3})+(?!\d))/g, '.') : String(v); return s + (mais && v >= alvo ? '+' : ''); }
    ScrollTrigger.create({ trigger: b, start: 'top 90%', once: true, onEnter: function () {
      gsap.to(o, { v: alvo, duration: 2, ease: 'power3.out', onUpdate: function () { b.textContent = fmt(o.v); }, onComplete: function () { b.textContent = fmt(alvo); } });
    } });
  });
  gsap.from('.num-grade li', { y: 50, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: '.num-grade', start: 'top 88%', once: true } });

  /* ---------- níveis: cartões empilham e o de baixo encolhe ---------- */
  var cards = $$('.nivel');
  cards.forEach(function (c, i) {
    var prox = cards[i + 1]; if (!prox) return;
    gsap.to(c, { scale: 0.93, '--esc': 0.55, ease: 'none', scrollTrigger: { trigger: prox, start: 'top 85%', end: 'top 25%', scrub: true } });
  });

  /* ---------- projetos, vida, passos, títulos ---------- */
  gsap.from('.tile', { y: 70, opacity: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: '.bento', start: 'top 85%', once: true } });
  var vida = $('.vida'), t1 = $('.fita.f1 .fita-trilho'), t2 = $('.fita.f2 .fita-trilho');
  vida.classList.add('pin');
  var d1 = function () { return Math.max(0, t1.scrollWidth - window.innerWidth); };
  var d2 = function () { return Math.max(0, t2.scrollWidth - window.innerWidth); };
  var vt = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: vida, start: 'top top', end: function () { return '+=' + Math.round(Math.max(d1(), d2()) * 1.05); }, pin: true, scrub: 0.6, anticipatePin: 1, invalidateOnRefresh: true } });
  vt.fromTo(t1, { x: 0 }, { x: function () { return -d1(); } }, 0)
    .fromTo(t2, { x: function () { return -d2(); } }, { x: 0 }, 0);
  gsap.from('.passos li', { y: 60, opacity: 0, duration: 0.8, stagger: 0.14, ease: 'power3.out', scrollTrigger: { trigger: '.passos', start: 'top 88%', once: true } });
  gsap.from('.quadro div', { x: 40, opacity: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: '.quadro', start: 'top 85%', once: true } });
  gsap.from('.cardapio', { y: 60, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.cardapio', start: 'top 88%', once: true } });
  $$('h2').forEach(function (h) {
    gsap.from(h, { y: 40, opacity: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: h, start: 'top 90%', once: true } });
  });

  window.addEventListener('load', function () { ScrollTrigger.refresh(); });
})();
