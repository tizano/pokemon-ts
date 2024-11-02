import { ChevronDown } from 'lucide-react';
import Image from 'next/image';

export const Hero = () => (
  <>
    <div className="relative flex gap-10 justify-between items-center">
      <h1 className="text-fluid-3xl font-bold text-white leading-none fhd:w-[600px] w-[448px] fhd:translate-x-[180px] translate-x-[330px] z-20 motion-preset-slide-right">
        Gères ta collection de cartes
      </h1>
      <div className="overflow-hidden h-[500px] after:bg-pokemon-bg-900 after:opacity-50 after:z-10 after:absolute after:top-0 after:fhd:-right-[25vw] after:-right-[20vw] after:w-full after:h-[500px] after:rounded-l-full">
        <Image
          src="/hero/hero-3.png"
          alt="Pokemon logo"
          width={1024}
          height={600}
          className="rounded-l-full h-[500px] object-cover object-left-top absolute top-0 fhd:-right-[25vw] -right-[20vw] w-[75vw] overflow-hidden motion-preset-slide-left"
        />
      </div>
    </div>
    <div className="flex justify-center mt-16">
      <ChevronDown className="text-white animate-bounce transition-all" size={40} />
    </div>
  </>
);
