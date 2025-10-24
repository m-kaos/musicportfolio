import React, { useState, useRef, useEffect } from 'react';
import { Search, PanelLeftClose, PanelLeft, Home, Briefcase, Mail, Send, MoreHorizontal } from 'lucide-react';
import { useNavigation } from '../contexts/NavigationContext';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations/translations';
import LanguageSelector from './LanguageSelector';
import QuickDM from './QuickDM';

const Navigation: React.FC = () => {
  const { isCollapsed, toggleCollapse } = useNavigation();
  const { language } = useLanguage();
  const [isDMOpen, setIsDMOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const t = translations[language].nav;

  const menuItems = [
    { name: t.home, href: 'home', icon: Home },
    { name: t.work, href: 'work', icon: Briefcase },
    { name: t.about, href: 'about', icon: Mail },
    { name: t.more, href: 'more', icon: MoreHorizontal },
  ];

  // Handle click outside to close search bar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchActive(false);
        setIsSearchExpanded(false);
      }
    };

    if (isSearchActive) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchActive]);

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();

    if (sectionId === 'home') {
      // For home, scroll to absolute top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const targetElement = document.getElementById(sectionId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
  };

  return (
    <>
      {/* Left Navigation Panel - Smooth slide animation */}
      <nav
        className={`fixed left-0 top-0 h-screen w-58 transition-all duration-500 ease-in-out z-40 ${
          isCollapsed ? '-translate-x-full opacity-0' : 'translate-x-0 opacity-100'
        }`}
      >
        <div className="h-full w-52 flex flex-col justify-between ml-2 p-6 md:bg-transparent bg-secondary border-r md:border-0 border-border">
          {/* Top Section */}
          <div>
            {/* Search and Toggle buttons - Search expands to the left */}
            <div className="relative flex items-center justify-between mt-6 mb-12">
              {/* Collapse Button - Hidden when search is expanded/active */}
              <button
                onClick={toggleCollapse}
                className={`p-2 hover:bg-accent/10 hover:text-accent rounded-lg transition-all duration-300 ${
                  isSearchExpanded || isSearchActive
                    ? 'opacity-0 pointer-events-none'
                    : 'opacity-100'
                }`}
                aria-label="Toggle navigation"
              >
                <PanelLeftClose className="w-5 h-5" />
              </button>

              {/* Expandable Search Bar - Expands to the left */}
              <div
                ref={searchRef}
                className="absolute right-0"
                onMouseEnter={() => setIsSearchExpanded(true)}
                onMouseLeave={() => !isSearchActive && setIsSearchExpanded(false)}
              >
                <div className={`flex items-center gap-2 rounded-lg border overflow-hidden transition-all duration-300 ${
                  isSearchExpanded || isSearchActive
                    ? 'w-40 bg-background/50 border-border/50'
                    : 'w-10 bg-transparent border-transparent'
                }`}>
                  <button className="p-2 hover:text-accent transition-colors flex-shrink-0">
                    <Search className="w-5 h-5" />
                  </button>
                  <input
                    type="text"
                    placeholder="Search..."
                    onFocus={() => setIsSearchActive(true)}
                    onBlur={() => setIsSearchActive(false)}
                    className={`bg-transparent outline-none text-sm transition-all duration-300 placeholder:text-muted-foreground ${
                      isSearchExpanded || isSearchActive ? 'w-full pr-2 opacity-100' : 'w-0 opacity-0'
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <ul className="space-y-6">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.name}>
                    <a
                      href={`#${item.href}`}
                      onClick={(e) => handleNavigation(e, item.href)}
                      className="flex items-center gap-3 text-muted-foreground hover:text-white transition-colors group"
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Bottom Section */}
          <div className="space-y-4">
            {/* Language Selector */}
            <div className="pb-4 border-b border-border">
              <LanguageSelector />
            </div>

            <button
              onClick={() => setIsDMOpen(true)}
              className="flex items-center gap-3 text-muted-foreground hover:text-white transition-colors"
            >
              <Send className="w-5 h-5" />
              <span className="font-medium">{t.quickDM}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Collapsed Nav Button - Shows when nav is collapsed */}
      <button
        onClick={toggleCollapse}
        className={`fixed left-4 top-4 md:left-10 md:top-12 z-50 p-3 border border-border rounded-xl hover:bg-accent/10 hover:text-accent hover:border-accent transition-all duration-300 ${
          isCollapsed ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20 pointer-events-none'
        }`}
        aria-label="Open navigation"
      >
        <PanelLeft className="w-5 h-5" />
      </button>

      {/* Right Panel - No border - Hidden on mobile */}
      <aside className="hidden md:block fixed right-0 top-0 h-screen w-24 z-40" />

      {/* Quick DM Modal */}
      <QuickDM isOpen={isDMOpen} onClose={() => setIsDMOpen(false)} />
    </>
  );
};

export default Navigation;
