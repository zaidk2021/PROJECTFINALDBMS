import APIURL from './APIURL';

// const API_URL = 'http://20.127.241.152:8000/experts/';
// const API_URL = `${process.env.REACT_APP_API_URL}/experts/`;
//const API_URL = 'http://127.0.0.1:8000/experts/';
//const API_URL = 'http://192.168.1.26:8000/experts/';
//const API_URL = 'http://192.168.1.73:9000/experts/';

class ExpertService {
    createExpert(data) {
        return APIURL.post(`/experts/onboarding/`, data)
            .then(response => {
                //handle success
                return response;
            })
            .catch(response => {
                //handle error
                return response;
            });
    }

    updateExpert(data) {
        return APIURL.put(`/experts/update/${data.id}/`, data)
            .then(response => {
                //handle success
                return response;
            })
            .catch(response => {
                //handle error
                return response;
            });
    }

    editExpert(editExpertFormData) {
        return APIURL.put(`/experts/${editExpertFormData.id}/`, editExpertFormData)
            .then(response => {
                //handle success
                return response;
            })
            .catch(response => {
                //handle error
                return response;
            });
    }

    addExpertLibrary(addExpertLibraryFormData) {
        return APIURL.post('/experts/add-expertlibrary/', addExpertLibraryFormData)
            .then(response => {
                //handle success
                return response;
            })
            .catch(response => {
                //handle error
                return response;
            });
    }
    addExpertInterpretation(addExpertInterpretationFormData) {
        return APIURL.post('/experts/interpretation', addExpertInterpretationFormData)
            .then(response => {
                //handle success
                return response;
            })
            .catch(response => {
                //handle error
                return response;
            });
    }
    getExpInterByLibId(library_id: number) {
        return APIURL.get(`/experts/interpretation/${library_id}`).then(response => {
            //handle success
            return response;
        });
    }
    getExpInterByLibItemId(libraryItem_id: number) {
        return APIURL.get(`/experts/interpretation-by-libitem/${libraryItem_id}`).then(response => {
            //handle success
            return response;
        });
    }
    //Experts Libraries
    getLibraryByExpId(expert_id: number) {
        return APIURL.get(`/experts/get-library-by-expert/${expert_id}/`).then(response => {
            //handle success
            return response;
        });
    }
    getExpInterByLibItemIdCusId(libitem_id, cus_id) {
        return APIURL.delete(`/experts/interpretation-by-libitem/${libitem_id}/${cus_id}`).then(response => {
            return response;
        });
    }
    deleteExpertLibraryByLibIdExpID(lib_id, exp_id) {
        return APIURL.delete(`/experts/expertlibrary/${lib_id}/${exp_id}/`)
            .then(response => {
                //handle success
                return response;
            })
            .catch(response => {
                //handle error
                return response;
            });
    }

    getInterpretation(libraryItemId: number, expertId: number) {
        return APIURL.get(`/experts/interpretation-by-libitem/${libraryItemId}/${expertId}`).then(response => {
            return response.data;
        });
    }

    getAllInterpretation(libraryId: number, expertId: number) {
        if (!expertId) expertId = 0;
        return APIURL.get(`/experts/${expertId}/library/${libraryId}/items`).then(response => {
            return response.data;
        });
    }

    getAllInterpretationbyLibId(libraryId: number) {
        return APIURL.get(`/experts/interpretation/${libraryId}/`).then(response => {
            return response.data;
        });
    }

    updateInterpretation(
        libraryId: number,
        libraryItemId: number,
        expertId: number,
        text: string,
        interpretationId?: number
    ) {
        if (interpretationId == null || interpretationId == 0)
            return APIURL.post(`/experts/interpretation/`, {
                expert: expertId,
                library: libraryId,
                text: text,
                libraryitem: libraryItemId
            })
                .then(response => {
                    return response.data.data;
                })
                .catch(response => {
                    //handle error
                    return response;
                });
        else
            return APIURL.put(`/experts/interpretation/${interpretationId}/`, {
                expert: expertId,
                library: libraryId,
                text: text,
                libraryitem: libraryItemId
            })
                .then(response => {
                    return response.data.data;
                })
                .catch(response => {
                    //handle error
                    return response;
                });
    }

    deleteInterpretation(libraryItemId: number, expertId: number) {
        return APIURL.delete(`/experts/interpretation/${libraryItemId}/${expertId}`).then(response => {
            return response.data;
        });
    }

    getAllExperts() {
        return APIURL.get(`/experts/0/`).then(response => {
            return response.data;
        });
    }
    addExpertLibraryBulk(addExpertLibraries) {
        return APIURL.post(`/experts/add-expertlibrary-bulk/`, addExpertLibraries).then(response => {
            return response.data;
        });
    }
    deleteExpertLinkedLibrary(deleteExpertLibraries) {
        return APIURL.post(`/experts/delete-expertlibrary-bulk/`, deleteExpertLibraries)
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
export default new ExpertService();
