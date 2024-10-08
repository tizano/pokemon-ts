import { useQueryState } from 'nuqs';

export function useUrlParams() {
  const [searchName] = useQueryState('name', {
    defaultValue: '',
  });

  const [currentType] = useQueryState<string>('type', {
    defaultValue: '',
    clearOnDefault: true,
    parse: (value) => value,
  });

  const [currentPage, setCurrentPage] = useQueryState<number>('page', {
    defaultValue: 1,
    clearOnDefault: true,
    parse: (value) => parseInt(value, 10),
    serialize: (value) => value.toString(),
  });

  // Vous pouvez ajouter d'autres paramètres si nécessaire, comme itemsPerPage

  return {
    searchName,
    currentType,
    currentPage,
    setCurrentPage,
    // Retournez d'autres setters si vous en avez besoin
  };
}
