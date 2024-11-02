'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { useToast } from '@/hooks/use-toast';
import { NewCard } from '@/lib/types/schema.type';
import { createCardSchema } from '@/schemas/card.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Save } from 'lucide-react';
import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { GenericSelect } from '@/components/generic-select/generic-select';
import { Combobox } from '@/components/ui/combo-box';
import { useCreateCard } from '@/hooks/use-card';
import { useCardRarities } from '@/hooks/use-card-rarity';
import useDebounce from '@/hooks/use-debounce';
import { usePokemons } from '@/hooks/use-pokemon';
import { SelectValueLabel } from '@/lib/types/select.type';
import { getPokemon } from '@/services/pokemon.service';
import { useQuery } from '@tanstack/react-query';

interface CreateCardFormProps {
  onSubmitSuccess?: () => void;
}

export const CreateCardForm: React.FC<CreateCardFormProps> = ({ onSubmitSuccess }) => {
  const { toast } = useToast();

  const cardForm = useForm<NewCard>({
    defaultValues: {
      pokemonId: '',
      rarityId: '',
      pokedexId: '' as unknown as number, // avoid 0 as default value displayed in the input number
      imageUrl: '',
    },
    resolver: zodResolver(createCardSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });

  const [searchValue, setSearchValue] = useState('');
  const [selectedPokemon, setSelectedPokemon] = useState<SelectValueLabel>({
    value: '',
    label: '',
  });

  const debouncedSearchName = useDebounce(searchValue, 300);

  const { data: pokemonList, isLoading: isLoadingSearch } = usePokemons({
    page: 1,
    itemsPerPage: 50,
    pokemonName: debouncedSearchName,
  });

  // get pokemon details from the selected value
  const { data: pokemon } = useQuery({
    queryKey: ['pokemon', selectedPokemon.value],
    queryFn: () => getPokemon(selectedPokemon.value),
  });

  const { data: cardRariries } = useCardRarities();

  const transformPokemonsForSelect = useMemo(() => {
    const transformed = pokemonList
      ? pokemonList.data.map((pokemon) => ({
          value: pokemon.slug,
          label: `${pokemon.name} #${pokemon.pokedexId}`,
        }))
      : [];

    // Ajoute l'élément sélectionné s'il n'est pas dans la liste
    if (selectedPokemon.value && !transformed.some((item) => item.value === selectedPokemon.value)) {
      return [selectedPokemon, ...transformed];
    }

    return transformed;
  }, [pokemonList, selectedPokemon]);

  const handleSelectValueChange = (value: string) => {
    cardForm.setValue('rarityId', value);
  };

  useEffect(() => {
    if (pokemon?.data) {
      cardForm.setValue('pokemonId', pokemon.data.id);
      cardForm.setValue('pokedexId', pokemon.data.pokedexId);
    }
  }, [cardForm, pokemon]);

  const { mutateAsync: createCard, isPending, isError, error } = useCreateCard();

  const onSubmit = async (data: NewCard) => {
    const submit = await createCard(data);

    if (submit.data) {
      cardForm.reset();
      onSubmitSuccess?.();
      toast({
        variant: 'success',
        title: 'Succès',
        description: 'Le carte a été ajouté avec succès !',
      });
    }
    if (isError && error) {
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'Une erreur est survenue lors de la création de la carte',
      });
    }
  };

  return (
    <Form {...cardForm}>
      <form onSubmit={cardForm.handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full">
        <FormField
          control={cardForm.control}
          name="pokemonId"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel>Associer un Pokémon</FormLabel>
              <FormControl>
                <Combobox
                  items={transformPokemonsForSelect}
                  modal={true}
                  placeholder="Recherche ton pokemon"
                  searchNotFound="Aucun pokemon trouvé"
                  searchInput={searchValue}
                  setSearchInput={setSearchValue}
                  selectedValue={selectedPokemon}
                  setSelectedValue={setSelectedPokemon}
                  isLoading={isLoadingSearch}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={cardForm.control}
          name="rarityId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rareté de la carte</FormLabel>
              <FormControl>
                <GenericSelect
                  items={cardRariries?.data || []}
                  onValueChange={handleSelectValueChange}
                  getItemKey={(rariry) => rariry.id}
                  getItemValue={(rariry) => rariry.id}
                  getItemLabel={(rariry) => rariry.name}
                  queryKey="rarity"
                  placeholder="Sélectionner une rareté"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={cardForm.control}
          name="cardNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Numéro de la carte</FormLabel>
              <FormControl>
                <Input placeholder="Numéro de la carte" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={cardForm.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL de l&apos;image</FormLabel>
              <FormControl>
                <Input placeholder="URL de l'image" type="url" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={!cardForm.formState.isValid || isPending}>
          <Save className="mr-2" size={16} /> Ajouter la carte
        </Button>
      </form>
    </Form>
  );
};
