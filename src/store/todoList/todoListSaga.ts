import { takeEvery, put, call, all, delay } from 'redux-saga/effects';
import { TodoActionKeys } from './todoListTypes';
import { todoActions } from './todoListActions';

/** 非同步 取得todo list資料 */
function* getTodoList() {
    // const res = yield call(
    //     () => fetch('https://httpbin.org/get')
    //         .then(response => response.json()),
    // );
    console.log('開始等待');
    yield delay(3000);
    console.log('模擬3秒取得資料');
    yield put(todoActions.getTodosSuccess(
        [{
            id: 1,
            text: 'test',
            completed: false
        }, {
            id: 2,
            text: 'test2',
            completed: true
        }]
    ));
}

// 監聽指定的action type被dispatch時執行對應function
export default function* todoListSata() {
    yield all([
        takeEvery(TodoActionKeys.GET_TODOS, getTodoList)
    ])
}