import { createSelector } from 'reselect';
import { RootState } from 'store/store';

export const uniqueNameSelector = createSelector(
    (state: RootState) => state.topicCards,
    (topicCards) =>
        Array.from(
            new Set(
                topicCards.allIds.map(
                    (id) =>
                        `${topicCards.byId[id].firstName} ${topicCards.byId[id].surName}`
                )
            )
        )
);
