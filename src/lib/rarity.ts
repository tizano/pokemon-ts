import { RarityEnum } from '@/types/schema.type';

export const rarityFrenchMapping: Record<string, RarityEnum> = {
  commune: 'common',
  'peu commune': 'uncommon',
  rare: 'rare',
} as const;
