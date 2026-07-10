import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import Navbar from './components/Navbar';
import SettingsPage from './pages/SettingsPage';
import CreatePage from './pages/CreatePage';
import CampListPage from './pages/CampListPage';
import CampDetailPage from './pages/CampDetailPage';
import './App.css';

const theme = {
  token: {
    colorPrimary: '#FF6B35',
    colorSuccess: '#2EC4B6',
    colorWarning: '#F7C59F',
    colorBgBase: '#FFFAF0',
    borderRadius: 12,
  },
};

function App() {
  return (
    <ConfigProvider theme={theme} locale={zhCN}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/" element={<CreatePage />} />
          <Route path="/camps" element={<CampListPage />} />
          <Route path="/camps/:id" element={<CampDetailPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;
