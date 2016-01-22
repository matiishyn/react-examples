import React from 'react';

export default class TodoApp extends React.Component {
    onClickHandler() {
        store.dispatch({
            type: 'ADD_TODO',
            text: this.input.value,
            id: nextId++
        });
        this.input.value = '';
    }

    toggleTodoHandler(todo) {
        store.dispatch({
            type: 'TOGGLE_TODO',
            id: todo.id
        });
    }

    getLiClassName(todo) {
        return todo.completed ? 'completed-todo' : '';
    }

    renderLi(todo) {
        return <li
            className={this.getLiClassName.call(this,todo)}
            onClick={this.toggleTodoHandler.bind(this, todo)}
            key={todo.id}>{todo.text}</li>
    }

    render() {
        return (
            <div>
                <input ref={node => {this.input = node;}}/>
                <button onClick={this.onClickHandler.bind(this)}>Add todo</button>
                <ul>
                    {this.props.todos.map(this.renderLi.bind(this))}
                </ul>
            </div>
        );
    }
};