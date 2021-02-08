import produce from 'immer';
import moment from 'moment';

const prefix = 'TODO';

export interface ITodo {
    id: string;
    title: string;
    done: boolean;
}

export const TodoActionTypes = {
    GET_LIST: `${prefix}/GET_LIST`,
    GET_LIST_DONE: `${prefix}/GET_LIST_DONE`,
    ADD_TODO: `${prefix}/ADD_TODO`,
    REMOVE_TODO: `${prefix}/REMOVE_TODO`,
    TOGGLE_TODO: `${prefix}/TOGGLE_TODO`,
}

export interface GetListAction {
    type: typeof TodoActionTypes.GET_LIST;
}

export interface GetListDoneAction {
    type: typeof TodoActionTypes.GET_LIST_DONE;
    data?: ITodo[];
}

export interface AddTodoAction {
    type: typeof TodoActionTypes.ADD_TODO;
    title: string;
}

export interface RemoveTodoAction {
    type: typeof TodoActionTypes.REMOVE_TODO;
    id: string;
}

export interface ToggleTodoAction {
    type: typeof TodoActionTypes.TOGGLE_TODO;
    id: string;
}


type TodoAction
    = GetListAction
    | GetListDoneAction
    | AddTodoAction
    | RemoveTodoAction
    | ToggleTodoAction;

export const TodoActionCreators = {
    /** 取得列表 */
    getList: (): TodoAction => ({ type: TodoActionTypes.GET_LIST }),
    getListDone: (data?: ITodo[]): TodoAction => ({ type: TodoActionTypes.GET_LIST_DONE, data }),
    /** 新增與刪除 */
    addTodo: (title: string): TodoAction => ({ type: TodoActionTypes.ADD_TODO, title }),
    removeTodo: (id: string): TodoAction => ({ type: TodoActionTypes.REMOVE_TODO, id }),
    /** 切換狀態 */
    toggleTodo: (id: string): TodoAction => ({ type: TodoActionTypes.TOGGLE_TODO, id }),
}

interface IStateType {
    list: ITodo[]; // 全部非同步作業的進行中flag
}

const initState: IStateType = {
    list: [],
}

export const TodoReducer = produce((draft: IStateType, action: TodoAction) => {
    switch (action.type) {
        case TodoActionTypes.GET_LIST_DONE: {
            const list = (action as GetListDoneAction).data;
            if (list) draft.list = list;
            return;
        }
        case TodoActionTypes.ADD_TODO: {
            const newTodo: ITodo = { id: moment().format("x"), title: (action as AddTodoAction).title, done: false };
            draft.list.push(newTodo);
            return;
        }
        case TodoActionTypes.REMOVE_TODO: {
            draft.list = draft.list.filter(x => x.id !== (action as RemoveTodoAction).id);
            return;
        }
        case TodoActionTypes.TOGGLE_TODO: {
            const targetTodo = draft.list.find(x => x.id === (action as ToggleTodoAction).id);
            if (targetTodo) targetTodo.done = !targetTodo.done;
            return;
        }
    }
}, initState);