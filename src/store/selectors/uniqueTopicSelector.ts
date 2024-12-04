import { createSelector } from 'reselect';
import { RootState } from 'store/store';

export const uniqueTopicSelector = createSelector(
    (state: RootState) => state.topicCards,
    (topicCards) =>
        Array.from(
            new Set(topicCards.allIds.map((id) => topicCards.byId[id].topic))
        )
);
