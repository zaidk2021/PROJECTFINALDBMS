import setAuthToken from '../utils/setAuthToken';
import APIURL from './APIURL';
// const API_URL = 'http://20.127.241.152:8000/accounts/';
//const API_URL = 'http://127.0.0.1:8000/accounts/';
// const API_URL = 'http://192.168.1.37:9000/accounts/';
// const API_URL = `${process.env.REACT_APP_API_URL}/accounts/`;
// const API_URL = 'http://192.168.1.73:9000/accounts/';

class AuthService {
    register(formData) {
        return APIURL.post('/accounts/register/nt/', formData)
            .then(response => {
                return response.data;
            })
            .catch(response => {
                return response;
            });
    }

    login(email: string, password: string) {
        return APIURL.post('/accounts/login/nt/', {
            email: email,
            password: password
        })
            .then(response => {
                if (response.data.access_token) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                    setAuthToken(response.data.access_token);
                }
                return response.data;
            })
            .catch(response => {
                return response;
            });
    }
    logout() {
        return APIURL.post('/accounts/logout/nt/').then(response => {
            localStorage.removeItem('user');
            return response.data;
        });
    }
    forgotPassword(email: string) {
        return APIURL.post('/accounts/send-otp/nt/', {
            email: email
        })
            .then(response => {
                return response.data;
            })
            .catch(response => {
                return response;
            });
    }
    resetPassword(email: string, otp: string, password: string) {
        return APIURL.post('/accounts/reset-password/nt/', {
            email: email,
            otp: otp,
            new_password: password
        })
            .then(response => {
                return response.data;
            })
            .catch(response => {
                return response;
            });
    }
    getCurrentUser() {
        // const userStr = localStorage.getItem('user');
        // if (userStr) return JSON.parse(userStr);
        // return null;
        return APIURL.get(`/accounts/me/`).then(response => {
            return response;
        });
    }

    updateCurrentUser(data) {
        // delete data['email'];
        return APIURL.put(`/accounts/update-user/${data.id}`, data).then(response => {
            const userStr = localStorage.getItem('user');
            if (userStr) {
                let newUser = JSON.parse(userStr);
                delete newUser['user_info'];
                newUser['user_info'] = response.data.data;
                localStorage.setItem('user', JSON.stringify(newUser));
            }

            return response.data;
        });
    }
}
export default new AuthService();
