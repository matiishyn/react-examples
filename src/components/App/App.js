import React, {PropTypes, Component} from 'react'
import AddTodo from '../AddTodo'
import TodoList from '../TodoList'
import Footer from '../Footer'

console.log('App');
export default class App extends Component {
    static propTypes = {
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
        ]).isRequired,

        addTodo: PropTypes.func.isRequired,
        completeTodo: PropTypes.func.isRequired,
        setVisibilityFilter: PropTypes.func.isRequired
    };

    render() {
        const {visibleTodos, visibilityFilter} = this.props;
        console.log('visibleTodos=', visibleTodos);
        return (
            <div>
                <AddTodo onAddClick={text => this.props.addTodo(text)}/>

                <TodoList todos={visibleTodos} onTodoClick={index => this.props.completeTodo(index)}/>

                <Footer filter={visibilityFilter}
                        onFilterChange={nextFilter => this.props.setVisibilityFilter(nextFilter)}/>
            </div>
        );
    }
}