import { RarityEnum } from '@/types/schema.type';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { rarityFrenchMapping } from './rarity';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const setRarity = (rarity: string): RarityEnum => {
  const rarityKey = rarity.toLowerCase();
  return rarityFrenchMapping[rarityKey] satisfies RarityEnum;
};

export const removeDigitFromSlug = (chaine: string): string => chaine.replace(/-\d+$/, '');
