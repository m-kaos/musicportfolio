import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations/translations';
import picture from '../imgs/image.png';
import { SiGithub, SiX, SiLinkedin, SiInstagram, SiWhatsapp } from 'react-icons/si';

// Declare icon components as variables to avoid TS issues
const GithubIcon = SiGithub as React.ComponentType<{ className?: string }>;
const XIcon = SiX as React.ComponentType<{ className?: string }>;
const LinkedinIcon = SiLinkedin as React.ComponentType<{ className?: string }>;
const InstagramIcon = SiInstagram as React.ComponentType<{ className?: string }>;
const WhatsappIcon = SiWhatsapp as React.ComponentType<{ className?: string }>;

const About: React.FC = () => {
  const { language } = useLanguage();
  const [showCopied, setShowCopied] = useState(false);
  const t = translations[language].about;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('maug.n@m-kaos.com');
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  return (
    <section className="min-h-screen px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-16">
          <h2 className="text-6xl md:text-8xl font-light">02</h2>
          <h3 className="text-3xl md:text-4xl font-light">{t.title}</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <div className="w-full h-96 bg-gray-200 rounded-2xl mb-8 flex items-center justify-center">
              <img src={picture} alt="Mauricio Guerra Navarro" className="w-full rounded-2xl h-full object-cover" />
            </div>
            <p className="text-lg leading-relaxed">
              {t.intro}
            </p>

            <p className="text-lg leading-relaxed text-muted-foreground">
              {t.bio}
            </p>
          </div>

          <div className="space-y-6">


            {/* Contact Section */}
            <div className="pt-6 space-y-6">
              <h4 className="text-xl font-light mb-4">Contact</h4>

              {/* WhatsApp and Email Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://wa.me/528118521080"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors flex items-center gap-2 justify-center"
                >
                  <WhatsappIcon className="w-4 h-4" />
                  +(52) 8118-521080
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="px-6 py-3 border border-border rounded-full hover:bg-accent transition-colors flex items-center gap-2 justify-center"
                >
                  {showCopied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy Email
                    </>
                  )}
                </button>
              </div>

              {/* Social Links */}
              <div className="flex gap-6">
                <a href="https://github.com/devmkaos" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
                  <GithubIcon className="w-5 h-5" />
                </a>
                <a href="https://x.com/war_navarro" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
                  <XIcon className="w-5 h-5" />
                </a>
                <a href="https://www.linkedin.com/in/mauricio-guerra-955628273/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
                  <LinkedinIcon className="w-5 h-5" />
                </a>
                <a href="https://www.instagram.com/maug_n" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
                  <InstagramIcon className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div className="pt-6">
              <h4 className="text-xl font-light mb-4">{t.skillsTitle}</h4>
              <div className="flex flex-wrap gap-2">
                {[
                  'Electric Guitar',
                  'Classical Guitar',
                  'Bass Guitar',
                  'Keyboards',
                  'Synthesizers',
                  'Drum Programming',
                  'Pro Tools',
                  'Ableton Live',
                  'Logic Pro',
                  'FL Studio',
                  'Mixing',
                  'Mastering',
                  'Sound Design',
                  'Music Theory',
                  'Composition',
                  'Arrangement',
                  'Production',
                  'Live Sound'
                ].map(
                  (skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm hover:bg-accent/10 hover:text-accent transition-colors cursor-pointer"
                    >
                      {skill}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="pt-6">
              <h4 className="text-xl font-light mb-4">{t.servicesTitle}</h4>
              <div className="space-y-4">
                <div className="border-l-2 border-accent pl-4 hover:border-accent/50 transition-colors">
                  <p className="font-medium">{t.services.automation.title}</p>
                  <p className="text-sm text-muted-foreground">{t.services.automation.description}</p>
                </div>
                <div className="border-l-2 border-accent pl-4 hover:border-accent/50 transition-colors">
                  <p className="font-medium">{t.services.webDev.title}</p>
                  <p className="text-sm text-muted-foreground">{t.services.webDev.description}</p>
                </div>
                <div className="border-l-2 border-accent pl-4 hover:border-accent/50 transition-colors">
                  <p className="font-medium">{t.services.appDev.title}</p>
                  <p className="text-sm text-muted-foreground">{t.services.appDev.description}</p>
                </div>
                <div className="border-l-2 border-border pl-4 hover:border-accent/20 transition-colors">
                  <p className="font-medium">{t.services.seo.title}</p>
                  <p className="text-sm text-muted-foreground">{t.services.seo.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
