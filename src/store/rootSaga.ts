import { all, fork } from 'redux-saga/effects'
import { AuthSaga, SystemSaga, TodoSaga } from './sagas';

export function* rootSaga() {
  yield all([
    fork(AuthSaga),
    fork(TodoSaga),
    fork(SystemSaga),
  ]);
}