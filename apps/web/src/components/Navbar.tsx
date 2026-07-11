import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, Space } from 'antd';
import { Settings, List, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import { CampLogo } from './CampLogo';

const Navbar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          background: 'rgba(255, 255, 255, 0.75)',
          backdropFilter: 'blur(10px)',
          padding: '12px 24px 16px',
          marginBottom: 0,
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <CampLogo size={44} />
              <span style={{ fontSize: 24, fontWeight: 'bold', color: '#42c7b0' }}>
                一键开营管家
              </span>
            </motion.div>
          </Link>
          
          <Space size="middle">
            <Link to="/create">
              <Button
                type={isActive('/create') ? 'primary' : 'text'}
                icon={<Home size={18} />}
                className={isActive('/create') ? 'gradient-btn' : ''}
                style={{
                  color: isActive('/create') ? 'white' : '#78828e',
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
                  color: isActive('/camps') ? 'white' : '#78828e',
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
                  color: isActive('/settings') ? 'white' : '#78828e',
                  borderRadius: 20,
                }}
              >
                设置
              </Button>
            </Link>
          </Space>
        </div>
      </motion.nav>
      
      <svg
        viewBox="0 0 1200 40"
        preserveAspectRatio="none"
        style={{
          width: '100%',
          height: 20,
          display: 'block',
          marginTop: -1,
        }}
      >
        <path
          d="M0,20 Q300,0 600,20 T1200,20 L1200,40 L0,40 Z"
          fill="rgba(255, 255, 255, 0.75)"
        />
        <path
          d="M0,20 Q300,0 600,20 T1200,20"
          fill="none"
          stroke="rgba(66, 199, 176, 0.2)"
          strokeWidth="2"
        />
      </svg>
    </>
  );
};

export default Navbar;
