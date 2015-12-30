import React from 'react';
import ListItem from './list-item';

export default class List extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.renderList()}
            </div>
        );
    }

    renderList() {
        // this.props.items
        if (this.props.items && Object.keys(this.props.items).length === 0) {
            return (<h4>No Items</h4>)
        } else {
            let children = [];
            for (let key in this.props.items) {
                if (this.props.items.hasOwnProperty(key) && this.props.items[key].text) {
                    let item = this.props.items[key];
                    item.key = key;
                    children.push(
                        //<li key={key}>{this.props.items[key].text}</li>
                        <ListItem
                            item={item}
                            key={key}>
                        </ListItem>
                    );
                }

            }
            return children;
        }

    }
}