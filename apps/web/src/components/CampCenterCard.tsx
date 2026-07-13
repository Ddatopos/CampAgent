import React from 'react';
import { Tag, Typography } from 'antd';
import { motion } from 'framer-motion';

const { Title, Text } = Typography;

interface CampPlan {
  campName: string;
  targetAudience: string;
  startDate: string;
  durationDays: number;
  theme: string;
  highlights: string[];
}

interface CampCenterCardProps {
  campId: string;
  campName: string;
  plan: CampPlan;
  status: 'draft' | 'ready';
  createdAt: string;
  updatedAt: string;
  onDelete?: () => void;
}

export const CampCenterCard: React.FC<CampCenterCardProps> = ({
  campId,
  campName,
  plan,
  status,
  createdAt,
  updatedAt,
  onDelete,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, type: 'spring', stiffness: 200 }}
      style={{
        width: 280,
        height: 280,
        borderRadius: '48% 52% 49% 51% / 52% 48% 52% 48%',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(178, 233, 216, 0.3))',
        backdropFilter: 'blur(10px)',
        border: '2px solid rgba(66, 199, 176, 0.2)',
        boxShadow: '0 12px 40px rgba(66, 199, 176, 0.2), inset 0 0 20px rgba(255, 255, 255, 0.5)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        position: 'relative',
      }}
    >
      <div
        style={{
          width: 70,
          height: 70,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #42c7b0, #95e1d3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 36,
          marginBottom: 12,
          boxShadow: '0 6px 20px rgba(66, 199, 176, 0.4)',
        }}
      >
        🏕️
      </div>
      
      <Title level={4} style={{ color: '#42c7b0', marginBottom: 6, textAlign: 'center', fontSize: 18 }}>
        {campName}
      </Title>
      
      <Tag
        color="#42c7b0"
        style={{
          fontSize: 11,
          padding: '2px 8px',
          borderRadius: 10,
          marginBottom: 8,
        }}
      >
        {plan.theme}
      </Tag>

      <div style={{ textAlign: 'center', marginBottom: 8 }}>
        <div style={{ fontSize: 12, color: '#78828e', marginBottom: 2 }}>
          {plan.startDate} 起 · {plan.durationDays} 天
        </div>
        <div style={{ fontSize: 11, color: '#42c7b0', fontWeight: 500 }}>
          {plan.targetAudience}
        </div>
      </div>

      <Tag
        color={status === 'ready' ? 'success' : 'warning'}
        style={{ fontSize: 10, marginTop: 4 }}
      >
        {status === 'ready' ? '已就绪' : '草稿'}
      </Tag>
    </motion.div>
  );
};
