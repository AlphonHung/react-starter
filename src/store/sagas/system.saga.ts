import { takeEvery, put, call, all } from 'redux-saga/effects';
import { SystemActionTypes, SystemActionCreators, InitAppAction, TodoActionCreators } from '../ducks';

/** App初始化拿取必備資料 */
function* initApp(action: InitAppAction) {
    yield put(SystemActionCreators.addLoadingFlag(action.type));
    // 放入App初始化需執行的非同步作業
    yield put(TodoActionCreators.getList());
    yield put(SystemActionCreators.removeLoadingFlag(action.type));
}

export function* SystemSaga() {
    yield all([
        takeEvery(SystemActionTypes.INIT_APP, initApp),
    ])
}