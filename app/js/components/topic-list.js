import React from 'react';
import Api from '../utils/api';
import TopicStore from '../stores/topic-store';
import Reflux from 'reflux';
import Actions from '../actions';
import { Router, Route, Link } from 'react-router';

let TopicList = React.createClass({
    mixins: [
        Reflux.listenTo(TopicStore, 'onChange')
    ],

    getInitialState() {
        return {
            topics: []
        }
    },

    render() {
        return (
            <div className="list-group">
                {this.renderTopics()}
            </div>
        );
    },

    componentWillMount() {
        Actions.getTopics();
    },

    renderTopics() {
        return this.state.topics.map(topic =>
            <Link to={"/topics/"+topic.id}
                  className="list-group-item"
                  key={topic.id}>
                <h4>{topic.name}</h4>
                <p>{topic.description}</p>
            </Link>
        );
    },

    onChange(event, topics) {
        this.setState({topics: topics});
    }
});

export default TopicList;
