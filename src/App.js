import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HacHacdSwap from './components/HacHacdSwap';
import LanguageSelector from './components/LanguageSelector';
import InstructionsPage from './components/InstructionsPage';
import { useTranslation } from 'react-i18next';
import './App.css';

function App() {
  const { t } = useTranslation();

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Link to="/" className="home-link">
            <h1>Hacash Swap Contract</h1>
          </Link>
          <div className="header-right">
            <Link to="/instructions" className="instructions-link">{t('instructionsLink')}</Link>
            <LanguageSelector />
          </div>
        </header>
        <main className="App-main">
          <Routes>
            <Route path="/" element={<HacHacdSwap />} />
            <Route path="/instructions" element={<InstructionsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
