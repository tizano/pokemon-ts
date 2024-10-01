import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useIntro = () => {
  const [showIntro, setShowIntro] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const checkIntroStatus = () => {
      const storage = window.localStorage;
      const currTimestamp = Date.now();
      const storedTimestamp = parseInt(storage.getItem(`timestamp${pathname}`) || '0', 10);
      const timeLimit = 3 * 60 * 60 * 1000; // 3 heures

      const hasTimePassed = currTimestamp - storedTimestamp > timeLimit;

      if (hasTimePassed) {
        storage.setItem(`timestamp${pathname}`, currTimestamp.toString());
        setShowIntro(true);
      } else {
        setShowIntro(false);
      }
    };

    // Utiliser un timeout pour s'assurer que ce code s'exécute après le rendu initial
    const timeoutId = setTimeout(checkIntroStatus, 0);

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return showIntro;
};

export default useIntro;
