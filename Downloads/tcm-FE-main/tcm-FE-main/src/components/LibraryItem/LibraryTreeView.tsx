import React from 'react';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { LibraryItem } from './LibraryItem';
import LibraryTreeItem from './LibraryTreeItem';

interface LibraryTreeViewProps {
    libraryId: number;
    items: LibraryItem[];
    onClick(item: LibraryItem): void;
    onSave: (item: LibraryItem) => void;
}
interface LibraryTreeViewState {
    items: LibraryItem[];
}
class LibraryTreeView extends React.Component<LibraryTreeViewProps, LibraryTreeViewState> {
    constructor(props: LibraryTreeViewProps) {
        super(props);
        this.state = {
            items: [...props.items] //.filter(item => item.Level < 3)
        };
    }

    public componentWillReceiveProps(nextProps: LibraryTreeViewProps) {
        if (
            this.state.items.map(item => item.Id.toString()).join() !=
                nextProps.items.map(item => item.Id.toString()).join() ||
            this.state.items.map(item => item.Title).join() != nextProps.items.map(item => item.Title).join()
        ) {
            this.setState({ items: [...nextProps.items] }); //.filter(item => item.Level < 3) });
        }
    }

    private libraryItemSort(itemA, itemB) {
        if (itemA.Sequence === Infinity) return 1;
        else if (isNaN(itemA.Sequence)) return -1;
        else return itemA.Sequence - itemB.Sequence;
    }

    public render() {
        return (
            <TreeView
                key={'LibraryTreeView'}
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                style={{ height: 'auto', overflowY: 'auto' }}
            >
                {this.state.items
                    .filter(item0 => item0.Parent === null || item0.Parent === 0)
                    .sort(this.libraryItemSort)
                    .map(item => {
                        return (
                            <LibraryTreeItem
                                key={`LibraryTreeItem-${item.Id}`}
                                items={this.state.items}
                                itemId={item.Id}
                                onClick={this.props.onClick}
                                onSave={this.props.onSave}
                            ></LibraryTreeItem>
                        );
                    })}
            </TreeView>
        );
    }
}

export default LibraryTreeView;
