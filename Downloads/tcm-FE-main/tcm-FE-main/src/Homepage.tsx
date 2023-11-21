import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Grid, TextField, IconButton,AppBar,Toolbar } from '@material-ui/core';
import { Search, ArrowForwardIos } from '@material-ui/icons';
import {
    Description,
    AssignmentInd,
    Assignment,
    CloudUpload,
    InsertDriveFile,
    AssignmentTurnedIn
} from '@material-ui/icons';

import './Homepage.css';

const Homepage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBox, setSelectedBox] = useState('');
    const navigate = useNavigate();

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchButtonClick = () => {
        setSelectedBox(searchTerm);
        const matchedOption = options.find(option => option.title === searchTerm);
        if (matchedOption) {
            setTimeout(() => {
                setSelectedBox('');
                navigate(matchedOption.link);
            }, 1000);
        }
    };

    const options = [
        {
            title: 'Standards & Laws',
            link: '/library',
            icon: <Description />
        },
        {
            title: 'Self Assessment',
            link: '/self-assessment',
            icon: <AssignmentInd />
        },
        {
            title: 'Audit',
            link: '/audit',
            icon: <Assignment />
        },
        {
            title: 'Document Storage',
            link: '/document-storage',
            icon: <CloudUpload />
        },
        {
            title: 'Templates',
            link: '/templates',
            icon: <InsertDriveFile />
        },
        {
            title: 'CAPA',
            link: '/capa',
            icon: <AssignmentTurnedIn />
        },
        {
            title: 'Admin',
            link: '/admin',
            icon: <AssignmentInd /> // Replace this with the appropriate Material-UI icon
        }
    ];
    return (
        <div className="homepage">
             <div className="search-bar">
                <AppBar position="static" style={{ backgroundColor: '#ADD8E6' }}>
                    <Toolbar style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <TextField
                            label="Search"
                            variant="outlined"
                            value={searchTerm}
                            onChange={handleSearchInputChange}
                            style={{ width: '300px' }}
                        />
                        <IconButton onClick={handleSearchButtonClick}>
                            <Search />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </div>
            <Grid container spacing={1} className="options-grid">
                {options.map(option => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={option.title}>
                        <div className="option-link">
                            <div className={`option ${selectedBox === option.title ? 'option-selected' : ''}`}>
                                <div className="option-icon">{option.icon}</div>
                                <h3>{option.title}</h3>
                                <Link to={option.link} className="arrow-link">
                                    <ArrowForwardIos className="arrow-icon" />
                                </Link>
                            </div>
                        </div>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default Homepage;
