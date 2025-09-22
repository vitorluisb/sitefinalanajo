import { Building2, Heart, Users, Award } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTranslatedSupporters } from '@/data/supporters';

const SupportersSection = () => {
  const { t } = useTranslation();
  const { companies, individuals } = useTranslatedSupporters();

  return (
    <section className="section-padding bg-muted">
      <div className="container-custom">
        <div className="text-center mb-12 scroll-fade-in">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {t('supporters.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('supporters.subtitle')}
          </p>
        </div>

        {/* Empresas Parceiras */}
        <div className="mb-16">
          <div className="flex items-center justify-center mb-8 scroll-slide-left">
            <Building2 className="w-6 h-6 text-primary mr-3" />
            <h3 className="text-2xl font-semibold text-foreground">{t('supporters.companiesTitle')}</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {companies.map((company, index) => (
                <div
                  key={company.id}
                  className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 scroll-scale"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                  <img 
                    src={company.logo} 
                    alt={`Logo ${company.name}`}
                    className="w-full h-full object-contain"
                  />
                </div>
                
                <h4 className="font-semibold text-foreground mb-2">{company.name}</h4>
                
                <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium mb-3">
                  {t('supporters.partner')}
                </span>
                
                <p className="text-sm text-muted-foreground mb-2">
                  {company.contribution}
                </p>
                
                {company.since && (
                  <div className="flex items-center justify-center text-xs text-muted-foreground">
                    <Award className="w-3 h-3 mr-1" />
                    {t('supporters.partnerSince', { since: company.since })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Pessoas Especiais */}
        <div>
          <div className="flex items-center justify-center mb-8 scroll-slide-right">
            <Heart className="w-6 h-6 text-destructive mr-3" />
            <h3 className="text-2xl font-semibold text-foreground">{t('supporters.individualsTitle')}</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {individuals.map((person, index) => (
                <div
                  key={person.id}
                  className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 scroll-slide-right"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src={person.avatar} 
                      alt={person.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{person.name}</h4>
                    <span className="text-sm text-primary font-medium">{person.role}</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <Users className="w-4 h-4 mr-2" />
                    {person.contribution}
                  </div>
                </div>
                
                <blockquote className="text-sm text-muted-foreground italic border-l-4 border-primary pl-4">
                  "{person.testimonial}"
                </blockquote>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white scroll-fade-in">
          <h3 className="text-3xl font-bold mb-4">
            {t('supporters.joinFamily')}
          </h3>
          <p className="text-xl mb-8 opacity-90">
            {t('supporters.joinDescription')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              {t('supporters.becomePartner')}
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              {t('supporters.learnMore')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportersSection;