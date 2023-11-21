import React, { useState } from 'react';
import { Grid, Paper, Avatar, TextField, Button } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useNavigate } from 'react-router';
import authService from '../services/auth.service';
import swal from 'sweetalert';
import errorHandler from '../utils/errorHandler';

const ForgotPassword = () => {
    const paperStyle = { padding: 20, height: '70vh', width: 280, margin: '20px auto' };
    const avatarStyle = { backgroundColor: '#1bbd7e' };
    const btnstyle = { margin: '8px 0' };

    const [email, setEmail] = useState('');

    const navigate = useNavigate();

    const handleSubmit = () => {
        authService
            .forgotPassword(email)
            .then(data => {
                if (data.status === 200) {
                    swal({
                        title: 'OTP sent on given email!',
                        icon: 'success',
                        timer: 2000
                    });
                    navigate('/reset-password', { state: { email: email } });
                } else {
                    errorHandler(data);
                }
            })
            .catch(err => errorHandler(err));
    };

    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid alignItems="center">
                    <Avatar style={avatarStyle}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <h2>Forgot Password</h2>
                </Grid>
                <TextField
                    label="Email"
                    placeholder="Enter email address"
                    fullWidth
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
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
                    Send link
                </Button>
            </Paper>
        </Grid>
    );
};

export default ForgotPassword;
