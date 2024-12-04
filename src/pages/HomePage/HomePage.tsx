import { Box, Button, Grid, Typography } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mockedData } from 'store/mockedData';
import { RootState } from 'store/store';
import { createCard } from 'store/topicCards';

const projectDescription =
    'Image Finder is a React app where users enter their name, surname, and a topic to fetch an image from Unsplash. If the user rejects the image, a new one is fetched; if accepted, a summary card with their details and the image thumbnail is displayed. The app prioritizes simplicity, clean design, and efficient state management.';

export const HomePage = () => {
    const topicCards = useSelector((state: RootState) => state.topicCards);
    const dispatch = useDispatch();
    return (
        <div>
            <Grid
                container
                direction="column"
                spacing={4}
                justifyContent="center"
            >
                {/* Title */}
                <Grid item>
                    <Typography variant="h2" align="center">
                        Image Finder
                    </Typography>
                </Grid>

                <Grid item container direction="row" justifyContent="center">
                    <Grid item xs={12} sm={8} md={6} lg={6}>
                        <Typography
                            variant="body1"
                            align="center"
                            component="p"
                        >
                            {projectDescription}
                        </Typography>
                    </Grid>
                </Grid>

                {/* Content Area */}
                <Grid item>
                    <Grid container spacing={8}>
                        {/* Box 1 */}
                        <Grid item xs={12} sm={4}>
                            <Box
                                sx={{
                                    backgroundColor: 'primary.main',
                                    color: 'white',
                                    padding: '16px',
                                    borderRadius: '8px',
                                    textAlign: 'center',
                                }}
                            >
                                Box 1
                            </Box>
                        </Grid>

                        {/* Box 2 */}
                        <Grid item xs={12} sm={4}>
                            <Box
                                sx={{
                                    backgroundColor: 'secondary.main',
                                    color: 'white',
                                    padding: '16px',
                                    borderRadius: '8px',
                                    textAlign: 'center',
                                }}
                            >
                                Box 2
                            </Box>
                        </Grid>

                        {/* Box 3 */}
                        <Grid item xs={12} sm={4}>
                            <Box
                                sx={{
                                    backgroundColor: 'success.main',
                                    color: 'white',
                                    padding: '16px',
                                    borderRadius: '8px',
                                    textAlign: 'center',
                                }}
                            >
                                Box 3
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {topicCards.allIds.length === 0 && (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>
                        mockedData.forEach((topicCard) =>
                            dispatch(createCard(topicCard))
                        )
                    }
                >
                    Add some cards
                </Button>
            )}
        </div>
    );
};
