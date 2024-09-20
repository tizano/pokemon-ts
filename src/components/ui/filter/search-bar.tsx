import { useQueryState } from 'nuqs';
import { useEffect } from 'react';
import { Input } from '../input';

// update the component to accept value and onChange props

const SearchBar = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
  const [name, setName] = useQueryState('name');

  useEffect(() => {
    if (value === '') {
      setName(null);
    }
  }, [setName, value]);

  return (
    <Input
      type="text"
      onChange={(e) => {
        setName(e.target.value);
        onChange(e.target.value);
      }}
      value={name || ''}
      placeholder="Search Pokémon"
      className="max-w-xs"
    />
  );
};

export default SearchBar;
