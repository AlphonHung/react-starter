import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ITodo } from '~/domain';
import { StorageKeys, imgSource } from '~/constants';
import { RootState, TodoActionCreators } from '~/store';
import '~/assets/scss/components/TodoListSet.scss';

/** 目前順位第一個任務 */
const CurrentTask = () => {
    const { t } = useTranslation();
    const todoList = useSelector((state: RootState) => state.todo.list);
    if (!todoList || todoList.length === 0) {
        return <div>{t("component.todo.none_todo")}</div>
    }
    return <div>{`${t("component.todo.current_todo")}：${todoList[0].title}`}</div>;
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

/** 儲存目前list至localStorage */
const SaveButton = () => {
    const { t } = useTranslation();
    const todoList = useSelector((state: RootState) => state.todo.list);

    return (
        <button onClick={() => {
            localStorage.setItem(StorageKeys.Todo.List, JSON.stringify(Object.assign([], todoList)));
            alert("Save Finished");
        }}>
            {t("system.button.save")}
        </button>
    )
}

/** 任務表中單一任務 */
const Todo = (props: { todo: ITodo }) => {
    const { todo } = props;
    const dispatch = useDispatch();
    return (
        <div className="todo">
            <div className="todo-title">{`Title:${todo.title}`}</div>
            <div className="todo-id">{`ID:${todo.id}`}</div>
            <img className={`todo-check ${todo.done ? "done" : ""}`} onClick={() => { dispatch(TodoActionCreators.toggleTodo(todo.id)); }} src={todo.done ? imgSource.icon.common.check : imgSource.icon.common.close} />
            <img className="todo-remove" onClick={() => { dispatch(TodoActionCreators.removeTodo(todo.id)); }} src={imgSource.icon.common.trash} />
        </div>
    );
};

/** 任務列表 */
const TodoList = () => {
    const todoList = useSelector((state: RootState) => state.todo.list);
    return (
        <div className="todo-list">
            {todoList.map(todo => <Todo todo={todo} key={todo.id} />)}
        </div>
    );
}

/** 所有任務相關組件區塊 */
const TodoListSet = () => (
    <div className="todo-list-set">
        <div className="flex-row flex-spbt">
            <div className="flex-row">
                <CurrentTask />
                <CreateTodo />
            </div>
            <SaveButton />
        </div>
        <TodoList />
    </div>
)

export default TodoListSet;