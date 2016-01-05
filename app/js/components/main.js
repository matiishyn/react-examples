import React from 'react';
import Header from './header';
import TopicList from './topic-list';


export default class Main extends React.Component {
    getContent() {
        if (this.props.children) {
            return this.props.children;
        } else {
            return <TopicList/>
        }
    }

    render() {
        return (
            <div>
                <Header/>
                {this.getContent()}
            </div>
        );
    }
}
