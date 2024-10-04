import { Button } from '@/components/ui/button';
import usePagination from '@/hooks/use-pagination';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
}

export const Pagination: React.FC<PaginationProps> = ({ itemsPerPage, totalItems }) => {
  const { currentPage, lastPage, hasNextPage, hasPreviousPage, goToNextPage, goToPreviousPage } = usePagination({
    totalItems,
    itemsPerPage,
  });

  return (
    <div className="flex justify-center gap-4">
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
