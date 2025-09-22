import { useTranslatedAnnouncements } from '@/data/announcements';
import { useTranslation } from 'react-i18next';
import useScrollAnimation from '@/hooks/useScrollAnimation';

const AnnouncementsSection = () => {
  const { t } = useTranslation();
  useScrollAnimation();
  const announcements = useTranslatedAnnouncements();

  return (
    <section className="section-padding bg-muted">
      <div className="container-custom">
        <div className="text-center mb-12 scroll-fade-in">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {t('announcements.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('announcements.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {announcements.map((announcement, index) => (
            <div
              key={announcement.id}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 scroll-scale"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  {announcement.urgent ? (
                    <div className="p-2 bg-destructive/10 text-destructive rounded-lg">
                      <AlertCircle className="w-5 h-5" />
                    </div>
                  ) : (
                    <div className="p-2 bg-primary/10 text-primary rounded-lg">
                      <Calendar className="w-5 h-5" />
                    </div>
                  )}
                  {announcement.urgent && (
                    <span className="bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded-full font-medium">
                      {t('announcements.urgent')}
                    </span>
                  )}
                </div>
                <div className="flex items-center text-muted-foreground text-sm">
                  <Clock className="w-4 h-4 mr-1" />
                  {announcement.time}
                </div>
              </div>

              <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
                {announcement.title}
              </h3>
              
              <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                {announcement.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {new Date(announcement.date).toLocaleDateString(i18n.language, {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  })}
                </span>
                <button className="text-primary hover:text-primary/80 font-medium text-sm transition-colors">
                  {t('announcements.readMore')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnnouncementsSection;