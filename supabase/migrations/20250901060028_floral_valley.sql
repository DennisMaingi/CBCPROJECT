/*
  # Insert Sample Data

  1. Sample Users
    - 20 students across different grades
    - 5 teachers with various specializations
    - Sample admin user

  2. Sample Data
    - Student records with admission numbers
    - Teacher records with employee numbers
    - Sample assignments and submissions
*/

-- Insert sample admin user
INSERT INTO users (id, email, name, role, institution_id, phone) VALUES
('admin-001', 'admin@brightfuture.ke', 'Samuel Kiprop', 'admin', '550e8400-e29b-41d4-a716-446655440000', '+254700000001')
ON CONFLICT (email) DO NOTHING;

-- Insert sample teachers
INSERT INTO users (id, email, name, role, institution_id, phone) VALUES
('teacher-001', 'mary.wanjiku@teacher.ke', 'Mary Wanjiku', 'teacher', '550e8400-e29b-41d4-a716-446655440000', '+254700000002'),
('teacher-002', 'james.ochieng@teacher.ke', 'James Ochieng', 'teacher', '550e8400-e29b-41d4-a716-446655440000', '+254700000003'),
('teacher-003', 'grace.muthoni@teacher.ke', 'Grace Muthoni', 'teacher', '550e8400-e29b-41d4-a716-446655440000', '+254700000004'),
('teacher-004', 'paul.kiprotich@teacher.ke', 'Paul Kiprotich', 'teacher', '550e8400-e29b-41d4-a716-446655440000', '+254700000005'),
('teacher-005', 'susan.akinyi@teacher.ke', 'Susan Akinyi', 'teacher', '550e8400-e29b-41d4-a716-446655440000', '+254700000006')
ON CONFLICT (email) DO NOTHING;

-- Insert teacher records
INSERT INTO teachers (id, user_id, employee_number, subject_specializations, assigned_grades) VALUES
('teach-001', 'teacher-001', 'EMP001', ARRAY['Literacy', 'Environmental'], ARRAY['Grade 1', 'Grade 2']),
('teach-002', 'teacher-002', 'EMP002', ARRAY['Numeracy', 'Physical'], ARRAY['Grade 2', 'Grade 3']),
('teach-003', 'teacher-003', 'EMP003', ARRAY['Creative', 'Hygiene'], ARRAY['PP1', 'PP2']),
('teach-004', 'teacher-004', 'EMP004', ARRAY['Literacy', 'Numeracy'], ARRAY['Grade 1', 'Grade 3']),
('teach-005', 'teacher-005', 'EMP005', ARRAY['Environmental', 'Creative'], ARRAY['PP2', 'Grade 1'])
ON CONFLICT (employee_number) DO NOTHING;

-- Insert sample students
INSERT INTO users (id, email, name, role, institution_id, phone) VALUES
('student-001', 'john.kamau@student.ke', 'John Kamau', 'student', '550e8400-e29b-41d4-a716-446655440000', '+254700001001'),
('student-002', 'mary.akinyi@student.ke', 'Mary Akinyi', 'student', '550e8400-e29b-41d4-a716-446655440000', '+254700001002'),
('student-003', 'peter.mwangi@student.ke', 'Peter Mwangi', 'student', '550e8400-e29b-41d4-a716-446655440000', '+254700001003'),
('student-004', 'grace.wanjiru@student.ke', 'Grace Wanjiru', 'student', '550e8400-e29b-41d4-a716-446655440000', '+254700001004'),
('student-005', 'david.ochieng@student.ke', 'David Ochieng', 'student', '550e8400-e29b-41d4-a716-446655440000', '+254700001005'),
('student-006', 'sarah.mutua@student.ke', 'Sarah Mutua', 'student', '550e8400-e29b-41d4-a716-446655440000', '+254700001006'),
('student-007', 'james.kiprop@student.ke', 'James Kiprop', 'student', '550e8400-e29b-41d4-a716-446655440000', '+254700001007'),
('student-008', 'faith.nyong@student.ke', 'Faith Nyong', 'student', '550e8400-e29b-41d4-a716-446655440000', '+254700001008'),
('student-009', 'michael.otieno@student.ke', 'Michael Otieno', 'student', '550e8400-e29b-41d4-a716-446655440000', '+254700001009'),
('student-010', 'lucy.wambui@student.ke', 'Lucy Wambui', 'student', '550e8400-e29b-41d4-a716-446655440000', '+254700001010'),
('student-011', 'daniel.kiprotich@student.ke', 'Daniel Kiprotich', 'student', '550e8400-e29b-41d4-a716-446655440000', '+254700001011'),
('student-012', 'esther.muthoni@student.ke', 'Esther Muthoni', 'student', '550e8400-e29b-41d4-a716-446655440000', '+254700001012'),
('student-013', 'samuel.njoroge@student.ke', 'Samuel Njoroge', 'student', '550e8400-e29b-41d4-a716-446655440000', '+254700001013'),
('student-014', 'rebecca.chebet@student.ke', 'Rebecca Chebet', 'student', '550e8400-e29b-41d4-a716-446655440000', '+254700001014'),
('student-015', 'kevin.macharia@student.ke', 'Kevin Macharia', 'student', '550e8400-e29b-41d4-a716-446655440000', '+254700001015'),
('student-016', 'mercy.wanjiku@student.ke', 'Mercy Wanjiku', 'student', '550e8400-e29b-41d4-a716-446655440000', '+254700001016'),
('student-017', 'brian.kiptoo@student.ke', 'Brian Kiptoo', 'student', '550e8400-e29b-41d4-a716-446655440000', '+254700001017'),
('student-018', 'priscilla.auma@student.ke', 'Priscilla Auma', 'student', '550e8400-e29b-41d4-a716-446655440000', '+254700001018'),
('student-019', 'victor.maina@student.ke', 'Victor Maina', 'student', '550e8400-e29b-41d4-a716-446655440000', '+254700001019'),
('student-020', 'joyce.kemunto@student.ke', 'Joyce Kemunto', 'student', '550e8400-e29b-41d4-a716-446655440000', '+254700001020')
ON CONFLICT (email) DO NOTHING;

