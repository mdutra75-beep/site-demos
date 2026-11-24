# Tistu · esboço 1

Rede de escola com **3 unidades** em Curitiba (Tistu 1 e 2 na Água Verde, Tistu 3 no Campo Comprido). Conteúdo e fotos vêm do site atual (tistu.com.br) e do Instagram `@caetistu`.

**Identidade:** navy `#00264F` e verde `#008B71` (do logo), coral `#F27474` como destaque. Cada unidade ganha a cor que o próprio site atual já usa: Tistu 1 coral, Tistu 2 azul `#2778C4`, Tistu 3 verde. Apoio: lima `#A5DC86` / `#EAF6DD` e creme `#FFF8EC` (sem branco puro).
**Fontes:** Bricolage Grotesque (títulos), Instrument Serif itálico (destaques) e Hanken Grotesk (texto). Logo: o SVG do site atual, redesenhado em `<symbol>` para trocar de cor (creme sobre o vídeo, navy e verde com o topo cheio).

**Ideia central:** o livro *O Menino do Dedo Verde* (inspiração do nome). Uma **vinha** cresce na lateral esquerda conforme a página rola (só em tela larga) e brota folhas.

**Movimento (GSAP 3.13 + ScrollTrigger + SplitText + Lenis, por CDN):**
- Hero com vídeo de fundo (`Video hero escolas.mp4`, o mesmo do Fênix e do CEBEC) e título que entra letra por letra (máscara + SplitText).
- "SOU FELIZ, SOU TISTU!" com **foto dentro das letras** (recorte em SVG), que se move na rolagem.
- Crenças da escola que acendem palavra por palavra.
- **Painéis das 3 unidades** que abrem ao passar o mouse (ou tocar).
- Um capítulo por unidade, cada um com a cor e um movimento: Tistu 1 e Tistu 3 com **faixa de fotos fixa que anda de lado** (uma para cada lado); Tistu 2 com **mosaico que abre com recorte** e **baralho de cartas que empilham**.
- Valores em **cartas que saem de uma pilha e abrem em leque**.
- Números que contam, fotos que flutuam, blog em faixa de cartões, seletor de unidade com mapa.
- Cursor com texto ("ver", "ir", "ler") e botões magnéticos (só com mouse).
- No celular: faixas viram rolagem de lado nativa, sem seções fixas; quem pede menos movimento vê tudo parado.
- Motivo das bibliotecas: SplitText e ScrollSmoother passaram a ser grátis no GSAP 3.13 (conferido no CDN jsDelivr); usamos SplitText.

**Origem das fotos:** todas do site tistu.com.br (pastas de unidades, valores, história e blog). O texto de cada cartão de espaço é só o nome do espaço, como no site atual; nada inventado.
**Textos:** parágrafos das unidades, valores, história e inspiração são resumos do site atual.

**Pendências / a confirmar com a escola:** autorização de uso de imagem de alunos (repositório público) · logo em arquivo original · foto de cada nível/etapa se houver mais · links das novidades (as páginas do blog devolviam erro 500 em 24/11) · domínio · horário de atendimento das secretarias · mensalidades ficaram de fora de propósito.
