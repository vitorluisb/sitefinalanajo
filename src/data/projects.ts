import { useTranslation } from 'react-i18next';

export interface ProjectLocation {
  branch: string;
  schedule: string;
}

export interface Project {
  id: number;
  title: string;
  category: 'Esportes' | 'Educação' | 'Cultura';
  description: string;
  image: string;
  participants: number;
  locations: ProjectLocation[]; // Array de filiais com horários
  impact?: string; // Para a página inicial (preview)
  duration?: string; // Para a página de projetos (detalhada)
  instructor?: string; // Para a página de projetos (detalhada)
  results?: string[]; // Para a página de projetos (detalhada)
  requirements?: string; // Para a página de projetos (detalhada)
  color?: string; // Para a página inicial (preview)
  gallery?: {
    src: string;
    alt: string;
    caption?: string;
  }[];
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Aulas de Capoeira',
    category: 'Esportes',
    description: 'Aulas de capoeira para crianças e adolescentes, desenvolvendo habilidades motoras, cognitivas e sociais.',
    image: '/capoeira.png',
    participants: 100,
    locations: [
      {
        branch: 'Anajô I - Nordeste',
        schedule: 'Sexta-feira, 8:00 às 9:30 / 14:00 às 15:30'
      },
      {
        branch: 'Anajô II - Rosário',
        schedule: 'Segunda e Quinta, 17:30 às 19:00'
      },
      {
        branch: 'Anajô III - Cordeiro',
        schedule: 'Quarta-feira, 18:00 às 19:30'
      },
      {
        branch: 'Anajô IV - Mutirão',
        schedule: 'Sábado, 8:00 às 10:00'
      }
    ],

