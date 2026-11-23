/* Colégio Fênix — comportamento do site. O conteúdo já está no HTML; aqui entram só links, movimento e popups. */
(function () {
  var S = window.SITE || {};
  var reduz = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- links de contato (vêm de dados.js) ---------- */
  function wa(msg) { return 'https://wa.me/' + S.whatsapp + '?text=' + encodeURIComponent(msg || ''); }
  $$('[data-wa]').forEach(function (a) {
    var tipo = a.getAttribute('data-wa');
    a.href = wa(tipo === 'visita' ? S.mensagemVisita : S.mensagemMatricula);
    a.target = '_blank'; a.rel = 'noopener';
  });
  $$('[data-tel]').forEach(function (a) { a.href = 'tel:' + S.telefoneLink; });
  $$('[data-mapa]').forEach(function (a) { a.href = S.mapa; });
  $$('[data-rota]').forEach(function (a) { a.href = S.rota; });
  $$('[data-insta]').forEach(function (a) { a.href = S.instagram; });
  $$('[data-mail]').forEach(function (a) {
    var assunto = a.getAttribute('data-mail') === 'trabalhe' ? '?subject=' + encodeURIComponent('Trabalhe conosco') : '';
    a.href = 'mailto:' + S.email + assunto;
  });
  $$('[data-txt]').forEach(function (e) { var v = S[e.getAttribute('data-txt')]; if (v) e.textContent = v; });
  /* o botão "Matrículas" do menu e o CTA da hero abrem o WhatsApp; âncora fica como plano B sem JS */

  /* ---------- cabeçalho e menu ---------- */
  var topo = $('#topo-bar');
  function barra() { topo.classList.toggle('compacto', window.scrollY > 40); }
  window.addEventListener('scroll', barra, { passive: true }); barra();
  var menuBtn = $('.menu-btn');
  menuBtn.addEventListener('click', function () {
    var aberto = document.body.classList.toggle('menu-aberto');
    topo.classList.toggle('menu-aberto', aberto);
    menuBtn.setAttribute('aria-expanded', aberto);
    menuBtn.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
  });
  $$('.nav a').forEach(function (a) {
    a.addEventListener('click', function () {
      document.body.classList.remove('menu-aberto'); topo.classList.remove('menu-aberto');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- popups (diferenciais e etapas): funcionam com ou sem animação ---------- */
  var dlg = $('#dlg'), grupoAtual = [], atual = 0;
  function abrirPor(id) {
    var el = document.getElementById(id); if (!el) return;
    var item = $('[data-abrir="' + id + '"]');
    var g = item ? item.getAttribute('data-grupo') : 'dif';
    grupoAtual = $$('[data-abrir][data-grupo="' + g + '"]').map(function (n) { return n.getAttribute('data-abrir'); });
    atual = Math.max(0, grupoAtual.indexOf(id));
    mostrar();
  }
  function mostrar() {
    var el = document.getElementById(grupoAtual[atual]);
    $('#dlg-titulo').textContent = $('h4', el).textContent;
    $('#dlg-rotulo').textContent = el.getAttribute('data-rotulo') || '';
    var img = $('#dlg-img'); img.src = el.getAttribute('data-img'); img.alt = $('h4', el).textContent;
    $('#dlg-ex').style.display = el.hasAttribute('data-ex') ? '' : 'none';
    var corpo = $('#dlg-corpo'); corpo.textContent = '';
    var av = document.createElement('p'); av.className = 'aviso-ex';
    var chip = document.createElement('span'); chip.className = 'exemplo-i'; chip.textContent = 'EXEMPLO';
    av.appendChild(chip); av.appendChild(document.createTextNode(' Texto de apoio baseado no site da escola, a ser revisado por ela.'));
    corpo.appendChild(av);
    $$('p, ul', el).forEach(function (n) { corpo.appendChild(n.cloneNode(true)); });
    var unico = grupoAtual.length < 2;
    $('#dlg-ant').style.display = $('#dlg-prox').style.display = unico ? 'none' : '';
    if (!dlg.open) dlg.showModal();
    corpo.scrollTop = 0;
  }
  function passo(d) { atual = (atual + d + grupoAtual.length) % grupoAtual.length; mostrar(); }
  $$('[data-abrir]').forEach(function (b) { b.addEventListener('click', function () { abrirPor(b.getAttribute('data-abrir')); }); });
  $('#dlg-x').addEventListener('click', function () { dlg.close(); });
  $('#dlg-ant').addEventListener('click', function () { passo(-1); });
  $('#dlg-prox').addEventListener('click', function () { passo(1); });
  dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') passo(-1);
    if (e.key === 'ArrowRight') passo(1);
  });

  /* ---------- carrossel 3D da equipe ---------- */
  var slides = $$('#car3d .slide3d'), ci = 0, timerC;
  function pintaC() {
    var n = slides.length;
    slides.forEach(function (s, i) {
      s.classList.remove('ativo', 'ant', 'prox');
      if (i === ci) s.classList.add('ativo');
      else if (i === (ci - 1 + n) % n) s.classList.add('ant');
      else if (i === (ci + 1) % n) s.classList.add('prox');
    });
  }
  function vaiC(d) { ci = (ci + d + slides.length) % slides.length; pintaC(); }
  function autoC() { clearInterval(timerC); if (!reduz) timerC = setInterval(function () { vaiC(1); }, 5500); }
  pintaC(); autoC();
  $('#c-ant').addEventListener('click', function () { vaiC(-1); autoC(); });
  $('#c-prox').addEventListener('click', function () { vaiC(1); autoC(); });
  var car = $('#car3d'), x0 = null;
  car.style.touchAction = 'pan-y'; /* deixa o dedo arrastar de lado no celular */
  car.addEventListener('pointerdown', function (e) { x0 = e.clientX; });
  car.addEventListener('pointerup', function (e) {
    if (x0 === null) return; var dx = e.clientX - x0; x0 = null;
    if (Math.abs(dx) > 40) { vaiC(dx < 0 ? 1 : -1); autoC(); }
  });
  car.addEventListener('mouseenter', function () { clearInterval(timerC); });
  car.addEventListener('mouseleave', autoC);
  slides.forEach(function (s, i) { s.addEventListener('click', function () { if (i !== ci) { ci = i; pintaC(); autoC(); } }); });

  /* ---------- depoimentos ---------- */
  var itens = $$('#depo .depo-item'), di = 0, timerD, dots = $('#dots');
  itens.forEach(function (_, i) {
    var b = document.createElement('button'); b.setAttribute('aria-label', 'Depoimento ' + (i + 1));
    b.addEventListener('click', function () { vaiD(i); autoD(); }); dots.appendChild(b);
  });
  function vaiD(i) {
    di = (i + itens.length) % itens.length;
    itens.forEach(function (it, k) { it.classList.toggle('on', k === di); });
    $$('button', dots).forEach(function (b, k) { b.classList.toggle('on', k === di); });
  }
  function autoD() { clearInterval(timerD); if (!reduz) timerD = setInterval(function () { vaiD(di + 1); }, 9000); }
  vaiD(0); autoD();
  $('#d-ant').addEventListener('click', function () { vaiD(di - 1); autoD(); });
  $('#d-prox').addEventListener('click', function () { vaiD(di + 1); autoD(); });

  /* ---------- movimento (GSAP + ScrollTrigger + Lenis) ---------- */
  if (reduz || !window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  var lenis;
  if (window.Lenis) {
    lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
    $$('a[href^="#"]').forEach(function (a) {
      var id = a.getAttribute('href');
      if (id.length < 2 || a.hasAttribute('data-wa')) return;
      a.addEventListener('click', function (e) {
        var alvo = $(id); if (!alvo) return; e.preventDefault();
        lenis.scrollTo(alvo, { offset: -60 });
      });
    });
  }

  var mm = gsap.matchMedia();

  /* hero: moldura que abre na rolagem */
  mm.add('(min-width: 981px)', function () {
    var frame = $('.hero-frame');
    gsap.set(frame, { clipPath: 'inset(7% 5% 9% 5% round 36px)' });
    gsap.to(frame, {
      clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: '+=70%', scrub: 0.5, pin: true }
    });
  });
  mm.add('(max-width: 980px)', function () {
    gsap.to('.hero-frame img', { yPercent: 8, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  });

  /* manifesto: palavras acendem */
  $$('[data-acende]').forEach(function (p) {
    var palavras = p.textContent.trim().split(/\s+/);
    p.innerHTML = palavras.map(function (w) { return '<span class="w">' + w + '</span>'; }).join(' ');
    var ws = $$('.w', p);
    gsap.set(ws, { opacity: 0.22 });
    gsap.to(ws, { opacity: 1, ease: 'none', stagger: 0.12,
      scrollTrigger: { trigger: p, start: 'top 82%', end: 'bottom 45%', scrub: 0.4 } });
  });

  /* cartões de fatos */
  gsap.from('.fato', { y: 40, opacity: 0.4, duration: 0.8, stagger: 0.12, ease: 'power3.out',
    scrollTrigger: { trigger: '.fatos', start: 'top 85%', once: true } });

  /* etapas: imagem fixa que muda por etapa */
  mm.add('(min-width: 981px)', function () {
    var box = $('#etapas-visual'); box.classList.add('js');
    var imgs = $$('img', box);
    function mostra(i) { imgs.forEach(function (im, k) { im.classList.toggle('on', k === i); }); }
    mostra(0);
    $$('.etapa').forEach(function (et, i) {
      ScrollTrigger.create({ trigger: et, start: 'top 55%', end: 'bottom 55%', onToggle: function (s) { if (s.isActive) mostra(i); } });
    });
  });

  /* diferenciais: faixa fixa que anda de lado (1º e último cartões inteiros nas pontas) */
  mm.add('(min-width: 981px)', function () {
    var track = $('#dif-track');
    var dist = function () { return Math.max(0, track.scrollWidth - window.innerWidth); };
    gsap.to(track, { x: function () { return -dist(); }, ease: 'none',
      scrollTrigger: { trigger: '.dif-pin', start: 'top top', end: function () { return '+=' + dist(); }, pin: true, scrub: 0.6, invalidateOnRefresh: true } });
  });

  /* valores: o fundo muda de claro para índigo */
  (function () {
    var sec = $('#valores'), fundo = $('.fundo', sec);
    gsap.to(fundo, { opacity: 1, ease: 'none',
      scrollTrigger: { trigger: sec, start: 'top 70%', end: 'top 20%', scrub: true,
        onUpdate: function (s) { sec.classList.toggle('escuro', s.progress > 0.55); } } });
    gsap.from('#valores .chip', { y: 30, duration: 0.7, stagger: 0.05, ease: 'power3.out',
      scrollTrigger: { trigger: '#valores .chips', start: 'top 88%', once: true } });
  })();

  /* como começar: traço que se desenha (clip-path) */
  mm.add('(min-width: 981px)', function () {
    gsap.fromTo('#linha', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', ease: 'none',
      scrollTrigger: { trigger: '.passos', start: 'top 80%', end: 'top 35%', scrub: true } });
  });
  gsap.from('.passo', { y: 40, duration: 0.8, stagger: 0.15, ease: 'power3.out',
    scrollTrigger: { trigger: '.passos', start: 'top 88%', once: true } });

  /* títulos das seções entram de baixo */
  $$('.etapas-cab, .dif-cab, .vida-cab, .equipe h2, .contato h2').forEach(function (el) {
    gsap.from(el, { y: 36, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
  });

  window.addEventListener('load', function () { ScrollTrigger.refresh(); });
})();
