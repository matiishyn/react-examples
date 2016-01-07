import React from 'react';
import { Router, Route, Link } from 'react-router';

import Main from './components/main';
import Topic from './components/topic';

let routes = (
    <Router>
        <Route path="/" component={Main}>
            <Route path="topics/:id" component={Topic}/>
        </Route>
    </Router>
);

export default routes;