    gallery: [
      {
        src: '/capoeiracriancas.jpeg',
        alt: 'Aula de capoeira em andamento',
        caption: 'Jovens aprendendo capoeira no espaço comunitário'
      }
    ]
  },
  {
    id: 2,
    title: 'Escolinha de Futebol',
    category: 'Esportes',
    description: 'Treinamento de futebol para crianças e adolescentes, desenvolvendo habilidades técnicas, táticas e valores como disciplina, respeito e trabalho em equipe.',
    image: '/futebol1.jpeg',
    participants: 80,
    locations: [
      {
        branch: 'Anajo I',
        schedule: ''
      },
    ],
    gallery: [
      {
        src: '/futebol1.jpeg',
        alt: 'Treino de futebol',
        caption: 'Treino técnico com foco em fundamentos'
      },
      {
        src: '/futebol2.jpeg',
        alt: 'Jogo amistoso',
        caption: 'Partida amistosa entre equipes da escolinha'
      },
      {
        src: '/futebol3.jpg',
        alt: 'Campeonato regional',
        caption: 'Participação em campeonato regional'
      }
    ]
  },
  {
    id: 3,
    title: 'Aulas de Música',
    category: 'Cultura',
    description: 'Aulas de música e instrumentos músicais.',
    image: '/musica1.jpg',
    participants: 30,
    locations: [
      {
        branch: 'Anajô I',
        schedule: 'Quarta-feira, 14:00 às 15:30 / Quinta-feira, 8:00 às 9:30 - 14:00 às 15:30'
      }
    ],
    
    gallery: [
      {
        src: '/musica.jpg',
        alt: 'Turma com violões',
        caption: 'Crianças apresentando seus violões nas aulas'
      },
      {
        src: '/musica1.jpg',
        alt: 'Aula de música',
        caption: 'Aula de violão em grupo'
      },
      {
        src: '/musica2.jpg',
        alt: 'Aula de flauta',
        caption: 'Prática de flauta doce com o professor'
      },
      {
        src: '/musica3.jpg',
        alt: 'Turma de violão animada',
        caption: 'Alunos demonstrando acordes durante a aula'
      },
      {
        src: '/musica4.jpg',
        alt: 'Prática musical em sala',
        caption: 'Exercícios de musicalização com flautas'
      }
    ]
  },
  {
    id: 4,
    title: 'Jiu-Jitsu',
    category: 'Esportes',
    description: 'Aulas de Jiu-Jitsu para crianças e adolescentes, desenvolvendo habilidades motoras, cognitivas, sociais e auto-defesa.',
    image: '/jiujitsu1.jpg',
    participants: 45,
    locations: [
      {
        branch: 'Anajô I',
        schedule: 'Terça-feira, 8:00 às 9:30 / 14:00 às 15:00'
      },
    
    ],
    gallery: [
      {
        src: '/jiujitsu1.jpeg',
        alt: 'Treino de Jiu-Jitsu',
        caption: 'Treino focado em técnicas básicas do Jiu-Jitsu'
      },
      {
        src: '/capajiujitsu.jpg',
        alt: 'Competição oficial',
        caption: 'Participação em competição municipal'
      },
      {
        src: '/jiujitsu2.jpg',
        alt: 'Premiação',
        caption: 'Cerimônia de premiação do campeonato'
        },
        {
          src: '/jiujitsu3.jpg',
          alt: 'Treino em grupo',
          caption: 'Alunos alinhados para início do treino'
        },
        {
          src: '/jiujitsu4.jpg',
          alt: 'Técnica no solo',
          caption: 'Prática de finalizações no tatame'
        },
        {
          src: '/jiujitsu5.jpg',
          alt: 'Sparring supervisionado',
          caption: 'Exercícios supervisionados para correção de postura'
        },
        {
          src: '/jiujitsu6.jpg',
          alt: 'Turma Jiu-Jitsu',
          caption: 'Registro da turma reunida após a aula'
        }
    ]
  },
  {
    id: 5,
    title: 'Reforço Escolar',
    category: 'Educação',
    description: 'Apoio pedagógico para crianças com dificuldades de aprendizagem em matemática e português, com metodologia lúdica e personalizada.',
    image: '/refoco.jpeg',
    participants: 55,
    locations: [
      {
        branch: 'Anajô I',
        schedule: 'Segunda a Sexta, 9:45 às 11:00 / 15:45 às 17:00'
      }
    ],
    // Dados para página de projetos (detalhada)
    duration: 'Ano letivo',
    instructor: 'Equipe Pedagógica',
    results: [
      'Melhoria significativa nas notas dos participantes',
      'Alta aprovação no ano letivo',
      'Aumento na autoconfiança das crianças'
    ],
    requirements: 'Crianças de 6-12 anos com dificuldades escolares',
    gallery: [
      {
        src: '/refoco.jpeg',
        alt: 'Aula de reforço',
        caption: 'Aula de reforço escolar com metodologia lúdica'
      }
    ]
  }
];

// Função para obter projetos para preview (página inicial) - apenas os 3 principais
export const getProjectsPreview = (): Project[] => {
  return projects.slice(0, 3);
};

// Função para obter todos os projetos (página de projetos)
export const getAllProjects = (): Project[] => {
  return projects;
};

// Função para obter projeto por ID
export const getProjectById = (id: number): Project | undefined => {
  return projects.find(project => project.id === id);
};

// Função para obter projetos por categoria
export const getProjectsByCategory = (category: string): Project[] => {
  if (category === 'Todos') return projects;
  return projects.filter(project => project.category === category);
};

// Hook para obter dados dos projetos traduzidos
export const useTranslatedProjects = (): Array<Omit<Project, 'category'> & { category: string }> => {
  const { t } = useTranslation();
  
  return projects.map(project => ({
    ...project,
    title: getTranslatedProjectTitle(project.id, t),
    description: getTranslatedProjectDescription(project.id, t),
    category: getTranslatedCategory(project.category, t),
    locations: project.locations.map(location => ({
      ...location,
      branch: getTranslatedLocation(location.branch, t),
      schedule: getTranslatedSchedule(location.schedule, t)
    })),
    impact: project.impact ? getTranslatedImpact(project.id, t) : undefined,
    gallery: project.gallery?.map(item => ({
      ...item,
      alt: getTranslatedGalleryAlt(project.id, item.alt, t),
      caption: item.caption ? getTranslatedGalleryCaption(project.id, item.caption, t) : undefined
    }))
  }));
};

