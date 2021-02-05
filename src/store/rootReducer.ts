import { combineReducers } from 'redux';
import { SystemReducer } from './ducks';

export const rootReducer = combineReducers({
    system: SystemReducer,
});

export type RootState = ReturnType<typeof rootReducer>;