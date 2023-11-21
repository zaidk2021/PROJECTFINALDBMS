import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormGroup,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from '@mui/material';
import countryList from 'react-select-country-list';

const AddEditUserDialog = ({ userFormData, setUserFormData, AddUpdateUser, setShowAddEditUserDialog, fromEdit }) => {
    const handleChange = e => {
        e.persist();
        setUserFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const options = React.useMemo(() => countryList().getLabels(), []);

    return (
        <div>
            <Dialog
                open={true}
                onClose={() => setShowAddEditUserDialog(false)}
                sx={{
                    '& .MuiDialog-container': {
                        '& .MuiPaper-root': {
                            width: '100%',
                            maxWidth: '500px'
                        }
                    }
                }}
            >
                <DialogTitle>{fromEdit ? 'Edit' : 'Add'} User</DialogTitle>
                <DialogContent>
                    <FormGroup>
                        <TextField
                            label="First Name"
                            placeholder="Enter First Name"
                            fullWidth
                            required
                            className="mt-4"
                            name="first_name"
                            value={userFormData.first_name}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Last Name"
                            placeholder="Enter Last Name"
                            fullWidth
                            required
                            className="mt-4"
                            name="last_name"
                            value={userFormData.last_name}
                            onChange={handleChange}
                        />
                        {/* {!fromEdit && (  )} */}
                        <TextField
                            label="Email"
                            placeholder="Enter Email"
                            fullWidth
                            required
                            name="email"
                            className="mt-4"
                            value={userFormData.email}
                            onChange={handleChange}
                        />

                        <FormControl
                            sx={{
                                formControl: {
                                    margin: '10px',
                                    minWidth: 120,
                                    width: '100%',
                                    paddingTop: '10px'
                                }
                            }}
                            className="mt-4"
                        >
                            <InputLabel htmlFor="role">Role*</InputLabel>
                            <Select
                                label="Role"
                                placeholder="Role"
                                style={{ alignContent: 'center' }}
                                value={userFormData.role}
                                required
                                name="role"
                                onChange={e => setUserFormData(prev => ({ ...prev, role: e.target.value }))}
                            >
                                <MenuItem value="Customer Admin">Company Admin</MenuItem>
                                <MenuItem value="Customer User">Company User</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            label="Phone Number"
                            placeholder="Enter Phone Name"
                            fullWidth
                            type={'number'}
                            className="mt-4"
                            name="phone_number"
                            value={userFormData.phone_number}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Address"
                            placeholder="Enter Address"
                            fullWidth
                            rows={3}
                            multiline
                            name="address"
                            className="mt-4"
                            value={userFormData.address}
                            onChange={handleChange}
                        />
                        <FormControl
                            sx={{
                                formControl: {
                                    margin: '10px',
                                    minWidth: 120,
                                    width: '100%',
                                    paddingTop: '10px'
                                }
                            }}
                            className="mt-4"
                        >
                            <InputLabel htmlFor="Country">Country</InputLabel>
                            <Select
                                label="Country"
                                placeholder="Country"
                                style={{ alignContent: 'center' }}
                                value={userFormData.country}
                                name="country"
                                onChange={e => setUserFormData(prev => ({ ...prev, country: e.target.value }))}
                            >
                                {options.map((item: string) => (
                                    <MenuItem value={item}>{item}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </FormGroup>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowAddEditUserDialog(false)}>Cancel</Button>
                    <Button
                        onClick={() => {
                            AddUpdateUser();
                        }}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddEditUserDialog;
