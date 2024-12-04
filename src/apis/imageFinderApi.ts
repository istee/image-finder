import { Photo } from 'models/Photo';
import { createApi } from 'unsplash-js';

const api = createApi({
    // Don't forget to set your access token here!
    // See https://unsplash.com/developers
    accessKey: process.env.REACT_APP_UNSPLASH_ACCESS_KEY ?? '',
});

export const findImages = async (
    onFinish: (photos: Photo[], isError: boolean) => void,
    query: string,
    page = 1
) => {
    api.search
        .getPhotos({
            query: query,
            page,
            orderBy: 'relevant',
            orientation: 'landscape',
        })
        .then((result) => {
            if (result.status !== 200) {
                throw new Error('Failed to fetch images');
            }
            onFinish(result.response?.results ?? [], false);
        })
        .catch(() => {
            onFinish([], true);
        });
};
