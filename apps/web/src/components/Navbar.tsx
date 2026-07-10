import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, Space } from 'antd';
import { Settings, List, Home } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        background: 'rgba(255, 250, 240, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '2px solid rgba(255, 107, 53, 0.2)',
        padding: '12px 24px',
        marginBottom: 0,
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: '#FF6B35',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span style={{ fontSize: 28 }}>🏕️</span>
            一键开营管家
          </motion.div>
        </Link>
        
        <Space size="middle">
          <Link to="/">
            <Button
              type={isActive('/') ? 'primary' : 'text'}
              icon={<Home size={18} />}
              className={isActive('/') ? 'gradient-btn' : ''}
              style={{
                color: isActive('/') ? 'white' : '#636E72',
                borderRadius: 20,
              }}
            >
              开营
            </Button>
          </Link>
          
          <Link to="/camps">
            <Button
              type={isActive('/camps') ? 'primary' : 'text'}
              icon={<List size={18} />}
              className={isActive('/camps') ? 'gradient-btn' : ''}
              style={{
                color: isActive('/camps') ? 'white' : '#636E72',
                borderRadius: 20,
              }}
            >
              活动列表
            </Button>
          </Link>
          
          <Link to="/settings">
            <Button
              type={isActive('/settings') ? 'primary' : 'text'}
              icon={<Settings size={18} />}
              className={isActive('/settings') ? 'gradient-btn' : ''}
              style={{
                color: isActive('/settings') ? 'white' : '#636E72',
                borderRadius: 20,
              }}
            >
              设置
            </Button>
          </Link>
        </Space>
      </div>
    </motion.nav>
  );
};

export default Navbar;
