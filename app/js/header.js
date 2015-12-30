import React from 'react';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: 'test'};
    }

    handleClick() {
        this.props.itemsStore.push({
            text: this.state.text,
            done: false
        });
        this.setState({text: ''});
    }

    handleInputChange(event) {
        this.setState({text: event.target.value});
    }

    render() {
        return (
            <div className="input-group">
                <input
                    onChange={this.handleInputChange.bind(this)}
                    value={this.state.text}
                    type="text" className="form-control"/>

                <span className="input-group-btn">
                    <button
                        onClick={this.handleClick.bind(this)}
                        className="btn btn-default"
                        type="submit">
                        Add
                    </button>
                </span>
            </div>
        );
    }
}