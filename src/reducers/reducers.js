import {combineReducers} from 'redux';
import {VisibilityFilters, SET_VISIBILITY_FILTER, COMPLETE_TODO, ADD_TODO} from '../actions/actions';

const initialState = {
    visibilityFilter: VisibilityFilters.SHOW_ALL,
    todos: []
}

function todo(state = {}, action) {
    switch (action.type) {
        case ADD_TODO:
            return {
                text: action.text,
                completed: false
            }

        case COMPLETE_TODO:
            return {
                ...state,
                completed: true
            }
    }
}

function todos(state = [], action) {
    switch (action.type) {
        case ADD_TODO:
            return [
                ...state,
                todo(state, action)
            ]

        case COMPLETE_TODO:
            return [
                ...state.slice(0, action.index),
                todo(state[action.index], action),
                ...state.slice(action.index + 1)
            ]

        default:
            return state
    }
}

function visibilityFilter(state = VisibilityFilters.SHOW_ALL, action) {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return action.filter

        default:
            return state
    }
}

const todoApp = combineReducers({
    visibilityFilter,
    todos
})

export default todoApp