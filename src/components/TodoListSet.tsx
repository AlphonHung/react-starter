import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ITodo } from '~/domain';
import { RootState, TodoActionCreators } from '~/store';
import '~/assets/scss/components/TodoListSet.scss';

/** 目前順位第一個任務 */
const CurrentTask = () => {
    const { t } = useTranslation();
    const todoList = useSelector((state: RootState) => state.todo.list);
    if (!todoList || todoList.length === 0) {
        return <div>{t("todo.message.none_todo")}</div>
    }
    return <div>{`${t("todo.message.current_todo")}：${todoList[0].title}`}</div>;
}

/** 新增任務的區塊 */
const CreateTodo = () => {
    const dispatch = useDispatch();
    const [newTodoTitle, setNewTodoTitle] = useState("");
    const { t } = useTranslation();
    return (
        <div className="new-todo-area">
            <input value={newTodoTitle} onChange={(e) => { setNewTodoTitle(e.target.value); }} />
            <button type="button" onClick={() => { dispatch(TodoActionCreators.addTodo(newTodoTitle)); setNewTodoTitle("") }}>{t("system.button.add")}</button>
        </div>
    );
}

/** 任務表中單一任務行 */
const Todo = (props: { todo: ITodo }) => {
    const { todo } = props;
    const dispatch = useDispatch();
    return (
        <li className="todo">
            No:{todo.id} {todo.title} {todo.done ? 'Finish' : 'Wait'}
            <button type="button" onClick={() => { dispatch(TodoActionCreators.toggleTodo(todo.id)); }}>Toggle</button>
        </li>
    );
};

/** 任務列表 */
const TodoList = () => {
    const todoList = useSelector((state: RootState) => state.todo.list);
    return (
        <ul className="todo-list">
            {todoList.map(todo => <Todo todo={todo} key={todo.id} />)}
        </ul>
    );
}

/** 所有任務相關組件區塊 */
const TodoListSet = () => (
    <div className="todo-list-set">
        <CurrentTask />
        <CreateTodo />
        <TodoList />
    </div>
)

export default TodoListSet;