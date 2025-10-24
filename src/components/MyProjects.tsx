import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations/translations';
import projectsData from '../data/projects.json';

interface Project {
  id: number;
  title: string;
  year: string;
  image: string;
  genres: string[];
  shortDescription: string;
}

const MyProjects: React.FC = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const t = translations[language].work;

  const projects: Project[] = projectsData;

  const handleProjectClick = (projectId: number) => {
    navigate(`/project/${projectId}`);
  };

  return (
    <section id="work" className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-16">
          <h2 className="text-6xl md:text-8xl font-light">01</h2>
          <h3 className="text-3xl md:text-4xl font-light">{t.title}</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => handleProjectClick(project.id)}
              className={`group block rounded-2xl p-8 hover:shadow-lg transition-all cursor-pointer ${
                theme === 'glass'
                  ? 'glass-card hover:bg-white/20'
                  : 'border border-border hover:border-accent'
              }`}
            >
              {/* Project Image */}
              <div className="w-full h-64 rounded-xl overflow-hidden mb-6">
                <img
                  src={require(`../imgs/${project.image}`)}
                  alt={project.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
                />
              </div>

              {/* Project Info */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-medium">{project.title}</h3>
                  <span className="text-muted-foreground">{project.year}</span>
                </div>

                {/* Genres */}
                <div className="flex flex-wrap gap-2">
                  {project.genres.slice(0, 3).map((genre, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-xs rounded-full bg-accent/10 text-accent border border-accent/20"
                    >
                      {genre}
                    </span>
                  ))}
                  {project.genres.length > 3 && (
                    <span className="px-3 py-1 text-xs rounded-full bg-accent/10 text-accent border border-accent/20">
                      +{project.genres.length - 3} more
                    </span>
                  )}
                </div>

                {/* Short Description */}
                <p className="text-muted-foreground line-clamp-2">
                  {project.shortDescription}
                </p>

                {/* View Project Link */}
                <div className="pt-4">
                  <span className="text-accent group-hover:text-white transition-colors inline-flex items-center gap-2">
                    {t.viewProject}
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MyProjects;
