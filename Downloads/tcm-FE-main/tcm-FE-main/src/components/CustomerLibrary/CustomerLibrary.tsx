import React, { useEffect, useState } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomerService from '../../services/customer.service';
import Button from '@mui/material/Button';
import ConfirmationDialogue from './../LibraryCrud/ConfirmationDialogue';
import swal from 'sweetalert';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ArticleIcon from '@mui/icons-material/Article';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import Box from '@mui/material/Box';
import { Link, useNavigate } from 'react-router-dom';
import CustomerLibraryItemsModal from './CustomerLibraryItemsModal';
import { Typography } from '@mui/material';
import DataGridTable from '../Common/DataGrid';
import errorHandler from '../../utils/errorHandler';

function CustomerLibrary() {
    // const [showAddCusLibrary, setShowAddCusLibrary] = useState(false);
    // const [addCusLibraryDone, setAddCusLibraryDone] = useState(false);
    const [customerLibrariesRow, setCustomerLibrariesRow] = useState([]);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [confirmDeleteDone, setConfirmDeleteDone] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showCustomerLibraryItems, setShowCustomerLibraryItems] = useState(false);
    const [_customerLibraryModal, setCustomerLibraryModal] = useState(false);

    const [selectedData, setSelectedData] = useState({
        id: null,
        identifier: '',
        title: '',
        version: '',
        text: '',
        licenseNeeded: '',
        licenseCost: 0
    });

    const [customerId, setCustomerId] = useState<any>();
    const [userRole, setUserRole] = useState<any>();
    const [userId, setUserId] = useState<any>();
    const [customerUserId, setCustomerUserId] = useState<any>();

    // Get Token From Local Storage
    useEffect(() => {
        const userData: any = localStorage.getItem('user');
        const parsedData = JSON.parse(userData);
        const { cusid, role, id, customerUserid } = parsedData.user_info;
        setCustomerId(cusid);
        setUserRole(role);
        setUserId(id);
        setCustomerUserId(customerUserid);
    }, []);

    useEffect(() => {
        if (customerId) {
            fetchCustomerLibraries();
        }
        //eslint-disable-next-line
    }, [customerId]);

    const fetchCustomerLibraries = () => {
        if (customerId) {
            CustomerService.getLibraryByCusId(customerId)
                .then(data => {
                    if (data.data.data.length === 0) {
                        setCustomerLibrariesRow([]);
                        swal({
                            title: 'No Libraries Found!',
                            icon: 'warning',
                            timer: 2000
                        });
                    } else {
                        const librariesofCustomer = data.data.data.map(current => current.library);
                        setCustomerLibrariesRow(librariesofCustomer);
                    }
                })
                .catch(error => errorHandler(error));
        }
    };

    // UseEffects
    useEffect(() => {
        fetchCustomerLibraries();
        //eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (confirmDeleteDone) {
            setOpenConfirm(false);
            const cus_id = customerId;
            const lib_id = selectedData.id;
            CustomerService.deleteCustomerLibraryByCusIdLibId(cus_id, lib_id)
                .then(data => {
                    if (data.status === 200) {
                        fetchCustomerLibraries();
                        swal({
                            title: 'Your Library has been deleted!',
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
        setConfirmDeleteDone(false);
    }, [confirmDeleteDone]);

    const navigate = useNavigate();

    const columns: GridColDef[] = [
        { field: 'id', headerName: '#', width: 70 },
        {
            field: 'identifier',
            headerName: 'Identifier',
            width: 130,
            renderCell: ({ row }) => {
                const identifier = row.identifier ? row.identifier : '';
                return (
                    <p title={identifier} className="text-truncate mb-0">
                        {identifier}
                    </p>
                );
            }
        },
        { field: 'title', headerName: 'Title', width: 450 },
        {
            field: 'version',
            headerName: 'Version',
            type: 'number',
            minWidth: 100,
            align: 'left',
            headerAlign: 'left'
        },
        {
            field: 'text',
            headerName: 'Text',
            sortable: false,
            flex: 1,
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
            field: 'actions',
            headerName: 'Actions',
            sortable: false,
            minWidth: 230,
            renderCell: ({ row }) => (
                <>
                    {userRole !== 'Customer User' && (
                        <>
                            {' '}
                            <button
                                onClick={() => {
                                    setSelectedData(row);
                                    setShowCustomerLibraryItems(true);
                                    setCustomerLibraryModal(true);
                                }}
                                style={{ cursor: 'pointer' }}
                                className="btn btn-icon btn-light btn-hover-danger btn-sm mx-1"
                            >
                                <span className="svg-icon svg-icon-md svg-icon-danger">
                                    <ListAltIcon />
                                </span>
                            </button>
                            <button
                                onClick={() => {
                                    setSelectedData(row);
                                    setOpenConfirm(true);
                                    setShowConfirmation(true);
                                }}
                                style={{ cursor: 'pointer', marginRight: '20px', marginLeft: '20px' }}
                                className="btn btn-icon btn-light btn-hover-danger btn-sm mx-1"
                            >
                                <span className="svg-icon svg-icon-md svg-icon-danger">
                                    <DeleteIcon />
                                </span>
                            </button>{' '}
                        </>
                    )}

                    <button
                        onClick={() => {
                            // window.location.href = `/library/${row.id}`;
                            navigate(`/library/${row.id}`);
                        }}
                        style={{ cursor: 'pointer' }}
                        className="btn btn-icon btn-light btn-hover-danger btn-sm mx-1"
                    >
                        <span className="svg-icon svg-icon-md svg-icon-danger">
                            <ArticleIcon />
                        </span>
                    </button>

                    <Link to={`/tasks/${customerUserId}/${row.id}`} style={{ textDecoration: 'none' }}>
                        <button
                            style={{ cursor: 'pointer', marginLeft: '20px' }}
                            className="btn btn-icon btn-light btn-hover-danger btn-sm mx-1"
                        >
                            <span className="svg-icon svg-icon-md svg-icon-danger">
                                <PlaylistAddCheckIcon />
                            </span>
                        </button>
                    </Link>
                </>
            )
        }
    ];

    return (
        <>
            <Box mx={3} my={2} display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" component="h6">
                    Customer Library:
                </Typography>
                <Box>
                    <Link to={`/tasks/${userId}`} className="me-2" style={{ textDecoration: 'none' }}>
                        <Button color="primary" variant="contained">
                            <Typography style={{ textTransform: 'none' }}>My Tasks</Typography>
                        </Button>
                    </Link>
                    {userRole === 'Customer Admin' && (
                        <Link to="/tasks" style={{ textDecoration: 'none' }}>
                            <Button color="primary" variant="contained">
                                <Typography style={{ textTransform: 'none' }}>All Tasks</Typography>
                            </Button>
                        </Link>
                    )}
                </Box>
            </Box>
            <div className="px-4 mb-5" style={{ width: '100%', minHeight: '200px' }}>
                <DataGridTable
                    columns={columns}
                    data={customerLibrariesRow ? customerLibrariesRow : []}
                    clientPagination
                />
            </div>

            {showConfirmation && (
                <ConfirmationDialogue
                    selectedData={selectedData}
                    setOpenConfirm={setOpenConfirm}
                    openConfirm={openConfirm}
                    setConfirmDeleteDone={setConfirmDeleteDone}
                />
            )}
            {showCustomerLibraryItems && (
                <CustomerLibraryItemsModal
                    show={showCustomerLibraryItems}
                    close={setShowCustomerLibraryItems}
                    libraryId={selectedData.id}
                />
            )}
        </>
    );
}

export default CustomerLibrary;
