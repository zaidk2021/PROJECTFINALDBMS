import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

function ConfirmationDialogue(props) {
    const { selectedData, setOpenConfirm, openConfirm, setConfirmDeleteDone } = props;

    return (
        <Dialog
            open={openConfirm}
            onClose={() => setOpenConfirm(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Are you sure that you want to delete this library {selectedData.identifier}?
            </DialogTitle>
            <DialogActions sx={{ paddingX: 3, paddingBottom: 3 }}>
                <Button onClick={() => setOpenConfirm(false)} variant="outlined" sx={{ marginRight: 2 }}>
                    Cancel
                </Button>
                <Button onClick={() => setConfirmDeleteDone(true)} variant="contained">
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmationDialogue;
