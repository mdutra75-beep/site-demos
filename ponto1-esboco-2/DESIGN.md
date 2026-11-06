# DESIGN.md — Ponto 1 Academia (esboço 2)

## Identidade (tirada do logo e do Instagram @acadponto1)
- Preto profundo + vermelho do logo + branco. Cinza só como apoio.
- Letras condensadas pesadas em caixa alta (Barlow Condensed 800–900), texto corrido em Manrope.
- Motivo gráfico: chevrons `>>>` (usados nos posts deles) como seta de movimento.
- Público real: mulheres e 60+ (texto do site atual) + quem treina pesado. Tom: acolhedor e forte, nunca "agressivo".

## Paleta
| Token | Valor | Uso |
|---|---|---|
| --ink | #0b0b0c | fundo principal |
| --ink-2 | #151517 | cartões escuros |
| --red | #e5232d | ação, destaque (1 por tela) |
| --paper | #efece8 | seção clara de contraste |
| --muted | #9a9a9f | texto de apoio |

## Movimento (vocabulário fechado — não inventar além disto)
1. **Moldura que abre** (hero): foto entra recortada e abre até a tela cheia com a rolagem.
2. **Texto que acende**: frase-manifesto vai de apagado a sólido palavra por palavra (scrub).
3. **História por rolagem**: foto real da academia fixa na tela; zoom/enquadramento e título mudam por etapa.
4. **Faixas em velocidades diferentes**: modalidades em 3 faixas que andam em direções opostas conforme a rolagem (transição estilo Paaspop).
5. **Fundo que muda**: preto → papel na seção da grade.
6. **Traço que se desenha**: "como começar" com curva que se desenha e números que acendem.
- Regras: easing suave (power3), nada pulando; `prefers-reduced-motion` mostra tudo já no estado final; animar só transform/opacity/clip-path.

## Cartões (3 modelos, alternados nas faixas)
- **Foto**: imagem da modalidade + nome.
- **Vermelho**: número grande + nome + descrição.
- **Contorno**: só tipografia, fundo escuro, borda fina; vira vermelho no hover.
- Seção "Feita para você": painéis que se expandem (accordion horizontal).

## Conteúdo
- Nada de equipe/depoimentos inventados. Só dados reais: endereço, WhatsApp, modalidades da grade, foto real da academia.
- Fotos de pessoas no hero são ilustrativas (banco/IA) até haver fotos reais.
