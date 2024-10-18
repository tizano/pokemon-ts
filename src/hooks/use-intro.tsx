import { INTRO_DURATION } from '@/constants';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useIntro = () => {
  const [showIntro, setShowIntro] = useState(false);
  const [introFinished, setIntroFinished] = useState(false);

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
        document.body.style.overflow = 'hidden';
      } else {
        setShowIntro(false);
        setIntroFinished(true);
        document.body.style.overflowY = 'scroll';
      }
    };

    const finishIntro = () => {
      setShowIntro(false);
      setIntroFinished(true);
    };

    const timeoutIdCheckIntroStatus = setTimeout(checkIntroStatus, 0);
    const timeoutIdFinsiIntro = setTimeout(finishIntro, INTRO_DURATION * 2);

    return () => {
      clearTimeout(timeoutIdCheckIntroStatus);
      clearTimeout(timeoutIdFinsiIntro);
    };
  }, [pathname]);

  return { showIntro, introFinished };
};

export default useIntro;
