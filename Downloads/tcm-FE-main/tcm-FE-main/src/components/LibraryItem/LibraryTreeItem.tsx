import React from 'react';
import TreeItem from '@material-ui/lab/TreeItem';
import { LibraryItem } from './LibraryItem';

interface LibraryTreeItemProps {
    itemId: number;
    items: LibraryItem[];
    onClick(item: LibraryItem): void;
    onSave: (item: LibraryItem) => void;
}

function libraryItemSort(itemA, itemB) {
    if (itemA.Sequence === Infinity) return 1;
    else if (isNaN(itemA.Sequence)) return -1;
    else return itemA.Sequence - itemB.Sequence;
}

export default function LibraryTreeItem(props: LibraryTreeItemProps) {
    var item = props.items.filter(item1 => item1.Id === props.itemId)[0];
    return (
        <TreeItem
            id={`TreeItem-${item.Id}`}
            key={`TreeItem-${item.Id}`}
            nodeId={item.Id.toString()}
            label={
                <div className="library-tree-item">
                    <div className="library-tree-item-label" title={item.Nr + ' ' + item.Title}>
                        {item.Nr} {item.Title.substring(0, 35)}
                    </div>
                </div>
            }
            style={{ textAlign: 'left' }}
            onLabelClick={e => {
                props.onClick(item);
            }}
        >
            {props.items
                .filter(item2 => item2.Parent === item.Id)
                .sort(libraryItemSort)
                .map(item => {
                    return (
                        <LibraryTreeItem
                            key={`LibraryTreeItem-${item.Id}`}
                            items={props.items}
                            itemId={item.Id}
                            onClick={props.onClick}
                            onSave={props.onSave}
                        ></LibraryTreeItem>
                    );
                })}
        </TreeItem>
    );
}
