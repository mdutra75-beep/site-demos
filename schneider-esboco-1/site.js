/* Cabeçalho, rodapé, botão do WhatsApp, rolagem suave e barra de progresso (comum às duas páginas) */
(function(){
'use strict';
var PAGE=window.PAGE||'home';
var H=PAGE==='home'?'':'index.html';
var IG='<svg viewBox="0 0 24 24"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5Zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5ZM17.5 6a1 1 0 1 1-1 1 1 1 0 0 1 1-1Z"/></svg>';
var WA='<svg class="i" viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm5.8 14.2c-.2.7-1.4 1.3-1.9 1.3-.5.1-1.1.1-1.8-.1a16 16 0 0 1-6.2-4.1c-1.9-2.1-2.1-3.7-2.1-4.2s.9-1.9 1.5-1.9h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .6l-.4.6-.4.4c-.1.2-.3.3-.1.6a8 8 0 0 0 3.8 3.2c.3.1.5.1.6-.1l.8-1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.4.1.3.1.8-.1 1.1Z"/></svg>';
window.WA_ICON=WA;window.IG_ICON=IG;
window.waLink=function(msg){return 'https://wa.me/55'+SITE.whatsapp+'?text='+encodeURIComponent(msg||SITE.mensagemWhats)};

var head=document.createElement('div');
head.innerHTML='<div class="prog" id="prog"></div><header class="top" id="hd"><div class="wrap hd">'+
 '<a class="brand" href="'+(PAGE==='home'?'#inicio':'index.html')+'"><img src="logo-dr.png" alt="Dr. Ricardo Schneider"><span>Integrative<br>Health Clinic</span></a>'+
 '<button class="burger" id="bg" aria-label="Abrir menu">☰</button>'+
 '<nav class="m" id="nv">'+
 '<a href="'+H+'#frentes">Especialidades</a><a href="'+H+'#esporte">Medicina esportiva</a><a href="'+H+'#instagram">Instagram</a>'+
 '<a href="dicas.html"'+(PAGE==='dicas'?' class="on"':'')+'>Dicas de saúde</a><a href="'+H+'#sobre">Sobre</a><a href="'+H+'#contato">Contato</a>'+
 '<a class="btn wa" target="_blank" rel="noopener" href="'+waLink()+'">'+WA+'Agendar</a></nav></div></header>';
while(head.firstChild)document.body.insertBefore(head.firstChild,document.body.firstChild);

var ft=document.createElement('footer');ft.className='ft';
ft.innerHTML='<div class="wrap"><div class="g">'+
 '<div><div class="logo">Dr. Ricardo Schneider<small>Integrative Health Clinic</small></div><p>Medicina Funcional Integrativa · Medicina Esportiva e do Exercício · Cirurgia Cardiovascular</p>'+
 '<a class="ig-ft" href="'+SITE.instagram+'" target="_blank" rel="noopener" aria-label="Instagram do Dr. Ricardo Schneider"><i>'+IG+'</i><span>'+SITE.instagramUsuario+'</span></a></div>'+
 '<div><h4>Atendimento</h4><ul><li>'+SITE.atendimento+'</li><li><a target="_blank" rel="noopener" href="'+waLink()+'">WhatsApp '+SITE.telefoneTexto+'</a></li><li>'+SITE.endereco+'</li><li><a target="_blank" rel="noopener" href="'+SITE.mapa+'">Como chegar ↗</a></li></ul></div>'+
 '<div><h4>Navegue</h4><ul><li><a href="'+H+'#frentes">Especialidades</a></li><li><a href="'+H+'#esporte">Medicina esportiva</a></li><li><a href="dicas.html">Dicas de saúde</a></li><li><a href="'+H+'#sobre">Sobre o Dr. Ricardo</a></li></ul></div></div>'+
 '<div class="fim">'+SITE.nome+' · '+SITE.crm+' · '+SITE.rqe+' · '+SITE.clinica+'. Este site tem caráter informativo e não substitui a consulta médica.</div></div>';
document.body.appendChild(ft);

var fab=document.createElement('a');fab.className='fab';fab.target='_blank';fab.rel='noopener';fab.href=waLink();fab.innerHTML=WA+'<span>Agendar pelo WhatsApp</span>';fab.setAttribute('aria-label','Agendar pelo WhatsApp');
document.body.appendChild(fab);
var dm=document.createElement('div');dm.className='demo';dm.textContent='Esboço de apresentação · imagens ilustrativas';document.body.appendChild(dm);

var hd=document.getElementById('hd'),rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
document.getElementById('bg').onclick=function(){document.getElementById('nv').classList.toggle('o')};
document.getElementById('nv').onclick=function(){document.getElementById('nv').classList.remove('o')};
window.SITE_REDUCED=rm;
function simples(){var tk=false;function f(){tk=false;var y=scrollY;hd.classList.toggle('s',y>20);var t=document.documentElement.scrollHeight-innerHeight;document.getElementById('prog').style.transform='scaleX('+(t>0?y/t:0)+')'}
  addEventListener('scroll',function(){if(!tk){tk=true;requestAnimationFrame(f)}},{passive:true});f()}
window.addEventListener('DOMContentLoaded',function(){});
window.iniciaMovimento=function(extra){
  if(rm||!window.gsap||!window.ScrollTrigger){simples();if(extra)extra(null);return}
  gsap.registerPlugin(ScrollTrigger);
  var lenis=new Lenis({lerp:.1});lenis.on('scroll',ScrollTrigger.update);gsap.ticker.add(function(t){lenis.raf(t*1000)});gsap.ticker.lagSmoothing(0);
  window.LENIS=lenis;
  document.addEventListener('click',function(e){var a=e.target.closest('a[href^="#"]');if(!a)return;var id=a.getAttribute('href');if(id.length>1&&id.charAt(1)!=='/'&&document.querySelector(id)){e.preventDefault();lenis.scrollTo(id,{offset:-80})}});
  ScrollTrigger.create({start:0,end:'max',onUpdate:function(s){document.getElementById('prog').style.transform='scaleX('+s.progress+')'}});
  ScrollTrigger.create({start:20,onToggle:function(s){hd.classList.toggle('s',s.isActive)}});
  if(extra)extra(gsap);
  window.addEventListener('load',function(){ScrollTrigger.refresh()});
};
})();
