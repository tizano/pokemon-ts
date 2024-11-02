'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export const ButtonBack = ({
  className,
  children,
}: React.PropsWithChildren<{
  className?: string;
}>) => {
  const router = useRouter();
  return (
    <Button
      className={className}
      variant={'outline'}
      onClick={() =>
        router.push('/', {
          scroll: false,
        })
      }
    >
      {children}
    </Button>
  );
};
