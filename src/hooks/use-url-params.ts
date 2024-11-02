import { useQueryState } from 'nuqs';

export function useUrlParams() {
  const [searchName, setSearchName] = useQueryState('name', {
    defaultValue: '',
  });

  const [currentType, setCurrentType] = useQueryState<string>('type', {
    defaultValue: '',
    clearOnDefault: true,
    parse: (value) => value,
  });

  const [currentPage, setCurrentPage] = useQueryState<number>('page', {
    defaultValue: 1,
    clearOnDefault: true,
    parse: (value) => parseInt(value, 10),
    serialize: (value) => value?.toString() ?? '1',
  });

  const [currentRarity, setCurrentRarity] = useQueryState<string>('rarity', {
    defaultValue: '',
    clearOnDefault: true,
    parse: (value) => value,
  });

  return {
    searchName,
    setSearchName,
    currentType,
    setCurrentType,
    currentPage,
    setCurrentPage,
    currentRarity,
    setCurrentRarity,
  };
}
