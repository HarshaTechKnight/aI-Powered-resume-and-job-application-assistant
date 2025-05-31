import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PricingCard from '../components/PricingCard';
import PaymentModal from '../components/PaymentModal';
import useSubscriptionStore from '../store/useSubscriptionStore';

const PricingPage: React.FC = () => {
  const navigate = useNavigate();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{
    tier: 'premium' | 'professional';
    price: number;
  } | null>(null);
  const { setTier, setExpiryDate } = useSubscriptionStore();

  const handleSubscribe = (tier: 'premium' | 'professional', price: number) => {
    setSelectedPlan({ tier, price });
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = (response: any) => {
    // In a real implementation, verify the payment on your backend
    console.log('Payment successful:', response);

    if (selectedPlan) {
      setTier(selectedPlan.tier);
      
      // Set expiry date
      const expiryDate = new Date();
      if (selectedPlan.tier === 'professional') {
        expiryDate.setMonth(expiryDate.getMonth() + 1);
      }
      setExpiryDate(expiryDate.toISOString());
      
      setIsPaymentModalOpen(false);
      navigate('/resume-scoring');
    }
  };

  const pricingPlans = [
    {
      title: 'Free',
      price: '0',
      period: 'forever',
      features: [
        { text: 'Basic ATS scan', included: true },
        { text: 'General score overview', included: true },
        { text: '1 review per month', included: true },
        { text: 'Detailed ATS report', included: false },
        { text: 'Industry keyword analysis', included: false },
        { text: 'Cover letter assistance', included: false },
        { text: 'Priority support', included: false },
      ],
    },
    {
      title: 'Premium',
      price: 499,
      period: 'per review',
      features: [
        { text: 'Basic ATS scan', included: true },
        { text: 'General score overview', included: true },
        { text: 'Detailed ATS report', included: true },
        { text: 'Industry keyword analysis', included: true },
        { text: 'Downloadable PDF report', included: true },
        { text: '24-hour turnaround time', included: true },
        { text: 'Priority support', included: false },
      ],
      isPopular: true,
    },
    {
      title: 'Professional',
      price: 1499,
      period: 'per month',
      features: [
        { text: 'All Premium features', included: true },
        { text: 'Unlimited resume reviews', included: true },
        { text: 'Cover letter assistance', included: true },
        { text: 'Priority support', included: true },
        { text: 'Access to premium templates', included: true },
        { text: 'Job application tracking', included: true },
        { text: 'Personal career advisor', included: true },
      ],
    },
  ];

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              Choose Your Plan
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-gray-600"
            >
              Get the perfect plan for your career growth
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <PricingCard
                key={plan.title}
                title={plan.title}
                price={plan.price}
                period={plan.period}
                features={plan.features}
                isPopular={plan.isPopular}
                delay={0.2 + index * 0.1}
                buttonText={plan.title === 'Free' ? 'Get Started' : 'Subscribe Now'}
                onSubscribe={() => {
                  if (plan.title === 'Free') {
                    setTier('free');
                    navigate('/resume-scoring');
                  } else {
                    handleSubscribe(
                      plan.title.toLowerCase() as 'premium' | 'professional',
                      Number(plan.price)
                    );
                  }
                }}
              />
            ))}
          </div>

          {selectedPlan && (
            <PaymentModal
              isOpen={isPaymentModalOpen}
              onClose={() => setIsPaymentModalOpen(false)}
              amount={selectedPlan.price}
              orderId="order_123" // This should come from your backend
              onSuccess={handlePaymentSuccess}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PricingPage;