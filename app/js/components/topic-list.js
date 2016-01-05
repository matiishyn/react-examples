import React from 'react';
import Api from '../utils/api';
import TopicStore from '../stores/topic-store';

export default class TopicList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            topics: []
        };
    }

    render() {
        return (
            <div className="list-group">
                Topic List
                {this.renderTopics()}
            </div>
        );
    }

    componentWillMount() {
        TopicStore.getTopics()
            .then(() => this.setState({topics: TopicStore.topics}));
    }

    renderTopics() {
        return this.state.topics.map(topic => <li>{topic.name}</li>);
    }
}
