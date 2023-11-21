import React, { useState, useEffect } from 'react';
import { Button, Grid, IconButton, MenuItem, Paper, Select, TextField } from '@material-ui/core';
import { LibraryItem } from './LibraryItem';
import LibraryItemService from '../../services/library-item.service';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import MyDialog2 from './MyDialog2';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface LibraryItemFormProps {
    libraryId: number;
    itemId: number;
    items: LibraryItem[];
    treeItems: LibraryItem[];
    onSave: (item: LibraryItem) => void;
    onCancel: () => void;
    onReorder: (item1: LibraryItem, item2: LibraryItem) => void;
    style?: React.CSSProperties;
}

function libraryItemSort(itemA, itemB) {
    if (itemA.Sequence === Infinity) return 1;
    else if (isNaN(itemA.Sequence)) return -1;
    else return itemA.Sequence - itemB.Sequence;
}

function LibraryItemForm(props: LibraryItemFormProps) {
    const [currentUserId, setCurrentUserId] = useState<number>(0);
    const [item, setItem] = useState<LibraryItem>({
        Id: 0,
        Nr: '',
        Parent: 0,
        Title: '',
        Level: 0,
        Sequence: 0,
        Type: ''
    } as LibraryItem);
    const [parentItem, setParentItem] = useState<LibraryItem | null>(null);
    const [prevItem, setPrevItem] = useState<LibraryItem | null>(null);
    const [nextItem, setNextItem] = useState<LibraryItem | null>(null);

    const [open, setOpen] = useState<boolean>(false);
    const [menuItems, setMenuItems] = useState<JSX.Element[]>([]);
    const [errors, setErrors] = useState({});
    const [sequence, setSequence] = useState<number>(0);

    useEffect(() => {
        if (props.items.filter(item => item.Id == props.itemId).length > 0) {
            var item1 = props.items.filter(item => item.Id == props.itemId)[0];
            setItem(item1);
            setSequence(item1.Sequence);

            var prevItems = props.items
                .filter(
                    item2 => item2.Parent == item1.Parent && item2.Id != item1.Id && item2.Sequence < item1.Sequence
                )
                .sort(libraryItemSort);
            setPrevItem(prevItems.length > 0 ? prevItems[prevItems.length - 1] : null);

            var nextItems = props.items
                .filter(
                    item3 => item3.Parent == item1.Parent && item3.Id != item1.Id && item3.Sequence > item1.Sequence
                )
                .sort(libraryItemSort);
            setNextItem(nextItems.length > 0 ? nextItems[0] : null);

            var parentItems = props.items.filter(x => x.Id == item1.Parent);
            if (parentItems.length > 0) {
                setParentItem(parentItems[0]);
            } else {
                setParentItem(null);
            }
        }
        var menuItems = [] as JSX.Element[];
        menuItems.push(
            <MenuItem key={'MenuItem-0'} style={{ paddingTop: '0px', height: '30px' }} value={0}></MenuItem>
        );
        props.treeItems
            .filter(item => item.Parent == null || item.Parent == 0)
            .sort((a: LibraryItem, b: LibraryItem) => (a.Sequence > b.Sequence ? 1 : b.Sequence > a.Sequence ? -1 : 0))
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
                menuItems = menuItems.concat(getChildMenuItems(props.treeItems, item.Id));
            });
        setMenuItems(menuItems);

        if (props.itemId == 0) {
            var topSequences = props.treeItems.filter(x => x.Parent == null || x.Parent == 0).map(y => y.Sequence);
            if (topSequences.length == 0) setSequence(1);
            else setSequence(Math.max(...topSequences) + 1);
        }
    }, [props.itemId, props.items, props.treeItems]);

    useEffect(() => {
        const userStr = localStorage.getItem('user');
        const userId = userStr !== null ? JSON.parse(userStr).user_info.id : '';
        setCurrentUserId(userId);
    }, []);

    useEffect(() => {
        if (!open && props.itemId == 0) {
            setItem({
                Id: 0,
                Nr: '',
                Parent: 0,
                Title: '',
                Level: 0,
                Sequence: 0,
                Type: '',
                Root: 0
            });
        }
    }, [open]);
    const validateQuillContent = () => {
        if (!item.Title || item.Title.trim() === '<p><br></p>') {
            setErrors({ ...errors, Title: 'Title is required' });
            return false;
        }
        return true;
    };
    const onSave = () => {
        if (validateQuillContent()) {
            var errors1 = {};
            if (item.Title.length == 0) errors1['Title'] = 'Required';
            if (item.Type.length == 0) errors1['Type'] = 'Required';
            setErrors(errors1);
            if (Object.keys(errors1).length == 0) {
                LibraryItemService.update(
                    props.libraryId,
                    item.Id,
                    item.Parent,
                    item.Nr,
                    item.Title,
                    item.Type,
                    item.Level,
                    sequence,
                    currentUserId
                )
                    .then(response => {
                        if (item.Id == 0) {
                            item.Id = response.data.id;
                        }
                        item.Sequence = sequence;
                        props.onSave(item);
                        setOpen(false);
                    })
                    .catch(error => {
                        props.onSave(item);
                        setOpen(false);
                    });
            }
        }
    };

    const customToolbar = [
        ['bold', 'italic', 'underline'], // text formatting
        ['link'] // links
    ];

    return (
        <div style={{ ...props.style, alignItems: 'center' }}>
            <IconButton
                style={{ padding: '5px' }}
                onClick={() => {
                    setOpen(true);
                }}
            >
                {props.itemId == 0 ? <AddIcon fontSize="small" /> : <EditIcon fontSize="small" />}
            </IconButton>
            <MyDialog2
                key={`LibraryItemEditDialog${item.Id}`}
                style={{ display: 'inline-block' }}
                title={'Library Item - ' + (props.itemId == 0 ? 'New' : 'Edit')}
                open={open}
                onClose={() => {
                    setOpen(false);
                }}
                headerRight={
                    <div>
                        <IconButton
                            style={{
                                padding: '0px',
                                visibility: prevItem == null ? 'hidden' : 'visible',
                                backgroundColor: 'white'
                            }}
                            onClick={e => {
                                if (prevItem != null) {
                                    var sequence = item.Sequence;
                                    item.Sequence = prevItem.Sequence;
                                    prevItem.Sequence = sequence;
                                    props.onReorder(item, prevItem);
                                }
                            }}
                        >
                            <ArrowUpwardIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                            style={{
                                padding: '3px',
                                visibility: nextItem == null ? 'hidden' : 'visible',
                                backgroundColor: 'white'
                            }}
                            onClick={e => {
                                if (nextItem != null) {
                                    var sequence = item.Sequence;
                                    item.Sequence = nextItem.Sequence;
                                    nextItem.Sequence = sequence;
                                    props.onReorder(item, nextItem);
                                }
                            }}
                        >
                            <ArrowDownwardIcon fontSize="small" />{' '}
                        </IconButton>
                    </div>
                }
            >
                <div style={{ height: '300px', textAlign: 'left', paddingTop: '0px' }}>
                    <Paper style={{ padding: 16 }}>
                        <Grid container alignItems="flex-start" spacing={2}>
                            <Grid item xs={12}>
                                <Select
                                    label="Parent"
                                    style={{ width: '100%', paddingTop: '15px' }}
                                    value={item.Parent}
                                    required={true}
                                    onChange={e => {
                                        setItem({ ...item, Parent: Number(e.target.value) });
                                        var parentItems = props.treeItems.filter(x => x.Id == Number(e.target.value));
                                        if (parentItems.length > 0) {
                                            setParentItem(parentItems[0]);
                                            setItem({
                                                ...item,
                                                Parent: Number(e.target.value),
                                                Root: parentItems[0].Root
                                            });
                                        } else {
                                            setParentItem(null);
                                            setItem({ ...item, Parent: 0, Type: 'Chapter', Level: 0 });
                                        }
                                        LibraryItemService.getByParent(props.libraryId, Number(e.target.value)).then(
                                            response1 => {
                                                if (response1.data.length == 0) setSequence(1);
                                                else setSequence(Math.max(...response1.data.map(y => y.sequence)) + 1);
                                            }
                                        );
                                    }}
                                >
                                    {menuItems}
                                </Select>
                            </Grid>
                            <Grid item xs={3}>
                                <Select
                                    label="Type"
                                    style={{ width: '100%', paddingTop: '15px' }}
                                    value={item.Type}
                                    required={true}
                                    onChange={e =>
                                        setItem({
                                            ...item,
                                            Type: `${e.target.value}`,
                                            Level: [
                                                'Chapter',
                                                'SubChapter',
                                                'Article',
                                                'Paragraph',
                                                'SubParagraph'
                                            ].indexOf(`${e.target.value}`)
                                        })
                                    }
                                >
                                    {parentItem == null && <MenuItem value="Chapter">Chapter</MenuItem>}
                                    {parentItem != null && parentItem.Type == 'Chapter' && (
                                        <MenuItem value="SubChapter">SubChapter</MenuItem>
                                    )}
                                    {parentItem != null &&
                                        (parentItem.Type == 'Chapter' || parentItem.Type == 'SubChapter') && (
                                            <MenuItem value="Article">Article</MenuItem>
                                        )}
                                    {parentItem != null &&
                                        (parentItem.Type == 'Chapter' ||
                                            parentItem.Type == 'SubChapter' ||
                                            parentItem.Type == 'Article') && (
                                            <MenuItem value="Paragraph">Paragraph</MenuItem>
                                        )}
                                    {parentItem != null && <MenuItem value="SubParagraph">SubParagraph</MenuItem>}
                                </Select>
                            </Grid>
                            <Grid item xs={2}>
                                <TextField
                                    label="Number"
                                    variant="standard"
                                    value={item.Nr}
                                    style={{ width: '100%' }}
                                    onChange={e => setItem({ ...item, Nr: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={5}></Grid>
                            <Grid item xs={12}>
                                <label htmlFor="Title">Title</label>
                                <ReactQuill
                                    id="Title"
                                    value={item.Title}
                                    onChange={e => setItem({ ...item, Title: e })}
                                    className={errors.hasOwnProperty('Title') ? 'react-quill-error' : ''}
                                    modules={{ toolbar: customToolbar }}
                                />
                            </Grid>
                            <Grid item style={{ marginTop: 16 }}>
                                <Button type="button" variant="contained" onClick={props.onCancel}>
                                    Reset
                                </Button>
                            </Grid>
                            <Grid item style={{ marginTop: 16 }}>
                                <Button variant="contained" color="primary" type="submit" onClick={onSave}>
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </div>
            </MyDialog2>
        </div>
    );
}

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
                >{`${item.Nr ? item.Nr + ' ' : ''}${item.Title}`}</MenuItem>
            );
            menuItems = menuItems.concat(getChildMenuItems(items, item.Id));
        });
    return menuItems;
}

export default LibraryItemForm;
