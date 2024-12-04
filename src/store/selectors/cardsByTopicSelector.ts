import { createSelector } from 'reselect';
import { RootState } from 'store/store';

export const cardsByTopicSelector = createSelector(
    (state: RootState) => state.topicCards,
    (_: RootState, topic: string) => topic,
    (topicCards, topic) =>
        topicCards.allIds.filter((id) => topic === topicCards.byId[id].topic)
);
