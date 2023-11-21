// const API_URL = 'http://20.127.241.152:8000/library';
// const API_URL = `${process.env.REACT_APP_API_URL}/library`;
//const API_URL = 'http://127.0.0.1:8000/library';
// const API_URL = 'http://192.168.1.73:9000/library';
// const API_URL = 'http://192.168.1.36:8000/library';

import APIURL from './APIURL';

class LibraryItemService {
    get(libraryId: number, libraryItemId: number) {
        return APIURL.get(`/library/get-item/${libraryId}/${libraryItemId}`).then(response => {
            return response.data;
        });
    }

    getAll(libraryId: number) {
        return APIURL.get(`/library/item/${libraryId}/`).then(response => {
            return response.data;
        });
    }

    getByLevel(libraryId: number, level: number) {
        return APIURL.get(`/library/get-item-by-level/${libraryId}/${level}/`).then(response => {
            return response.data;
        });
    }

    getByParent(libraryId: number, parent: number) {
        return APIURL.get(`/library/get-item-by-parent/${libraryId}/${parent}/`).then(response => {
            return response.data;
        });
    }

    getByRoot(libraryId: number, root: number) {
        return APIURL.get(`/library/item-by-root/${libraryId}/${root}/`).then(response => {
            return response.data;
        });
    }

    update(
        libraryId: number,
        libraryItemId: number,
        parent: number,
        nr: string,
        title: string,
        type: string,
        level: number,
        sequence: number,
        currentUserId?: number
    ) {
        var data = {
            library: libraryId,
            type: type,
            level: level,
            number: nr,
            title: title,
            sequence: sequence,
            currentUserId: currentUserId
        };
        console.log(data);
        if (parent > 0) data['parent'] = parent;
        if (libraryItemId !== 0)
            return APIURL.put(`/library/item/${libraryItemId}/`, data).then(response => {
                return response.data;
            });
        else
            return APIURL.post(`/library/item/`, data).then(response => {
                console.log('post');
                return response.data;
            });
    }

    delete(libraryItemId: number) {
        return APIURL.delete(`/library/item/${libraryItemId}/`)
            .then(response => {
                return response.data;
            })
            .catch(response => {
                //handle error
                return response;
            });
    }

    reorder(libraryItemId1: number, sequence1: number, libraryItemId2: number, sequence2: number) {
        var data = {
            item1: libraryItemId1,
            item2: libraryItemId2,
            sequence1: sequence1,
            sequence2: sequence2
        };
        return APIURL.post(`library/update-sequence/`, data).then(response => {
            return response.data;
        });
    }
}
export default new LibraryItemService();
