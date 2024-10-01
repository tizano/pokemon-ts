'use client';
import Loader from '@/components/ui/loader/loader';
import { PokemonsList } from '@/features/pokemons/pokemons-list';
import useIntro from '@/hooks/use-intro';
import { Suspense, useEffect, useState } from 'react';

export default function Page() {
  const showIntro = useIntro();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!showIntro) {
      // Simule un court délai pour éviter un changement trop rapide
      const timer = setTimeout(() => setIsLoading(false), 100);
      return () => clearTimeout(timer);
    }
  }, [showIntro]);

  useEffect(() => {
    console.log(isLoading ? 'showIntro' : 'hideIntro');
  }, [isLoading]);

  return (
    <>
      {isLoading && <Loader />}
      <Suspense>
        <PokemonsList />
      </Suspense>
    </>
  );
}
