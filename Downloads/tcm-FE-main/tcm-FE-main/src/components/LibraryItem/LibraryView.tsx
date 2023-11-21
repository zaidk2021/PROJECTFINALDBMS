import React, { CSSProperties, useEffect, useState } from 'react';
import { Paper } from '@material-ui/core';
import { LibraryItem } from './LibraryItem';
import LibraryItemDelete from './LibraryItemDelete';
import LibraryItemForm from './LibraryItemForm';
import LibraryItemImplementation from './LibraryItemImpl';
import LibraryItemIntpr from './LibraryItemIntpr';
import { LibraryItemView } from './LibraryItemView';
import { useRef } from 'react';
import LibraryAddTask from './LibraryAddTask';
import CommentIcon from '@mui/icons-material/Comment';

interface LibraryViewProps {
    libraryId: number;
    item: LibraryItem;
    style?: CSSProperties;
    treeItems: LibraryItem[];
    items: LibraryItem[];
    treeItemId: number;
    onDelete: (itemId: number) => void;
    onSave: (item: LibraryItem) => void;
    onReorder: (item1: LibraryItem, item2: LibraryItem) => void;
    selectedIds: number[];
}

export default function LibraryView(props: LibraryViewProps) {
    const [treeItems, setTreeItems] = useState<LibraryItem[]>([]);
    const [items, setItems] = useState<LibraryItem[]>([]);
    const [item, setItem] = useState<LibraryItem>(props.item);
    const ref = useRef<null | HTMLDivElement>(null);

    useEffect(() => {
        setItems(props.items);
        setItem(props.item);
        setTreeItems(props.treeItems);
    }, [props.item, props.items, props.treeItems]);

    const [role, setRole] = useState<string>('');
    useEffect(() => {
        const userStr = localStorage.getItem('user');
        if (userStr !== null) {
            setRole(JSON.parse(userStr).user_info.role);
        }
    }, []);

    useEffect(() => {
        if (props.item && props.item.Id === props.treeItemId) {
            window.setTimeout(() => {
                if (ref.current != null) {
                    ref.current.scrollIntoView({ behavior: 'smooth' });
                }
            }, 200);
        }
    }, [props.item, props.treeItemId]);

    const [iconStyle, setIconStyle] = useState<CSSProperties>({
        visibility: 'hidden'
    });

    function renderItem() {
        if (item !== undefined) {
            let preText = item.Nr ? item.Nr + ' ' : '';
            switch (item.Type) {
                case 'Chapter':
                    return <h3>{`${preText}${item.Title}`}</h3>;
                case 'SubChapter':
                    return <h4>{`${preText}${item.Title}`}</h4>;
                case 'Article':
                    return <h5>{`${preText}${item.Title}`}</h5>;
                default:
                    preText = item.Nr ? item.Nr + ') ' : '';
                    return <span>{`${preText}${item.Title}`}</span>;
            }
        } else return null;
    }

    return (
        <div key={'LibraryView-' + props.libraryId} style={props.style}>
            <div>
                {item && (
                    <Paper
                        elevation={0}
                        style={{
                            display: 'inline-flex',
                            width: 'calc(100% - 5px)',
                            cursor: 'pointer',
                            paddingRight: '20px',
                            textAlign: 'justify'
                        }}
                        onMouseEnter={e => {
                            setIconStyle({
                                ...iconStyle,
                                visibility: 'visible'
                            });
                        }}
                        onMouseLeave={e => {
                            setIconStyle({
                                ...iconStyle,
                                visibility: 'hidden'
                            });
                        }}
                    >
                        <LibraryItemForm
                            key={`LibraryItemForm${item.Id}`}
                            libraryId={props.libraryId}
                            itemId={item.Id}
                            items={items}
                            treeItems={treeItems}
                            onSave={(item1: LibraryItem) => {
                                setItem(item1);
                                props.onSave(item1);
                            }}
                            onReorder={(item1: LibraryItem, item2: LibraryItem) => {
                                props.onReorder(item1, item2);
                            }}
                            onCancel={() => {}}
                            style={{ ...iconStyle, display: role === 'SysAdmin' ? 'flex' : 'none' }}
                        />
                        <LibraryItemDelete
                            key={`LibraryItemDelete${item.Id}`}
                            itemId={item.Id}
                            onDelete={(itemId: number) => {
                                props.onDelete(itemId);
                            }}
                            onCancel={() => {}}
                            style={{ ...iconStyle, display: role === 'SysAdmin' ? 'flex' : 'none' }}
                        />
                        {(role === 'Expert' ||
                            role === 'Customer Admin' ||
                            role === 'Customer User' ||
                            role === 'SysAdmin') && (
                            <LibraryItemIntpr
                                key={`LibraryItemIntpr${item.Id}`}
                                libraryId={props.libraryId}
                                item={item}
                                onSave={(id: number, text: string) => {
                                    setItem({ ...item, InterpretationId: id, Interpretation: text });
                                    props.onSave({ ...item, InterpretationId: id, Interpretation: text });
                                }}
                                onCancel={() => {}}
                                style={{
                                    ...iconStyle,
                                    display: role === 'Expert' ? 'flex' : 'none',
                                    paddingLeft: role === 'Expert' ? '10px' : '0px'
                                }}
                            />
                        )}
                        {(role === 'Customer Admin' || role === 'Customer User') && (
                            <>
                                <LibraryAddTask
                                    libraryId={props.libraryId}
                                    itemId={item.Id}
                                    style={{ ...iconStyle }}
                                    item={item}
                                />
                                <LibraryItemImplementation
                                    key={`LibraryItemImpl${item.Id}`}
                                    item={item}
                                    onSave={(text: string) => {
                                        setItem({ ...item, Implementation: text });
                                        props.onSave({ ...item, Implementation: text });
                                    }}
                                    onDelete={() => {
                                        setItem({ ...item, Implementation: undefined });
                                        props.onSave({ ...item, Implementation: undefined });
                                    }}
                                    onCancel={() => {}}
                                    style={{
                                        ...iconStyle,
                                        paddingLeft:
                                            role === 'Customer Admin' || role === 'Customer User' ? '5px' : '0px'
                                    }}
                                />
                            </>
                        )}
                        <div ref={ref}>
                            {renderItem()}
                            {(role === 'Expert' || role === 'SysAdmin') && item.Interpretation && (
                                <blockquote style={{ fontStyle: 'italic', marginTop: '5px', color: '#dc143c' }}>
                                    {item.Interpretation.split('\n').map(inter => {
                                        return <div>{inter}</div>;
                                    })}
                                </blockquote>
                            )}
                            {(role === 'Customer Admin' || role === 'Customer User') &&
                                props.selectedIds.includes(item.Id) &&
                                item.Interpretation && (
                                    <blockquote style={{ fontStyle: 'italic', color: '#dc143c' }}>
                                        {item.Interpretation.split('\n').map(inter => {
                                            return <div>{inter}</div>;
                                        })}
                                    </blockquote>
                                )}
                            {(role === 'Customer Admin' || role === 'Customer User') &&
                                item.Applicable &&
                                item.Implementation && (
                                    <blockquote style={{ color: 'blue' }}>{item.Implementation}</blockquote>
                                )}
                            {(role === 'Customer Admin' || role === 'Customer User') &&
                                !item.Applicable &&
                                item.Reason && (
                                    <blockquote style={{ color: '#bebebe' }}>
                                        <CommentIcon style={{ paddingRight: '5px' }} />
                                        {item.Reason}
                                    </blockquote>
                                )}
                        </div>
                    </Paper>
                )}
            </div>
            {items
                .filter(item1 => (item && item1.Parent === item.Id) || (item === undefined && item1.Parent === null))
                .sort((a: LibraryItem, b: LibraryItem) =>
                    a.Sequence > b.Sequence ? 1 : b.Sequence > a.Sequence ? -1 : 0
                )
                .map(item => {
                    return (
                        <LibraryItemView
                            libraryId={props.libraryId}
                            key={`LibraryItemView-${item.Id}`}
                            item={item}
                            items={items}
                            treeItems={treeItems}
                            treeItemId={props.treeItemId}
                            selectedIds={props.selectedIds || []}
                            onDelete={deletedItemId => {
                                props.onDelete(deletedItemId);
                            }}
                            onSave={savedItem => {
                                props.onSave(savedItem);
                            }}
                            onReorder={(item1, item2) => {
                                props.onReorder(item1, item2);
                            }}
                        ></LibraryItemView>
                    );
                })}
        </div>
    );
}
