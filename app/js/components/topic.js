import React from 'react';
import { Router, Route, Link } from 'react-router';

export default class Topic extends React.Component {
    render() {
        return (
            <div>Topic #{this.props.id}</div>
        );
    }
}

