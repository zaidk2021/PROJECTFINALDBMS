import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { GridColDef } from '@mui/x-data-grid';
import '../../librarylogs.css';
import customerService from '../../services/customer.service';
import swal from 'sweetalert';
import AddEditUserDialog from './AddEditUserDialog';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Stack, Checkbox, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { useLocation, useParams } from 'react-router';
import errorHandler from '../../utils/errorHandler';
import DataGridTable from '../Common/DataGrid';

interface LocationState {
    company_name: string;
}

const Users = () => {
    const location = useLocation();
    const { id } = useParams();
    const [userData, setUserData] = React.useState<any[]>([]);
    interface UserDataType {
        id: number | null;
        first_name: string;
        last_name: string;
        email: string;
        role: string;
        is_active: boolean;
        address?: string;
        country?: string;
        phone_number?: number | null;
    }

    const [showAddEditUserDialog, setShowAddEditUserDialog] = useState(false);
    const [fromEdit, setFromEdit] = useState(false);
    const [tabValue, setTabValue] = useState('all');
    const [companyId, setCompanyId] = useState<any>();
    const [companyUserId, setCompanyUserId] = useState<any>();
    const [companyName, setCompanyName] = useState<any>('');
    const [userFormData, setUserFormData] = React.useState<UserDataType>({
        id: null,
        first_name: '',
        last_name: '',
        email: '',
        role: '',
        is_active: true,
        address: '',
        country: '',
        phone_number: null
    });

    // Get Token From Local Storage
    useEffect(() => {
        const userData: any = localStorage.getItem('user');
        const parsedData = JSON.parse(userData);
        const { cusid, customerUserid } = parsedData.user_info;
        setCompanyUserId(customerUserid);
        setCompanyId(cusid);
        let state = location.state as LocationState;
        if (state) {
            setCompanyName(state.company_name);
        }
    }, []);

    const handleTabChange = (_, value) => {
        setTabValue(value);
    };

    const fetchUsers = () => {
        customerService
            .getAllCustomerUsers(id || companyId, new URLSearchParams({ is_active: tabValue }))
            .then(data => {
                if (data.data) {
                    const users = data.data.filter(item => item.id !== companyUserId);
                    setUserData(users);
                }
            })
            .catch(error => {
                errorHandler(error);
            });
    };

    useEffect(() => {
        if (id || companyId) {
            fetchUsers();
        }
    }, [companyId, id, tabValue]);

    const AddUpdateUser = () => {
        if (fromEdit) {
            customerService
                .updateCustomerUser(id || companyId, userFormData)
                .then(data => {
                    if (data.success) {
                        fetchUsers();
                        setShowAddEditUserDialog(false);
                        swal({
                            title: 'User Updated!',
                            icon: 'success',
                            timer: 2000
                        });
                    } else {
                        errorHandler(data);
                    }
                })
                .catch(error => {
                    errorHandler(error);
                });
        } else {
            customerService
                .createCompanyUser(id || companyId, userFormData)
                .then(data => {
                    if (data.success) {
                        fetchUsers();
                        setShowAddEditUserDialog(false);
                        swal({
                            title: 'User Created!',
                            icon: 'success',
                            timer: 2000
                        });
                    } else {
                        errorHandler(data);
                    }
                })
                .catch(error => {
                    errorHandler(error);
                });
        }
    };

    const handleActive = value => {
        customerService
            .updateCustomerUser(id || companyId, value)
            .then(data => {
                if (data.success) {
                    fetchUsers();
                    swal({
                        title: 'User Updated!',
                        icon: 'success',
                        timer: 2000
                    });
                } else {
                    errorHandler(data);
                }
            })
            .catch(error => errorHandler(error));
    };

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'Sr.No', width: 70 },
        {
            field: 'name',
            headerName: 'Name',
            flex: 2
        },
        {
            field: 'user_email',
            headerName: 'Email',
            flex: 3
        },
        {
            field: 'role',
            headerName: 'Role',
            flex: 2
        },
        {
            field: 'is_active',
            headerName: 'Is Active',
            flex: 1,
            sortable: false,
            align: 'center',
            headerAlign: 'center',
            renderCell: ({ row }) => (
                <>
                    <Checkbox
                        name="is_active"
                        checked={row.is_active}
                        onChange={e => {
                            handleActive({ id: row.id, is_active: e.target.checked });
                        }}
                    />
                </>
            )
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            sortable: false,
            cellClassName: 'd-flex justify-content-around',
            renderCell: ({ row }) => (
                <>
                    <button
                        onClick={() => {
                            setUserFormData(prev => ({
                                ...prev,
                                id: row.id,
                                first_name: row.user.first_name,
                                last_name: row.user.last_name,
                                email: row.user_email,
                                role: row.role,
                                is_active: row.is_active,
                                phone_number: row.user.phone_number,
                                address: row.user.address,
                                country: row.user.country
                            }));
                            setShowAddEditUserDialog(true);
                            setFromEdit(true);
                        }}
                        title="Edit User"
                        style={{ cursor: 'pointer' }}
                        className="btn btn-icon btn-light btn-hover-danger btn-sm mx-1"
                    >
                        <span className="svg-icon svg-icon-md svg-icon-danger">
                            <EditIcon />{' '}
                        </span>
                    </button>
                </>
            )
        }
    ];

    return (
        <>
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mx: 2, my: 2, px: 1 }}>
                    <Typography variant="h6" component="h6">
                        {companyName} Users :
                    </Typography>
                    <Stack direction="row" spacing={2}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                setFromEdit(false);
                                setShowAddEditUserDialog(true);
                                setUserFormData(prev => ({
                                    ...prev,
                                    id: null,
                                    first_name: '',
                                    last_name: '',
                                    email: '',
                                    role: '',
                                    address: '',
                                    country: '',
                                    phone_number: null
                                }));
                            }}
                            style={{ textTransform: 'none' }}
                        >
                            New User
                        </Button>
                    </Stack>
                </Box>
                <ToggleButtonGroup
                    color="primary"
                    value={tabValue}
                    exclusive
                    onChange={handleTabChange}
                    className="mb-3"
                    aria-label="User Types"
                >
                    <ToggleButton value="all">All</ToggleButton>
                    <ToggleButton value="active">Active</ToggleButton>
                    <ToggleButton value="inactive">In Active</ToggleButton>
                </ToggleButtonGroup>

                <div className="px-4 mb-5" style={{ width: '100%', minHeight: '200px' }}>
                    <DataGridTable columns={columns} data={userData ? userData : []} clientPagination />
                </div>

                {showAddEditUserDialog && (
                    <AddEditUserDialog
                        userFormData={userFormData}
                        setUserFormData={setUserFormData}
                        AddUpdateUser={AddUpdateUser}
                        setShowAddEditUserDialog={setShowAddEditUserDialog}
                        fromEdit={fromEdit}
                    />
                )}
            </Box>
        </>
    );
};
export default Users;
