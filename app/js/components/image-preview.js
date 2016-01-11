import React from 'react';


export default class ImagePreview extends React.Component {

    render() {
        return (
            <div className="image-preview">
                {this.renderImage()}
            </div>
        );
    }

    renderImage() {
        var link = `http://i.imgur.com/${this.props.id}h.jpg`;
        return (<img src={link} width="200" height="200" alt="test"/>);
    }
}
