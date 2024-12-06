import { applyMiddleware, createStore } from 'redux';
import rootReducer from 'store/reducer';
import { thunk } from 'redux-thunk';

// TODO: createStore is deprecated, use recommended approach with @reduxjs/toolkit
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof rootReducer>;
