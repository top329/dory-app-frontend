import { useState, useEffect } from 'react';

const useWidth = () => {
  const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
  const [width, setWidth] = useState<number>(windowWidth);

  const handleResize = () => setWidth(windowWidth);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      setWidth(windowWidth);

      return () => window.removeEventListener('resize', handleResize);
    }
  }, [windowWidth]);

  return width;
};

export default useWidth;
