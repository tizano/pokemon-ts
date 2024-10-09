'use client';
import { Container } from '@/components/container/container';
import { CreateCardForm } from '@/features/cards/forms/create-card-form';
import { CreatePokemonForm } from '@/features/pokemons/components/forms/create-pokemon-form';
import { useDialog } from '@/hooks/use-dialog';
import { cn } from '@/lib/utils/utils';
import { AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion';
import * as motion from 'framer-motion/client';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { PokemonDialog } from '../pokemon-dialog/pokemon-dialog';
import { Button } from '../ui/button';

const MODAL_CONTENTS = [
  {
    title: 'Ajouter un Pokémon',
    description: 'Ajoute un Pokémon à liste',
    Component: CreatePokemonForm,
  },
  {
    title: 'Ajouter une carte',
    description: 'Ajoute une carte à liste',
    Component: CreateCardForm,
  },
];

export const Header = ({ className }: { className?: string }) => {
  const [isHidden, setIsHidden] = useState(false);
  const [isScrollTop, setIsScrollTop] = useState(false);
  const { scrollY } = useScroll();
  const lastScrollYRef = useRef(0);
  const { setOpenDialogIndex } = useDialog();

  const blurClassName = 'backdrop-blur-lg';

  useMotionValueEvent(scrollY, 'change', (y) => {
    const difference = y - lastScrollYRef.current;
    if (Math.abs(difference) > 10) {
      setIsHidden(difference > 0);
      setIsScrollTop(y > 10);
      lastScrollYRef.current = y;
    }
  });

  return (
    <AnimatePresence>
      <motion.header
        animate={isHidden ? 'hidden' : 'visible'}
        onFocusCapture={() => setIsHidden(false)}
        variants={{ hidden: { y: '-100%' }, visible: { y: '0%' } }}
        transition={{ duration: 0.25 }}
        className={cn(
          'fixed top-0 left-0 right-0 w-full backdrop-filter transition-colors',
          isScrollTop ? blurClassName : '',
          className,
        )}
      >
        <Container htmlTag="div" className="relative">
          <div className={cn('flex items-center justify-between transition-all', isScrollTop ? 'p-0' : 'py-4')}>
            <Link href="/" className="motion-preset-slide-down">
              <Image src="/loader/pokemon-logo-black.svg" alt="Pokemon logo" width={150} height={55} />
            </Link>
            <div className="flex gap-4">
              {MODAL_CONTENTS.map((modal, index) => (
                <PokemonDialog
                  key={index}
                  title={modal.title}
                  openIndex={index}
                  onToggle={(isOpen) => {
                    setOpenDialogIndex(isOpen ? index : null);
                  }}
                  trigger={
                    <Button
                      className={cn(
                        'motion-preset-slide-left',
                        `${index === 0 ? 'motion-delay-150' : 'motion-delay-300'}`,
                      )}
                    >
                      <Plus className="mr-2" size={16} />
                      <span className="text-xs">{modal.title}</span>
                    </Button>
                  }
                >
                  <modal.Component
                    onSubmitSuccess={() => {
                      console.log('onSubmitSuccess, it should close the dialog');

                      setOpenDialogIndex(null);
                    }}
                  />
                </PokemonDialog>
              ))}
            </div>
          </div>
        </Container>
      </motion.header>
    </AnimatePresence>
  );
};
