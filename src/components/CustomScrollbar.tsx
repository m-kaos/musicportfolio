import React, { useEffect, useState } from 'react';

interface CustomScrollbarProps {
  containerRef?: React.RefObject<HTMLElement>;
  lineCount?: number;
  activeLinesCount?: number;
}

const CustomScrollbar: React.FC<CustomScrollbarProps> = ({
  containerRef,
  lineCount = 40,
  activeLinesCount = 3
}) => {
  const [lineWidths, setLineWidths] = useState<number[]>(Array(lineCount).fill(3));

  useEffect(() => {

    const handleScroll = () => {
      let scrollTop: number;
      let scrollHeight: number;
      let clientHeight: number;

      if (containerRef?.current) {
        scrollTop = containerRef.current.scrollTop;
        scrollHeight = containerRef.current.scrollHeight;
        clientHeight = containerRef.current.clientHeight;
      } else {
        scrollTop = window.scrollY || document.documentElement.scrollTop;
        scrollHeight = document.documentElement.scrollHeight;
        clientHeight = window.innerHeight;
      }

      const scrollableHeight = scrollHeight - clientHeight;
      const percentage = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0;

      // Calculate which lines should be active based on scroll position
      const currentLineIndex = Math.floor((percentage / 100) * lineCount);

      // Calculate widths for each line
      const newWidths = Array(lineCount).fill(0).map((_, index) => {
        const distance = Math.abs(index - currentLineIndex);

        if (distance === 0) {
          return 18; // Widest line (current position)
        } else if (distance === 1) {
          return 12; // Second widest
        } else if (distance === 2 && activeLinesCount >= 3) {
          return 8; // Third width
        } else if (distance === 3 && activeLinesCount >= 4) {
          return 5; // Fourth width
        } else {
          return 3; // Default small width
        }
      });

      setLineWidths(newWidths);
    };

    // Initial calculation
    handleScroll();

    if (containerRef?.current) {
      const element = containerRef.current;
      element.addEventListener('scroll', handleScroll);
      return () => element.removeEventListener('scroll', handleScroll);
    } else {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [containerRef, lineCount, activeLinesCount]);

  return (
    <div className="hidden md:flex fixed right-6 md:right-6 top-0 h-screen items-center z-50 pointer-events-none">
      <div className="flex flex-col items-end justify-between h-[85vh] gap-[2px]">
        {Array.from({ length: lineCount }).map((_, index) => (
          <div
            key={index}
            className="transition-all duration-300 ease-out bg-white rounded-full"
            style={{
              height: '2px',
              width: `${lineWidths[index]}px`,
              opacity: lineWidths[index] > 3 ? 1 : 0.5,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default CustomScrollbar;
