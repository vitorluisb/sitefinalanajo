import { useTranslation } from 'react-i18next';

export interface Company {
  id: number;
  name: string;
  logo: string;
  contribution: string;
  since?: string;
}



const companies: Omit<Company, 'name' | 'contribution'>[] = [
  {
    id: 1,
    logo:'/logoprefeituragba.png',
    since: '2019'
  },
  {
    id: 2,
    logo: '/logopm.png',
  },
  {
    id: 3,
    logo: '/logoanajo.png',
  },
  {
    id: 4,
    logo: '/idealcap.jpg',
  },
  {
    id: 5,
    logo: '/Logo_Gastromotiva.png',
  }
];



const companyKeys = ['prefeitura', 'pm', 'kinder', 'ideal', 'cozinhaSolidaria'];

export const useTranslatedSupporters = () => {
  const { t } = useTranslation();

  const translatedCompanies: Company[] = companies.map((company, index) => ({
    ...company,
    name: t(`supporters.companies.${companyKeys[index]}.name`),
    contribution: t(`supporters.companies.${companyKeys[index]}.contribution`)
  }));

  return {
    companies: translatedCompanies
  };
};