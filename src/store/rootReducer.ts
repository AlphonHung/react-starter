import { combineReducers } from 'redux';
import { TodoReducer, SystemReducer } from './ducks';

export const rootReducer = combineReducers({
    todo: TodoReducer,
    system: SystemReducer,
});

export type RootState = ReturnType<typeof rootReducer>;