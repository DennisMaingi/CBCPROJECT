export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin' | 'parent';
  institutionId: string;
  profileImage?: string;
}

export interface Student extends User {
  gradeLevel: string;
  parentContact: string;
  cbcProfile: {
    subjects: string[];
    currentStrand: string;
    performanceData: Record<string, number>;
  };
}

export interface Teacher extends User {
  subjectSpecialization: string[];
  assignedGrades: string[];
}

export interface Institution {
  id: string;
  name: string;
  adminId: string;
  address: string;
  contacts: string[];
}

export interface Content {
  id: string;
  title: string;
  subject: string;
  gradeLevel: string;
  strand: string;
  subStrand?: string;
  type: 'video' | 'text' | 'quiz' | 'interactive';
  description: string;
  filePath?: string;
  createdBy: string;
  createdAt: Date;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  teacherId: string;
  subjectId: string;
  gradeLevel: string;
  dueDate: Date;
  attachments: string[];
  maxScore: number;
  instructions: string;
  createdAt: Date;
}

export interface Submission {
  id: string;
  assignmentId: string;
  studentId: string;
  content: string;
  attachments: string[];
  submittedAt: Date;
  score?: number;
  feedback?: string;
  status: 'submitted' | 'graded' | 'late';
}

export interface CBCSubject {
  id: string;
  name: string;
  code: string;
  color: string;
  icon: string;
  strands: CBCStrand[];
}

export interface CBCStrand {
  id: string;
  name: string;
  subStrands: string[];
  learningOutcomes: string[];
}