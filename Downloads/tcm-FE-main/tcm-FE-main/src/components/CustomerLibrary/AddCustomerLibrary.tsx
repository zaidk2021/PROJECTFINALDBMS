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
import CustomerService from '../../services/customer.service';
import errorHandler from '../../utils/errorHandler';

export default function AddCustomerLibrary(props) {
    const { showAddCusLibrary, setShowAddCusLibrary, setAddCusLibraryDone, customerLibrariesRow } = props;

    const [allLibrariesExceptCustomer, setAllLibrariesExceptCustomer] = useState([]);
    const [selectedLibraryId, setSelectedLibraryId] = useState<string>('');

    const fetchAllLibraries = () => {
        LibraryService.getAllLibraries()
            .then(data => {
                const exceptLibrariesofCustomer = data.data.filter(function(all) {
                    return !customerLibrariesRow.some(function(customer) {
                        return all.id == customer.id;
                    });
                });
                setAllLibrariesExceptCustomer(exceptLibrariesofCustomer);
            })
            .catch(error => {
                errorHandler(error);
            });
    };
    useEffect(() => {
        if (customerLibrariesRow) {
            fetchAllLibraries();
        }
    }, [customerLibrariesRow]);

    const [customerId, setCustomerId] = useState<any>();

    // UseEffects
    useEffect(() => {
        const userData: any = localStorage.getItem('user');
        const parsedData = JSON.parse(userData);
        const userId = parsedData.user_info.cusid;
        setCustomerId(userId);
    }, []);

    const addCustomerLibrary = () => {
        const customer = customerId;
        const library = selectedLibraryId;
        const addCustomerLibraryFormData = {
            customer,
            library
        };
        CustomerService.addCustomerLibrary(addCustomerLibraryFormData)
            .then(data => {
                if (data.status == 200) {
                    setAddCusLibraryDone(true);
                    setShowAddCusLibrary(false);
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
    };

    return (
        <div>
            <Dialog
                open={showAddCusLibrary}
                onClose={() => setShowAddCusLibrary(false)}
                sx={{
                    '& .MuiDialog-container': {
                        '& .MuiPaper-root': {
                            width: '100%',
                            maxWidth: '800px'
                        }
                    }
                }}
            >
                <DialogTitle>Add Customer Library</DialogTitle>
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
                                {allLibrariesExceptCustomer.length !== 0 ? (
                                    allLibrariesExceptCustomer.map((item: any) => {
                                        return (
                                            <MenuItem value={item.id} key={item.id}>
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
                    <Button onClick={() => setShowAddCusLibrary(false)}>Cancel</Button>
                    <Button
                        onClick={() => {
                            setAddCusLibraryDone(true);
                            addCustomerLibrary();
                        }}
                    >
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
