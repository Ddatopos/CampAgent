import React from 'react';

interface CampLogoProps {
  size?: number;
  style?: React.CSSProperties;
}

export const CampLogo: React.FC<CampLogoProps> = ({ size = 44, style }) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #42c7b0, #b2e9d8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: `0 ${size * 0.1}px ${size * 0.3}px rgba(66, 199, 176, 0.3)`,
        ...style,
      }}
    >
      <svg
        width={size * 0.6}
        height={size * 0.6}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 地面 */}
        <ellipse cx="50" cy="75" rx="35" ry="8" fill="#4CAF50" />
        
        {/* 帐篷 */}
        <polygon points="50,25 30,70 70,70" fill="#FFB84D" />
        <polygon points="50,25 40,70 60,70" fill="#FFA726" />
        
        {/* 帐篷门 */}
        <rect x="45" y="55" width="10" height="15" rx="2" fill="#E53935" />
        
        {/* 帐篷窗 */}
        <rect x="35" y="45" width="6" height="6" rx="1" fill="#FFF59D" />
        <rect x="59" y="45" width="6" height="6" rx="1" fill="#FFF59D" />
        
        {/* 左侧云朵 */}
        <ellipse cx="22" cy="35" rx="8" ry="5" fill="white" />
        <ellipse cx="28" cy="33" rx="6" ry="4" fill="white" />
        
        {/* 右侧云朵 */}
        <ellipse cx="78" cy="38" rx="7" ry="4" fill="white" />
        <ellipse cx="72" cy="36" rx="5" ry="3" fill="white" />
        
        {/* 树木 */}
        <polygon points="85,70 80,50 90,50" fill="#66BB6A" />
        <polygon points="85,60 81,45 89,45" fill="#43A047" />
        <rect x="83" y="65" width="4" height="8" fill="#8D6E63" />
      </svg>
    </div>
  );
};
