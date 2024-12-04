import { createStore } from 'redux';
import rootReducer from 'store/reducer';

export const store = createStore(
    rootReducer
    // Enable Redux DevTools in development
);

export type RootState = ReturnType<typeof rootReducer>;
