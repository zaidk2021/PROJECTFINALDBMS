import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import LibraryTreeView from './LibraryTreeView';
import LibraryView from './LibraryView';
import LibraryService from '../../services/library.service';
import LibraryItemForm from './LibraryItemForm';
import { LibraryItem, LibraryItemImplementation, LibraryItemInterpretation } from './LibraryItem';
import libraryItemService from '../../services/library-item.service';
import CustomerService from '../../services/customer.service';
import ExpertService from '../../services/expert.service';
import customerService from '../../services/customer.service';
import LibraryItemService from '../../services/library-item.service';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import errorHandler from '../../utils/errorHandler';

interface LibraryProps {
    id: number;
}

export default function Library(props: LibraryProps) {
    const [title, setTitle] = useState<string>('');
    const [itemId, setItemId] = useState<number>(0);
    const [items, setItems] = useState<LibraryItem[]>([]);
    const [treeItems, setTreeItems] = useState<LibraryItem[]>([]);
    const [treeItemId, setTreeItemId] = useState<number>(0);
    const [role, setRole] = useState<string>('');
    //const [expertId, setExpertId] = useState<number>(0);
    const [customerId, setCustomerId] = useState<number>(0);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const [interpretations, setInterpretations] = useState<LibraryItemInterpretation[]>([]);
    const [implementations, setImplementations] = useState<LibraryItemImplementation[]>([]);

    function resizeControls() {
        var element1 = document.getElementById('libraryTreeView');
        if (element1 != null && visualViewport) {
            element1.style.height = `${visualViewport.height - element1.offsetTop}px`;
        }
        var element2a = document.getElementById('libraryView');
        if (element2a != null && visualViewport) {
            element2a.style.height = `${visualViewport.height - element2a.offsetTop}px`;
        }
    }
    useEffect(() => {
        const userStr = localStorage.getItem('user');
        const role1 = userStr !== null ? JSON.parse(userStr).user_info.role : '';
        setRole(role1);
        const expertId1 = userStr !== null ? JSON.parse(userStr).user_info.expid : 0;
        //setExpertId(expertId1);

        const customerId1 = userStr !== null ? JSON.parse(userStr).user_info.cusid : 0;
        setCustomerId(customerId1);

        LibraryService.get(props.id).then(response => {
            setTitle(`${response.data.title} ${response.data.text}`);
        });

        libraryItemService.getByLevel(props.id, 2).then(response => {
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
            setTreeItems(items1);
        });

        var promise2: Promise<any>;
        if (role1 == 'Expert') promise2 = ExpertService.getAllInterpretation(props.id, expertId1);
        else if (role1 == 'Customer Admin' || role1 == 'Customer User' || role1 == 'SysAdmin')
            promise2 = ExpertService.getAllInterpretationbyLibId(props.id);
        else promise2 = Promise.resolve({ success: true, data: [] });
        promise2.then((response2: any) => {
            var interpretations = response2.data.map(dateItem => {
                return {
                    InterpretationId: dateItem['id'],
                    Expert: dateItem['expert'],
                    Interpretation: dateItem['text'],
                    ItemId: dateItem['libraryitem']
                } as LibraryItemInterpretation;
            });
            setInterpretations(interpretations);
        });

        var promise3: Promise<any>;
        if (role1 == 'Customer Admin' || role1 == 'Customer User')
            promise3 = CustomerService.getAllImplementation(props.id, customerId1);
        else promise3 = Promise.resolve({ success: true, data: [] });
        promise3.then((response3: any) => {
            var implementations = response3.data.map(dateItem => {
                return {
                    ImplementationId: dateItem['id'],
                    Applicable: dateItem['applicable'],
                    Implementation: dateItem['implementation'],
                    ItemId: dateItem['libraryitem'],
                    Reason: dateItem['reason']
                } as LibraryItemImplementation;
            });
            setImplementations(implementations);
        });

        window.addEventListener('resize', resizeControls);
        return () => {
            window.removeEventListener('resize', resizeControls);
        };
    }, []);

    useEffect(() => {
        if (customerId && props.id) {
            customerService
                .getCusLibItemByCusIdLibId(customerId, props.id)
                .then(data => {
                    if (data.data.data.length !== 0) {
                        //Selected Multiple Library Items

                        const selectedLibItems = data.data.data.map(items => items.libraryitem.id);
                        setSelectedIds(selectedLibItems);
                        //Add Ids to the Data
                    }
                })
                .catch(error => errorHandler(error));
        }
    }, [customerId, props.id]);

    return (
        <Grid container>
            <Grid item xs={12}>
                <Box m={1} display="flex" justifyContent="flex-end" alignItems="flex-end">
                    <Link to={`/audit-history/${props.id}`} style={{ textDecoration: 'none' }}>
                        <Button color="primary" variant="contained">
                            Audit Log
                        </Button>
                    </Link>
                </Box>
            </Grid>

            <Grid item xs={12}>
                <div className="w-75 mx-auto d-flex justify-content-center align-items-center">
                    <h2 style={{ fontSize: '26px' }}>{title}</h2>
                </div>
            </Grid>

            <Grid id="libraryTreeView" item xs={2} style={{ overflowY: 'auto' }}>
                <Grid container>
                    <Grid item xs={10} style={{ paddingTop: '7.5px' }}>
                        <span>
                            <b>Table of contents</b>
                        </span>
                    </Grid>
                    <Grid item xs={2} style={{ display: role == 'SysAdmin' ? '' : 'none' }}>
                        <LibraryItemForm
                            key={`LibraryItemForm-0`}
                            libraryId={props.id}
                            itemId={0}
                            treeItems={treeItems}
                            items={items}
                            onSave={(item: LibraryItem) => {
                                setItems([...items.filter(i => i.Id != item.Id), item]);
                                if (item.Level <= 2) {
                                    setTreeItems([...treeItems.filter(ti => ti.Id != item.Id), item]);
                                }
                            }}
                            onReorder={(item1: LibraryItem, item2: LibraryItem) => {
                                setItems([
                                    ...items.filter(item => item.Id != item1.Id && item.Id != item2.Id),
                                    item1,
                                    item2
                                ]);
                            }}
                            onCancel={() => {}}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <LibraryTreeView
                            libraryId={props.id}
                            items={treeItems}
                            onClick={(item: LibraryItem) => {
                                resizeControls();
                                libraryItemService.getByRoot(props.id, item.Root).then((data: any[]) => {
                                    var items = data.map((dataItem: any) => {
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
                                    items.forEach((item: LibraryItem, index: number) => {
                                        var interpretations1 = interpretations.filter(
                                            interpretation => interpretation.ItemId == item.Id
                                        );
                                        if (interpretations1.length > 0) {
                                            items[index].InterpretationId = interpretations1[0].InterpretationId;
                                            items[index].Interpretation = interpretations1
                                                .map(x => `${x.Expert}: ${x.Interpretation}`)
                                                .join('\n');
                                        }
                                        var implementations1 = implementations.filter(
                                            implementation => implementation.ItemId == item.Id
                                        );
                                        if (implementations1.length > 0) {
                                            items[index].Implementation = implementations1[0].Implementation;
                                            items[index].Applicable = implementations1[0].Applicable;
                                            items[index].Reason = implementations1[0].Reason
                                                ? implementations1[0].Reason
                                                : 'reason';
                                        } else {
                                            items[index].Implementation = '';
                                            items[index].Applicable = false;
                                            items[index].Reason = '';
                                        }
                                    });

                                    items.forEach((item: LibraryItem, index: number) => {
                                        var parentItems1 = items.filter(i => i.Id == item.Parent);
                                        if (
                                            (parentItems1.length > 0 && items[index].Type == 'Paragraph') ||
                                            items[index].Type == 'SubParagraph'
                                        ) {
                                            items[index].Applicable = parentItems1[0].Applicable;
                                        }
                                    });

                                    items = items.concat(
                                        treeItems.filter(
                                            treeItem => treeItem.Id != item.Root && treeItem.Parent == null
                                        )
                                    );
                                    setItemId(item.Root);
                                    setItems(items);
                                    setTreeItemId(item.Id);
                                });
                            }}
                            onSave={item => {
                                setItems([...items.filter(item1 => item1.Id != item.Id), item]);
                                LibraryItemService.update(
                                    props.id,
                                    item.Id,
                                    item.Parent,
                                    item.Nr,
                                    item.Title,
                                    item.Type,
                                    item.Level,
                                    item.Sequence
                                )
                                    .then(response => {})
                                    .catch(error => {});
                            }}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid id="libraryView" item xs={10} style={{ overflowY: 'auto' }}>
                <LibraryView
                    libraryId={props.id}
                    style={{ textAlign: 'left', overflowY: 'auto' }}
                    item={items.filter(item => item.Id == itemId)[0]}
                    selectedIds={selectedIds || []}
                    treeItems={treeItems}
                    items={items}
                    treeItemId={treeItemId}
                    onDelete={deletedItemId => {
                        setItems(items.filter(item1 => item1.Id != deletedItemId));
                        setTreeItems(treeItems.filter(ti => ti.Id != deletedItemId));
                    }}
                    onSave={item => {
                        setItems([...items.filter(i => i.Id != item.Id), item]);
                        if (item.Level <= 2) {
                            setTreeItems([...treeItems.filter(ti => ti.Id != item.Id), item]);
                        }
                    }}
                    onReorder={(item1: LibraryItem, item2: LibraryItem) => {
                        LibraryItemService.reorder(item1.Id, item1.Sequence, item2.Id, item2.Sequence);

                        var itemsA = [...items];
                        if (itemsA.findIndex(item => item.Id == item1.Id) > -1)
                            itemsA = [...itemsA.filter(item => item.Id != item1.Id), item1];
                        if (itemsA.findIndex(item => item.Id == item2.Id) > -1)
                            itemsA = [...itemsA.filter(item => item.Id != item2.Id), item2];
                        setItems(itemsA);

                        var treeItemsA = [...treeItems];
                        if (treeItemsA.findIndex(item => item.Id == item1.Id) > -1)
                            treeItemsA = [...treeItemsA.filter(item => item.Id != item1.Id), item1];
                        if (treeItemsA.findIndex(item => item.Id == item2.Id) > -1)
                            treeItemsA = [...treeItemsA.filter(item => item.Id != item2.Id), item2];
                        setTreeItems(treeItemsA);
                    }}
                />
            </Grid>
        </Grid>
    );
}
