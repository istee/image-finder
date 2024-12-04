import { TopicCard } from 'models/TopicCard';
import { ActionTypes } from 'store/topicCards/actionTypes';

export const createCard = (card: TopicCard) => ({
    type: ActionTypes.CREATE_CARD,
    payload: card,
});
