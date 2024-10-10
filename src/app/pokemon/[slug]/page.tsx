import { ButtonBack } from '@/components/button-back/button-back';
import { Container } from '@/components/container/container';
import getQueryClient from '@/components/providers/get-query-client';
import { Cards } from '@/features/cards/cards';
import { cardsQueryOptions } from '@/hooks/use-card';
import { capitalize, removeDigitFromSlug } from '@/lib/utils/utils';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';

interface PokemonDetailPageProps {
  params: { slug: string };
}

export default function PokemonDetailPage({ params }: PokemonDetailPageProps) {
  const { slug } = params;
  const clearedSlug = removeDigitFromSlug(slug);

  const queryClient = getQueryClient();
  queryClient.prefetchQuery(cardsQueryOptions({ pokemonSlug: slug }));

  return (
    <Container className="relative z-10">
      <div className="flex items-center gap-40 mb-16">
        <ButtonBack className="mb-4 text-xs">
          <ArrowLeft className="mr-2" size={16} />
          Retour aux Pokémons
        </ButtonBack>
        <h1 className="text-fluid-lg font-bold mb-4 text-white text-center">
          Liste des cartes Pokemon de <strong>{capitalize(clearedSlug)}</strong>
        </h1>
      </div>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <Cards pokemonSlug={slug} />
      </HydrationBoundary>
    </Container>
  );
}
