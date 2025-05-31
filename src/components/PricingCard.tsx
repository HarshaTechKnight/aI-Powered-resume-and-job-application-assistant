import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Button from './Button';

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingCardProps {
  title: string;
  price: string | number;
  period?: string;
  features: PricingFeature[];
  isPopular?: boolean;
  onSubscribe: () => void;
  buttonText?: string;
  delay?: number;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  period,
  features,
  isPopular = false,
  onSubscribe,
  buttonText = 'Subscribe Now',
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`relative bg-white rounded-2xl shadow-lg overflow-hidden ${
        isPopular ? 'border-2 border-primary-500' : 'border border-gray-200'
      }`}
    >
      {isPopular && (
        <div className="absolute top-0 right-0 bg-primary-500 text-white px-4 py-1 rounded-bl-lg text-sm font-medium">
          Most Popular
        </div>
      )}

      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <div className="mb-6">
          <span className="text-4xl font-bold text-gray-900">
            {typeof price === 'number' ? `₹${price}` : price}
          </span>
          {period && <span className="text-gray-500 ml-2">{period}</span>}
        </div>

        <ul className="space-y-4 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check
                size={20}
                className={feature.included ? 'text-primary-500' : 'text-gray-300'}
              />
              <span
                className={`ml-3 ${
                  feature.included ? 'text-gray-700' : 'text-gray-400 line-through'
                }`}
              >
                {feature.text}
              </span>
            </li>
          ))}
        </ul>

        <Button
          variant={isPopular ? 'primary' : 'outline'}
          size="lg"
          fullWidth
          onClick={onSubscribe}
        >
          {buttonText}
        </Button>
      </div>
    </motion.div>
  );
};

export default PricingCard;