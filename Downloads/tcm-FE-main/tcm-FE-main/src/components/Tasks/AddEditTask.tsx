import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import styles

import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select
} from '@mui/material';
import { Dayjs } from 'dayjs';
import DateInput from '../formItems/DateInput';
import customerService from '../../services/customer.service';
import taskService from '../../services/task.service';
import swal from 'sweetalert';
import { useParams } from 'react-router';
import errorHandler from '../../utils/errorHandler';
import { LibraryItem } from '../LibraryItem/LibraryItem';
import libraryItemService from '../../services/library-item.service';

interface TaskProps {
    id?: number;
    title: string;
    description: string;
    libraryId: number | null;
    libraryItemId: number | null;
    assigned_to: number | null;
    status: string;
    due_date: Dayjs | null;
}

interface LibraryProps {
    id: number;
    identifier: string;
}

interface UserProps {
    id: number;
    name: string;
}

interface SelectedDataTypes {
    id?: number;
    title: string;
    description: string;
    libraryId: number | null;
    libraryItemId: number | null;
    assigned_to: number | null;
    status: string;
    due_date: Dayjs | null;
}

interface PropTypes {
    showAddTaskModel: boolean;
    setShowAddTaskModel: (arg: boolean) => void;
    fromEdit: boolean;
    setFromEdit: (arg: boolean) => void;
    setSubmitDone: (arg: boolean) => void;
    selectedData: SelectedDataTypes;
    fetchTasks: () => void;
    libraryId?: number;
    libraryItemId?: number;
}
const AddEditTask = ({
    showAddTaskModel,
    setShowAddTaskModel,
    fromEdit,
    setFromEdit,
    setSubmitDone,
    selectedData,
    fetchTasks,
    libraryId,
    libraryItemId
}: PropTypes) => {
    const params = useParams();

    const [taskForm, setTaskForm] = useState<TaskProps>({
        title: '',
        description: '',
        libraryId: null,
        libraryItemId: null,
        assigned_to: null,
        status: '',
        due_date: null
    });

    const [libraries, setLibraries] = useState<LibraryProps[]>([]);
    const [users, setUsers] = useState<UserProps[]>([]);
    const [menuItems, setMenuItems] = useState<JSX.Element[]>([]);

    const handleChange = e => {
        const { name, value } = e.target;

        setTaskForm(prev => ({ ...prev, [name]: value }));
    };

    const [customerId, setCustomerId] = useState<any>();

    useEffect(() => {
        if (fromEdit) {
            setTaskForm(selectedData);
        } else {
            setTaskForm({
                title: '',
                description: '',
                libraryId: params.libraryId ? +params.libraryId : libraryId ? libraryId : null,
                libraryItemId: libraryItemId ? libraryItemId : null,
                assigned_to: null,
                status: '',
                due_date: null
            });
        }
    }, [fromEdit]);

    // Get Token From Local Storage
    useEffect(() => {
        const userData: any = localStorage.getItem('user');
        const parsedData = JSON.parse(userData);
        const userId = parsedData.user_info.cusid;
        setCustomerId(userId);
    }, []);

    const fetchLibraries = () => {
        if (customerId) {
            customerService
                .getLibraryByCusId(customerId)
                .then(data => {
                    const librariesofCustomer = data.data.data.map(current => current.library);
                    setLibraries(librariesofCustomer);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    };

    const fetchUsers = () => {
        customerService
            .getAllCustomerUsers(customerId)
            .then(data => {
                let activeUsers = data.data.filter(user => user.is_active);
                console.log(activeUsers, '<==actve userssss');

                setUsers(activeUsers);
            })
            .catch(error => {
                errorHandler(error);
            });
    };
    useEffect(() => {
        if (customerId) {
            fetchLibraries();
            fetchUsers();
        }

        //eslint-disable-next-line
    }, [customerId]);

    useEffect(() => {
        if (taskForm.libraryId) {
            libraryItemService.getByLevel(taskForm.libraryId, 2).then(response => {
                var items1 = response.data.map(dataItem => {
                    return {
                        Id: dataItem.id,
                        Nr: dataItem.number,
                        Parent: dataItem.parent,
                        Title: dataItem.title,
                        Level: dataItem.level,
                        Sequence: dataItem.sequence,
                        Type: dataItem.type,
                        Root: dataItem.root_node
                    } as LibraryItem;
                });
                items1 = items1.filter(
                    item1 => ['Chapter', 'SubChapter', 'Article', 'Paragraph', 'SubParagraph'].indexOf(item1.Type) < 3
                );
                var menuItems = [] as JSX.Element[];
                menuItems.push(
                    <MenuItem
                        key={'MenuItem-0'}
                        style={{ paddingTop: '0px', height: '30px' }}
                        value={0}
                        disabled={true}
                    ></MenuItem>
                );
                items1
                    .filter(item => item.Parent == null || item.Parent == 0)
                    .sort((a: LibraryItem, b: LibraryItem) =>
                        a.Sequence > b.Sequence ? 1 : b.Sequence > a.Sequence ? -1 : 0
                    )
                    .forEach(item => {
                        menuItems.push(
                            <MenuItem
                                key={`MenuItem-${item.Id}`}
                                style={{ paddingTop: '0px', paddingLeft: '20px' }}
                                value={item.Id}
                            >
                                {(item.Nr ? item.Nr + ' ' : '') + item.Title}
                            </MenuItem>
                        );
                        menuItems = menuItems.concat(getChildMenuItems(items1, item.Id));
                    });
                setMenuItems(menuItems);
            });
        }
    }, [customerId, taskForm.libraryId]);

    const submitForm = async () => {
        // Add Library
        if (!fromEdit) {
            taskService
                .addLibraryItemTask(taskForm)
                .then(data => {
                    if (data.success) {
                        setShowAddTaskModel(false);
                        setSubmitDone(true);

                        setTaskForm({
                            title: '',
                            description: '',
                            libraryId: null,
                            libraryItemId: null,
                            assigned_to: null,
                            status: '',
                            due_date: null
                        });
                        swal({
                            title: 'Your Task has been Added!',
                            icon: 'success',
                            timer: 2000
                        });
                        fetchTasks();
                    } else {
                        errorHandler(data);
                    }
                })
                .catch(error => {
                    errorHandler(error);
                });
        }
        // Edit Library
        else if (fromEdit) {
            taskService
                .editLibraryItemTask(taskForm)
                .then(data => {
                    setFromEdit(false);
                    if (data.success) {
                        setShowAddTaskModel(false);
                        setSubmitDone(true);
                        swal({
                            title: 'Your Task has been Updated!',
                            icon: 'success',
                            timer: 2000
                        });
                        fetchTasks();
                    } else {
                        errorHandler(data);
                    }
                })
                .catch(error => {
                    errorHandler(error);
                });
        }
    };

    return (
        <div>
            <Dialog
                open={showAddTaskModel}
                onClose={() => setShowAddTaskModel(false)}
                sx={{
                    '& .MuiDialog-container': {
                        '& .MuiPaper-root': {
                            width: '100%',
                            maxWidth: '800px'
                        }
                    }
                }}
            >
                <DialogTitle>{fromEdit ? 'Edit Task' : 'Add Task'}</DialogTitle>
                <DialogContent>
                    <Box sx={{ flexGrow: 1, marginY: 2 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6} md={4} lg={6}>
                                <InputLabel>Title</InputLabel>
                                <ReactQuill
                                    value={taskForm.title}
                                    onChange={value => setTaskForm(prev => ({ ...prev, title: value }))}
                                />
                            </Grid>
                            <Grid item xs={6} md={4} lg={6}>
                                <InputLabel>Description</InputLabel>
                                <ReactQuill
                                    value={taskForm.description}
                                    onChange={value => setTaskForm(prev => ({ ...prev, description: value }))}
                                />
                            </Grid>
                            <Grid item xs={6} md={4} lg={6}>
                                <FormControl style={{ width: '100%' }}>
                                    <InputLabel>Library</InputLabel>
                                    <Select
                                        label="Library"
                                        placeholder="Library"
                                        style={{ alignContent: 'center' }}
                                        name="libraryId"
                                        // defaultValue={params.id}
                                        value={taskForm.libraryId}
                                        required={true}
                                        disabled={params.libraryId ? true : libraryId ? true : false}
                                        onChange={handleChange}
                                    >
                                        {libraries.map(item => (
                                            <MenuItem key={item.id} value={item.id}>
                                                {item.identifier}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} md={4} lg={6}>
                                <FormControl style={{ width: '100%' }}>
                                    <InputLabel>Library Item</InputLabel>
                                    <Select
                                        label="Library Item"
                                        placeholder="Library Item"
                                        style={{ alignContent: 'center' }}
                                        name="libraryItemId"
                                        value={taskForm.libraryItemId}
                                        disabled={libraryItemId ? true : false}
                                        required={true}
                                        onChange={handleChange}
                                    >
                                        {/* {libraryItems.map(item => (
                                            <MenuItem key={item.id} value={item.id}>
                                                {item.type == "Chapter" ? `${item.title}` : item.type == "SubChapter" ? ` - ${item.title}` : ` - - ${item.title}`}
                                            </MenuItem>
                                        ))} */}
                                        {menuItems}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} md={4} lg={6}>
                                <FormControl style={{ width: '100%' }}>
                                    <InputLabel>Assign To</InputLabel>
                                    <Select
                                        label="Assign To"
                                        placeholder="Assign To"
                                        style={{ alignContent: 'center' }}
                                        name="assigned_to"
                                        value={taskForm.assigned_to}
                                        required={true}
                                        onChange={handleChange}
                                    >
                                        {users.map(item => (
                                            <MenuItem key={item.id} value={item.id}>
                                                {item.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} md={4} lg={6}>
                                <FormControl style={{ width: '100%' }}>
                                    <InputLabel>Status</InputLabel>
                                    <Select
                                        label="status"
                                        placeholder="status"
                                        style={{ alignContent: 'center' }}
                                        name="status"
                                        value={taskForm.status}
                                        required={true}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="New">New</MenuItem>
                                        <MenuItem value="In-Progress">In-Progress</MenuItem>
                                        <MenuItem value="On-Hold">On-Hold</MenuItem>
                                        <MenuItem value="Closed">Closed</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} md={4} lg={6}>
                                <DateInput
                                    label="Due Date"
                                    value={taskForm.due_date}
                                    onChange={value => setTaskForm(prev => ({ ...prev, due_date: value }))}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            setShowAddTaskModel(false);
                            setFromEdit(false);
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            submitForm();
                            setFromEdit(false);
                            // setSubmitDone(true)
                        }}
                    >
                        {fromEdit ? 'Update' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

function getChildMenuItems(items: LibraryItem[], itemId: number): JSX.Element[] {
    var menuItems = [] as JSX.Element[];
    items
        .filter(item => item.Parent == itemId && item.Level < 3)
        .sort((a: LibraryItem, b: LibraryItem) => (a.Sequence > b.Sequence ? 1 : b.Sequence > a.Sequence ? -1 : 0))
        .forEach(item => {
            menuItems.push(
                <MenuItem
                    key={`MenuItem-${item.Id}`}
                    style={{ paddingTop: '0px', paddingLeft: `${item.Level * 20 + 20}px` }}
                    value={item.Id}
                    itemType={item.Type}
                >{`${item.Nr ? item.Nr + ' ' : ''}${item.Title.substring(0, 100)}`}</MenuItem>
            );
            menuItems = menuItems.concat(getChildMenuItems(items, item.Id));
        });
    return menuItems;
}

export default AddEditTask;
