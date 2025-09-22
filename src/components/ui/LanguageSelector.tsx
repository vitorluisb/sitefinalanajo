import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { BrazilFlag, EnglandFlag } from './flags';

// Componente para a bandeira da Alemanha
const GermanFlag: React.FC<{ className?: string; size?: number }> = ({ 
  className = "", 
  size = 24 
}) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 18" 
    className={`rounded-sm ${className}`}
  >
    <rect width="24" height="6" fill="#000000" />
    <rect y="6" width="24" height="6" fill="#DD0000" />
    <rect y="12" width="24" height="6" fill="#FFCE00" />
  </svg>
);

interface Language {
  code: string;
  name: string;
  flag: React.ReactNode;
}

const languages: Language[] = [
  {
    code: 'pt-BR',
    name: 'Português',
    flag: <BrazilFlag size={20} className="rounded-sm" />
  },
  {
    code: 'en',
    name: 'English',
    flag: <EnglandFlag size={20} className="rounded-sm" />
  },
  {
    code: 'de',
    name: 'Deutsch',
    flag: <GermanFlag size={20} className="rounded-sm" />
  }
];

const LanguageSelector: React.FC = () => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 xl:space-x-2 px-2 xl:px-3 py-1.5 xl:py-2 rounded-lg bg-black/20 hover:bg-black/30 transition-colors duration-200 text-white border border-white/30 backdrop-blur-sm"
        aria-label={t('language.select')}
      >
        <Globe size={16} className="text-white xl:w-[18px] xl:h-[18px]" />
        <div className="scale-75 xl:scale-100">{currentLanguage.flag}</div>
        <span className="text-xs xl:text-sm font-semibold text-white drop-shadow-lg hidden sm:inline">{currentLanguage.name}</span>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
            <div className="py-2">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-200 ${
                    currentLanguage.code === language.code 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-700'
                  }`}
                >
                  {language.flag}
                  <span className="font-medium">{language.name}</span>
                  {currentLanguage.code === language.code && (
                    <span className="ml-auto text-blue-600">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSelector;