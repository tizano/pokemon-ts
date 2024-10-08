'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { NewPokemon } from '@/lib/types/schema.type';
import { clearCachesByServerAction } from '@/lib/utils/revalidate';
import { generateSlug } from '@/lib/utils/utils';
import { createPokemonSchema } from '@/schemas/pokemon.schema';
import { createPokemon } from '@/services/pokemon.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { Save } from 'lucide-react';
import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';

interface CreatePokemonFormProps {
  onSubmitSuccess?: () => void;
}

export const CreatePokemonForm = ({ onSubmitSuccess }: CreatePokemonFormProps) => {
  const pokemonForm = useForm<NewPokemon>({
    defaultValues: {
      name: '',
      slug: '',
      imageUrl: '',
      pokedexId: '' as unknown as number, // avoid 0 as default value displayed in the input number
    },
    resolver: zodResolver(createPokemonSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });

  const { control, setValue } = pokemonForm;
  const name = useWatch({ control, name: 'name' });
  const pokedexId = useWatch({ control, name: 'pokedexId' });

  const { toast } = useToast();

  const onSubmit = async (data: NewPokemon) => {
    const submit = await createPokemon(data);

    if (submit.data) {
      pokemonForm.reset();
      clearCachesByServerAction('/');
      onSubmitSuccess?.();
      toast({
        variant: 'success',
        title: 'Succès',
        description: `Le Pokemon ${data.name} a été ajouté avec succès !`,
      });
    }
    if (submit.error) {
      const pokedexConstraintUnique = submit.error.includes('pokemon_pokedex_id_unique')
        ? `ID : ${data.pokedexId} du pokedex est déjà utilisé`
        : '';
      const slugConstraintUnique = submit.error.includes('pokemon_slug_unique')
        ? `le slug ${data.slug} existe déjà `
        : '';
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: `Une erreur est survenue ${pokedexConstraintUnique || slugConstraintUnique}`,
      });
    }
  };

  useEffect(() => {
    if (name !== '' || pokedexId.toString() !== '') {
      const newSlug = generateSlug(name, pokedexId.toString());
      setValue('slug', newSlug, { shouldValidate: true });
    }
  }, [name, pokedexId, setValue]);

  return (
    <Form {...pokemonForm}>
      <form onSubmit={pokemonForm.handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full">
        <FormField
          control={pokemonForm.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom du Pokémon</FormLabel>
              <FormControl>
                <Input placeholder="Nom du Pokémon" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={pokemonForm.control}
          name="pokedexId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pokedex ID</FormLabel>
              <FormControl>
                <Input placeholder="Pokedex ID" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={pokemonForm.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input placeholder="Slug" readOnly disabled {...field} />
              </FormControl>
              <FormDescription>
                Le slug doit être unique, il est généré automatiquement avec le nom et le Pokedex ID
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={pokemonForm.control}
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
        <Button disabled={!pokemonForm.formState.isValid}>
          <Save className="mr-2" size={16} /> Ajouter
        </Button>
      </form>
    </Form>
  );
};
