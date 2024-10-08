import { z } from 'zod';

// required_error is not triggered when the field is empty because the field has default value set to '' in the form
// we have to check if the field is empty in the form with the min(1) method
export const createPokemonSchema = z.object({
  slug: z.string(),
  name: z.string().min(1, {
    message: 'Le nom est requis',
  }),
  pokedexId: z.coerce
    .number()
    .min(1, { message: 'Le numéro du Pokédex est requis' })
    .positive({ message: 'Le numéro du Pokédex doit être supérieur à 0' }),
  imageUrl: z.string().min(1, { message: "L'URL de l'image est requise" }).url({ message: 'URL non valide' }),
});

export const updatePokemonSchema = createPokemonSchema;
