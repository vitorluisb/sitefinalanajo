import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users, Play, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';


const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t } = useTranslation();
  
  const slides = [
    {
      image: '/herojiu.svg',
      alt: t('hero.slide1.alt'),
      title: t('hero.slide1.title'),
      subtitle: t('hero.slide1.subtitle')
    },
    {
      image: 'capoeiracriancas.jpeg',
      alt: t('hero.slide2.alt'),
      title: '',
      subtitle: t('hero.slide2.subtitle')
    },
    {
      image: '/refeicao.svg',
      alt: t('hero.slide3.alt'),
      title: t('hero.slide3.title'),
      subtitle: t('hero.slide3.subtitle')
    },
    {
      image: '/capoeira.png',
      alt: t('hero.slide4.alt'),
      title: t('hero.slide4.title'),
      subtitle: t('hero.slide4.subtitle')
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative min-h-screen sm:min-h-screen md:min-h-screen lg:min-h-screen flex items-center overflow-hidden">
      {/* Carousel Background */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img 
              src={slide.image} 
              alt={slide.alt} 
              className="w-full h-full object-cover object-center sm:object-center md:object-center lg:object-cover xl:object-cover"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-transparent"></div>
      </div>

      {/* Carousel Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm text-white p-2 sm:p-3 rounded-full hover:bg-white/30 transition-all duration-300 group"
      >
        <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm text-white p-2 sm:p-3 rounded-full hover:bg-white/30 transition-all duration-300 group"
      >
        <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
      </button>

      {/* Carousel Indicators */}
      <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-1.5 sm:space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-white mb-4 sm:mb-6 text-balance font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight">
              {slides[currentSlide].title}
            </h1>
          </div>
          
          <div className="animate-slide-in-left">
            <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-3 sm:mb-4 leading-relaxed max-w-2xl mx-auto px-2">
              {slides[currentSlide].subtitle}
            </p>
            <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-6 sm:mb-8 leading-relaxed max-w-3xl mx-auto px-2">
              {t('hero.description')}
            </p>
          </div>

          <div className="animate-slide-in-right">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8 justify-center px-4 sm:px-0">
              <Link
                to="/doar"
                className="bg-primary hover:bg-primary/90 text-primary-foreground inline-flex items-center justify-center space-x-2 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl w-full sm:w-auto"
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>{t('hero.donateButton')}</span>
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </Link>
              
              <Link
                to="/voluntariado"
                className="bg-white/10 backdrop-blur-sm text-white border border-white/30 hover:bg-white/20 hover:border-white/50 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-300 inline-flex items-center justify-center space-x-2 text-base sm:text-lg transform hover:scale-105 w-full sm:w-auto"
              >
                <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>{t('hero.volunteerButton')}</span>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="animate-scale-in">
            <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 pt-6 sm:pt-8 border-t border-white/20 max-w-2xl mx-auto px-4 sm:px-0">
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1">{t('hero.stats.childrenNumber')}</div>
                <div className="text-xs sm:text-sm text-gray-300 leading-tight">{t('hero.stats.children')}</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1">{t('hero.stats.projectsNumber')}</div>
                <div className="text-xs sm:text-sm text-gray-300 leading-tight">{t('hero.stats.projects')}</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1">{t('hero.stats.yearsNumber')}</div>
                <div className="text-xs sm:text-sm text-gray-300 leading-tight">{t('hero.stats.years')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Play Button */}
      <div className="absolute bottom-6 sm:bottom-8 right-4 sm:right-8 hidden lg:block animate-fade-in">
        <button className="group bg-white/20 backdrop-blur-sm rounded-full p-3 sm:p-4 hover:bg-white/30 transition-all duration-300 hover:scale-110">
          <Play className="w-6 h-6 sm:w-8 sm:h-8 text-white ml-1" />
        </button>
        <p className="text-white text-xs sm:text-sm mt-2 text-center">{t('hero.watchVideo')}</p>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-16 sm:bottom-20 left-1/2 transform -translate-x-1/2 hidden md:block animate-bounce">
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-2 sm:h-3 bg-white/70 rounded-full mt-1.5 sm:mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;