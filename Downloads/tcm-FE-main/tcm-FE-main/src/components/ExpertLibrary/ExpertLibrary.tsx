import React, { useEffect, useState } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import ExpertService from '../../services/expert.service';
import swal from 'sweetalert';
import ArticleIcon from '@mui/icons-material/Article';
import { useNavigate } from 'react-router';
import { Box, Typography } from '@mui/material';
import DataGridTable from '../Common/DataGrid';
import errorHandler from '../../utils/errorHandler';

function ExpertLibrary() {
    const [expertLibrariesRow, setExpertLibrariesRow] = useState([]);

    const [expertId, setExpertId] = useState<any>();

    // UseEffects
    useEffect(() => {
        const userData: any = localStorage.getItem('user');
        const parsedData = JSON.parse(userData);
        const userId = parsedData.user_info.expid;

        setExpertId(userId);
    }, []);

    useEffect(() => {
        if (expertId) {
            fetchExpertLibraries();
        }
        //eslint-disable-next-line
    }, [expertId]);

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
            width: 90
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
            width: 140,
            renderCell: ({ row }) => (
                <>
                    <button
                        onClick={() => {
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

    const fetchExpertLibraries = () => {
        if (expertId) {
            ExpertService.getLibraryByExpId(expertId)
                .then(data => {
                    if (data.data.data.length == 0) {
                        setExpertLibrariesRow([]);
                        swal({
                            title: 'No Libraries Found!',
                            icon: 'warning',
                            timer: 2000
                        });
                    } else {
                        const librariesofExpert = data.data.data.map(current => current.library);
                        setExpertLibrariesRow(librariesofExpert);
                    }
                })
                .catch(error => errorHandler(error));
        }
    };

    return (
        <>
            {/* Data Table Start */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', mx: 2, my: 2, px: 1 }}>
                <Typography variant="h6" component="h6">
                    Expert Library :
                </Typography>
            </Box>

            <div className="px-4 mb-5" style={{ width: '100%', minHeight: '200px' }}>
                <DataGridTable columns={columns} data={expertLibrariesRow ? expertLibrariesRow : []} clientPagination />
            </div>
        </>
    );
}

export default ExpertLibrary;
