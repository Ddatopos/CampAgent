import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, Typography, Divider, Button, Space, message } from 'antd';
import { DownloadOutlined, EyeOutlined } from '@ant-design/icons';
import { FloatingCircles } from '../components/DecorativeElements';
import { BackButton } from '../components/BackButton';
import { useCampStore } from '../stores/campStore';

const { Title, Text } = Typography;

const CampPosterDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { camps } = useCampStore();
  const camp = camps.find((c) => c.id === id);

  if (!camp) {
    return (
      <div style={{ padding: 40, textAlign: 'center' }}>
        <h2>活动不存在</h2>
      </div>
    );
  }

  const handleDownload = () => {
    const blob = new Blob([camp.poster.html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${camp.plan.campName}-海报.html`;
    a.click();
    URL.revokeObjectURL(url);
    message.success('海报下载成功！');
  };

  const handleOpenInNewTab = () => {
    const blob = new Blob([camp.poster.html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  return (
    <div style={{ padding: '40px 20px', maxWidth: 900, margin: '0 auto', position: 'relative' }}>
      <FloatingCircles />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <BackButton campId={camp.id} />

        <Card
          style={{
            borderRadius: 24,
            background: 'rgba(255, 255, 255, 0.75)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
          }}
        >
          <Title level={2} style={{ color: '#42c7b0', marginBottom: 24 }}>
            海报详情
          </Title>

          <Title level={4} style={{ marginBottom: 16 }}>
            海报预览
          </Title>
          <div
            style={{
              border: '2px dashed rgba(66, 199, 176, 0.3)',
              borderRadius: 16,
              padding: 20,
              marginBottom: 24,
            }}
          >
            <iframe
              srcDoc={camp.poster.html}
              style={{ width: '100%', minHeight: 500, border: 'none' }}
              title="海报预览"
            />
          </div>

          <Space style={{ marginBottom: 24 }}>
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              onClick={handleDownload}
              style={{ background: '#42c7b0', borderColor: '#42c7b0', borderRadius: 20 }}
            >
              下载 HTML
            </Button>
            <Button
              icon={<EyeOutlined />}
              onClick={handleOpenInNewTab}
              style={{ borderRadius: 20 }}
            >
              在新窗口打开
            </Button>
          </Space>

          <Divider />

          <Title level={4} style={{ marginBottom: 16 }}>
            海报信息
          </Title>
          <div>
            <div style={{ marginBottom: 12 }}>
              <Text strong>标题：</Text>
              <Text>{camp.poster.title}</Text>
            </div>
            <div style={{ marginBottom: 12 }}>
              <Text strong>副标题：</Text>
              <Text>{camp.poster.subtitle}</Text>
            </div>
            <div style={{ marginBottom: 12 }}>
              <Text strong>亮点数量：</Text>
              <Text>{camp.poster.bullets.length} 条</Text>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CampPosterDetail;
