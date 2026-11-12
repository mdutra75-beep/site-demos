/* =====================================================================
   NENAVIT MODAS — ARQUIVO DE DADOS (é aqui que a loja edita o site)
   ---------------------------------------------------------------------
   Duas partes:
     1) CONTATOS POR SETOR  (telefones e WhatsApp)
     2) VITRINE             (produtos em destaque)

   Duas formas de editar — escolham UMA:

   A) PLANILHA DO GOOGLE (a mais fácil, sem mexer em código)
      - Crie uma planilha, copie o modelo das colunas (veja COMO-EDITAR.md)
      - Arquivo > Compartilhar > Publicar na Web > escolha a aba > formato CSV
      - Cole o link nas duas linhas logo abaixo.
      - Mudou na planilha = mudou no site (em poucos minutos).

   B) EDITAR AQUI MESMO (se as linhas abaixo ficarem vazias)
      - Mude só o que está entre aspas. Não apague vírgulas nem chaves.
   ===================================================================== */

// ---- Links das planilhas (deixe '' para usar a lista deste arquivo) ----
const PLANILHA_CONTATOS = '';
const PLANILHA_VITRINE  = '';

// ---- Dados gerais da loja ----
const LOJA = {
  nome: 'Nenavit Modas',
  endereco: 'Rua Carmelina Cavassin, 247 — Barreirinha, Curitiba/PR',
  mapa: 'https://www.google.com/maps/search/?api=1&query=Nenavit+Modas+Rua+Carmelina+Cavassin+247+Curitiba',
  instagram: 'https://www.instagram.com/nenavitmodas/',
  facebook: 'https://www.facebook.com/nenavit.modas/',
  linktree: 'https://linktr.ee/nenavitmodas',
  horario: '' // ex.: 'Seg a Sáb, 9h às 19h'  (vazio = não aparece no site)
};

/* ---------------------------------------------------------------------
   1) CONTATOS POR SETOR
   setor      = nome que aparece no cartão
   descricao  = o que se resolve nesse setor
   telefone   = só números, com DDD (ex.: 41991247790)
   tipo       = 'whatsapp' (botão verde) ou 'ligar' (telefone fixo)
   categorias = quais categorias da vitrine esse setor atende
                (assim o botão "Quero este" do produto vai pro setor certo)
   ativo      = false  esconde o cartão sem apagar
   Para ADICIONAR um telefone: copie um bloco { ... }, e mude os dados.
   Para TROCAR um número: mude só a linha "telefone".
   A ordem aqui é a ordem na tela.
   --------------------------------------------------------------------- */
const SETORES = [
  { setor: 'Setor Feminino',
    descricao: 'Moda feminina • Novidades',
    telefone: '41991247790', tipo: 'whatsapp',
    categorias: ['Feminino'], ativo: true },

  { setor: 'Setor Masculino',
    descricao: 'Moda masculina • Infantil • Brinquedos • Uniformes • Papelaria',
    telefone: '41991247770', tipo: 'whatsapp',
    categorias: ['Masculino', 'Infantil', 'Papelaria'], ativo: true },

  { setor: 'Calçados e Fitness',
    descricao: 'Tênis • Esportivo • Acessórios',
    telefone: '41991268797', tipo: 'whatsapp',
    categorias: ['Calçados', 'Fitness'], ativo: true },

  { setor: 'Crediário e Caixa',
    descricao: 'Pagamentos • Informações',
    telefone: '4133540290', tipo: 'ligar',
    categorias: [], ativo: true },

  // ATENÇÃO (conferir com a loja): o Linktree antigo lista "Vendas On-Line" como (41) 99179-4061;
  // o site atual lista "Compre Aqui" como (41) 98415-9389. Usei o do site atual.
  { setor: 'Compre Aqui',
    descricao: 'Atendimento • Pedidos',
    telefone: '41984159389', tipo: 'whatsapp',
    categorias: [], ativo: true }
];

/* ---------------------------------------------------------------------
   2) VITRINE
   foto       = arquivo dentro da pasta "fotos" (ou um link http de imagem)
   nome       = título do produto
   preco      = ex.: 'R$ 89,90'  (vazio = aparece "Consulte o setor")
   categoria  = Feminino | Masculino | Infantil | Calçados | Fitness | Papelaria
   destaque   = true coloca etiqueta "Novidade"
   ativo      = false esconde sem apagar
   Os produtos mais novos devem ficar no TOPO da lista.
   *** Fotos e nomes abaixo são EXEMPLOS tirados do Instagram/site da loja. ***
   --------------------------------------------------------------------- */
