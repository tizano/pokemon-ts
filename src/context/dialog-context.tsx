import { createContext } from 'react';

export const DialogContext = createContext<{
  openDialogIndex: number | null;
  setOpenDialogIndex: (index: number | null) => void;
}>({ openDialogIndex: null, setOpenDialogIndex: () => {} });
