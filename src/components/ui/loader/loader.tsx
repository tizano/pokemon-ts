import * as motion from 'framer-motion/client';
import Image from 'next/image';
import { useState } from 'react';

export default function Loader() {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div className="h-screen w-screen fixed top-0 left-0 flex gap-8 overflow-hidden">
      {isLoading && (
        <motion.div
          className="bg-red-400 w-full h-full flex items-center justify-center gap-6"
          initial={{
            opacity: 1,
            y: '-100vh',
          }}
          animate={{
            opacity: 1,
            y: '0',
            transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
          }}
          exit={{
            y: '100vh',
            transition: {
              duration: 0.75,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
        >
          <motion.div
            className="pb-2"
            initial={{ opacity: 0, y: 0 }}
            animate={{
              y: [-150, 0, 75, 0, 47, 0, 24, 0, 12, 0],
              opacity: [0, 1],
              rotate: [0, -20, 20, -10, 10, 0],
              x: [(350 + 75) / 2, 0],
            }}
            transition={{
              delay: 2,
              duration: 2,
              ease: 'easeOut',
              opacity: { duration: 0.5 },
              y: { duration: 1.75 },
              rotate: { delay: 1.25, duration: 0.5 },
              x: { delay: 1.75, duration: 0.5 },
            }}
          >
            <Image src="/loader/pokeball.svg" alt="Pokeball animation" width={75} height={75} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -36, x: -50 }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 2,
              duration: 0.5,
              type: 'spring',
            }}
            onAnimationComplete={() => {
              setTimeout(() => {
                setIsLoading(false);
              }, 1000);
              console.log('animation complete');
            }}
          >
            <Image src="/loader/pokemon-logo-black.svg" alt="Pokemon logo avec animation" width={350} height={150} />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
