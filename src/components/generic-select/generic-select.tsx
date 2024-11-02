import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useQueryState } from 'nuqs';
import { useState } from 'react';

interface GenericSelectProps<T> {
  items: T[];
  onValueChange: (value: string) => void;
  getItemKey: (item: T) => string; // Fonction pour obtenir la clé unique
  getItemValue: (item: T) => string; // Fonction pour obtenir la valeur
  getItemLabel: (item: T) => string; // Fonction pour obtenir l'étiquette
  defaultItem?: T;
  queryKey: string;
  placeholder: string;
  useQueryParam?: boolean;
}

export function GenericSelect<T>({
  items,
  onValueChange,
  getItemKey,
  getItemValue,
  getItemLabel,
  defaultItem,
  queryKey,
  placeholder,
  useQueryParam = false,
}: GenericSelectProps<T>) {
  const queryState = useQueryState<string>(queryKey, {
    defaultValue: defaultItem ? getItemValue(defaultItem) : '',
    clearOnDefault: true,
    parse: (value) => value,
  });
  const state = useState<string>(defaultItem ? getItemValue(defaultItem) : '');

  const [selectedValue, setSelectedValue] = useQueryParam ? queryState : state;

  // const togglePokemon = (pokemon: string) => {
  //   setSelectedPokemon((current) => (current === pokemon ? null : pokemon))
  //   setOpen(false)
  // }

  const handleValueChange = (value: string) => {
    if (defaultItem && value === getItemValue(defaultItem)) {
      setSelectedValue('');
    } else {
      const itemToFind = items.find((item) => getItemValue(item) === value);
      setSelectedValue(getItemValue(itemToFind || defaultItem || items[0]));
    }
    onValueChange(value);
  };

  return (
    <Select value={selectedValue} onValueChange={handleValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {defaultItem ? (
          <SelectItem key={getItemKey(defaultItem)} value={getItemValue(defaultItem)}>
            {getItemLabel(defaultItem)}
          </SelectItem>
        ) : null}
        {items.map((item) => (
          <SelectItem
            key={getItemKey(item)}
            value={getItemValue(item)}
            // onSelect={() => togglePokemon(getItemKey(item))}
          >
            {getItemLabel(item)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
