import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ITodoItem } from '../../store/todoList/todoListTypes';
import { todoActions } from '../../store/todoList/todoListActions';
import { RootState } from '../../store/index';
import '../../assets/scss/components/TodoList.scss';

/** 單一任務行 */
interface ITaskProps {
    task: ITodoItem
}
const Task = (props: ITaskProps) => {
    const { task } = props;
    const dispatch = useDispatch();
    return (
        <li>
            No:{task.id} {task.text} {task.completed ? 'Finish' : 'Wait'}
            <button type="button" onClick={() => { dispatch(todoActions.toggleTodo(task.id)); }}>Toggle</button>
        </li>
    );
};

/** 目前順位第一個任務 */
const CurrentTask = () => {
    const todoList = useSelector((state: RootState) => state.todoList.todos);
    if (!todoList || todoList.length === 0) {
        return <div>現在沒有要做的事</div>
    }
    return <div>下一件要做的事：{todoList[0].text}</div>;
}

/** 新增任務的區塊 */
const CreateTodo = () => {
    const dispatch = useDispatch();
    const [newTodoText, setNewTodoText] = useState('');
    return (
        <>
            <input value={newTodoText} onChange={(e) => { setNewTodoText(e.target.value); }}></input>
            <button type="button" onClick={() => { dispatch(todoActions.createTodo(newTodoText)); }}>Add</button>
        </>
    );
}

/** 任務列表 */
const TodoList = () => {
    const todoList = useSelector((state: RootState) => state.todoList.todos);
    return (
        <ul className="todo-list">
            {todoList.map(task => <Task task={task} key={task.id} />)}
        </ul>
    );
}

/** 所有任務相關組件區塊 */
const TodoListSet = () => {
    const dispatch = useDispatch();
    dispatch(todoActions.getTodos());
    return (
        <div className="todo-list-set">
            <CurrentTask />
            <CreateTodo />
            <TodoList />
        </div>
    );
}

export default TodoListSet;