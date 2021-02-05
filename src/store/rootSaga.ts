import { all, fork } from 'redux-saga/effects'
import { SystemSaga } from './sagas';

export function* rootSaga() {
  yield all([
    fork(SystemSaga),
  ]);
}