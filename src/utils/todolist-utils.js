import {VisibilityFilters} from '../actions/actions';


export function selectTodos(todos, filter) {
    switch (filter) {
        case VisibilityFilters.SHOW_ALL:
            return todos

        case VisibilityFilters.SHOW_COMPLETED:
            return todos.filter(todo => todo.completed)

        case VisibilityFilters.SHOW_ACTIVE:
            return todos.filter(todo => !todo.completed)
    }
}