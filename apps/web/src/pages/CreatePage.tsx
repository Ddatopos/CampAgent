import React, { useState } from 'react';
import { Card, Input, Button, message, Progress, Space, Typography, Alert } from 'antd';
import { Sparkles, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCampStore } from '../stores/campStore';
import { useConfigStore } from '../stores/configStore';
import { generateCamp } from '../api/camps';

const { TextArea } = Input;
const { Title, Text } = Typography;

const examplePrompts = [
  '下周五办一场面向新手的华为云数据库实战营',
  '下周一开始为期7天的AI大模型入门训练营',
  '面向企业用户的云原生架构师认证训练营',
];

const CreatePage: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const { addCamp } = useCampStore();
  const { config } = useConfigStore();

  const handleGenerate = async () => {
    if (!config) {
      message.warning('请先配置 LLM');
      navigate('/settings');
      return;
    }

    if (!prompt.trim()) {
      message.warning('请输入开营需求');
      return;
    }

    setLoading(true);
    setProgress(0);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev;
        return prev + 10;
      });
    }, 1000);

    try {
      const result = await generateCamp(prompt);
      if (result.success) {
        addCamp(result.data);
        setProgress(100);
        message.success('开营物料生成成功！');
        setTimeout(() => {
          navigate(`/camps/${result.data.id}`);
        }, 500);
      } else {
        message.error(result.error || '生成失败');
      }
    } catch (error) {
      message.error('生成失败，请重试');
    } finally {
      clearInterval(progressInterval);
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '40px 20px', maxWidth: 900, margin: '0 auto' }}>
      <div className="blob-bg blob-1" />
      <div className="blob-bg blob-2" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {!config && (
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
            style={{ marginBottom: 24, borderRadius: 12 }}
          />
        )}

        <Card className="irregular-card glass-effect" style={{ marginBottom: 24 }}>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <div style={{ textAlign: 'center' }}>
              <Title level={2} style={{ color: '#FF6B35', marginBottom: 8 }}>
                <Sparkles size={32} style={{ marginRight: 8 }} />
                一键开营
              </Title>
              <Text type="secondary">输入一句话需求，自动生成开营物料</Text>
            </div>

            <TextArea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="例如：下周五办一场面向新手的华为云数据库实战营"
              autoSize={{ minRows: 3, maxRows: 6 }}
              style={{
                fontSize: 16,
                borderRadius: 20,
                border: '2px solid #FF6B35',
                padding: 16,
              }}
            />

            {loading && (
              <Progress
                percent={progress}
                strokeColor={{
                  '0%': '#FF6B35',
                  '100%': '#F7C59F',
                }}
                style={{ marginTop: 16 }}
              />
            )}

            <Button
              type="primary"
              size="large"
              onClick={handleGenerate}
              loading={loading}
              className="gradient-btn"
              icon={<Sparkles size={20} />}
              block
              style={{ height: 56, fontSize: 18 }}
            >
              一键开营
            </Button>
          </Space>
        </Card>

        <Card className="irregular-card glass-effect">
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Space>
              <Lightbulb size={20} style={{ color: '#FF6B35' }} />
              <Text strong>示例需求</Text>
            </Space>
            {examplePrompts.map((example, index) => (
              <Button
                key={index}
                type="dashed"
                block
                onClick={() => setPrompt(example)}
                style={{
                  textAlign: 'left',
                  height: 'auto',
                  padding: '12px 16px',
                  borderRadius: 12,
                }}
              >
                {example}
              </Button>
            ))}
          </Space>
        </Card>
      </motion.div>
    </div>
  );
};

export default CreatePage;
