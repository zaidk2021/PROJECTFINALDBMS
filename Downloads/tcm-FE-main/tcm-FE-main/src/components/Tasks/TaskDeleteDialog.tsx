import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

function TaskDeleteDialog(props) {
    const { selectedData, setShowDeleteDialog, showDeleteDialog, setConfirmDeleteDone } = props;

    return (
        <Dialog
            open={showDeleteDialog}
            onClose={() => setShowDeleteDialog(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Are you sure that you want to delete this task {selectedData.title} ?
            </DialogTitle>
            <DialogActions sx={{ paddingX: 3, paddingBottom: 3 }}>
                <Button onClick={() => setShowDeleteDialog(false)} variant="outlined" sx={{ marginRight: 2 }}>
                    Cancel
                </Button>
                <Button onClick={() => setConfirmDeleteDone(true)} variant="contained">
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default TaskDeleteDialog;
