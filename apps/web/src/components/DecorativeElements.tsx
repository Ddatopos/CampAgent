import React from 'react';
import { motion } from 'framer-motion';

export const FloatingCircles: React.FC = () => {
  return (
    <>
      <motion.div
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          position: 'fixed',
          top: '10%',
          left: '5%',
          width: 120,
          height: 120,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.6)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <motion.div
        animate={{
          y: [0, 30, 0],
          scale: [1, 0.95, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
        style={{
          position: 'fixed',
          top: '60%',
          right: '8%',
          width: 150,
          height: 150,
          borderRadius: '50%',
          background: 'rgba(178, 233, 216, 0.4)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <motion.div
        animate={{
          y: [0, -15, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        style={{
          position: 'fixed',
          bottom: '15%',
          left: '12%',
          width: 100,
          height: 100,
          borderRadius: '50%',
          background: 'rgba(252, 236, 184, 0.4)',
          filter: 'blur(35px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
    </>
  );
};

export const WaveDivider: React.FC<{ style?: React.CSSProperties }> = ({ style }) => {
  return (
    <svg
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      style={{
        width: '100%',
        height: 60,
        ...style,
      }}
    >
      <path
        d="M0,60 C150,120 350,0 600,60 C850,120 1050,0 1200,60 L1200,120 L0,120 Z"
        fill="rgba(66, 199, 176, 0.1)"
      />
    </svg>
  );
};

export const GeometricPatterns: React.FC = () => {
  return (
    <>
      <svg
        style={{
          position: 'fixed',
          top: '20%',
          right: '15%',
          width: 60,
          height: 60,
          opacity: 0.06,
          pointerEvents: 'none',
          zIndex: 0,
        }}
        viewBox="0 0 60 60"
      >
        <polygon points="30,5 55,25 45,55 15,55 5,25" fill="#42c7b0" />
      </svg>
      <svg
        style={{
          position: 'fixed',
          bottom: '25%',
          left: '10%',
          width: 50,
          height: 50,
          opacity: 0.06,
          pointerEvents: 'none',
          zIndex: 0,
        }}
        viewBox="0 0 50 50"
      >
        <circle cx="25" cy="25" r="20" fill="none" stroke="#42c7b0" strokeWidth="3" />
      </svg>
      <svg
        style={{
          position: 'fixed',
          top: '40%',
          left: '8%',
          width: 40,
          height: 40,
          opacity: 0.08,
          pointerEvents: 'none',
          zIndex: 0,
        }}
        viewBox="0 0 40 40"
      >
        <rect x="5" y="5" width="30" height="30" fill="none" stroke="#b2e9d8" strokeWidth="2" transform="rotate(45 20 20)" />
      </svg>
    </>
  );
};

export const DotPattern: React.FC = () => {
  const dots = Array.from({ length: 20 }, (_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 2,
  }));

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      {dots.map((dot, i) => (
        <motion.div
          key={i}
          animate={{
            opacity: [0.03, 0.1, 0.03],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: dot.delay,
          }}
          style={{
            position: 'absolute',
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: dot.size,
            height: dot.size,
            borderRadius: '50%',
            background: i % 2 === 0 ? '#42c7b0' : '#b2e9d8',
          }}
        />
      ))}
    </div>
  );
};
