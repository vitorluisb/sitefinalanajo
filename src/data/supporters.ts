import { useTranslation } from 'react-i18next';

export interface Company {
  id: number;
  name: string;
  logo: string;
  contribution: string;
  since?: string;
}

export interface Individual {
  id: number;
  name: string;
  role: string;
  contribution: string;
  avatar: string;
  testimonial: string;
}

const companies: Omit<Company, 'name' | 'contribution'>[] = [
  {
    id: 1,
    logo:'logoprefeituragba.png',
    since: '2019'
  },
  {
    id: 2,
    logo: 'logopm.png',
  },
  {
    id: 3,
    logo: 'logoanajo.png',
  },
  {
    id: 4,
    logo: 'idealcap.jpg',
  }
];

const individuals: Omit<Individual, 'name' | 'role' | 'contribution' | 'testimonial'>[] = [
  {
    id: 1,
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=center',
  },
  {
    id: 2,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=center',
  },
  {
    id: 3,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=center',
  }
];

const companyKeys = ['prefeitura', 'pm', 'kinderhilfswerk', 'idealCapoeira'];
const individualKeys = ['maria', 'joao', 'ana'];

export const useTranslatedSupporters = (): { companies: Company[], individuals: Individual[] } => {
  const { t } = useTranslation();

  const translatedCompanies = companies.map((company, index) => ({
    ...company,
    name: t(`supporterData.companies.${companyKeys[index]}.name`),
    contribution: t(`supporterData.companies.${companyKeys[index]}.contribution`),
  }));

  const translatedIndividuals = individuals.map((individual, index) => ({
    ...individual,
    name: t(`supporterData.individuals.${individualKeys[index]}.name`),
    role: t(`supporterData.individuals.${individualKeys[index]}.role`),
    contribution: t(`supporterData.individuals.${individualKeys[index]}.contribution`),
    testimonial: t(`supporterData.individuals.${individualKeys[index]}.testimonial`),
  }));

  return { companies: translatedCompanies, individuals: translatedIndividuals };
};