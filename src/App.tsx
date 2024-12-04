import React from 'react';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import { HomePage } from 'pages/HomePage';
import { NewCardPage } from 'pages/NewCardPage/NewCardPage';
import { CardPage } from 'pages/CardPage';
import { CardsPage } from 'pages/CardsPage';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { theme } from 'theme';

function App() {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="App">
                    <main className="App-header">
                        <BrowserRouter>
                            <nav>
                                <ul>
                                    <li>
                                        <Link to="/">Home</Link>
                                    </li>
                                    <li>
                                        <Link to="/cards/new">New</Link>
                                    </li>
                                    <li>
                                        <Link to="/cards/3">Specific card</Link>
                                    </li>
                                    <li>
                                        <Link to="/cards">All cards</Link>
                                    </li>
                                </ul>
                            </nav>
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route
                                    path="/cards/new"
                                    element={<NewCardPage />}
                                />
                                <Route
                                    path="/cards/:id"
                                    element={<CardPage />}
                                />
                                <Route path="/cards" element={<CardsPage />} />
                            </Routes>
                        </BrowserRouter>
                    </main>
                </div>
            </ThemeProvider>
        </Provider>
    );
}

export default App;
