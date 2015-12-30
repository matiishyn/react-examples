import React from 'react';
import ReactDOM from 'react-dom';

import ReactFire from 'reactfire';
import Firebase from 'firebase';


import 'bootstrap/dist/css/bootstrap.css';

import Header from './header';
import List from './list';


const rootUrl = 'https://todos1234.firebaseio.com/';


let App = React.createClass({
    mixins: [ReactFire],
    componentWillMount() {
        let fb = new Firebase(rootUrl + 'items/');
        this.bindAsObject(fb, 'items');
        fb.on('value', this.handleDataLoaded);
    },

    handleDataLoaded() {
        this.setState({loaded: true});
    },

    getInitialState() {
        return {
            items: {}
        };
    },

    render() {

        return (
            <div className="row panel panel-default">
                <div className="col-md-8 col-md-offset-2">
                    <h2 className="text-center">
                        To-Do List
                    </h2>

                    <Header itemsStore={this.firebaseRefs.items}/>
                    <hr/>
                    <div className={"content"+ (this.state.loaded ? ' loaded' : '')}>
                        <List items={this.state.items}/>
                    </div>
                </div>
            </div>
        );
    }
});


ReactDOM.render(<App/>, document.getElementById('container'));