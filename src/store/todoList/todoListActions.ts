import { TodoActionKeys, ITodoItem } from './todoListTypes';

export const todoActions = {
    getTodos: () => ({
        type: TodoActionKeys.GET_TODOS
    }),
    getTodosSuccess: (data: ITodoItem[]) => ({
        type: TodoActionKeys.GET_TODOS_SUCCESS,
        payload: {
            todos: data
        }
    }),
    getTodosFail: (error: any) => ({
        type: TodoActionKeys.GET_TODOS_FAIL,
        payload: {
            error: error
        }
    }),
    createTodo: (text: String) => ({
        type: TodoActionKeys.CREATE_TODO,
        payload: {
            text: text
        }
    }),
    deleteTodo: (id: Number) => ({
        type: TodoActionKeys.DELETE_TODO,
        payload: {
            id: id
        }
    }),
    toggleTodo: (id: Number) => ({
        type: TodoActionKeys.TOGGLE_TODO,
        payload: {
            id: id
        }
    })
}