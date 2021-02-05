import { ITodoListState, ITodoActionTypes, TodoActionKeys, ITodoItem, CreateTodoAction, DeleteTodoAction, ToggleTodoAction, GetTodoListSuccessAction } from './todoListTypes';

const initState: ITodoListState = {
    todos: []
}

const todoListReducer = (state = initState, action: ITodoActionTypes) => {
    if (Object.keys(functionMapping).indexOf(action.type) === -1) return state;
    return functionMapping[action.type](state, action);
}

const functionMapping: { [key: string]: (state: ITodoListState, ITodoActionTypes: any) => ITodoListState } = {
    GET_TODOS_SUCCESS: getTodoListSuccess,
    CREATE_TODO: createTodo,
    DELETE_TODO: deleteTodo,
    TOGGLE_TODO: toggleTodo
}

function getTodoListSuccess(state: ITodoListState, action: GetTodoListSuccessAction): ITodoListState {
    return {
        ...state,
        todos: action.payload.todos
    }
}

function createTodo(state: ITodoListState, action: CreateTodoAction): ITodoListState {
    return {
        ...state,
        todos: [...state.todos, {
            id: Math.floor(Date.now() / 1000),
            text: action.payload.text,
            completed: false
        }]
    }
}

function deleteTodo(state: ITodoListState, action: DeleteTodoAction): ITodoListState {
    return {
        ...state,
        todos: state.todos.filter(x => x.id !== action.payload.id)
    }
}

function toggleTodo(state: ITodoListState, action: ToggleTodoAction): ITodoListState {
    return {
        ...state,
        todos: state.todos.map(x => x.id === action.payload.id
            ? { ...x, completed: !x.completed } as ITodoItem
            : x)
    }
}

export default todoListReducer;