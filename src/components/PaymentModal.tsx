import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Button from './Button';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  orderId: string;
  onSuccess: (response: any) => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  amount,
  orderId,
  onSuccess,
}) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = () => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: amount * 100, // Amount in paise
      currency: 'INR',
      name: 'KareerSakhi',
      description: 'Resume Review Service',
      order_id: orderId,
      handler: (response: any) => {
        onSuccess(response);
      },
      prefill: {
        name: '',
        email: '',
        contact: '',
      },
      theme: {
        color: '#1E3A8A',
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md relative"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Complete Payment</h2>
            <p className="text-gray-600 mb-6">
              You will be redirected to Razorpay's secure payment gateway to complete your
              purchase.
            </p>

            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Amount:</span>
                <span className="text-gray-900 font-medium">₹{amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Order ID:</span>
                <span className="text-gray-900 font-medium">{orderId}</span>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button variant="ghost" onClick={onClose} fullWidth>
                Cancel
              </Button>
              <Button variant="primary" onClick={handlePayment} fullWidth>
                Pay Now
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PaymentModal;