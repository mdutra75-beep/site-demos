/* =====================================================================
   DR. RICARDO SCHNEIDER · INTEGRATIVE HEALTH CLINIC — DADOS EDITÁVEIS
   Telefone, endereço, Instagram, as 3 especialidades e a medicina esportiva.
   (Os textos das "Dicas de saúde" ficam em dicas-dados.js.)
   Mude só o que está entre aspas. Não apague vírgulas nem chaves.
   ===================================================================== */

const SITE = {
  nome: 'Dr. Ricardo Schneider',
  clinica: 'Integrative Health Clinic',
  crm: 'CRM-PR 17214',
  rqe: 'RQE-PR 12237',
  whatsapp: '41999645504',                       // só números, com DDD
  telefoneTexto: '(41) 99964-5504',
  mensagemWhats: 'Olá, Dr. Ricardo! Vim pelo site e gostaria de agendar uma consulta.',
  atendimento: 'On-line ou presencial',
  endereco: 'Rua Zeila Moura dos Santos, 101 · Sala 1112 · Cristo Rei · Curitiba/PR',
  mapa: 'https://www.google.com/maps/search/?api=1&query=Rua+Zeila+Moura+dos+Santos+101+Curitiba',
  mapaEmbed: 'Rua Zeila Moura dos Santos 101, Cristo Rei, Curitiba PR',
  instagram: 'https://www.instagram.com/dr.ricardoschneider/',
  instagramUsuario: '@dr.ricardoschneider',
  siteAtual: 'https://www.ricardoschneider.com.br/'
};

/* ---------------------------------------------------------------------
   INSTAGRAM — mostra as 5 últimas postagens automaticamente.
   Como ligar (uma vez só):
     1) Criar conta gratuita em behold.so e conectar o Instagram do Dr. Ricardo
        (a conta precisa ser Profissional/Business).
     2) Copiar o endereço do "feed" (JSON) que o Behold gera
        e colar abaixo em feedUrl. Pronto: posta no Instagram, aparece no site.
   Enquanto feedUrl estiver vazio, o site mostra as 5 postagens de exemplo abaixo.
   --------------------------------------------------------------------- */
const INSTAGRAM = {
  feedUrl: '',            // ex.: 'https://feeds.behold.so/XXXXXXXX'
  quantidade: 5,
  exemplo: [               // mais novo primeiro (exemplo: postagens de 09 a 12/11/2026)
    { id: 'DfpEzDZkdjv', img: 'ig/DfpEzDZkdjv.jpg', legenda: 'Por que adultos jovens podem sofrer uma parada cardíaca?' },
    { id: 'DfmVj5HxGvr', img: 'ig/DfmVj5HxGvr.jpg', legenda: 'Você está cuidando do seu coração?' },
    { id: 'Dfk9hVio9wn', img: 'ig/Dfk9hVio9wn.jpg', legenda: 'O infarto nem sempre parece um infarto' },
    { id: 'DfilkV8EejJ', img: 'ig/DfilkV8EejJ.jpg', legenda: 'Baixar a ApoB é importante. Mas é suficiente?' },
    { id: 'DfhtBP4kf9R', img: 'ig/DfhtBP4kf9R.jpg', legenda: 'Não gosta de musculação? Existem outras opções.' }
  ]
};

/* ---------------------------------------------------------------------
   AS 3 ESPECIALIDADES (conforme a bio do Instagram)
   titulo = nome do cartão · tituloSecao = título da seção completa (use *asteriscos* para destacar)
   itens = lista de serviços; um item pode ter link para uma dica (slug).
   --------------------------------------------------------------------- */
