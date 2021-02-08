import { takeEvery, put, call, all } from 'redux-saga/effects';
import { ITodo } from '~/domain';
import { SystemActionCreators, TodoActionTypes, TodoActionCreators, GetListAction } from '../ducks';
// import { api } from '~/lib/api';
import helper from '~/helper';

/** App初始化拿取必備資料 */
function* getList(action: GetListAction) {
    yield put(SystemActionCreators.addLoadingFlag(action.type));
    // const res = yield call(api.todo.list); // 呼叫api範例
    // const dataStr = yield call(helper.storage.current.getItem, helper.storage.keys.Todo.List); // 非同步呼叫getItem範例
    const dataStr = helper.storage.current.getItem(helper.storage.keys.Todo.List);
    const data: ITodo[] = JSON.parse(dataStr || "");
    if (data) {
        yield put(TodoActionCreators.getListDone(data));
    } else {
        yield put(TodoActionCreators.getListDone());
    }
    yield put(SystemActionCreators.removeLoadingFlag(action.type));
}

export function* TodoSaga() {
    yield all([
        takeEvery(TodoActionTypes.GET_LIST, getList),
    ])
}