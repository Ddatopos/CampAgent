import React from 'react';
import { Card, Row, Col, Button, Empty, Space, Typography, Tag } from 'antd';
import { PlusOutlined, CalendarOutlined, TeamOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCampStore } from '../stores/campStore';

const { Title, Text } = Typography;

const CampListPage: React.FC = () => {
  const navigate = useNavigate();
  const { camps } = useCampStore();

  return (
    <div style={{ padding: '40px 20px', maxWidth: 1200, margin: '0 auto' }}>
      <div className="blob-bg blob-1" />
      <div className="blob-bg blob-2" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Title level={2} style={{ color: '#FF6B35', margin: 0 }}>
              活动列表
            </Title>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              className="gradient-btn"
              onClick={() => navigate('/')}
            >
              新建活动
            </Button>
          </div>

          {camps.length === 0 ? (
            <Card className="irregular-card glass-effect">
              <Empty
                description="暂无活动，快去创建一个吧！"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              >
                <Button type="primary" onClick={() => navigate('/')}>
                  立即创建
                </Button>
              </Empty>
            </Card>
          ) : (
            <Row gutter={[24, 24]}>
              {camps.map((camp, index) => (
                <Col xs={24} sm={12} lg={8} key={camp.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card
                      className="irregular-card"
                      hoverable
                      onClick={() => navigate(`/camps/${camp.id}`)}
                    >
                      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                        <Title level={4} style={{ margin: 0 }}>
                          {camp.plan.campName}
                        </Title>

                        <Space wrap>
                          <Tag color="#FF6B35">{camp.plan.theme}</Tag>
                          <Tag color="#2EC4B6">{camp.plan.targetAudience}</Tag>
                        </Space>

                        <Space split="|">
                          <Text type="secondary">
                            <CalendarOutlined /> {camp.plan.startDate}
                          </Text>
                          <Text type="secondary">
                            <TeamOutlined /> {camp.plan.durationDays} 天
                          </Text>
                        </Space>

                        <Tag color={camp.status === 'ready' ? 'success' : 'warning'}>
                          {camp.status === 'ready' ? '已就绪' : '草稿'}
                        </Tag>
                      </Space>
                    </Card>
                  </motion.div>
                </Col>
              ))}
            </Row>
          )}
        </Space>
      </motion.div>
    </div>
  );
};

export default CampListPage;
