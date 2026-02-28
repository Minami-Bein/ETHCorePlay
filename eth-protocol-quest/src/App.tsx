import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { LevelPage } from './pages/LevelPage';
import { MapPage } from './pages/MapPage';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/map" element={<MapPage />} />
      <Route path="/level/:id" element={<LevelPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
