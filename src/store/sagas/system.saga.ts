import { takeEvery, put, call, all } from 'redux-saga/effects';
import { SystemActionTypes, SystemActionCreators, InitAppAction } from '../ducks';

/** App初始化拿取必備資料 */
function* initApp(action: InitAppAction) {
    yield put(SystemActionCreators.addLoadingFlag(action.type));
    // get api data or something when app init
    yield put(SystemActionCreators.removeLoadingFlag(action.type));
}

export function* SystemSaga() {
    yield all([
        takeEvery(SystemActionTypes.INIT_APP, initApp),
    ])
}