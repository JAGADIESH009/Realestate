import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    
    // Support modern browsers
    if (media.addEventListener) {
      media.addEventListener('change', listener);
      return () => media.removeEventListener('change', listener);
    } else {
      // Support older browsers
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      media.addListener(listener as any);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return () => media.removeListener(listener as any);
    }
  }, [matches, query]);

  return matches;
}
