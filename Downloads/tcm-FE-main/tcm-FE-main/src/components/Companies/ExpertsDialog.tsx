import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    FormGroup
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import expertService from '../../services/expert.service';
import errorHandler from '../../utils/errorHandler';

const ExpertsDialog = ({ onSave, setShowExpertDialog, expertsList, setExpertsList }) => {
    const [allExperts, setAllExperts] = useState([]);
    useEffect(() => {
        fetchAllExperts();
        // fetchAllLibraries();
    }, []);

    const fetchAllExperts = () => {
        expertService
            .getAllExperts()
            .then(data => {
                setAllExperts(data);
            })
            .catch(error => {
                errorHandler(error);
            });
    };

    interface expertType {
        name: string;
        id: number;
        user?: number;
    }

    const handleChange = (value: boolean, id: number) => {
        if (value) {
            setExpertsList([...expertsList, id]);
        } else {
            let filteredArray = expertsList.filter(item => item !== id);
            setExpertsList(filteredArray);
        }
    };

    return (
        <div>
            <Dialog
                open={true}
                onClose={() => 'hello'}
                sx={{
                    '& .MuiDialog-container': {
                        '& .MuiPaper-root': {
                            width: '100%',
                            maxWidth: '500px'
                        }
                    }
                }}
            >
                <DialogTitle>Link Experts To Company</DialogTitle>
                <DialogContent>
                    <FormGroup>
                        {allExperts.map((item: expertType) => {
                            return (
                                <FormControlLabel
                                    key={item!.id}
                                    control={
                                        <Checkbox
                                            onChange={e => handleChange(e.target.checked, item.id)}
                                            name={item!.name}
                                            value={item!.id}
                                            checked={expertsList.includes(item.id)}
                                        />
                                    }
                                    label={item!.name}
                                />
                            );
                        })}
                    </FormGroup>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowExpertDialog(false)}>Cancel</Button>
                    <Button
                        onClick={() => {
                            onSave();
                        }}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ExpertsDialog;
