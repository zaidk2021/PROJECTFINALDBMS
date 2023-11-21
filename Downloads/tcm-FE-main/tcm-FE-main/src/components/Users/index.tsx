import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import '../../librarylogs.css';
import { Checkbox } from '@mui/material';
import customerService from '../../services/customer.service';
import swal from 'sweetalert';
import errorHandler from '../../utils/errorHandler';

const Users = () => {
    const [userData, setUserData] = React.useState<any[]>([]);

    const [companyId, setCompanyId] = useState<any>();
    const [companyUserId, setCompanyUserId] = useState<any>();

    // Get Token From Local Storage
    useEffect(() => {
        const userData: any = localStorage.getItem('user');
        const parsedData = JSON.parse(userData);
        const { cusid, customerUserid } = parsedData.user_info;
        setCompanyUserId(customerUserid);
        setCompanyId(cusid);
    }, []);

    const fetchUsers = () => {
        customerService
            .getAllCustomerUsers(companyId)
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
        if (companyId) {
            fetchUsers();
        }
    }, [companyId]);

    const handleChange = (value, userId) => {
        customerService
            .updateCustomerUserStatus(userId, value)
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
            .catch(error => {
                errorHandler(error);
            });
    };

    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Name',
            flex: 2,
            headerAlign: 'center'
        },
        {
            field: 'user',
            headerName: 'Email',
            flex: 3,
            headerAlign: 'center'
        },
        {
            field: 'is_active',
            headerName: 'Is Active',
            flex: 1,
            sortable: false,
            cellClassName: 'd-flex justify-content-center',
            headerAlign: 'center',
            renderCell: ({ row }) => (
                <>
                    <Checkbox
                        name="is_active"
                        checked={row.is_active}
                        onChange={e => handleChange(e.target.checked, row.id)}
                    />
                </>
            )
        }
    ];

    return (
        <>
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', mx: 2, my: 2 }}>
                    <Typography variant="h3" component="h3">
                        All Users
                    </Typography>
                </Box>
                <div style={{ height: 500, width: '100%' }}>
                    <DataGrid
                        sx={{
                            '.MuiDataGrid-columnSeparator': {
                                display: 'none'
                            },
                            '&.MuiDataGrid-root': {
                                border: 'none'
                            },
                            '& .MuiDataGrid-renderingZone': {
                                maxHeight: 'none !important'
                            },
                            '& .MuiDataGrid-cell': {
                                lineHeight: 'unset !important',
                                maxHeight: 'none !important',
                                whiteSpace: 'normal'
                            },
                            '& .MuiDataGrid-row': {
                                maxHeight: 'none !important'
                            }
                        }}
                        rows={userData ? userData : []}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        disableColumnSelector
                        disableDensitySelector
                        disableSelectionOnClick
                    />
                </div>
            </Box>
        </>
    );
};
export default Users;
