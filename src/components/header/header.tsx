'use client';
import { Container } from '@/components/container/container';
import { Button } from '@/components/ui/button';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import * as motion from 'framer-motion/client';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import { useRef, useState } from 'react';

export const Header = () => {
  const [isHidden, setIsHidden] = useState(false);
  const [isScrollTop, setIsScrollTop] = useState(false);
  const { scrollY } = useScroll();
  const lastScrollYRef = useRef(0);
  const blurClassName = 'backdrop-blur-lg ';

  useMotionValueEvent(scrollY, 'change', (y) => {
    const difference = y - lastScrollYRef.current;
    if (Math.abs(difference) > 10) {
      setIsHidden(difference > 0);
      setIsScrollTop(y > 10);
      lastScrollYRef.current = y;
    }
  });

  return (
    <motion.header
      animate={isHidden ? 'hidden' : 'visible'}
      onFocusCapture={() => setIsHidden(false)}
      variants={{ hidden: { y: '-100%' }, visible: { y: '0%' } }}
      transition={{ duration: 0.25 }}
      className={`fixed top-0 left-0 right-0 w-full z-20 backdrop-filter transition-colors ${isScrollTop ? blurClassName : ''}`}
    >
      <Container htmlTag="div" className="relative z-10">
        <div className="flex items-center justify-between p-4">
          <div>
            <Image src="/loader/pokemon-logo-black.svg" alt="Pokemon logo" width={150} height={55} />
          </div>
          <div className="flex gap-4">
            <Button>
              <Plus className="mr-2" size={16} />
              <span className="text-xs">Ajouter un Pokemon</span>
            </Button>
            <Button>
              <Plus className="mr-2" size={16} />
              <span className="text-xs">Ajouter une carte</span>
            </Button>
          </div>
        </div>
      </Container>
    </motion.header>
  );
};
