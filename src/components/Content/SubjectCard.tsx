import React from 'react';
import { CBCSubject } from '../../types';
import { BookOpen, Users, Clock } from 'lucide-react';

interface SubjectCardProps {
  subject: CBCSubject;
  studentCount?: number;
  contentCount?: number;
  onClick: () => void;
}

const SubjectCard: React.FC<SubjectCardProps> = ({ 
  subject, 
  studentCount = 0, 
  contentCount = 0, 
  onClick 
}) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all duration-300 cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-4">
        <div 
          className="p-3 rounded-lg"
          style={{ backgroundColor: `${subject.color}15` }}
        >
          <BookOpen className="h-6 w-6" style={{ color: subject.color }} />
        </div>
        <span 
          className="text-xs font-medium px-2 py-1 rounded-full"
          style={{ backgroundColor: `${subject.color}15`, color: subject.color }}
        >
          {subject.code}
        </span>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
        {subject.name}
      </h3>

      <p className="text-sm text-gray-600 mb-4">
        {subject.strands.length} learning strands available
      </p>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-1">
          <Users className="h-4 w-4" />
          <span>{studentCount} students</span>
        </div>
        <div className="flex items-center space-x-1">
          <Clock className="h-4 w-4" />
          <span>{contentCount} resources</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex flex-wrap gap-2">
          {subject.strands.slice(0, 2).map((strand) => (
            <span
              key={strand.id}
              className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
            >
              {strand.name}
            </span>
          ))}
          {subject.strands.length > 2 && (
            <span className="text-xs text-gray-500">
              +{subject.strands.length - 2} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubjectCard;