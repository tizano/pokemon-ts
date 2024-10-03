'use client';
import Loader from '@/components/loader/loader';
import { Pokemons } from '@/features/pokemons/pokemons';
import useIntro from '@/hooks/use-intro';

export default function Page() {
  const showIntro = useIntro();

  return (
    <>
      {showIntro && <Loader />}
      <Pokemons />
    </>
  );
}
