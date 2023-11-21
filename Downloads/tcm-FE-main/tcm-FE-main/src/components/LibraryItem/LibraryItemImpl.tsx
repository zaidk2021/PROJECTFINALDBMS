import React, { useEffect, useState } from 'react';
import { Button, Grid, Paper } from '@material-ui/core';
import { LibraryItem } from './LibraryItem';
import MyDialog2 from './MyDialog2';
import CustomerService from '../../services/customer.service';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import { IconButton } from '@material-ui/core';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface LibraryItemImplemantationProps {
    item: LibraryItem;
    onSave: (text: string) => void;
    onDelete: () => void;
    onCancel: () => void;
    style?: React.CSSProperties;
}

function LibraryItemImplementation(props: LibraryItemImplemantationProps) {
    const [item, setItem] = useState<LibraryItem>(props.item);
    const [open, setOpen] = useState<boolean>(false);
    const [customerId, setCustomerId] = useState<number>(0);

    useEffect(() => {
        const userStr = localStorage.getItem('user');
        const customerId1 = userStr !== null ? JSON.parse(userStr).user_info.cusid : 0;
        setCustomerId(customerId1);
    });

    const onSave = () => {
        console.log('onSave');
        if (item.Id > 0)
            CustomerService.updateImplementation(
                customerId,
                item.Id,
                item.Implementation ? item.Implementation : '',
                item.Implementation == null
            ).then(response => {
                props.onSave(item.Implementation ? item.Implementation : '');
            });
    };

    const onDelete = () => {
        CustomerService.deleteImplementation(customerId, item.Id).then(response => {
            props.onDelete();
        });
    };

    return (
        <div
            style={{
                ...props.style,
                visibility: item.Applicable && props.style ? props.style.visibility : 'hidden',
                alignItems: 'center'
            }}
        >
            <IconButton style={{ padding: '5px' }} onClick={() => setOpen(true)}>
                {item.Implementation == null || item.Implementation.length == 0 ? (
                    <AddIcon fontSize="small" />
                ) : (
                    <EditIcon fontSize="small" />
                )}
            </IconButton>
            <MyDialog2
                key={`LibraryItemImplementationDialog${props.item.Id}`}
                style={{ display: 'inline-block' }}
                title="Library Item - Implementation"
                open={open}
                onClose={() => {
                    setOpen(false);
                }}
            >
                <div style={{ height: '300px', textAlign: 'left', paddingTop: '0px' }}>
                    <Paper style={{ padding: 16 }}>
                        <Grid container alignItems="flex-start" spacing={2}>
                            <Grid item xs={12}></Grid>
                            <Grid item xs={12}>
                                <label htmlFor="Implementation">Implementation</label>
                                <ReactQuill
                                    id="Implementation"
                                    style={{ width: '100%' }}
                                    value={item.Implementation}
                                    onChange={e => setItem({ ...item, Implementation: e })}
                                />
                            </Grid>
                            <Grid item style={{ marginTop: 16 }}>
                                <Button
                                    type="button"
                                    variant="contained"
                                    onClick={() => {
                                        setOpen(false);
                                        props.onCancel();
                                    }}
                                >
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid item style={{ marginTop: 16 }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    onClick={() => {
                                        setOpen(false);
                                        onSave();
                                    }}
                                >
                                    Submit
                                </Button>
                            </Grid>
                            {props.item.Implementation !== null && (
                                <Grid item style={{ marginTop: 16, marginLeft: 'auto' }}>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => {
                                            setOpen(false);
                                            onDelete();
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </Grid>
                            )}
                        </Grid>
                    </Paper>
                </div>
            </MyDialog2>
        </div>
    );
}

export default LibraryItemImplementation;
