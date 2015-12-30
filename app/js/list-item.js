import React from 'react';
import Firebase from 'firebase';

const rootUrl = 'https://todos1234.firebaseio.com/';

export default class ListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: this.props.item.text,
            done: this.props.item.done
        };
    }

    componentWillMount() {
        this.fb = new Firebase(`${rootUrl}items/${this.props.item.key}`);
    }

    render() {
        return (
            <div className="input-group">
                <span className="input-group-addon">
                    <input
                        type="checkbox"
                        checked={this.state.done}
                        onChange={this.handleDoneChange.bind(this)}
                    />
                </span>
                <input type="text"
                       className="form-control"
                       value={this.state.text}
                       onChange={this.handleEdit.bind(this)}
                />
                <span className="input-group-btn">
                    <button className="btn btn-default" onClick={this.handleDelete.bind(this)}>
                        Delete
                    </button>
                </span>
            </div>
        );
    }

    handleDoneChange(event) {
        var isChecked = event.target.checked;
        this.setState({done: isChecked});
        this.fb.update({done: isChecked});
    }

    handleDelete() {
        this.fb.remove();
    }

    handleEdit(event) {
        var newValue = event.target.value;
        this.setState({text: newValue});
        this.fb.update({text: newValue});
    }
}