import { Button } from '@/components/ui/button';
import usePagination from '@/hooks/use-pagination';
import { cn } from '@/lib/utils/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({ itemsPerPage, totalItems, className }) => {
  const { currentPage, lastPage, hasNextPage, hasPreviousPage, goToNextPage, goToPreviousPage } = usePagination({
    totalItems,
    itemsPerPage,
  });

  return (
    <div className={cn('flex justify-center gap-4', className)}>
      {hasPreviousPage && (
        <Button size="sm" onClick={goToPreviousPage}>
          <ChevronLeft size={20} />
        </Button>
      )}
      <span className="self-center text-white">
        Page {currentPage} sur {lastPage}
      </span>
      {hasNextPage && (
        <Button size="sm" onClick={goToNextPage}>
          <ChevronRight size={20} />
        </Button>
      )}
    </div>
  );
};
