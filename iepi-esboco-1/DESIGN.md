# IEPI – Escola Pinhais · esboço 1

**Identidade (regra: 2 cores base do cliente + 1 destaque)**
| Papel | Cor | Uso |
|---|---|---|
| Base 1 | azul profundo `#0A5C8F` (sombra `#064468`), derivado do azul do site atual | cabeçalho, etapas, depoimentos, rodapé, textos de título |
| Base 2 | azul céu `#009FE3` (o azul do site atual) | cards, equipe, detalhes, traço do "como começar" |
| Destaque | amarelo `#FFCF00` | botões principais, selo, etiquetas, "EXEMPLO" |
| Papel | `#F2F8FD` | seções claras (tom do azul) |

Em 23/11/2026 o tom arroxeado (índigo `#312783`) foi trocado pelo azul profundo, a pedido: o azul do site novo deve seguir o azul do site atual. O índigo continua só no quadrado do logo (arquivo de imagem).
Tipografia: Baloo 2 (títulos) + Nunito (texto). Motivo: os quadrados sobrepostos do logo.

**Estrutura:** hero com moldura que abre → manifesto que acende → etapas (botão abre card com informações) → faixa de diferenciais com imagem em cada card + popup → valores (fundo que muda) → **estrutura** (8 espaços) → vida no IEPI (4 blocos com fotos reais do Instagram) → equipe em carrossel 3D (mais fotos) → como começar → depoimentos → contato + mapa com "Como chegar" + WhatsApp flutuante.

**Conteúdo editável:** `dados.js` (contato, link da rota e do Instagram). Textos ficam em HTML (bom para SEO).

**Conteúdo de EXEMPLO (gerado por mim, a trocar pelo da escola):** textos longos dos 11 diferenciais e das 3 etapas (aparecem no popup com o selo "EXEMPLO"), e todas as imagens de `assets/ex/` (22 ilustrações SVG: diferenciais, etapas e estrutura), sempre com o selo "EXEMPLO". Para trocar: substituir o arquivo em `assets/ex/` por uma foto (mesmo nome/ou ajustar o `src`) e remover o `<span class="exemplo">` correspondente. As ilustrações usam ícones Twemoji (licença CC-BY 4.0, créditos: Twitter/Twemoji, https://github.com/twitter/twemoji).

**Origem do conteúdo real:** site atual (textos institucionais, diferenciais, depoimentos, contatos) e Instagram `@iepiescolapinhais` (fotos e legendas). Fotos de alunos vêm do Instagram da própria escola: confirmar autorização de uso de imagem antes de publicar de verdade.

**Pendências / a confirmar com a escola:** descrições dos diferenciais (hoje de exemplo); horário de atendimento; logo colorida (só há a versão branca); fotos próprias em alta resolução (estrutura, equipe, etapas); nome do domínio final.
