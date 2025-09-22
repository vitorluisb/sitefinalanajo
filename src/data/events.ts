import { useTranslation } from 'react-i18next';

export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  participants: number;
  category: string;
  color: string;
  mainImage: string;
  gallery: {
    src: string;
    alt: string;
    caption: string;
  }[];
}

export const useTranslatedEvents = (): Event[] => {
  const { t } = useTranslation();

  const events: Event[] = [
    {
      id: 1,
      title: t('eventData.soccerTournament.title'),
      description: t('eventData.soccerTournament.description'),
      date: '2024-08-15',
      time: '09:00',
      location: t('eventData.soccerTournament.location'),
      participants: 100,
      category: t('eventData.soccerTournament.category'),
      color: 'bg-green-500',
      mainImage: 'https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?w=800&h=600&fit=crop&crop=center',
      gallery: t('eventData.soccerTournament.gallery', { returnObjects: true }) as Event['gallery'],
    },
    {
      id: 2,
      title: t('eventData.culturalFair.title'),
      description: t('eventData.culturalFair.description'),
      date: '2024-09-20',
      time: '14:00',
      location: t('eventData.culturalFair.location'),
      participants: 200,
      category: t('eventData.culturalFair.category'),
      color: 'bg-purple-500',
      mainImage: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=600&fit=crop&crop=center',
      gallery: t('eventData.culturalFair.gallery', { returnObjects: true }) as Event['gallery'],
    },
    {
      id: 3,
      title: t('eventData.entrepreneurshipWorkshop.title'),
      description: t('eventData.entrepreneurshipWorkshop.description'),
      date: '2024-10-05',
      time: '18:00',
      location: t('eventData.entrepreneurshipWorkshop.location'),
      participants: 50,
      category: t('eventData.entrepreneurshipWorkshop.category'),
      color: 'bg-blue-500',
      mainImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&crop=center',
      gallery: t('eventData.entrepreneurshipWorkshop.gallery', { returnObjects: true }) as Event['gallery'],
    },
    {
      id: 4,
      title: t('eventData.bookDonationCampaign.title'),
      description: t('eventData.bookDonationCampaign.description'),
      date: '2024-11-10',
      time: '10:00',
      location: t('eventData.bookDonationCampaign.location'),
      participants: 300,
      category: t('eventData.bookDonationCampaign.category'),
      color: 'bg-yellow-500',
      mainImage: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop&crop=center',
      gallery: t('eventData.bookDonationCampaign.gallery', { returnObjects: true }) as Event['gallery'],
    },
  ];

  return events;
};