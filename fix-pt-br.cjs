const fs = require('fs');

// Read the English version as template
const enContent = JSON.parse(fs.readFileSync('./src/i18n/locales/en.json', 'utf8'));

// Portuguese translations
const ptBRTranslations = {
  "navigation": {
    "home": "Início",
    "about": "Sobre",
    "projects": "Projetos",
    "volunteer": "Voluntariado",
    "donate": "Doar",
    "contact": "Contato"
  },
  "hero": {
    "title": "Transformando vidas através da educação e esporte",
    "subtitle": "A ONG Anajô trabalha para oferecer oportunidades de desenvolvimento pessoal e social para crianças e jovens em situação de vulnerabilidade.",
    "cta": "Saiba mais",
    "donate": "Doar agora"
  },
  "about": {
    "title": "Sobre a ONG Anajô",
    "subtitle": "Nossa missão é transformar vidas através da educação, esporte e cultura",
    "description": "Fundada em 2015, a ONG Anajô atua na promoção do desenvolvimento integral de crianças e jovens em situação de vulnerabilidade social. Através de projetos educacionais, esportivos e culturais, buscamos criar oportunidades de crescimento pessoal e profissional.",
    "mission": {
      "title": "Nossa Missão",
      "description": "Promover o desenvolvimento integral de crianças e jovens através da educação, esporte e cultura, contribuindo para a construção de uma sociedade mais justa e igualitária."
    },
    "vision": {
      "title": "Nossa Visão",
      "description": "Ser referência em projetos sociais que transformam vidas e comunidades, criando um futuro melhor para todos."
    },
    "values": {
      "title": "Nossos Valores",
      "items": [
        "Respeito e dignidade humana",
        "Transparência e ética",
        "Compromisso social",
        "Inovação e criatividade",
        "Trabalho em equipe"
      ]
    }
  },
  "projects": {
    "title": "Nossos Projetos",
    "subtitle": "Conheça as iniciativas que estão transformando vidas",
    "education": {
      "title": "Educação",
      "description": "Programas educacionais complementares que apoiam o desenvolvimento acadêmico e pessoal dos participantes."
    },
    "sports": {
      "title": "Esportes",
      "description": "Atividades esportivas que promovem saúde, disciplina e trabalho em equipe."
    },
    "culture": {
      "title": "Cultura",
      "description": "Projetos culturais que valorizam a identidade local e promovem a expressão artística."
    }
  },
  "volunteer": {
    "title": "Seja um Voluntário",
    "subtitle": "Junte-se a nós e faça a diferença na vida de crianças e jovens",
    "description": "Oferecemos diversas oportunidades de voluntariado para pessoas que desejam contribuir com nossos projetos.",
    "opportunities": {
      "title": "Oportunidades",
      "education": "Apoio educacional",
      "sports": "Instrutor esportivo",
      "events": "Organização de eventos",
      "administration": "Apoio administrativo"
    },
    "requirements": {
      "title": "Requisitos",
      "items": [
        "Maior de 16 anos",
        "Disponibilidade mínima de 4 horas semanais",
        "Comprometimento com os valores da ONG",
        "Participação em treinamento inicial"
      ]
    },
    "cta": "Inscreva-se"
  },
  "donate": {
    "title": "Faça uma Doação",
    "subtitle": "Sua contribuição faz a diferença",
    "description": "Com sua doação, podemos expandir nossos projetos e atender mais crianças e jovens.",
    "amounts": {
      "monthly": "Mensal",
      "single": "Única vez"
    },
    "methods": {
      "title": "Formas de Doação",
      "pix": "PIX",
      "bank": "Transferência bancária",
      "card": "Cartão de crédito"
    }
  },
  "contact": {
    "title": "Entre em Contato",
    "subtitle": "Estamos aqui para ajudar",
    "address": "Endereço",
    "phone": "Telefone",
    "email": "E-mail",
    "hours": "Horário de funcionamento",
    "form": {
      "name": "Nome",
      "email": "E-mail",
      "subject": "Assunto",
      "message": "Mensagem",
      "send": "Enviar"
    }
  },
  "footer": {
    "description": "Transformando vidas através da educação, esporte e cultura.",
    "quickLinks": "Links Rápidos",
    "contact": "Contato",
    "social": "Redes Sociais",
    "rights": "Todos os direitos reservados."
  },
  "supporterData": {
    "companies": {
      "prefeitura": {
        "name": "Prefeitura Municipal de Guarabira",
        "contribution": "Apoio financeiro"
      },
      "pm": {
        "name": "4º Batalhão da Polícia Militar da Paraíba",
        "contribution": "Parceiro para workshops semanais de música, jiu-jitsu e kickboxing na sede do ANAJÔ I."
      },
      "kinderhilfswerk": {
        "name": "Kinderhilfswerk Anajô",
        "contribution": "Organização parceira na Áustria que fornece apoio financeiro fundamental para construção de espaços físicos, compra de equipamentos e manutenção de recursos. Também trabalham na conscientização da sociedade europeia e captação de recursos."
      },
      "idealCapoeira": {
        "name": "Ideal Capoeira Europe",
        "contribution": "Parceiro europeu que apoia a expansão da capoeira e cultura brasileira na Europa."
      }
    },
    "individuals": {
      "maria": {
        "name": "Maria Silva",
        "role": "Doadora Regular",
        "contribution": "Doação mensal",
        "testimonial": "Acredito no poder transformador da educação."
      },
      "joao": {
        "name": "João Santos",
        "role": "Voluntário Senior",
        "contribution": "Coordenação esportiva",
        "testimonial": "O esporte mudou minha vida, agora quero mudar a de outros."
      },
      "ana": {
        "name": "Ana Costa",
        "role": "Mentora",
        "contribution": "Orientação profissional",
        "testimonial": "Cada jovem tem potencial único que merece ser desenvolvido."
      }
    }
  },
  "news": {
    "title": "Novidades do Projeto",
    "announcements": "Avisos",
    "improvements": "Melhorias"
  },
  "announcements": {
    "title": "Avisos Importantes",
    "subtitle": "Fique por dentro das últimas novidades e oportunidades da ONG Anajô",
    "urgent": "Urgente",
    "readMore": "Ler mais"
  },
  "events": {
    "title": "Eventos",
    "subtitle": "Participe dos nossos eventos e atividades"
  },
  "eventData": {
    "soccerTournament": {
      "title": "Torneio de Futebol Comunitário",
      "description": "Competição entre as equipes formadas pelos nossos projetos esportivos.",
      "location": "Centro Esportivo Anajô",
      "category": "Esporte",
      "gallery": [
        {
          "src": "https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?w=800&h=600&fit=crop&crop=center",
          "alt": "Torneio de Futebol - Jogo Principal",
          "caption": "Final do torneio com grande público presente"
        },
        {
          "src": "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=600&fit=crop&crop=center",
          "alt": "Torneio de Futebol - Premiação",
          "caption": "Cerimônia de premiação dos vencedores"
        },
        {
          "src": "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=600&fit=crop&crop=center",
          "alt": "Torneio de Futebol - Torcida",
          "caption": "Famílias e comunidade apoiando os times"
        }
      ]
    },
    "bookDonation": {
      "title": "Campanha de Doação de Livros",
      "description": "Arrecadação de livros para ampliar nossa biblioteca comunitária.",
      "location": "Diversos pontos da cidade",
      "category": "Social",
      "gallery": [
        {
          "src": "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop&crop=center",
          "alt": "Campanha de Doação de Livros",
          "caption": "Ponto de coleta de livros na praça principal"
        },
        {
          "src": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=center",
          "alt": "Voluntários organizando",
          "caption": "Voluntários separando e catalogando livros doados"
        },
        {
          "src": "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&h=600&fit=crop&crop=center",
          "alt": "Biblioteca renovada",
          "caption": "Nova biblioteca comunitária com livros arrecadados"
        }
      ]
    }
  }
};

// Create the final structure by merging English structure with Portuguese translations
function deepMerge(target, source) {
  const result = { ...target };
  
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      result[key] = deepMerge(target[key] || {}, source[key]);
    } else {
      result[key] = source[key];
    }
  }
  
  return result;
}

const finalContent = deepMerge(enContent, ptBRTranslations);

// Write the corrected pt-BR.json file
fs.writeFileSync('./src/i18n/locales/pt-BR.json', JSON.stringify(finalContent, null, 2));

console.log('pt-BR.json file has been reconstructed successfully!');