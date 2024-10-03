import { ButtonBack } from '@/components/button-back/button-back';
import { Cards } from '@/features/cards/cards';
import { cardsQueryOptions } from '@/features/cards/cards-query-options';
import getQueryClient from '@/lib/get-query-client';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

export default function PokemonDetailPage({ params }: { params: { slug: string } }) {
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
