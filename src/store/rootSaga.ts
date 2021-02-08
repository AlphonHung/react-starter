import { all, fork } from 'redux-saga/effects'
import { TodoSaga, SystemSaga } from './sagas';

export function* rootSaga() {
  yield all([
    fork(TodoSaga),
    fork(SystemSaga),
  ]);
}