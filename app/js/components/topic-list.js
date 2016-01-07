import React from 'react';
import Api from '../utils/api';
import TopicStore from '../stores/topic-store';
import Reflux from 'reflux';
import Actions from '../actions';

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
                Topic List
                {this.renderTopics()}
            </div>
        );
    },

    componentWillMount() {
        Actions.getTopics();
    },

    renderTopics() {
        return this.state.topics.map(topic => <li key={topic.id}>{topic.name}</li>);
    },

    onChange(event, topics) {
        this.setState({topics: topics});
    }
});

export default TopicList;
