import { Button, Grid } from '@mui/material';
import { findImages } from 'apis/imageFinderApi';
import { Photo } from 'models/Photo';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPhotosAction, removePhotoAction } from 'store/photosReducer';
import { RootState } from 'store/store';

interface Props {
    topic: string;
    onBackStep: () => void;
    onSubmit: (photo: Photo) => void;
}

export const ImageReview = ({ onBackStep, topic, onSubmit }: Props) => {
    const [isFetching, setIsFetching] = useState(false);
    const [isError, setIsError] = useState(false);
    const firstAvailablePhoto = useSelector(
        (state: RootState) => state.photos[topic]?.photos?.[0]
    );
    const page = useSelector((state: RootState) => state.photos[topic]?.page);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!firstAvailablePhoto && !isFetching && !isError) {
            setIsFetching(true);
            findImages(
                (photos, isError) => {
                    dispatch(addPhotosAction(topic, photos));
                    setIsFetching(false);
                    setIsError(isError);
                },
                topic,
                page
            );
        }
    }, [dispatch, firstAvailablePhoto, isError, isFetching, page, topic]);

    return (
        <div>
            {isError && (
                <div>
                    <span>Failed to fetch images</span>
                    <Button
                        onClick={() => setIsError(false)}
                        variant="contained"
                        color="error"
                    >
                        Try Again
                    </Button>
                </div>
            )}
            {firstAvailablePhoto && (
                <img
                    src={firstAvailablePhoto.urls.regular}
                    alt={
                        firstAvailablePhoto.alt_description ??
                        `Photo about ${topic}`
                    }
                />
            )}
            <Grid item xs={4}>
                <Button
                    onClick={onBackStep}
                    variant="contained"
                    color="secondary"
                >
                    Back
                </Button>
                {firstAvailablePhoto && (
                    <>
                        <Button
                            onClick={() =>
                                dispatch(
                                    removePhotoAction(
                                        topic,
                                        firstAvailablePhoto.id
                                    )
                                )
                            }
                            variant="contained"
                            color="error"
                        >
                            Reject
                        </Button>
                        <Button
                            onClick={() => {
                                onSubmit(firstAvailablePhoto);
                                dispatch(
                                    removePhotoAction(
                                        topic,
                                        firstAvailablePhoto.id
                                    )
                                );
                            }}
                            variant="contained"
                            color="success"
                        >
                            Accept
                        </Button>
                    </>
                )}
            </Grid>
        </div>
    );
};