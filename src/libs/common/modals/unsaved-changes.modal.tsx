import React, { FC } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

interface UnsavedChangesModalProps {
  open: boolean;
  unsavedChanges: number;
  onClose: () => void;
  onReturnToEditing: () => void;
}
const closeText = "Close";
const returnToEditingText = "Return to Editing";
const unsavedChangesTitleText = "Unsaved Changes";
const unsavedChangesMessageText = "You have unsaved changes. Number of unsaved changes: ";

export const UnsavedChangesModal: FC<UnsavedChangesModalProps> = ({
  open,
  unsavedChanges,
  onClose,
  onReturnToEditing
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{unsavedChangesTitleText}</DialogTitle>
      <DialogContent>
        {unsavedChangesMessageText} {unsavedChanges}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} style={{ backgroundColor: '#ff0000', color: '#fff' }}>
          {closeText}
        </Button>
        <Button onClick={onReturnToEditing} style={{ backgroundColor: '#007bff', color: '#fff' }}>
          {returnToEditingText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
