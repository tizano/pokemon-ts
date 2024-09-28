'use client';

import { Button } from '@/components/ui/button';
import { CardsList } from '@/features/cards/cards-list';
import { useParams, useRouter } from 'next/navigation';

export default function PokemonDetail() {
  const router = useRouter();
  const { slug } = useParams<{ slug: string }>();
  return (
    <div className="container mx-auto p-4">
      <Button onClick={() => router.back()} className="mb-4">
        Back to Listing
      </Button>
      <CardsList pokemonSlug={slug} />
    </div>
  );
}
