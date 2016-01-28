import React, {PropTypes} from 'react'
import {connect} from 'react-redux'

import * as actions from '../actions/actions'
import AddTodo from '../components/AddTodo'
import TodoList from '../components/TodoList'
import Footer from '../components/Footer'

class App extends React.Component {
    render() {
        const {dispatch, visibleTodos, visibilityFilter} = this.props;
        return (
            <div>
                <AddTodo onAddClick={text => dispatch(actions.addTodo(text))}/>

                <TodoList todos={visibleTodos} onTodoClick={index => dispatch(actions.completeTodo(index))}/>

                <Footer filter={visibilityFilter}
                        onFilterChange={nextFilter => dispatch(actions.setVisibilityFilter(nextFilter))}/>
            </div>
        );
    }
}

App.propTypes = {
    visibleTodos: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string.isRequired,
            completed: PropTypes.bool.isRequired
        }).isRequired
    ).isRequired,

    visibilityFilter: PropTypes.oneOf([
        'SHOW_ALL',
        'SHOW_COMPLETED',
        'SHOW_ACTIVE'
    ]).isRequired
}

function mapStateToProps(state) {
    return {
        visibleTodos: selectTodos(state.todos, state.visibilityFilter),
        visibilityFilter: state.visibilityFilter
    }
}

function selectTodos(todos, filter) {
    switch (filter) {
        case actions.VisibilityFilters.SHOW_ALL:
            return todos

        case actions.VisibilityFilters.SHOW_COMPLETED:
            return todos.filter(todo => todo.completed)

        case actions.VisibilityFilters.SHOW_ACTIVE:
            return todos.filter(todo => !todo.completed)
    }
}

export default connect(mapStateToProps)(App)