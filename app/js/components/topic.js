import React from 'react';
import { Router, Route, Link } from 'react-router';
import Reflux from 'reflux';
import Actions from '../actions';
import ImageStore from '../stores/image-store';

let Topic = React.createClass({
    mixins: [
        Reflux.listenTo(ImageStore, 'onChange')
    ],

    getInitialState() {
        return {
            images: []
        }
    },

    componentWillMount() {
        console.log('will mount');
        Actions.getImages(this.props.params.id);
    },

    render() {
        return (
            <div>
                Topic #{this.props.params.id}
            </div>
        );
    },

    onChange(event, images) {
        this.setState({images: images});
    }
});

export default Topic;

