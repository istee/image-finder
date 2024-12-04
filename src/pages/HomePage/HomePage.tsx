import { Container, Grid, Typography } from '@mui/material';
import React from 'react';
import { HomePageContentBox } from './HomePageContentBox';
import { CurrentCardsRenderProps } from './CurrentCardsRenderProps';
import { NewCardRenderProps } from './NewCardRenderProps';
import { GenerateTopicsRenderProps } from './GenerateTopicsRenderProps';

const projectDescription =
    'Image Finder is a React application that leverages Material UI for a clean and modern design and Redux for efficient state management. Users can input their name, surname, and a topic to fetch an image from Unsplash. If the user rejects the image, a new one is retrieved; if accepted, a summary card displaying their details and the image thumbnail is created. The app emphasizes simplicity, intuitive design, and seamless functionality.';

const HomePage = () => {
    return (
        <Container maxWidth="lg" sx={{ paddingY: 4 }}>
            <Grid
                item
                container
                direction="column"
                spacing={4}
                justifyContent="center"
                alignItems="center"
            >
                <Grid item container direction="row" justifyContent="center">
                    <Grid item xs={12} sm={8} md={6} lg={6}>
                        <Typography
                            variant="body1"
                            align="center"
                            component="p"
                            sx={{ marginBottom: 3 }}
                        >
                            {projectDescription}
                        </Typography>
                    </Grid>
                </Grid>

                <Grid item container spacing={4} justifyContent="center">
                    <CurrentCardsRenderProps
                        render={(renderProps) => (
                            <HomePageContentBox {...renderProps} />
                        )}
                    />
                    <NewCardRenderProps
                        render={(renderProps) => (
                            <HomePageContentBox {...renderProps} />
                        )}
                    />
                    <GenerateTopicsRenderProps
                        render={(renderProps) => (
                            <HomePageContentBox {...renderProps} />
                        )}
                    />
                </Grid>
            </Grid>
        </Container>
    );
};

export default HomePage;
