import React from 'react';

const FilterLink = ({filter, currentFilter, children, onClick}) => {
    if (filter === currentFilter) {
        return <span>{children}</span>
    }
    return (
        <a href="#"
           onClick={e=> {
                e.preventDefault();
                onClick(filter)
           }}
        >{children}</a>
    );
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
const AddTodo = ({onAddClick}) => {
    let input;
    return (
        <div>
            <input ref={node => {input = node;}}/>
            <button onClick={()=>{
                onAddClick(input.value);
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

export default ({ todos, visibilityFilter }) => (
    <div>
        <AddTodo
            onAddClick={
                        text => store.dispatch({
                            type: 'ADD_TODO',
                            text,
                            id: nextId++
                        })
                    }
        />

        <TodoList
            todos={getVisibleTodos(todos, visibilityFilter)}
            onTodoClick={id => {
                        store.dispatch({
                            type: 'TOGGLE_TODO',
                            id
                        })
                        }
                    }
        />


        <Footer
            visibilityFilter={visibilityFilter}
            onFilterClick={filter =>
                        store.dispatch({
                            type: 'SET_VISIBILITY_FILTER',
                            filter
                        })
                    }
        />
    </div>
);