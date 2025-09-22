import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Users, Heart, Target, Award, Clock, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Sobre = () => {
  const { t } = useTranslation();
  
  const team = [
    {
      name: t('about.teamMembers.hailton.name'),
      role: t('about.teamMembers.hailton.role'),
      image: '/hailton.png'
    },
    {
      name: t('about.teamMembers.joseilda.name'),
      role: t('about.teamMembers.joseilda.role'),
      image: '/joseilda.png'
    },
    // {
    //   name: 'Ana Paula Costa',
    //   role: 'Coordenadora Pedagógica',
    //   description: 'Especialista em educação infantil e desenvolvimento de projetos educacionais inovadores.',
    //   image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face'
    // },
    // {
    //   name: 'Roberto Oliveira',
    //   role: 'Coordenador Cultural',
    //   description: 'Músico e arte-educador que acredita no poder transformador das artes na vida dos jovens.',
    //   image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'
    // }
  ];

  const historyCards = [
    {
      id: 1,
      title: t('about.historyCards.foundation.title'),
      content: [
        { label: t('about.historyCards.foundation.items.founding.label'), text: t('about.historyCards.foundation.items.founding.text') },
        { label: t('about.historyCards.foundation.items.founder.label'), text: t('about.historyCards.foundation.items.founder.text') },
        { label: t('about.historyCards.foundation.items.motivation.label'), text: t('about.historyCards.foundation.items.motivation.text') },
        { label: t('about.historyCards.foundation.items.beginning.label'), text: t('about.historyCards.foundation.items.beginning.text') },
        { label: t('about.historyCards.foundation.items.partnership.label'), text: t('about.historyCards.foundation.items.partnership.text') }
      ]
    },
    {
      id: 2,
      title: t('about.historyCards.mission.title'),
      content: [
        { label: t('about.historyCards.mission.items.mission.label'), text: t('about.historyCards.mission.items.mission.text') },
        { label: t('about.historyCards.mission.items.objective.label'), text: t('about.historyCards.mission.items.objective.text') },
        { label: t('about.historyCards.mission.items.impact.label'), text: t('about.historyCards.mission.items.impact.text') },
        { label: t('about.historyCards.mission.items.belief.label'), text: t('about.historyCards.mission.items.belief.text') }
      ]
    },
    {
      id: 3,
      title: t('about.historyCards.audience.title'),
      content: [
        { label: t('about.historyCards.audience.items.target.label'), text: t('about.historyCards.audience.items.target.text') },
        { label: t('about.historyCards.audience.items.children.label'), text: t('about.historyCards.audience.items.children.text') },
        { label: t('about.historyCards.audience.items.teens.label'), text: t('about.historyCards.audience.items.teens.text') },
        { label: t('about.historyCards.audience.items.families.label'), text: t('about.historyCards.audience.items.families.text') },
        { label: t('about.historyCards.audience.items.support.label'), text: t('about.historyCards.audience.items.support.text') }
      ]
    },
    {
      id: 4,
      title: t('about.historyCards.location.title'),
      content: [
        { label: t('about.historyCards.location.items.city.label'), text: t('about.historyCards.location.items.city.text') },
        { label: t('about.historyCards.location.items.anajo1.label'), text: t('about.historyCards.location.items.anajo1.text') },
        { label: t('about.historyCards.location.items.anajo2.label'), text: t('about.historyCards.location.items.anajo2.text') },
        { label: t('about.historyCards.location.items.anajo3.label'), text: t('about.historyCards.location.items.anajo3.text') },
        { label: t('about.historyCards.location.items.anajo4.label'), text: t('about.historyCards.location.items.anajo4.text') }
      ]
    },
    {
      id: 5,
      title: t('about.historyCards.activities.title'),
      content: [
        { label: t('about.historyCards.activities.items.proposal.label'), text: t('about.historyCards.activities.items.proposal.text') },
        { label: t('about.historyCards.activities.items.education.label'), text: t('about.historyCards.activities.items.education.text') },
        { label: t('about.historyCards.activities.items.sports.label'), text: t('about.historyCards.activities.items.sports.text') },
        { label: t('about.historyCards.activities.items.culture.label'), text: t('about.historyCards.activities.items.culture.text') },
        { label: t('about.historyCards.activities.items.instruments.label'), text: t('about.historyCards.activities.items.instruments.text') }
      ]
    },
    {
      id: 6,
      title: t('about.historyCards.partners.title'),
      content: [
        { label: t('about.historyCards.partners.items.city.label'), text: t('about.historyCards.partners.items.city.text') },
        { label: t('about.historyCards.partners.items.police.label'), text: t('about.historyCards.partners.items.police.text') },
        { label: t('about.historyCards.partners.items.capoeira.label'), text: t('about.historyCards.partners.items.capoeira.text') },
        { label: t('about.historyCards.partners.items.austria.label'), text: t('about.historyCards.partners.items.austria.text') }
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section 
          className="section-padding bg-gradient-warm relative overflow-hidden"
          style={{
            backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("/frenteanajo.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'top',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'scroll'
          }}
        >
          <div className="container-custom text-center relative z-10">
            <h1 className="text-white mb-6">{t('about.title')}</h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              {t('about.description')}
            </p>
          </div>
        </section>

        {/* Mission, Vision, Values */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="card-elegant text-center">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Target className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">{t('about.mission.title')}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t('about.mission.description')}
                </p>
              </div>

              <div className="card-elegant text-center">
                <div className="w-16 h-16 bg-secondary/10 text-secondary rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">{t('about.objective.title')}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t('about.objective.description')}
                </p>
              </div>

              <div className="card-elegant text-center">
                <div className="w-16 h-16 bg-accent/10 text-accent rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Award className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">{t('about.belief.title')}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t('about.belief.description')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="section-padding bg-warm-gray">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-foreground mb-4">{t('about.team.title')}</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {t('about.team.subtitle')}
              </p>
            </div>

            <div className="flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl">
                {team.map((member, index) => (
                  <div 
                    key={member.name}
                    className="card-elegant text-center animate-fade-up hover:shadow-xl transition-all duration-300"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-6 group">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-125"
                      />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {member.name}
                    </h3>
                    <p className="text-primary font-medium mb-3">
                      {member.role}
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {'description' in member ? member.description : ''}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Nossa História */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-foreground mb-4">{t('about.history.title')}</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {t('about.history.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8">
              {historyCards.map((card) => (
                <div key={card.id} className="card-elegant hover:shadow-xl transition-shadow duration-300">
                   <h3 className="text-3xl font-bold text-primary mb-4">{card.title}</h3>
                   <div className="space-y-4">
                     {card.content.map((item, index) => (
                       <div key={index} className="border-l-4 border-primary/20 pl-4">
                         <h4 className="font-semibold text-foreground mb-1 text-xl">{item.label}:</h4>
                         <p className="text-muted-foreground text-lg leading-relaxed">{item.text}</p>
                       </div>
                     ))}
                   </div>
                 </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="section-padding bg-gradient-warm">
          <div className="container-custom text-center">
            <h2 className="text-foreground mb-8">{t('about.visit.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="flex flex-col items-center">
                <MapPin className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold text-foreground mb-2">{t('about.visit.address.title')}</h3>
                <p className="text-muted-foreground text-sm text-center" style={{ whiteSpace: 'pre-line' }}>
                  {t('about.visit.address.text')}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <Clock className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold text-foreground mb-2">{t('about.visit.hours.title')}</h3>
                <p className="text-muted-foreground text-sm text-center" style={{ whiteSpace: 'pre-line' }}>
                  {t('about.visit.hours.text')}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <Users className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold text-foreground mb-2">{t('about.visit.capacity.title')}</h3>
                <p className="text-muted-foreground text-sm text-center" style={{ whiteSpace: 'pre-line' }}>
                  {t('about.visit.capacity.text')}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Sobre;