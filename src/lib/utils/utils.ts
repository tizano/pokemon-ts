import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const removeDigitFromSlug = (chaine: string): string => chaine.replace(/-\d+$/, '');

export const generateSlug = (name?: string, pokedexId?: string) => {
  if (!name || !pokedexId) {
    return '';
  }
  const newName = normalizeSlug(name);
  const newSlug = `${newName}-${pokedexId}`;
  return newSlug;
};

export const normalizeSlug = (str: string) =>
  str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '');
