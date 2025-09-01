import React, { useState, useEffect } from 'react';
import { CreditCard, DollarSign, Calendar, TrendingUp } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import PaymentCard from './PaymentCard';
import PaymentModal from './PaymentModal';
import PaymentHistory from './PaymentHistory';

interface PaymentPlan {
  id: string;
  name: string;
  amount: number;
  currency: string;
  term: string;
  due_date: string;
  description: string;
}

const PaymentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [paymentPlans, setPaymentPlans] = useState<PaymentPlan[]>([]);
  const [paidPlans, setPaidPlans] = useState<string[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<PaymentPlan | null>(null);
  const [studentId, setStudentId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [paymentStats, setPaymentStats] = useState({
    totalPaid: 0,
    totalPending: 0,
    nextDueDate: ''
  });

  useEffect(() => {
    if (user) {
      if (supabase) {
        fetchStudentData();
      } else {
        // Mock data for demo mode
        setStudentId('stud-001');
        setPaymentPlans([
          {
            id: 'plan-1',
            name: 'Grade 3 Term 1 Fees',
            amount: 20000,
            currency: 'KES',
            term: 'Term 1',
            due_date: '2025-02-15',
            description: 'School fees for Term 1 2025'
          },
          {
            id: 'plan-2',
            name: 'Grade 3 Activity Fees',
            amount: 5000,
            currency: 'KES',
            term: 'Term 1',
            due_date: '2025-02-20',
            description: 'Activity and materials fees'
          }
        ]);
        setPaymentStats({
          totalPaid: 15000,
          totalPending: 25000,
          nextDueDate: '2025-02-15'
        });
        setIsLoading(false);
      }
    }
  }, [user]);

  const fetchStudentData = async () => {
    if (!supabase) return;
    
    try {
      // Get student ID
      const { data: studentData, error: studentError } = await supabase
        .from('students')
        .select('id, grade_level')
        .eq('user_id', user?.id)
        .single();

      if (studentError) throw studentError;
      
      setStudentId(studentData.id);

      // Get payment plans for student's grade
      const { data: plansData, error: plansError } = await supabase
        .from('payment_plans')
        .select('*')
        .eq('grade_level', studentData.grade_level)
        .eq('institution_id', user?.institutionId);

      if (plansError) throw plansError;
      setPaymentPlans(plansData || []);

      // Get paid payments
      const { data: paymentsData, error: paymentsError } = await supabase
        .from('payments')
        .select('payment_plan_id, amount, status')
        .eq('student_id', studentData.id)
        .eq('status', 'completed');

      if (paymentsError) throw paymentsError;
      
      const paidPlanIds = paymentsData?.map(p => p.payment_plan_id) || [];
      setPaidPlans(paidPlanIds);

      // Calculate stats
      const totalPaid = paymentsData?.reduce((sum, p) => sum + p.amount, 0) || 0;
      const pendingPlans = plansData?.filter(p => !paidPlanIds.includes(p.id)) || [];
      const totalPending = pendingPlans.reduce((sum, p) => sum + p.amount, 0);
      const nextDue = pendingPlans.length > 0 ? pendingPlans[0].due_date : '';

      setPaymentStats({
        totalPaid,
        totalPending,
        nextDueDate: nextDue
      });

    } catch (error) {
      console.error('Error fetching student data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentSuccess = () => {
    fetchStudentData(); // Refresh data after successful payment
  };

  const formatAmount = (amount: number, currency: string = 'KES') => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-32 bg-gray-200 rounded-xl mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="h-24 bg-gray-200 rounded-lg"></div>
            <div className="h-24 bg-gray-200 rounded-lg"></div>
            <div className="h-24 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Payment Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <DollarSign className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Paid</p>
              <p className="text-lg sm:text-xl font-bold text-gray-900">
                {formatAmount(paymentStats.totalPaid)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-50 rounded-lg">
              <CreditCard className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-lg sm:text-xl font-bold text-gray-900">
                {formatAmount(paymentStats.totalPending)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Calendar className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Next Due</p>
              <p className="text-sm sm:text-base font-bold text-gray-900">
                {paymentStats.nextDueDate 
                  ? new Date(paymentStats.nextDueDate).toLocaleDateString()
                  : 'No pending'
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Plans */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-4 sm:p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">School Fee Payments</h2>
        </div>
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {paymentPlans.map((plan) => (
              <PaymentCard
                key={plan.id}
                paymentPlan={plan}
                isPaid={paidPlans.includes(plan.id)}
                onPayNow={setSelectedPlan}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Payment History */}
      <PaymentHistory studentId={studentId} />

      {/* Payment Modal */}
      {selectedPlan && (
        <PaymentModal
          paymentPlan={selectedPlan}
          studentId={studentId}
          onClose={() => setSelectedPlan(null)}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
};

export default PaymentDashboard;