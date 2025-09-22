import { useTranslation } from 'react-i18next';

export interface Improvement {
  id: number;
  title: string;
  description: string;
  image: string;
  images: { src: string; alt: string }[];
}

const improvements: Omit<Improvement, 'title' | 'description' | 'images'>[] = [
  {
    id: 1,
    image: '/reforma.png',
  },
];

const improvementKeys = [
  'spaceReform',
];

export const useTranslatedImprovements = (): Improvement[] => {
  const { t } = useTranslation();

  return improvements.map((improvement, index) => ({
    ...improvement,
    title: t(`improvementData.${improvementKeys[index]}.title`),
    description: t(`improvementData.${improvementKeys[index]}.description`),
    images: [
      { src: '/reforma.png', alt: t(`improvementData.${improvementKeys[index]}.gallery.stage1`) },
      { src: '/reforma2.png', alt: t(`improvementData.${improvementKeys[index]}.gallery.stage2`) },
      { src: '/baseobra.png', alt: t(`improvementData.${improvementKeys[index]}.gallery.stage3`) },
    ],
  }));
};