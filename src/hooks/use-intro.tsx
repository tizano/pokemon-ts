'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useIntro = () => {
  const pathname = usePathname();
  const [hasTimePassed, setHasTimePassed] = useState(false);

  useEffect(() => {
    const timeLimit = 3 * 60 * 60 * 1000; // 3 hours
    const currTimestamp = Date.now();
    const storedTimestamp = localStorage.getItem(`timestamp${pathname}`) || '1000';
    console.log('storedTimestamp -- ', storedTimestamp);
    const timestamp = parseInt(storedTimestamp, 10);

    const timePassed = currTimestamp - timestamp > timeLimit;
    setHasTimePassed(timePassed);

    if (timePassed) {
      localStorage.setItem(`timestamp${pathname}`, currTimestamp.toString());
    }
  }, [pathname]);

  return hasTimePassed;
};
