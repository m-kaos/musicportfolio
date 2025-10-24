import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import MyProjects from './components/MyProjects';
import ProjectDetail from './components/ProjectDetail';
import About from './components/About';
import More from './components/More';
import ThemeSelector from './components/ThemeSelector';
import CustomScrollbar from './components/CustomScrollbar';
import { NavigationProvider, useNavigation } from './contexts/NavigationContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import ShaderBackground from './components/shader-background';

function HomePage() {
  const { isCollapsed } = useNavigation();
  const { theme } = useTheme();

  return (
    <>
      {/* Custom Scrollbar */}
      <CustomScrollbar lineCount={50} activeLinesCount={3} />

      {/* Main Content Area - Padding container */}
      <main
        className={`relative z-10 min-h-screen py-0 md:py-6 transition-all duration-300 ease-in-out ${
          isCollapsed ? 'ml-0 md:ml-6 mr-0 md:mr-24' : 'ml-0 md:ml-56 mr-0 md:mr-24'
        }`}
      >
        {/* Content Card - Changes based on theme */}
        <div
          className={`min-h-screen rounded-none md:rounded-2xl overflow-hidden shadow-sm transition-all duration-300 ${
            theme === 'glass'
              ? 'glass-panel'
              : 'bg-background'
          }`}
        >
          <section id="home">
            <Hero />
          </section>

          <section id="work">
            <MyProjects />
          </section>

          <section id="about">
            <About />
          </section>

          <section id="more">
            <More />
          </section>

          {/* Footer */}
          <footer id="footer" className="px-6 py-12 border-t border-border">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                  <p className="text-muted-foreground">
                    © 2025 Music Portfolio. All rights reserved.
                  </p>
                </div>
                <div className="flex gap-6">
                  <a href="https://open.spotify.com/artist/placeholder" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
                    Spotify
                  </a>
                  <a href="https://x.com/war_navarro" className="text-muted-foreground hover:text-accent transition-colors">
                    Twitter
                  </a>
                  <a href="https://www.instagram.com/maug_n" className="text-muted-foreground hover:text-accent transition-colors">
                    Instagram
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </>
  );
}

function ProjectDetailPage() {
  const { isCollapsed } = useNavigation();
  const { theme } = useTheme();

  return (
    <main
      className={`relative z-10 min-h-screen py-0 md:py-6 transition-all duration-300 ease-in-out ${
        isCollapsed ? 'ml-0 md:ml-6 mr-0 md:mr-24' : 'ml-0 md:ml-56 mr-0 md:mr-24'
      }`}
    >
      <div
        className={`min-h-screen rounded-none md:rounded-2xl overflow-hidden shadow-sm transition-all duration-300 ${
          theme === 'glass'
            ? 'glass-panel'
            : 'bg-background'
        }`}
      >
        <ProjectDetail />
      </div>
    </main>
  );
}

function MainLayout() {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen bg-secondary relative">
      {/* Shader Background - Only in glass mode */}
      {theme === 'glass' && (
        <div className="fixed inset-0 z-0">
          <ShaderBackground />
        </div>
      )}

      {/* Side Panels Navigation */}
      <Navigation />

      {/* Theme Selector */}
      <ThemeSelector />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/project/:id" element={<ProjectDetailPage />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <LanguageProvider>
        <ThemeProvider>
          <NavigationProvider>
            <MainLayout />
          </NavigationProvider>
        </ThemeProvider>
      </LanguageProvider>
    </Router>
  );
}

export default App;
