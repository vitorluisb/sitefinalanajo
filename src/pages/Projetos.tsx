import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Calendar, MapPin, Users, Trophy, BookOpen, Music, Filter, Camera } from 'lucide-react';
import ProjectCarousel from '@/components/ui/ProjectCarousel';
import { useTranslatedProjects } from '@/data/projects';


const Projetos = () => {
  const { t, i18n } = useTranslation();
  const projects = useTranslatedProjects();

  const [activeFilter, setActiveFilter] = useState(t('projectsPage.categories.all'));
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [filteredProjects, setFilteredProjects] = useState(projects);

  const filters = useMemo(() => [
    t('projectsPage.categories.all'),
    t('projectsPage.categories.sports'),
    t('projectsPage.categories.education'),
    t('projectsPage.categories.culture'),
  ], [t, i18n.language]);

  // Update activeFilter when language changes
  useEffect(() => {
    setActiveFilter(t('projectsPage.categories.all'));
  }, [i18n.language, t]);

  useEffect(() => {
    if (activeFilter === t('projectsPage.categories.all')) {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(
        (project) => project.category === activeFilter
      );
      setFilteredProjects(filtered);
    }
  }, [activeFilter, projects]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case t('projectsPage.categories.sports'):
        return Trophy;
      case t('projectsPage.categories.education'):
        return BookOpen;
      case t('projectsPage.categories.culture'):
        return Music;
      default:
        return Trophy;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case t('projectsPage.categories.sports'):
        return 'bg-primary text-primary-foreground';
      case t('projectsPage.categories.education'):
        return 'bg-secondary text-secondary-foreground';
      case t('projectsPage.categories.culture'):
        return 'bg-accent text-accent-foreground';
      default:
        return 'bg-primary text-primary-foreground';
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
                    onClick={() => setActiveFilter(filter)}
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
                    onClick={() => setSelectedProject(project.id)}
                  >
                    {/* Project Image */}
                    <div className="relative h-64 mb-6 rounded-lg overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        style={{ 
                          objectPosition: project.image.includes('jiujitsu1') 
                            ? 'center 20%'
                            : project.image.includes('musica1')
                              ? 'center 25%'
                              : undefined 
                        }}
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                          <Camera className="w-6 h-6 text-white" />
                        </div>
                      </div>
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
                onClose={() => setSelectedProject(null)}
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