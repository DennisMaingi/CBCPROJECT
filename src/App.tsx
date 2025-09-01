import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginForm from './components/Auth/LoginForm';
import Navbar from './components/Layout/Navbar';
import Sidebar from './components/Layout/Sidebar';
import StudentDashboard from './components/Dashboard/StudentDashboard';
import TeacherDashboard from './components/Dashboard/TeacherDashboard';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import StudentProgress from './components/Students/StudentProgress';
import MessageCenter from './components/Communication/MessageCenter';

const AppContent: React.FC = () => {
  const { user, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading CBC EduPlatform...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  const renderMainContent = () => {
    if (activeTab === 'dashboard') {
      switch (user.role) {
        case 'student': return <StudentDashboard />;
        case 'teacher': return <TeacherDashboard />;
        case 'admin': return <AdminDashboard />;
        default: return <StudentDashboard />;
      }
    }
    
    if (activeTab === 'progress') {
      return <StudentProgress />;
    }
    
    if (activeTab === 'messages') {
      return <MessageCenter />;
    }

    // Placeholder for other tabs
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 text-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
        </h2>
        <p className="text-gray-600">This section is being developed. Check back soon!</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 p-6">
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;