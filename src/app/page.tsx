'use client';
import Loader from '@/components/ui/loader/loader';
import { PokemonsList } from '@/features/pokemons/pokemons-list';

export default function Page() {
  return (
    <>
      <Loader />
      <PokemonsList />
    </>
  );
}
