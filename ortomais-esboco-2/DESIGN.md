# DESIGN.md — OrtoMais Odontologia (esboço 2)

Segue o padrão definido no Ponto 1 (ver `../PADRAO.md`), com identidade própria.

## Identidade (do logo e do site atual da clínica)
- Logo: dente em cinza com um fio ortodôntico verde-água. Verde da marca ≈ `#3a9a80`.
- Clima: acolhedor, familiar, claro. Nada de "clínica fria": cores suaves, formas arredondadas (arco/pílula), foto de pessoas.
- Títulos em serifa suave (Fraunces); texto em Manrope.
- Forma-assinatura: o **arco** (topo arredondado), vindo do primeiro esboço. Aparece na moldura do hero e na foto da "experiência".

## Paleta
| Token | Valor | Uso |
|---|---|---|
| --ink | #123a38 | verde-petróleo, fundos escuros e texto |
| --brand | #3a9a80 | verde da marca, destaques |
| --aqua | #b9ded5 | cartões e fundos suaves |
| --cream | #f7f5ef | fundo principal |
| --paper | #fffdf9 | popups e seções claras |
| --gold | #e7c878 | detalhe raro (1 por tela) |

## Movimento (mesmo vocabulário do Ponto 1, com timbre mais suave)
1. **Moldura em arco que abre** (hero, com o vídeo da clínica).
2. **Frase que acende** palavra por palavra.
3. **Experiência por rolagem**: foto em arco que troca por revelação de baixo para cima, com o texto.
4. **Faixas fixas**: cada faixa de tratamentos fica parada no meio e anda de lado 1 pra 1 com a rolagem (todos os cards aparecem inteiros).
5. **Fundo que muda**: creme → verde-petróleo na faixa de números, com contagem.
6. **Objetivos** em painéis que abrem popup com os tratamentos indicados.
7. **Equipe** em carrossel 3D.
8. **Traço** que se desenha em "como começar".
- Regras: nada de seção que começa invisível (`opacity:0`) esperando ser vista — foi isso que causava a faixa em branco no esboço 1. `prefers-reduced-motion` mostra tudo no estado final.

## Cartões (3 modelos nas faixas)
- **Foto**: imagem inteira com degradê verde-petróleo embaixo.
- **Aqua**: imagem com véu verde da marca e numeral grande.
- **Dividido**: foto em cima, texto em creme embaixo.

## Conteúdo
- Dados reais vindos do site/Instagram atual: endereço, telefones, horários, @ortomais_barreirinha.
- Provisório (a confirmar): "5,0 no Google · 637 avaliações", "8 dentistas", "4.200+ pacientes", equipe e fotos (fictícias), imagens dos tratamentos.
- Não inventar depoimentos de pacientes.
