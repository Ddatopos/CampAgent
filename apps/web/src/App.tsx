import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import Navbar from './components/Navbar';
import WelcomePage from './pages/WelcomePage';
import SettingsPage from './pages/SettingsPage';
import CreatePage from './pages/CreatePage';
import CampListPage from './pages/CampListPage';
import CampDetailPage from './pages/CampDetailPage';
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
        <Route path="/camps/:id" element={<CampDetailPage />} />
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
