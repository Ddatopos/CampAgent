import React from 'react';
import { Card, Tabs, Button, Space, Typography, message, Divider } from 'antd';
import { DownloadOutlined, CopyOutlined, EditOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { useCampStore } from '../stores/campStore';

const { Title, Text, Paragraph } = Typography;

const CampDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { camps } = useCampStore();
  const camp = camps.find((c) => c.id === id);

  if (!camp) {
    return (
      <div style={{ padding: 40, textAlign: 'center' }}>
        <Title level={3}>活动不存在</Title>
      </div>
    );
  }

  const handleDownloadPoster = () => {
    const blob = new Blob([camp.poster.html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${camp.plan.campName}-海报.html`;
    a.click();
    URL.revokeObjectURL(url);
    message.success('海报下载成功！');
  };

  const handleCopyContent = () => {
    const content = camp.dailyContents
      .map((d) => `## Day ${d.day}: ${d.title}\n\n${d.message}\n\n打卡：${d.checkInPrompt}`)
      .join('\n\n---\n\n');
    navigator.clipboard.writeText(content);
    message.success('文案已复制到剪贴板！');
  };

  return (
    <div style={{ padding: '40px 20px', maxWidth: 1200, margin: '0 auto' }}>
      <div className="blob-bg blob-1" />
      <div className="blob-bg blob-2" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="irregular-card glass-effect">
          <Title level={2} style={{ color: '#FF6B35', marginBottom: 24 }}>
            {camp.plan.campName}
          </Title>

          <Tabs
            defaultActiveKey="overview"
            items={[
              {
                key: 'overview',
                label: '概览',
                children: (
                  <Space direction="vertical" size="large" style={{ width: '100%' }}>
                    <div>
                      <Text strong>目标受众：</Text>
                      <Text>{camp.plan.targetAudience}</Text>
                    </div>
                    <div>
                      <Text strong>开始日期：</Text>
                      <Text>{camp.plan.startDate}</Text>
                    </div>
                    <div>
                      <Text strong>持续天数：</Text>
                      <Text>{camp.plan.durationDays} 天</Text>
                    </div>
                    <div>
                      <Text strong>主题：</Text>
                      <Text>{camp.plan.theme}</Text>
                    </div>
                    <div>
                      <Text strong>亮点：</Text>
                      <ul style={{ marginTop: 8 }}>
                        {camp.plan.highlights.map((h, i) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>
                    </div>
                    {camp.qrCodeDataUrl && (
                      <div>
                        <Text strong>报名二维码：</Text>
                        <br />
                        <img src={camp.qrCodeDataUrl} alt="QR Code" style={{ marginTop: 16 }} />
                      </div>
                    )}
                  </Space>
                ),
              },
              {
                key: 'poster',
                label: '海报',
                children: (
                  <Space direction="vertical" size="large" style={{ width: '100%' }}>
                    <Button
                      type="primary"
                      icon={<DownloadOutlined />}
                      onClick={handleDownloadPoster}
                      className="gradient-btn"
                    >
                      下载 HTML 海报
                    </Button>
                    <Divider />
                    <div
                      style={{
                        border: '2px dashed #FF6B35',
                        borderRadius: 12,
                        padding: 20,
                      }}
                    >
                      <iframe
                        srcDoc={camp.poster.html}
                        style={{ width: '100%', minHeight: 600, border: 'none' }}
                        title="海报预览"
                      />
                    </div>
                  </Space>
                ),
              },
              {
                key: 'form',
                label: '表单',
                children: (
                  <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                    {camp.form.map((field, index) => (
                      <Card key={index} size="small">
                        <Space direction="vertical" size="small">
                          <Text strong>
                            {field.label} {field.required && <Text type="danger">*</Text>}
                          </Text>
                          <Text type="secondary">字段名：{field.name}</Text>
                          <Text type="secondary">类型：{field.type}</Text>
                          {field.placeholder && (
                            <Text type="secondary">占位符：{field.placeholder}</Text>
                          )}
                        </Space>
                      </Card>
                    ))}
                  </Space>
                ),
              },
              {
                key: 'content',
                label: '文案',
                children: (
                  <Space direction="vertical" size="large" style={{ width: '100%' }}>
                    <Button
                      type="primary"
                      icon={<CopyOutlined />}
                      onClick={handleCopyContent}
                      className="gradient-btn"
                    >
                      一键复制全部文案
                    </Button>
                    <Divider />
                    {camp.dailyContents.map((day, index) => (
                      <Card key={index} className="irregular-card">
                        <Space direction="vertical" size="middle">
                          <Title level={4}>
                            Day {day.day}: {day.title}
                          </Title>
                          <Paragraph>{day.message}</Paragraph>
                          <Text type="secondary">
                            <EditOutlined /> 打卡引导：{day.checkInPrompt}
                          </Text>
                        </Space>
                      </Card>
                    ))}
                  </Space>
                ),
              },
            ]}
          />
        </Card>
      </motion.div>
    </div>
  );
};

export default CampDetailPage;
