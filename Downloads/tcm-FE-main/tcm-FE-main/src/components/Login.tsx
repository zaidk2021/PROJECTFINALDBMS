import React, { useEffect, useState } from 'react';
import { Avatar, Button, Grid, TextField, Typography } from '@material-ui/core';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import authService from '../services/auth.service';
import swal from 'sweetalert';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import imag from './image.svg';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [rememberMe, setRememberMe] = useState(false);
    const avatarStyle = { backgroundColor: '#1bbd7e' };
    const btnstyle = { margin: '8px 0' };
    const handleChange = e => {
        e.persist();
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = () => {
        authService.login(formData.email, formData.password).then(data => {
            if (data.access_token) {
                if (rememberMe) {
                    localStorage.setItem('rememberedEmail', formData.email);
                    localStorage.setItem('rememberedPassword', formData.password);
                } else {
                    localStorage.removeItem('rememberedEmail');
                    localStorage.removeItem('rememberedPassword');
                }

                navigate('/profile');
            } else {
                swal({
                    title: 'Did not Login?',
                    text: data.response.data.message,
                    icon: 'error'
                });
            }
        });
    };

    const handleRegister = () => {
        navigate('/register');
    };

    useEffect(() => {
        const userStr = localStorage.getItem('user');
        const rememberedEmail = localStorage.getItem('rememberedEmail');
        const rememberedPassword = localStorage.getItem('rememberedPassword');

        if (userStr) {
            navigate('/profile');
        }

        if (rememberedEmail && rememberedPassword) {
            setFormData({ email: rememberedEmail, password: rememberedPassword });
            setRememberMe(true);
        }

        //eslint-disable-next-line
    }, []);

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
            <div style={{ height: '100%', width: '50%', margin: 0 }}>
                <Grid>
                    <Avatar style={avatarStyle}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <h2>Login</h2>
                    <h5 style={{ color: 'grey' }}>Welcome Back! Please Enter your details</h5>
                </Grid>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <TextField
                        label="Email"
                        placeholder="Enter email address"
                        style={{ width: '50%' }}
                        required
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Password"
                        placeholder="Enter password"
                        type="password"
                        style={{ width: '50%' }}
                        required
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>{' '}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        maxWidth: '50%',
                        margin: 'auto'
                    }}
                >
                    <div>
                        <FormControlLabel
                            control={<Checkbox checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />}
                            label="Remember me"
                        />
                    </div>
                    <div>
                        {' '}
                        <Typography>
                            <Link to="/forgot-password">Forgot password</Link>
                        </Typography>
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Button
                        color="primary"
                        variant="contained"
                        style={{ ...btnstyle, width: '50%' }}
                        onClick={() => {
                            handleSubmit();
                        }}
                    >
                        Sign In
                    </Button>
                    <Button
                        color="primary"
                        variant="outlined"
                        style={{ ...btnstyle, width: '50%' }}
                        onClick={() => {
                            handleRegister();
                        }}
                    >
                        Register
                    </Button>
                </div>
            </div>
            <img src={imag} alt="image" style={{ height: '100%', width: '50%', margin: 0 }} />
        </Grid>
    );
};

export default Login;
