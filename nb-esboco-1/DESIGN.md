# NB Futebol · esboço 1

Escola de futsal em Curitiba (3 a 17 anos). O site atual (nbfutebol.com.br) é só uma página de links; o conteúdo vem do Instagram `@nbfuteboloficial` (11,8 mil seguidores, 1.767 publicações) e da página de links.

**Identidade:** azul-marinho `#000060` e laranja `#F64E00` (da marca, medidos no logo), gelo `#EDEDE8` como fundo claro. A marca usa setas `›››` nos cartazes, então elas aparecem no site. Fontes: Antonio (títulos altos e condensados, como nos cartazes) e Barlow / Barlow Condensed. Cortes inclinados nos botões e nas seções lembram a camisa e a quadra.
**Logo:** o avatar do Instagram, com o fundo branco removido e uma versão clara (azul trocado por branco) para o topo escuro.

**Hero:** `NB.mp4` (Downloads), jogo gravado de cima, recomprimido sem áudio (1,5 MB) **e cortado no alto** para esconder o placar e as marcas da transmissão. O vídeo original é de uma transmissão de terceiros (marcas "oda sport / TDF Play"): confirmar autorização de uso.

**Seção Nilo Biazeto (pedido do usuário):** nome gigante em que o **N** (laranja) e o **B** (azul) crescem enquanto o resto do nome some na rolagem, com a explicação de que as letras N e B originaram o NB e a equação N + B = logo. O bloco ao lado do texto é o painel tipográfico "Multicampeão nos campos" (decisão do usuário em 24/11: está certo assim, não precisa de foto nova). Se um dia quiser a foto, salvar em `assets/nilo-biazeto.jpg` e rodar o gerador. Os textos usam só o que o usuário informou (homenageado, avô do fundador, N e B do nome, multicampeão nos campos).

**Movimento (GSAP 3.13 + ScrollTrigger + SplitText + MotionPath + Lenis):** título do hero que sobe letra por letra; letreiro que anda com a rolagem; linhas de uma quadra de futsal que se desenham no fundo dos programas; lista de programas com foto que segue o mouse e popup; placar com números que contam; colunas de fotos em velocidades diferentes; uma bola que rola pelo caminho dos 3 passos. Sem faixas fixas laterais (o usuário preferiu rolagem padrão). Quem pede menos movimento vê tudo parado.

**Programas (tirados da página de links e das legendas do Instagram):** Formação, Base, Futlab, Mini Craques, Adote um Craque, Trabalhe aqui. Textos de apoio marcados EXEMPLO. Futlab tem só a frase "Treino individualizado" no material público.
**Conquistas (placar):** "Títulos: 12 metropolitanos, 8 paranaenses e 2 Taça Brasil" (informado pelo usuário em 24/11, marcado EXEMPLO na página: confirmar com o NB) e "Reconhecimento: todas as categorias do NB sempre entre as melhores do estado". Os cartões "3 a 17 anos" e "11,8 mil seguidores" seguem do Instagram.

**Pendências:** texto oficial sobre o Nilo Biazeto · autorização de imagem de crianças e do vídeo da transmissão · unidades, endereços e horários (não aparecem em lugar nenhum) · detalhes do Futlab e do Adote um Craque · mensalidades ficaram de fora · domínio.

**Ajustes de 24/11 (tarde):**
- Título do hero sem máscara (a máscara cortava a cauda do Q e a base das letras) e entrelinha maior nos títulos (o acento do "VOCÊ" encostava na linha de cima).
- Seção Nilo Biazeto movida para logo acima de "Além da quadra" (ordem: Programas, Conquistas, Nilo Biazeto, Cuidado, No NB, Como começar, Contato).
- "No NB": 3 linhas de 8 fotos que andam de lado conforme a página rola (sem prender a rolagem), com moldura recortada em laranja e azul e foto que desliza dentro da moldura; funciona no celular.
- "Como começar": a bola é a imagem `Downloads\bola.jpg` (recortada em círculo, `assets/bola.png`) e gira rolando pelo caminho: horizontal no computador e vertical no celular.
- Imagem dos Mini Craques: aguardando o arquivo (a imagem do pedido não chegou). Para usar, salvar em `assets/mini-craques-novo.jpg` já sem as setas e rodar `scratchpad\build_nb.py`.

**Ajustes de 24/11 (noite):**
- "No NB": cartões com largura proporcional à tela (17% da largura), para as linhas sempre passarem da borda mesmo em tela de 1920 px (antes, em tela grande, as 8 fotos cabiam e nada se movia). Cada linha termina o percurso quando chega ao alto da tela, então todas as fotos passam inteiras pela vista, no computador e no celular.
- "Além da quadra": as duas fotos agora têm o mesmo tamanho e alinhamento (sem deslocamento nem parallax).
- "Conquistas": as duas fotos foram trocadas por uma só, `Downloads\nb2.JPG` (Taça Brasil de Futsal, 568x486 px, ampliada 2x: baixa resolução, pedir original), com moldura recortada e a legenda "Taça Brasil de Futsal".
- Os textos novos do placar (Títulos e Reconhecimento) já estavam no ar; quem viu o texto antigo estava com a página em cache (o GitHub Pages guarda por 10 minutos): atualizar com Ctrl+F5.
