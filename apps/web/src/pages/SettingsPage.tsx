import React, { useState } from 'react';
import { Card, Form, Input, Button, message, Space } from 'antd';
import { Settings, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useConfigStore } from '../stores/configStore';
import { testConnection } from '../api/config';

const SettingsPage: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { setConfig } = useConfigStore();

  const handleTest = async (values: any) => {
    setLoading(true);
    try {
      const result = await testConnection(values);
      if (result.success) {
        message.success('连接测试成功！');
        setConfig(values);
      } else {
        message.error(result.error || '连接测试失败');
      }
    } catch (error) {
      message.error('连接测试失败，请检查配置');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '40px 20px', maxWidth: 800, margin: '0 auto' }}>
      <div className="blob-bg blob-1" />
      <div className="blob-bg blob-2" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card
          className="irregular-card glass-effect"
          title={
            <Space>
              <Settings size={24} style={{ color: '#FF6B35' }} />
              <span style={{ fontSize: 20, fontWeight: 600 }}>LLM 配置</span>
            </Space>
          }
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleTest}
            initialValues={{
              baseUrl: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
              model: 'qwen-plus',
            }}
          >
            <Form.Item
              label="Base URL"
              name="baseUrl"
              rules={[{ required: true, message: '请输入 Base URL' }]}
            >
              <Input placeholder="https://api.openai.com/v1" />
            </Form.Item>

            <Form.Item
              label="API Key"
              name="apiKey"
              rules={[{ required: true, message: '请输入 API Key' }]}
            >
              <Input.Password placeholder="sk-..." />
            </Form.Item>

            <Form.Item
              label="Model"
              name="model"
              rules={[{ required: true, message: '请输入模型名称' }]}
            >
              <Input placeholder="gpt-4" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="gradient-btn"
                icon={<CheckCircle size={16} />}
                block
              >
                测试连接
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </motion.div>
    </div>
  );
};

export default SettingsPage;
