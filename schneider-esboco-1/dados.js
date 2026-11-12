/* =====================================================================
   DR. RICARDO SCHNEIDER · INTEGRATIVE HEALTH CLINIC — DADOS EDITÁVEIS
   Telefone, endereço, Instagram, as 3 frentes e a medicina esportiva.
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
   AS 3 FRENTES (conforme a bio do Instagram)
   itens = lista de serviços; um item pode ter link para uma dica (slug).
   --------------------------------------------------------------------- */
const FRENTES = {
  funcional: {
    titulo: 'Medicina Funcional Integrativa',
    chamada: 'Olhar completo para o seu corpo: causa, não só sintoma.',
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
    chamada: 'Saúde e desempenho para quem treina, do jovem atleta ao adulto ativo.',
    texto: 'Avaliação do atleta com bioimpedância, biomecânica e orientação de suplementação. Foco especial no futebol de base, de 8 a 13 anos.',
    itens: [
      { t: 'Bioimpedância', d: 'Composição corporal: gordura, massa muscular e água.' },
      { t: 'Biomecânica', d: 'Como o corpo se move, onde está a sobrecarga.' },
      { t: 'Suplementação para atletas', d: 'Orientada por exames e pelo objetivo de cada um.' },
      { t: 'Avaliação cardiológica do atleta', d: 'Liberação segura para treinar e competir.' }
    ]
  },
  cirurgia: {
    titulo: 'Cirurgia Cardiovascular',
    chamada: 'Cirurgia do coração com experiência e explicação clara.',
    texto: 'Cirurgião cardiovascular com residência na Santa Casa de Curitiba. Entenda cada procedimento em linguagem simples.',
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
   MEDICINA ESPORTIVA — futebol de base (rascunho: validar com o Dr. Ricardo)
   --------------------------------------------------------------------- */
const ESPORTE = {
  titulo: 'Futebol de base: crescer jogando, com a saúde em dia',
  texto: 'Jovens jogadores de 8 a 13 anos estão em fase de crescimento, treinam cada vez mais cedo e precisam de um olhar médico que acompanhe essa evolução. O objetivo é cuidar da saúde do atleta, apoiar o desempenho e ajudar a prevenir problemas, junto com a família e a comissão técnica.',
  pilares: [
    { t: 'Avaliação cardiológica', d: 'Check-up do coração antes de treinar e competir, com história familiar e exame físico.' },
    { t: 'Bioimpedância', d: 'Acompanha a composição corporal ao longo do crescimento.' },
    { t: 'Biomecânica', d: 'Observa postura, corrida e movimento para reduzir sobrecargas.' },
    { t: 'Alimentação e hidratação', d: 'Orientação prática para a rotina de treino, escola e jogo.' },
    { t: 'Sono e recuperação', d: 'Descanso certo é parte do treino.' },
    { t: 'Famílias e comissão técnica', d: 'Conversa clara com pais e treinadores sobre o que observar.' }
  ],
  fotos: ['fotos/esporte-jogo.jpg', 'fotos/esporte-time.jpg', 'fotos/esporte-drible.jpg', 'fotos/esporte-sorriso.jpg', 'fotos/esporte-treino.jpg'],
  creditoFotos: 'Fotos ilustrativas de banco de imagens livre (Pexels).'
};

const CREDENCIAIS = [
  'Médico formado pela PUC-PR (CRM-PR 17214).',
  'Residência em Cirurgia Cardiovascular na Santa Casa de Misericórdia de Curitiba, reconhecida pelo MEC.',
  'Especialista pela Sociedade Brasileira de Cirurgia Cardiovascular (RQE-PR 12237).',
  'Mestrado em Clínica Cirúrgica pela PUC-PR.',
  'Pós-graduação em Nutrologia (Redentor).',
  'Pós-graduação em Medicina Funcional Integrativa e em Medicina Esportiva e do Exercício (Academia Brasileira de Medicina Funcional Integrativa).'
];
