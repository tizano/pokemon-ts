import Image from 'next/image';

export const LoaderPokeball = () => (
  <Image src="/loader/pokeball.svg" alt="Pokeball animation" width={75} height={75} priority={true} />
);
