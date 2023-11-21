import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Grid from '@material-ui/core/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import AllExpertsDialogue from './AllExpertsDialogue';
import ExpertService from '../../services/expert.service';
import LibraryService from '../../services/library.service';
import { LibraryDetails } from '../LibraryItem/LibraryDetails';
import Typography from '@mui/material/Typography';
import errorHandler from '../../utils/errorHandler';

export default function ExpertsList() {
    const [openExpertsDialogue, setOpenExpertsDialogue] = React.useState(false);
    const [expertsTitle, setExpertsTitle] = useState('');
    const [allExperts, setAllExperts] = useState<any[]>([]);
    const [expertId, setExpertId] = useState<number>(0);
    const [allLibraries, setAllLibraries] = useState<LibraryDetails[]>([]);

    const fetchAllExperts = () => {
        ExpertService.getAllExperts()
            .then(data => {
                setAllExperts(data);
            })
            .catch(error => {
                errorHandler(error);
            });
    };

    const fetchAllLibraries = () => {
        LibraryService.getAllLibraries()
            .then(data => {
                setAllLibraries(data.data);
            })
            .catch(error => {
                errorHandler(error);
            });
    };

    useEffect(() => {
        fetchAllExperts();
        fetchAllLibraries();
    }, []);

    return (
        <Grid container spacing={0} alignItems="center" justifyContent="center">
            <Card
                sx={{
                    minWidth: 275,
                    width: 400,
                    justifyContent: 'center',
                    borderRadius: '8px',
                    overflowY: 'auto',
                    backgroundColor: '#DCDCDC',
                    marginY: '20px'
                }}
            >
                <CardContent>
                    <Typography variant="h6" color="initial">
                        List of Experts
                    </Typography>
                    <List sx={{ width: 350 }} component="nav" aria-labelledby="nested-list-subheader">
                        {allExperts.map((item, index) => {
                            return (
                                <ListItemButton
                                    key={item.user}
                                    sx={{
                                        border: '2px solid #00BFFF',
                                        paddingY: '10px',
                                        marginY: '10px',
                                        backgroundColor: '#F5F5DC',
                                        borderRadius: '10px'
                                    }}
                                    onClick={() => {
                                        setOpenExpertsDialogue(true);
                                        setExpertsTitle(item.name);
                                        setExpertId(item.id);
                                    }}
                                >
                                    <ListItemIcon>
                                        <AccountCircleIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={item.name} />
                                </ListItemButton>
                            );
                        })}
                    </List>
                </CardContent>
            </Card>

            {openExpertsDialogue && (
                <AllExpertsDialogue
                    openExpertsDialogue={openExpertsDialogue}
                    setOpenExpertsDialogue={setOpenExpertsDialogue}
                    ExpertName={expertsTitle}
                    expertId={expertId}
                    allLibraries={allLibraries}
                />
            )}
        </Grid>
    );
}
