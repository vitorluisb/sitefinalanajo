import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';
import { BrazilFlag, AustriaFlag, EnglandFlag } from '@/components/ui/flags';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-foreground text-background">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo e Missão */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-16 h-16 rounded-lg flex items-center justify-center overflow-hidden">
                <img 
                  src="/logoanajo.png" 
                  alt="Logo Anajô" 
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-2xl font-bold text-primary">Anajô</span>
              <div className="flex items-center space-x-3 ml-3">
                <BrazilFlag size={24} className="rounded-lg shadow-sm" />
                <AustriaFlag size={24} className="rounded-lg shadow-sm" />
                <EnglandFlag size={24} className="rounded-lg shadow-sm" />
              </div>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              {t('footer.mission')}
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/assocana.jo" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/associacaoanajo/" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-background">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li><Link to="/sobre" className="text-muted-foreground hover:text-primary transition-colors">{t('nav.about')}</Link></li>
              <li><Link to="/projetos" className="text-muted-foreground hover:text-primary transition-colors">{t('nav.projects')}</Link></li>
              <li><Link to="/voluntariado" className="text-muted-foreground hover:text-primary transition-colors">{t('nav.volunteer')}</Link></li>
              <li><Link to="/doar" className="text-muted-foreground hover:text-primary transition-colors">{t('nav.donate')}</Link></li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-background">{t('footer.contact')}</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-muted-foreground text-sm">
                  Praça do Encontro<br />
                  Bairro do Nordeste II - Guarabira, PB<br />
                  CEP: 58200000
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <p className="text-muted-foreground text-sm">(83) 98856-7721</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <div className="text-muted-foreground text-sm">
                  <p>hail.capoeira@hotmail.com</p>
                  <p>anajogba@yahoo.com.br</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © {currentYear} {t('footer.organizationName')}. {t('footer.allRightsReserved')}.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                {t('footer.privacy')}
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                {t('footer.terms')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;