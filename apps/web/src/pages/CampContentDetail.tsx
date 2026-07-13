import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, Typography, Divider, Button, message } from 'antd';
import { CopyOutlined, DownloadOutlined } from '@ant-design/icons';
import { FloatingCircles } from '../components/DecorativeElements';
import { BackButton } from '../components/BackButton';
import { useCampStore } from '../stores/campStore';

const { Title, Text, Paragraph } = Typography;

const CampContentDetail: React.FC = () => {
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

  const handleCopyAll = () => {
    const content = camp.dailyContents
      .map((d) => `## Day ${d.day}: ${d.title}\n\n${d.message}\n\n打卡：${d.checkInPrompt}`)
      .join('\n\n---\n\n');
    navigator.clipboard.writeText(content);
    message.success('文案已复制到剪贴板！');
  };

  const handleExportMarkdown = () => {
    const content = camp.dailyContents
      .map((d) => `## Day ${d.day}: ${d.title}\n\n${d.message}\n\n打卡：${d.checkInPrompt}`)
      .join('\n\n---\n\n');
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${camp.plan.campName}-文案.md`;
    a.click();
    URL.revokeObjectURL(url);
    message.success('文案导出成功！');
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
            文案详情
          </Title>

          <Button
            type="primary"
            icon={<CopyOutlined />}
            onClick={handleCopyAll}
            style={{
              background: '#42c7b0',
              borderColor: '#42c7b0',
              borderRadius: 20,
              marginBottom: 24,
            }}
          >
            一键复制全部文案
          </Button>

          <Divider />

          {camp.dailyContents.map((day, index) => (
            <Card
              key={index}
              style={{
                marginBottom: 20,
                borderRadius: 16,
                background: 'rgba(66, 199, 176, 0.05)',
              }}
            >
              <Title level={4} style={{ marginBottom: 16 }}>
                Day {day.day}：{day.title}
              </Title>
              <div style={{ marginBottom: 16 }}>
                <Text strong style={{ display: 'block', marginBottom: 8 }}>
                  📝 群发消息：
                </Text>
                <Paragraph style={{ whiteSpace: 'pre-wrap' }}>{day.message}</Paragraph>
              </div>
              <div>
                <Text strong style={{ display: 'block', marginBottom: 8 }}>
                  ✅ 打卡引导：
                </Text>
                <Text>{day.checkInPrompt}</Text>
              </div>
            </Card>
          ))}

          <Divider />

          <Button
            type="primary"
            icon={<DownloadOutlined />}
            onClick={handleExportMarkdown}
            style={{ background: '#42c7b0', borderColor: '#42c7b0', borderRadius: 20 }}
          >
            导出 Markdown
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default CampContentDetail;
