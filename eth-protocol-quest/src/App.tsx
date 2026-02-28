import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { LevelPage } from './pages/LevelPage';
import { MapPage } from './pages/MapPage';
import { ProgressPage } from './pages/ProgressPage';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/map" element={<MapPage />} />
      <Route path="/level/:id" element={<LevelPage />} />
      <Route path="/progress" element={<ProgressPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
