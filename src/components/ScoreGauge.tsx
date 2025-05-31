import React from 'react';
import { motion } from 'framer-motion';

interface ScoreGaugeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  label?: string;
}

const ScoreGauge: React.FC<ScoreGaugeProps> = ({
  score,
  size = 'md',
  showLabel = true,
  label = 'ATS Score',
}) => {
  // Normalize score to be between 0 and 100
  const normalizedScore = Math.min(100, Math.max(0, score));
  
  // Calculate colors based on score
  const getColor = (score: number) => {
    if (score >= 80) return 'text-success-500';
    if (score >= 60) return 'text-accent-400';
    return 'text-error-500';
  };

  const getBgColor = (score: number) => {
    if (score >= 80) return 'bg-success-500';
    if (score >= 60) return 'bg-accent-400';
    return 'bg-error-500';
  };

  // Determine dimensions based on size
  const dimensions = {
    sm: {
      gauge: 'w-20 h-20',
      text: 'text-xl',
      label: 'text-xs',
      thickness: 4,
    },
    md: {
      gauge: 'w-32 h-32',
      text: 'text-3xl',
      label: 'text-sm',
      thickness: 6,
    },
    lg: {
      gauge: 'w-40 h-40',
      text: 'text-4xl',
      label: 'text-base',
      thickness: 8,
    },
  }[size];

  // Calculate the circumference and offset
  const radius = size === 'sm' ? 36 : size === 'md' ? 58 : 74;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - normalizedScore / 100);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className={`relative ${dimensions.gauge} flex items-center justify-center`}>
        {/* Background circle */}
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={dimensions.thickness}
          />
          
          {/* Animated score circle */}
          <motion.circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke={getBgColor(normalizedScore).replace('bg-', 'var(--color-')}
            strokeWidth={dimensions.thickness}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>
        
        {/* Score text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className={`${dimensions.text} font-bold ${getColor(normalizedScore)}`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {normalizedScore}%
          </motion.span>
        </div>
      </div>
      
      {showLabel && (
        <motion.p
          className={`mt-2 ${dimensions.label} text-gray-600 font-medium`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {label}
        </motion.p>
      )}
    </div>
  );
};

export default ScoreGauge;