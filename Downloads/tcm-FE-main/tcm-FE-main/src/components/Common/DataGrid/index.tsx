import React, { useCallback, useContext, useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { CommonContext } from '../../../context/CommonContext';
import CustomToolBar from './CustomToolbar';

interface PropTypes {
    columns: GridColDef[];
    data: {}[];
    width?: string;
    clientPagination?: boolean;
    rowsState?: { page: number; pageSize: number; total: number };
    setRowsState?: any;
    loading?:boolean;
    rowHeight?:number,
    search?:string,
    setSearch?:any,
    hideTopBar?:boolean,
    [otherProps:string]: any;
  }



const escapeRegExp = (value) => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

const DataGridTable = ({ columns, data, width, clientPagination, rowsState, setRowsState,loading ,rowHeight,  search,
  setSearch,hideTopBar,...otherProps}: PropTypes) => {
  const {clearRowState} = useContext(CommonContext)
  const [searchText, setSearchText] = useState("");
    const [rows, setRows] = useState(data);
    const [pagination, setPagination] = useState({
        limit: 15,
        page: 0
    });

    useEffect(() => {
        if (data) {
            setRows(data);
        }
    }, [data]);

    useEffect(()=> {
      
      return ()=> {
          if(clearRowState) {
            clearRowState()
          }
}
    },[])

    const onPageSizeChange = useCallback(
        pageSize => {
            if (clientPagination) {
                setPagination(prev => ({ ...prev, limit: pageSize }));
            } else {
                setRowsState(prev=>({ ...prev, pageSize: pageSize }));
            }
        },
        [setRowsState, clientPagination, rowsState]
    );

    const onPageChange = useCallback(
        page => {
            if (clientPagination) {
                setPagination(prev => ({ ...prev, page }));
            } else {
                setRowsState(prev => ({ ...prev, page }));
            }
        },
        [clientPagination]
    );


    const requestSearch = (searchValue) => {
      setSearchText(searchValue);
  
      const searchRegex = new RegExp(escapeRegExp(searchValue), "gi");
      const filteredRows = data.filter((row) =>
        Object.keys(row).some((field) =>
          searchRegex.test(row[field] ? row[field].toString() : "")
        )
      );
      setRows(filteredRows);
    };

    const getPaginationObj = () => {
        return clientPagination
            ? {
                  rowCount: data.length,
                  page: pagination.page,
                  pageSize: pagination.limit
              }
            : {
                  rowCount: rowsState && rowsState?.total ,
                  page: rowsState && rowsState?.page,
                  pageSize: rowsState && rowsState?.pageSize,
              };
    };

    return (
        <div
            style={{
                height: rows.length > 0 ? '' : 500,
                maxWidth: `${width}`,
                width: `auto`
            }}
        >
            <DataGrid
                sx={{
                    border:'none',
                    "& .MuiDataGrid-main": {
                      borderLeft:'1px solid #e4e4e4',
                      borderRight:'1px solid #e4e4e4'
                    },
                    "& .MuiTablePagination-root": {
                        marginBottom: 0,
                      },
                      "& .MuiTablePagination-selectLabel,& .MuiTablePagination-displayedRows,": {
                        marginBottom: 0,
                        color: "#495057",
                      },
                      "& .MuiTablePagination-toolbar": {
                        dispaly: "flex",
                        aligItems: "center",
                        justifyContent: "space-between",
                      },
                      "& .MuiDataGrid-columnsContainer.css-99lfi7-MuiDataGrid-columnsContainer": {
                        backgroundColor: "#ced4da",
                        border: "none !important",
                        height: "55px",
                        color: "#4C6371",
                        lineHeight: "50px !important",
                      },
                      "& .MuiButton-root": {
                        color: "#828282",
                        border: "2px solid #828282",
                        padding: "5px 10px",
                      },
                      "& .MuiDataGrid-columnHeader": {
                        backgroundColor: "var(--primary)",
                        fontSize: "12px",
                        fontWeight: "400 ",
                        margin: "0",
                        color: "#000",
                        textTransform:'uppercase'
                      },
                      "& .MuiDataGrid-columnHeaderTitleContainer": {
                        overflow: "inherit !important",
                      },
                      "& .MuiDataGrid-columnHeaders": {
                        minHeight: "50px !important",
                        maxHeight: "50px !important",
                      },
                      "& .MuiDataGrid-overlay": {
                        top: "50px !important",
                      },
                      "& .MuiDataGrid-columnHeaderDraggableContainer": {
                        height: "50px",
                      },
                      "& .MuiDataGrid-columnSeparator": {
                        color: "#fff",
                        "& .MuiSvgIcon-root": {
                          paddingLeft: "2px",
                        },
                      },
                      
                }}
                {...getPaginationObj()}
                loading={loading}
                onPageSizeChange={onPageSizeChange}
                onPageChange={onPageChange}
                rows={rows}
                columns={columns}
                paginationMode={clientPagination ? 'client':'server'}
                autoHeight={rows.length > 0 ? true : false}
                rowsPerPageOptions={[5, 15, 25, 50, 100]}
                pagination
                components={{
                  Toolbar: CustomToolBar,
                }}
                componentsProps={{
                  toolbar: {
                    hideTopBar :hideTopBar,
                    value: !clientPagination ? search : searchText,
                    onChange: (e) =>
                      setSearch
                        ? setSearch(e.target.value)
                        : requestSearch(e.target.value),
                    clearSearch: () => (setSearch ? setSearch("") : requestSearch("")),
                  },
                }}
                rowHeight={rowHeight ?rowHeight :52}
                disableColumnSelector
                disableDensitySelector
                disableSelectionOnClick
                {...otherProps}
            />
        </div>
    );
};

export default DataGridTable;
