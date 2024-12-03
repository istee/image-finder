import { TopicCard } from 'models/TopicCard';
import { ActionTypes } from 'store/actionTypes';

export const createCard = (card: TopicCard) => ({
  type: ActionTypes.CREATE_CARD,
  payload: card,
});
