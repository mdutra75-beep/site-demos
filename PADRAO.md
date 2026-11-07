# Padrão dos sites do site-demos

Resumo do que os sites "esboço 2" têm em comum. Serve de lista de conferência para cada site novo.
Referências: `ponto1-esboco-2/` e `ortomais-esboco-2/` (cada um tem seu `DESIGN.md`).

## Estrutura
1. Hero com **moldura que abre** na rolagem (vídeo ou foto).
2. **Frase-manifesto** que acende palavra por palavra.
3. **Experiência por rolagem**: imagem fixa que muda por etapa, com o texto.
4. **Faixas de cards fixas**: cada faixa para no meio da tela e anda de lado 1 pra 1 com a rolagem; no começo o 1º card e no fim o último aparecem inteiros. Cards com foto e 3 modelos alternados.
5. **Popup** (`<dialog>`) em cada card: foto, texto, para quem, benefícios, botão do WhatsApp, setas anterior/próximo, X/Esc/clique fora; no celular sobe como folha.
6. **Objetivos**: painéis que abrem popup com as atividades/tratamentos indicados (um item pode estar em vários).
7. **Fundo que muda** de cor em uma seção.
8. **Equipe** em carrossel 3D (setas, arrastar, teclado, automático). Fotos e nomes fictícios sinalizados na página.
9. **Como começar** com traço que se desenha.
10. CTA final + contato + botão flutuante do WhatsApp.

## Regras
- Nada começa invisível esperando ser visto (`opacity:0` + observador). Conteúdo sempre presente; movimento só por cima.
- `prefers-reduced-motion` mostra o estado final. Sem JavaScript, o conteúdo continua legível.
- Só animar `transform`, `opacity` e `clip-path`.
- Cabeçalho compacto e opaco ao rolar; conteúdo do topo respeita a altura da janela (tamanho do título usa `vh`).
- Textos de tratamentos/atividades são rascunho: não prometer resultado, não inventar número, preço, duração ou depoimento.
- Conteúdo editável concentrado em blocos de dados no começo do script (ou planilha Google, como a grade do Ponto 1).
- Sempre testar em largura de computador (1440) e de celular (375), com o painel de pré-visualização visível (senão as animações não rodam).
- Publicar por padrão (commit + push em `main`).
- Ao terminar a 1ª versão do esboço, gerar a **ficha privada** do cliente (HTML, fora do repositório): presença digital, problemas do site atual × qualidades do novo, estimativa de visitas atual × novo, contatos. Gerador e fichas ficam em `C:\DEV\Propostas` (não é repositório).

## Bibliotecas
GSAP + ScrollTrigger + Lenis por CDN (versões fixas), fontes do Google Fonts. Hospedagem: GitHub Pages.
