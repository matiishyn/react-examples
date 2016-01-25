import React from 'react';
import {Provider} from 'react-redux';
import ReactDOM from 'react-dom';
import {createStore, combineReducers} from 'redux';

import TodoApp from './app';
import todoAppReducer from './reducers';


// VIEW LAYER
ReactDOM.render(
    <Provider store={createStore(todoAppReducer)}>
        <TodoApp/>
    </Provider>,
    document.getElementById('root')
);

window.nextId = 10;

