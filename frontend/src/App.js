import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import ResaPage from './pages/ResaPage';
import OrderPage from './pages/OrderPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/resa" element={<ResaPage />} />
        <Route path="/order" element={<OrderPage />} />
      </Routes>
    </Router>
  );
};

export default App;

