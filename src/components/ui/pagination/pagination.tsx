'use client';
import { Button } from '@/components/ui/button';
import usePagination from '@/hooks/use-pagination';
import { Suspense } from 'react';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
}

export const Pagination = ({ itemsPerPage, totalItems }: PaginationProps) => {
  const { currentPage, lastPage, hasNextPage, hasPreviousPage, goToNextPage, goToPreviousPage } = usePagination({
    totalItems,
    itemsPerPage,
  });

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex justify-center gap-2">
        {hasPreviousPage && <Button onClick={goToPreviousPage}>Previous</Button>}
        <span className="self-center">
          Page {currentPage} of {lastPage}
        </span>
        {hasNextPage && <Button onClick={goToNextPage}>Next</Button>}
      </div>
    </Suspense>
  );
};
