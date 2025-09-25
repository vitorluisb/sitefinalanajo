import { useTranslation } from 'react-i18next';
import { X, ChevronLeft, ChevronRight, Users, MapPin, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';

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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
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
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, images.length, onClose]);

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

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const getCategoryColor = (category: string) => {
    const sports = t('projectsPage.categories.sports');
    const education = t('projectsPage.categories.education');
    const culture = t('projectsPage.categories.culture');

    switch (category) {
      case sports: return 'bg-primary text-primary-foreground';
      case education: return 'bg-secondary text-secondary-foreground';
      case culture: return 'bg-accent text-accent-foreground';
      default: return 'bg-primary text-primary-foreground';
    }
  };

  const safeLocations = project.locations || [];
  const safeResults = project.results || [];
  const safeDuration = project.duration || '—';
  const safeInstructor = project.instructor || '—';
  const safeRequirements = project.requirements || '—';

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center animate-fade-in">
      <div className="max-w-6xl max-h-[90vh] bg-white rounded-xl overflow-hidden mx-4 flex">
        {/* Image Section */}
        <div className="flex-1 relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Navigation Buttons */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
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
              <div className="absolute bottom-4 left-4 right-4 bg-black/70 text-white px-4 py-2 rounded-lg">
                <p className="text-sm">{images[currentIndex].caption}</p>
              </div>
            )}
          </div>

          {/* Image Indicators */}
          {!photosOnly && images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex 
                      ? 'bg-white scale-125' 
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Info Section */}
        {!photosOnly && (
          showDescriptionOnly ? (
            <div className="w-96 p-6 overflow-y-auto bg-white">
              <p className="text-muted-foreground leading-relaxed">{project.description}</p>
            </div>
          ) : (
            <div className="w-96 p-6 overflow-y-auto bg-white">
              <div className="space-y-6">
                {/* Header */}
                <div>
                  <div className={`inline-block ${getCategoryColor(project.category)} px-3 py-1 rounded-full text-sm font-medium mb-3`}>
                    {project.category}
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-3">
                    {project.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Details */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-medium text-foreground">{t('projectsPage.participants', { count: project.participants })}</div>
                      <div className="text-sm text-muted-foreground">{t('projectsPage.activeProject')}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-primary mt-0.5" />
                    <div className="flex-1">
                      <div className="font-medium text-foreground mb-1">{t('projectsPage.locations')}:</div>
                      <div className="space-y-1">
                        {safeLocations.map((location, idx) => (
                          <div key={idx} className="text-sm">
                            <div className="font-medium text-foreground">{location.branch}</div>
                            <div className="text-muted-foreground">{location.schedule}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-medium text-foreground">{safeDuration}</div>
                      <div className="text-sm text-muted-foreground">{t('projectsPage.totalDuration')}</div>
                    </div>
                  </div>
                </div>

                {/* Results */}
                <div className="bg-primary-soft p-4 rounded-lg">
                  <h4 className="font-semibold text-primary mb-3">{t('projectsPage.results')}:</h4>
                  <ul className="space-y-2">
                    {safeResults.map((result, idx) => (
                      <li key={idx} className="text-sm text-primary flex items-start">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Requirements */}
                <div className="border-t border-border pt-4">
                  <h4 className="font-semibold text-foreground mb-2">{t('projectsPage.requirements')}:</h4>
                  <p className="text-sm text-muted-foreground">{safeRequirements}</p>
                </div>

                {/* Instructor */}
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-1">{t('projectsPage.instructor')}:</h4>
                  <p className="text-sm text-muted-foreground">{safeInstructor}</p>
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