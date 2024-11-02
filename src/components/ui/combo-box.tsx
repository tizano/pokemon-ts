'use client';

import { SelectValueLabel } from '@/lib/types/select.type';
import { Check, ChevronsUpDown, Loader2 } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils/utils';

interface ComboboxProps {
  items: SelectValueLabel[];
  modal?: boolean;
  placeholder: string;
  searchNotFound: string;
  isLoading: boolean;
  searchInput: string;
  setSearchInput: (searchInput: string) => void;
  selectedValue: SelectValueLabel;
  setSelectedValue: (selectedItem: SelectValueLabel) => void;
}

export function Combobox({
  items,
  modal,
  placeholder,
  searchNotFound,
  searchInput,
  setSearchInput,
  selectedValue,
  setSelectedValue,
  isLoading,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen} modal={modal}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="justify-between">
          {selectedValue.value !== '' ? selectedValue.label : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[--radix-popover-trigger-width]">
        <Command>
          <div className="flex items-center justify-between gap-2">
            <CommandInput placeholder={placeholder} value={searchInput} onValueChange={setSearchInput} />
            {isLoading && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
          </div>
          {!isLoading && (
            <CommandList>
              <CommandGroup>
                {items.map((item) => (
                  <CommandItem
                    key={item.value}
                    value={item.value}
                    onSelect={(currentValue) => {
                      setSearchInput('');
                      setSelectedValue(
                        items.find((item) => item.value === currentValue) ||
                          ({ value: '', label: '' } as SelectValueLabel),
                      );
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn('mr-2 h-4 w-4', selectedValue.value === item.value ? 'opacity-100' : 'opacity-0')}
                    />
                    {item.label}
                  </CommandItem>
                ))}
              </CommandGroup>
              {items.length === 0 && !isLoading && <CommandEmpty>{searchNotFound}</CommandEmpty>}
            </CommandList>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
}
