import React from 'react';
import { TrendingUp, Award, Target, Clock } from 'lucide-react';
import { CBC_SUBJECTS } from '../../data/cbcData';

const StudentProgress: React.FC = () => {
  const progressData = CBC_SUBJECTS.map(subject => ({
    ...subject,
    overallProgress: Math.floor(Math.random() * 30) + 70, // 70-100%
    strandsCompleted: Math.floor(Math.random() * subject.strands.length) + 1,
    totalStrands: subject.strands.length,
    recentActivity: `${Math.floor(Math.random() * 7) + 1} days ago`
  }));

  const overallStats = {
    averageScore: 85,
    completedAssignments: 42,
    totalAssignments: 50,
    badges: 8
  };

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-4">My Learning Progress</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="h-5 w-5" />
              <span className="text-sm font-medium">Average Score</span>
            </div>
            <p className="text-2xl font-bold">{overallStats.averageScore}%</p>
          </div>
          
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="h-5 w-5" />
              <span className="text-sm font-medium">Assignments</span>
            </div>
            <p className="text-2xl font-bold">{overallStats.completedAssignments}/{overallStats.totalAssignments}</p>
          </div>
          
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Award className="h-5 w-5" />
              <span className="text-sm font-medium">Badges Earned</span>
            </div>
            <p className="text-2xl font-bold">{overallStats.badges}</p>
          </div>
          
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="h-5 w-5" />
              <span className="text-sm font-medium">Completion Rate</span>
            </div>
            <p className="text-2xl font-bold">84%</p>
          </div>
        </div>
      </div>

      {/* Subject Progress */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">CBC Subject Progress</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {progressData.map((subject) => (
              <div key={subject.id} className="p-4 border border-gray-100 rounded-lg hover:border-blue-200 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: `${subject.color}15` }}
                    >
                      <BookOpen className="h-5 w-5" style={{ color: subject.color }} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{subject.name}</h3>
                      <p className="text-sm text-gray-600">
                        {subject.strandsCompleted}/{subject.totalStrands} strands completed
                      </p>
                    </div>
                  </div>
                  <span className="text-lg font-bold text-gray-900">{subject.overallProgress}%</span>
                </div>

                <div className="mb-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${subject.overallProgress}%`,
                        backgroundColor: subject.color 
                      }}
                    ></div>
                  </div>
                </div>

                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>Last activity: {subject.recentActivity}</span>
                  <button 
                    className="text-blue-600 hover:text-blue-700 font-medium"
                    style={{ color: subject.color }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProgress;