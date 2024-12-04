import { AppBar, Toolbar, Container, Typography } from '@mui/material';
import { HeaderLink } from 'HeaderLink';
import React from 'react';

export const Header = () => {
    return (
        <AppBar position="sticky" sx={{ mb: 4 }}>
            <Toolbar>
                <Container
                    maxWidth="lg"
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <HeaderLink
                        to="/"
                        text={
                            <Typography variant="h6" component="div">
                                Image Finder
                            </Typography>
                        }
                    />
                    <nav>
                        <ul
                            style={{
                                display: 'flex',
                                gap: '1rem',
                                listStyle: 'none',
                                padding: 0,
                                margin: 0,
                            }}
                        >
                            <HeaderLink to="/cards/new" text="New" />
                            <HeaderLink to="/cards" text="All cards" />
                        </ul>
                    </nav>
                </Container>
            </Toolbar>
        </AppBar>
    );
};
