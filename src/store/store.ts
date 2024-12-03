import { createStore } from 'redux';
import rootReducer from 'store/reducer';

export const store = createStore(
    rootReducer,
    // Enable Redux DevTools in development
    typeof window !== 'undefined' &&
        (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
        (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

export type RootState = ReturnType<typeof rootReducer>;
