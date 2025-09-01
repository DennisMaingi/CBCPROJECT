import React, { useState } from 'react';
import { X, CreditCard, Phone, Loader } from 'lucide-react';
import { intaSendService } from '../../services/intasend';
import { supabase } from '../../lib/supabase';

interface PaymentPlan {
  id: string;
  name: string;
  amount: number;
  currency: string;
  term: string;
  due_date: string;
  description: string;
}

interface PaymentModalProps {
  paymentPlan: PaymentPlan;
  studentId: string;
  onClose: () => void;
  onSuccess: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ 
  paymentPlan, 
  studentId, 
  onClose, 
  onSuccess 
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0
    }).format(amount);
  };

  const handlePayment = async () => {
    if (!phoneNumber.trim()) {
      setError('Please enter your M-PESA phone number');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      // Create payment record in database
      const { data: paymentRecord, error: dbError } = await supabase
        .from('payments')
        .insert({
          student_id: studentId,
          payment_plan_id: paymentPlan.id,
          amount: paymentPlan.amount,
          currency: paymentPlan.currency,
          status: 'pending',
          payment_method: 'mpesa',
          reference_number: `PAY${Date.now()}`
        })
        .select()
        .single();

      if (dbError) {
        throw new Error('Failed to create payment record');
      }

      // Get user email for IntaSend
      const { data: userData } = await supabase
        .from('users')
        .select('email')
        .eq('id', (await supabase.from('students').select('user_id').eq('id', studentId).single()).data?.user_id)
        .single();

      // Initiate IntaSend payment
      const paymentData = {
        amount: paymentPlan.amount,
        currency: paymentPlan.currency,
        email: userData?.email || 'student@school.ke',
        phone_number: phoneNumber,
        api_ref: paymentRecord.id,
        comment: `School fees payment for ${paymentPlan.name}`
      };

      const intaSendResponse = await intaSendService.initiatePayment(paymentData);

      // Update payment record with IntaSend details
      await supabase
        .from('payments')
        .update({
          intasend_transaction_id: intaSendResponse.id,
          intasend_payment_id: intaSendResponse.checkout_id
        })
        .eq('id', paymentRecord.id);

      // Open IntaSend payment page
      window.open(intaSendResponse.url, '_blank');
      
      // For demo purposes, simulate successful payment after 3 seconds
      setTimeout(async () => {
        await supabase
          .from('payments')
          .update({
            status: 'completed',
            paid_at: new Date().toISOString()
          })
          .eq('id', paymentRecord.id);
        
        onSuccess();
        onClose();
      }, 3000);

    } catch (err: any) {
      setError(err.message || 'Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Pay School Fees</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
          <h3 className="font-semibold text-gray-900">{paymentPlan.name}</h3>
          <p className="text-sm text-gray-600">{paymentPlan.description}</p>
          <div className="flex justify-between items-center pt-2 border-t border-gray-200">
            <span className="text-sm text-gray-600">Amount to pay:</span>
            <span className="text-xl font-bold text-green-600">
              {formatAmount(paymentPlan.amount, paymentPlan.currency)}
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            M-PESA Phone Number
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="254700000000"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Enter the phone number registered with M-PESA
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg hover:from-green-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isProcessing ? (
              <>
                <Loader className="h-4 w-4 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <CreditCard className="h-4 w-4" />
                <span>Pay Now</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;