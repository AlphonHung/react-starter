import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./rootSaga";
import { rootReducer } from "./rootReducer";

const sagaMiddleware = createSagaMiddleware();

export const configureStore = () => {
    const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(rootSaga);
    return store;
};