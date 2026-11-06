import { useEffect } from 'react';
import { useUserStore } from '../store/userStore';

// Applies the chosen background to the whole page through <html data-background="...">.
export function useBackground() {
  const background = useUserStore((state) => state.background);
  const setBackground = useUserStore((state) => state.setBackground);

  useEffect(() => {
    document.documentElement.dataset.background = background;
  }, [background]);

  return { background, setBackground };
}
