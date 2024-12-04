import { TopicCard } from 'models/TopicCard';

export const enum ActionTypes {
    CREATE_CARD = 'CREATE_CARD',
}

interface CreateCardAction {
    type: ActionTypes.CREATE_CARD;
    payload: TopicCard;
}

type Action = CreateCardAction;

export const createCard = (card: TopicCard) => ({
    type: ActionTypes.CREATE_CARD,
    payload: card,
});

interface TopicCardState {
    byId: { [id: string]: TopicCard };
    allIds: string[];
}

const initialState: TopicCardState = {
    byId: {},
    allIds: [],
};

const reducerFunctions = {
    [ActionTypes.CREATE_CARD]: (
        state: TopicCardState,
        action: CreateCardAction
    ) => {
        const card = action.payload;
        return {
            ...state,
            byId: { ...state.byId, [card.id]: card },
            allIds: [...state.allIds, card.id],
        };
    },
};

export const topicCardReducer = (
    state: TopicCardState = initialState,
    action: Action
) =>
    reducerFunctions[action.type]
        ? reducerFunctions[action.type](state, action)
        : state;
