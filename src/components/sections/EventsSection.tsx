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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.map((event, index) => (
            <div
              key={event.id}
              className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 scroll-slide-left cursor-pointer"
              style={{ animationDelay: `${index * 0.15}s` }}
              onClick={() => openGallery(event.id)}
            >
              <div className={`h-2 ${event.color}`}></div>
              
              {/* Event Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={event.mainImage}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${event.color} text-white`}>
                    {event.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4 text-white bg-black/50 rounded-lg px-2 py-1">
                  <div className="text-xl font-bold">
                    {new Date(event.date).getDate()}
                  </div>
                  <div className="text-xs">
                    {new Date(event.date).toLocaleDateString('pt-BR', { month: 'short' })}
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {event.title}
                </h3>
                
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {event.description}
                </p>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(event.date).toLocaleDateString('pt-BR', {
                      weekday: 'long',
                      day: '2-digit',
                      month: 'long'
                    })}
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 mr-2" />
                    {event.time}
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-2" />
                    {event.location}
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="w-4 h-4 mr-2" />
                    {event.participants} {t('events.expectedParticipants')}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-primary">
                    <Camera className="w-4 h-4" />
                    <span className="text-sm font-medium">{t('events.viewGallery')}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {event.gallery.length} {t('events.photos')}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Image Gallery Modal */}
        {selectedEventData && (
          <ImageGallery
            images={selectedEventData.gallery}
            isOpen={selectedEvent !== null}
            onClose={closeGallery}
          />
        )}
      </div>
    </section>
  );
};

export default EventsSection;