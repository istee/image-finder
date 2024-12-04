import { createSelector } from 'reselect';
import { RootState } from 'store/store';

export const cardsByNameSelector = createSelector(
    (state: RootState) => state.topicCards,
    (_: RootState, name: string) => name,
    (topicCards, name) =>
        topicCards.allIds.filter(
            (id) =>
                name ===
                `${topicCards.byId[id].firstName} ${topicCards.byId[id].surName}`
        )
);
