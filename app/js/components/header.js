import React from 'react';
import { Router, Route, Link } from 'react-router';
import Actions from '../actions';
import Reflux from 'reflux';
import TopicStore from '../stores/topic-store';

export default React.createClass({
    mixins: [
        Reflux.listenTo(TopicStore, 'onChange')
    ],

    getInitialState() {
        return {
            topics: []
        };
    },

    componentWillMount() {
        Actions.getTopics();
    },

    onChange(event, topics) {
        this.setState({topics: topics});
    },

    render() {
        return (
            <nav className="navbar navbar-default header">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">
                        Imgur Browser
                    </Link>
                    <ul className="nav navbar-nav navbar-right">
                        {this.renderTopics()}
                    </ul>
                </div>
            </nav>
        );
    },

    renderTopics() {
        return this.state.topics.slice(0, 4).map(topic => {
            return (
                <li key={topic.id}>
                    <Link activeClassName="active" to={"/topics/"+topic.id}>
                        {topic.name}
                    </Link>
                </li>
            )
        });
    }
});