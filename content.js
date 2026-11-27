/* Edite este arquivo para atualizar preços, contato e fotos. */
window.SALON = {
  whatsapp: "5519999940347",
  phoneDisplay: "(19) 99994-0347",
  instagramHandle: "janete_jsouza",
  instagramUrl: "https://www.instagram.com/janete_jsouza?cnvx=MWZtc2kxZmJuZXQ0eA==",
  addressUrl: "https://maps.app.goo.gl/MkZafj3RT21iiaKj9?g_st=ic",
  mapsEmbedUrl: "https://maps.google.com/maps?q=JS+Studio+Sal%C3%A3o+de+Beleza%2C+Rua+Jos%C3%A9+Rodrigues%2C+120%2C+Sumar%C3%A9%2C+SP&ll=-22.815572%2C-47.1684303&z=19&t=k&output=embed&hl=pt-BR",
  wazeUrl: "https://waze.com/ul?ll=-22.815572,-47.1684303&navigate=yes",
  reviewUrl: "https://www.google.com/search?q=JS+Studio+Sal%C3%A3o+de+Beleza+-+Rua+Jos%C3%A9+Rodrigues+-+Jardim+Paraiso+II+%28Nova+Veneza%29%2C+Sumar%C3%A9+-+SP",
  gallery: [
    { image: "assets/cabelo-01.jpg", alt: "Cabelo escuro curto com corte em camadas e ondas" },
    { image: "assets/cabelo-02.jpg", alt: "Cabelo longo em tom acobreado com ondas" },
    { image: "assets/cabelo-03.jpg", alt: "Cabelo longo cobre com ondas e brilho" },
    { image: "assets/cabelo-04.jpg", alt: "Cabelo castanho com mechas claras e ondas" },
    { image: "assets/cabelo-05.jpg", alt: "Cabelo longo com camadas suaves" },
    { image: "assets/cabelo-06.jpg", alt: "Cabelo castanho longo com reflexos quentes" },
    { image: "assets/cabelo-07.jpg", alt: "Cabelo longo castanho com ondas e reflexos" },
    { image: "assets/cabelo-08.jpg", alt: "Cabelo longo loiro liso com corte reto" },
    { image: "assets/cabelo-09.jpg", alt: "Cabelo longo liso em tom ruivo" },
    { image: "assets/cabelo-10.jpg", alt: "Cabelo castanho claro com ondas suaves" },
    { image: "assets/cabelo-11.jpg", alt: "Cabelo castanho com camadas e franja" },
    { image: "assets/cabelo-12.jpg", alt: "Cabelo longo com reflexos claros e ondas" },
    { image: "assets/cabelo-13.jpg", alt: "Corte curto escuro com acabamento elegante" },
    { image: "assets/cabelo-14.jpg", alt: "Cabelo castanho longo com ondas" },
    { image: "assets/cabelo-15.jpg", alt: "Cabelo longo loiro acinzentado com ondas" },
    { image: "assets/cabelo-16.jpg", alt: "Cabelo médio liso castanho com mechas vermelhas vibrantes" }
  ],
  packages: [
    {
      title: "Cronograma Premium",
      eyebrow: "RITUAL DE TRATAMENTO",
      description: "Uma sequência de cuidados para devolver vida, maciez e brilho aos fios.",
      includes: ["Reconstrução", "Hidratação", "Nutrição", "Finalização com escova"],
      image: "assets/packages/olenka-nutricao.webp",
      imageAlt: "Kit de nutrição capilar Olenka Self Care+",
      price: "R$ 370,00",
      pix: "R$ 350,00"
    },
    {
      title: "Terapia Capilar",
      eyebrow: "CUIDADO DO COURO CABELUDO",
      description: "Três encontros quinzenais com técnicas de cuidado e relaxamento.",
      includes: ["Argiloterapia", "Reflexologia", "Laserterapia"],
      images: [
        { src: "assets/packages/argiloterapia.jfif", alt: "Aplicação de argila no couro cabeludo", label: "Argiloterapia" },
        { src: "assets/packages/reflexologia.webp", alt: "Massagem relaxante durante a terapia capilar", label: "Reflexologia" },
        { src: "assets/laserterapia.jpg", alt: "Laserterapia capilar", label: "Laserterapia", placeholder: true }
      ],
      price: "R$ 250,00",
      detail: "3 sessões quinzenais · sem escova"
    },
    {
      title: "Programa de Tratamento",
      eyebrow: "CUIDADO COMPLETO",
      description: "Um cuidado combinado para tratar os fios em diferentes etapas.",
      includes: ["Reconstrução", "Hidratação", "Nutrição", "Finalização com escova"],
      image: "assets/cabelo-06.jpg",
      imageAlt: "Cabelos longos com brilho e reflexos quentes",
      price: "R$ 295,00",
      pix: "R$ 280,00",
      detail: "Exceto cabelos extra longos ou volumosos"
    },
    {
      title: "Beleza dos Cabelos",
      eyebrow: "PROGRAMA DE TRATAMENTO",
      description: "Reconstrução, hidratação e nutrição em um programa de cuidados.",
      includes: ["Reconstrução", "Hidratação", "Nutrição"],
      image: "assets/cabelo-12.jpg",
      imageAlt: "Cabelos longos com reflexos claros e ondas",
      price: "R$ 210,00 no Pix",
      detail: "R$ 225,00 no crédito"
    },
    {
      title: "Shake de Queratina",
      eyebrow: "CORTE + ESCOVA",
      description: "Tratamento com queratina acompanhado de corte e escova.",
      includes: ["Shake de queratina", "Corte", "Escova"],
      image: "assets/cabelo-03.jpg",
      imageAlt: "Cabelos longos acobreados com ondas e brilho",
      price: "R$ 159,90",
      pix: "R$ 150,00",
      detail: "Exceto cabelos extra longos ou volumosos"
    },
    {
      title: "Shake de Queratina",
      eyebrow: "ESCOVA",
      description: "Um cuidado de queratina com finalização em escova.",
      includes: ["Shake de queratina", "Escova"],
      image: "assets/cabelo-08.jpg",
      imageAlt: "Cabelos loiros longos e lisos",
      price: "R$ 117,90",
      pix: "R$ 110,00",
      detail: "Exceto cabelos extra longos ou volumosos"
    },
    {
      title: "Hidratação + Corte + Escova",
      eyebrow: "OFERTA ESPECIAL",
      description: "Uma pausa para hidratar, renovar o corte e sair com os fios finalizados.",
      includes: ["Hidratação", "Corte", "Escova"],
      image: "assets/cabelo-05.jpg",
      imageAlt: "Cabelos longos com camadas suaves",
      price: "R$ 128,90",
      pix: "R$ 120,00",
      detail: "Exceto cabelos extra longos ou volumosos"
    },
    {
      title: "Pacotes Mensais",
      eyebrow: "4 VISITAS",
      description: "Escolha a rotina que combina com seus cuidados do mês.",
      includes: ["Lavar e secar · 4 vezes", "Lavar e escovar · 4 vezes"],
      image: "assets/cabelo-10.jpg",
      imageAlt: "Cabelos castanhos com ondas suaves",
      options: [
        { name: "Lavar e secar", price: "R$ 160,00", pix: "R$ 150,00" },
        { name: "Lavar e escovar", price: "R$ 226,00", pix: "R$ 220,00" }
      ],
      detail: "Valores no Pix indicados em cada opção"
    }
  ],
  categories: [
    {
      name: "Cabelos",
      note: "Cuidado e estilo para os seus fios.",
      services: [
        ["Corte", "R$ 70,00"],
        ["Corte + Escova", "R$ 90,00"],
        ["Corte / Franja", "R$ 15,00"],
        ["Escova Simples", "R$ 60,00"],
        ["Baby Liss", "R$ 35,00"],
        ["Baby Liss após escova", "R$ 15,00"],
        ["Botox", "A partir de R$ 170,00"],
        ["Progressiva", "A partir de R$ 190,00"],
        ["Neutralização", "R$ 50,00"],
        ["Coloração", "A partir de R$ 120,00"],
        ["Mechas / Morena Iluminada", "A partir de R$ 450,00"],
        ["Penteado", "R$ 150,00"]
      ]
    },
    {
      name: "Tratamentos",
      note: "Rituais para nutrir e recuperar os fios.",
      services: [
        ["Reconstrução com escova", "R$ 130,00"],
        ["Hidratação com escova", "R$ 90,00"],
        ["Nutrição com escova", "R$ 105,00"],
        ["Shake de Queratina com Escova", "R$ 120,00"]
      ]
    },
    {
      name: "Sobrancelhas",
      note: "Realce delicado para o seu olhar.",
      services: [
        ["Design de Sobrancelha", "R$ 30,00"],
        ["Design + Henna", "R$ 40,00"],
        ["Sobrancelha + Buço", "R$ 40,00"],
        ["Sobrancelha + Buço + Henna", "R$ 50,00"],
        ["Rosto Completo – Depilação Egípcia", "R$ 45,00"],
        ["Buço – Depilação Egípcia", "R$ 15,00"]
      ]
    }
  ]
};
