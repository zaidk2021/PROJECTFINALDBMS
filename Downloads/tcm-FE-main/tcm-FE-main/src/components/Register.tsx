import React, { useState } from 'react';
import { Avatar, Button, createStyles, Grid, makeStyles, FormControl, Paper, TextField } from '@material-ui/core';
import { Theme } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import authService from '../services/auth.service';
import { useNavigate } from 'react-router';
import errorHandler from '../utils/errorHandler';

const Register = () => {
    const navigate = useNavigate();
    const paperStyle = { padding: 20, height: 'auto', width: 400, margin: '20px auto' };
    const avatarStyle = { backgroundColor: '#1bbd7e' };
    const btnstyle = { margin: '8px 0' };
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            formControl: {
                margin: theme.spacing(1),
                minWidth: 120,
                width: '100%',
                paddingTop: '10px'
            },
            selectEmpty: {
                marginTop: theme.spacing(2)
            }
        })
    );
    const classes = useStyles();

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        // phone_number: null,
        // address: '',
        // country: '',
        role: 'SysAdmin',
        password: '',
        password2: ''
    });

    const handleChange = e => {
        e.persist();
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = () => {
        authService
            .register(formData)
            .then(data => {
                if (data.access_token) {
                    navigate('/');
                } else {
                    errorHandler(data);
                }
            })
            .catch(err => errorHandler(err));
    };
    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid>
                    <Avatar style={avatarStyle}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <h2>Sign Up</h2>
                </Grid>
                <FormControl className={classes.formControl}>
                    <TextField
                        label="First Name"
                        placeholder="Enter First Name"
                        fullWidth
                        required
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                    />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <TextField
                        label="Last Name"
                        placeholder="Enter Last Name"
                        fullWidth
                        required
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                    />
                </FormControl>

                <FormControl className={classes.formControl}>
                    <TextField
                        label="Email"
                        placeholder="Enter Email Address"
                        fullWidth
                        required
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </FormControl>

                <FormControl className={classes.formControl}>
                    <TextField
                        label="Password"
                        placeholder="Enter password"
                        type="password"
                        fullWidth
                        required
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <TextField
                        label="Confirm Password"
                        placeholder="Enter password (again)"
                        type="password"
                        fullWidth
                        required
                        name="password2"
                        value={formData.password2}
                        onChange={handleChange}
                    />
                </FormControl>

                {/* <FormControl className={classes.formControl}>
                    <TextField
                        label="Phone Number"
                        placeholder="Enter Phone Number"
                        fullWidth
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                    />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <TextField
                        label="Address"
                        placeholder="Enter Address"
                        fullWidth
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                </FormControl>

                <FormControl
                    style={{
                        margin: '10px',
                        minWidth: 120,
                        width: '100%',
                        paddingTop: '10px'
                    }}
                >
                    <Select
                        label="Country"
                        placeholder="Country"
                        style={{ alignContent: 'center' }}
                        value={formData.country}
                        variant={'standard'}
                        name="country"
                        onChange={e => setFormData(prev => ({ ...prev, country: e.target.value }))}
                    >
                        {options.map((item: string) => (
                            <MenuItem value={item}>{item}</MenuItem>
                        ))}
                    </Select>
                </FormControl> */}

                <Button color="primary" variant="contained" style={btnstyle} fullWidth onClick={() => handleSubmit()}>
                    Sign up
                </Button>
            </Paper>
        </Grid>
    );
};

export default Register;
