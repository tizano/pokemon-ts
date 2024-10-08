import { DialogContext } from '@/context/dialog-context';
import { useContext } from 'react';

export const useDialog = () => useContext(DialogContext);