const FRENTES = {
  funcional: {
    titulo: 'Medicina Funcional Integrativa',
    tituloSecao: 'Um olhar *completo* para o seu corpo',
    chamada: 'Entender a causa, não só tratar o sintoma.',
    texto: 'Avaliação individual que junta exames, hábitos, alimentação e hormônios para montar um plano feito para você. Inclui a Nutrologia Clínica.',
    itens: [
      { t: 'Check-up geral e cardiológico', d: 'Avaliação completa da saúde do coração e do corpo.' },
      { t: 'Check-up nutricional', d: 'Como você se alimenta e o que o seu corpo precisa.' },
      { t: 'Emagrecimento e reeducação alimentar', d: 'Perder gordura e ganhar massa magra com acompanhamento.', link: 'obesidade-o-que-e-e-como-saber-se-estou-acima-do-peso' },
      { t: 'Suplementação personalizada', d: 'Indicada só quando faz sentido para o seu caso.' },
      { t: 'Reposição hormonal e implantes', d: 'Avaliação hormonal e indicação de implantes bioabsorvíveis.', link: 'hormonios-implantaveis-o-que-sao-e-quais-as-indicacoes' }
    ]
  },
  esportiva: {
    titulo: 'Medicina Esportiva e do Exercício',
    tituloSecao: 'Saúde e desempenho para quem *vive o esporte*',
    chamada: 'Saúde e desempenho para atletas de todas as modalidades.',
    texto: 'Avaliação do atleta com bioimpedância, biomecânica e orientação de suplementação, com o olhar de quem também é cardiologista e cirurgião cardiovascular.',
    itens: [
      { t: 'Bioimpedância', d: 'Composição corporal: gordura, massa muscular e água.' },
      { t: 'Biomecânica', d: 'Como o corpo se move, onde está a sobrecarga.' },
      { t: 'Suplementação para atletas', d: 'Orientada por exames e pelo objetivo de cada um.' },
      { t: 'Avaliação cardiológica do atleta', d: 'Liberação segura para treinar e competir.' }
    ]
  },
  cirurgia: {
    titulo: 'Cirurgia Cardiovascular',
    tituloSecao: 'Cirurgia do coração com *experiência e clareza*',
    chamada: 'Do diagnóstico ao pós-operatório, cada procedimento explicado em linguagem simples.',
    texto: 'Cirurgião cardiovascular com residência na Santa Casa de Curitiba e mestrado em Clínica Cirúrgica.',
    itens: [
      { t: 'Revascularização do miocárdio', d: 'A “ponte de safena” e as pontes de mamária.', link: 'revascularizacao-do-miocardio' },
      { t: 'Cirurgia valvar aórtica', d: 'Doenças da valva aórtica e troca valvar.', link: 'cirurgia-valvar-aortica' },
      { t: 'Cirurgia valvar mitral', d: 'Reparo ou troca da valva mitral.', link: 'cirurgia-valvar-mitral' },
      { t: 'Doenças da aorta', d: 'Aneurismas e dissecções.', link: 'doencas-da-aorta' },
      { t: 'Transplante cardíaco', d: 'Quando está indicado e como é o seguimento.', link: 'transplante-cardiaco' },
      { t: 'Arritmias e marca-passo', d: 'Quando o ritmo do coração se altera.', link: 'arritmias' },
      { t: 'Malformações congênitas', d: 'Cardiopatias presentes desde o nascimento.', link: 'malformacoes-cardiacas-congenitas' },
      { t: 'Cardiomiopatias', d: 'Doenças do músculo do coração.', link: 'cardiomiopatias' },
      { t: 'Pós-operatório', d: 'Os cuidados depois da cirurgia cardíaca.', link: 'pos-operatorio-em-cirurgia-cardiaca' }
    ]
  }
};

/* ---------------------------------------------------------------------
   MEDICINA ESPORTIVA E DO EXERCÍCIO (rascunho: validar com o Dr. Ricardo)
   --------------------------------------------------------------------- */
const ESPORTE = {
  texto: 'Quem treina, de verdade, precisa de um olhar médico que una coração, corpo e rotina de treino. Atletas de todas as modalidades, do amador ao competitivo, de qualquer idade, podem contar com avaliação, orientação e acompanhamento para treinar e competir com segurança, evoluir com saúde e prevenir problemas. A formação em Medicina Esportiva e do Exercício se soma à experiência em cardiologia clínico-cirúrgica.',
  pilares: [
    { t: 'Avaliação cardiológica do atleta', d: 'Check-up do coração antes de treinar e competir, com história clínica, exame físico e exames quando indicados.' },
    { t: 'Bioimpedância', d: 'Acompanha gordura, massa muscular e hidratação ao longo do treinamento.' },
    { t: 'Biomecânica', d: 'Observa postura e movimento para reduzir sobrecargas e prevenir lesões.' },
    { t: 'Suplementação para atletas', d: 'Indicada com critério, a partir de exames e do objetivo de cada atleta.' },
    { t: 'Alimentação e hidratação', d: 'Orientação prática para a rotina de treino, de prova e de recuperação.' },
    { t: 'Sono e recuperação', d: 'Carga de treino e descanso em equilíbrio para evoluir com saúde.' }
  ],
  fotos: ['fotos/atleta-futebol.jpg', 'fotos/atleta-natacao.jpg', 'fotos/atleta-volei.jpg'],
  creditoFotos: 'Imagens ilustrativas.'
};

const CREDENCIAIS = [
  'Médico formado pela PUC-PR (CRM-PR 17214).',
  'Residência em Cirurgia Cardiovascular na Santa Casa de Misericórdia de Curitiba, reconhecida pelo MEC.',
  'Especialista pela Sociedade Brasileira de Cirurgia Cardiovascular (RQE-PR 12237).',
  'Mestrado em Clínica Cirúrgica pela PUC-PR.',
  'Pós-graduação em Nutrologia (Redentor).',
  'Pós-graduação em Medicina Funcional Integrativa e em Medicina Esportiva e do Exercício (Academia Brasileira de Medicina Funcional Integrativa).'
];

/* ---------------------------------------------------------------------
   EFEITOS (liga/desliga)
   textoAcende: títulos e textos grandes começam esmaecidos e vão ganhando
   a cor definitiva palavra por palavra, conforme a rolagem.
   Para voltar ao normal, troque true por false.
   --------------------------------------------------------------------- */
const EFEITOS = {
  textoAcende: true,
  opacidadeInicial: 0.22,
  seletores: '.fr h2, .fr .lead, #esporte h2, .es-top > div > p, .insta h2, .dc h2, .sob h2, .sob .intro, .ct h2'
};
