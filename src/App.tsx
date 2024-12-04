import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import { HomePage } from 'pages/HomePage/HomePage';
import { NewCardPage } from 'pages/NewCardPage/NewCardPage';
import { CardPage } from 'pages/CardPage';
import { CardsPage } from 'pages/CardsPage';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { theme } from 'theme';
import { Header } from 'Header';

function App() {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <BrowserRouter>
                    <Header />

                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/cards/new" element={<NewCardPage />} />
                        <Route path="/cards/:id" element={<CardPage />} />
                        <Route path="/cards" element={<CardsPage />} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </Provider>
    );
}

export default App;
