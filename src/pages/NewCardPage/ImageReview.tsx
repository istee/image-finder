import { Box, Button, Grid } from '@mui/material';
import { findImages } from 'apis/imageFinderApi';
import { Photo } from 'models/Photo';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPhotosAction, removePhotoAction } from 'store/photosReducer';
import { firstAvailablePhotoSelector } from 'store/selectors/firstAvailablePhotoSelector';
import { photoPageSelector } from 'store/selectors/photoPageSelector';
import { useParametricSelector } from 'store/selectors/useParametricSelector';

interface Props {
    topic: string;
    onBackStep: () => void;
    onSubmit: (photo: Photo) => void;
}

export const ImageReview = ({ onBackStep, topic, onSubmit }: Props) => {
    const [isFetching, setIsFetching] = useState(false);
    const [isError, setIsError] = useState(false);
    const firstAvailablePhoto = useParametricSelector(
        firstAvailablePhotoSelector,
        topic
    );
    const page = useParametricSelector(photoPageSelector, topic);
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
                <Box mb={2}>
                    <span>Failed to fetch images</span>
                    <Button
                        onClick={() => setIsError(false)}
                        variant="contained"
                        color="error"
                        sx={{ ml: 2 }}
                    >
                        Try Again
                    </Button>
                </Box>
            )}

            {firstAvailablePhoto && (
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    mb={4}
                >
                    <img
                        src={firstAvailablePhoto.urls.regular}
                        alt={
                            firstAvailablePhoto.alt_description ??
                            `Photo about ${topic}`
                        }
                        style={{
                            maxWidth: '100%',
                            height: 'auto',
                            maxHeight: '50vh',
                            objectFit: 'contain',
                        }}
                    />
                </Box>
            )}

            <Grid container spacing={2} alignItems="space-between">
                <Grid item xs={12} sm={1}>
                    <Button
                        onClick={onBackStep}
                        variant="contained"
                        color="secondary"
                        fullWidth
                    >
                        Back
                    </Button>
                </Grid>

                {firstAvailablePhoto && (
                    <Grid
                        item
                        xs={12}
                        sm={11}
                        container
                        justifyContent="flex-end"
                        spacing={2}
                    >
                        <Grid item>
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
                        </Grid>
                        <Grid item>
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
                        </Grid>
                    </Grid>
                )}
            </Grid>
        </div>
    );
};
