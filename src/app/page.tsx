'use client';
import { Container } from '@/components/container/container';
import { Hero } from '@/components/hero/hero';
import { Loader } from '@/components/loader/loader';
import { Pokemons } from '@/features/pokemons/pokemons';
import useIntro from '@/hooks/use-intro';
import { Suspense } from 'react';

export default function Page() {
  const { showIntro, introFinished } = useIntro();
  return (
    <>
      {showIntro && <Loader />}
      {introFinished && (
        <>
          <Container htmlTag="section" className="relative z-10">
            <Hero />
            <div className="flex justify-center w-full mb-16">
              <h1 className="text-fluid-lg text-white w-1/2 leading-tight text-center">
                Cherches ton Pokémon préféré et regardes toutes les cartes associées
              </h1>
            </div>
          </Container>
          <Suspense>
            <Container htmlTag="section" className="relative z-10">
              <Pokemons />
            </Container>
          </Suspense>
        </>
      )}
    </>
  );
}
