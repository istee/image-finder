import { createCachedSelector } from 're-reselect';
import { RootState } from 'store/store';

export const cardsByTopicSelector = createCachedSelector(
    (state: RootState) => state.topicCards,
    (_: RootState, topic: string) => topic,
    (topicCards, topic) =>
        topicCards.allIds.filter((id) => topic === topicCards.byId[id].topic)
)((_, topic: string) => topic);
