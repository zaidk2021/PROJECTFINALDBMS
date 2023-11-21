import React, { useEffect, useState } from 'react';
import { Button, Grid, Paper, TextField } from '@material-ui/core';
import { LibraryItem } from './LibraryItem';
import MyDialog2 from './MyDialog2';
import ExpertService from '../../services/expert.service';

import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import { IconButton } from '@material-ui/core';

interface LibraryItemIntprProps {
    libraryId: number;
    item: LibraryItem;
    onSave: (id: number, text: string) => void;
    onCancel: () => void;
    style?: React.CSSProperties;
}

function LibraryItemIntpr(props: LibraryItemIntprProps) {
    const [item, setItem] = useState<LibraryItem>(props.item);
    const [open, setOpen] = useState<boolean>(false);
    const [expertId, setExpertId] = useState<number>(0);

    useEffect(() => {
        const userStr = localStorage.getItem('user');
        const expertId1 = userStr !== null ? JSON.parse(userStr).user_info.expid : 0;
        setExpertId(expertId1);
        //eslint-disable-next-line
    });

    const onSave = () => {
        if (item.Id > 0)
            try {
                if (
                    item.InterpretationId != null &&
                    item.InterpretationId > 0 &&
                    (item.Interpretation == null || item.Interpretation.length == 0)
                )
                    ExpertService.deleteInterpretation(item.Id, expertId).then(response => {
                        props.onSave(0, '');
                    });
                else
                    ExpertService.updateInterpretation(
                        props.libraryId,
                        item.Id,
                        expertId,
                        item.Interpretation ? item.Interpretation : '',
                        item.InterpretationId
                    ).then(response => {
                        props.onSave(response.id, item.Interpretation ? item.Interpretation : '');
                    });
            } catch (error) {
                debugger;
            }
    };

    return (
        <div style={{ ...props.style, alignItems: 'center' }}>
            <IconButton style={{ padding: '5px' }} onClick={() => setOpen(true)}>
                {item.Interpretation == null || item.Interpretation.length == 0 ? (
                    <AddIcon fontSize="small" />
                ) : (
                    <EditIcon fontSize="small" />
                )}{' '}
            </IconButton>
            <MyDialog2
                key={`LibraryItemInterpretationDialog${props.item.Id}`}
                style={{ display: 'inline-block' }}
                title="Library Item - Interpretation"
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
                                <TextField
                                    label="Interpretation"
                                    name="Interpretation"
                                    variant="standard"
                                    style={{ width: '100%' }}
                                    value={item.Interpretation}
                                    onChange={e => setItem({ ...item, Interpretation: e.target.value })}
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
                        </Grid>
                    </Paper>
                </div>
            </MyDialog2>
        </div>
    );
}

export default LibraryItemIntpr;
