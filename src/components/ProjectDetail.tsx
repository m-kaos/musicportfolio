import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { SiSpotify } from 'react-icons/si';
import { useTheme } from '../contexts/ThemeContext';
import projectsData from '../data/projects.json';

interface Project {
  id: number;
  title: string;
  year: string;
  image: string;
  genres: string[];
  shortDescription: string;
  fullDescription: string;
  role: string;
  spotifyAlbum: string;
  spotifyArtist: string;
  merchLink: string;
  highlights: string[];
}

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const project = projectsData.find((p) => p.id === Number(id)) as Project | undefined;

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <h2 className="text-3xl font-light mb-4">Project not found</h2>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-accent text-accent-foreground rounded-full hover:bg-accent/90 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const SpotifyIcon = SiSpotify as React.ComponentType<{ className?: string }>;

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Projects
        </button>

        {/* Project Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-5xl md:text-6xl font-light">{project.title}</h1>
            <span className="text-2xl text-muted-foreground">{project.year}</span>
          </div>
          <p className="text-xl text-accent mb-2">{project.role}</p>
        </div>

        {/* Project Image */}
        <div className="w-full h-96 rounded-2xl overflow-hidden mb-12">
          <img
            src={require(`../imgs/${project.image}`)}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Genres */}
        <div className="mb-8">
          <h3 className="text-sm uppercase tracking-wider text-muted-foreground mb-4">Genres</h3>
          <div className="flex flex-wrap gap-2">
            {project.genres.map((genre, index) => (
              <span
                key={index}
                className="px-4 py-2 rounded-full bg-accent/10 text-accent border border-accent/20"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>

        {/* Full Description */}
        <div className="mb-12">
          <h3 className="text-2xl font-light mb-4">About</h3>
          <p className="text-lg text-muted-foreground leading-relaxed">{project.fullDescription}</p>
        </div>

        {/* Highlights */}
        <div className="mb-12">
          <h3 className="text-2xl font-light mb-4">Highlights</h3>
          <ul className="space-y-3">
            {project.highlights.map((highlight, index) => (
              <li key={index} className="flex items-start gap-3 text-muted-foreground">
                <span className="text-accent mt-1">•</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Links Section */}
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-4 p-8 rounded-2xl ${
            theme === 'glass' ? 'glass-card' : 'border border-border'
          }`}
        >
          {/* Spotify Album */}
          <a
            href={project.spotifyAlbum}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-3 p-6 rounded-xl hover:bg-accent/10 transition-all group"
          >
            <SpotifyIcon className="w-8 h-8 text-accent" />
            <span className="text-center group-hover:text-accent transition-colors">Album on Spotify</span>
            <ExternalLink className="w-4 h-4 text-muted-foreground" />
          </a>

          {/* Spotify Artist */}
          <a
            href={project.spotifyArtist}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-3 p-6 rounded-xl hover:bg-accent/10 transition-all group"
          >
            <SpotifyIcon className="w-8 h-8 text-accent" />
            <span className="text-center group-hover:text-accent transition-colors">Artist Profile</span>
            <ExternalLink className="w-4 h-4 text-muted-foreground" />
          </a>

          {/* Merch Store */}
          <a
            href={project.merchLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-3 p-6 rounded-xl hover:bg-accent/10 transition-all group"
          >
            <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <span className="text-center group-hover:text-accent transition-colors">Merch Store</span>
            <ExternalLink className="w-4 h-4 text-muted-foreground" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
