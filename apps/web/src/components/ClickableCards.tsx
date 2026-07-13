import React from 'react';
import { Card, Typography } from 'antd';
import { FileText, Image, FileEdit, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

interface ClickableCardProps {
  campId: string;
  type: 'overview' | 'poster' | 'form' | 'content';
  icon: React.ReactNode;
  title: string;
  description: string;
  stats?: string;
}

const ClickableCard: React.FC<ClickableCardProps> = ({
  campId,
  type,
  icon,
  title,
  description,
  stats,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/camps/${campId}/${type}`);
  };

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <Card
        style={{
          borderRadius: 20,
          background: 'rgba(255, 255, 255, 0.65)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
          transition: 'all 0.3s ease',
          height: '100%',
        }}
        bodyStyle={{
          padding: '20px 16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 140,
        }}
      >
        <div style={{ color: '#42c7b0', marginBottom: 12 }}>{icon}</div>
        <Title level={4} style={{ marginBottom: 8, color: '#374151', textAlign: 'center' }}>
          {title}
        </Title>
        <Text
          type="secondary"
          style={{ fontSize: 13, color: '#78828e', textAlign: 'center', marginBottom: 8 }}
        >
          {description}
        </Text>
        {stats && (
          <Text style={{ fontSize: 12, color: '#42c7b0', fontWeight: 500 }}>{stats}</Text>
        )}
        <div style={{ marginTop: 12 }}>
          <Text type="secondary" style={{ fontSize: 12 }}>
            点击查看详情 →
          </Text>
        </div>
      </Card>
    </motion.div>
  );
};

export const OverviewCard: React.FC<{ campId: string }> = ({ campId }) => (
  <ClickableCard
    campId={campId}
    type="overview"
    icon={<FileText size={32} />}
    title="概览"
    description="基本信息 · QR Code"
    stats="查看训练营详情"
  />
);

export const PosterCard: React.FC<{ campId: string }> = ({ campId }) => (
  <ClickableCard
    campId={campId}
    type="poster"
    icon={<Image size={32} />}
    title="海报"
    description="HTML 预览 · 下载"
    stats="查看精美海报"
  />
);

export const FormCard: React.FC<{ campId: string; fieldCount?: number }> = ({
  campId,
  fieldCount = 0,
}) => (
  <ClickableCard
    campId={campId}
    type="form"
    icon={<FileEdit size={32} />}
    title="表单"
    description="报名字段配置"
    stats={fieldCount > 0 ? `${fieldCount} 个字段` : '查看表单设计'}
  />
);

export const ContentCard: React.FC<{ campId: string; dayCount?: number }> = ({
  campId,
  dayCount = 0,
}) => (
  <ClickableCard
    campId={campId}
    type="content"
    icon={<MessageSquare size={32} />}
    title="文案"
    description="每日打卡内容"
    stats={dayCount > 0 ? `${dayCount} 天内容` : '查看文案模板'}
  />
);
