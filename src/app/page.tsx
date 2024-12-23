import { Container } from '@/components/container/container';
import { Hero } from '@/components/hero/hero';
import { Intro } from '@/components/intro/intro';
import getQueryClient from '@/components/providers/get-query-client';
import { Pokemons } from '@/features/pokemons/pokemons';
import { pokemonsQueryOptions } from '@/hooks/use-pokemon';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

export default function Page() {
  const queryClient = getQueryClient();
  queryClient.prefetchQuery(pokemonsQueryOptions({ page: 1 }));

  return (
    <>
      <Intro>
        <Container htmlTag="section" className="relative z-10">
          <Hero />
          <div className="flex justify-center w-full mt-16 mb-20">
            <h1 className="text-fluid-xl text-white w-2/3 leading-tight text-center">
              Cherches ton Pokémon préféré et regardes toutes les cartes associées
            </h1>
          </div>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <Pokemons />
          </HydrationBoundary>
        </Container>
      </Intro>
    </>
  );
}
