import { RootState } from 'store/store';

export const topicCardIdSelector = (state: RootState) =>
    state.topicCards.allIds;
