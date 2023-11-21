import APIURL from './APIURL';

// const `/history/` = `${process.env.REACT_APP_`/history/  `}/history/`;
// const `/history/` = 'http://20.127.241.152:8000/history/'; //Server
//const API_URL = 'http://127.0.0.1:8000/history/'; //Local
// const API_URL = 'http://192.168.1.73:9000/history/';

class AuditTrailService {
    getLibraryHistory(id: number) {
        return APIURL.get(`/history/` + `library/${id}`, {})
            .then(response => {
                return response.data;
            })
            .catch(response => {
                //handle error
                return response;
            });
    }
    getLibraryItemsHistory(id: number) {
        return APIURL.get(`/history/` + `library/${id}`, {})
            .then(response => {
                return response.data;
            })
            .catch(response => {
                //handle error
                return response;
            });
    }
    getHistoryAudit(query) {
        return APIURL.get(`/history/` + `audit/${query}`, {})
            .then(response => {
                return response.data;
            })
            .catch(response => {
                //handle error
                return response;
            });
    }

    getLibraryHistoryAudit(id, query) {
        return APIURL.get(`/history/audit/${id}?${query}`)
            .then(response => {
                return response.data;
            })
            .catch(response => {
                //handle error
                return response;
            });
    }
}
export default new AuditTrailService();
