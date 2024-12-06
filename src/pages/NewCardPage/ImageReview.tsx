import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import { Photo } from 'models/Photo';
import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { fetchPhotos, removePhotoAction } from 'store/photosReducer';
import { photoStateByTopicSelector } from 'store/selectors/firstAvailablePhotoSelector';
import { useParametricSelector } from 'store/selectors/useParametricSelector';
import { RootState } from 'store/store';
import { PhotoCredit } from './PhotoCredit';

interface Props {
    topic: string;
    onBackStep: () => void;
    onSubmit: (photo: Photo) => void;
}

export const ImageReview = ({ onBackStep, topic, onSubmit }: Props) => {
    const { photo, isLoading, error, page } = useParametricSelector(
        photoStateByTopicSelector,
        topic
    );
    const dispatch = useDispatch<ThunkDispatch<RootState, unknown, Action>>();

    const loadPhotos = useCallback(() => {
        dispatch(fetchPhotos(topic, page + 1));
    }, [dispatch, page, topic]);

    useEffect(() => {
        if (!photo && !isLoading && !error) {
            loadPhotos();
        }
    }, [dispatch, error, isLoading, loadPhotos, page, photo, topic]);

    return (
        <Box gap={4} padding={2}>
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                height="50vh"
                overflow={'hidden'}
                gap={2}
            >
                {error && (
                    <>
                        <Typography variant="body1">{error}</Typography>
                        <Button
                            onClick={loadPhotos}
                            variant="contained"
                            color="error"
                            sx={{ ml: 2 }}
                        >
                            Try Again
                        </Button>
                    </>
                )}
                {photo && (
                    <>
                        <img
                            src={photo.urls.regular}
                            alt={
                                photo.alt_description ?? `Photo about ${topic}`
                            }
                            style={{
                                width: 'auto',
                                maxHeight: 'calc(100% - 6em)',
                                objectFit: 'cover',
                            }}
                        />
                        <PhotoCredit photo={photo} />
                    </>
                )}
                {isLoading && <CircularProgress />}
            </Box>

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

                {photo && (
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
                                    dispatch(removePhotoAction(topic, photo.id))
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
                                    onSubmit(photo);
                                    dispatch(
                                        removePhotoAction(topic, photo.id)
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
        </Box>
    );
};
