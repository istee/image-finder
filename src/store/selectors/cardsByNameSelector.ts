import { createCachedSelector } from 're-reselect';
import { RootState } from 'store/store';

export const cardsByNameSelector = createCachedSelector(
    (state: RootState) => state.topicCards,
    (_: RootState, name: string) => name,
    (topicCards, name) =>
        topicCards.allIds.filter(
            (id) =>
                name ===
                `${topicCards.byId[id].firstName} ${topicCards.byId[id].surName}`
        )
)((_, name: string) => name);
