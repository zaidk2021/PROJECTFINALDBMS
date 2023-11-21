import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

const customToolbarStyling = theme => ({
    fontFamily: `'Inter', sans-serif !important`,
    padding: '20px 0',
    paddingBottom: 0,
    justifyContent: 'space-between',
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    color: '#828282',
    marginBottom: '20px',
    backgroundColor: '#fff',
    '& .css-d4cai4-MuiInputBase-root-MuiInput-root': {
        paddingBottom: 5
    },
    '& .MuiGrid-root:nth-child(2)': {
        justifyContent: {
            sm: 'space-between',
            lg: 'flex-end'
        }
    },
    '& .css-ghsjzk-MuiInputBase-root-MuiInput-root:after': {
        borderBottom: '2px solid #828282'
    }
});

const textFieldStyling = theme => ({
    width: {
        xs: '100%'
    },
    margin: theme.spacing(1, 0.5, 1.5),
    '& .MuiSvgIcon-root': {
        marginRight: theme.spacing(0.5)
    },
    '& .MuiInput-underline:before': {
        borderBottom: `1px solid ${theme.palette.divider}`
    }
});
const CustomToolBar = ({ value, onChange, clearSearch, hideTopBar }) => {
    const searchip = useRef(null);

    return !hideTopBar ? (
        <Grid container sx={customToolbarStyling}>
            <Grid item xs={12} sm={4} md={4} className="d-flex justify-content-start align-items-center">
                <TextField
                    variant="standard"
                    value={value ? value : ''}
                    onChange={onChange}
                    placeholder="Search..."
                    ref={searchip}
                    fullWidth
                    // className={classes.textField}
                    sx={textFieldStyling}
                    InputProps={{
                        startAdornment: <SearchIcon />,
                        endAdornment: (
                            <>
                                <ClearIcon
                                    aria-label="Clear"
                                    style={{
                                        visibility: value ? 'visible' : 'hidden',
                                        cursor: 'pointer'
                                    }}
                                    onClick={clearSearch}
                                />
                            </>
                        )
                    }}
                />
            </Grid>
        </Grid>
    ) : (
        <></>
    );
};

export default CustomToolBar;

CustomToolBar.propTypes = {
    clearSearch: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired
};
