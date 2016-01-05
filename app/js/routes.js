import React from 'react';
import { Router, Route, Link } from 'react-router';

import Main from './components/main';

let routes = (
    <Router>
        <Route path="/" component={Main}>

        </Route>
    </Router>
);

export default routes;