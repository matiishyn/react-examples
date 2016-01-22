import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers} from 'redux';

import TodoApp from './app';
import todoAppReducer from './reducers';




// ============================================================

window.store = createStore(todoAppReducer);

console.log(store.getState());

store.dispatch({
    type: 'ADD_TODO',
    id: 0,
    text: 'first'
});

console.log(store.getState());

store.dispatch({
    type: 'ADD_TODO',
    id: 1,
    text: 'second'
});

console.log(store.getState());

store.dispatch({
    type: 'TOGGLE_TODO',
    id: 1
});

console.log(store.getState());


//=============================================================
// VIEW LAYER




const render = () => {
    ReactDOM.render(
        <TodoApp todos={store.getState().todos}/>,
        document.getElementById('root')
    );
};

store.subscribe(render);
render();

window.nextId = 10;

