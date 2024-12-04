import { Photo } from 'models/Photo';
import { Topic } from 'models/Topic';

export const enum ActionTypes {
    ADD_PHOTOS = 'ADD_PHOTOS',
    REMOVE_PHOTO = 'REMOVE_PHOTO',
}

interface AddPhotosAction {
    type: ActionTypes.ADD_PHOTOS;
    payload: { topic: Topic; photos: Photo[] };
}

interface RemovePhotoAction {
    type: ActionTypes.REMOVE_PHOTO;
    payload: { topic: Topic; photoId: string };
}

type Action = AddPhotosAction | RemovePhotoAction;

export const addPhotosAction = (topic: Topic, photos: Photo[]) => ({
    type: ActionTypes.ADD_PHOTOS,
    payload: { topic, photos },
});

export const removePhotoAction = (topic: Topic, photoId: string) => ({
    type: ActionTypes.REMOVE_PHOTO,
    payload: { topic, photoId },
});

type PhotoState = {
    [key in string]?: { photos: Photo[]; page: number };
};

const initialState: PhotoState = {};

const reducerFunctions: {
    [key in ActionTypes]: (state: PhotoState, action: Action) => PhotoState;
} = {
    [ActionTypes.ADD_PHOTOS]: (state: PhotoState, action: Action) => {
        const { payload } = action as AddPhotosAction;
        return {
            ...state,
            [payload.topic]: {
                ...state[payload.topic],
                photos: [
                    ...(state[payload.topic]?.photos ?? []),
                    ...payload.photos,
                ],
                page: (state[payload.topic]?.page ?? 0) + 1,
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
