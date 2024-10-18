'use client';
import { Loader } from '@/components/loader/loader';
import { useIntro } from '@/hooks/use-intro';
import React, { PropsWithChildren } from 'react';

export const Intro: React.FC<PropsWithChildren> = ({ children }) => {
  const { showIntro, introFinished } = useIntro();
  return (
    <>
      {showIntro && <Loader />}
      {introFinished && <>{children}</>}
    </>
  );
};
