import { TopicCard } from 'models/TopicCard';
import { ActionTypes } from 'store/actionTypes';
import { combineReducers } from 'redux';

interface TopicCardState {
    byId: { [id: string]: TopicCard };
    allIds: string[];
}

const initialState: TopicCardState = {
    byId: {},
    allIds: [],
};

export const topicCardReducer = (
    state = initialState,
    action: any
): TopicCardState => {
    switch (action.type) {
        case ActionTypes.CREATE_CARD: {
            const card = action.payload;
            return {
                ...state,
                byId: { ...state.byId, [card.id]: card },
                allIds: [...state.allIds, card.id],
            };
        }
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    topicCards: topicCardReducer,
});

export default rootReducer;
