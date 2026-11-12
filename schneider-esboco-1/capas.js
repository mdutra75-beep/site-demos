/* Capas ilustradas (geradas em SVG, sem imagem externa) para os artigos de Dicas de Saúde */
(function(){
var P={
 coracao:'<path d="M32 54C14 40 6 30 6 20a12 12 0 0 1 22-6l4 5 4-5a12 12 0 0 1 22 6c0 10-8 20-26 34Z"/>',
 ecg:'<path d="M3 34h14l5-14 8 28 6-22 4 8h21"/>',
 balanca:'<rect x="8" y="10" width="48" height="44" rx="10"/><path d="M20 24a12 12 0 0 1 24 0M32 24l5-7"/><circle cx="32" cy="24" r="2"/>',
 folha:'<path d="M10 54C8 30 22 10 54 8c2 30-12 46-34 44"/><path d="M10 54 36 28"/>',
 gota:'<path d="M32 6C20 22 14 30 14 40a18 18 0 0 0 36 0C50 30 44 22 32 6Z"/><path d="M24 42a8 8 0 0 0 8 8"/>',
 halter:'<path d="M8 24v16M16 18v28M48 18v28M56 24v16M16 32h32"/>',
 taca:'<path d="M18 6h28l-2 16a12 12 0 0 1-24 0L18 6Z"/><path d="M32 34v20M22 56h20M20 16h24"/>',
 capsula:'<rect x="4" y="22" width="56" height="20" rx="10" transform="rotate(-35 32 32)"/><path d="m24 40 16-16" />',
 mic:'<rect x="22" y="6" width="20" height="30" rx="10"/><path d="M12 30a20 20 0 0 0 40 0M32 50v8M22 58h20"/>',
 fumaca:'<path d="M6 44h40v10H6zM46 44v10M52 44v10"/><path d="M30 34c0-6 8-6 8-14M42 34c0-6 8-6 8-14"/>',
 onda:'<path d="M4 32c6-16 10-16 14 0s8 16 14 0 10-16 14 0 8 16 14 0"/>',
 pressao:'<circle cx="32" cy="30" r="22"/><path d="M32 30l10-10M14 30h4M46 30h4M32 12v4"/><path d="M20 56h24"/>',
 valvula:'<circle cx="32" cy="32" r="24"/><path d="M32 8v24L11 44M32 32l21 12"/>',
 aorta:'<path d="M26 58V28c0-14 8-20 18-20h12M26 28c-4-8-12-8-16-4"/><path d="M40 58V34"/>'
};
window.capaSVG=function(tema,cls){return '<svg class="'+(cls||'')+'" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+(P[tema]||P.coracao)+'</svg>'};
window.capaHTML=function(a){
  var c=a.categoria==='Cirurgia Cardíaca'?'cap w':'cap g';
  return '<div class="'+c+'"><span class="bgi">'+capaSVG(a.tema)+'</span><span class="fgi">'+capaSVG(a.tema)+'</span><i>'+(a.categoria==='Cirurgia Cardíaca'?'Cirurgia cardíaca':'Dicas de saúde')+'</i></div>';
};
})();
