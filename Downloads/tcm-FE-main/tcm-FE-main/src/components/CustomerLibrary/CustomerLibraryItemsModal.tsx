import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import { Checkbox, FormControlLabel, TextField } from '@material-ui/core';
import LibraryService from '../../services/library.service';
import CustomerService from '../../services/customer.service';
import CircularProgress from '@mui/material/CircularProgress';
import errorHandler from '../../utils/errorHandler';

export default function CustomerLibraryItemsModal(props) {
    const { show, close, libraryId } = props;
    const [selectedLibraryItems, setSelectedLibraryItems] = useState<string[]>([]);
    const [remarks, setRemarks] = useState<string>('');
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [libraryItemsList, setLibraryItemsList] = useState<{ [key: string]: any }>({});
    const [customerId, setCustomerId] = useState<any>();
    const [loading, setLoading] = useState<boolean>(true);

    interface RenderTree {
        id: string;
        title: string;
        children?: RenderTree[];
    }
    // Get AccessToken From Local Storage
    useEffect(() => {
        const userData: any = localStorage.getItem('user');
        const parsedData = JSON.parse(userData);
        const userId = parsedData.user_info.cusid;
        setCustomerId(userId);
    }, []);

    // 1- Get All Library Items By LibraryID
    useEffect(() => {
        LibraryService.getLibItemByLibIdLevelId(libraryId, 2)
            .then(data => {
                //Merge Child into Root
                var root: any = {
                    id: '0',
                    title: 'Select All Items',
                    children: []
                };
                data.data.data = data.data.data.filter(
                    item => ['Chapter', 'SubChapter', 'Article', 'Paragraph', 'SubParagraph'].indexOf(item.type) < 3
                );
                root.children = data.data.data
                    .filter(item => item.parent === null || item.parent === 0)
                    .sort((a, b) => (a.sequence > b.sequence ? 1 : b.sequence > a.sequence ? -1 : 0))
                    .map(item => {
                        return {
                            id: item.id,
                            title: item.title,
                            children: getChildren(data.data.data, item.id)
                        };
                    });
                setLibraryItemsList(root);
                setRemarks('');
                //Get Child Items
                function getChildren(items, itemId) {
                    let childItems: any = [];
                    items
                        .filter(item => item.parent == itemId)
                        .sort((a, b) => (a.sequence > b.sequence ? 1 : b.sequence > a.sequence ? -1 : 0))
                        .forEach(item => {
                            childItems.push({
                                id: item.id,
                                title: item.title,
                                children: getChildren(items, item.id)
                            });
                        });
                    return childItems;
                }
            })
            .catch(error => {});
    }, []);
    // 1- Get All Library Items By LibraryID

    // 2- Get All Selected Library Items of Customers
    useEffect(() => {
        if (customerId) {
            getCustomerLibraryItems();
        }
    }, [customerId]);

    const getCustomerLibraryItems = () => {
        const cus_id = customerId;
        const lib_id = libraryId;

        CustomerService.getCusLibItemByCusIdLibId(cus_id, lib_id)
            .then(data => {
                if (data.data.data.length !== 0) {
                    //Selected Multiple Library Items
                    // setShowTreeViewItems(true);
                    const selectedLibItems = data.data.data
                        .filter(x => x.applicable)
                        .map(items => items.libraryitem.id);
                    setSelectedLibraryItems(selectedLibItems);
                    setSelectedIds(selectedLibItems);
                    setLoading(false);
                } else {
                    // setShowTreeViewItems(false);
                }
            })
            .catch(error => errorHandler(error));
    };
    // 2- Get All Selected Library Items of Customers

    // Get Child By ID
    function getChildById(libraryItemsList: any, id: string) {
        let array: string[] = [];
        // Select All
        function getAllChild(nodes: RenderTree | null) {
            if (nodes === null) return [];
            array.push(nodes.id);
            if (Array.isArray(nodes.children)) {
                nodes.children.forEach(libraryItemsList => {
                    array = [...array, ...getAllChild(libraryItemsList)];
                    array = array.filter((v, i) => array.indexOf(v) === i);
                });
            }
            return array;
        }
        function getNodeById(nodes: RenderTree, id: string) {
            if (nodes.id === id) {
                return nodes;
            } else if (Array.isArray(nodes.children)) {
                let result: any = null;
                nodes.children.forEach(node => {
                    if (!!getNodeById(node, id)) {
                        result = getNodeById(node, id);
                    }
                });
                return result;
            }
            return null;
        }
        return getAllChild(getNodeById(libraryItemsList, id));
    }

    const getMembers = members => {
        let children = [] as any[];
        const flattenMembers = members.map(m => {
            if (m.children && m.children.length) {
                children = [...children, ...m.children];
            }
            return m;
        });

        return flattenMembers.concat(children.length ? getMembers(children) : children);
    };

    // Get On Change
    function getOnChange(checked: boolean, nodes: RenderTree) {
        const allNode: string[] = getChildById(libraryItemsList, nodes.id);
        let array = checked
            ? [...selectedLibraryItems, ...allNode]
            : selectedLibraryItems.filter(value => !allNode.includes(value));
        array = array.filter((v, i) => array.indexOf(v) === i);

        const allNodes = getMembers(libraryItemsList.children);
        let currNodeId = nodes.id;
        for (let i = 0; i < 3; i++) {
            const parentNode = allNodes.filter(
                allNode => allNode.children.filter(child => child.id == currNodeId).length > 0
            );
            if (parentNode.length > 0) {
                const selectedChildren = array.filter(id => parentNode[0].children.map(x => x.id).includes(id));
                if (selectedChildren.length == 0) {
                    array = array.filter(id => id !== parentNode[0].id);
                } else {
                    if (array.indexOf(parentNode[0].id) == -1) array.push(parentNode[0].id);
                }
                currNodeId = parentNode[0].id;
            } else break;
        }
        setSelectedLibraryItems(array);
    }

    // RenderTree
    const renderTree = (nodes: any) => {
        return (
            <TreeItem
                key={nodes.id}
                nodeId={nodes.id}
                label={
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={
                                    nodes.children.length == 0
                                        ? selectedLibraryItems.some(item => item === nodes.id)
                                        : nodes.children.filter(child => selectedLibraryItems.includes(child.id))
                                              .length == nodes.children.length
                                }
                                indeterminate={
                                    nodes.children.filter(child => selectedLibraryItems.includes(child.id)).length >
                                        0 &&
                                    nodes.children.filter(child => selectedLibraryItems.includes(child.id)).length !=
                                        nodes.children.length
                                }
                                onChange={event => {
                                    getOnChange(event.currentTarget.checked, nodes);
                                }}
                                onClick={e => e.stopPropagation()}
                            />
                        }
                        label={<>{nodes.title}</>}
                        key={nodes.id}
                    />
                }
            >
                {/* {Array.isArray(nodes.children) ? nodes.children.map(node => renderTree(node)) : null} */}
                {nodes.children ? nodes.children.map(node => renderTree(node)) : null}
            </TreeItem>
        );
    };

    return (
        <div>
            <Dialog
                open={show}
                onClose={() => close(false)}
                sx={{
                    '& .MuiDialog-container': {
                        '& .MuiPaper-root': {
                            width: '100%',
                            maxWidth: '800px'
                        }
                    }
                }}
            >
                <DialogTitle>Customer Library Items</DialogTitle>

                <DialogContent sx={{ height: '500px' }}>
                    {loading ? (
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <Box
                            component="form"
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap'
                            }}
                        >
                            <FormControl sx={{ m: 1, minWidth: '700px' }}>
                                <TreeView
                                    defaultCollapseIcon={<ExpandMoreIcon />}
                                    defaultExpandIcon={<ChevronRightIcon />}
                                    defaultExpanded={['0', '3', '4', '5', '10']}
                                >
                                    {renderTree(libraryItemsList)}
                                </TreeView>
                            </FormControl>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <TextField
                        variant="outlined"
                        style={{ width: 'calc(100% - 195px' }}
                        placeholder="Remarks"
                        onChange={e => setRemarks(e.target.value)}
                    >
                        {remarks}
                    </TextField>
                    <Button
                        onClick={() => {
                            var toAdd: number[] = [];
                            selectedLibraryItems.forEach(item => {
                                if (selectedIds.indexOf(Number(item)) == -1) toAdd.push(Number(item));
                            });
                            var toDelete: number[] = [];
                            selectedIds.forEach(id => {
                                if (selectedLibraryItems.map(item => Number(item)).indexOf(id) == -1) toDelete.push(id);
                            });
                            console.log(toAdd, toDelete);
                            var promises: Promise<any>[] = [];
                            if (toAdd.length > 0) {
                                const formDataAdd = {
                                    customer: customerId,
                                    library: libraryId,
                                    libraryitems: toAdd,
                                    applicable: true,
                                    reason: remarks
                                };
                                promises.push(CustomerService.bulkAddCustomerLibraryItems(formDataAdd));
                            }
                            if (toDelete.length > 0) {
                                const formDataDelete = {
                                    customer: customerId,
                                    library: libraryId,
                                    libraryitems: toDelete,
                                    applicable: false,
                                    reason: remarks
                                };
                                promises.push(CustomerService.bulkAddCustomerLibraryItems(formDataDelete));
                            }
                            if (promises.length > 0) {
                                Promise.all(promises).then(values => {
                                    console.log(values);
                                    close(false);
                                });
                            } else close(false);
                        }}
                    >
                        Done
                    </Button>
                    <Button onClick={() => close(false)}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
