import React, { useEffect, useState } from 'react';
import { Avatar, Button, Grid, Paper, TextField } from '@material-ui/core';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import authService from '../services/auth.service';
import swal from 'sweetalert';
import { useLocation, useNavigate } from 'react-router';

interface LocationState {
    email: string;
}

const ResetPassword = () => {
    const [formData, setFormData] = useState({
        email: '',
        otp: '',
        password: '',
        password2: ''
    });

    const navigate = useNavigate();

    const location = useLocation();

    useEffect(() => {
        let state = location.state as LocationState;
        if (state) {
            setFormData(prev => ({ ...prev, email: state.email }));
        }
    }, []);

    const paperStyle = { padding: 20, height: '70vh', width: 280, margin: '20px auto' };
    const avatarStyle = { backgroundColor: '#1bbd7e' };
    const btnstyle = { margin: '8px 0' };
    const handleChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        if (formData.password !== formData.password2) {
            swal({
                title: 'Passwords Did Not Match!',
                text: 'Both passwords should be same',
                icon: 'error'
            });
        }
        authService.resetPassword(formData.email, formData.otp, formData.password).then(data => {
            if (data.status === 200) {
                swal({
                    title: 'Password has been Reset!',
                    icon: 'success',
                    timer: 2000
                });
                navigate('/');
            } else {
                swal({
                    title: 'Did not Reset?',
                    text: data.message,
                    icon: 'error'
                });
            }
        });
    };
    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid alignItems="center">
                    <Avatar style={avatarStyle}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <h2>Reset Password</h2>
                </Grid>
                <TextField
                    label="Email"
                    placeholder="Enter email address"
                    fullWidth
                    required
                    name="Email"
                    value={formData.email}
                    onChange={e => handleChange('email', e.target.value)}
                />
                <TextField
                    label="OTP"
                    placeholder="Enter OTP"
                    fullWidth
                    required
                    name="otp"
                    value={formData.otp}
                    onChange={e => handleChange('otp', e.target.value)}
                />
                <TextField
                    label="Password"
                    placeholder="Enter password"
                    type="password"
                    fullWidth
                    required
                    name="password"
                    value={formData.password}
                    onChange={e => handleChange('password', e.target.value)}
                />
                <TextField
                    label="Confirm Password"
                    placeholder="Confirm password"
                    type="password"
                    fullWidth
                    required
                    value={formData.password2}
                    name="password2"
                    onChange={e => handleChange('password2', e.target.value)}
                />
                <Button
                    color="primary"
                    variant="contained"
                    style={btnstyle}
                    fullWidth
                    onClick={() => {
                        handleSubmit();
                    }}
                >
                    Reset Password
                </Button>
            </Paper>
        </Grid>
    );
};

export default ResetPassword;
