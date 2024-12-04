import { createSelector } from 'reselect';
import { RootState } from 'store/store';

export const topicCardByIdSelector = createSelector(
    (state: RootState) => state.topicCards.byId,
    (_: RootState, id: string) => id,
    (topicCardsById, id) => topicCardsById[id] ?? undefined
);
