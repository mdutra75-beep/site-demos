# Como editar o site da Nenavit

Tudo o que muda no dia a dia fica em **um único arquivo: `dados.js`**.

## Trocar ou adicionar um telefone
Abra `dados.js`, procure `SETORES`. Cada setor é um bloco `{ ... }`:
- **Trocar número:** mude só a linha `telefone` (só números, com DDD).
- **Novo setor:** copie um bloco inteiro, cole abaixo e mude os dados.
- **Esconder um setor:** `ativo: false`.
- `tipo: 'whatsapp'` mostra botão verde; `tipo: 'ligar'` mostra "Ligar agora" (telefone fixo).

## Atualizar a vitrine
- Coloque a foto na pasta `fotos/` (quadrada fica melhor).
- Em `VITRINE`, copie uma linha e mude `foto`, `nome`, `preco` e `categoria`.
- Produto novo vai no **topo** da lista. `destaque: true` põe a etiqueta "Novidade".
- `preco` vazio mostra "Consulte o setor". `ativo: false` esconde sem apagar.
- O botão "Quero este" abre o WhatsApp do setor certo, já com o nome do produto.

## Sem mexer em código: planilha do Google (opcional)
1. Crie uma planilha com duas abas.
   - **Contatos:** `setor, descricao, telefone, tipo, categorias, ativo`
   - **Vitrine:** `foto, nome, preco, categoria, destaque, ativo`
   (`tipo` = whatsapp ou ligar; `categorias` separadas por `;`; `destaque`/`ativo` = sim ou nao)
2. Em cada aba: Arquivo > Compartilhar > Publicar na Web > formato **CSV**.
3. Cole os dois links em `PLANILHA_CONTATOS` e `PLANILHA_VITRINE` no começo do `dados.js`.
Se o link falhar, o site usa a lista do próprio `dados.js`.

## Pendências a confirmar com a loja
- Telefone de "Compre Aqui": site atual diz (41) 98415-9389; Linktree diz (41) 99179-4061.
- Horário de funcionamento (campo `horario` em `LOJA`, hoje vazio).
- Fotos e nomes da vitrine são **exemplos** do Instagram/site da loja; trocar pelas reais.
- A foto da fachada vem do site atual (nome do arquivo indica imagem editada por IA): pedir foto real.
