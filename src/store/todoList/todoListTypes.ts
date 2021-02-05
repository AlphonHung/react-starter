import KeyMirror from 'keymirror';

// Action Constants
export const TodoActionKeys = KeyMirror({
    GET_TODOS: null,
    GET_TODOS_SUCCESS: null,
    GET_TODOS_FAIL: null,
    CREATE_TODO: null,
    DELETE_TODO: null,
    TOGGLE_TODO: null
});

export interface ITodoListState {
    todos: ITodoItem[]
}

export interface ITodoItem {
    id: number;
    text: string;
    completed: boolean;
}

export type GetTodoListSuccessAction = {
    type: typeof TodoActionKeys.GET_TODOS_SUCCESS;
    payload: {
        todos: ITodoItem[]
    }
}

export type CreateTodoAction = {
    type: typeof TodoActionKeys.CREATE_TODO;
    payload: {
        text: string
    }
}

export type DeleteTodoAction = {
    type: typeof TodoActionKeys.DELETE_TODO;
    payload: {
        id: number
    }
}

export type ToggleTodoAction = {
    type: typeof TodoActionKeys.TOGGLE_TODO;
    payload: {
        id: number
    }
}

export type ITodoActionTypes
    = GetTodoListSuccessAction | CreateTodoAction | DeleteTodoAction | ToggleTodoAction;