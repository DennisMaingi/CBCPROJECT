import React from 'react';
import { CreditCard, Calendar, DollarSign, AlertCircle } from 'lucide-react';

interface PaymentPlan {
  id: string;
  name: string;
  amount: number;
  currency: string;
  term: string;
  due_date: string;
  description: string;
}

interface PaymentCardProps {
  paymentPlan: PaymentPlan;
  isPaid?: boolean;
  onPayNow: (plan: PaymentPlan) => void;
}

const PaymentCard: React.FC<PaymentCardProps> = ({ paymentPlan, isPaid = false, onPayNow }) => {
  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getDaysUntilDue = () => {
    const today = new Date();
    const dueDate = new Date(paymentPlan.due_date);
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysUntilDue = getDaysUntilDue();
  const isOverdue = daysUntilDue < 0;
  const isDueSoon = daysUntilDue <= 7 && daysUntilDue >= 0;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{paymentPlan.name}</h3>
          <p className="text-sm text-gray-600 mt-1">{paymentPlan.description}</p>
        </div>
        
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          isPaid 
            ? 'bg-green-50 text-green-700' 
            : isOverdue 
              ? 'bg-red-50 text-red-700' 
              : isDueSoon 
                ? 'bg-orange-50 text-orange-700'
                : 'bg-blue-50 text-blue-700'
        }`}>
          {isPaid ? 'Paid' : isOverdue ? 'Overdue' : isDueSoon ? 'Due Soon' : 'Pending'}
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-gray-600">
            <DollarSign className="h-4 w-4" />
            <span className="text-sm">Amount</span>
          </div>
          <span className="text-xl font-bold text-gray-900">
            {formatAmount(paymentPlan.amount, paymentPlan.currency)}
          </span>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Calendar className="h-4 w-4" />
          <span>Due: {new Date(paymentPlan.due_date).toLocaleDateString()}</span>
        </div>

        {!isPaid && isOverdue && (
          <div className="flex items-center space-x-2 text-sm text-red-600">
            <AlertCircle className="h-4 w-4" />
            <span>{Math.abs(daysUntilDue)} days overdue</span>
          </div>
        )}
      </div>

      {!isPaid && (
        <button
          onClick={() => onPayNow(paymentPlan)}
          className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg hover:from-green-600 hover:to-blue-700 transition-all duration-200"
        >
          <CreditCard className="h-4 w-4" />
          <span>Pay with M-PESA</span>
        </button>
      )}

      {isPaid && (
        <div className="w-full py-3 px-4 bg-green-50 text-green-700 rounded-lg text-center font-medium">
          Payment Completed ✓
        </div>
      )}
    </div>
  );
};

export default PaymentCard;