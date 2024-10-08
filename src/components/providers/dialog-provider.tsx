'use client';
import { DialogContext } from '@/context/dialog-context';
import React, { useState } from 'react';

export const DialogProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [openDialogIndex, setOpenDialogIndex] = useState<number | null>(null);
  return <DialogContext.Provider value={{ openDialogIndex, setOpenDialogIndex }}>{children}</DialogContext.Provider>;
};
