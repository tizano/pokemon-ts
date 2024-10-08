import { useDialog } from '@/hooks/use-dialog';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';

interface PokemonDialogProps extends React.PropsWithChildren {
  trigger: React.ReactNode;
  title: string;
  openIndex: number;
  description?: string;
  onToggle?: (open: boolean) => void;
}

export const PokemonDialog = ({ trigger, title, description, children, openIndex, onToggle }: PokemonDialogProps) => {
  const { openDialogIndex } = useDialog();

  const handleToggleDialog = (isOpen: boolean) => {
    onToggle?.(isOpen);
  };

  return (
    <Dialog open={openDialogIndex === openIndex} onOpenChange={handleToggleDialog}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogDescription>{description}</DialogDescription>
        {children}
      </DialogContent>
    </Dialog>
  );
};
