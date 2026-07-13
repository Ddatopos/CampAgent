import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, Typography, Divider, Button, Tag, message } from 'antd';
import { ExportOutlined } from '@ant-design/icons';
import { FloatingCircles } from '../components/DecorativeElements';
import { BackButton } from '../components/BackButton';
import { useCampStore } from '../stores/campStore';

const { Title, Text } = Typography;

const CampFormDetail: React.FC = () => {
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

  const handleExportJSON = () => {
    const json = JSON.stringify(camp.form, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${camp.plan.campName}-表单.json`;
    a.click();
    URL.revokeObjectURL(url);
    message.success('表单导出成功！');
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
            表单详情
          </Title>

          <Title level={4} style={{ marginBottom: 16 }}>
            报名字段列表
          </Title>
          <div style={{ marginBottom: 24 }}>
            {camp.form.map((field, index) => (
              <Card
                key={index}
                size="small"
                style={{
                  marginBottom: 12,
                  borderRadius: 12,
                  background: 'rgba(66, 199, 176, 0.05)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <Text strong style={{ fontSize: 16 }}>
                      {field.label}
                    </Text>
                    {field.required && (
                      <Tag color="red" style={{ marginLeft: 8 }}>
                        必填
                      </Tag>
                    )}
                  </div>
                  <Tag color="#42c7b0">{field.type}</Tag>
                </div>
                <div style={{ marginTop: 8 }}>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    字段名：{field.name}
                  </Text>
                  {field.placeholder && (
                    <Text type="secondary" style={{ fontSize: 12, marginLeft: 16 }}>
                      占位符：{field.placeholder}
                    </Text>
                  )}
                </div>
                {field.options && field.options.length > 0 && (
                  <div style={{ marginTop: 8 }}>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      选项：{field.options.join(' / ')}
                    </Text>
                  </div>
                )}
              </Card>
            ))}
          </div>

          <Divider />

          <Button
            type="primary"
            icon={<ExportOutlined />}
            onClick={handleExportJSON}
            style={{ background: '#42c7b0', borderColor: '#42c7b0', borderRadius: 20 }}
          >
            导出 JSON
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default CampFormDetail;
