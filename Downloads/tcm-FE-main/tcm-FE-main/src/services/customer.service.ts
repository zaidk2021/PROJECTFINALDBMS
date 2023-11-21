import { URLSearchParams } from 'url';
import APIURL from './APIURL';
// const API_URL = 'http://20.127.241.152:8000/customer';
// const API_URL = `${process.env.REACT_APP_API_URL}/customer`;
//const API_URL = 'http://127.0.0.1:8000/customer';
// const API_URL = 'http://192.168.1.73:9000/customer';
//const API_URL = 'http://192.168.1.36:8000/customer';

class CustomerService {
    //get impl by item id and customer id
    get(libraryItemId: number, customerId: number) {
        return APIURL.get(`/customer/get-library/${libraryItemId}/`)
            .then(response => {
                return response.data;
            })
            .catch(response => {
                //handle error
                return response;
            });
    }
    //save impl by impl text, item id and customer id
    save(libraryItemId: number, customerId: number, text: string) {
        return APIURL.get(`/customer/get-library/${libraryItemId}/`)
            .then(response => {
                return response.data;
            })
            .catch(response => {
                //handle error
                return response;
            });
    }
    //get all impl by library id and customer id
    getAll(libraryId: number, customerId: number) {
        return APIURL.get(`/customer/get-library/${libraryId}/`)
            .then(response => {
                return response.data;
            })
            .catch(response => {
                //handle error
                return response;
            });
    }

    addCustomerLibrary(addCustomerLibraryFormData) {
        return APIURL.post('/customer/add-customerlibrary/', addCustomerLibraryFormData)
            .then(response => {
                //handle success
                return response;
            })
            .catch(response => {
                //handle error
                return response;
            });
    }

    deleteCustomerLibraryItemsById(lib_id) {
        return APIURL.delete(`/customer/customer-lib-items/delete/${lib_id}/`, {})
            .then(response => {
                //handle success
                return response;
            })
            .catch(response => {
                //handle error
                return response;
            });
    }
    addCustomerLibraryItems(customerLibraryItemsFormData) {
        return APIURL.post('/customer/customer-lib-items/', customerLibraryItemsFormData)
            .then(response => {
                //handle success
                return response;
            })
            .catch(response => {
                //handle error
                return response;
            });
    }

    bulkAddCustomerLibraryItems(customerLibraryItemsFormData) {
        return APIURL.post('/customer/customer-lib-items/bulk/', customerLibraryItemsFormData)
            .then(response => {
                //handle success
                return response;
            })
            .catch(response => {
                //handle error
                return response;
            });
    }
    bulkRemoveCustomerLibraryItems(customerLibraryItemsFormData) {
        return APIURL.post('/customer/customer-lib-items/bulk/delete/', customerLibraryItemsFormData)
            .then(response => {
                //handle success
                return response;
            })
            .catch(response => {
                //handle error
                return response;
            });
    }
    getLibraryByCusId(customer_id: number) {
        return APIURL.get(`/customer/get-customer-libraries/${customer_id}/`, {}).then(response => {
            return response;
        });
    }
    getCusLibItemByCusIdLibId(cus_id, lib_id) {
        return APIURL.get(`/customer/get-all-customer-libitems/${cus_id}/${lib_id}/`, {}).then(response => {
            //handle success
            return response;
        });
    }
    deleteCustomerLibraryByCusIdLibId(cus_id, lib_id) {
        return APIURL.delete(`/customer/delete-customer-library/${cus_id}/${lib_id}/`, {})
            .then(response => {
                //handle success
                return response;
            })
            .catch(response => {
                //handle error
                return response;
            });
    }

    getImplementation(libraryItemId: number, customerId: number) {
        return APIURL.get(`/customer/get-customer-lib-items/${customerId}/${libraryItemId}/`).then(response => {
            return response.data;
        });
    }

    getAllImplementation(libraryId: number, customerId: number) {
        if (!customerId) customerId = 0;
        return APIURL.get(`/customer/${customerId}/library/${libraryId}/items`).then(response => {
            return response.data;
        });
    }

    updateImplementation(customerId: number, libraryItemId: number, text: string, isNew: boolean) {
        if (isNew)
            return APIURL.post(`/customer/customer-lib-items/implementation/`, {
                customer: customerId,
                implementation: text,
                libraryitem: libraryItemId
            })
                .then(response => {
                    return response.data;
                })
                .catch(response => {
                    //handle error
                    return response;
                });
        else
            return APIURL.put(`/customer/customer-lib-items/`, {
                customer: customerId,
                implementation: text,
                libraryitem: libraryItemId,
                applicable: 'True'
            })
                .then(response => {
                    return response.data;
                })
                .catch(response => {
                    //handle error
                    return response;
                });
    }

    deleteImplementation(customerId: number, libraryItemId: number) {
        return APIURL.delete(`/customer/customer-lib-items/implementation/${customerId}/${libraryItemId}/`)
            .then(response => {
                return response.data;
            })
            .catch(response => {
                //handle error
                return response;
            });
    }

    linkExpertsToCustomer(custId, experts: number[]) {
        return APIURL.put(`customer/add-expert/${custId}/`, { experts })
            .then(response => {
                return response.data;
            })
            .catch(response => {
                //handle error
                return response;
            });
    }

    getAllCustomerUsers(customerId: number, query?: URLSearchParams) {
        return APIURL.get(`/customer/get-customer-user/${customerId}?${query ? query : ''}`).then(response => {
            return response.data;
        });
    }

    updateCustomerUserStatus(userId: number, is_active: boolean) {
        return APIURL.put(`/customer/get-customer-user/${userId}`, { is_active })
            .then(response => {
                return response.data;
            })
            .catch(response => {
                //handle error
                return response;
            });
    }
    updateCustomerUser(id, userData) {
        // delete userData['email'];
        return APIURL.put(`/customer/get-customer-user/${id}`, userData)
            .then(response => {
                return response.data;
            })
            .catch(response => {
                //handle error
                return response;
            });
    }

    createCustomerUser(id, userData) {
        return APIURL.put(`/customer/get-customer-user/${id}`, userData)
            .then(response => {
                return response.data;
            })
            .catch(response => {
                //handle error
                return response;
            });
    }

    createCompanyUser(id, userData) {
        return APIURL.put(`/customer/company-user-onboarding/${id}/`, userData)
            .then(response => {
                return response.data;
            })
            .catch(response => {
                //handle error
                return response;
            });
    }

    getAllCustomers() {
        return APIURL.get(`/customer/get-customer/0`).then(response => {
            return response.data;
        });
    }

    editCompany(editFormData) {
        return APIURL.put(`/customer/company-onboarding/${editFormData.id}/`, editFormData)
            .then(response => {
                return response.data;
            })
            .catch(response => {
                //handle error
                return response;
            });
    }

    createCompany(addFormData) {
        delete addFormData['id'];
        return APIURL.post(`/customer/company-onboarding/stepper1/`, addFormData)
            .then(response => {
                return response.data;
            })
            .catch(response => {
                //handle error
                return response;
            });
    }
    createCompanyAdmin(addFormData) {
        return APIURL.post(`/customer/company-onboarding/stepper2/`, addFormData)
            .then(response => {
                return response.data;
            })
            .catch(response => {
                //handle error
                return response;
            });
    }
    // createCompany(addFormData) {
    //     delete addFormData['id'];
    //     return APIURL.post(`/customer/company-onboarding/`, addFormData)
    //         .then(response => {
    //             return response.data;
    //         })
    //         .catch(response => {
    //             //handle error
    //             return response;
    //         });
    // }
}
export default new CustomerService();
