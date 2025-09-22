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
    flag: <BrazilFlag size={24} className="rounded-sm" />
  },
  {
    code: 'en',
    name: 'English',
    flag: <EnglandFlag size={24} className="rounded-sm" />
  },
  {
    code: 'de',
    name: 'Deutsch',
    flag: <GermanFlag size={24} className="rounded-sm" />
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
        className="flex items-center space-x-2 xl:space-x-2 px-4 py-3 xl:px-3 xl:py-2 rounded-xl bg-gradient-to-r from-black/25 to-black/15 hover:from-black/35 hover:to-black/25 transition-all duration-300 text-white border border-white/40 backdrop-blur-md min-h-[48px] xl:min-h-0 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
        aria-label={t('language.select')}
      >
        <Globe size={20} className="text-white xl:w-[18px] xl:h-[18px] drop-shadow-md" />
        <div className="scale-100 xl:scale-100">{currentLanguage.flag}</div>
        <span className="text-sm xl:text-sm font-semibold text-white drop-shadow-lg hidden sm:inline">{currentLanguage.name}</span>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 backdrop-blur-sm animate-in slide-in-from-top-2 duration-200">
            <div className="py-2">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-blue-50 transition-all duration-200 rounded-lg mx-2 ${
                    currentLanguage.code === language.code 
                      ? 'bg-blue-100 text-blue-700 font-semibold' 
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  <div className="scale-110">{language.flag}</div>
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