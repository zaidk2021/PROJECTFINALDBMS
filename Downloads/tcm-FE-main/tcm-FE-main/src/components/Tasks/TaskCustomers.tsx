import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { GridColDef } from '@mui/x-data-grid';
import moment from 'moment';
import '../../librarylogs.css';
import TaskService from '../../services/task.service';
import AddTask from './AddEditTask';
import { Stack, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TaskDeleteDialog from './TaskDeleteDialog';
import swal from 'sweetalert';
import { useParams } from 'react-router';
import DataGridTable from '../Common/DataGrid';
import errorHandler from '../../utils/errorHandler';
import { Link } from 'react-router-dom';

function TaskCustomers() {
    const [taskData, setTaskData] = React.useState<any[]>([]);

    const [selectedData, setSelectedData] = React.useState({
        id: undefined,
        title: '',
        description: '',
        libraryId: null,
        libraryItemId: null,
        assigned_to: null,
        status: '',
        due_date: null
    });
    const [showAddTaskModel, setShowAddTaskModel] = useState<boolean>(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
    const [confirmDeleteDone, setConfirmDeleteDone] = useState<boolean>(false);
    const [submitDone, setSubmitDone] = useState<boolean>(false);
    const [fromEdit, setFromEdit] = useState<boolean>(false);
    const [userRole, setUserRole] = useState<any>();

    const [companyId, setCompanyId] = useState<any>();
    const [companyUserId, setCompanyUserId] = useState<any>();

    const params = useParams();

    // Get Token From Local Storage
    useEffect(() => {
        const userData: any = localStorage.getItem('user');
        const parsedData = JSON.parse(userData);
        const { cusid, customerUserid, role } = parsedData.user_info;
        setCompanyId(cusid);
        setUserRole(role);
        setCompanyUserId(customerUserid);
    }, []);
    const fetchTasks = () => {
        if (params.id) {
            TaskService.getAllTasksOfUser(companyUserId)
                .then(data => {
                    setTaskData(data.data);
                })
                .catch(error => {
                    console.log(error);
                });
        } else if (params.customerUserId && params.libraryId) {
            TaskService.getLibraryItemTask(+params.customerUserId, +params.libraryId)
                .then(data => {
                    setTaskData(data.data);
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            TaskService.getAllTasks(companyId)
                .then(data => {
                    setTaskData(data.data);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    };

    useEffect(() => {
        if (companyId) {
            fetchTasks();
        }
    }, [companyId, params]);

    useEffect(() => {
        if (submitDone) {
            fetchTasks();
            setSubmitDone(false);
        }
    }, [submitDone]);

    useEffect(() => {
        if (confirmDeleteDone) {
            setShowDeleteDialog(false);
            TaskService.deleteTask(selectedData.id)
                .then(data => {
                    if (data.data.success) {
                        setShowDeleteDialog(false);
                        fetchTasks();
                        swal({
                            title: 'Task has been deleted!',
                            icon: 'success',
                            timer: 2000
                        });
                        fetchTasks();
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

    const columns: GridColDef[] = [
        {
            field: 'title',
            headerName: 'Title',
            width: 200,
            align: 'left',
            renderCell: params => {
                return (
                    <div
                        style={{
                            height: '100%',
                            width: '100%',
                            whiteSpace: 'normal',
                            wordBreak: 'break-all'
                        }}
                    >
                        <p className="text-start">{params.row.title ? params.row.title : 'not defined'}</p>
                    </div>
                );
            }
        },
        {
            field: 'description',
            headerName: 'Description',
            width: 200,
            renderCell: params => {
                return (
                    <div style={{ height: '100%', width: '100%', whiteSpace: 'normal' }}>
                        <p className="text-start">{params.row.description}</p>
                    </div>
                );
            }
        },
        {
            field: 'created_by',
            headerName: 'Created By',
            width: 130,
            renderCell: params => {
                return (
                    <div style={{ height: '100%', width: '100%', whiteSpace: 'normal' }}>
                        <p className="text-start">{params.row.created_by}</p>
                    </div>
                );
            }
        },
        {
            field: 'assign_to',
            headerName: 'Assign to',
            width: 130,
            renderCell: params => {
                return (
                    <div style={{ height: '100%', width: '100%', whiteSpace: 'normal' }}>
                        <p className="text-start">{params.row.customerUser.name}</p>
                    </div>
                );
            }
        },
        {
            field: 'library',
            headerName: 'Library',
            width: 200,
            renderCell: params => {
                return (
                    <div style={{ height: '100%', width: '100%', whiteSpace: 'normal' }}>
                        <p
                            title={params.row.libraryItem ? params.row.libraryItem.library.identifier : '-'}
                            style={{ width: '100%' }}
                            className="multiline-truncate text-start"
                        >
                            {params.row.libraryItem ? params.row.libraryItem.library.identifier : '-'}
                        </p>
                    </div>
                );
            }
        },
        {
            field: 'libraryItemParent',
            headerName: 'LibraryItem Parent',
            width: 200,
            renderCell: params => {
                return (
                    <div style={{ height: '100%', width: '100%', whiteSpace: 'normal', textOverflow: 'ellipsis' }}>
                        <p
                            title={params.row.libraryItemParent ? params.row.libraryItemParent.title : '-'}
                            style={{ width: '100%' }}
                            className="multiline-truncate text-start"
                        >
                            {params.row.libraryItemParent ? params.row.libraryItemParent.title : '-'}
                        </p>
                    </div>
                );
            }
        },
        {
            field: 'libraryItemParentType',
            headerName: 'LibraryItem Parent Type',
            width: 200,
            renderCell: params => {
                return (
                    <div style={{ height: '100%', width: '100%', whiteSpace: 'normal', textOverflow: 'ellipsis' }}>
                        <p style={{ width: '100%' }} className="multiline-truncate text-start">
                            {params.row.libraryItemParent ? params.row.libraryItemParent.type : '-'}
                        </p>
                    </div>
                );
            }
        },
        {
            field: 'library_item',
            headerName: 'LibraryItem',
            width: 200,
            renderCell: params => {
                return (
                    <div style={{ height: '100%', width: '100%', whiteSpace: 'normal', textOverflow: 'ellipsis' }}>
                        <p
                            title={params.row.libraryItem ? params.row.libraryItem.title : '-'}
                            style={{ width: '100%' }}
                            className="multiline-truncate text-start"
                        >
                            {params.row.libraryItem ? params.row.libraryItem.title : '-'}
                        </p>
                    </div>
                );
            }
        },
        {
            field: 'status',
            headerName: 'Task Status',
            width: 130,
            renderCell: params => {
                return (
                    <div style={{ height: '100%', width: '100%', whiteSpace: 'normal' }}>
                        <p className="text-start">{params.row.status ? params.row.status : 'not defined'}</p>
                    </div>
                );
            }
        },
        {
            field: 'date',
            headerName: 'Due Date',
            width: 170,
            renderCell: params => {
                return (
                    <div style={{ height: '100%', width: '100%', whiteSpace: 'normal' }}>
                        <p className="text-start">{moment(params.row.due_date).format('DD-MM-YYYY')}</p>
                    </div>
                );
            }
        },
        {
            field: 'actions',
            headerName: 'Actions',
            sortable: false,
            width: 140,
            renderCell: ({ row }) => (
                <>
                    <button
                        onClick={() => {
                            setFromEdit(true);
                            // setSelectedData(row);
                            setShowAddTaskModel(true);
                            setSelectedData({
                                id: row.id && row.id,
                                title: row.title && row.title,
                                description: row.description && row.description,
                                libraryId: row.libraryItem && row.libraryItem.library && row.libraryItem.library.id,
                                libraryItemId: row.libraryItem && row.libraryItem.id,
                                assigned_to: row.customerUser.id && row.customerUser.id,
                                status: row.status && row.status,
                                due_date: row.due_date && row.due_date
                            });
                        }}
                        style={{ cursor: 'pointer' }}
                        className="btn btn-icon btn-light btn-hover-danger btn-sm mx-1"
                    >
                        <span className="svg-icon svg-icon-md svg-icon-danger">
                            <EditIcon />
                        </span>
                    </button>

                    <button
                        onClick={() => {
                            setSelectedData(row);
                            setShowDeleteDialog(true);
                        }}
                        style={{ cursor: 'pointer' }}
                        className="btn btn-icon btn-light btn-hover-danger btn-sm mx-1"
                    >
                        <span className="svg-icon svg-icon-md svg-icon-danger">
                            <DeleteIcon />
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
                    <Typography variant="h6" component="h2">
                        {JSON.stringify(params) !== '{}' ? (params.id ? 'My' : '') : 'All'} Tasks :
                    </Typography>
                    <Stack direction="row" spacing={2}>
                        {userRole === 'Customer Admin' && params.id && (
                            <Link to="/tasks" style={{ textDecoration: 'none' }}>
                                <Button color="primary" variant="contained">
                                    <Typography style={{ textTransform: 'none' }}>All Tasks</Typography>
                                </Button>
                            </Link>
                        )}
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                setShowAddTaskModel(true);
                            }}
                            style={{ textTransform: 'none' }}
                        >
                            Add Task
                        </Button>
                    </Stack>
                </Box>

                <div className="px-4 mb-5" style={{ width: '100%', minHeight: '200px' }}>
                    <DataGridTable columns={columns} data={taskData ? taskData : []} clientPagination />
                </div>

                {showDeleteDialog && (
                    <TaskDeleteDialog
                        selectedData={selectedData}
                        setShowDeleteDialog={setShowDeleteDialog}
                        showDeleteDialog={showDeleteDialog}
                        setConfirmDeleteDone={setConfirmDeleteDone}
                    />
                )}

                {showAddTaskModel && (
                    <AddTask
                        selectedData={selectedData}
                        setSubmitDone={setSubmitDone}
                        fromEdit={fromEdit}
                        setFromEdit={setFromEdit}
                        showAddTaskModel={showAddTaskModel}
                        setShowAddTaskModel={setShowAddTaskModel}
                        fetchTasks={fetchTasks}
                    />
                )}
            </Box>
        </>
    );
}
export default TaskCustomers;
