import { useTranslation } from 'react-i18next';

export interface Announcement {
  id: number;
  type: 'urgent' | 'info' | 'event';
  title: string;
  description: string;
  date: string;
  time: string;
  urgent: boolean;
}

const announcements: Omit<Announcement, 'title' | 'description'>[] = [
  {
    id: 1,
    type: 'urgent',
    date: '2024-01-15',
    time: '14:00',
    urgent: true
  },
  {
    id: 2,
    type: 'info',
    date: '2024-01-12',
    time: '09:30',
    urgent: false
  },
  {
    id: 3,
    type: 'event',
    date: '2024-01-20',
    time: '18:00',
    urgent: false
  }
];

const announcementKeys = [
  'futureChampion',
  'schoolPartnership',
  'juninaParty'
];

export const useTranslatedAnnouncements = (): Announcement[] => {
  const { t } = useTranslation();

  return announcements.map((announcement, index) => ({
    ...announcement,
    title: t(`announcementData.${announcementKeys[index]}.title`),
    description: t(`announcementData.${announcementKeys[index]}.description`),
  }));
};