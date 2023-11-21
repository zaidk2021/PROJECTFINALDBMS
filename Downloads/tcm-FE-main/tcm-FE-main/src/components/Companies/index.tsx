import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import { GridColDef } from '@mui/x-data-grid';
import '../../librarylogs.css';
import customerService from '../../services/customer.service';
import { Link } from 'react-router-dom';
import ExpertsDialog from './ExpertsDialog';
import { PersonAdd } from '@material-ui/icons';
import swal from 'sweetalert';
import EditIcon from '@mui/icons-material/Edit';
import ArticleIcon from '@mui/icons-material/Article';
import GroupIcon from '@mui/icons-material/Group';
import { Button, Stack, Typography } from '@mui/material';
import errorHandler from '../../utils/errorHandler';
import NewAddEditCompanyDialog from './NewAddEditCompanyDialog';
import DataGridTable from '../Common/DataGrid';

interface FormDataType {
    id: number | null;
    code?: string;
    name: string;
    phone?: number | null;
    company_address?: string;
    postalCode?: string;
    company_country?: string;
}

interface AdminType {
    id: number | null;
    first_name?: string;
    last_name?: string;
    email?: string;
    phone_number?: number | null;
    address?: string;
    country?: string;
}
const Companies = () => {
    const [companies, setCompanies] = React.useState<any[]>([]);
    const [companyId, setCompanyId] = React.useState<number | null>(null);
    const [showExpertDialog, setShowExpertDialog] = React.useState<boolean>(false);
    const [expertsList, setExpertsList] = React.useState([]);
    const [_companyUserId, setCompanyUserId] = React.useState(null);
    const [showAddEditCompanyDialog, setShowAddEditCompanyDialog] = React.useState(false);
    const [fromEdit, setFromEdit] = React.useState<boolean>(false);
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const [companyEditFormData, setCompanyEditFormData] = React.useState<FormDataType>({
        id: null,
        code: '',
        name: '',
        phone: null,
        postalCode: '',
        company_address: '',
        company_country: ''
    });

    const [adminData, setAdminData] = React.useState<AdminType>({
        id: null,
        first_name: '',
        last_name: '',
        email: '',
        phone_number: null,
        address: '',
        country: ''
    });

    const AddUpdateCompany = () => {
        if (fromEdit) {
            customerService
                .editCompany(companyEditFormData)
                .then(data => {
                    if (data.success) {
                        fetchCompanies();
                        swal({
                            title: 'Company Updated!',
                            icon: 'success',
                            timer: 2000
                        });
                        setShowAddEditCompanyDialog(false);
                    } else {
                        errorHandler(data);
                    }
                })
                .catch(error => {
                    errorHandler(error);
                });
        } else {
            customerService
                .createCompany(companyEditFormData)
                .then(data => {
                    if (data.status === 200) {
                        setAdminData(prev => ({ ...prev, id: data.data.id }));
                        fetchCompanies();
                        swal({
                            title: 'Company Added!',
                            icon: 'success',
                            timer: 2000
                        });
                        handleNext();
                    } else {
                        errorHandler(data);
                    }
                })
                .catch(error => {
                    errorHandler(error);
                });
        }
    };

    const createAdmin = () => {
        customerService
            .createCompanyAdmin(adminData)
            .then(data => {
                if (data.status === 200) {
                    fetchCompanies();
                    swal({
                        title: 'Admin Created!',
                        icon: 'success',
                        timer: 2000
                    });
                    setShowAddEditCompanyDialog(false);
                    setActiveStep(0);
                } else {
                    errorHandler(data);
                }
            })
            .catch(error => {
                errorHandler(error);
            });
    };

    useEffect(() => {
        const userData: any = localStorage.getItem('user');
        const { user_info } = JSON.parse(userData);
        setCompanyUserId(user_info.id);
    }, []);

    const fetchCompanies = () => {
        customerService
            .getAllCustomers()
            .then(data => {
                setCompanies(data);
            })
            .catch(error => {
                errorHandler(error);
            });
    };

    useEffect(() => {
        fetchCompanies();
    }, []);

    const onSave = () => {
        customerService
            .linkExpertsToCustomer(companyId, expertsList)
            .then(data => {
                if (data.success) {
                    fetchCompanies();
                    swal({
                        title: 'Experts List Updated!',
                        icon: 'success',
                        timer: 2000
                    });
                    setShowExpertDialog(false);
                } else {
                    errorHandler(data);
                }
            })
            .catch(error => {
                errorHandler(error);
            });
    };

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'Sr.No', width: 80 },
        {
            field: 'code',
            headerName: 'Code',
            width: 200
        },
        {
            field: 'name',
            headerName: 'Name',
            flex: 1
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 250,
            cellClassName: 'd-flex justify-content-around',
            renderCell: ({ row }) => (
                <>
                    <button
                        onClick={() => {
                            setCompanyEditFormData({
                                id: row.id,
                                name: row.name,
                                phone: row.phone,
                                postalCode: row.postalCode,
                                company_address: row.address,
                                company_country: row.country
                            });
                            setShowAddEditCompanyDialog(true);
                            setFromEdit(true);
                        }}
                        title="edit company"
                        style={{ cursor: 'pointer' }}
                        className="btn btn-icon btn-light btn-hover-danger btn-sm mx-1"
                    >
                        <span className="svg-icon svg-icon-md svg-icon-danger">
                            <EditIcon />{' '}
                        </span>
                    </button>
                    <button
                        onClick={() => {
                            setShowExpertDialog(true);
                            setCompanyId(row.id);
                            setExpertsList(row.experts);
                        }}
                        title="link experts"
                        style={{ cursor: 'pointer' }}
                        className="btn btn-icon btn-light btn-hover-danger btn-sm mx-1"
                    >
                        <span className="svg-icon svg-icon-md svg-icon-danger">
                            <PersonAdd />
                        </span>
                    </button>
                    <Link to={`/all-companies/library/${row.id}`}>
                        <button
                            style={{ cursor: 'pointer' }}
                            title="libraries"
                            className="btn btn-icon btn-light btn-hover-danger btn-sm mx-1"
                        >
                            <span className="svg-icon svg-icon-md svg-icon-danger">
                                <ArticleIcon />
                            </span>
                        </button>
                    </Link>
                    <Link to={`/users/${row.id}`} state={{ company_name: row.name }}>
                        <button
                            style={{ cursor: 'pointer' }}
                            title="users"
                            className="btn btn-icon btn-light btn-hover-danger btn-sm mx-1"
                        >
                            <span className="svg-icon svg-icon-md svg-icon-danger">
                                <GroupIcon />
                            </span>
                        </button>
                    </Link>
                </>
            )
        }
    ];

    return (
        <>
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mx: 2, my: 2, px: 1 }}>
                    <Typography variant="h6" component="h6">
                        Companies :
                    </Typography>
                    <Stack direction="row" spacing={2}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                setFromEdit(false);
                                setShowAddEditCompanyDialog(true);
                                setCompanyEditFormData({
                                    id: null,
                                    code: '',
                                    name: '',
                                    phone: null,
                                    postalCode: '',
                                    company_address: '',
                                    company_country: ''
                                });

                                setAdminData({
                                    id: null,
                                    first_name: '',
                                    last_name: '',
                                    email: '',
                                    phone_number: null,
                                    address: '',
                                    country: ''
                                });
                            }}
                            style={{ textTransform: 'none' }}
                        >
                            New Company
                        </Button>
                    </Stack>
                </Box>

                <div className="px-4 mb-5" style={{ width: '100%', minHeight: '200px' }}>
                    <DataGridTable columns={columns} data={companies ? companies : []} clientPagination />
                </div>
            </Box>

            {showExpertDialog && (
                <ExpertsDialog
                    expertsList={expertsList}
                    setExpertsList={setExpertsList}
                    onSave={onSave}
                    setShowExpertDialog={setShowExpertDialog}
                />
            )}

            {showAddEditCompanyDialog && (
                <NewAddEditCompanyDialog
                    activeStep={activeStep}
                    companyEditFormData={companyEditFormData}
                    fromEdit={fromEdit}
                    setCompanyEditFormData={setCompanyEditFormData}
                    AddUpdateCompany={AddUpdateCompany}
                    setShowAddEditCompanyDialog={setShowAddEditCompanyDialog}
                    adminData={adminData}
                    setAdminData={setAdminData}
                    createAdmin={createAdmin}
                />
            )}
        </>
    );
};
export default Companies;
