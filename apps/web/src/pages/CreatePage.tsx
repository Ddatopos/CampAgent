import React from 'react';
import { Card, Input, Button, message, Progress, Space, Typography, Alert } from 'antd';
import { Sparkles, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCampStore } from '../stores/campStore';
import { useConfigStore } from '../stores/configStore';
import { useUIStore } from '../stores/uiStore';
import { generateCamp } from '../api/camps';
import { FloatingCircles, GeometricPatterns } from '../components/DecorativeElements';

const { TextArea } = Input;
const { Title, Text } = Typography;

const examplePrompts = [
  '下周五办一场面向新手的华为云数据库实战营',
  '下周一开始为期7天的AI大模型入门训练营',
  '面向企业用户的云原生架构师认证训练营',
];

const CreatePage: React.FC = () => {
  const navigate = useNavigate();
  const { addCamp } = useCampStore();
  const { config } = useConfigStore();
  const {
    createPrompt,
    setCreatePrompt,
    clearCreatePrompt,
    createLoading,
    createProgress,
    setCreateLoading,
    setCreateProgress,
    tickCreateProgress,
    resetCreateProgress,
  } = useUIStore();

  const handleGenerate = async () => {
    if (createLoading) {
      return;
    }

    if (!config) {
      message.warning('请先配置 LLM');
      navigate('/settings');
      return;
    }

    if (!createPrompt.trim()) {
      message.warning('请输入开营需求');
      return;
    }

    setCreateLoading(true);
    setCreateProgress(0);

    const progressInterval = setInterval(() => {
      tickCreateProgress();
    }, 1000);

    try {
      const result = await generateCamp(createPrompt);
      if (result.success) {
        addCamp(result.data);
        setCreateProgress(100);
        clearCreatePrompt();
        message.success('开营物料生成成功！');
        setTimeout(() => {
          resetCreateProgress();
          navigate(`/camps/${result.data.id}`);
        }, 500);
      } else {
        message.error(result.error || '生成失败');
        resetCreateProgress();
      }
    } catch (error) {
      message.error('生成失败，请重试');
      resetCreateProgress();
    } finally {
      clearInterval(progressInterval);
    }
  };

  return (
    <div style={{ padding: '40px 20px', maxWidth: 900, margin: '0 auto', position: 'relative' }}>
      <FloatingCircles />
      <GeometricPatterns />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        {!config && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <Alert
              message="请先配置 LLM"
              description={
                <span>
                  使用一键开营功能前，需要先配置 LLM API。
                  <Button type="link" onClick={() => navigate('/settings')} style={{ padding: 0 }}>
                    立即配置
                  </Button>
                </span>
              }
              type="warning"
              showIcon
              style={{ marginBottom: 24, borderRadius: 20 }}
            />
          </motion.div>
        )}

        <motion.div
          whileHover={{ rotate: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card
            style={{
              marginBottom: 24,
              borderRadius: 24,
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(66, 199, 176, 0.1)',
              boxShadow: '0 12px 32px rgba(66, 199, 176, 0.15)',
            }}
          >
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <div style={{ textAlign: 'center' }}>
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  style={{ display: 'inline-block' }}
                >
                  <Title level={2} style={{ color: '#42c7b0', marginBottom: 8 }}>
                    <Sparkles size={32} style={{ marginRight: 8 }} />
                    一键开营
                  </Title>
                </motion.div>
                <Text type="secondary">输入一句话需求，自动生成开营物料</Text>
              </div>

              <TextArea
                value={createPrompt}
                onChange={(e) => setCreatePrompt(e.target.value)}
                placeholder="例如：下周五办一场面向新手的华为云数据库实战营"
                autoSize={{ minRows: 3, maxRows: 6 }}
                style={{
                  fontSize: 16,
                  borderRadius: 24,
                  border: '2px solid #42c7b0',
                  padding: 20,
                  background: 'rgba(66, 199, 176, 0.05)',
                }}
              />

              {createLoading && (
                <Progress
                  percent={createProgress}
                  strokeColor={{
                    '0%': '#42c7b0',
                    '100%': '#95e1d3',
                  }}
                  style={{ marginTop: 16 }}
                />
              )}

              <Button
                type="primary"
                size="large"
                onClick={handleGenerate}
                loading={createLoading}
                className="gradient-btn"
                icon={<Sparkles size={20} />}
                block
                style={{ height: 60, fontSize: 18, borderRadius: 30 }}
              >
                一键开营
              </Button>
            </Space>
          </Card>
        </motion.div>

        <Card
          style={{
            borderRadius: 24,
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(10px)',
            border: '2px solid rgba(66, 199, 176, 0.1)',
            boxShadow: '0 8px 24px rgba(66, 199, 176, 0.1)',
          }}
        >
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Space>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #42c7b0, #95e1d3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Lightbulb size={18} color="white" />
              </div>
              <Text strong style={{ fontSize: 16 }}>示例需求</Text>
            </Space>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              {examplePrompts.map((example, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    type="dashed"
                    onClick={() => setCreatePrompt(example)}
                    style={{
                      borderRadius: 20,
                      border: '2px dashed #42c7b0',
                      background: 'rgba(66, 199, 176, 0.05)',
                      padding: '8px 20px',
                      height: 'auto',
                    }}
                  >
                    {example}
                  </Button>
                </motion.div>
              ))}
            </div>
          </Space>
        </Card>
      </motion.div>
    </div>
  );
};

export default CreatePage;
