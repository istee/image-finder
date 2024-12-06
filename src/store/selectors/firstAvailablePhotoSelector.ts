import { createSelector } from 'reselect';
import { RootState } from 'store/store';

export const photoStateByTopicSelector = createSelector(
    (state: RootState) => state.photos,
    (_: RootState, topic: string) => topic,
    (photos, topic) => {
        const photoState = photos[topic];
        return {
            photo: photoState?.photos[0],
            page: photoState?.page ?? 0,
            error: photoState?.error,
            isLoading: photoState?.isLoading,
        };
    }
);
