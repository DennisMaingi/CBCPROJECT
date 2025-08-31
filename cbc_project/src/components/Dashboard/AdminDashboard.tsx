import React from 'react';
import { Users, GraduationCap, BookOpen, TrendingUp, MessageSquare, Settings, Plus, Download } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const institutionStats = [
    { label: 'Total Students', value: '1,247', change: '+12%', icon: GraduationCap, color: 'blue' },
    { label: 'Active Teachers', value: '68', change: '+3%', icon: Users, color: 'green' },
    { label: 'Content Items', value: '2,340', change: '+25%', icon: BookOpen, color: 'purple' },
    { label: 'Avg. Performance', value: '82%', change: '+5%', icon: TrendingUp, color: 'orange' }
  ];

  const recentActivities = [
    { id: 1, action: 'New teacher registered', user: 'Grace Muthoni', time: '2 hours ago', type: 'user' },
    { id: 2, action: 'Grade 5 assignments created', user: 'James Ochieng', time: '4 hours ago', type: 'content' },
    { id: 3, action: 'Parent communication sent', user: 'Admin System', time: '1 day ago', type: 'message' },
    { id: 4, action: 'Student progress updated', user: 'Mary Wanjiku', time: '1 day ago', type: 'progress' }
  ];

  const gradeDistribution = [
    { grade: 'PP1', students: 120, teachers: 8 },
    { grade: 'PP2', students: 118, teachers: 8 },
    { grade: 'Grade 1', students: 142, teachers: 9 },
    { grade: 'Grade 2', students: 138, teachers: 9 },
    { grade: 'Grade 3', students: 135, teachers: 9 },
    { grade: 'Grade 4', students: 132, teachers: 8 },
    { grade: 'Grade 5', students: 128, teachers: 8 },
    { grade: 'Grade 6', students: 125, teachers: 9 }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user': return <Users className="h-4 w-4" />;
      case 'content': return <BookOpen className="h-4 w-4" />;
      case 'message': return <MessageSquare className="h-4 w-4" />;
      case 'progress': return <TrendingUp className="h-4 w-4" />;
      default: return <Settings className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Institution Overview</h1>
        <p className="text-purple-100">Bright Future Academy - Managing CBC excellence across all grades</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {institutionStats.map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: 'bg-blue-50 text-blue-600',
            green: 'bg-green-50 text-green-600',
            purple: 'bg-purple-50 text-purple-600',
            orange: 'bg-orange-50 text-orange-600'
          };
          
          return (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-green-600">{stat.change} this month</p>
                </div>
                <div className={`p-3 rounded-lg ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group">
            <Plus className="h-5 w-5 text-blue-600" />
            <span className="font-medium text-blue-700 group-hover:text-blue-800">Add New Teacher</span>
          </button>
          
          <button className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors group">
            <GraduationCap className="h-5 w-5 text-green-600" />
            <span className="font-medium text-green-700 group-hover:text-green-800">Register Student</span>
          </button>
          
          <button className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors group">
            <MessageSquare className="h-5 w-5 text-purple-600" />
            <span className="font-medium text-purple-700 group-hover:text-purple-800">Send Announcement</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Grade Distribution */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Grade Distribution</h2>
            <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {gradeDistribution.map((grade) => (
                <div key={grade.grade} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{grade.grade}</p>
                    <p className="text-sm text-gray-600">{grade.teachers} teachers assigned</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">{grade.students}</p>
                    <p className="text-xs text-gray-500">students</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
          </div>
          <div className="p-6 space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="p-2 bg-gray-100 rounded-lg">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-600">by {activity.user}</p>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CBC Performance Overview */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">CBC Performance Overview</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-1">87%</div>
              <div className="text-sm text-gray-600">Literacy Competency</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-1">82%</div>
              <div className="text-sm text-gray-600">Numeracy Competency</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-1">90%</div>
              <div className="text-sm text-gray-600">Overall Engagement</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;