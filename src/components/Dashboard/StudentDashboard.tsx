import React from 'react';
import { BookOpen, Clock, Trophy, TrendingUp, Calendar, CheckCircle, ClipboardList, CreditCard } from 'lucide-react';
import { CBC_SUBJECTS } from '../../data/cbcData';
import PaymentDashboard from '../Payments/PaymentDashboard';

const StudentDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'overview' | 'payments'>('overview');

  const recentAssignments = [
    { id: 1, title: 'Reading Comprehension Exercise', subject: 'Literacy', dueDate: '2025-01-20', status: 'pending' },
    { id: 2, title: 'Number Patterns Worksheet', subject: 'Numeracy', dueDate: '2025-01-22', status: 'submitted' },
    { id: 3, title: 'Plant Growth Observation', subject: 'Environmental', dueDate: '2025-01-25', status: 'pending' }
  ];

  const recentProgress = [
    { subject: 'Literacy', strand: 'Reading', progress: 85 },
    { subject: 'Numeracy', strand: 'Numbers', progress: 92 },
    { subject: 'Environmental', strand: 'Living Things', progress: 78 }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-4 sm:p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, John!</h1>
        <p className="text-blue-100">Ready to continue your learning journey today?</p>
        
        {/* Section Navigation */}
        <div className="flex space-x-4 mt-4">
          <button
            onClick={() => setActiveSection('overview')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeSection === 'overview'
                ? 'bg-white bg-opacity-20 text-white'
                : 'text-blue-100 hover:text-white hover:bg-white hover:bg-opacity-10'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveSection('payments')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeSection === 'payments'
                ? 'bg-white bg-opacity-20 text-white'
                : 'text-blue-100 hover:text-white hover:bg-white hover:bg-opacity-10'
            }`}
          >
            <CreditCard className="h-4 w-4" />
            <span>School Fees</span>
          </button>
        </div>
      </div>

      {activeSection === 'payments' ? (
        <PaymentDashboard />
      ) : (
        <>
      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <BookOpen className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Subjects</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">6</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-50 rounded-lg">
              <Clock className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Pending Tasks</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">3</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <Trophy className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">12</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <TrendingUp className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Avg. Score</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">85%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Assignments */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="p-4 sm:p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
              <ClipboardList className="h-5 w-5" />
              <span>Recent Assignments</span>
            </h2>
          </div>
          <div className="p-4 sm:p-6 space-y-4">
            {recentAssignments.map((assignment) => (
              <div key={assignment.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-gray-50 rounded-lg space-y-2 sm:space-y-0">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{assignment.title}</h3>
                  <p className="text-sm text-gray-600">{assignment.subject}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-xs text-gray-500">Due: {assignment.dueDate}</span>
                  </div>
                </div>
                <div className="sm:ml-4">
                  {assignment.status === 'submitted' ? (
                    <div className="flex items-center space-x-1 text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-xs">Submitted</span>
                    </div>
                  ) : (
                    <span className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded">
                      Pending
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Progress */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="p-4 sm:p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Learning Progress</span>
            </h2>
          </div>
          <div className="p-4 sm:p-6 space-y-4">
            {recentProgress.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-1 sm:space-y-0">
                  <div>
                    <p className="font-medium text-gray-900">{item.subject}</p>
                    <p className="text-sm text-gray-600">{item.strand}</p>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{item.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CBC Subjects Grid */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-4 sm:p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">My CBC Subjects</h2>
        </div>
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CBC_SUBJECTS.map((subject) => (
              <div
                key={subject.id}
                className="p-4 border-2 border-gray-100 rounded-lg hover:border-blue-200 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div 
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: `${subject.color}20`, color: subject.color }}
                  >
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {subject.name}
                    </h3>
                    <p className="text-sm text-gray-600">{subject.code}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{subject.strands.length} learning strands</p>
              </div>
            ))}
          </div>
        </div>
      </div>
        </>
      )}
    </div>
  );
};

export default StudentDashboard;