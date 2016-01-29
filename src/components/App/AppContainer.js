import App from './App';
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import {selectTodos} from '../../utils/todolist-utils';
import {setVisibilityFilter, completeTodo, addTodo} from '../../actions/actions';

function mapStateToProps(state) {
    return {
        visibleTodos: selectTodos(state.todos, state.visibilityFilter),
        visibilityFilter: state.visibilityFilter
    }
}

function mapDispatcherToProps(dispatch) {
    return {
        ...bindActionCreators({
            setVisibilityFilter,
            completeTodo,
            addTodo
        }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatcherToProps)(App)