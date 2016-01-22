import React from 'react';

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
        this.unsubscribe = store.subscribe(() => {
            this.forceUpdate();
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
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
const AddTodo = () => {
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

class VisibleTodoList extends React.Component {
    componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
            this.forceUpdate();
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const props = this.props;
        const state = store.getState();

        return (
            <TodoList
                todos={ getVisibleTodos(state.todos, state.visibilityFilter) }
                onTodoClick={id =>
                    store.dispatch({
                        type:'TOGGLE_TODO',
                        id
                    })
                }
            >

            </TodoList>
        );
    }
}

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

export default () => (
    <div>
        <AddTodo/>

        <VisibleTodoList/>


        <Footer/>
    </div>
);