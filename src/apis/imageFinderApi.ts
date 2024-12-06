import { createApi } from 'unsplash-js';
import { ApiResponse } from 'unsplash-js/dist/helpers/response';
import { Photos } from 'unsplash-js/dist/methods/search/types/response';

const api = createApi({
    accessKey: process.env.REACT_APP_UNSPLASH_ACCESS_KEY ?? '',
});

export const findImages = async (
    query: string,
    page: number
): Promise<ApiResponse<Photos>> => {
    return api.search.getPhotos({
        query,
        page,
        orderBy: 'relevant',
        orientation: 'landscape',
    });
};
