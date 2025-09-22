import { Heart, Target, Eye, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import useScrollAnimation from '@/hooks/useScrollAnimation';

const MissionSection = () => {
  const { t } = useTranslation();
  useScrollAnimation();

  const values = [
    {
      icon: Heart,
      title: t('mission.values.mission.title'),
      description: t('mission.values.mission.description'),
      color: 'bg-destructive/10 text-destructive',
      accent: 'accent-red'
    },
    {
      icon: Target,
      title: t('mission.values.objective.title'),
      description: t('mission.values.objective.description'),
      color: 'bg-primary/10 text-primary',
      accent: ''
    },
    {
      icon: Eye,
      title: t('mission.values.belief.title'),
      description: t('mission.values.belief.description'),
      color: 'bg-warning/10 text-warning',
      accent: 'accent-yellow'
    },
    {
      icon: TrendingUp,
      title: t('mission.values.impact.title'),
      description: t('mission.values.impact.description'),
      color: 'bg-success/10 text-success',
      accent: 'accent-green'
    }
  ];

  return (
    <section className="section-padding bg-muted">
      <div className="container-custom">
        <div className="text-center mb-16 scroll-fade-in">
          <h2 className="text-foreground mb-6">{t('mission.title')}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('mission.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {values.map((value, index) => {
            const Icon = value.icon;
            const animationClass = index % 2 === 0 ? 'scroll-slide-left' : 'scroll-slide-right';
            
            return (
              <div 
                key={index} 
                className={`bg-card rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${animationClass} ${value.accent}`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className={`w-16 h-16 ${value.color} rounded-xl flex items-center justify-center mb-6`}>
                  <Icon className="w-8 h-8" />
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-4">
                  {value.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Quote Section */}
        <div className="text-center max-w-4xl mx-auto scroll-scale">
          <blockquote className="text-2xl font-medium text-foreground mb-6 italic">
            "{t('mission.quote')}"
          </blockquote>
          <cite className="text-muted-foreground">
           
          </cite>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;