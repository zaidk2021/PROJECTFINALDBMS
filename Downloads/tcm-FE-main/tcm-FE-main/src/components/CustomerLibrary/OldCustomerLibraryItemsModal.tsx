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
import { Checkbox, FormControlLabel } from '@material-ui/core';
import LibraryService from '../../services/library.service';
import CustomerService from '../../services/customer.service';
import swal from 'sweetalert';
import CircularProgress from '@mui/material/CircularProgress';
import errorHandler from '../../utils/errorHandler';

export default function OldCustomerLibraryItemsModal(props) {
    const { show, close, libraryId } = props;

    const [selectedLibraryItems, setSelectedLibraryItems] = useState<string[]>([]);

    const [libraryItemsList, setLibraryItemsList] = useState<{ [key: string]: any }>({});
    const [customerId, setCustomerId] = useState<any>();
    const [loading, setLoading] = useState<boolean>(true);
    // const [showTreeViewItems, setShowTreeViewItems] = useState<boolean>(false);

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
                    const selectedLibItems = data.data.data.map(items => items.libraryitem.id);
                    setSelectedLibraryItems(selectedLibItems);

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

    // Get On Change
    function getOnChange(checked: boolean, nodes: RenderTree) {
        const allNode: string[] = getChildById(libraryItemsList, nodes.id);
        if (checked == false) {
            let ids = allNode.filter(item => selectedLibraryItems.includes(item));
            const cus_id = customerId;
            const lib_id = libraryId;
            const formData = {
                customer: cus_id,
                library: lib_id,
                libraryitems: ids
            };
            CustomerService.bulkRemoveCustomerLibraryItems(formData)
                .then(data => {
                    if (data.status == 200) {
                        swal({
                            title: 'Library items are not applicable!',
                            icon: 'success',
                            timer: 3000
                        });
                        getCustomerLibraryItems();
                    } else {
                        swal({
                            title: 'Did not work?',
                            text: 'try again!',
                            icon: 'error'
                        });
                    }
                })
                .catch(error => {
                    swal({
                        title: 'Did not work?',
                        text: 'server error!',
                        icon: 'error'
                    });
                });

            // CustomerService.deleteCustomerLibraryItemsById(deleteId)
            //     .then(data => {
            //         if (data.status == 200) {
            //             swal({
            //                 title: 'Library item is not applicable!',
            //                 icon: 'success',
            //                 timer: 3000
            //             });
            //             getCustomerLibraryItems();
            //         } else {
            //             swal({
            //                 title: 'Did not work?',
            //                 text: 'try again!',
            //                 icon: 'error'
            //             });
            //         }
            //     })
            //     .catch(error => {
            //         swal({
            //             title: 'Did not work?',
            //             text: 'server error!',
            //             icon: 'error'
            //         });
            //     });
        } else {
            let ids = allNode.filter(item => ![...selectedLibraryItems, 0].includes(+item));
            const cus_id = customerId;
            const lib_id = libraryId;
            const formData = {
                customer: cus_id,
                library: lib_id,
                libraryitems: ids
            };
            CustomerService.bulkAddCustomerLibraryItems(formData)
                .then(data => {
                    if (data.status == 200) {
                        swal({
                            title: 'Library items are applicable!',
                            icon: 'success',
                            timer: 3000
                        });
                        getCustomerLibraryItems();
                    } else {
                        swal({
                            title: 'Did not work?',
                            text: 'try again!',
                            icon: 'error'
                        });
                    }
                })
                .catch(error => {
                    errorHandler(error);
                });
        }

        let array = checked
            ? [...selectedLibraryItems, ...allNode]
            : selectedLibraryItems.filter(value => !allNode.includes(value));

        array = array.filter((v, i) => array.indexOf(v) === i);
        setSelectedLibraryItems(array);
    }

    // RenderTree
    const renderTree = (nodes: any) => (
        <TreeItem
            key={nodes.id}
            nodeId={nodes.id}
            label={
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={selectedLibraryItems.some(item => item === nodes.id)}
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
                    <Button onClick={() => close(false)}>Done</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
