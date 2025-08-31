import React from 'react';
import { Users, BookOpen, ClipboardList, MessageSquare, Plus, Eye, Edit } from 'lucide-react';

const TeacherDashboard: React.FC = () => {
  const myClasses = [
    { id: 1, grade: 'Grade 3', subject: 'Literacy', students: 28, assignments: 5 },
    { id: 2, grade: 'Grade 4', subject: 'Numeracy', students: 25, assignments: 3 },
    { id: 3, grade: 'Grade 3', subject: 'Environmental', students: 28, assignments: 2 }
  ];

  const recentSubmissions = [
    { id: 1, student: 'John Kamau', assignment: 'Reading Exercise', subject: 'Literacy', submittedAt: '2 hours ago', status: 'pending' },
    { id: 2, student: 'Mary Akinyi', assignment: 'Math Problems', subject: 'Numeracy', submittedAt: '1 day ago', status: 'graded' },
    { id: 3, student: 'Peter Mwangi', assignment: 'Plant Study', subject: 'Environmental', submittedAt: '3 hours ago', status: 'pending' }
  ];

  const recentProgress = [
    { subject: 'Literacy', strand: 'Reading', progress: 78 },
    { subject: 'Numeracy', strand: 'Numbers', progress: 85 },
    { subject: 'Environmental', strand: 'Living Things', progress: 72 },
    { subject: 'Creative Arts', strand: 'Visual Arts', progress: 90 }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Good morning, Mary!</h1>
        <p className="text-green-100">Manage your classes and guide your students' CBC learning journey.</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <button className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all group">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
              <Plus className="h-5 w-5 text-blue-600" />
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-900">New Assignment</p>
              <p className="text-sm text-gray-600">Create CBC task</p>
            </div>
          </div>
        </button>

        <button className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all group">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-50 rounded-lg group-hover:bg-green-100 transition-colors">
              <BookOpen className="h-5 w-5 text-green-600" />
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-900">Upload Content</p>
              <p className="text-sm text-gray-600">Add resources</p>
            </div>
          </div>
        </button>

        <button className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all group">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-50 rounded-lg group-hover:bg-purple-100 transition-colors">
              <ClipboardList className="h-5 w-5 text-purple-600" />
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-900">Grade Work</p>
              <p className="text-sm text-gray-600">Review submissions</p>
            </div>
          </div>
        </button>

        <button className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all group">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-50 rounded-lg group-hover:bg-orange-100 transition-colors">
              <MessageSquare className="h-5 w-5 text-orange-600" />
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-900">Message Parents</p>
              <p className="text-sm text-gray-600">Send updates</p>
            </div>
          </div>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* My Classes */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>My Classes</span>
            </h2>
          </div>
          <div className="p-6 space-y-4">
            {myClasses.map((classItem) => (
              <div key={classItem.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{classItem.grade} - {classItem.subject}</h3>
                    <p className="text-sm text-gray-600">{classItem.students} students</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-green-600 transition-colors">
                      <Edit className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{classItem.assignments} active assignments</span>
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    View Class
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Submissions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
              <ClipboardList className="h-5 w-5" />
              <span>Recent Submissions</span>
            </h2>
          </div>
          <div className="p-6 space-y-4">
            {recentSubmissions.map((submission) => (
              <div key={submission.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{submission.student}</h3>
                  <p className="text-sm text-gray-600">{submission.assignment}</p>
                  <p className="text-xs text-gray-500">{submission.submittedAt}</p>
                </div>
                <div className="ml-4">
                  {submission.status === 'graded' ? (
                    <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                      Graded
                    </span>
                  ) : (
                    <button className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded hover:bg-blue-100 transition-colors">
                      Grade Now
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CBC Subject Performance */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Class Performance by CBC Strand</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentProgress.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-900">{item.subject}</p>
                    <p className="text-sm text-gray-600">{item.strand} Strand</p>
                  </div>
                  <span className="text-sm font-medium text-gray-900">Class Average: {item.progress}%</span>
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
    </div>
  );
};

export default TeacherDashboard;