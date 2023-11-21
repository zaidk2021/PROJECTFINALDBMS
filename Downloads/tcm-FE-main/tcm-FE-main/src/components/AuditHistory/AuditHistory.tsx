import React, { useContext, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { GridColDef } from '@mui/x-data-grid';
import moment from 'moment';
import AuditTrailService from '../../services/audit-trail.service';
import '../../librarylogs.css';
import { useParams } from 'react-router';
import DataGridTable from '../Common/DataGrid';
import { CommonContext } from '../../context/CommonContext';

function LibraryLogs() {
    const [historyData, setHistoryData] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(false);
    const { query, rowsState, setRowsState } = useContext(CommonContext);

    const params = useParams();
    const fetchAuditHistory = () => {
        setLoading(true);
        if (params.id) {
            AuditTrailService.getLibraryHistoryAudit(params.id, query)
                .then(data => {
                    var auditData = data.data;
                    var descendingData = [...auditData].reverse();
                    setRowsState(prev => ({ ...prev, total: data.count }));
                    setHistoryData(descendingData);
                    setLoading(false);
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            AuditTrailService.getHistoryAudit(query)
                .then(data => {
                    var auditData = data.data;
                    var descendingData = [...auditData].reverse();
                    setRowsState(prev => ({ ...prev, total: data.count }));
                    setHistoryData(descendingData);
                    setLoading(false);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    };

    useEffect(() => {
        fetchAuditHistory();
        //disable-next-line
    }, [rowsState.page, rowsState.pageSize]);

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'Sr.No', width: 70 },

        {
            field: 'updated_by',
            headerName: 'USER',
            minWidth: 150,
            headerAlign: 'center',
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
                        <p>{params.row.updated_by ? params.row.updated_by.name : 'not defined'}</p>
                    </div>
                );
            }
        },
        {
            field: 'change_type',
            headerName: 'ACTION',
            minWidth: 120,
            headerAlign: 'center',
            renderCell: params => {
                return (
                    <div style={{ height: '100%', width: '100%', whiteSpace: 'normal' }}>
                        <p className="color-bold">{params.row.change_type}</p>
                        <span></span>
                    </div>
                );
            }
        },

        {
            field: 'action_type',
            headerName: 'ACTION AREA',
            minWidth: 160,
            headerAlign: 'center',
            renderCell: params => {
                return (
                    <div style={{ height: '100%', width: '100%', whiteSpace: 'normal' }}>
                        <p>{params.row.action_type}</p>
                    </div>
                );
            }
        },
        {
            field: 'action_item',
            headerName: 'ACTION ITEM',
            minWidth: 270,
            headerAlign: 'center',
            renderCell: params => {
                return (
                    <div style={{ height: '100%', width: '100%', whiteSpace: 'normal' }}>
                        <p>{params.row.field}</p>
                    </div>
                );
            }
        },

        {
            field: 'parent',
            headerName: 'ACTION ITEM PARENT',
            minWidth: 200,
            headerAlign: 'center',
            renderCell: params => {
                return (
                    <div style={{ height: '100%', width: '100%', whiteSpace: 'normal' }}>
                        <p>{params.row.parent}</p>
                    </div>
                );
            }
        },

        {
            field: 'after',
            headerName: 'CHANGES',
            minWidth: 310,
            flex: 1,
            headerAlign: 'center',
            renderCell: params =>
                params.row.change_type === 'Updated' ? (
                    <div style={{ height: '100%', width: '100%', whiteSpace: 'normal' }}>
                        <span className="color-underline-bold">Change Type:</span>
                        <p>{params.row.change_type}</p>
                        <span className="color-underline-bold">Before:</span>
                        <p>{params.row.before}</p>
                        <span className="color-underline-bold">After:</span>
                        <p>{params.row.after}</p>
                    </div>
                ) : (
                    <div style={{ height: '100%', width: '100%', whiteSpace: 'normal' }}>
                        <span className="color-underline-bold">Item Type:</span>
                        <p>{params.row.change_type}</p>
                        <span className="color-underline-bold">Value:</span>
                        <p>{params.row.after}</p>
                    </div>
                )
        },

        {
            field: 'updated_on',
            headerName: 'TIMELINE',
            minWidth: 170,
            headerAlign: 'center',
            renderCell: params => {
                return (
                    <div style={{ height: '100%', width: '100%', whiteSpace: 'normal' }}>
                        <p>{moment(params.row.updated_on).format('DD-MM-YYYY HH:mm:ss')}</p>
                    </div>
                );
            }
        }
    ];

    return (
        <>
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <Box sx={{ display: 'flex', my: 2, px: 3 }}>
                    <Typography variant="h6" component="h2">
                        Audit Logs :
                    </Typography>
                </Box>

                <div className="px-4 mb-5" style={{ width: '100%', minHeight: '200px' }}>
                    <DataGridTable
                        columns={columns}
                        data={historyData ? historyData : []}
                        rowsState={rowsState}
                        setRowsState={setRowsState}
                        loading={loading}
                        rowHeight={170}
                    />
                </div>
            </Box>
        </>
    );
}
export default LibraryLogs;
