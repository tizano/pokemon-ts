'use client';
import { Loader } from '@/components/loader/loader';
import { Pokemons } from '@/features/pokemons/pokemons';
import useIntro from '@/hooks/use-intro';
import { Suspense } from 'react';

export default function Page() {
  const showIntro = useIntro();

  return (
    <Suspense>
      {showIntro && <Loader />}
      <Pokemons />
    </Suspense>
  );
}
