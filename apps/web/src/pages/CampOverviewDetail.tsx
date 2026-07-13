import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Typography, Divider, message, Button, Space } from 'antd';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import { FloatingCircles } from '../components/DecorativeElements';
import { BackButton } from '../components/BackButton';
import { useCampStore } from '../stores/campStore';

const { Title, Text } = Typography;

const CampOverviewDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { camps, updateCamp } = useCampStore();
  const camp = camps.find((c) => c.id === id);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!camp) {
    return (
      <div style={{ padding: 40, textAlign: 'center' }}>
        <h2>活动不存在</h2>
      </div>
    );
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      message.error('请上传图片文件');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      updateCamp(camp.id, { qrCodeDataUrl: base64 });
      message.success('二维码上传成功');
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteQR = () => {
    updateCamp(camp.id, { qrCodeDataUrl: undefined });
    message.success('二维码已删除');
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
            概览详情
          </Title>

          <Title level={4} style={{ marginBottom: 16 }}>
            基本信息
          </Title>
          <div style={{ marginBottom: 24 }}>
            <div style={{ marginBottom: 12 }}>
              <Text strong>营名：</Text>
              <Text>{camp.plan.campName}</Text>
            </div>
            <div style={{ marginBottom: 12 }}>
              <Text strong>受众：</Text>
              <Text>{camp.plan.targetAudience}</Text>
            </div>
            <div style={{ marginBottom: 12 }}>
              <Text strong>日期：</Text>
              <Text>{camp.plan.startDate} 起，共 {camp.plan.durationDays} 天</Text>
            </div>
            <div style={{ marginBottom: 12 }}>
              <Text strong>主题：</Text>
              <Text>{camp.plan.theme}</Text>
            </div>
          </div>

          <Divider />

          <Title level={4} style={{ marginBottom: 16 }}>
            亮点特色
          </Title>
          <ul style={{ marginBottom: 24 }}>
            {camp.plan.highlights.map((h, i) => (
              <li key={i} style={{ marginBottom: 8 }}>
                <Text>✨ {h}</Text>
              </li>
            ))}
          </ul>

          <Divider />

          <Title level={4} style={{ marginBottom: 16 }}>
            报名二维码
          </Title>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />

          {camp.qrCodeDataUrl ? (
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              <img
                src={camp.qrCodeDataUrl}
                alt="QR Code"
                style={{ marginBottom: 16, maxWidth: '100%', height: 'auto' }}
              />
              <div>
                <Space>
                  <Button
                    icon={<UploadOutlined />}
                    onClick={handleUploadClick}
                    style={{ borderRadius: 20 }}
                  >
                    更换二维码
                  </Button>
                  <Button
                    danger
                    icon={<DeleteOutlined />}
                    onClick={handleDeleteQR}
                    style={{ borderRadius: 20 }}
                  >
                    删除
                  </Button>
                </Space>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              <Button
                type="primary"
                icon={<UploadOutlined />}
                onClick={handleUploadClick}
                style={{ background: '#42c7b0', borderColor: '#42c7b0', borderRadius: 20 }}
              >
                上传二维码
              </Button>
              <div style={{ marginTop: 8 }}>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  支持上传 JPG、PNG 等图片格式
                </Text>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default CampOverviewDetail;
