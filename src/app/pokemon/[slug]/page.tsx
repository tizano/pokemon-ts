'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useParams, useRouter } from 'next/navigation';

// Mock Pokémon data (same as in the listing page)
const pokemonData = [
  {
    id: 1,
    name: 'Bulbasaur',
    slug: 'bulbasaur',
    type: 'Grass',
    height: '0.7 m',
    weight: '6.9 kg',
    abilities: ['Overgrow', 'Chlorophyll'],
  },
  { id: 2, name: 'Charmander', type: 'Fire', height: '0.6 m', weight: '8.5 kg', abilities: ['Blaze', 'Solar Power'] },
  { id: 3, name: 'Squirtle', type: 'Water', height: '0.5 m', weight: '9.0 kg', abilities: ['Torrent', 'Rain Dish'] },
  {
    id: 4,
    name: 'Pikachu',
    slug: 'pikachu',
    type: 'Electric',
    height: '0.4 m',
    weight: '6.0 kg',
    abilities: ['Static', 'Lightning Rod'],
  },
  {
    id: 5,
    name: 'Jigglypuff',
    slug: 'jigglypuff',
    type: 'Fairy',
    height: '0.5 m',
    weight: '5.5 kg',
    abilities: ['Cute Charm', 'Competitive'],
  },
  { id: 6, name: 'Meowth', type: 'Normal', height: '0.4 m', weight: '4.2 kg', abilities: ['Pickup', 'Technician'] },
  { id: 7, name: 'Psyduck', type: 'Water', height: '0.8 m', weight: '19.6 kg', abilities: ['Damp', 'Cloud Nine'] },
  { id: 8, name: 'Geodude', type: 'Rock', height: '0.4 m', weight: '20.0 kg', abilities: ['Rock Head', 'Sturdy'] },
  { id: 9, name: 'Gastly', type: 'Ghost', height: '1.3 m', weight: '0.1 kg', abilities: ['Levitate'] },
  { id: 10, name: 'Onix', type: 'Rock', height: '8.8 m', weight: '210.0 kg', abilities: ['Rock Head', 'Sturdy'] },
  {
    id: 11,
    name: 'Voltorb',
    type: 'Electric',
    height: '0.5 m',
    weight: '10.4 kg',
    abilities: ['Soundproof', 'Static'],
  },
  {
    id: 12,
    name: 'Exeggcute',
    type: 'Grass',
    height: '0.4 m',
    weight: '2.5 kg',
    abilities: ['Chlorophyll', 'Harvest'],
  },
];

export default function PokemonDetail() {
  const router = useRouter();
  const { slug } = useParams();
  const pokemon = pokemonData.find((p) => p.slug === slug);

  if (!pokemon) {
    return <div>Pokémon not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Button onClick={() => router.back()} className="mb-4">
        Back to Listing
      </Button>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{pokemon.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              {/* <img
                src={`/placeholder.svg?height=300&width=300&text=${pokemon.name}`}
                alt={`${pokemon.name} image`}
                className="rounded-md"
              /> */}
            </div>
            <div>
              <p>
                <strong>Type:</strong> {pokemon.type}
              </p>
              <p>
                <strong>Height:</strong> {pokemon.height}
              </p>
              <p>
                <strong>Weight:</strong> {pokemon.weight}
              </p>
              <p>
                <strong>Abilities:</strong> {pokemon.abilities.join(', ')}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
