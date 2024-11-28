import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

export default function AdminDeleteDialog({ isDialogOpen, closeDialog, handleDeleteDoc }) {
    return(
        <Dialog
        open={isDialogOpen}
        onClose={closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Opravdu chcete záznam vymazat?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' onClick={closeDialog} color="primary">
            Zpět
          </Button>
          <Button variant='contained' onClick={handleDeleteDoc} color="primary" autoFocus>
            Vymazat
          </Button>
        </DialogActions>
      </Dialog>
    )
}