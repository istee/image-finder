import React from 'react';
import './App.css';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'store/store';

function App() {
  return (
    <Provider store={store}>
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
            <Route path="/" element={<div>Home</div>} />
            <Route path="/cards/new" element={<div>New</div>} />
            <Route path="/cards/:id" element={<div>Card with id</div>} />
            <Route path="/cards" element={<div>All cards</div>} />
          </Routes>
        </BrowserRouter>
      </main>
    </div>
    </Provider>
  );
}

export default App;
