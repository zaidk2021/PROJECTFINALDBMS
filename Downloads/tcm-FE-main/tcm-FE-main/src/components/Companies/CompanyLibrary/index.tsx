import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { GridColDef } from '@mui/x-data-grid';
import libraryService from '../../../services/library.service';
import { Checkbox } from '@mui/material';
import customerService from '../../../services/customer.service';
import swal from 'sweetalert';
import { useParams } from 'react-router';
import errorHandler from '../../../utils/errorHandler';
import DataGridTable from '../../Common/DataGrid';

const CompanyLibrary = () => {
    const [libraries, setLibraries] = React.useState<any[]>([]);
    const [libraryKeys, setLibraryKeys] = React.useState<any[]>([]);
    const params = useParams();
    const customerId = params.id;

    const fetchCompanyLibraries = () => {
        if (customerId) {
            customerService
                .getLibraryByCusId(parseInt(customerId))
                .then(data => {
                    if (data.data.data.length > 0) {
                        let libraryKeys: number[] = [];
                        data.data.data.map(item => libraryKeys.push(item.library.id));
                        setLibraryKeys(libraryKeys);
                    } else {
                        setLibraryKeys([]);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
    };

    const fetchLibraries = () => {
        libraryService
            .getAllLibraries()
            .then(data => {
                setLibraries(data.data);
                fetchCompanyLibraries();
            })
            .catch(error => {
                errorHandler(error);
            });
    };

    useEffect(() => {
        fetchLibraries();
    }, []);

    const handleChange = (value, id) => {
        if (value) {
            const addCustomerLibraryFormData = {
                customer: customerId,
                library: id
            };
            customerService
                .addCustomerLibrary(addCustomerLibraryFormData)
                .then(data => {
                    if (data.data.success) {
                        fetchLibraries();
                        swal({
                            title: 'Library has been Added!',
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
                .deleteCustomerLibraryByCusIdLibId(customerId, id)
                .then(data => {
                    if (data.data.success) {
                        swal({
                            title: 'Your Library has been deleted!',
                            icon: 'success',
                            timer: 2000
                        });
                        fetchLibraries();
                    } else {
                        swal({
                            title: 'Unable to delete, Library is being referenced by some library item.',
                            icon: 'error',
                            timer: 2000
                        });
                    }
                })
                .catch(error => {
                    errorHandler(error);
                });
        }
    };

    const columns: GridColDef[] = [
        { field: 'id', headerName: '#', width: 70 },
        {
            field: 'identifier',
            headerName: 'Identifier',
            minWidth: 150,
            renderCell: ({ row }) => {
                const identifier = row.identifier ? row.identifier : '';
                return (
                    <p title={identifier} className="text-truncate mb-0">
                        {identifier}
                    </p>
                );
            }
        },
        { field: 'title', headerName: 'Title', flex: 1 },
        {
            field: 'version',
            headerName: 'Version',
            type: 'number',
            minWidth: 90,
            align: 'left'
        },
        {
            field: 'text',
            headerName: 'Text',
            sortable: false,
            minWidth: 200,
            renderCell: ({ row }) => {
                const text = row.text ? row.text : '';
                return (
                    <p title={text} className="text-truncate mb-0">
                        {text}
                    </p>
                );
            }
        },
        {
            field: 'licenseCost',
            headerName: 'License Cost',
            sortable: false,
            width: 160
        },
        {
            field: 'action',
            headerName: 'Action',
            sortable: false,
            width: 160,
            renderCell: ({ row }) => (
                <>
                    <Checkbox
                        checked={libraryKeys.includes(row.id)}
                        onChange={e => handleChange(e.target.checked, row.id)}
                    />
                </>
            )
        }
    ];

    return (
        <>
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <Box sx={{ display: 'flex', my: 2, px: 3 }}>
                    <Typography variant="h6" component="h2">
                        Libraries :
                    </Typography>
                </Box>

                <div className="px-4 mb-5" style={{ width: '100%', minHeight: '200px' }}>
                    <DataGridTable columns={columns} data={libraries ? libraries : []} clientPagination />
                </div>
            </Box>
        </>
    );
};
export default CompanyLibrary;
