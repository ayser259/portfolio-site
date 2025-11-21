import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import CanadianEconomy from './pages/CanadianEconomy';
import Kakeibo from './pages/Kakeibo';
import UWPlacementQuiz from './pages/UWPlacementQuiz';
import UWEngineeringClassifier from './pages/UWEngineeringClassifier';
import Sighedkick from './pages/Sighedkick';
import ByteMe from './pages/ByteMe';
import EmptyMyInbox from './pages/EmptyMyInbox';
import PRDSystem from './pages/PRDSystem';
import CKFD from './pages/CKFD';
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
          <Route path="/sighedkick" element={<Sighedkick />} />
          <Route path="/byteme" element={<ByteMe />} />
          <Route path="/emptymyinbox" element={<EmptyMyInbox />} />
          <Route path="/prdsystem" element={<PRDSystem />} />
          <Route path="/ckfd" element={<CKFD />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
