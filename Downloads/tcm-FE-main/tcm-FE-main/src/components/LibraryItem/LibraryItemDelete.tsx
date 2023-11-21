import React, { useState } from 'react';
import { Button, Grid, Paper } from '@material-ui/core';
import LibraryItemService from '../../services/library-item.service';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';
import MyDialog2 from './MyDialog2';

interface LibraryItemDeleteProps {
    itemId: number;
    onDelete: (itemId: number) => void;
    onCancel: () => void;
    style?: React.CSSProperties;
}

function LibraryItemDelete(props: LibraryItemDeleteProps) {
    const [open, setOpen] = useState<boolean>(false);

    const onDelete = () => {
        LibraryItemService.delete(props.itemId)
            .then(response => {
                props.onDelete(props.itemId);
            })
            .catch(error => {
                props.onDelete(props.itemId);
            });
    };

    return (
        <div style={{ ...props.style, alignItems: 'center' }}>
            <IconButton style={{ padding: '5px' }} onClick={() => setOpen(true)}>
                <DeleteIcon fontSize="small" />
            </IconButton>
            <MyDialog2
                key={`LibraryItemDeleteDialog${props.itemId}`}
                style={{ display: 'inline-block' }}
                title="Library Item - Delete"
                open={open}
                onClose={() => {
                    setOpen(false);
                }}
            >
                <div style={{ height: '150px', width: '400px', textAlign: 'left', paddingTop: '0px' }}>
                    <Paper style={{ padding: 16 }}>
                        <Grid container alignItems="flex-start" spacing={2}>
                            <Grid item xs={12}>
                                Are you sure you want to delete this?
                            </Grid>
                            <Grid item style={{ marginTop: 16 }}>
                                <Button type="button" variant="contained" onClick={props.onCancel}>
                                    No
                                </Button>
                            </Grid>
                            <Grid item style={{ marginTop: 16 }}>
                                <Button variant="contained" color="primary" type="submit" onClick={onDelete}>
                                    Yes
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </div>
            </MyDialog2>
        </div>
    );
}

export default LibraryItemDelete;
