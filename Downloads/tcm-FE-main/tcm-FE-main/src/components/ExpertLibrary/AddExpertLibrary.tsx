import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import swal from 'sweetalert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import LibraryService from '../../services/library.service';
import ExpertService from '../../services/expert.service';
import errorHandler from '../../utils/errorHandler';

export default function AddExpertLibrary(props) {
    const { showAddExpLibrary, setShowAddExpLibrary, setAddExpLibraryDone, expertLibrariesRow, expertId } = props;

    const [allLibrariesExceptExpert, setAllLibrariesExceptExpert] = useState([]);
    const [selectedLibraryId, setSelectedLibraryId] = useState<string>('');

    const fetchAllLibraries = () => {
        LibraryService.getAllLibraries()
            .then(data => {
                const exceptLibrariesofExpert = data.data.filter(function(all) {
                    return !expertLibrariesRow.some(function(expert) {
                        return all.id == expert.id;
                    });
                });
                setAllLibrariesExceptExpert(exceptLibrariesofExpert);
            })
            .catch(error => errorHandler(error));
    };

    useEffect(() => {
        if (expertLibrariesRow) {
            fetchAllLibraries();
        }
    }, [expertLibrariesRow]);

    const addExpertLibrary = () => {
        const expert = expertId;
        const library = selectedLibraryId;
        const addExpertLibraryFormData = {
            expert,
            library
        };

        ExpertService.addExpertLibrary(addExpertLibraryFormData)
            .then(data => {
                if (data.status == 200) {
                    setAddExpLibraryDone(true);
                    setShowAddExpLibrary(false);
                    swal({
                        title: 'Your Library has been Added!',
                        icon: 'success',
                        timer: 2000
                    });
                    // setLoading(false);
                } else {
                    errorHandler(data);
                }
            })
            .catch(error => {
                errorHandler(error);
            });
    };

    return (
        <div>
            <Dialog
                open={showAddExpLibrary}
                onClose={() => setShowAddExpLibrary(false)}
                sx={{
                    '& .MuiDialog-container': {
                        '& .MuiPaper-root': {
                            width: '100%',
                            maxWidth: '800px'
                        }
                    }
                }}
            >
                <DialogTitle>Add Expert Library</DialogTitle>
                <DialogContent>
                    <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <FormControl sx={{ m: 1, minWidth: '700px' }}>
                            <InputLabel htmlFor="grouped-select">Library-Title</InputLabel>
                            <Select
                                defaultValue=""
                                placeholder="select library"
                                id="grouped-select"
                                label="Library-Title"
                                autoWidth
                                onChange={e => setSelectedLibraryId(e.target.value)}
                            >
                                {allLibrariesExceptExpert.length !== 0 ? (
                                    allLibrariesExceptExpert.map((item: any, index: any) => {
                                        return (
                                            <MenuItem value={item.id} key={index} className="menu-items">
                                                {' '}
                                                {item.title}
                                            </MenuItem>
                                        );
                                    })
                                ) : (
                                    <MenuItem disabled> {'No Data Found'}</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowAddExpLibrary(false)}>Cancel</Button>
                    <Button
                        onClick={() => {
                            setAddExpLibraryDone(true);
                            addExpertLibrary();
                        }}
                    >
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
