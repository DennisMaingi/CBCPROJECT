import { CBCSubject } from '../types';

export const CBC_SUBJECTS: CBCSubject[] = [
  {
    id: 'literacy',
    name: 'Literacy Activities',
    code: 'LIT',
    color: '#10B981',
    icon: 'BookOpen',
    strands: [
      {
        id: 'listening-speaking',
        name: 'Listening and Speaking',
        subStrands: ['Listening Skills', 'Speaking Skills', 'Conversation Skills'],
        learningOutcomes: ['Express themselves clearly', 'Listen attentively', 'Engage in conversations']
      },
      {
        id: 'reading',
        name: 'Reading',
        subStrands: ['Pre-reading Skills', 'Reading Skills', 'Reading Comprehension'],
        learningOutcomes: ['Recognize letters and sounds', 'Read simple texts', 'Understand what they read']
      }
    ]
  },
  {
    id: 'numeracy',
    name: 'Numeracy Activities',
    code: 'NUM',
    color: '#3B82F6',
    icon: 'Calculator',
    strands: [
      {
        id: 'numbers',
        name: 'Numbers and Number Operations',
        subStrands: ['Number Recognition', 'Counting', 'Basic Operations'],
        learningOutcomes: ['Count objects accurately', 'Recognize number symbols', 'Perform simple calculations']
      },
      {
        id: 'patterns',
        name: 'Patterns and Algebra',
        subStrands: ['Pattern Recognition', 'Sequencing', 'Simple Algebra'],
        learningOutcomes: ['Identify patterns', 'Create sequences', 'Solve simple equations']
      }
    ]
  },
  {
    id: 'environmental',
    name: 'Environmental Activities',
    code: 'ENV',
    color: '#059669',
    icon: 'Leaf',
    strands: [
      {
        id: 'living-things',
        name: 'Living and Non-living Things',
        subStrands: ['Plants', 'Animals', 'Human Body'],
        learningOutcomes: ['Classify living things', 'Understand basic needs', 'Care for environment']
      }
    ]
  },
  {
    id: 'hygiene',
    name: 'Hygiene and Nutrition',
    code: 'HYG',
    color: '#8B5CF6',
    icon: 'Heart',
    strands: [
      {
        id: 'personal-hygiene',
        name: 'Personal Hygiene',
        subStrands: ['Body Cleanliness', 'Dental Care', 'Hand Washing'],
        learningOutcomes: ['Practice good hygiene', 'Maintain oral health', 'Prevent diseases']
      }
    ]
  },
  {
    id: 'creative',
    name: 'Creative Activities',
    code: 'CRE',
    color: '#F59E0B',
    icon: 'Palette',
    strands: [
      {
        id: 'art-craft',
        name: 'Art and Craft',
        subStrands: ['Drawing', 'Modeling', 'Paper Work'],
        learningOutcomes: ['Express creativity', 'Develop fine motor skills', 'Appreciate art']
      }
    ]
  },
  {
    id: 'physical',
    name: 'Physical Activities',
    code: 'PHY',
    color: '#EF4444',
    icon: 'Zap',
    strands: [
      {
        id: 'movement',
        name: 'Movement and Games',
        subStrands: ['Basic Movements', 'Ball Games', 'Traditional Games'],
        learningOutcomes: ['Develop motor skills', 'Follow game rules', 'Work in teams']
      }
    ]
  }
];

export const GRADE_LEVELS = [
  'PP1', 'PP2', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9'
];