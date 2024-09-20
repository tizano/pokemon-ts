import { parseAsInteger, useQueryState } from 'nuqs';
import { useCallback } from 'react';

interface UsePaginationProps {
  totalItems: number;
  itemsPerPage: number;
  initialPage?: number;
}

interface UsePaginationReturn {
  currentPage: number;
  lastPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  setPage: (page: number) => void;
}

export default function usePagination({
  totalItems,
  itemsPerPage,
  initialPage = 1,
}: UsePaginationProps): UsePaginationReturn {
  // Utilisation de `useQueryState` pour synchroniser la pagination avec l'URL
  const [currentPage, setPage] = useQueryState(
    'page',
    parseAsInteger.withDefault(initialPage),
  );

  const lastPage = Math.ceil(totalItems / itemsPerPage);

  const hasNextPage = currentPage < lastPage;
  const hasPreviousPage = currentPage > 1;

  const goToNextPage = useCallback(() => {
    if (hasNextPage) {
      setPage((prevPage) => Math.min(prevPage + 1, lastPage));
    }
  }, [hasNextPage, lastPage, setPage]);

  const goToPreviousPage = useCallback(() => {
    if (hasPreviousPage) {
      setPage((prevPage) => (prevPage - 1 === 1 ? null : prevPage - 1));
    }
  }, [hasPreviousPage, setPage]);

  return {
    currentPage,
    lastPage,
    hasNextPage,
    hasPreviousPage,
    goToNextPage,
    goToPreviousPage,
    setPage,
  };
}
