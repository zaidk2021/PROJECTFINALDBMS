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

const EditProfile = ({ profileFormData, setProfileFormData, updateProfile, setShowUpdateDialog }) => {
    const handleChange = e => {
        e.persist();
        setProfileFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const options = React.useMemo(() => countryList().getLabels(), []);

    return (
        <div>
            <Dialog
                open={true}
                onClose={() => setShowUpdateDialog(false)}
                sx={{
                    '& .MuiDialog-container': {
                        '& .MuiPaper-root': {
                            width: '100%',
                            maxWidth: '500px'
                        }
                    }
                }}
            >
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogContent>
                    <FormGroup>
                        <TextField
                            label="First Name"
                            placeholder="Enter First Name"
                            fullWidth
                            required
                            className="mt-4"
                            name="first_name"
                            value={profileFormData.first_name}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Last Name"
                            placeholder="Enter Last Name"
                            fullWidth
                            required
                            className="mt-4"
                            name="last_name"
                            value={profileFormData.last_name}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Email"
                            placeholder="Enter Email"
                            fullWidth
                            required
                            className="mt-4"
                            name="email"
                            value={profileFormData.email}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Phone Number"
                            placeholder="Enter Phone Number"
                            fullWidth
                            type={'number'}
                            name="phone_number"
                            className="mt-4"
                            value={profileFormData.phone_number}
                            onChange={handleChange}
                        />
                        {(profileFormData.role !== 'Customer Admin' || profileFormData.role !== 'Customer User') && (
                            <TextField
                                label="Company Name"
                                placeholder="Enter Company Name"
                                fullWidth
                                name="company_name"
                                className="mt-4"
                                value={profileFormData.company_name}
                                onChange={handleChange}
                            />
                        )}
                        <TextField
                            label="Address"
                            placeholder="Enter Address"
                            fullWidth
                            rows={3}
                            multiline
                            name="address"
                            className="mt-4"
                            value={profileFormData.address}
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
                                value={profileFormData.country}
                                name="country"
                                onChange={e => setProfileFormData(prev => ({ ...prev, country: e.target.value }))}
                            >
                                {options.map((item: string) => (
                                    <MenuItem value={item}>{item}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </FormGroup>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowUpdateDialog(false)}>Cancel</Button>
                    <Button
                        onClick={() => {
                            updateProfile();
                        }}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default EditProfile;
