import { useState, useEffect, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Calendar, MapPin, Users, Trophy, BookOpen, Music, Filter, Camera, Image } from 'lucide-react';
import ProjectCarousel from '@/components/ui/ProjectCarousel';
import { useTranslatedProjects } from '@/data/projects';


const Projetos = () => {
  const { t, i18n } = useTranslation();
  const projects = useTranslatedProjects();

  const [activeFilter, setActiveFilter] = useState(t('projectsPage.categories.all'));
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  const categoryTranslations = useMemo(() => ({
    all: t('projectsPage.categories.all'),
    sports: t('projectsPage.categories.sports'),
    education: t('projectsPage.categories.education'),
    culture: t('projectsPage.categories.culture')
  }), [t, i18n.language]);

  const filters = useMemo(() => [
    t('projectsPage.categories.all'),
    t('projectsPage.categories.sports'),
    t('projectsPage.categories.education'),
    t('projectsPage.categories.culture'),
  ], [t, i18n.language]);

  // Update activeFilter when language changes
  useEffect(() => {
    setActiveFilter(t('projectsPage.categories.all'));
  }, [t, i18n.language]);

  useEffect(() => {
    const allCategory = t('projectsPage.categories.all');
    if (activeFilter === allCategory) {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(
        (project) => project.category === activeFilter
      );
      setFilteredProjects(filtered);
    }
  }, [activeFilter, projects, t]);

  const getCategoryIcon = useCallback((category: string) => {
    const sportsCategory = t('projectsPage.categories.sports');
    const educationCategory = t('projectsPage.categories.education');
    const cultureCategory = t('projectsPage.categories.culture');
    
    switch (category) {
      case sportsCategory:
        return Trophy;
      case educationCategory:
        return BookOpen;
      case cultureCategory:
        return Music;
      default:
        return Trophy;
    }
  }, [t]);

  const getCategoryColor = useCallback((category: string) => {
    const sportsCategory = t('projectsPage.categories.sports');
    const educationCategory = t('projectsPage.categories.education');
    const cultureCategory = t('projectsPage.categories.culture');
    
    switch (category) {
      case sportsCategory:
        return 'bg-primary text-primary-foreground';
      case educationCategory:
        return 'bg-secondary text-secondary-foreground';
      case cultureCategory:
        return 'bg-accent text-accent-foreground';
      default:
        return 'bg-primary text-primary-foreground';
    }
  }, [t]);

  const handleFilterChange = useCallback((filter: string) => {
    setActiveFilter(filter);
  }, []);

  const handleProjectSelect = useCallback((projectId: number) => {
    setSelectedProject(projectId);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProject(null);
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section 
          className="section-padding bg-gradient-warm relative overflow-hidden"
          style={{
            backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("/heroprojeto.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'scroll'
          }}
        >
          <div className="container-custom text-center relative z-10">
            <h1 className="text-white mb-6">{t('projectsPage.title')}</h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              {t('projectsPage.description')}
            </p>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-8 bg-background border-b border-border">
          <div className="container-custom">
            <div className="flex items-center justify-center space-x-4">
              <Filter className="w-5 h-5 text-muted-foreground" />
              <span className="text-muted-foreground font-medium">{t('projectsPage.filterBy')}</span>
              <div className="flex space-x-2">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => handleFilterChange(filter)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                      activeFilter === filter
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredProjects.map((project, index) => {
                const IconComponent = getCategoryIcon(project.category);
                return (
                  <div 
                    key={project.id}
                    className="project-card animate-fade-up cursor-pointer"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => handleProjectSelect(project.id)}
                  >
                    {/* Project Image - Versão Ultra Simplificada para Mobile */}
                    <div className="relative mb-6 rounded-lg overflow-hidden bg-gray-100" style={{ height: '200px', minHeight: '200px' }}>
                      <img 
                        src={project.image} 
                        alt={project.title}
                        style={{ 
                          height: '200px',
                          minHeight: '200px',
                          width: '100%',
                          display: 'block',
                          backgroundColor: '#f3f4f6',
                          objectFit: 'cover'
                        }}
                        onError={(e) => {
                          console.error(`❌ ERRO ao carregar imagem do projeto ${project.id}:`, project.image);
                          console.error('Erro completo:', e);
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.parentElement!.innerHTML = `
                            <div style="height: 200px; display: flex; align-items: center; justify-content: center; background-color: #f3f4f6; border: 2px dashed #d1d5db;">
                              <div style="text-align: center; color: #6b7280;">
                                <div style="font-size: 24px; margin-bottom: 8px;">📷</div>
                                <div style="font-size: 14px;">Imagem não disponível</div>
                                <div style="font-size: 12px; color: #9ca3af; margin-top: 4px; word-break: break-all;">${project.image}</div>
                                <div style="font-size: 10px; color: #ef4444; margin-top: 4px;">Projeto ID: ${project.id}</div>
                              </div>
                            </div>
                          `;
                        }}
                        onLoad={(e) => {
                          console.log(`✅ SUCESSO: Imagem carregada para projeto ${project.id}:`, project.image);
                          const target = e.target as HTMLImageElement;
                          console.log('Dimensões da imagem:', target.naturalWidth, 'x', target.naturalHeight);
                        }}
                        onLoadStart={() => {
                          console.log(`🔄 INICIANDO carregamento da imagem do projeto ${project.id}:`, project.image);
                        }}
                      />
                      <div className={`absolute top-4 left-4 ${getCategoryColor(project.category)} px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-2`}>
                        <IconComponent className="w-4 h-4" />
                        <span>{project.category}</span>
                      </div>
                    </div>

                    {/* Project Content */}
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-2xl font-bold text-foreground mb-3">
                          {project.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      {/* Project Details */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-3">
                          <Users className="w-5 h-5 text-primary" />
                          <div>
                            <div className="font-medium text-foreground">{project.participants} {t('projectsPage.participants')}</div>
                            <div className="text-sm text-muted-foreground">{t('projectsPage.activeProject')}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <MapPin className="w-5 h-5 text-primary mt-0.5" />
                          <div className="flex-1">
                            <div className="font-medium text-foreground mb-1">{t('projectsPage.locations')}:</div>
                            <div className="space-y-2">
                              {project.locations.map((location, idx) => (
                                <div key={idx} className="text-sm">
                                  <div className="font-medium text-foreground">{location.branch}</div>
                                  <div className="text-muted-foreground">{location.schedule}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Gallery Button */}
                      <div className="flex items-center justify-center pt-4 border-t border-border">
                        <div className="flex items-center space-x-2 text-primary">
                          <Camera className="w-4 h-4" />
                          <span className="text-sm font-medium">{t('projectsPage.viewGallery')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            

            {/* Project Carousel Modal */}
            {selectedProject && (
              <ProjectCarousel
                project={projects.find(p => p.id === selectedProject) as { id: number; title: string; category: string; description: string; participants: number; locations: Array<{ branch: string; schedule: string; }>; duration: string; instructor: string; results: string[]; requirements: string; }}
                images={projects.find(p => p.id === selectedProject)?.gallery || []}
                isOpen={selectedProject !== null}
                onClose={handleCloseModal}
              />
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-gradient-warm">
          <div className="container-custom text-center">
            <h2 className="text-foreground mb-6">{t('projectsPage.cta.title')}</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t('projectsPage.cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contato"
                className="btn-primary inline-flex items-center space-x-2"
              >
                <span>{t('projectsPage.cta.contact')}</span>
              </a>
              <a
                href="/voluntariado"
                className="btn-outline inline-flex items-center space-x-2"
              >
                <span>{t('projectsPage.cta.volunteer')}</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Projetos;