import { Building2, Users, Award } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTranslatedSupporters } from '@/data/supporters';

const SupportersSection = () => {
  const { t } = useTranslation();
  const { companies } = useTranslatedSupporters();

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
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {companies.map((company, index) => (
                <div
                  key={company.id}
                className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 scroll-scale"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
              <div className="w-32 h-20 mx-auto mb-4 overflow-hidden flex items-center justify-center">
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