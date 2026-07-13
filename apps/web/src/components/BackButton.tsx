import React from 'react';
import { Button } from 'antd';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
  campId: string;
  style?: React.CSSProperties;
}

export const BackButton: React.FC<BackButtonProps> = ({ campId, style }) => {
  const navigate = useNavigate();

  return (
    <Button
      icon={<ArrowLeft size={18} />}
      onClick={() => navigate(`/camps/${campId}`)}
      style={{
        marginBottom: 20,
        borderRadius: 20,
        ...style,
      }}
    >
      返回概览
    </Button>
  );
};
