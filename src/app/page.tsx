'use client';
import { Pagination } from '@/components/ui/pagination/pagination';
import { ListWithPagination, Pokemon } from '@/db/schema/schema.type';
import { getPokemons } from '@/services/pokemon-service';
import { parseAsInteger, useQueryState } from 'nuqs'; // Assurez-vous que 'nuqs' est correctement installé et configuré
import { Suspense, useEffect, useState } from 'react';

async function fetchPokemons(page: number) {
  const pokemonsData = await getPokemons(page);
  return pokemonsData;
}

function Loading() {
  return <h2>🌀 Loading...</h2>;
}

export default function Page() {
  // Récupère le paramètre 'page' de la query string, par défaut sur 1
  const [page] = useQueryState<number>('page', parseAsInteger.withDefault(1));
  const [pokemonsData, setPokemonsData] = useState<ListWithPagination<Pokemon[]>>({
    data: [],
    page: 0,
    itemsPerPage: 0,
    count: 0,
  });

  useEffect(() => {
    // Fetch the pokemons when the component mounts or when the page changes
    const fetchData = async () => {
      const data = await fetchPokemons(page);
      setPokemonsData(data);
    };
    fetchData();
  }, [page]);

  if (!pokemonsData) return <Loading />;
  if (!pokemonsData.count) return <Suspense fallback={<p>No pokemons data</p>} />;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Suspense fallback={<Loading />}>
        <div>
          {pokemonsData.data.map((pokemon) => (
            <div key={pokemon.id}>
              <h3>{pokemon.name}</h3>
              {/* <Image src={pokemon.imageUrl} alt={pokemon.name} width={100} height={100} /> */}
            </div>
          ))}
          <Pagination itemsPerPage={pokemonsData.itemsPerPage} totalItems={pokemonsData.count} />
        </div>
      </Suspense>
    </main>
  );
}
