import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { FloatingCircles, GeometricPatterns } from '../components/DecorativeElements';
import { CampCenterCard } from '../components/CampCenterCard';
import { OverviewCard, PosterCard, FormCard, ContentCard } from '../components/ClickableCards';
import { useCampStore } from '../stores/campStore';

const CampOverviewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { camps, deleteCamp } = useCampStore();

  const camp = camps.find((c) => c.id === id);

  if (!camp) {
    return (
      <div style={{ padding: 40, textAlign: 'center' }}>
        <h2>活动不存在</h2>
        <button onClick={() => navigate('/camps')}>返回列表</button>
      </div>
    );
  }

  const handleEdit = () => {
    message.info('编辑功能开发中');
  };

  const handleDelete = () => {
    deleteCamp(camp.id);
    message.success('活动已删除');
    navigate('/camps');
  };

  return (
    <div
      style={{
        height: 'calc(100vh - 80px)',
        maxWidth: 1200,
        margin: '0 auto',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <FloatingCircles />
      <GeometricPatterns />

      <div style={{ position: 'relative', zIndex: 1, width: '100%', height: '100%' }}>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <CampCenterCard
            campId={camp.id}
            campName={camp.plan.campName}
            plan={camp.plan}
            status={camp.status}
            createdAt={camp.createdAt}
            updatedAt={camp.updatedAt}
            onDelete={handleDelete}
          />
        </div>

        <div
          style={{
            position: 'absolute',
            top: '8%',
            left: '8%',
            width: '34%',
          }}
        >
          <OverviewCard campId={camp.id} />
        </div>

        <div
          style={{
            position: 'absolute',
            top: '8%',
            right: '8%',
            width: '34%',
          }}
        >
          <PosterCard campId={camp.id} />
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: '8%',
            left: '8%',
            width: '34%',
          }}
        >
          <FormCard campId={camp.id} fieldCount={camp.form.length} />
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: '8%',
            right: '8%',
            width: '34%',
          }}
        >
          <ContentCard campId={camp.id} dayCount={camp.dailyContents.length} />
        </div>
      </div>
    </div>
  );
};

export default CampOverviewPage;
