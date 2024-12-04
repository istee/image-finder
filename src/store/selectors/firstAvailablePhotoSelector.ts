import { createSelector } from 'reselect';
import { RootState } from 'store/store';

export const firstAvailablePhotoSelector = createSelector(
    (state: RootState) => state.photos,
    (_: RootState, topic: string) => topic,
    (photos, topic) => photos[topic]?.photos?.[0]
);
