import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormGroup from '@mui/material/FormGroup';
import { LibraryDetails } from '../LibraryItem/LibraryDetails';
import ExpertService from '../../services/expert.service';
import swal from 'sweetalert';
import DataGridTable from '../Common/DataGrid';
import { GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import errorHandler from '../../utils/errorHandler';

export interface ExpertDialogProps {
    id?: string;
    ExpertName: string;
    expertId: number;
    openExpertsDialogue: boolean;
    allLibraries: LibraryDetails[];
    setOpenExpertsDialogue: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

export default function AllExpertsDialogue(props: ExpertDialogProps) {
    const { ExpertName, openExpertsDialogue, setOpenExpertsDialogue, expertId, allLibraries } = props;
    const [expertLibraryIds, setExpertLibraryIds] = useState<number[]>([]);
    const [selectedLibraries, setSelectedLibraries] = useState<any[]>([]);
    const [deletingLibraries, setDeletingLibraries] = useState<any[]>([]);
    const [_selectionModel, _setSelectionModel] = React.useState<GridSelectionModel>([]);

    useEffect(() => {
        if (expertId) {
            getLibrariesOfExpert(expertId);
        }
    }, [expertId]);

    const handleClose = () => {
        setOpenExpertsDialogue(false);
    };
    // const onlinkUnlink = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const currentId = Number(event.target.value);
    //     var LibraryIds = [...expertLibraryIds];
    //     if (!LibraryIds.includes(currentId)) {
    //         setSelectedLibraries([...selectedLibraries, Number(event.target.value)]);
    //         setExpertLibraryIds([...LibraryIds, Number(event.target.value)]);
    //     } else {
    //         setDeletingLibraries([...deletingLibraries, Number(event.target.value)]);
    //         const idIndex = LibraryIds.indexOf(currentId);
    //         if (idIndex > -1) {
    //             LibraryIds.splice(idIndex, 1);
    //         }
    //         setExpertLibraryIds(LibraryIds);
    //     }
    // };

    const checkboxHandler = (currentId: number) => {
        var LibraryIds = [...expertLibraryIds];
        if (!LibraryIds.includes(currentId)) {
            setSelectedLibraries([...selectedLibraries, Number(currentId)]);
            setExpertLibraryIds([...LibraryIds, Number(currentId)]);
        } else {
            setDeletingLibraries([...deletingLibraries, Number(currentId)]);
            const idIndex = LibraryIds.indexOf(currentId);
            if (idIndex > -1) {
                LibraryIds.splice(idIndex, 1);
            }
            setExpertLibraryIds(LibraryIds);
        }
    };

    const getLibrariesOfExpert = expId => {
        ExpertService.getLibraryByExpId(expId)
            .then(data => {
                const allLinkedIds = data && data.data.data.map(obj => obj.library.id);
                console.log('ExpertsLinkedIds =>:', allLinkedIds);
                setExpertLibraryIds(allLinkedIds);
            })
            .catch(error => {
                errorHandler(error);
            });
    };

    const linkExperts = () => {
        // If Library Links
        if (selectedLibraries.length > 0) {
            console.log('Add=>', selectedLibraries);
            const addLinkLlibrary = {
                expert: expertId,
                library: selectedLibraries
            };
            ExpertService.addExpertLibraryBulk(addLinkLlibrary)
                .then(data => {
                    console.log(data);
                    swal({
                        title: 'Successfully Linked to Libraries',
                        icon: 'success'
                    });
                    setOpenExpertsDialogue(false);
                })
                .catch(error => {
                    errorHandler(error);
                });
        }
        // If Library UnLinks
        if (deletingLibraries.length > 0) {
            const deleteLinkedLibrary = {
                expert: expertId,
                library: deletingLibraries
            };
            console.log('Delete=>', deletingLibraries);

            ExpertService.deleteExpertLinkedLibrary(deleteLinkedLibrary)
                .then(data => {
                    swal({
                        title: 'Successfully Unlinked the Libraries',
                        icon: 'success'
                    });
                    setOpenExpertsDialogue(false);
                })
                .catch(error => {
                    errorHandler(error);
                });
        }
    };

    const columns: GridColDef[] = [
        { field: 'id', headerName: '#', width: 70 },
        {
            field: 'identifier',
            headerName: 'Identifier',
            width: 130,
            renderCell: ({ row }) => {
                const identifier = row.identifier ? row.identifier : '';
                return (
                    <p title={identifier} className="text-truncate mb-0">
                        {identifier}
                    </p>
                );
            }
        },
        { field: 'title', headerName: 'Title', width: 450 },
        {
            field: 'version',
            headerName: 'Version',
            type: 'number',
            minWidth: 100,
            align: 'left',
            headerAlign: 'left'
        },
        {
            field: 'text',
            headerName: 'Text',
            sortable: false,
            flex: 1,
            renderCell: ({ row }) => {
                const text = row.text ? row.text : '';
                return (
                    <p title={text} className="text-truncate mb-0">
                        {text}
                    </p>
                );
            }
        },
        {
            field: 'licenseCost',
            headerName: 'License Cost',
            sortable: false,
            width: 160
        }
    ];
    return (
        <Dialog
            fullWidth
            maxWidth={'lg'}
            open={openExpertsDialogue}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Libraries of {ExpertName} :</DialogTitle>
            <DialogContent>
                <FormGroup>
                    {/* {allLibraries.map(item => {
                        return (
                            <FormControlLabel
                                key={item!.id}
                                control={
                                    <Checkbox
                                        onChange={onlinkUnlink}
                                        name={item!.title}
                                        value={item!.id}
                                        checked={expertLibraryIds.includes(item.id)}
                                    />
                                }
                                label={`${item!.identifier} - ${item!.title}`}
                            />
                        );
                    })} */}

                    <DataGridTable
                        data={allLibraries ? allLibraries : []}
                        columns={columns}
                        clientPagination
                        checkboxSelection
                        onSelectionModelChange={newSelectionModel => {
                            if (newSelectionModel.length === 0) {
                                setDeletingLibraries(expertLibraryIds);
                                setExpertLibraryIds([]);
                                setSelectedLibraries([]);
                            } else if (newSelectionModel.length === allLibraries.length) {
                                setExpertLibraryIds(newSelectionModel);
                                setSelectedLibraries(newSelectionModel);
                            } else if (newSelectionModel.length > expertLibraryIds.length) {
                                checkboxHandler(
                                    newSelectionModel.filter(value => !expertLibraryIds.includes(value))[0]
                                );
                            } else {
                                checkboxHandler(
                                    expertLibraryIds.filter(value => !newSelectionModel.includes(value))[0]
                                );
                            }
                        }}
                        selectionModel={expertLibraryIds}
                    />
                </FormGroup>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button sx={{ background: 'blue', color: 'white' }} onClick={linkExperts} autoFocus>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}
