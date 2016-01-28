import {addTodo, completeTodo, setVisibilityFilter, VisibilityFilters} from './actions/actions';
import store from './store/store';

console.log(store.getState());

let unsubscribe = store.subscribe(() => console.log(store.getState()));

store.dispatch(addTodo('todo1'))
store.dispatch(addTodo('todo2'))
store.dispatch(addTodo('todo3'))
store.dispatch(completeTodo(1))
store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED))


export default '';