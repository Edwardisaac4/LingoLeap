import { Lesson } from '../types/learning';

export const lessons: Lesson[] = [
  {
    id: 'es-lesson-1',
    unitId: 'es-unit-1',
    title: 'Saying Hello',
    description: 'Learn to say hello and goodbye in Spanish.',
    order: 1,
    goals: [
      'Say hello and goodbye',
      'Ask how someone is doing',
      'Introduce yourself briefly'
    ],
    aiTeacherPrompt: `You are an energetic and encouraging Spanish teacher. 
Your goal is to introduce the student to basic Spanish greetings: "Hola" (Hello), "Adiós" (Goodbye), and "Gracias" (Thank you).
Speak clearly, use simple vocabulary, and ask the student to repeat after you. Keep it simple and interactive!`,
    vocabulary: [
      { id: 'es-voc-1', word: 'Hola', translation: 'Hello', pronunciation: 'oh-lah' },
      { id: 'es-voc-2', word: 'Adiós', translation: 'Goodbye', pronunciation: 'ah-dyos' },
      { id: 'es-voc-3', word: 'Gracias', translation: 'Thank you', pronunciation: 'grah-syas' },
      { id: 'es-voc-4', word: 'Por favor', translation: 'Please', pronunciation: 'por fah-vor' },
    ],
    phrases: [
      { id: 'es-phr-1', text: '¿Cómo estás?', translation: 'How are you?', pronunciation: 'koh-moh es-tahs' },
      { id: 'es-phr-2', text: 'Me llamo...', translation: 'My name is...', pronunciation: 'meh yah-moh' },
    ],
    activities: [
      {
        id: 'es-act-1',
        type: 'vocabulary',
        question: 'How do you say "Hello"?',
        contentId: 'es-voc-1',
        correctAnswer: 'Hola',
        options: ['Hola', 'Adiós', 'Gracias', 'Por favor']
      },
      {
        id: 'es-act-2',
        type: 'phrase',
        question: 'Translate this phrase: "How are you?"',
        contentId: 'es-phr-1',
        correctAnswer: '¿Cómo estás?',
        options: ['¿Cómo estás?', 'Me llamo...', 'Hola', 'Adiós']
      },
      {
        id: 'es-act-3',
        type: 'video_teacher',
        question: 'Practice pronunciation with your AI Teacher',
      }
    ]
  },
  {
    id: 'es-lesson-2',
    unitId: 'es-unit-1',
    title: 'Basic Ordering',
    description: 'Learn how to order water and say please.',
    order: 2,
    goals: [
      'Order a basic item',
      'Be polite with please and thank you'
    ],
    aiTeacherPrompt: `You are a friendly Spanish teacher helping the student learn how to order in a restaurant. 
Introduce "Agua" (Water), "Una mesa" (A table), and practice "Por favor" (Please).`,
    vocabulary: [
      { id: 'es-voc-5', word: 'Agua', translation: 'Water', pronunciation: 'ah-gwah' },
      { id: 'es-voc-6', word: 'Mesa', translation: 'Table', pronunciation: 'meh-sah' },
    ],
    phrases: [
      { id: 'es-phr-3', text: 'Un vaso de agua, por favor', translation: 'A glass of water, please', pronunciation: 'oon bah-soh deh ah-gwah, por fah-vor' },
    ],
    activities: [
      {
        id: 'es-act-4',
        type: 'vocabulary',
        question: 'How do you say "Water"?',
        contentId: 'es-voc-5',
        correctAnswer: 'Agua',
        options: ['Agua', 'Mesa', 'Hola', 'Adiós']
      }
    ]
  },
  {
    id: 'fr-lesson-1',
    unitId: 'fr-unit-1',
    title: 'Bonjour!',
    description: 'Learn basic French greetings.',
    order: 1,
    goals: [
      'Say hello and goodbye',
      'Say thank you'
    ],
    aiTeacherPrompt: `You are a polite French teacher. Introduce the words "Bonjour" (Hello), "Au revoir" (Goodbye), and "Merci" (Thank you). Focus on pronunciation.`,
    vocabulary: [
      { id: 'fr-voc-1', word: 'Bonjour', translation: 'Hello', pronunciation: 'bon-zhoor' },
      { id: 'fr-voc-2', word: 'Au revoir', translation: 'Goodbye', pronunciation: 'oh-ruh-vwahr' },
      { id: 'fr-voc-3', word: 'Merci', translation: 'Thank you', pronunciation: 'mair-see' },
    ],
    phrases: [
      { id: 'fr-phr-1', text: 'Comment ça va?', translation: 'How are you?', pronunciation: 'koh-mohn sah vah' },
    ],
    activities: [
      {
        id: 'fr-act-1',
        type: 'vocabulary',
        question: 'How do you say "Hello"?',
        contentId: 'fr-voc-1',
        correctAnswer: 'Bonjour',
        options: ['Bonjour', 'Au revoir', 'Merci', 'S\'il vous plaît']
      }
    ]
  }
];