const getTranslatedImpact = (id: number, t: (key: string) => string): string => {
  switch (id) {
    case 1: return t('projectData.capoeira.impact');
    case 2: return t('projectData.football.impact');
    case 3: return t('projectData.music.impact');
    default: return '';
  }
};

export const useTranslatedProjectsPreview = (): Array<Omit<Project, 'category'> & { category: string }> => {
  const { t } = useTranslation();
  const previewProjects = getProjectsPreview();

  return previewProjects.map(project => ({
    ...project,
    title: getTranslatedProjectTitle(project.id, t),
    description: getTranslatedProjectDescription(project.id, t),
    category: getTranslatedCategory(project.category, t),
    impact: project.impact ? getTranslatedImpact(project.id, t) : undefined,
    locations: project.locations.map(location => ({
      ...location,
      branch: getTranslatedLocation(location.branch, t),
      schedule: getTranslatedSchedule(location.schedule, t)
    })),
  }));
};

// Funções auxiliares para tradução
const getTranslatedProjectTitle = (id: number, t: (key: string) => string): string => {
  switch (id) {
    case 1: return t('projectData.capoeira.title');
    case 2: return t('projectData.football.title');
    case 3: return t('projectData.music.title');
    case 4: return t('projectData.jiujitsu.title');
    case 5: return t('projectData.tutoring.title');
    default: return '';
  }
};

const getTranslatedProjectDescription = (id: number, t: (key: string) => string): string => {
  switch (id) {
    case 1: return t('projectData.capoeira.description');
    case 2: return t('projectData.football.description');
    case 3: return t('projectData.music.description');
    case 4: return t('projectData.jiujitsu.description');
    case 5: return t('projectData.tutoring.description');
    default: return '';
  }
};

const getTranslatedCategory = (category: string, t: (key: string) => string): string => {
  switch (category) {
    case 'Esportes': return t('projectsPage.categories.sports');
    case 'Educação': return t('projectsPage.categories.education');
    case 'Cultura': return t('projectsPage.categories.culture');
    default: return category;
  }
};

const getTranslatedLocation = (branch: string, t: (key: string) => string): string => {
  if (branch.includes('Anajô I')) return t('projectData.locations.anajo1');
  if (branch.includes('Anajô II')) return t('projectData.locations.anajo2');
  if (branch.includes('Anajô III')) return t('projectData.locations.anajo3');
  if (branch.includes('Anajô IV')) return t('projectData.locations.anajo4');
  return branch;
};

const getTranslatedSchedule = (schedule: string, t: (key: string) => string): string => {
  if (schedule.includes('Sexta-feira, 8:00 às 9:30')) return t('projectData.schedules.friday');
  if (schedule.includes('Segunda e Quinta, 17:30 às 19:00')) return t('projectData.schedules.mondayThursday');
  if (schedule.includes('Quarta-feira, 18:00 às 19:30')) return t('projectData.schedules.wednesday');
  if (schedule.includes('Sábado, 8:00 às 10:00')) return t('projectData.schedules.saturday');
  if (schedule.includes('Terça-feira, 8:00 às 9:30')) return t('projectData.schedules.tuesday');
  if (schedule.includes('Segunda a Sexta, 9:45 às 11:00')) return t('projectData.schedules.mondayFriday');
  if (schedule.includes('Quarta-feira, 14:00 às 15:30')) return t('projectData.schedules.wednesdayThursday');
  return schedule;
};

const getTranslatedGalleryAlt = (projectId: number, alt: string, t: (key: string) => string): string => {
  switch (projectId) {
    case 1: return t('projectData.capoeira.gallery.alt');
    case 5: return t('projectData.tutoring.gallery.alt');
    default: return alt;
  }
};

const getTranslatedGalleryCaption = (projectId: number, caption: string, t: (key: string) => string): string => {
  switch (projectId) {
    case 1: return t('projectData.capoeira.gallery.caption');
    case 5: return t('projectData.tutoring.gallery.caption');
    default: return caption;
  }
};