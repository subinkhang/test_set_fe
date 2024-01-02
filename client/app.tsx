import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import History from './pages/HistoryPage/History';
import Calculator from './pages/CalculatorPage/Calculator';
import Hello from './pages/HomePage/Home';

export const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </>
  );
};