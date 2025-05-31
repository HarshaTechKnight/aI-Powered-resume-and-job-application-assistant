import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  percentage: number;
  label?: string;
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'error';
  height?: 'sm' | 'md' | 'lg';
  showPercentage?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  percentage,
  label,
  color = 'primary',
  height = 'md',
  showPercentage = true,
}) => {
  const normalizedPercentage = Math.min(100, Math.max(0, percentage));
  
  // Color mappings
  const colorClasses = {
    primary: 'bg-primary-600',
    secondary: 'bg-secondary-600',
    accent: 'bg-accent-400',
    success: 'bg-success-500',
    error: 'bg-error-500',
  };
  
  // Height mappings
  const heightClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          {showPercentage && (
            <span className="text-sm font-medium text-gray-500">{normalizedPercentage}%</span>
          )}
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full ${heightClasses[height]}`}>
        <motion.div
          className={`${heightClasses[height]} rounded-full ${colorClasses[color]}`}
          initial={{ width: '0%' }}
          animate={{ width: `${normalizedPercentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;