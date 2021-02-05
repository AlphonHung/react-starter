import { createStore, compose, applyMiddleware } from 'redux';
import todoListReducer from './todoList/todoListReducer';
import createSagaMiddleware from 'redux-saga'
import rootSaga from './rootSaga';
import rootReducer from './rootReducer';

const sagaMiddleware = createSagaMiddleware()
const configureStore = function () {
	const store = createStore(rootReducer,applyMiddleware(sagaMiddleware))
	sagaMiddleware.run(rootSaga);
	return store;
}

/** 供Provider使用的store */
const store = configureStore();
export default store;

/** 供component存取用的總state type */
export type RootState = ReturnType<typeof rootReducer>;