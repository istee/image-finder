import { findImages } from 'apis/imageFinderApi';
import { Photo } from 'models/Photo';
import { Topic } from 'models/Topic';
import { ThunkAction } from 'redux-thunk';
import { RootState } from './store';
import { AnyAction, Dispatch } from 'redux';

export const enum ActionTypes {
    FETCH_PHOTOS_REQUEST = 'FETCH_PHOTOS_REQUEST',
    FETCH_PHOTOS_SUCCESS = 'FETCH_PHOTOS_SUCCESS',
    FETCH_PHOTOS_FAILURE = 'FETCH_PHOTOS_FAILURE',
    REMOVE_PHOTO = 'REMOVE_PHOTO',
}

interface FetchPhotosRequestAction {
    type: ActionTypes.FETCH_PHOTOS_REQUEST;
    payload: { topic: Topic; photos: Photo[] };
}

interface FetchPhotosSuccessAction {
    type: ActionTypes.FETCH_PHOTOS_SUCCESS;
    payload: { topic: Topic; photos: Photo[]; page: number };
}

interface FetchPhotosFailureAction {
    type: ActionTypes.FETCH_PHOTOS_FAILURE;
    payload: { topic: Topic; photos: Photo[]; error: string };
}

interface RemovePhotoAction {
    type: ActionTypes.REMOVE_PHOTO;
    payload: { topic: Topic; photoId: string };
}

type Action =
    | FetchPhotosRequestAction
    | FetchPhotosSuccessAction
    | FetchPhotosFailureAction
    | RemovePhotoAction;

export const fetchPhotosRequestAction = (topic: Topic) => ({
    type: ActionTypes.FETCH_PHOTOS_REQUEST,
    payload: { topic },
});

export const removePhotoAction = (topic: Topic, photoId: string) => ({
    type: ActionTypes.REMOVE_PHOTO,
    payload: { topic, photoId },
});

type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    AnyAction
>;

export const fetchPhotos =
    (topic: string, page: number): AppThunk =>
    async (dispatch: Dispatch) => {
        dispatch({
            type: ActionTypes.FETCH_PHOTOS_REQUEST,
            payload: { topic },
        });
        try {
            const result = await findImages(topic, page);

            if (result.status !== 200) {
                throw new Error('Failed to fetch images.');
            }

            dispatch({
                type: ActionTypes.FETCH_PHOTOS_SUCCESS,
                payload: {
                    topic,
                    photos: result.response?.results ?? [],
                    page,
                },
            });
        } catch (error) {
            dispatch({
                type: ActionTypes.FETCH_PHOTOS_FAILURE,
                payload: { topic, error: (error as Error).message },
            });
        }
    };

type PhotoState = {
    [key in string]?: {
        photos: Photo[];
        page: number;
        isLoading: boolean;
        error?: string;
    };
};

const initialState: PhotoState = {};

const reducerFunctions: {
    [key in ActionTypes]: (state: PhotoState, action: Action) => PhotoState;
} = {
    [ActionTypes.FETCH_PHOTOS_REQUEST]: (state: PhotoState, action: Action) => {
        const { payload } = action as FetchPhotosRequestAction;
        return {
            ...state,
            [payload.topic]: {
                photos: [],
                page: 0,
                ...state[payload.topic],
                error: undefined,
                isLoading: true,
            },
        };
    },
    [ActionTypes.FETCH_PHOTOS_SUCCESS]: (state: PhotoState, action: Action) => {
        const { payload } = action as FetchPhotosSuccessAction;
        return {
            ...state,
            [payload.topic]: {
                error: undefined,
                isLoading: false,
                photos: [
                    ...(state[payload.topic]?.photos ?? []),
                    ...payload.photos,
                ],
                page: payload.page,
            },
        };
    },
    [ActionTypes.FETCH_PHOTOS_FAILURE]: (state: PhotoState, action: Action) => {
        const { payload } = action as FetchPhotosFailureAction;
        return {
            ...state,
            [payload.topic]: {
                photos: [],
                page: 0,
                ...state[payload.topic],
                isLoading: false,
                error: payload.error,
            },
        };
    },
    [ActionTypes.REMOVE_PHOTO]: (state: PhotoState, action: Action) => {
        const { payload } = action as RemovePhotoAction;
        return {
            ...state,
            [payload.topic]: {
                ...state[payload.topic],
                photos:
                    state[payload.topic]?.photos.filter(
                        (photo) => photo.id !== payload.photoId
                    ) ?? [],
                page: state[payload.topic]?.page ?? 0,
                isLoading: false,
            },
        };
    },
};

export const photosReducer = (
    state: PhotoState = initialState,
    action: Action
) =>
    reducerFunctions[action.type]
        ? reducerFunctions[action.type](state, action)
        : state;
