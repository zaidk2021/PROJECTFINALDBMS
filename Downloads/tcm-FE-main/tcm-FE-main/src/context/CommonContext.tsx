import React from 'react';

interface rowsStateType {
    page: number;
    pageSize: number;
    total: number;
}

interface ContextStateType {
    query?: URLSearchParams;
    rowsState: { page: number; pageSize: number; total: number };
    setRowsState?: any;
    clearRowState?: () => void;
}
export const CommonContext = React.createContext<ContextStateType>({ rowsState: { page: 0, pageSize: 15, total: 0 } });

export const CommonState = ({ children }) => {
    const [rowsState, setRowsState] = React.useState<rowsStateType>({
        page: 0,
        pageSize: 15,
        total: 0
    });

    const query = new URLSearchParams({
        offset: rowsState ? rowsState.pageSize.toString() : '15',
        pg_no: rowsState ? rowsState.page.toString() : '1'
    });

    const clearRowState = () => {
        setRowsState({
            page: 0,
            pageSize: 15,
            total: 0
        });
    };

    return (
        <CommonContext.Provider value={{ clearRowState, query, rowsState, setRowsState }}>
            {children}
        </CommonContext.Provider>
    );
};
