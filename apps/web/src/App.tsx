import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import Navbar from './components/Navbar';
import WelcomePage from './pages/WelcomePage';
import SettingsPage from './pages/SettingsPage';
import CreatePage from './pages/CreatePage';
import CampListPage from './pages/CampListPage';
import CampOverviewPage from './pages/CampOverviewPage';
import CampOverviewDetail from './pages/CampOverviewDetail';
import CampPosterDetail from './pages/CampPosterDetail';
import CampFormDetail from './pages/CampFormDetail';
import CampContentDetail from './pages/CampContentDetail';
import './App.css';

const theme = {
  token: {
    colorPrimary: '#42c7b0',
    colorSuccess: '#42c7b0',
    colorWarning: '#fcecb8',
    colorBgBase: '#ffffff',
    borderRadius: 20,
  },
};

const AppContent: React.FC = () => {
  const location = useLocation();
  const showNavbar = location.pathname !== '/';

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/camps" element={<CampListPage />} />
        <Route path="/camps/:id" element={<CampOverviewPage />} />
        <Route path="/camps/:id/overview" element={<CampOverviewDetail />} />
        <Route path="/camps/:id/poster" element={<CampPosterDetail />} />
        <Route path="/camps/:id/form" element={<CampFormDetail />} />
        <Route path="/camps/:id/content" element={<CampContentDetail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <ConfigProvider theme={theme} locale={zhCN}>
      <Router>
        <AppContent />
      </Router>
    </ConfigProvider>
  );
}

export default App;
