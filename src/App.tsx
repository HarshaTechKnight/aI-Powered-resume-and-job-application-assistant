import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ResumeScoringPage from './pages/ResumeScoringPage';
import JobMatchingPage from './pages/JobMatchingPage';
import CoverLetterPage from './pages/CoverLetterPage';
import InterviewPrepPage from './pages/InterviewPrepPage';
import PricingPage from './pages/PricingPage';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/resume-scoring" element={<ResumeScoringPage />} />
            <Route path="/job-matching" element={<JobMatchingPage />} />
            <Route path="/cover-letter" element={<CoverLetterPage />} />
            <Route path="/interview-prep" element={<InterviewPrepPage />} />
            <Route path="/pricing" element={<PricingPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;