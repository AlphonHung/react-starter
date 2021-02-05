import { all } from 'redux-saga/effects';
import todoListSaga from './todoList/todoListSaga';

export default function* rootSaga() {
    yield all([
        todoListSaga()
    ])
}