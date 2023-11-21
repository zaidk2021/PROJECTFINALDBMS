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
    Stepper,
    TextField,
    Box,
    StepLabel,
    Step
} from '@mui/material';
import countryList from 'react-select-country-list';

const NewAddEditCompanyDialog = ({
    companyEditFormData,
    setCompanyEditFormData,
    AddUpdateCompany,
    setShowAddEditCompanyDialog,
    fromEdit,
    activeStep,
    adminData,
    setAdminData,
    createAdmin
}) => {
    const options = React.useMemo(() => countryList().getLabels(), []);

    const handleChangeAdmin = e => {
        e.persist();
        setAdminData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };
    return (
        <div>
            <Dialog
                open={true}
                onClose={() => setShowAddEditCompanyDialog(false)}
                sx={{
                    '& .MuiDialog-container': {
                        '& .MuiPaper-root': {
                            width: '100%'
                        }
                    }
                }}
                // maxWidth={'lg'}
            >
                <DialogTitle>{fromEdit ? 'Edit Company' : ''} </DialogTitle>
                <DialogContent>
                    <Box sx={{ width: '100%' }}>
                        {!fromEdit && (
                            <Stepper alternativeLabel activeStep={activeStep}>
                                <Step sx={{ width: '100%' }} key={0}>
                                    <StepLabel>{'Register Company'}</StepLabel>
                                </Step>
                                <Step key={1}>
                                    <StepLabel>{'Register Admin'}</StepLabel>
                                </Step>
                            </Stepper>
                        )}
                        {(activeStep === 0 || fromEdit) && (
                            <FormGroup>
                                {!fromEdit && (
                                    <TextField
                                        label="Company Code"
                                        placeholder="Enter Company Code"
                                        fullWidth
                                        required
                                        name="code"
                                        className="mt-4"
                                        value={companyEditFormData.code}
                                        onChange={e =>
                                            setCompanyEditFormData(prev => ({ ...prev, code: e.target.value }))
                                        }
                                    />
                                )}
                                <TextField
                                    label="Company Name"
                                    placeholder="Enter Company Name"
                                    fullWidth
                                    required
                                    className="mt-4"
                                    name="name"
                                    value={companyEditFormData.name}
                                    onChange={e => setCompanyEditFormData(prev => ({ ...prev, name: e.target.value }))}
                                />
                                <TextField
                                    label="Company Phone"
                                    placeholder="Enter Company Phone"
                                    fullWidth
                                    type={'number'}
                                    className="mt-4"
                                    name="phone"
                                    value={companyEditFormData.phone}
                                    onChange={e => setCompanyEditFormData(prev => ({ ...prev, phone: e.target.value }))}
                                />
                                <TextField
                                    label="Company Address"
                                    placeholder="Enter Company Address"
                                    fullWidth
                                    className="mt-4"
                                    rows={3}
                                    multiline
                                    name="company_address"
                                    value={companyEditFormData.company_address}
                                    onChange={e =>
                                        setCompanyEditFormData(prev => ({
                                            ...prev,
                                            company_address: e.target.value
                                        }))
                                    }
                                />
                                <TextField
                                    label="Company Postal Code"
                                    placeholder="Enter Company Postal Code"
                                    fullWidth
                                    className="mt-4"
                                    name="postalCode"
                                    value={companyEditFormData.postalCode}
                                    onChange={e =>
                                        setCompanyEditFormData(prev => ({
                                            ...prev,
                                            postalCode: e.target.value
                                        }))
                                    }
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
                                        value={companyEditFormData.company_country}
                                        name="company_country"
                                        onChange={e =>
                                            setCompanyEditFormData(prev => ({
                                                ...prev,
                                                company_country: e.target.value
                                            }))
                                        }
                                    >
                                        {options.map((item: string) => (
                                            <MenuItem value={item}>{item}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </FormGroup>
                        )}

                        {activeStep === 1 && !fromEdit && (
                            <FormGroup>
                                <TextField
                                    label="First Name"
                                    placeholder="Enter First Name"
                                    fullWidth
                                    required
                                    className="mt-4"
                                    name="first_name"
                                    value={adminData.first_name}
                                    onChange={e => handleChangeAdmin(e)}
                                />
                                <TextField
                                    label="Last Name"
                                    placeholder="Enter Last Name"
                                    fullWidth
                                    required
                                    className="mt-4"
                                    name="last_name"
                                    value={adminData.last_name}
                                    onChange={e => handleChangeAdmin(e)}
                                />
                                <TextField
                                    label="Email"
                                    placeholder="Enter Email"
                                    fullWidth
                                    required
                                    className="mt-4"
                                    name="email"
                                    value={adminData.email}
                                    onChange={e => handleChangeAdmin(e)}
                                />
                                <TextField
                                    label="Phone Number"
                                    placeholder="Enter Phone Number"
                                    fullWidth
                                    type={'number'}
                                    className="mt-4"
                                    name="phone_number"
                                    value={adminData.phone_number}
                                    onChange={e => handleChangeAdmin(e)}
                                />
                                <TextField
                                    label="Address"
                                    placeholder="Enter Address"
                                    fullWidth
                                    rows={3}
                                    multiline
                                    className="mt-4"
                                    name="address"
                                    value={adminData.address}
                                    onChange={e => handleChangeAdmin(e)}
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
                                        value={adminData.country}
                                        name="country"
                                        onChange={e =>
                                            setAdminData(prev => ({
                                                ...prev,
                                                country: e.target.value
                                            }))
                                        }
                                    >
                                        {options.map((item: string) => (
                                            <MenuItem value={item}>{item}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </FormGroup>
                        )}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowAddEditCompanyDialog(false)}>Cancel</Button>
                    <Button
                        onClick={() => {
                            if (activeStep !== 1 || fromEdit) {
                                AddUpdateCompany();
                            } else {
                                createAdmin();
                            }
                        }}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default NewAddEditCompanyDialog;
