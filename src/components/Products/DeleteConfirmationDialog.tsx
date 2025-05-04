
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  count: number;
}

const DeleteConfirmationDialog = ({
  isOpen,
  onClose,
  onConfirm,
  count,
}: DeleteConfirmationDialogProps) => {
  const isSingle = count === 1;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isSingle ? 'Delete Product' : `Delete ${count} Products`}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {isSingle
              ? 'Are you sure you want to delete this product? This action cannot be undone.'
              : `Are you sure you want to delete these ${count} products? This action cannot be undone.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteConfirmationDialog;
