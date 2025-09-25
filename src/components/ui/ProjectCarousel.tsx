import { useTranslation } from 'react-i18next';
import { X, ChevronLeft, ChevronRight, Users, MapPin, Clock } from 'lucide-react';
import { useState, useEffect, useCallback, useMemo } from 'react';

interface ProjectCarouselProps {
  project: {
    id: number;
    title: string;
    category: string;
    description: string;
    participants: number;
    locations?: Array<{
      branch: string;
      schedule: string;
    }>;
    duration?: string;
    instructor?: string;
    results?: string[];
    requirements?: string;
  };
  images: Array<{
    src: string;
    alt: string;
    caption?: string;
  }>;
  isOpen: boolean;
  onClose: () => void;
  showDescriptionOnly?: boolean;
  photosOnly?: boolean;
}

const ProjectCarousel = ({ project, images, isOpen, onClose, showDescriptionOnly = false, photosOnly = false }: ProjectCarouselProps) => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!isOpen) return;
    
    switch (event.key) {
      case 'Escape':
        onClose();
        break;
      case 'ArrowLeft':
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
        break;
      case 'ArrowRight':
        setCurrentIndex((prev) => (prev + 1) % images.length);
        break;
    }
  }, [isOpen, images.length, onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!isOpen) return null;

  // When only the description should be shown (no images, no extra sections)
  if (showDescriptionOnly) {
    return (
      <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center animate-fade-in">
        <div className="max-w-2xl w-full bg-white rounded-xl overflow-hidden mx-4 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-black/10 hover:bg-black/20 text-black p-2 rounded-full transition-colors"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="p-6">
            <p className="text-muted-foreground leading-relaxed">{project.description}</p>
          </div>
        </div>
      </div>
    );
  }

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const selectImage = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Reset image index when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
    }
  }, [isOpen]);

  const translations = useMemo(() => ({
    categories: {
      sports: t('projectsPage.categories.sports'),
      education: t('projectsPage.categories.education'),
      culture: t('projectsPage.categories.culture')
    },
    participants: (count: number) => t('projectsPage.participants', { count }),
    activeProject: t('projectsPage.activeProject'),
    locations: t('projectsPage.locations'),
    totalDuration: t('projectsPage.totalDuration'),
    results: t('projectsPage.results'),
    requirements: t('projectsPage.requirements'),
    instructor: t('projectsPage.instructor')
  }), [t]);

  const getCategoryColor = useCallback((category: string) => {
    switch (category) {
      case translations.categories.sports: return 'bg-primary text-primary-foreground';
      case translations.categories.education: return 'bg-secondary text-secondary-foreground';
      case translations.categories.culture: return 'bg-accent text-accent-foreground';
      default: return 'bg-primary text-primary-foreground';
    }
  }, [translations.categories]);

  const safeLocations = project.locations || [];
  const safeResults = project.results || [];
  const safeDuration = project.duration || '—';
  const safeInstructor = project.instructor || '—';
  const safeRequirements = project.requirements || '—';

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center animate-fade-in p-2 sm:p-4">
      <div className="w-full max-w-6xl modal-responsive bg-white rounded-xl overflow-hidden flex flex-col lg:flex-row">
        {/* Image Section */}
        <div className="flex-1 relative modal-image-section">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 bg-black/20 hover:bg-black/40 text-white p-1.5 sm:p-2 rounded-full transition-colors"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Navigation Buttons */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-800 hover:text-black p-2 sm:p-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 border-2 border-white/50 hover:border-white backdrop-blur-sm nav-button-pulse"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 font-bold" />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-800 hover:text-black p-2 sm:p-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 border-2 border-white/50 hover:border-white backdrop-blur-sm nav-button-pulse"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 font-bold" />
              </button>
            </>
          )}

          {/* Main Image */}
          <div className="h-full">
            <img
              src={images[currentIndex]?.src}
              alt={images[currentIndex]?.alt}
              className="w-full h-full object-cover"
            />
            
            {/* Image Caption */}
            {!photosOnly && images[currentIndex]?.caption && (
              <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4 bg-black/70 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-lg">
                <p className="text-xs sm:text-sm">{images[currentIndex].caption}</p>
              </div>
            )}
          </div>

          {/* Image Indicators */}
          {!photosOnly && images.length > 1 && (
            <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1.5 sm:space-x-2 bg-black/30 backdrop-blur-sm px-3 py-2 rounded-full">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => selectImage(index)}
                  className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 border border-white/30 ${
                    index === currentIndex 
                      ? 'bg-white scale-125 shadow-lg border-white' 
                      : 'bg-white/50 hover:bg-white/75 hover:scale-110 hover:border-white/60'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Info Section */}
        {!photosOnly && (
          showDescriptionOnly ? (
            <div className="w-full lg:w-96 p-4 sm:p-6 overflow-y-auto bg-white modal-content-section">
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{project.description}</p>
            </div>
          ) : (
            <div className="w-full lg:w-96 p-4 sm:p-6 overflow-y-auto bg-white modal-content-section">
              <div className="space-y-4 sm:space-y-6">
                {/* Header */}
                <div>
                  <div className={`inline-block ${getCategoryColor(project.category)} px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium mb-2 sm:mb-3`}>
                    {project.category}
                  </div>
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground mb-2 sm:mb-3">
                    {project.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                    {project.description}
                  </p>
                </div>

                {/* Details */}
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                    <div>
                      <div className="font-medium text-foreground text-sm sm:text-base">{translations.participants(project.participants)}</div>
                      <div className="text-xs sm:text-sm text-muted-foreground">{translations.activeProject}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-foreground mb-1 text-sm sm:text-base">{translations.locations}:</div>
                      <div className="space-y-1">
                        {safeLocations.map((location, idx) => (
                          <div key={idx} className="text-xs sm:text-sm">
                            <div className="font-medium text-foreground">{location.branch}</div>
                            <div className="text-muted-foreground">{location.schedule}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                    <div>
                      <div className="font-medium text-foreground text-sm sm:text-base">{safeDuration}</div>
                      <div className="text-xs sm:text-sm text-muted-foreground">{translations.totalDuration}</div>
                    </div>
                  </div>
                </div>

                {/* Results */}
                <div className="bg-primary-soft p-3 sm:p-4 rounded-lg">
                  <h4 className="font-semibold text-primary mb-2 sm:mb-3 text-sm sm:text-base">{translations.results}:</h4>
                  <ul className="space-y-1 sm:space-y-2">
                    {safeResults.map((result, idx) => (
                      <li key={idx} className="text-xs sm:text-sm text-primary flex items-start">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 sm:mt-2 mr-2 flex-shrink-0"></span>
                        <span className="break-words">{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Requirements */}
                <div className="border-t border-border pt-3 sm:pt-4">
                  <h4 className="font-semibold text-foreground mb-2 text-sm sm:text-base">{translations.requirements}:</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground break-words">{safeRequirements}</p>
                </div>

                {/* Instructor */}
                <div className="bg-muted p-3 sm:p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-1 text-sm sm:text-base">{translations.instructor}:</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground break-words">{safeInstructor}</p>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default ProjectCarousel;