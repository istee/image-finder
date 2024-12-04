import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline, CircularProgress, Box } from '@mui/material';
import { theme } from 'theme';
import { Header } from 'Header';

// Lazy-loaded pages
const HomePage = lazy(() => import('pages/HomePage/HomePage'));
const NewCardPage = lazy(() => import('pages/NewCardPage/NewCardPage'));
const CardPage = lazy(() => import('pages/CardPage'));
const CardsPage = lazy(() => import('pages/CardsPage'));

function App() {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <BrowserRouter>
                    <Header />
                    <Suspense
                        fallback={
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '100vh',
                                }}
                            >
                                <CircularProgress />
                            </Box>
                        }
                    >
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route
                                path="/cards/new"
                                element={<NewCardPage />}
                            />
                            <Route path="/cards/:id" element={<CardPage />} />
                            <Route path="/cards" element={<CardsPage />} />
                        </Routes>
                    </Suspense>
                </BrowserRouter>
            </ThemeProvider>
        </Provider>
    );
}

export default App;
