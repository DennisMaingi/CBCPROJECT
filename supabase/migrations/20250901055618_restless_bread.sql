/*
  # Initial CBC Platform Schema

  1. New Tables
    - `institutions` - School/institution information
    - `users` - All platform users (students, teachers, admins, parents)
    - `students` - Student-specific information
    - `teachers` - Teacher-specific information
    - `classes` - Class/grade information
    - `subjects` - CBC subjects
    - `assignments` - Assignment information
    - `submissions` - Student assignment submissions
    - `payments` - School fee payment records
    - `payment_plans` - Fee structure and payment plans

  2. Security
    - Enable RLS on all tables
    - Add policies for role-based access control
    - Secure payment data access

  3. Features
    - User authentication and authorization
    - Payment tracking and management
    - Assignment and submission system
    - Multi-role support (student, teacher, admin, parent)
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Institutions table
CREATE TABLE IF NOT EXISTS institutions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  address text,
  phone text,
  email text,
  admin_id uuid,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Users table (handles all user types)
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  role text NOT NULL CHECK (role IN ('student', 'teacher', 'admin', 'parent')),
  institution_id uuid REFERENCES institutions(id),
  profile_image text,
  phone text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Students table
CREATE TABLE IF NOT EXISTS students (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  admission_number text UNIQUE NOT NULL,
  grade_level text NOT NULL,
  parent_id uuid REFERENCES users(id),
  date_of_birth date,
  address text,
  emergency_contact text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Teachers table
CREATE TABLE IF NOT EXISTS teachers (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  employee_number text UNIQUE NOT NULL,
  subject_specializations text[] DEFAULT '{}',
  assigned_grades text[] DEFAULT '{}',
  qualification text,
  hire_date date DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Classes table
CREATE TABLE IF NOT EXISTS classes (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  grade_level text NOT NULL,
  teacher_id uuid REFERENCES teachers(id),
  institution_id uuid REFERENCES institutions(id),
  academic_year text DEFAULT '2025',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Subjects table
CREATE TABLE IF NOT EXISTS subjects (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  code text NOT NULL,
  color text DEFAULT '#3B82F6',
  grade_levels text[] DEFAULT '{}',
  strands jsonb DEFAULT '[]',
  created_at timestamptz DEFAULT now()
);

-- Assignments table
CREATE TABLE IF NOT EXISTS assignments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  description text,
  teacher_id uuid REFERENCES teachers(id),
  subject_id uuid REFERENCES subjects(id),
  class_id uuid REFERENCES classes(id),
  grade_level text NOT NULL,
  due_date timestamptz NOT NULL,
  max_score integer DEFAULT 100,
  instructions text,
  attachments text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Submissions table
CREATE TABLE IF NOT EXISTS submissions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  assignment_id uuid REFERENCES assignments(id) ON DELETE CASCADE,
  student_id uuid REFERENCES students(id) ON DELETE CASCADE,
  content text,
  attachments text[] DEFAULT '{}',
  score integer,
  feedback text,
  status text DEFAULT 'submitted' CHECK (status IN ('submitted', 'graded', 'late')),
  submitted_at timestamptz DEFAULT now(),
  graded_at timestamptz
);

-- Payment plans table
CREATE TABLE IF NOT EXISTS payment_plans (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  institution_id uuid REFERENCES institutions(id),
  name text NOT NULL,
  grade_level text NOT NULL,
  amount decimal(10,2) NOT NULL,
  currency text DEFAULT 'KES',
  term text NOT NULL CHECK (term IN ('Term 1', 'Term 2', 'Term 3', 'Annual')),
  academic_year text DEFAULT '2025',
  due_date date NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Payments table
CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id uuid REFERENCES students(id) ON DELETE CASCADE,
  payment_plan_id uuid REFERENCES payment_plans(id),
  amount decimal(10,2) NOT NULL,
  currency text DEFAULT 'KES',
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  payment_method text DEFAULT 'mpesa',
  intasend_transaction_id text,
  intasend_payment_id text,
  reference_number text,
  paid_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE institutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for institutions
CREATE POLICY "Users can view their institution"
  ON institutions FOR SELECT
  TO authenticated
  USING (id IN (SELECT institution_id FROM users WHERE id = auth.uid()));

-- RLS Policies for users
CREATE POLICY "Users can view users in their institution"
  ON users FOR SELECT
  TO authenticated
  USING (institution_id IN (SELECT institution_id FROM users WHERE id = auth.uid()));

CREATE POLICY "Users can update their own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (id = auth.uid());

-- RLS Policies for students
CREATE POLICY "Students can view their own data"
  ON students FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Teachers and admins can view students in their institution"
  ON students FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM users u1, users u2 
    WHERE u1.id = auth.uid() 
    AND u2.id = students.user_id 
    AND u1.institution_id = u2.institution_id 
    AND u1.role IN ('teacher', 'admin')
  ));

-- RLS Policies for teachers
CREATE POLICY "Teachers can view their own data"
  ON teachers FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Institution users can view teachers"
  ON teachers FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM users u1, users u2 
    WHERE u1.id = auth.uid() 
    AND u2.id = teachers.user_id 
    AND u1.institution_id = u2.institution_id
  ));

-- RLS Policies for payments
CREATE POLICY "Students can view their own payments"
  ON payments FOR SELECT
  TO authenticated
  USING (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));

CREATE POLICY "Students can insert their own payments"
  ON payments FOR INSERT
  TO authenticated
  WITH CHECK (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));

CREATE POLICY "Admins can view all payments in their institution"
  ON payments FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM users u, students s 
    WHERE u.id = auth.uid() 
    AND u.role = 'admin' 
    AND s.id = payments.student_id 
    AND s.user_id IN (SELECT id FROM users WHERE institution_id = u.institution_id)
  ));

-- RLS Policies for payment plans
CREATE POLICY "Users can view payment plans for their institution"
  ON payment_plans FOR SELECT
  TO authenticated
  USING (institution_id IN (SELECT institution_id FROM users WHERE id = auth.uid()));

-- Insert sample data
INSERT INTO institutions (id, name, address, phone, email) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'Bright Future Academy', 'Nairobi, Kenya', '+254700000000', 'admin@brightfuture.ke');

-- Insert CBC subjects
INSERT INTO subjects (id, name, code, color, grade_levels, strands) VALUES
('lit-001', 'Literacy Activities', 'LIT', '#10B981', ARRAY['PP1', 'PP2', 'Grade 1', 'Grade 2', 'Grade 3'], '[{"id": "listening-speaking", "name": "Listening and Speaking"}, {"id": "reading", "name": "Reading"}]'),
('num-001', 'Numeracy Activities', 'NUM', '#3B82F6', ARRAY['PP1', 'PP2', 'Grade 1', 'Grade 2', 'Grade 3'], '[{"id": "numbers", "name": "Numbers and Operations"}, {"id": "patterns", "name": "Patterns"}]'),
('env-001', 'Environmental Activities', 'ENV', '#059669', ARRAY['PP1', 'PP2', 'Grade 1', 'Grade 2', 'Grade 3'], '[{"id": "living-things", "name": "Living Things"}]'),
('hyg-001', 'Hygiene and Nutrition', 'HYG', '#8B5CF6', ARRAY['PP1', 'PP2', 'Grade 1', 'Grade 2', 'Grade 3'], '[{"id": "personal-hygiene", "name": "Personal Hygiene"}]'),
('cre-001', 'Creative Activities', 'CRE', '#F59E0B', ARRAY['PP1', 'PP2', 'Grade 1', 'Grade 2', 'Grade 3'], '[{"id": "art-craft", "name": "Art and Craft"}]'),
('phy-001', 'Physical Activities', 'PHY', '#EF4444', ARRAY['PP1', 'PP2', 'Grade 1', 'Grade 2', 'Grade 3'], '[{"id": "movement", "name": "Movement and Games"}]');

-- Insert payment plans
INSERT INTO payment_plans (institution_id, name, grade_level, amount, term, due_date, description) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'PP1 Term 1 Fees', 'PP1', 15000.00, 'Term 1', '2025-02-15', 'Pre-Primary 1 school fees for Term 1 2025'),
('550e8400-e29b-41d4-a716-446655440000', 'PP2 Term 1 Fees', 'PP2', 16000.00, 'Term 1', '2025-02-15', 'Pre-Primary 2 school fees for Term 1 2025'),
('550e8400-e29b-41d4-a716-446655440000', 'Grade 1 Term 1 Fees', 'Grade 1', 18000.00, 'Term 1', '2025-02-15', 'Grade 1 school fees for Term 1 2025'),
('550e8400-e29b-41d4-a716-446655440000', 'Grade 2 Term 1 Fees', 'Grade 2', 18000.00, 'Term 1', '2025-02-15', 'Grade 2 school fees for Term 1 2025'),
('550e8400-e29b-41d4-a716-446655440000', 'Grade 3 Term 1 Fees', 'Grade 3', 20000.00, 'Term 1', '2025-02-15', 'Grade 3 school fees for Term 1 2025');