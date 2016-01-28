import {combineReducers} from 'redux';
import {VisibilityFilter, SET_VISIBILITY_FILTER, COMPLETE_TODO, ADD_TODO} from '../actions/actions';

const initialState = {
    visibilityFilter: VisibilityFilter.SHOW_ALL,
    todos: []
}

function todos(state = [], action) {
    switch (action.type) {
        case ADD_TODO:
            return [
                ...state,
                {
                    text: action.text,
                    completed: false
                }
            ]

        case COMPLETE_TODO:
            return [
                ...state.slice(0, action.index),
                Object.assign({}, state[action.index], {
                    completed: true
                }),
                ...state.slice(action.index + 1)
            ]

        default:
            return state
    }
}

function visibilityFilter(state = VisibilityFilter.SHOW_ALL, action) {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return action.filter

        default:
            return state
    }
}

//function todoApp(state = initialState, action) {
//    return {
//        visibilityFilter: visibilityFilter(state.visibilityFilter, action),
//        todos: todos(state.todos, action)
//    }
//}
// is equivalent to:
const todoApp = combineReducers({
    visibilityFilter,
    todos
})

export default todoApp