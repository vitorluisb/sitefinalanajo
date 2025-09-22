import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Contato = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    assunto: '',
    mensagem: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Gerar mensagem para WhatsApp
    const mensagem = `Olá! Estou entrando em contato através do site da ONG Anajô.

*Nome:* ${formData.nome}
*Email:* ${formData.email}
*Telefone:* ${formData.telefone}
*Assunto:* ${formData.assunto}

*Mensagem:*
${formData.mensagem}

Aguardo retorno. Obrigado!`;

    const whatsappUrl = `https://wa.me/5583988567721?text=${encodeURIComponent(mensagem)}`;
    window.open(whatsappUrl, '_blank');
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: t('contact.contactInfo.address.title'),
      details: t('contact.contactInfo.address.details', { returnObjects: true }),
      color: 'text-primary'
    },
    {
      icon: Phone,
      title: t('contact.contactInfo.phone.title'),
      details: t('contact.contactInfo.phone.details', { returnObjects: true }),
      color: 'text-secondary'
    },
    {
      icon: Mail,
      title: t('contact.contactInfo.email.title'),
      details: t('contact.contactInfo.email.details', { returnObjects: true }),
      color: 'text-accent'
    },
    {
      icon: Clock,
      title: t('contact.contactInfo.hours.title'),
      details: t('contact.contactInfo.hours.details', { returnObjects: true }),
      color: 'text-primary'
    }
  ];



  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="section-padding bg-gradient-warm">
          <div className="container-custom text-center">
            <h1 className="text-foreground mb-6">{t('contact.title')}</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('contact.subtitle')}
            </p>
          </div>
        </section>

        {/* Contact Info Grid */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {contactInfo.map((info, index) => (
                <div 
                  key={info.title}
                  className="card-elegant text-center animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`w-16 h-16 ${info.color} bg-current/10 rounded-xl flex items-center justify-center mx-auto mb-6`}>
                    <info.icon className={`w-8 h-8 ${info.color}`} />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-4">
                    {info.title}
                  </h3>
                  <div className="space-y-2">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-muted-foreground text-sm">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form and Map */}
        <section className="section-padding bg-warm-gray">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-8">{t('contact.form.title')}</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="form-label">{t('contact.form.name')} *</label>
                      <input
                        type="text"
                        className="form-input"
                        value={formData.nome}
                        onChange={(e) => handleInputChange('nome', e.target.value)}
                        placeholder={t('contact.form.namePlaceholder')}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="form-label">{t('contact.form.email')} *</label>
                      <input
                        type="email"
                        className="form-input"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder={t('contact.form.emailPlaceholder')}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="form-label">{t('contact.form.phone')}</label>
                      <input
                        type="tel"
                        className="form-input"
                        value={formData.telefone}
                        onChange={(e) => handleInputChange('telefone', e.target.value)}
                        placeholder={t('contact.form.phonePlaceholder')}
                      />
                    </div>
                    
                    <div>
                      <label className="form-label">{t('contact.form.subject')} *</label>
                      <select
                        className="form-input"
                        value={formData.assunto}
                        onChange={(e) => handleInputChange('assunto', e.target.value)}
                        required
                      >
                        <option value="">{t('contact.form.selectSubject')}</option>
                        <option value="voluntariado">{t('contact.form.subjects.volunteer')}</option>
                        <option value="doacoes">{t('contact.form.subjects.donation')}</option>
                        <option value="parcerias">{t('contact.form.subjects.partnership')}</option>
                        <option value="projetos">{t('contact.form.subjects.general')}</option>
                        <option value="visita">{t('contact.form.subjects.visit')}</option>
                        <option value="outros">{t('contact.form.subjects.other')}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="form-label">{t('contact.form.message')} *</label>
                    <textarea
                      className="form-input min-h-[150px]"
                      value={formData.mensagem}
                      onChange={(e) => handleInputChange('mensagem', e.target.value)}
                      placeholder={t('contact.form.messagePlaceholder')}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary w-full inline-flex items-center justify-center space-x-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{t('contact.form.submit')}</span>
                  </button>
                </form>

              </div>

              {/* Map and Quick Actions */}
              <div className="space-y-8">
                {/* Map */}
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-6">{t('contact.location.title')}</h3>
                  <div className="bg-white rounded-lg p-6 shadow-lg">
                    {/* Interactive Google Maps Embed */}
                    <div className="aspect-video rounded-lg overflow-hidden mb-4 border border-border">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.1234567890123!2d-35.4823007!3d-6.8548371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7adb5fd06fa1ae9%3A0x6c144846b0f5e21e!2sAssocia%C3%A7%C3%A3o%20Anaj%C3%B4!5e0!3m2!1spt-BR!2sbr!4v1234567890123!5m2!1spt-BR!2sbr"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Localização da Associação Anajô"
                        className="w-full h-full"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      {t('contact.location.description')}
                    </p>
                    <a
                      href="https://www.google.com/maps/place/Associa%C3%A7%C3%A3o+Anaj%C3%B4/@-6.8549281,-35.4826648,19.75z/data=!4m6!3m5!1s0x7adb5fd06fa1ae9:0x6c144846b0f5e21e!8m2!3d-6.8548371!4d-35.4823007!16s%2Fg%2F11lcllyy6s?entry=ttu&g_ep=EgoyMDI1MDgyNS4wIKXMDSoASAFQAw%3D%3D"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary w-full text-center inline-flex items-center justify-center space-x-2"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                      <span>{t('contact.location.mapLink')}</span>
                    </a>
                  </div>
                </div>

                {/* Quick Actions */}
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-6">{t('contact.quickActions.title')}</h3>
                  <div className="space-y-4">
                    <a
                      href="https://wa.me/5583988567721?text=Olá! Gostaria de falar com vocês."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-accent w-full inline-flex items-center justify-center space-x-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{t('contact.quickActions.whatsapp')}</span>
                    </a>
                    
                    <a
                      href="tel:+5583988567721"
                      className="btn-secondary w-full inline-flex items-center justify-center space-x-2"
                    >
                      <Phone className="w-4 h-4" />
                      <span>{t('contact.quickActions.call')}</span>
                    </a>
                    
                    <a
                      href="mailto:hail.capoeira@hotmail.com"
                      className="btn-outline w-full inline-flex items-center justify-center space-x-2"
                    >
                      <Mail className="w-4 h-4" />
                      <span>{t('contact.quickActions.email')}</span>
                    </a>
                  </div>
                </div>


              </div>
            </div>
          </div>
        </section>

        {/* Visit Us Section */}
        <section className="section-padding bg-gradient-warm">
          <div className="container-custom text-center">
            <h2 className="text-foreground mb-6">{t('contact.visitUs.title')}</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t('contact.visitUs.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/5583988567721?text=Olá! Gostaria de agendar uma visita à ONG Anajô."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center space-x-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t('contact.visitUs.scheduleVisit')}</span>
              </a>
              <a
                href="/sobre"
                className="btn-outline inline-flex items-center space-x-2"
              >
                <span>{t('contact.visitUs.knowHistory')}</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contato;