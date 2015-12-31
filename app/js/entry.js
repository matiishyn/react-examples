import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootswatch/spacelab/bootstrap.min.css';

class App extends React.Component {
    render() {
        return (
            <h1>Hello!</h1>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('container'));