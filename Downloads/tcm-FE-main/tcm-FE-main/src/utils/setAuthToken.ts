import axios from 'axios';
import APIURL from '../services/APIURL';

const setAuthToken = token => {
    if (token) {
        APIURL.defaults.headers.common['x-access-token'] = token;
    } else {
        delete APIURL.defaults.headers.common['x-access-token'];
        delete axios.defaults.headers.common['x-access-token'];
    }
};

export default setAuthToken;
