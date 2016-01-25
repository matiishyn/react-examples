import React from 'react';
import {connect} from 'react-redux';


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

class FilterLink extends React.Component {
    componentDidMount() {
        const {store} = this.context;
        this.unsubscribe = store.subscribe(() => {
            this.forceUpdate();
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const {store} = this.context;
        const props = this.props;
        const state = store.getState();
        return (
            <Link
                active={ props.filter === state.visibilityFilter }
                onClick={() =>
                    store.dispatch({
                        type: 'SET_VISIBILITY_FILTER',
                        filter: props.filter
                    })
                }
            >
                {props.children}
            </Link>
        );
    }
}
FilterLink.contextTypes = {
    store: React.PropTypes.object
};

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
const AddTodo = (props, {store}) => {
    let input;
    return (
        <div>
            <input ref={node => {input = node;}}/>
            <button onClick={()=>{
                store.dispatch({
                    type: 'ADD_TODO',
                    text: input.value,
                    id: nextId++
                });
                input.value = '';
            }}>
                Add todo
            </button>
        </div>
    );
};
AddTodo.contextTypes = {
    store: React.PropTypes.object
};

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


// map redux props state to Todo component
const mapStateToProps = (state) => {
    return {
        todos: getVisibleTodos(state.todos, state.visibilityFilter)
    };
};

// maps Dispatch method of the store to the comp
const mapDispatchToProps = (dispatch) => {
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
    mapStateToProps,
    mapDispatchToProps
)(TodoList);


export default () => (
    <div>
        <AddTodo/>
        <VisibleTodoList/>
        <Footer/>
    </div>
);