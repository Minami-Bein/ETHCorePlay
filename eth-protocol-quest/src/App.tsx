import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Map, BookOpen, BookMarked, BarChart3, Leaf } from 'lucide-react';
import { HomePage } from './pages/HomePage';
import { LevelPage } from './pages/LevelPage';
import { MapPage } from './pages/MapPage';
import { ProgressPage } from './pages/ProgressPage';
import { GlossaryPage } from './pages/GlossaryPage';
import { CurriculumPage } from './pages/CurriculumPage';

export function App() {
  const location = useLocation();

  return (
    <>
      <header className="topbar">
        <div className="topbar-inner">
          <Link to="/" className="brand">
            <Leaf size={24} color="#4a8f61" />
            ETHCorePlay
          </Link>
          <nav>
            <Link to="/map" className={location.pathname === '/map' ? 'active' : ''}>
              <Map size={18} /> 地图
            </Link>
            <Link to="/progress" className={location.pathname === '/progress' ? 'active' : ''}>
              <BarChart3 size={18} /> 总览
            </Link>
            <Link to="/curriculum" className={location.pathname === '/curriculum' ? 'active' : ''}>
              <BookOpen size={18} /> 课程
            </Link>
            <Link to="/glossary" className={location.pathname === '/glossary' ? 'active' : ''}>
              <BookMarked size={18} /> 术语
            </Link>
          </nav>
        </div>
      </header>
      
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
              <HomePage />
            </motion.div>
          } />
          <Route path="/map" element={
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
              <MapPage />
            </motion.div>
          } />
          <Route path="/level/:id" element={
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
              <LevelPage />
            </motion.div>
          } />
          <Route path="/progress" element={
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
              <ProgressPage />
            </motion.div>
          } />
          <Route path="/curriculum" element={
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
              <CurriculumPage />
            </motion.div>
          } />
          <Route path="/glossary" element={
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
              <GlossaryPage />
            </motion.div>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}
