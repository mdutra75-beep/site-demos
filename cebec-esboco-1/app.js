/* Escola CEBEC — comportamento do site. O conteúdo já está no HTML; aqui entram só links, abas, filtro, popups e movimento. */
(function () {
  var S = window.SITE || {};
  var reduz = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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
  var hv = $('.arco video');
  if (hv && !reduz) { var p = hv.play(); if (p && p.catch) p.catch(function () {}); }

  /* ---------- menu ---------- */
  var topo = $('#topo-bar'), menuBtn = $('.menu-btn');
  menuBtn.addEventListener('click', function () {
    var aberto = topo.classList.toggle('menu-aberto');
    menuBtn.setAttribute('aria-expanded', aberto);
    menuBtn.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
  });
  $$('.nav a').forEach(function (a) {
    a.addEventListener('click', function () { topo.classList.remove('menu-aberto'); menuBtn.setAttribute('aria-expanded', 'false'); });
  });

  /* ---------- abas dos níveis de ensino ---------- */
  var abas = $$('.abas-lista [role=tab]');
  function abre(i, foco) {
    abas.forEach(function (b, k) {
      var on = k === i;
      b.setAttribute('aria-selected', on); b.tabIndex = on ? 0 : -1;
      var p = document.getElementById(b.getAttribute('aria-controls'));
      if (on) { p.hidden = false; if (!reduz && window.gsap) gsap.fromTo(p, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }); }
      else p.hidden = true;
      if (on && foco) b.focus();
    });
  }
  abas.forEach(function (b, i) {
    b.addEventListener('click', function () { abre(i); });
    b.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); abre((i + 1) % abas.length, true); }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); abre((i - 1 + abas.length) % abas.length, true); }
    });
  });

  /* ---------- filtro do mural ---------- */
  var botoes = $$('.filtros button'), figs = $$('#mural figure');
  botoes.forEach(function (b) {
    b.addEventListener('click', function () {
      var f = b.getAttribute('data-f');
      botoes.forEach(function (x) { x.classList.toggle('on', x === b); });
      figs.forEach(function (fg) { fg.hidden = !(f === 'todos' || fg.getAttribute('data-t') === f); });
    });
  });

  /* ---------- popups dos projetos ---------- */
  var dlg = $('#dlg'), grupo = $$('[data-abrir]').map(function (n) { return n.getAttribute('data-abrir'); }), atual = 0;
  function mostrar() {
    var el = document.getElementById(grupo[atual]);
    $('#dlg-titulo').textContent = $('h4', el).textContent;
    $('#dlg-rotulo').textContent = el.getAttribute('data-rotulo') || '';
    var img = $('#dlg-img'); img.src = el.getAttribute('data-img'); img.alt = $('h4', el).textContent;
    var corpo = $('#dlg-corpo'); corpo.textContent = '';
    var av = document.createElement('p'); av.className = 'aviso';
    var chip = document.createElement('span'); chip.className = 'ex'; chip.textContent = 'EXEMPLO';
    av.appendChild(chip); av.appendChild(document.createTextNode('Texto de apoio baseado no site da escola, a ser revisado por ela.'));
    $$('p, ul', el).forEach(function (n) { corpo.appendChild(n.cloneNode(true)); });
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

  /* ---------- movimento (GSAP + ScrollTrigger + Lenis) ---------- */
  if (reduz || !window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  if (window.Lenis) {
    var lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
    $$('a[href^="#"]').forEach(function (a) {
      var id = a.getAttribute('href');
      if (id.length < 2 || a.hasAttribute('data-wa')) return;
      a.addEventListener('click', function (e) { var alvo = $(id); if (!alvo) return; e.preventDefault(); lenis.scrollTo(alvo, { offset: -64 }); });
    });
  }

  /* hero: texto sobe e o arco entra de baixo */
  var tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  tl.from('.hero-txt > *', { y: 34, opacity: 0, duration: 0.8, stagger: 0.09 })
    .from('.arco', { y: 60, opacity: 0, duration: 1, clipPath: 'inset(18% 12% 0% 12% round 999px 999px 28px 28px)' }, 0.15)
    .from('.selo', { scale: 0.4, opacity: 0, duration: 0.7, ease: 'back.out(1.8)' }, 0.8);
  gsap.to('.arco video, .arco img', { yPercent: 6, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

  /* fotos da escola: entram inclinadas */
  gsap.from('.escola-fotos figure', { y: 70, opacity: 0, duration: 0.9, stagger: 0.18, ease: 'power3.out', scrollTrigger: { trigger: '.escola-fotos', start: 'top 80%', once: true } });
  gsap.from('.escola-txt > :not(h2)', { y: 28, opacity: 0, duration: 0.7, stagger: 0.09, ease: 'power3.out', scrollTrigger: { trigger: '.escola-txt', start: 'top 82%', once: true } });

  /* números: contagem */
  $$('.num-grade b').forEach(function (b) {
    var alvo = +b.getAttribute('data-n'), sep = b.hasAttribute('data-sep'), mais = b.hasAttribute('data-mais');
    var o = { v: 0 };
    function fmt(v) { v = Math.round(v); var s = sep ? String(v).replace(/\B(?=(\d{3})+(?!\d))/g, '.') : String(v); return s + (mais && v >= alvo ? '+' : ''); }
    ScrollTrigger.create({ trigger: b, start: 'top 90%', once: true, onEnter: function () {
      gsap.to(o, { v: alvo, duration: 1.8, ease: 'power2.out', onUpdate: function () { b.textContent = fmt(o.v); }, onComplete: function () { b.textContent = fmt(alvo); } });
    } });
  });
  gsap.from('.num-grade li', { y: 30, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: '.num-grade', start: 'top 88%', once: true } });

  /* cartões do bento */
  gsap.from('.tile', { y: 50, opacity: 0, duration: 0.7, stagger: 0.07, ease: 'power3.out', scrollTrigger: { trigger: '.bento', start: 'top 85%', once: true } });

  /* mural */
  gsap.from('#mural figure', { y: 40, opacity: 0, duration: 0.7, stagger: 0.06, ease: 'power3.out', scrollTrigger: { trigger: '#mural', start: 'top 88%', once: true } });

  /* passos da matrícula */
  gsap.from('.passos li', { y: 40, opacity: 0, duration: 0.7, stagger: 0.14, ease: 'power3.out', scrollTrigger: { trigger: '.passos', start: 'top 88%', once: true } });

  /* títulos */
  $$('h2').forEach(function (h) {
    gsap.from(h, { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: h, start: 'top 90%', once: true } });
  });

  window.addEventListener('load', function () { ScrollTrigger.refresh(); });
})();
