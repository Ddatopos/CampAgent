import React, { useState, useEffect } from 'react';
import { Card, Button, Space, Typography } from 'antd';
import { Sparkles, Palette, Rocket, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FloatingCircles, GeometricPatterns, DotPattern } from '../components/DecorativeElements';

const { Title, Text } = Typography;

const welcomeMessages = [
  '今天，你想开启一段怎样的训练营旅程？',
  '让创意落地，从一键开始',
  '每一次开营，都是一次新的冒险',
  '准备好打造你的专属训练营了吗？',
  '今天的目标：让运营更轻松',
];

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * welcomeMessages.length);
    setMessage(welcomeMessages[randomIndex]);
  }, []);

  const options = [
    {
      icon: <Sparkles size={32} />,
      title: '规划训练营',
      desc: '一键生成开营物料',
      color: '#42c7b0',
      path: '/create',
    },
    {
      icon: <Palette size={32} />,
      title: '创建海报',
      desc: '设计精美活动海报',
      color: '#42c7b0',
      path: '/create',
    },
    {
      icon: <Rocket size={32} />,
      title: '探索活动',
      desc: '查看已创建的活动',
      color: '#42c7b0',
      path: '/camps',
    },
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <FloatingCircles />
      <GeometricPatterns />
      <DotPattern />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ maxWidth: 900, width: '100%', position: 'relative', zIndex: 1 }}
      >
        <div style={{ textAlign: 'center', marginBottom: 50 }}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            style={{
              width: 100,
              height: 100,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 60,
              marginBottom: 20,
            }}
          >
            🏕️
          </motion.div>
          <Title level={1} style={{ color: '#42c7b0', marginBottom: 16, fontSize: 48 }}>
            一键开营管家
          </Title>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Text
              style={{
                fontSize: 22,
                color: '#78828e',
                display: 'block',
                marginBottom: 8,
                fontStyle: 'italic',
              }}
            >
              "{message}"
            </Text>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: 20,
              }}
            >
              {options.map((option, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card
                    hoverable
                    onClick={() => navigate(option.path)}
                    style={{
                      borderRadius: 24,
                      background: 'rgba(255, 255, 255, 0.65)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                    }}
                    bodyStyle={{
                      padding: '30px 25px',
                      textAlign: 'center',
                    }}
                  >
                    <div style={{ color: option.color, marginBottom: 15 }}>{option.icon}</div>
                    <Title level={4} style={{ marginBottom: 8, color: '#374151' }}>
                      {option.title}
                    </Title>
                    <Text type="secondary" style={{ fontSize: 14, color: '#78828e' }}>
                      {option.desc}
                    </Text>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              style={{ textAlign: 'center', marginTop: 30 }}
            >
              <Button
                type="primary"
                size="large"
                onClick={() => navigate('/create')}
                className="gradient-btn"
                icon={<ArrowRight size={20} />}
                style={{
                  height: 60,
                  fontSize: 18,
                  borderRadius: 30,
                  padding: '0 40px',
                }}
              >
                立即开始
              </Button>
            </motion.div>
          </Space>
        </motion.div>
      </motion.div>

      <svg
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: 100,
          opacity: 0.15,
          pointerEvents: 'none',
        }}
        viewBox="0 0 1200 100"
        preserveAspectRatio="none"
      >
        <path
          d="M0,50 Q300,100 600,50 T1200,50 L1200,100 L0,100 Z"
          fill="#42c7b0"
        />
      </svg>
    </div>
  );
};

export default WelcomePage;