const VITRINE = [
  { foto: '78.jpg', nome: 'Cadernos e papelaria da volta às aulas', preco: '', categoria: 'Papelaria', destaque: true, ativo: true },
  { foto: '79.jpg', nome: 'Estojo escolar com divisórias',        preco: '', categoria: 'Papelaria', destaque: true, ativo: true },
  { foto: '14.jpg', nome: 'Vestido longo vinho',                  preco: '', categoria: 'Feminino', destaque: true, ativo: true },
  { foto: '45.jpg', nome: 'Bota Macboot',                         preco: '', categoria: 'Calçados', destaque: false, ativo: true },
  { foto: '59.jpg', nome: 'Camiseta Free Surf',                   preco: '', categoria: 'Masculino', destaque: false, ativo: true },
  { foto: '12.jpg', nome: 'Conjunto bebê Kiko Baby',              preco: '', categoria: 'Infantil', destaque: true, ativo: true },
  { foto: '65.jpg', nome: 'Conjunto fitness rosa',                preco: '', categoria: 'Fitness', destaque: false, ativo: true },
  { foto: '23.jpg', nome: 'Tênis Nike',                           preco: '', categoria: 'Calçados', destaque: false, ativo: true },
  { foto: '15.jpg', nome: 'Conjunto jaqueta e calça off-white',   preco: '', categoria: 'Feminino', destaque: false, ativo: true },
  { foto: '63.jpg', nome: 'Camiseta e pochete Adidas',            preco: '', categoria: 'Masculino', destaque: false, ativo: true },
  { foto: '11.jpg', nome: 'Sandálias infantis',                   preco: '', categoria: 'Infantil', destaque: false, ativo: true },
  { foto: '37.jpg', nome: 'Botas Dakota',                         preco: '', categoria: 'Calçados', destaque: false, ativo: true },
  { foto: '67.jpg', nome: 'Conjunto fitness Movimento',           preco: '', categoria: 'Fitness', destaque: false, ativo: true },
  { foto: '32.jpg', nome: 'Blusa Street Glam',                 preco: '', categoria: 'Feminino', destaque: false, ativo: true },
  { foto: '09.jpg', nome: 'Mochila Nike',                         preco: '', categoria: 'Masculino', destaque: false, ativo: true },
  { foto: '40.jpg', nome: 'Coleção infantil Milen',               preco: '', categoria: 'Infantil', destaque: false, ativo: true },
  { foto: '70.jpg', nome: 'Tênis Converse All Star',              preco: '', categoria: 'Calçados', destaque: false, ativo: true },
  { foto: '24.jpg', nome: 'Look preto com jaqueta',               preco: '', categoria: 'Feminino', destaque: false, ativo: true },
  { foto: '80.jpg', nome: 'Mochila e estojos escolares',          preco: '', categoria: 'Papelaria', destaque: false, ativo: true },
  { foto: '58.jpg', nome: 'Rasteiras Vizzano',                    preco: '', categoria: 'Calçados', destaque: false, ativo: true },
  { foto: '61.jpg', nome: 'Camiseta Free Surf bege',              preco: '', categoria: 'Masculino', destaque: false, ativo: true },
  { foto: '53.jpg', nome: 'Vestidos infantis Kiki',               preco: '', categoria: 'Infantil', destaque: false, ativo: true },
  { foto: '75.jpg', nome: 'Converse All Star rosé',               preco: '', categoria: 'Calçados', destaque: false, ativo: true },
  { foto: '54.jpg', nome: 'Vestido de renda',                     preco: '', categoria: 'Feminino', destaque: false, ativo: true }
];

/* ---------------------------------------------------------------------
   3) NOSSA HISTÓRIA (linha do tempo) — texto do site atual da loja
   --------------------------------------------------------------------- */
const HISTORIA = [
  { ano: '1988', titulo: 'Dona Nena começa',
    texto: 'Roupas e acessórios vendidos entre vizinhas e amigas do bairro.' },
  { ano: '1990', titulo: 'A primeira loja',
    texto: 'Com o apoio do Vitorino, o sonho ganha força: a primeira loja, ao lado de casa, na Rua Gustavo Barroso.' },
  { ano: '1992', titulo: 'Nasce a marca Nenavit',
    texto: 'A empresa é registrada. O nome vem da união de “Nena” e “Vit”, uma homenagem à força e à união dos fundadores.' },
  { ano: '2003', titulo: 'A loja da Carmelina Cavassin',
    texto: 'Uma loja maior e mais moderna, onde a Nenavit está até hoje.' },
  { ano: 'Hoje', titulo: 'Três andares para toda a família',
    texto: 'Moda feminina, masculina e infantil, calçados, acessórios, brinquedos, papelaria e uniformes. A mesma essência de 1988: atendimento com carinho, qualidade e preço justo.' }
];

const MARCAS = ['Nike', 'Adidas', 'Converse', 'Free Surf', 'Lado Avesso', 'Coca-Cola Jeans', 'Vizzano', 'Macboot', 'Dakota', 'Kiki', 'Milen', 'Kiko Baby', 'Movimento & Companhia'];
