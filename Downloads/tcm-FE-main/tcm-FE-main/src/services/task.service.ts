import moment from 'moment';
import APIURL from './APIURL';
// const API_URL = 'http://localhost:8000/task/';
// const API_URL = 'http://127.0.0.1:8000/task/';
// const API_URL = 'http://20.127.241.152:8000/tasks/';
// const API_URL = `${process.env.REACT_APP_API_URL}/tasks/`;
// const API_URL = 'http://192.168.1.73:9000/tasks/';

class TaskService {
    getAllTasks(companyId: number): Promise<any> {
        return APIURL.get(`/tasks/get-all-tasks/${companyId}/`)
            .then(response => {
                //handle success
                return response.data;
            })
            .catch(response => {
                //handle error
                return response;
            });
    }

    getLibraryItemTask(customerUserId: number, libraryItemId: number) {
        return APIURL.get(`/tasks/get-libraryItem-tasks/${customerUserId}/${libraryItemId}/`)
            .then(response => {
                return response.data;
            })
            .catch(response => {
                //handle error
                return response;
            });
    }

    addLibraryItemTask(data) {
        return APIURL.post(`/tasks/`, {
            customerUser: data.assigned_to,
            library: data.libraryId,
            libraryItem: data.libraryItemId,
            title: data.title,
            description: data.description,
            status: data.status,
            due_date: moment(data.due_date.$d).format('YYYY-MM-DD')
        })
            .then(response => {
                return response.data;
            })
            .catch(response => {
                //handle error
                return response;
            });
    }

    editLibraryItemTask(data) {
        return APIURL.put(`/tasks/${data.id}/`, {
            customerUser: data.assigned_to,
            libraryItem: data.libraryItemId,
            title: data.title,
            description: data.description,
            status: data.status,
            due_date: moment(data.due_date.$d).format('YYYY-MM-DD')
        })
            .then(response => {
                return response.data;
            })
            .catch(response => {
                //handle error
                return response;
            });
    }

    deleteTask(taskId) {
        return APIURL.delete(`/tasks/${taskId}/`)
            .then(response => {
                //handle success
                return response;
            })
            .catch(response => {
                //handle error
                return response;
            });
    }

    getAllTasksOfUser(userId: number): Promise<any> {
        return APIURL.get(`/tasks/get-my-tasks/${userId}/`)
            .then(response => {
                return response.data;
            })
            .catch(response => {
                return response;
            });
    }
}
export default new TaskService();
