'use server';
import { revalidatePath } from 'next/cache';

export const clearCachesByServerAction = async (path?: string) => {
  try {
    if (path) {
      revalidatePath(path);
    } else {
      revalidatePath('/');
    }
  } catch (error) {
    console.error('clearCachesByServerAction => ', error);
  }
};
