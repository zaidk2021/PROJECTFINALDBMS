import React, { useEffect, useState } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LibraryService from '../../services/library.service';
import AddEditLibraryDialogue from './AddEditLibrary';
import ConfirmationDialogue from './ConfirmationDialogue';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import swal from 'sweetalert';
import ArticleIcon from '@mui/icons-material/Article';
import { useNavigate } from 'react-router';
import { Box, Typography } from '@mui/material';
import DataGridTable from '../Common/DataGrid';
import errorHandler from '../../utils/errorHandler';

function LibraryCrud() {
    interface LibraryProps {
        identifier: string;
        title: string;
        version: string;
        text: string;
        licenseNeeded: string;
        licenseCost: number;
    }

    const [fromEdit, setFromEdit] = useState(false);
    const [fromAdd, setFromAdd] = useState(false);
    const [openAddEdit, setOpenAddEdit] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [addEditDone, setAddEditDone] = useState(false);
    const [confirmDeleteDone, setConfirmDeleteDone] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [selectedData, setSelectedData] = useState({
        id: null,
        identifier: '',
        title: '',
        version: '',
        text: '',
        licenseNeeded: '',
        licenseCost: 0
    });
    const [librariesRow, setLibrariesRow] = useState([]);
    const [editLibraryData, setEditLibraryData] = useState<LibraryProps>({
        identifier: '',
        title: '',
        version: '',
        text: '',
        licenseNeeded: '',
        licenseCost: 0
    });
    const fetchAllLibraries = () => {
        LibraryService.getAllLibraries()
            .then(data => {
                if (data && data.data) {
                    setLibrariesRow(data.data);
                }
            })
            .catch(error => errorHandler(error));
    };
    // UseEffects
    useEffect(() => {
        fetchAllLibraries();
    }, []);

    useEffect(() => {
        if (addEditDone) {
            fetchAllLibraries();
            setAddEditDone(false);
        }
    }, [addEditDone]);

    useEffect(() => {
        if (confirmDeleteDone) {
            setOpenConfirm(false);
            LibraryService.deleteLibrary(selectedData.id)
                .then(data => {
                    if (data.status === 204) {
                        setOpenConfirm(false);
                        fetchAllLibraries();
                        swal({
                            title: 'Your Library has been deleted!',
                            icon: 'success',
                            timer: 2000
                        });
                        setAddEditDone(true);
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
        setConfirmDeleteDone(false);
    }, [confirmDeleteDone]);

    const navigate = useNavigate();

    const columns: GridColDef[] = [
        { field: 'id', headerName: '#', width: 70 },
        {
            field: 'identifier',
            headerName: 'Identifier',
            minWidth: 140,
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
            width: 90,
            align: 'left'
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
            minWidth: 200,
            renderCell: ({ row }) => (
                <>
                    <button
                        onClick={() => {
                            setFromEdit(true);
                            setEditLibraryData(row);
                            setOpenAddEdit(true);
                        }}
                        style={{ cursor: 'pointer' }}
                        className="btn btn-icon btn-light btn-hover-danger btn-sm mx-1"
                    >
                        <span className="svg-icon svg-icon-md svg-icon-danger">
                            <EditIcon />{' '}
                        </span>
                    </button>

                    <button
                        onClick={() => {
                            setSelectedData(row);
                            setShowConfirmation(true);
                            setOpenConfirm(true);
                        }}
                        style={{ cursor: 'pointer' }}
                        className="btn btn-icon btn-light btn-hover-danger btn-sm mx-1"
                    >
                        <span className="svg-icon svg-icon-md svg-icon-danger">
                            <DeleteIcon />
                        </span>
                    </button>
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
                </>
            )
        }
    ];

    return (
        <>
            {/* Data Table Start */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mx: 2, my: 2, px: 1 }}>
                <Typography variant="h6" component="h6">
                    Library :
                </Typography>
                <Stack direction="row" spacing={2}>
                    <Button
                        variant="contained"
                        onClick={() => {
                            setOpenAddEdit(true);
                            setFromAdd(true);
                        }}
                        style={{ textTransform: 'none' }}
                    >
                        Add Library
                    </Button>
                </Stack>
            </Box>

            {/* Data Table Start */}
            <div className="px-4 mb-5" style={{ width: '100%', minHeight: '200px' }}>
                <DataGridTable columns={columns} data={librariesRow ? librariesRow : []} clientPagination />
            </div>

            {/* Confirmation Dialogue Start */}
            {showConfirmation && (
                <ConfirmationDialogue
                    selectedData={selectedData}
                    setOpenConfirm={setOpenConfirm}
                    openConfirm={openConfirm}
                    setConfirmDeleteDone={setConfirmDeleteDone}
                />
            )}

            <AddEditLibraryDialogue
                editLibraryData={editLibraryData}
                openAddEdit={openAddEdit}
                setOpenAddEdit={setOpenAddEdit}
                fromAdd={fromAdd}
                setFromAdd={setFromAdd}
                fromEdit={fromEdit}
                setFromEdit={setFromEdit}
                setAddEditDone={setAddEditDone}
            />
        </>
    );
}

export default LibraryCrud;
