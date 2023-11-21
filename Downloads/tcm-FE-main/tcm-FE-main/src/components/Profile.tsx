import React from 'react';
import { Grid, Paper, Avatar } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/Satellite';
import { useNavigate } from 'react-router';
import EditProfile from './EditProfile';
import { useEffect } from 'react';
import authService from '../services/auth.service';
import errorHandler from '../utils/errorHandler';
import swal from 'sweetalert';
import setAuthToken from '../utils/setAuthToken';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Button } from '@mui/material';

interface ProfileType {
    id: number | null;
    first_name: string;
    last_name: string;
    email: string;
    role: string;
    phone_number?: number | null;
    company_name?: string;
    address?: string;
    country?: '';
}
const Profile = () => {
    const paperStyle = { padding: 20, minHeight: '68vh', width: 330, margin: '20px auto' };
    const avatarStyle = { backgroundColor: '#1bbd7e' };

    const navigate = useNavigate();

    const [showUpdateDialog, setShowUpdateDialog] = React.useState(false);
    const [profileFormData, setProfileFormData] = React.useState<ProfileType>({
        id: null,
        first_name: '',
        last_name: '',
        email: '',
        role: '',
        phone_number: null,
        company_name: '',
        address: '',
        country: ''
    });

    const getCurrentUser = () => {
        authService
            .getCurrentUser()
            .then(data => setProfileFormData(data.data))
            .catch(err => errorHandler(err));
    };

    const updateProfile = () => {
        authService
            .updateCurrentUser(profileFormData)
            .then(data => {
                if (data.success) {
                    getCurrentUser();
                    swal({
                        title: 'Profile Updated!',
                        icon: 'success',
                        timer: 2000
                    });
                    setShowUpdateDialog(false);
                } else {
                    errorHandler(data);
                }
            })
            .catch(error => {
                errorHandler(error);
            });
    };

    useEffect(() => {
        getCurrentUser();
    }, []);

    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid className="mb-3">
                    <Avatar style={avatarStyle}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <h2>Profile</h2>
                </Grid>

                {profileFormData && profileFormData!.first_name && (
                    <p className="mb-3 text-truncate">
                        <span className="fw-bold">First Name: </span>
                        {profileFormData.first_name}{' '}
                    </p>
                )}
                {profileFormData && profileFormData!.last_name && (
                    <p className="mb-3 text-truncate">
                        <span className="fw-bold">Last Name: </span>
                        {profileFormData.last_name}{' '}
                    </p>
                )}

                {profileFormData && profileFormData!.email && (
                    <p className="mb-3 text-truncate">
                        <span className="fw-bold">Email: </span> {profileFormData.email}{' '}
                    </p>
                )}

                {profileFormData && profileFormData!.phone_number && (
                    <p className="mb-3 text-truncate">
                        <span className="fw-bold">Phone: </span> {profileFormData.phone_number}{' '}
                    </p>
                )}

                {profileFormData && profileFormData!.role && (
                    <p className="mb-3 text-truncate">
                        <span className="fw-bold">Role: </span>
                        {profileFormData.role}{' '}
                    </p>
                )}
                {profileFormData && profileFormData!.company_name && (
                    <p className="mb-3 text-truncate">
                        <span className="fw-bold">Company Name: </span> {profileFormData.company_name}
                    </p>
                )}

                {profileFormData && profileFormData!.address && (
                    <p className="mb-3 text-truncate">
                        <span className="fw-bold">Address: </span> {profileFormData.address}{' '}
                    </p>
                )}

                {profileFormData && profileFormData!.country && (
                    <p className="mb-3 text-truncate">
                        <span className="fw-bold">Country: </span> {profileFormData.country}{' '}
                    </p>
                )}

                <Button variant="contained" color="primary" className="mb-2" onClick={() => setShowUpdateDialog(true)}>
                    Edit Profile
                </Button>
                <br />
                <Button
                    onClick={() => {
                        localStorage.removeItem('user');
                        setAuthToken(false);
                        navigate('/');
                    }}
                    className="mb-2 text-dark"
                >
                    Logout <ExitToAppIcon className="ms-2" />
                </Button>
                {showUpdateDialog && (
                    <EditProfile
                        updateProfile={updateProfile}
                        setShowUpdateDialog={setShowUpdateDialog}
                        profileFormData={profileFormData}
                        setProfileFormData={setProfileFormData}
                    />
                )}
            </Paper>
        </Grid>
    );
};

export default Profile;
