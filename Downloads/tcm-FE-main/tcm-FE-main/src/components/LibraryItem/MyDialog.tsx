import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

export interface MyDialogProps {
    title: string;
    children: React.ReactNode;
    onClose: () => void;
    style?: React.CSSProperties;
    open: boolean;
}

export const MyDialog = (props: MyDialogProps) => {
    const { title, children, style, open, onClose, ...other } = { ...props };
    return (
        <div style={style}>
            <Dialog onClose={props.onClose} aria-labelledby="customized-dialog-title" open={open}>
                <MuiDialogTitle disableTypography {...other}>
                    <Typography variant="h6">{title}</Typography>
                    {onClose ? (
                        <IconButton aria-label="close" onClick={onClose}>
                            <CloseIcon />
                        </IconButton>
                    ) : null}
                </MuiDialogTitle>
                <MuiDialogContent dividers>{children}</MuiDialogContent>
            </Dialog>
        </div>
    );
};
