'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { NewCard } from '@/lib/types/schema.type';
import { clearCachesByServerAction } from '@/lib/utils/revalidate';
import { createCardSchema } from '@/schemas/card.schema';
import { createCard } from '@/services/card.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { Save } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface CreateCardFormProps {
  onSubmitSuccess?: () => void;
}

export const CreateCardForm: React.FC<CreateCardFormProps> = ({ onSubmitSuccess }) => {
  const cardForm = useForm<NewCard>({
    defaultValues: {
      pokemonId: '',
      rarityId: '',
      pokedexId: '' as unknown as number, // avoid 0 as default value displayed in the input number
      imageUrl: '',
    },
    resolver: zodResolver(createCardSchema),
    mode: 'onTouched',
  });

  // const { control, setValue } = cardForm;

  // calculer le pokedexId en fonction du slug recupéré

  const { toast } = useToast();

  const onSubmit = async (data: NewCard) => {
    const submit = await createCard(data);

    if (submit.data) {
      cardForm.reset();
      clearCachesByServerAction('/');
      onSubmitSuccess?.();
      toast({
        variant: 'success',
        title: 'Succès',
        description: 'Le carte a été ajouté avec succès !',
      });
    }
    if (submit.error) {
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
            <FormItem>
              <FormLabel>Associer un Pokémon</FormLabel>
              <FormControl>
                <Select value={field.value ?? ''} onValueChange={field.onChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select type" ref={field.ref} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem key={1} value="feu">
                      Feu
                    </SelectItem>
                  </SelectContent>
                </Select>
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
        {/* <FormField
          control={cardForm.control}
          name="rarityId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sélectionner la rareté de la carte</FormLabel>
              <FormControl>
                <SelectType
                  {...field}
                  pokemonTypes={[
                    { id: '1', name: 'Commune', slug: 'commune' },
                    { id: '2', name: 'Peu commune', slug: 'peu-commune' },
                    { id: '3', name: 'Rare', slug: 'rare' },
                    { id: '4', name: 'Très rare', slug: 'tres-rare' },
                    { id: '5', name: 'Secrète', slug: 'secret' },
                  ]}
                  onValueChange={(e) => console.log('change select rarity -- ', e)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
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
        <Button disabled={!cardForm.formState.isValid}>
          <Save className="mr-2" size={16} /> Ajouter
        </Button>
      </form>
    </Form>
  );
};
