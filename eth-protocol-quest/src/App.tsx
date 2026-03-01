import { Link, Navigate, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { HomePage } from './pages/HomePage';
import { LevelPage } from './pages/LevelPage';
import { MapPage } from './pages/MapPage';
import { ProgressPage } from './pages/ProgressPage';
import { GlossaryPage } from './pages/GlossaryPage';
import { CurriculumPage } from './pages/CurriculumPage';

export function App() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('epq_theme') === 'dark');

  useEffect(() => {
    document.body.dataset.theme = darkMode ? 'dark' : 'light';
    localStorage.setItem('epq_theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <>
      <header className="topbar">
        <div className="topbar-inner">
          <Link to="/" className="brand">🌿 Ethereum Infinite Garden Quest</Link>
          <nav>
            <Link to="/map">地图</Link>
            <Link to="/progress">总览</Link>
            <Link to="/curriculum">课程</Link>
            <Link to="/glossary">术语</Link>
            <button className="btn btn-ghost" onClick={() => setDarkMode((v) => !v)}>{darkMode ? '浅色' : '暗色'}</button>
          </nav>
        </div>
      </header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/level/:id" element={<LevelPage />} />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="/curriculum" element={<CurriculumPage />} />
        <Route path="/glossary" element={<GlossaryPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
