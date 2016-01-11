import React from 'react';
import { Router, Route, Link } from 'react-router';
import Reflux from 'reflux';
import Actions from '../actions';
import ImageStore from '../stores/image-store';
import ImagePreview from './image-preview';

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
        Actions.getImages(this.props.params.id);
    },

    componentWillReceiveProps(nextProps) {
        Actions.getImages(this.props.params.id);
    },

    render() {
        return (
            <div>
                {this.renderImages()}
            </div>
        );
    },

    onChange(event, images) {
        this.setState({images: images});
    },

    renderImages() {
        return this.state.images.slice(0,10).map(image => {
            return (
                <ImagePreview key={image.id} {...image}/>
            );
        });
    }
});

export default Topic;

