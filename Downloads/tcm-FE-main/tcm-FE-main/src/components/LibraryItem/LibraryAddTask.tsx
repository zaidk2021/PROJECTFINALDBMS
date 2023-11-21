import React, { useState } from 'react';
import AddTask from '../Tasks/AddEditTask';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { IconButton } from '@material-ui/core';
import { LibraryItem } from './LibraryItem';

interface LibraryTaskPropTypes {
    item: LibraryItem;
    itemId: number;
    libraryId: number;
    style?: React.CSSProperties;
    center?: boolean;
}

const LibraryAddTask = (props: LibraryTaskPropTypes) => {
    const [showAddTaskModel, setShowAddTaskModel] = useState(false);
    const ItemTypes = ['Chapter', 'SubChapter', 'Article'];
    return (
        <div className={`${props.center ? 'd-flex align-items-center' : ''} ps-2 `}>
            <IconButton
                style={{
                    ...props.style,
                    visibility: props.item.Applicable && props.style ? props.style.visibility : 'hidden',
                    padding: '5px'
                }}
                className={!ItemTypes.includes(props.item.Type) ? 'invisible' : ''}
                title="Add Task"
                onClick={() => setShowAddTaskModel(true)}
            >
                <AddTaskIcon fontSize="small" />
            </IconButton>
            {showAddTaskModel && (
                <AddTask
                    selectedData={{
                        id: undefined,
                        title: '',
                        description: '',
                        libraryId: null,
                        libraryItemId: null,
                        assigned_to: null,
                        status: '',
                        due_date: null
                    }}
                    fromEdit={false}
                    setFromEdit={_a => {}}
                    setSubmitDone={() => {}}
                    showAddTaskModel={showAddTaskModel}
                    setShowAddTaskModel={setShowAddTaskModel}
                    fetchTasks={() => {}}
                    libraryId={props.libraryId}
                    libraryItemId={props.itemId}
                />
            )}
        </div>
    );
};

export default LibraryAddTask;
