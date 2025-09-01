import React from 'react';
import { 
  Home, 
  BookOpen, 
  FileText, 
  Users, 
  MessageSquare, 
  BarChart3, 
  Settings,
  GraduationCap,
  ClipboardList,
  Calendar,
  CreditCard
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const { user } = useAuth();

  const getMenuItems = () => {
    const baseItems = [
      { id: 'dashboard', label: 'Dashboard', icon: Home }
    ];

    switch (user?.role) {
      case 'student':
        return [
          ...baseItems,
          { id: 'subjects', label: 'My Subjects', icon: BookOpen },
          { id: 'assignments', label: 'Assignments', icon: ClipboardList },
          { id: 'progress', label: 'My Progress', icon: BarChart3 },
          { id: 'payments', label: 'School Fees', icon: CreditCard },
          { id: 'calendar', label: 'Calendar', icon: Calendar }
        ];
      
      case 'teacher':
        return [
          ...baseItems,
          { id: 'content', label: 'Content Library', icon: BookOpen },
          { id: 'assignments', label: 'Assignments', icon: ClipboardList },
          { id: 'students', label: 'My Students', icon: GraduationCap },
          { id: 'grading', label: 'Grading', icon: FileText },
          { id: 'messages', label: 'Parent Messages', icon: MessageSquare }
        ];
      
      case 'admin':
        return [
          ...baseItems,
          { id: 'teachers', label: 'Teachers', icon: Users },
          { id: 'students', label: 'Students', icon: GraduationCap },
          { id: 'content', label: 'Content Management', icon: BookOpen },
          { id: 'reports', label: 'Reports', icon: BarChart3 },
          { id: 'messages', label: 'Communications', icon: MessageSquare },
          { id: 'settings', label: 'Settings', icon: Settings }
        ];
      
      default:
        return baseItems;
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className="w-64 bg-white shadow-sm border-r border-gray-200 h-full overflow-y-auto">
      <div className="p-2 sm:p-4">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;