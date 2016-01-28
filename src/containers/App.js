import React from 'react'
import AddTodo from '../components/AddTodo'
import TodoList from '../components/TodoList'
import Footer from '../components/Footer'

export default class App extends React.Component {
    render() {
        return (
            <div>
                <AddTodo onAddClick={text => console.log('add todo',text)}/>
                <TodoList todos={[]} onTodoClick={text => console.log('onTodoClick',text)} />
                <Footer filter="SHOW_ALL" onFilterChange={text => console.log('onFilterChange',text)}/>
            </div>
        );
    }
}