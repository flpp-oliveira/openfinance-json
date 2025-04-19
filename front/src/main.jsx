import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import ResultPage from './pages/ResultPage.jsx';
import HomePage from './pages/HomePage.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/generate" element={<App />} />
        <Route path="/resultado" element={<ResultPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
