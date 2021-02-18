import { combineReducers } from 'redux';
import { AuthReducer, SystemReducer, TodoReducer } from './ducks';

export const rootReducer = combineReducers({
    auth: AuthReducer,
    system: SystemReducer,
    todo: TodoReducer,
});

export type RootState = ReturnType<typeof rootReducer>;