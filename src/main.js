import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers} from 'redux';

import TodoApp from './app';
import todoAppReducer from './reducers';




// ============================================================

window.store = createStore(todoAppReducer);

store.dispatch({ type: 'ADD_TODO', id: 1, text: '1' });
store.dispatch({ type: 'ADD_TODO', id: 2, text: '2' });
store.dispatch({ type: 'ADD_TODO', id: 3, text: '3' });
store.dispatch({ type: 'ADD_TODO', id: 4, text: '4' });

store.dispatch({ type: 'TOGGLE_TODO', id: 1 });
store.dispatch({ type: 'TOGGLE_TODO', id: 3 });


//=============================================================
// VIEW LAYER


const render = () => {
    ReactDOM.render(
        <TodoApp {...store.getState()}/>,
        document.getElementById('root')
    );
};

store.subscribe(render);
render();

window.nextId = 10;

