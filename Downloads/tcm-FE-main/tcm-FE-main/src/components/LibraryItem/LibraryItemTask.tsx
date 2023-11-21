import React, { useState } from 'react';
import { Button, Grid, TextField } from '@material-ui/core';
import { LibraryItem } from './LibraryItem';
import AddTaskIcon from '@mui/icons-material/AddTask';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
interface LibraryItemTaskProps {
    libraryId: number;
    itemId: number;
    items: LibraryItem[];
    onLoad: (text: string) => void;
    onSave: (text: string) => void;
    onCancel: () => void;
    style?: React.CSSProperties;
}

interface TaskProps {
    title: string;
    description: string;
    assign_to: string;
    due_date: string;
}

export default function LibraryItemTask(props: LibraryItemTaskProps) {
    const [openTaskList, setOpenTaskList] = useState<boolean>(false);
    const [openAddTask, setOpenAddTask] = useState<boolean>(false);

    const [addTaskForm, setaddTaskForm] = useState<TaskProps>({
        title: '',
        description: '',
        assign_to: '',
        due_date: ''
    });

    const addTaskOnChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        setaddTaskForm({
            ...addTaskForm,
            [name]: value
        });
    };

    return (
        <div style={{ ...props.style, alignItems: 'center' }}>
            <IconButton style={{ padding: '5px' }} onClick={() => setOpenTaskList(true)}>
                <AddTaskIcon fontSize="small" />
            </IconButton>
            {/* Task List Dialogue */}
            <Dialog
                open={openTaskList}
                onClose={() => setOpenTaskList(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{'Task List'}</DialogTitle>
                <DialogContent>
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        <ListItem alignItems="flex-start">
                            <ListItemText
                                primary="Brunch this weekend?"
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            Ali Connors
                                        </Typography>
                                        {" — I'll be in your neighborhood doing errands this…"}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem alignItems="flex-start">
                            <ListItemText
                                primary="Summer BBQ"
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            to Scott, Alex, Jennifer
                                        </Typography>
                                        {" — Wish I could come, but I'm out of town this…"}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem alignItems="flex-start">
                            <ListItemText
                                primary="Oui Oui"
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            Sandra Adams
                                        </Typography>
                                        {' — Do you have Paris recommendations? Have you ever…'}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                    </List>
                </DialogContent>
                <DialogActions>
                    <Grid container justifyContent="flex-start">
                        <Button
                            variant="contained"
                            startIcon={<AddCircleIcon />}
                            onClick={() => setOpenAddTask(true)}
                            style={{ textTransform: 'none', color: 'blue' }}
                        >
                            Add Task
                        </Button>
                    </Grid>
                    <Grid container justifyContent="flex-end">
                        <Button variant="contained" onClick={() => setOpenTaskList(false)}>
                            Close
                        </Button>
                    </Grid>
                </DialogActions>
            </Dialog>
            {/* Task List Dialogue */}

            {/* Task Dialogue */}
            <Dialog
                open={openAddTask}
                onClose={() => {
                    setOpenAddTask(false);
                }}
                sx={{
                    '& .MuiDialog-container': {
                        '& .MuiPaper-root': {
                            width: '100%',
                            maxWidth: '800px'
                        }
                    }
                }}
            >
                <DialogTitle>Add Task</DialogTitle>
                <DialogContent>
                    <Box sx={{ flexGrow: 1, marginY: 2 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6} md={4} lg={12}>
                                <label htmlFor="title">Title:</label>
                                <ReactQuill
                                    id="title"
                                    placeholder="value in text"
                                    value={addTaskForm.title}
                                    onChange={addTaskOnChange}
                                />
                            </Grid>
                            <Grid item xs={6} md={4} lg={12}>
                                <label htmlFor="description">Description:</label>
                                <ReactQuill
                                    id="description"
                                    placeholder="value in text"
                                    value={addTaskForm.description}
                                    onChange={addTaskOnChange}
                                />
                            </Grid>
                            <Grid item xs={6} md={4} lg={6}>
                                <TextField
                                    id="assign_to"
                                    name="assign_to"
                                    placeholder="value in text"
                                    label="Assign To"
                                    variant="outlined"
                                    fullWidth
                                    value={addTaskForm.assign_to}
                                    onChange={addTaskOnChange}
                                />
                            </Grid>
                            <Grid item xs={6} md={4} lg={6}>
                                <TextField
                                    id="due_date"
                                    name="due_date"
                                    placeholder="value in text"
                                    label="Due Date"
                                    variant="outlined"
                                    fullWidth
                                    value={addTaskForm.due_date}
                                    onChange={addTaskOnChange}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ paddingX: 3, paddingBottom: 3 }}>
                    <Button
                        onClick={() => {
                            setOpenAddTask(false);
                        }}
                    >
                        Cancel
                    </Button>
                    <Button variant="contained">Save</Button>
                </DialogActions>
            </Dialog>
            {/* Task Dialogue */}
        </div>
    );
}
