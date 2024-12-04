import { createCachedSelector } from 're-reselect';
import { RootState } from 'store/store';

export const topicCardByIdSelector = createCachedSelector(
    (state: RootState) => state.topicCards.byId,
    (_: RootState, id: string) => id,
    (topicCardsById, id) => topicCardsById[id]
)((_: RootState, id) => id);
