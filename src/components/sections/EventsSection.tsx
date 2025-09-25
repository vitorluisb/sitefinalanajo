import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, MapPin, Users, Clock, Camera } from 'lucide-react';
import ImageGallery from '@/components/ui/ImageGallery';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import { useTranslatedEvents } from '@/data/events';

const EventsSection = () => {
  const { t, i18n } = useTranslation();
  useScrollAnimation();
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const events = useTranslatedEvents();

  const openGallery = (eventId: number) => {
    setSelectedEvent(eventId);
  };

  const closeGallery = () => {
    setSelectedEvent(null);
  };

  const selectedEventData = events.find(event => event.id === selectedEvent);

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-12 scroll-fade-in">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {t('events.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('events.subtitle')}
          </p>
        </div>

        {/* Eventos ocultados: mantendo apenas título e subtítulo */}
        {/*
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8"> ... </div>
        {selectedEventData && (
          <ImageGallery images={selectedEventData.gallery} isOpen={selectedEvent !== null} onClose={closeGallery} />
        )}
        */}
      </div>
    </section>
  );
};

export default EventsSection;