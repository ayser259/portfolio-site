import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import CanadianEconomy from './pages/CanadianEconomy';
import Kakeibo from './pages/Kakeibo';
import UWPlacementQuiz from './pages/UWPlacementQuiz';
import UWEngineeringClassifier from './pages/UWEngineeringClassifier';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/canadian_economy" element={<CanadianEconomy />} />
          <Route path="/kakeibo" element={<Kakeibo />} />
          <Route path="/uw_placement_quiz" element={<UWPlacementQuiz />} />
          <Route path="/uw_engineering_classifier" element={<UWEngineeringClassifier />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
