'use client';
import { Input } from '@/components/ui/input';
import { useQueryState } from 'nuqs';

interface SearchBarProps {
  queryParam: string;
  placeholder?: string;
  onValueChange?: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ queryParam, placeholder, onValueChange }) => {
  const [value, setValue] = useQueryState(queryParam, { defaultValue: '', clearOnDefault: true });

  const handleValueChange = (value: string) => {
    setValue(value);
    onValueChange?.(value || '');
  };

  return (
    <Input
      type="text"
      onChange={(e) => handleValueChange(e.target.value)}
      value={value}
      placeholder={placeholder || 'Search...'}
      className="max-w-xs"
    />
  );
};

export default SearchBar;
