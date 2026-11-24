/* Dados editáveis do site Tistu.
   Contato das 3 unidades: usado nos botões, no seletor de visita, no mapa e no botão flutuante. */
window.SITE = {
  nome: "Tistu",
  instagram: "https://www.instagram.com/caeTistu/",
  unidades: {
    1: {
      nome: "Tistu 1",
      etapa: "Educação Infantil · 1 a 2 anos",
      endereco: "Rua Dr. Alexandre Gutierrez, 561 — Água Verde, Curitiba - PR",
      consulta: "Rua Dr. Alexandre Gutierrez, 561, Água Verde, Curitiba - PR",
      tel: "(41) 3243-2255", telLink: "+554132432255",
      whatsapp: "5541991851649", whatsappTexto: "(41) 99185-1649"
    },
    2: {
      nome: "Tistu 2",
      etapa: "Educação Infantil · 3 a 5 anos",
      endereco: "Rua Dr. Alexandre Gutierrez, 150 — Água Verde, Curitiba - PR",
      consulta: "Rua Dr. Alexandre Gutierrez, 150, Água Verde, Curitiba - PR",
      tel: "(41) 3243-3042", telLink: "+554132433042",
      whatsapp: "5541991488718", whatsappTexto: "(41) 99148-8718"
    },
    3: {
      nome: "Tistu 3",
      etapa: "Ensino Fundamental · 6 a 14 anos",
      endereco: "Rua Eduardo Sprada, 250 — Campo Comprido, Curitiba - PR",
      consulta: "Rua Eduardo Sprada, 250, Campo Comprido, Curitiba - PR",
      tel: "(41) 3274-6800", telLink: "+554132746800",
      whatsapp: "5541992480292", whatsappTexto: "(41) 99248-0292"
    }
  },
  mensagem: function (u) { return "Olá! Vim pelo site e gostaria de agendar uma visita na " + u + "."; }
};
