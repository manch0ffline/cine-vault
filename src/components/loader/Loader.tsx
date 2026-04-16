import React from 'react';

export type LoaderVariant = 'spinner' | 'dots' | 'pulse';
export type LoaderSize = 'small' | 'medium' | 'large';

interface LoaderProps {
  variant?: LoaderVariant;
  size?: LoaderSize | number; // можно передать 'small', 'medium', 'large' или конкретное число в px
  color?: string; // кастомный цвет (hex, rgb, переменная)
  speed?: 'slow' | 'normal' | 'fast'; // скорость анимации
  fullScreen?: boolean; // если true – центрирует на весь экран с полупрозрачным фоном
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({
  variant = 'dots',
  size = 'medium',
  color = '#0066FF',
  speed = 'normal',
  fullScreen = false,
  className = '',
}) => {
  const sizeMap: Record<LoaderSize, number> = {
    small: 24,
    medium: 48,
    large: 80,
  };

  const finalSize = typeof size === 'number' ? size : sizeMap[size];
  const speedMap = { slow: 1.5, normal: 1, fast: 0.5 };
  const animationDuration = speedMap[speed];

  const loaderStyle: React.CSSProperties = {
    '--loader-size': `${finalSize}px`,
    '--loader-color': color || '#0066FF',
    '--loader-speed': `${animationDuration}s`,
  } as React.CSSProperties;

  const renderLoader = () => {
    switch (variant) {
      case 'dots':
        return (
          <div className="loader-dots" style={loaderStyle}>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        );
      case 'pulse':
        return <div className="loader-pulse" style={loaderStyle}></div>;
      default:
        return <div className="loader-spinner" style={loaderStyle}></div>;
    }
  };

  const loaderContent = renderLoader();

  if (fullScreen) {
    return (
      <div className={`loader-fullscreen ${className}`}>
        {loaderContent}
      </div>
    );
  }

  return (
    <div className={`loader-container ${className}`}>
      {loaderContent}
    </div>
  );
};

export default Loader;