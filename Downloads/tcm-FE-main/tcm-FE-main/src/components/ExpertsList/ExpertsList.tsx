import React, { useEffect, useState } from 'react';
import {  GridColDef } from '@mui/x-data-grid';
import AllExpertsDialogue from './AllExpertsDialogue';
import ExpertService from '../../services/expert.service';
import LibraryService from '../../services/library.service';
import { LibraryDetails } from '../LibraryItem/LibraryDetails';
import swal from 'sweetalert';
import ArticleIcon from '@mui/icons-material/Article';
import EditIcon from '@mui/icons-material/Edit';
import EditExpertDialog from './EditExpertDialog';
import {  Typography } from '@material-ui/core';
import { Box, Stack,Button } from '@mui/material';
import errorHandler from '../../utils/errorHandler';
import DataGridTable from '../Common/DataGrid';


interface ExpertType {
    id: number | null;
    first_name: string;
    last_name: string;
    email?: string;
    company_name?: string;
    phone_number?: number | null;
    address?: string;
    country?: string;
}

export default function ExpertsList() {
    const [openExpertsDialogue, setOpenExpertsDialogue] = React.useState(false);
    const [expertsTitle, setExpertsTitle] = useState('');
    const [allExperts, setAllExperts] = useState<any[]>([]);
    const [expertId, setExpertId] = useState<number>(0);
    const [fromEdit, setFromEdit] = useState<boolean>(false);
    const [showEditExpertDialog, setShowEditExpertDialog] = useState(false);
    const [expertFormData, setExpertFormData] = useState<ExpertType>({
        id: null,
        first_name: '',
        last_name: '',
        email: '',
        company_name: '',
        phone_number: null,
        address: '',
        country: ''
    });

    const [allLibraries, setAllLibraries] = useState<LibraryDetails[]>([]);
  


    useEffect(() => {
        fetchAllExperts();
        fetchAllLibraries();
    }, []);

    const fetchAllExperts = () => {
        ExpertService.getAllExperts()
            .then(data => {
                setAllExperts(data);
            })
            .catch(error => {
               errorHandler(error)
            });
    };

    const fetchAllLibraries = () => {
        LibraryService.getAllLibraries()
            .then(data => {
                setAllLibraries(data.data);
            })
            .catch(error => {
               errorHandler(error)
            });
    };

    const UpdateExpert = () => {
        if (fromEdit) {
            ExpertService.updateExpert(expertFormData)
                .then(data => {
                    if (data.status === 200) {
                        fetchAllExperts();
                        swal({
                            title: 'Expert Updated!',
                            icon: 'success',
                            timer: 2000
                        });
                        setShowEditExpertDialog(false);
                        setFromEdit(false);
                    } else {
                        errorHandler(data);
                    }
                })
                .catch(error => {
                    errorHandler(error);
                });
        } else {
            ExpertService.createExpert(expertFormData)
                .then(data => {
                    if (data.status === 200) {
                        fetchAllExperts();
                        swal({
                            title: 'Expert Created!',
                            icon: 'success',
                            timer: 2000
                        });
                        setShowEditExpertDialog(false);
                    } else {
                        errorHandler(data);
                    }
                })
                .catch(error => {
                    errorHandler(error);
                });
        }
    };

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'Sr.No', width: 100 },
        { field: 'name', headerName: 'Name of Expert', flex: 1 },
        { field: 'email', headerName: 'Expert Email', flex: 1, valueGetter:  ({ row }) =>  row!.user && row?.user?.email},
        {
            field: 'action',
            headerName: 'Actions',
            width: 200,
            renderCell: ({ row }) => (
                <>
                    <button
                        onClick={() => {
                            setFromEdit(true);
                            setShowEditExpertDialog(true);
                            setExpertFormData({
                                id: row.id,
                                first_name: row.user ? row.user.first_name :  "",
                                last_name: row.user ? row.user.last_name: "",
                                company_name: row.user ?  row.user.company_name: "",
                                phone_number: row.user ? row.user.phone_number:"",
                                email: row.user ? row.user.email:"",
                                address: row.user ? row.user.address:"",
                                country: row.user ? row.user.country:""
                            });
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
                            setOpenExpertsDialogue(true);
                            setExpertsTitle(row.name);
                            setExpertId(row.id);
                        }}
                        style={{ cursor: 'pointer' }}
                        title="Link Libraries"
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
            {/* <h1>Experts List</h1> */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mx: 2, my: 2, px: 1 }}>
                <Typography variant="h6" component="h6">
                    Experts List :
                </Typography>
                <Stack direction="row" spacing={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            setFromEdit(false);
                            setShowEditExpertDialog(true);
                            setExpertFormData({
                                id: null,
                                first_name: '',
                                last_name: '',
                                email: '',
                                company_name: '',
                                phone_number: null,
                                address: '',
                                country: ''
                            });
                        }}
                        style={{ textTransform: 'none' }}
                    >
                        New Expert
                    </Button>
                </Stack>
            </Box>
                    <div className="px-4 mb-5" style={{ width: '100%', minHeight: '200px' }}>
                <DataGridTable
                     columns={columns} 
                    data={allExperts ? allExperts : []} 
                    clientPagination 
                />
            </div>
                {openExpertsDialogue && (
                    <AllExpertsDialogue
                        openExpertsDialogue={openExpertsDialogue}
                        setOpenExpertsDialogue={setOpenExpertsDialogue}
                        ExpertName={expertsTitle}
                        expertId={expertId}
                        allLibraries={allLibraries}
                    />
                )}

                {showEditExpertDialog && (
                    <EditExpertDialog
                        expertFormData={expertFormData}
                        fromEdit={fromEdit}
                        setExpertFormData={setExpertFormData}
                        UpdateExpert={UpdateExpert}
                        setShowEditExpertDialog={setShowEditExpertDialog}
                    />
                )}
        </>
    );
}
