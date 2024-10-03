import { ButtonBack } from '@/components/button-back/button-back';
import { Cards } from '@/features/cards/cards';
import { cardsQueryOptions } from '@/features/cards/cards-query-options';
import getQueryClient from '@/lib/providers/get-query-client';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

interface PokemonDetailPageProps {
  params: { slug: string };
}

export default function PokemonDetailPage({ params }: PokemonDetailPageProps) {
  const { slug } = params;
  const queryClient = getQueryClient();
  queryClient.prefetchQuery(cardsQueryOptions(slug));

  return (
    <div className="container mx-auto p-4">
      <ButtonBack className="mb-4">Back to Listing</ButtonBack>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Cards pokemonSlug={slug} />
      </HydrationBoundary>
    </div>
  );
}
