// const API_URL = 'http://20.127.241.152:8000/api/test/';
// const API_URL = `${process.env.REACT_APP_API_URL}/api/test/`;
//const API_URL = 'http://127.0.0.1:8000/api/test/';
//const API_URL = 'http://192.168.1.73:9000/api/test/';

import APIURL from './APIURL';

// const API_URL = 'http://192.168.1.26:8000/api/test/';

class UserService {
    getPublicContent() {
        return APIURL.get(`/api/test/` + 'all');
    }
    getUserBoard() {
        return APIURL.get(`/api/test/` + 'user');
    }
    getModeratorBoard() {
        return APIURL.get(`/api/test/` + 'mod');
    }
    getAdminBoard() {
        return APIURL.get(`/api/test/` + 'admin');
    }
}
export default new UserService();
