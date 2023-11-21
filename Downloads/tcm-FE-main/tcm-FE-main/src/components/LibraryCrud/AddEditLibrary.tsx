import React, { useState, useEffect, useCallback } from 'react';
import swal from 'sweetalert';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import LibraryService from '../../services/library.service';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import errorHandler from '../../utils/errorHandler';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function AddEditLibrary(props) {
    const {
        setOpenAddEdit,
        openAddEdit,
        editLibraryData,
        fromAdd,
        fromEdit,
        setFromEdit,
        setFromAdd,
        setAddEditDone
    } = props;

    interface LibraryProps {
        identifier: string;
        title: string;
        version: string;
        text: string;
        licenseNeeded: string;
        licenseCost: number;
    }

    const [addEditLibraryForm, setAddEditLibraryForm] = useState<LibraryProps>({
        identifier: '',
        title: '',
        version: '',
        text: '',
        licenseNeeded: '',
        licenseCost: 0
    });
    const [addEditTitle, setAddEditTitle] = useState('Add Library');

    useEffect(() => {
        if (editLibraryData && fromEdit) {
            setAddEditLibraryForm(editLibraryData);
            setAddEditTitle('Edit Library');
        }
    }, [editLibraryData, fromEdit]);

    useEffect(() => {
        if (fromAdd) {
            setAddEditLibraryForm({
                identifier: '',
                title: '',
                version: '',
                text: '',
                licenseNeeded: '',
                licenseCost: 0
            });
            setAddEditTitle('Add Library');
        }
    }, [fromAdd]);

    const addEditLibraryOnChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        setAddEditLibraryForm({
            ...addEditLibraryForm,
            [name]: value
        });
    };

    const submitaddEditLibraryForm = async () => {
        // Add Library
        if (fromAdd) {
            LibraryService.addLibrary(addEditLibraryForm)
                .then(data => {
                    setFromAdd(false);
                    setFromEdit(false);
                    if (data.status === 200) {
                        setOpenAddEdit(false);
                        setAddEditDone(true);
                        setAddEditLibraryForm({
                            identifier: '',
                            title: '',
                            version: '',
                            text: '',
                            licenseNeeded: '',
                            licenseCost: 0
                        });
                        swal({
                            title: 'Your Library has been Added!',
                            icon: 'success',
                            timer: 2000
                        });
                        // setLoading(false);
                    } else {
                        errorHandler(data);
                        // setLoading(false);
                    }
                })
                .catch(error => {
                    errorHandler(error);
                });
        }
        // Edit Library
        else if (fromEdit) {
            setAddEditDone(true);
            LibraryService.editLibrary(addEditLibraryForm)
                .then(data => {
                    setFromAdd(false);
                    setFromEdit(false);
                    if (data.status === 200) {
                        setOpenAddEdit(false);
                        setAddEditDone(true);
                        swal({
                            title: 'Your Library has been Updated!',
                            icon: 'success',
                            timer: 2000
                        });
                        // setLoading(false);
                    } else {
                        errorHandler(data);
                        // setLoading(false);
                    }
                })
                .catch(error => {
                    errorHandler(error);
                });
        }
    };
    const onTitleChange = useCallback(value => {
        setAddEditLibraryForm(prevState => ({
            ...prevState,
            title: value
        }));
    }, []);

    const onTextChange = useCallback(value => {
        setAddEditLibraryForm(prevState => ({
            ...prevState,
            text: value
        }));
    }, []);

    return (
        <div>
            <Dialog
                open={openAddEdit}
                onClose={() => {
                    setOpenAddEdit(false);
                    setFromAdd(false);
                    setFromEdit(false);
                }}
                sx={{
                    '& .MuiDialog-container': {
                        '& .MuiPaper-root': {
                            width: '100%',
                            maxWidth: '800px'
                        }
                    }
                }}
            >
                <DialogTitle>{addEditTitle}</DialogTitle>
                <DialogContent>
                    <Box sx={{ flexGrow: 1, marginY: 2 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6} md={4} lg={6}>
                                <TextField
                                    id="identifier"
                                    name="identifier"
                                    placeholder="value in text"
                                    label="Identifier"
                                    variant="outlined"
                                    sx={{ width: '100%' }}
                                    value={addEditLibraryForm.identifier}
                                    onChange={addEditLibraryOnChange}
                                />
                            </Grid>
                            <Grid item xs={6} md={4} lg={6}>
                                <label htmlFor="title">Title:</label>
                                <ReactQuill
                                    id="title"
                                    placeholder="value in text"
                                    value={addEditLibraryForm.title}
                                    onChange={onTitleChange}
                                />
                            </Grid>
                            <Grid item xs={6} md={4} lg={6}>
                                <TextField
                                    id="version"
                                    name="version"
                                    placeholder="value in text"
                                    label="Version"
                                    variant="outlined"
                                    sx={{ width: '100%' }}
                                    value={addEditLibraryForm.version}
                                    onChange={addEditLibraryOnChange}
                                />
                            </Grid>
                            <Grid item xs={6} md={4} lg={6}>
                                <label htmlFor="text">Text:</label>
                                <ReactQuill
                                    id="text"
                                    placeholder="value in text"
                                    value={addEditLibraryForm.text}
                                    onChange={onTextChange}
                                />
                            </Grid>
                            <Grid item xs={6} md={4} lg={6}>
                                <TextField
                                    id="licenseNeeded"
                                    name="licenseNeeded"
                                    placeholder="value in text"
                                    label="License Needed"
                                    variant="outlined"
                                    sx={{ width: '100%' }}
                                    value={addEditLibraryForm.licenseNeeded}
                                    onChange={addEditLibraryOnChange}
                                />
                            </Grid>
                            <Grid item xs={6} md={4} lg={6}>
                                <TextField
                                    type="number"
                                    id="licenseCost"
                                    name="licenseCost"
                                    placeholder="value in number"
                                    label="License Cost"
                                    variant="outlined"
                                    sx={{ width: '100%' }}
                                    value={addEditLibraryForm.licenseCost}
                                    onChange={addEditLibraryOnChange}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ paddingX: 3, paddingBottom: 3 }}>
                    <Button
                        onClick={() => {
                            setOpenAddEdit(false);
                            setFromAdd(false);
                            setFromEdit(false);
                        }}
                        sx={{ marginRight: 2 }}
                        variant="outlined"
                    >
                        Cancel
                    </Button>
                    {/* <Button variant="contained"> */}
                    <Button onClick={() => submitaddEditLibraryForm()} variant="contained">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddEditLibrary;