-- Insert student records
INSERT INTO students (id, user_id, admission_number, grade_level) VALUES
('stud-001', 'student-001', 'ADM001', 'Grade 3'),
('stud-002', 'student-002', 'ADM002', 'Grade 2'),
('stud-003', 'student-003', 'ADM003', 'Grade 1'),
('stud-004', 'student-004', 'ADM004', 'PP2'),
('stud-005', 'student-005', 'ADM005', 'Grade 3'),
('stud-006', 'student-006', 'ADM006', 'Grade 2'),
('stud-007', 'student-007', 'ADM007', 'Grade 1'),
('stud-008', 'student-008', 'ADM008', 'PP1'),
('stud-009', 'student-009', 'ADM009', 'Grade 3'),
('stud-010', 'student-010', 'ADM010', 'Grade 2'),
('stud-011', 'student-011', 'ADM011', 'Grade 1'),
('stud-012', 'student-012', 'ADM012', 'PP2'),
('stud-013', 'student-013', 'ADM013', 'Grade 3'),
('stud-014', 'student-014', 'ADM014', 'Grade 2'),
('stud-015', 'student-015', 'ADM015', 'Grade 1'),
('stud-016', 'student-016', 'ADM016', 'PP1'),
('stud-017', 'student-017', 'ADM017', 'Grade 3'),
('stud-018', 'student-018', 'ADM018', 'Grade 2'),
('stud-019', 'student-019', 'ADM019', 'Grade 1'),
('stud-020', 'student-020', 'ADM020', 'PP2')
ON CONFLICT (admission_number) DO NOTHING;

-- Insert sample classes
INSERT INTO classes (id, name, grade_level, teacher_id, institution_id) VALUES
('class-001', 'Grade 3A', 'Grade 3', 'teach-001', '550e8400-e29b-41d4-a716-446655440000'),
('class-002', 'Grade 2A', 'Grade 2', 'teach-002', '550e8400-e29b-41d4-a716-446655440000'),
('class-003', 'Grade 1A', 'Grade 1', 'teach-004', '550e8400-e29b-41d4-a716-446655440000'),
('class-004', 'PP2A', 'PP2', 'teach-003', '550e8400-e29b-41d4-a716-446655440000'),
('class-005', 'PP1A', 'PP1', 'teach-005', '550e8400-e29b-41d4-a716-446655440000')
ON CONFLICT (id) DO NOTHING;

-- Insert sample assignments
INSERT INTO assignments (id, title, description, teacher_id, subject_id, grade_level, due_date, max_score) VALUES
('assign-001', 'Reading Comprehension Exercise', 'Read the story and answer questions', 'teach-001', 'lit-001', 'Grade 3', '2025-01-25', 20),
('assign-002', 'Number Patterns Worksheet', 'Complete the number pattern exercises', 'teach-002', 'num-001', 'Grade 2', 'Grade 2', 15),
('assign-003', 'Plant Growth Observation', 'Observe and record plant growth over one week', 'teach-004', 'env-001', 'Grade 1', '2025-01-30', 25)
ON CONFLICT (id) DO NOTHING;