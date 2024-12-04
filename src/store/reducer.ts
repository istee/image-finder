import { combineReducers } from 'redux';
import { photosReducer } from './photosReducer';
import { topicCardReducer } from './topicCards';

const rootReducer = combineReducers({
    topicCards: topicCardReducer,
    photos: photosReducer,
});

export default rootReducer;
