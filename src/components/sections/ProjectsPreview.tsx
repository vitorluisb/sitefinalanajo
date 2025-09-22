import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, MapPin, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import { useTranslatedProjectsPreview } from '@/data/projects';


const ProjectsPreview = () => {
  const { t } = useTranslation();
  useScrollAnimation();
  const projects = useTranslatedProjectsPreview();

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-16 scroll-fade-in">
          <h2 className="text-foreground mb-4">
            {t('projects.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('projects.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {projects.map((project, index) => (
            <div 
              key={project.id}
              className="project-card scroll-scale"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Image */}
              <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute top-4 left-4 ${project.color} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                  {project.category}
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-foreground">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 py-4 border-t border-border">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>{project.participants} {t('projects.participants')}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>
                      {project.locations.length === 1 
                        ? project.locations[0].branch 
                        : `${project.locations.length} ${t('projects.branches')}`
                      }
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground col-span-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {project.locations.length === 1 
                        ? project.locations[0].schedule 
                        : t('projects.schedules')
                      }
                    </span>
                  </div>
                </div>

                {/* Impact */}
                {project.impact && project.impact.trim().length > 0 && (
                  <div className={`p-4 rounded-lg ${
                    project.category === t('projectsPage.categories.education') ? 'accent-yellow' : 
                    project.category === t('projectsPage.categories.culture') ? 'accent-green' : 
                    'bg-primary-soft'
                  }`}>
                    <p className="text-sm font-medium text-primary">
                      {project.impact}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA to Projects Page */}
        <div className="text-center scroll-fade-in">
          <Link
            to="/projetos"
            className="btn-primary inline-flex items-center space-x-2 text-lg px-8 py-4"
          >
            <span>{t('projects.viewAll')}</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectsPreview;