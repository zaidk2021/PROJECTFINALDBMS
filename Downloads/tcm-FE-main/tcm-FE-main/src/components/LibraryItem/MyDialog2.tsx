import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2)
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1)
    }
}));

export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme => theme.palette.grey[500]
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

export interface MyDialog2Props {
    open: boolean;
    title: string;
    onClose: () => void;
    children?: React.ReactNode;
    style?: React.CSSProperties;
    headerRight?: React.ReactNode;
}

export default function MyDialog2(props: MyDialog2Props) {
    return (
        <div>
            <BootstrapDialog
                onClose={() => {
                    props.onClose();
                }}
                aria-labelledby="customized-dialog-title"
                open={props.open}
            >
                <BootstrapDialogTitle
                    id="customized-dialog-title"
                    onClose={() => {
                        props.onClose();
                    }}
                >
                    {props.title}
                    <div style={{ float: 'right', paddingRight: '40px', position: 'relative', top: '-3px' }}>
                        {props.headerRight}
                    </div>
                </BootstrapDialogTitle>
                <DialogContent dividers>{props.children}</DialogContent>
                <DialogActions style={{ display: 'none', height: '0px' }}>
                    <Button
                        autoFocus
                        onClick={() => {
                            props.onClose();
                        }}
                    >
                        Save changes
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}
