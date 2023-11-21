import React, { useState, CSSProperties, useEffect } from 'react';
import { LibraryItem } from './LibraryItem';
import LibraryItemForm from './LibraryItemForm';
import { Paper } from '@material-ui/core';
import LibraryItemDelete from './LibraryItemDelete';
import LibraryItemIntpr from './LibraryItemIntpr';
import LibraryItemImplementation from './LibraryItemImpl';
import { useRef } from 'react';
import LibraryAddTask from './LibraryAddTask';
import CommentIcon from '@mui/icons-material/Comment';

interface LibraryItemViewProps {
    libraryId: number;
    treeItems: LibraryItem[];
    items: LibraryItem[];
    item: LibraryItem;
    treeItemId: number;
    onDelete: (itemId: number) => void;
    onSave: (item: LibraryItem) => void;
    onReorder: (item1: LibraryItem, item2: LibraryItem) => void;
    selectedIds: number[];
}

export function LibraryItemView(props: LibraryItemViewProps) {
    const ref = useRef<null | HTMLDivElement>(null);
    const [item, setItem] = useState<LibraryItem>({
        Id: 0,
        Nr: '',
        Parent: 0,
        Title: '',
        Level: 0,
        Sequence: 0,
        Type: ''
    } as LibraryItem);
    const [items, setItems] = useState<LibraryItem[]>([]);
    const [treeItems, setTreeItems] = useState<LibraryItem[]>([]);
    const [iconStyle, setIconStyle] = useState<CSSProperties>({
        visibility: 'hidden'
    });

    const [role, setRole] = useState<string>('');
    useEffect(() => {
        const userStr = localStorage.getItem('user');
        if (userStr !== null) {
            setRole(JSON.parse(userStr).user_info.role);
        }
    }, []);

    useEffect(() => {
        setItem(props.item);
        setItems(props.items);
        setTreeItems(props.treeItems);
    }, [props.item, props.items, props.treeItems]);

    useEffect(() => {
        if (props.item.Id == props.treeItemId) {
            window.setTimeout(() => {
                if (ref.current != null) {
                    ref.current.scrollIntoView({ behavior: 'smooth' });
                }
            }, 200);
        }
    }, [props.item, props.treeItemId]);

    const renderItem = () => {
        // console.log(item, 'M--item', props.selectedIds);

        let preText = item.Nr ? item.Nr + ' ' : '';
        var bgColor = item.Id == props.treeItemId ? 'rgba(63, 81, 181, 0.12)' : 'white';
        var OtherStyle = {
            display: 'flex',
            alignItems: 'center',
            color: '#4D5B7C',
            fontSize: '16px',
            backgroundColor: bgColor
        };
        var ChapterStyle = {
            display: 'flex',
            alignItems: 'center',
            color: '#031B4E',
            fontSize: '21px',
            marginTop: '15px',
            backgroundColor: bgColor
        };
        var SubChapterStyle = {
            display: 'flex',
            alignItems: 'center',
            color: '#031B4E',
            fontSize: '18px',
            backgroundColor: bgColor
        };

        if (
            (role === 'Customer User' || role === 'Customer Admin') &&
            (!props.selectedIds.includes(item.Id) || !item.Applicable)
        ) {
            OtherStyle = { ...OtherStyle, color: '#bebebe' };
            ChapterStyle = { ...ChapterStyle, color: '#bebebe' };
            SubChapterStyle = { ...SubChapterStyle, color: '#bebebe' };
        }
        switch (item.Type) {
            case 'Chapter':
                return (
                    <span
                        style={{ ...ChapterStyle }}
                        dangerouslySetInnerHTML={{
                            __html: `${preText}${item.Title}`
                        }}
                    ></span>
                );
            case 'SubChapter':
                return (
                    <span
                        style={{ ...SubChapterStyle }}
                        dangerouslySetInnerHTML={{
                            __html: `${preText}${item.Title}`
                        }}
                    ></span>
                );
            case 'Article':
                return (
                    <span
                        style={{ ...OtherStyle, fontWeight: 600 }}
                        dangerouslySetInnerHTML={{
                            __html: `${preText}${item.Title}`
                        }}
                    ></span>
                );
            default:
                preText = item.Nr ? item.Nr + ') ' : '';
                return (
                    <span
                        style={{ ...OtherStyle }}
                        dangerouslySetInnerHTML={{
                            __html: `${preText}${item.Title}`
                        }}
                    ></span>
                );
        }
    };

    return (
        <div style={{ textAlign: 'left', paddingTop: item.Nr ? '0px' : '10px' }}>
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
                            center
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
                                display: role === 'Customer Admin' || role === 'Customer User' ? 'flex' : 'none',
                                paddingLeft: role === 'Customer Admin' || role === 'Customer User' ? '5px' : '0px'
                            }}
                        />
                    </>
                )}
                <div ref={ref}>
                    {renderItem()}
                    {(role === 'Expert' || role === 'SysAdmin') && item.Interpretation && (
                        <blockquote style={{ fontStyle: 'italic', marginTop: '5px', color: '#dc143c' }}>
                            {item.Interpretation.split('\n').map((inter, index) => {
                                return <div key={`Interpretation-${item.Id}-${index}`}>{inter}</div>;
                            })}
                        </blockquote>
                    )}
                    {(role === 'Customer Admin' || role === 'Customer User') &&
                        props.selectedIds.includes(item.Id) &&
                        item.Interpretation && (
                            <blockquote style={{ fontStyle: 'italic', color: '#dc143c' }}>
                                {item.Interpretation.split('\n').map((inter, index) => {
                                    return <div key={`Interpretation-${item.Id}-${index}`}>{inter}</div>;
                                })}
                            </blockquote>
                        )}
                    {(role === 'Customer Admin' || role === 'Customer User') &&
                        item.Applicable &&
                        item.Implementation && (
                            <blockquote
                                style={{ color: 'blue' }}
                                dangerouslySetInnerHTML={{ __html: item.Implementation }}
                            ></blockquote>
                        )}
                    {(role === 'Customer Admin' || role === 'Customer User') && !item.Applicable && item.Reason && (
                        <blockquote style={{ color: '#bebebe' }}>
                            <CommentIcon style={{ paddingRight: '5px' }} />
                            {item.Reason}
                        </blockquote>
                    )}
                </div>
            </Paper>
            {items
                .filter(item1 => item1.Parent === item.Id)
                .sort((a: LibraryItem, b: LibraryItem) =>
                    a.Sequence > b.Sequence ? 1 : b.Sequence > a.Sequence ? -1 : 0
                )
                .map(item2 => (
                    <LibraryItemView
                        key={`LibraryItemView-${item2.Id}`}
                        libraryId={props.libraryId}
                        item={item2}
                        items={items}
                        treeItems={treeItems}
                        treeItemId={props.treeItemId}
                        selectedIds={props.selectedIds}
                        onDelete={itemId => {
                            setItems(items.filter(item3 => item3.Id != itemId));
                            props.onDelete(itemId);
                        }}
                        onSave={item4 => {
                            setItems([...items.filter(item5 => item5.Id != item4.Id), item4]);
                            props.onSave(item4);
                        }}
                        onReorder={(item1, item2) => props.onReorder(item1, item2)}
                    />
                ))}
        </div>
    );
}
