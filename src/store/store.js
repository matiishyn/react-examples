import {createStore} from 'redux';
import todoApp from '../reducers/reducers';

let store = createStore(todoApp /*, initState*/);
window.tempStore = store; // reference to use in console

export default store;