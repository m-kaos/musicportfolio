import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import workItemsData from '../data/workItems.json';

interface WorkItemData {
  id: number;
  url: string;
  description: string;
  order: number;
  title?: string;
  date?: string;
}

interface WorkItem {
  id: number;
  date: string;
  title: string;
  description: string;
  url: string;
  image: string;
}

const MyWork: React.FC = () => {
  const { theme } = useTheme();
  const [workItems, setWorkItems] = useState<WorkItem[]>([]);

  useEffect(() => {
    // Use data directly from JSON
    const items = workItemsData
      .sort((a, b) => a.order - b.order)
      .map((item: WorkItemData) => ({
        id: item.id,
        title: item.title || 'Untitled Project',
        date: item.date || new Date().getFullYear().toString(),
        description: item.description,
        url: item.url,
        image: item.url, // We'll use the URL directly for iframe
      }));
    setWorkItems(items);
  }, []);

  return (
    <section className="min-h-screen px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-16">
          <h2 className="text-6xl md:text-8xl font-light">01</h2>
          <h3 className="text-3xl md:text-4xl font-light">Featured work</h3>
        </div>

        <div className="space-y-12">
          {workItems.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group block rounded-2xl p-8 hover:shadow-lg transition-all cursor-pointer ${
                theme === 'glass'
                  ? 'glass-card hover:bg-white/20'
                  : 'border border-border hover:border-accent'
              }`}
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <p className="text-sm text-accent font-medium mb-2">{item.date}</p>
                  <h4 className="text-2xl font-light mb-3">{item.title}</h4>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
                <div className="w-full md:w-80 h-48 rounded-lg overflow-hidden flex-shrink-0 pointer-events-none">
                  <iframe
                    src={item.url}
                    title={`${item.title} preview`}
                    className="w-full h-full border-0 scale-[0.25] origin-top-left grayscale group-hover:grayscale-0 transition-all duration-500"
                    style={{ width: '400%', height: '400%' }}
                  />
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            className={`px-8 py-3 rounded-full transition-colors ${
              theme === 'glass'
                ? 'glass-button hover:bg-white/25 text-foreground'
                : 'border border-border hover:bg-accent/10 hover:border-accent hover:text-accent'
            }`}
          >
            View all projects
          </button>
        </div>
      </div>
    </section>
  );
};

export default MyWork;
