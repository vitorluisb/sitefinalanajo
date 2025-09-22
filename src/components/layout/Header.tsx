import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '@/components/ui/LanguageSelector';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  const navigation = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.about'), href: '/sobre' },
    { name: t('nav.projects'), href: '/projetos' },
    { name: t('nav.volunteer'), href: '/voluntariado' },
    { name: t('nav.contact'), href: '/contato' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border shadow-lg">
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <img 
              src="/logoanajo.png" 
              alt="Logo ANAJÔ" 
              className="w-16 h-12 sm:w-20 sm:h-16"
            />
            <span className="text-xl sm:text-2xl font-bold text-primary">Anajô</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors duration-200 hover:text-primary whitespace-nowrap ${
                  isActive(item.href) 
                    ? 'text-primary border-b-2 border-primary pb-1' 
                    : 'text-foreground'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-2 xl:space-x-4">
            <LanguageSelector />
            <Link
              to="/doar"
              className="btn-primary inline-flex items-center space-x-1 xl:space-x-2 text-xs xl:text-sm px-2 xl:px-4 py-1.5 xl:py-2"
            >
              <Heart className="w-3 h-3 xl:w-4 xl:h-4" />
              <span className="hidden xl:inline">{t('nav.donate')}</span>
              <span className="xl:hidden">Doar</span>
            </Link>
            <Link
              to="/voluntariado"
              className="btn-outline inline-flex items-center space-x-1 xl:space-x-2 text-xs xl:text-sm px-2 xl:px-4 py-1.5 xl:py-2"
            >
              <Users className="w-3 h-3 xl:w-4 xl:h-4" />
              <span className="hidden xl:inline">{t('nav.volunteer')}</span>
              <span className="xl:hidden">Voluntário</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-fade-in">
            <div className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-muted'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 space-y-2">
                <div className="flex justify-center pb-2">
                  <LanguageSelector />
                </div>
                <Link
                  to="/doar"
                  className="btn-primary w-full text-center inline-flex items-center justify-center space-x-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Heart className="w-4 h-4" />
                  <span>{t('nav.donate')}</span>
                </Link>
                <Link
                  to="/voluntariado"
                  className="btn-outline w-full text-center inline-flex items-center justify-center space-x-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Users className="w-4 h-4" />
                  <span>{t('nav.volunteer')}</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;