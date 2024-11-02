import { z } from 'zod';

// required_error is not triggered when the field is empty because the field has default value set to '' in the form
// we have to check if the field is empty in the form with the min(1) method
export const createCardSchema = z.object({
  pokemonId: z.string(),
  rarityId: z.string().min(1, { message: 'La rareté de la carte est requise' }),
  pokedexId: z.coerce.number(),
  cardNumber: z
    .string({
      required_error: 'Le numero de la carte est requis',
    })
    .min(1, {
      message: 'Le numero de la carte est requis',
    }),
  imageUrl: z.string().min(1, { message: "L'URL de l'image est requise" }).url({ message: 'URL non valide' }),
});

export const updateCardSchema = createCardSchema;
