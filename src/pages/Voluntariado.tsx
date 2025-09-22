import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Heart, Clock, Users, CheckCircle, ArrowRight, Phone } from 'lucide-react';

const Voluntariado = () => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    idade: '',
    experiencia: '',
    areas: [] as string[],
    disponibilidade: '',
    motivacao: ''
  });

  const areas = [
    t('volunteer.form.areas.sports'),
    t('volunteer.form.areas.education'),
    t('volunteer.form.areas.culture'),
    t('volunteer.form.areas.technology'),
    t('volunteer.form.areas.administration'),
    t('volunteer.form.areas.events'),
    t('volunteer.form.areas.fundraising'),
    t('volunteer.form.areas.communication')
  ];

  const disponibilidades = [
    t('volunteer.form.schedules.morning'),
    t('volunteer.form.schedules.afternoon'),
    t('volunteer.form.schedules.evening'),
    t('volunteer.form.schedules.weekends'),
    t('volunteer.form.schedules.events')
  ];

  const benefits = [
    {
      icon: Heart,
      title: t('volunteer.benefits.impact.title'),
      description: t('volunteer.benefits.impact.description')
    },
    {
      icon: Users,
      title: t('volunteer.benefits.networking.title'),
      description: t('volunteer.benefits.networking.description')
    },
    {
      icon: CheckCircle,
      title: t('volunteer.benefits.development.title'),
      description: t('volunteer.benefits.development.description')
    },
    {
      icon: Clock,
      title: t('volunteer.benefits.flexibility.title'),
      description: t('volunteer.benefits.flexibility.description')
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAreaToggle = (area: string) => {
    setFormData(prev => ({
      ...prev,
      areas: prev.areas.includes(area)
        ? prev.areas.filter(a => a !== area)
        : [...prev.areas, area]
    }));
  };

  const handleSubmit = () => {
    // Gerar mensagem para WhatsApp
    const mensagem = `Olá! Gostaria de me voluntariar na ONG Anajô.

*Dados Pessoais:*
Nome: ${formData.nome}
Email: ${formData.email}
Telefone: ${formData.telefone}
Idade: ${formData.idade}

*Áreas de Interesse:*
${formData.areas.join(', ')}

*Disponibilidade:*
${formData.disponibilidade}

*Experiência:*
${formData.experiencia}

*Motivação:*
${formData.motivacao}

Aguardo retorno para os próximos passos!`;

    const whatsappUrl = `https://wa.me/5583988567721?text=${encodeURIComponent(mensagem)}`;
    window.open(whatsappUrl, '_blank');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-foreground mb-6">{t('volunteer.form.personalData')}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="form-label">{t('volunteer.form.fullName')} *</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.nome}
                  onChange={(e) => handleInputChange('nome', e.target.value)}
                  placeholder="Seu nome completo"
                />
              </div>
              
              <div>
                <label className="form-label">{t('volunteer.form.email')} *</label>
                <input
                  type="email"
                  className="form-input"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="seu@email.com"
                />
              </div>
              
              <div>
                <label className="form-label">{t('volunteer.form.phone')} *</label>
                <input
                  type="tel"
                  className="form-input"
                  value={formData.telefone}
                  onChange={(e) => handleInputChange('telefone', e.target.value)}
                  placeholder="(83) 98856-7721"
                />
              </div>
              
              <div>
                <label className="form-label">{t('volunteer.form.age')} *</label>
                <input
                  type="number"
                  className="form-input"
                  value={formData.idade}
                  onChange={(e) => handleInputChange('idade', e.target.value)}
                  placeholder="Ex: 25"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-foreground mb-6">{t('volunteer.form.areasOfInterest')}</h3>
            <p className="text-muted-foreground mb-6">
              {t('volunteer.form.selectAreas')}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {areas.map((area, index) => (
                <label key={index} className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-accent cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.areas.includes(area)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        handleInputChange('areas', [...formData.areas, area]);
                      } else {
                        handleInputChange('areas', formData.areas.filter(a => a !== area));
                      }
                    }}
                    className="w-4 h-4 text-primary"
                  />
                  <span className="text-foreground">{area}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-foreground mb-6">{t('volunteer.form.availability')}</h3>
            
            <div>
              <label className="form-label">{t('volunteer.form.whenCanYou')} *</label>
              <select
                className="form-input"
                value={formData.disponibilidade}
                onChange={(e) => handleInputChange('disponibilidade', e.target.value)}
              >
                <option value="">{t('volunteer.form.selectAvailability')}</option>
                {disponibilidades.map((disp) => (
                  <option key={disp} value={disp}>{disp}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="form-label">{t('volunteer.form.previousExperience')}</label>
              <textarea
                className="form-input min-h-[120px]"
                value={formData.experiencia}
                onChange={(e) => handleInputChange('experiencia', e.target.value)}
                placeholder={t('volunteer.form.experiencePlaceholder')}
              />
            </div>

            <div>
              <label className="form-label">{t('volunteer.form.whyVolunteer')} *</label>
              <textarea
                className="form-input min-h-[120px]"
                value={formData.motivacao}
                onChange={(e) => handleInputChange('motivacao', e.target.value)}
                placeholder={t('volunteer.form.motivationPlaceholder')}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.nome && formData.email && formData.telefone && formData.idade;
      case 2:
        return formData.areas.length > 0;
      case 3:
        return formData.disponibilidade && formData.motivacao;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section 
          className="section-padding bg-gradient-warm relative overflow-hidden"
          style={{
            backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("/voluntario.webp")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'scroll'
          }}
        >
          <div className="container-custom text-center relative z-10">
            <h1 className="text-white mb-6">{t('volunteer.title')}</h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              {t('volunteer.subtitle')}
            </p>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="section-padding">
          <div className="container-custom">
            <h2 className="text-foreground text-center mb-12">{t('volunteer.whyVolunteer.title')}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {benefits.map((benefit, index) => (
                <div 
                  key={benefit.title}
                  className="card-elegant text-center animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-16 h-16 bg-primary/10 text-primary rounded-xl flex items-center justify-center mx-auto mb-6">
                    <benefit.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Volunteer Form */}
        <section className="section-padding bg-warm-gray">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-foreground mb-4">{t('volunteer.form.title')}</h2>
                <p className="text-muted-foreground">
                  {t('volunteer.form.description')}
                </p>
              </div>

              {/* Progress Indicator */}
              <div className="flex items-center justify-center mb-12">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      step <= currentStep 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {step}
                    </div>
                    {step < 3 && (
                      <div className={`w-16 h-1 mx-4 ${
                        step < currentStep ? 'bg-primary' : 'bg-muted'
                      }`}></div>
                    )}
                  </div>
                ))}
              </div>

              {/* Form Content */}
              <div className="bg-white rounded-xl p-8 shadow-lg">
                {renderStep()}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-8 border-t border-border mt-8">
                  <button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    disabled={currentStep === 1}
                    className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                      currentStep === 1
                        ? 'text-muted-foreground cursor-not-allowed'
                        : 'text-primary hover:bg-primary/10'
                    }`}
                  >
                    {t('volunteer.form.previous')}
                  </button>

                  {currentStep < 3 ? (
                    <button
                      onClick={() => setCurrentStep(currentStep + 1)}
                      disabled={!isStepValid()}
                      className={`px-6 py-3 rounded-lg font-medium inline-flex items-center space-x-2 ${
                        isStepValid()
                          ? 'btn-primary'
                          : 'bg-muted text-muted-foreground cursor-not-allowed'
                      }`}
                    >
                      <span>{t('volunteer.form.next')}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      disabled={!isStepValid()}
                      className={`px-6 py-3 rounded-lg font-medium inline-flex items-center space-x-2 ${
                        isStepValid()
                          ? 'btn-primary'
                          : 'bg-muted text-muted-foreground cursor-not-allowed'
                      }`}
                    >
                      <Phone className="w-4 h-4" />
                      <span>{t('volunteer.form.submit')}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="section-padding bg-gradient-warm">
          <div className="container-custom text-center">
            <h2 className="text-foreground mb-6">{t('volunteer.questions.title')}</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t('volunteer.questions.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/5583988567721?text=Olá! Tenho dúvidas sobre o programa de voluntariado da ONG Anajô."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center space-x-2"
              >
                <Phone className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
              <a
                href="/contato"
                className="btn-outline inline-flex items-center space-x-2"
              >
                <span>{t('volunteer.questions.otherContacts')}</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Voluntariado;