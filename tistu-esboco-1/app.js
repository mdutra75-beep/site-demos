/* Tistu — comportamento do site. O conteúdo já está no HTML; aqui entram links, seletor de unidade e movimento por cima.
   Movimento: GSAP 3.13 (ScrollTrigger + SplitText) + Lenis. Sem "prefers-reduced-motion": tudo aparece parado. */
(function () {
  var S = window.SITE || {};
  var reduz = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var mouse = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- links das unidades (vêm de dados.js) ---------- */
  function un(n) { return (S.unidades || {})[n] || {}; }
  $$('[data-u]').forEach(function (a) {
    var u = un(a.getAttribute('data-u')), acao = a.getAttribute('data-acao');
    if (acao === 'wa') a.href = 'https://wa.me/' + u.whatsapp + '?text=' + encodeURIComponent(S.mensagem(u.nome));
    if (acao === 'tel') a.href = 'tel:' + u.telLink;
    if (acao === 'rota') a.href = 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(u.consulta);
  });

  /* ---------- seletor de unidade (matrículas) ---------- */
  var botoes = $$('.seletor button');
  function escolhe(n) {
    var u = un(n);
    botoes.forEach(function (b) { b.setAttribute('aria-selected', b.getAttribute('data-sel') === String(n)); });
    $('#si-end').textContent = u.nome + ' · ' + u.endereco;
    $('#si-tel').textContent = 'Telefone ' + u.tel + ' · WhatsApp ' + u.whatsappTexto;
    $('#si-wa').href = 'https://wa.me/' + u.whatsapp + '?text=' + encodeURIComponent(S.mensagem(u.nome));
    $('#si-rota').href = 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(u.consulta);
    $('#si-mapa').src = 'https://www.google.com/maps?q=' + encodeURIComponent(u.consulta) + '&output=embed';
  }
  botoes.forEach(function (b) { b.addEventListener('click', function () { escolhe(b.getAttribute('data-sel')); }); });
  escolhe(1);

  /* ---------- menu e barra ---------- */
  var topo = $('#topo-bar'), menuBtn = $('.menu-btn');
  function barra() { topo.classList.toggle('solido', window.scrollY > 80); }
  window.addEventListener('scroll', barra, { passive: true }); barra();
  menuBtn.addEventListener('click', function () {
    var aberto = topo.classList.toggle('menu-aberto');
    menuBtn.setAttribute('aria-expanded', aberto);
    menuBtn.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
  });
  $$('.nav a').forEach(function (a) {
    a.addEventListener('click', function () { topo.classList.remove('menu-aberto'); menuBtn.setAttribute('aria-expanded', 'false'); });
  });

  /* ---------- painéis das unidades ---------- */
  var paineis = $('.paineis'), pn = $$('.painel');
  function abrePainel(i) {
    paineis.setAttribute('data-on', i + 1);
    pn.forEach(function (p, k) { p.classList.toggle('on', k === i); });
  }
  pn.forEach(function (p, i) {
    p.addEventListener('mouseenter', function () { if (mouse) abrePainel(i); });
    p.addEventListener('focus', function () { abrePainel(i); });
    p.addEventListener('click', function (e) { if (!e.target.closest('a')) abrePainel(i); });
  });
  abrePainel(0);

  /* ---------- faixas de fotos: rolagem lateral padrão + arrastar com o mouse ---------- */
  $$('.faixa-pin').forEach(function (pin) {
    var x0 = 0, s0 = 0, down = false, moveu = false;
    pin.addEventListener('pointerdown', function (e) { if (e.pointerType !== 'mouse') return; down = true; moveu = false; x0 = e.clientX; s0 = pin.scrollLeft; });
    window.addEventListener('pointermove', function (e) { if (!down) return; var dx = e.clientX - x0; if (Math.abs(dx) > 4) { moveu = true; pin.classList.add('arrastando'); } if (moveu) pin.scrollLeft = s0 - dx; });
    window.addEventListener('pointerup', function () { down = false; pin.classList.remove('arrastando'); });
  });

  /* vídeo do topo: alguns navegadores só tocam se mandarmos */
  var hv = $('.hero-bg video');
  if (hv && !reduz) { var pp = hv.play(); if (pp && pp.catch) pp.catch(function () {}); }

  if (reduz || !window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  var temSplit = !!window.SplitText; if (temSplit) gsap.registerPlugin(SplitText);
  var EXPO = 'expo.out';

  /* ---------- rolagem suave ---------- */
  var lenis;
  if (window.Lenis) {
    lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
    $$('a[href^="#"]').forEach(function (a) {
      var id = a.getAttribute('href');
      if (id.length < 2 || a.hasAttribute('data-acao')) return;
      a.addEventListener('click', function (e) { var alvo = $(id); if (!alvo) return; e.preventDefault(); lenis.scrollTo(alvo, { offset: -50, duration: 1.6 }); });
    });
  }

  /* ---------- cursor com texto e botões magnéticos (só com mouse) ---------- */
  if (mouse) {
    var cur = $('.cursor'), rot = $('span', cur), cx = 0, cy = 0, tx = 0, ty = 0;
    window.addEventListener('mousemove', function (e) { tx = e.clientX; ty = e.clientY; cur.classList.add('on'); });
    gsap.ticker.add(function () { cx += (tx - cx) * 0.22; cy += (ty - cy) * 0.22; cur.style.transform = 'translate(' + cx + 'px,' + cy + 'px)'; });
    $$('[data-cursor]').forEach(function (el) {
      el.addEventListener('mouseenter', function () { rot.textContent = el.getAttribute('data-cursor'); cur.classList.add('txt'); });
      el.addEventListener('mouseleave', function () { cur.classList.remove('txt'); });
    });
    $$('.mag').forEach(function (b) {
      b.addEventListener('mousemove', function (e) {
        var r = b.getBoundingClientRect();
        gsap.to(b, { x: (e.clientX - r.left - r.width / 2) * 0.25, y: (e.clientY - r.top - r.height / 2) * 0.35, duration: 0.4, ease: 'power3.out' });
      });
      b.addEventListener('mouseleave', function () { gsap.to(b, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1,0.45)' }); });
    });
  }

  /* ---------- vinha que cresce com a rolagem ---------- */
  var vinha = $('.vinha');
  if (vinha) {
    var folhas = $$('i', vinha);
    ScrollTrigger.create({ trigger: document.body, start: 'top top', end: 'bottom bottom', onUpdate: function (st) {
      var p = st.progress; vinha.style.setProperty('--d', (1 - p).toFixed(4));
      folhas.forEach(function (f) { var y = parseFloat(f.style.getPropertyValue('--y')) / 100; f.classList.toggle('on', p >= 1 - y - 0.02); });
    } });
  }

  /* ---------- hero (espera as fontes para medir as letras) ---------- */
  var tl = gsap.timeline({ defaults: { ease: EXPO }, paused: true });
  var linhas = $$('.h-gigante span');
  if (temSplit) {
    var sp = SplitText.create(linhas, { type: 'words,chars', mask: 'chars' });
    tl.from(sp.chars, { yPercent: 115, rotate: 8, duration: 1.2, stagger: 0.025 });
  } else { tl.from(linhas, { y: 60, opacity: 0, duration: 1, stagger: 0.12 }); }
  tl.from('.hero .eyebrow, .hero-sub, .hero-cta', { y: 24, opacity: 0, filter: 'blur(6px)', duration: 0.9, stagger: 0.1 }, 0.5)
    .from('.hero-un li', { y: 24, opacity: 0, duration: 0.8, stagger: 0.1 }, 1);
  var iniciaHero = function () { tl.play(); };
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(iniciaHero); else iniciaHero();
  gsap.to('.hero-bg video, .hero-bg img', { yPercent: 9, scale: 1.08, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  gsap.to('.hero-in', { y: -70, opacity: 0.1, ease: 'none', scrollTrigger: { trigger: '.hero', start: '45% top', end: 'bottom top', scrub: true } });

  /* ---------- manifesto: foto dentro das letras e crenças que acendem ---------- */
  gsap.fromTo('.mf-foto', { y: -120, scale: 1.05 }, { y: 80, scale: 1.2, ease: 'none', transformOrigin: '50% 50%', scrollTrigger: { trigger: '.mf-letras', start: 'top bottom', end: 'bottom top', scrub: 0.6 } });
  $$('[data-acende]').forEach(function (li) {
    var ws;
    if (temSplit) { var s = SplitText.create(li, { type: 'words' }); ws = s.words; }
    else { li.innerHTML = li.textContent.trim().split(/\s+/).map(function (w) { return '<span class="w">' + w + '</span>'; }).join(' '); ws = $$('.w', li); }
    gsap.set(ws, { opacity: 0.18 });
    gsap.to(ws, { opacity: 1, ease: 'none', stagger: 0.12, scrollTrigger: { trigger: li, start: 'top 82%', end: 'bottom 52%', scrub: 0.4 } });
  });

  /* ---------- painéis das unidades: entram ---------- */
  gsap.from('.painel', { y: 90, opacity: 0, filter: 'blur(8px)', duration: 1.1, stagger: 0.12, ease: EXPO, scrollTrigger: { trigger: '.paineis', start: 'top 85%', once: true } });

  /* ---------- capítulos das unidades ---------- */
  $$('.cap').forEach(function (cap) {
    gsap.fromTo($('.num', cap), { yPercent: 8 }, { yPercent: -18, ease: 'none', scrollTrigger: { trigger: cap, start: 'top bottom', end: 'bottom top', scrub: true } });
    gsap.from($$('.cap-tx > *', cap), { y: 50, opacity: 0, filter: 'blur(6px)', duration: 1, stagger: 0.09, ease: EXPO, scrollTrigger: { trigger: $('.cap-tx', cap), start: 'top 82%', once: true } });
    gsap.from($$('.cap-pe > *', cap), { y: 40, opacity: 0, duration: 0.9, stagger: 0.1, ease: EXPO, scrollTrigger: { trigger: $('.cap-pe', cap), start: 'top 92%', once: true } });
  });

  var mm = gsap.matchMedia();
  $$('.faixa-pin').forEach(function (pin) {
    gsap.from($$('.cartao', pin), { x: 60, opacity: 0, duration: 0.9, stagger: 0.08, ease: EXPO, scrollTrigger: { trigger: pin, start: 'top 88%', once: true } });
  });

  /* Tistu 2: mosaico abre com recorte e baralho empilha */
  $$('.m-card').forEach(function (c) {
    gsap.fromTo(c, { clipPath: 'inset(14% 10% 14% 10% round 28px)', y: 50 }, { clipPath: 'inset(0% 0% 0% 0% round 28px)', y: 0, ease: 'none', scrollTrigger: { trigger: c, start: 'top 92%', end: 'top 55%', scrub: true } });
    gsap.fromTo($('img', c), { scale: 1.3 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: c, start: 'top 95%', end: 'bottom 30%', scrub: true } });
  });
  var bc = $$('.b-card');
  bc.forEach(function (c, i) {
    var prox = bc[i + 1]; if (!prox) return;
    gsap.to(c, { scale: 0.94, '--esc': 0.55, ease: 'none', scrollTrigger: { trigger: prox, start: 'top 88%', end: 'top 25%', scrub: true } });
  });

  /* valores: cartas saem de uma pilha e abrem em leque */
  mm.add('(min-width: 981px)', function () {
    var cartas = $$('.carta');
    cartas.forEach(function (c, i) {
      gsap.fromTo(c, { x: function () { var l = $('.leque').getBoundingClientRect(), r = c.getBoundingClientRect(); return (l.left + l.width / 2 - r.width / 2) - (r.left - gsap.getProperty(c, 'x')); }, y: 30, rotate: (i - 1.5) * 9, scale: 0.92 },
        { x: 0, y: 0, rotate: 0, scale: 1, ease: 'none', scrollTrigger: { trigger: '.leque', start: 'top 88%', end: 'top 30%', scrub: 0.6, invalidateOnRefresh: true } });
    });
  });
  mm.add('(max-width: 980px)', function () {
    gsap.from('.carta', { y: 50, opacity: 0, duration: 0.8, stagger: 0.1, ease: EXPO, scrollTrigger: { trigger: '.leque', start: 'top 85%', once: true } });
  });

  /* história: fotos flutuam e números contam */
  $$('[data-vel]').forEach(function (f) {
    gsap.to(f, { y: parseFloat(f.getAttribute('data-vel')) * 420, ease: 'none', scrollTrigger: { trigger: '.historia', start: 'top bottom', end: 'bottom top', scrub: true } });
  });
  $$('.h-num b').forEach(function (b) {
    var alvo = +b.getAttribute('data-n'), de = alvo > 1900 ? 1900 : 0, o = { v: de };
    ScrollTrigger.create({ trigger: b, start: 'top 90%', once: true, onEnter: function () {
      gsap.to(o, { v: alvo, duration: 1.8, ease: 'power3.out', onUpdate: function () { b.textContent = Math.round(o.v); }, onComplete: function () { b.textContent = alvo; } });
    } });
  });
  gsap.from('.inspira', { y: 50, opacity: 0, duration: 1, ease: EXPO, scrollTrigger: { trigger: '.inspira', start: 'top 90%', once: true } });

  /* novidades e matrículas */
  gsap.from('.post', { y: 70, opacity: 0, filter: 'blur(6px)', duration: 1, stagger: 0.1, ease: EXPO, scrollTrigger: { trigger: '.trilho-nv', start: 'top 88%', once: true } });
  gsap.from('.mt-tx > *', { y: 40, opacity: 0, duration: 0.9, stagger: 0.08, ease: EXPO, scrollTrigger: { trigger: '.matriculas', start: 'top 70%', once: true } });

  /* títulos */
  $$('h2').forEach(function (h) {
    if (h.closest('.cap-tx')) return;
    gsap.from(h, { y: 50, opacity: 0, filter: 'blur(6px)', duration: 1, ease: EXPO, scrollTrigger: { trigger: h, start: 'top 90%', once: true } });
  });

  window.addEventListener('load', function () { ScrollTrigger.refresh(); });
})();
