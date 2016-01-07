import React from 'react';
import Api from '../utils/api';
import TopicStore from '../stores/topic-store';
import Reflux from 'reflux';

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
        TopicStore.getTopics();
    },

    renderTopics() {
        return this.state.topics.map(topic => <li>{topic.name}</li>);
    },

    onChange(event, topics) {
        this.setState({topics: topics});
    }
});

export default TopicList;
