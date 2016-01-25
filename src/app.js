import React from 'react';
import {connect} from 'react-redux';
import {addTodo, setVisibilityFilter} from './actions';


// ONLY APPEARANCE, without logic
const Link = ({active,children, onClick}) => {
    if (active) {
        return <span>{children}</span>
    }
    return (
        <a href="#"
           onClick={e=> {
                e.preventDefault();
                onClick()
           }}
        >{children}</a>
    );
};

// =========================================================
const mapStateToLinkProps = (state, ownProps) => {
    return {
        active: ownProps.filter === state.visibilityFilter
    };
};
const mapDispatchToLinkProps = (dispatch, ownProps) => {
    return {
        onClick: () => {
            dispatch(setVisibilityFilter(ownProps.filter))
        }
    };
};

const FilterLink = connect(
    mapStateToLinkProps,
    mapDispatchToLinkProps
)(Link);
// =========================================================

const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case 'SHOW_ALL':
            return todos;
        case 'SHOW_COMPLETED':
            return todos.filter(todo => todo.completed);
        case 'SHOW_ACTIVE':
            return todos.filter(todo => !todo.completed);
        default:

    }
};

// PRESENTATIONAL COMPONENT, NO LOGIC HERE
const Todo = ({onClick, completed, text}) => {
    return (
        <li
            onClick={onClick}
            style={{ textDecoration: completed ? 'line-through' : 'none' }}
        >
            {text}
        </li>
    );
};

// PRESENTATIONAL COMPONENT, NO LOGIC HERE
let AddTodo = ({dispatch}) => {
    let input;
    return (
        <div>
            <input ref={node => {input = node;}}/>
            <button onClick={()=>{
                dispatch(addTodo(input.value));
                input.value = '';
            }}>
                Add todo
            </button>
        </div>
    );
};
AddTodo = connect()(AddTodo);

// PRESENTATIONAL COMPONENT, NO LOGIC HERE
const TodoList = ({todos, onTodoClick}) => (
    <ul>
        {todos.map(todo =>
            <Todo
                key={todo.id}
                {...todo}
                onClick={() => onTodoClick(todo.id)}
            />)}
    </ul>
);

// PRESENTATIONAL COMPONENT, NO LOGIC HERE
const Footer = ({visibilityFilter, onFilterClick}) => (
    <p>
        Show:{' '}

        <FilterLink filter="SHOW_ALL" currentFilter={visibilityFilter} onClick={onFilterClick}>All</FilterLink>{' '}

        <FilterLink filter="SHOW_ACTIVE" currentFilter={visibilityFilter}
                    onClick={onFilterClick}>Active</FilterLink>{' '}

        <FilterLink filter="SHOW_COMPLETED" currentFilter={visibilityFilter}
                    onClick={onFilterClick}>Completed</FilterLink>
    </p>
);

// ==========================================

// map redux props state to Todo component
const mapStateToTodoListProps = (state) => {
    return {
        todos: getVisibleTodos(state.todos, state.visibilityFilter)
    };
};
// maps Dispatch method of the store to the comp
const mapDispatchToTodoListProps = (dispatch) => {
    return {
        onTodoClick: (id) => {
            dispatch({
                type: 'TOGGLE_TODO',
                id
            })
        }
    };
};
const VisibleTodoList = connect(
    mapStateToTodoListProps,
    mapDispatchToTodoListProps
)(TodoList);
// ==========================================

export default () => (
    <div>
        <AddTodo/>
        <VisibleTodoList/>
        <Footer/>
    </div>
);