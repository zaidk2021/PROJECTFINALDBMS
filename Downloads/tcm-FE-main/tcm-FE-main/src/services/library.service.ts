import APIURL from './APIURL';

// const API_URL = 'http://20.127.241.152:8000/library/';
// const API_URL = `${process.env.REACT_APP_API_URL}/library/`;
//const API_URL = 'http://127.0.0.1:8000/library/';
// const API_URL = 'http://192.168.1.73:9000/library/';
// const API_URL = 'http://192.168.1.36:8000/library/';

class LibraryService {
    get(id: number) {
        return APIURL.get(`/library/get-library/${id}/`)
            .then(response => {
                return response.data;
            })
            .catch(response => {
                //handle error
                return console.log(response);
            });
    }

    // 1- Get Libraries List Data
    getAllLibraries(): Promise<any> {
        return APIURL.get(`/library/get-library/0/`, {})
            .then(response => {
                //handle success
                return response.data;
            })
            .catch(response => {
                //handle error
                return response;
            });
    }
    // 2- Add Library
    addLibrary(addLibraryData) {
        return APIURL.post(`/library/`, addLibraryData)
            .then(response => {
                //handle success
                return response;
            })
            .catch(response => {
                //handle error
                return response;
            });
    }

    // 3- Edit Library
    editLibrary(editLibraryData) {
        const library_id = editLibraryData.id;
        return APIURL.put(`/library/${library_id}`, editLibraryData)
            .then(response => {
                //handle success
                return response;
            })
            .catch(response => {
                //handle error
                return response;
            });
    }

    deleteLibrary(library_id) {
        return APIURL.delete(`/library/${library_id}`)
            .then(response => {
                //handle success
                return response;
            })
            .catch(response => {
                //handle error
                return response;
            });
    }
    // 3- Get single Library by Id
    getLibraryById(library_id: number) {
        return APIURL.get(`/library/get-library/${library_id}/`, {})
            .then(response => {
                //handle success
                return response;
            })
            .catch(response => {
                //handle error
                return response;
            });
    }
    // 4- Get Library Item by Library & Item Id
    getLibItemByLibIdItemId(library_id: number, item_id: number) {
        return APIURL.get(`/library/get-item/${library_id}/${item_id}/`, {})
            .then(response => {
                //handle success
                return response;
            })
            .catch(response => {
                //handle error
                return response;
            });
    }
    // 5- Get Library Item by Library & Parent Id
    getLibItemByLibIdParentId(library_id: number, parent_id: number) {
        return APIURL.get(`/library/get-item-by-parent/${library_id}/${parent_id}/`, {})
            .then(response => {
                //handle success
                return response;
            })
            .catch(response => {
                //handle error
                return response;
            });
    }
    // 6- Get Library Item by Library & Level Id
    getLibItemByLibIdLevelId(library_id: number, level_id: number) {
        return APIURL.get(`/library/get-item-by-level/${library_id}/${level_id}/`, {})
            .then(response => {
                //handle success
                return response;
            })
            .catch(response => {
                //handle error
                return response;
            });
    }

    // 7- Get Library Items by Library Id
    getLibItemsByLibId(library_id: number) {
        return APIURL.get(`/library/get-item-by-libid/${library_id}/`, {})
            .then(response => {
                //handle success
                return response;
            })
            .catch(response => {
                //handle error
                return response;
            });
    }
}
export default new LibraryService();
