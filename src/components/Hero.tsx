import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { SiSpotify, SiX, SiLinkedin, SiInstagram, SiWhatsapp } from 'react-icons/si';
import { useNavigation } from '../contexts/NavigationContext';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations/translations';
import profilePic from '../imgs/logo.webp';

const Hero: React.FC = () => {
  const { isCollapsed } = useNavigation();
  const { language } = useLanguage();
  const [showCopied, setShowCopied] = useState(false);
  const t = translations[language].hero;

  // Declare icon components as variables to avoid TS issues
  const SpotifyIcon = SiSpotify as React.ComponentType<{ className?: string }>;
  const XIcon = SiX as React.ComponentType<{ className?: string }>;
  const LinkedinIcon = SiLinkedin as React.ComponentType<{ className?: string }>;
  const InstagramIcon = SiInstagram as React.ComponentType<{ className?: string }>;
  const WhatsappIcon = SiWhatsapp as React.ComponentType<{ className?: string }>;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('maug.n@m-kaos.com');
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  return (
    <section className="min-h-screen flex items-center px-6 py-20">
      <div
        className={`w-full max-w-6xl transition-all duration-500 ease-in-out text-left mx-auto ${
          isCollapsed ? 'md:text-left' : 'md:text-center'
        }`}
      >
        <div className="mb-8">
          <div
            className={`w-24 h-24 mb-6 rounded-full overflow-hidden transition-all duration-500 ${
              isCollapsed ? '' : 'md:mx-auto'
            }`}
          >
            <img src={profilePic} alt="Mauricio Guerra Navarro" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-5xl md:text-7xl font-light mb-4 transition-all duration-500">
            {t.title}<br />
            <span className="text-4xl md:text-5xl">& {t.subtitle}</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-2">{t.name}</p>
          <p className="text-lg text-muted-foreground">{t.location}</p>
        </div>

        <div className="mb-8">
          <p
            className={`text-lg md:text-xl text-muted-foreground max-w-2xl transition-all duration-500 ${
              isCollapsed ? '' : 'md:mx-auto'
            }`}
          >
            {t.description} {t.specializing}{' '}
            <span className="font-semibold text-foreground">{t.chatbots}</span> {t.customAgents}
          </p>
        </div>

        <div
          className={`flex flex-col sm:flex-row gap-4 items-center mb-8 transition-all duration-500 justify-start ${
            isCollapsed ? 'md:justify-start' : 'md:justify-center'
          }`}
        >
          <a
            href="https://wa.me/528118521080"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors flex items-center gap-2"
          >
            <WhatsappIcon className="w-4 h-4" />
            +(52) 8118-521080
          </a>
          <button
            onClick={handleCopyEmail}
            className="px-6 py-3 border border-border rounded-full hover:bg-accent transition-colors flex items-center gap-2 relative"
          >
            {showCopied ? (
              <>
                <Check className="w-4 h-4" />
                {t.copied}
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                {t.copyEmail}
              </>
            )}
          </button>
        </div>

        <div
          className={`flex gap-6 items-center transition-all duration-500 justify-start ${
            isCollapsed ? 'md:justify-start' : 'md:justify-center'
          }`}
        >
          <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
            <SpotifyIcon className="w-5 h-5" />
          </a>
          <a href="https://x.com/war_navarro" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
            <XIcon className="w-5 h-5" />
          </a>
          <a href="https://www.instagram.com/maug_n" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
            <InstagramIcon className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>  
  );
};

export default Hero;
