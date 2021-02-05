import { combineReducers } from 'redux';
import todoListReducer from './todoList/todoListReducer';

const rootReducer = combineReducers({
    todoList: todoListReducer,
});

export default rootReducer;