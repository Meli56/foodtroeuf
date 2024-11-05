import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ResaPage from './pages/ResaPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/resa" element={<ResaPage />} />
        
      </Routes>
    </Router>
  );
};

export default App;

