'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SearchBar from '@/components/ui/filter/search-bar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useDebounce from '@/hooks/use-debounce';
import { Suspense, useState } from 'react';

// Mock Pokémon data
const pokemonData = [
  { id: 1, name: 'Bulbasaur', type: 'Grass' },
  { id: 2, name: 'Charmander', type: 'Fire' },
  { id: 3, name: 'Squirtle', type: 'Water' },
  { id: 4, name: 'Pikachu', type: 'Electric' },
  { id: 5, name: 'Jigglypuff', type: 'Fairy' },
  { id: 6, name: 'Meowth', type: 'Normal' },
  { id: 7, name: 'Psyduck', type: 'Water' },
  { id: 8, name: 'Geodude', type: 'Rock' },
  { id: 9, name: 'Gastly', type: 'Ghost' },
  { id: 10, name: 'Onix', type: 'Rock' },
  { id: 11, name: 'Voltorb', type: 'Electric' },
  { id: 12, name: 'Exeggcute', type: 'Grass' },
  // Add more Pokémon as needed
];

const types = ['All', ...new Set(pokemonData.map((pokemon) => pokemon.type))];

function SearchBarFallback() {
  return <>placeholder</>;
}

export default function Page() {
  const [searchName, setSearchName] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [currentPage] = useState(1);
  const itemsPerPage = 3;

  const debouncedName = useDebounce(searchName, 500);

  const filteredPokemon = pokemonData.filter(
    (pokemon) =>
      pokemon.name.toLowerCase().includes(debouncedName.toLowerCase()) &&
      (selectedType === 'All' || pokemon.type === selectedType),
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const visiblePokemon = filteredPokemon.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Pokémon Listing</h1>

      <div className="flex gap-4 mb-4">
        <Suspense fallback={<SearchBarFallback />}>
          <SearchBar value={debouncedName} onChange={setSearchName} />
        </Suspense>
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            {types.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Suspense fallback={<SearchBarFallback />}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {visiblePokemon.map((pokemon) => (
            <Card key={pokemon.id} className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{pokemon.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Type: {pokemon.type}</p>
                {/* <img
                src={`/placeholder.svg?height=200&width=200&text=${pokemon.name}`}
                alt={`${pokemon.name} image`}
                className="mt-2 rounded-md"
              /> */}
              </CardContent>
            </Card>
          ))}
        </div>
        <h2>{visiblePokemon.length}</h2>
      </Suspense>
    </div>
  );
}
