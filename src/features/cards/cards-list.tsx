'use client';

import { capitalize, removeDigitFromSlug } from '@/lib/utils';
import { getCardsByPokemon } from '@/services/card.service';
import { CardWithPokemon } from '@/types/card.type';
import { CustomQuery } from '@/types/query.type';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export const CardsList = ({ pokemonSlug }: { pokemonSlug: string }) => {
  const [cardsData, setCardsData] = useState<CustomQuery<CardWithPokemon[]>>({
    data: [],
  });

  const clearedSlug = removeDigitFromSlug(pokemonSlug);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCardsByPokemon({ pokemonSlug: clearedSlug });
      setCardsData(data);
    };
    fetchData();
  }, [clearedSlug]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Liste des cartes pokemon de <strong>{capitalize(clearedSlug)}</strong>
      </h1>
      {!cardsData.data.length && <div>No Pokémon found</div>}
      {cardsData.data && (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {cardsData.data.map((cardData) => (
            <li key={cardData.card.id}>
              <h2 className="text-lg font-bold">Card NB {cardData.card.cardNumber}</h2>
              <pre className="text-lg font-bold">Pokedex ID {cardData.card.pokedexId}</pre>
              <Image
                src={cardData.card.imageUrl}
                alt={`${cardData.pokemon?.name} image`}
                width={200}
                height={200}
                className="mt-2 rounded-md"
                priority={false}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
