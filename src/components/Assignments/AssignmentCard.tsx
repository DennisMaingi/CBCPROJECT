import React from 'react';
import { Calendar, Clock, FileText, Users } from 'lucide-react';
import { Assignment } from '../../types';

interface AssignmentCardProps {
  assignment: Assignment;
  showStats?: boolean;
  onClick: () => void;
}

const AssignmentCard: React.FC<AssignmentCardProps> = ({ 
  assignment, 
  showStats = false, 
  onClick 
}) => {
  const getDaysUntilDue = () => {
    const today = new Date();
    const dueDate = new Date(assignment.dueDate);
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysUntilDue = getDaysUntilDue();
  const isOverdue = daysUntilDue < 0;
  const isDueSoon = daysUntilDue <= 2 && daysUntilDue >= 0;

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all duration-200 cursor-pointer group"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {assignment.title}
          </h3>
          <p className="text-sm text-gray-600 mt-1">{assignment.description}</p>
        </div>
        
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          isOverdue 
            ? 'bg-red-50 text-red-700' 
            : isDueSoon 
              ? 'bg-orange-50 text-orange-700'
              : 'bg-green-50 text-green-700'
        }`}>
          {isOverdue ? 'Overdue' : isDueSoon ? 'Due Soon' : 'On Track'}
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Calendar className="h-4 w-4" />
          <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Clock className="h-4 w-4" />
          <span>
            {isOverdue 
              ? `${Math.abs(daysUntilDue)} days overdue`
              : daysUntilDue === 0 
                ? 'Due today'
                : `${daysUntilDue} days remaining`
            }
          </span>
        </div>

        {assignment.attachments.length > 0 && (
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <FileText className="h-4 w-4" />
            <span>{assignment.attachments.length} attachment(s)</span>
          </div>
        )}
      </div>

      {showStats && (
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Users className="h-4 w-4" />
            <span>25 submissions</span>
          </div>
          <div className="text-sm font-medium text-gray-900">
            Max Score: {assignment.maxScore} pts
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignmentCard;