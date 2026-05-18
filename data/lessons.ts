import { Lesson } from '../types/learning';
import { images } from '@/constants/images';

export const lessons: Lesson[] = [
  // ── SPANISH UNIT 1 LESSONS (RETRO-COMPATIBILITY) ───────────────────────────
  {
    id: 'es-lesson-1',
    unitId: 'es-unit-1',
    title: 'Saying Hello',
    description: 'Learn to say hello and goodbye in Spanish.',
    order: 1,
    goals: ['Say hello and goodbye', 'Ask how someone is doing', 'Introduce yourself briefly'],
    aiTeacherPrompt: 'Introduce basic greetings: Hola, Adiós, Gracias.',
    vocabulary: [
      { id: 'es-voc-1', word: 'Hola', translation: 'Hello', pronunciation: 'oh-lah' },
      { id: 'es-voc-2', word: 'Adiós', translation: 'Goodbye', pronunciation: 'ah-dyos' },
    ],
    phrases: [
      { id: 'es-phr-1', text: '¿Cómo estás?', translation: 'How are you?', pronunciation: 'koh-moh es-tahs' },
    ],
    activities: [
      {
        id: 'es-act-1',
        type: 'vocabulary',
        question: 'How do you say "Hello"?',
        contentId: 'es-voc-1',
        correctAnswer: 'Hola',
        options: ['Hola', 'Adiós']
      }
    ]
  },
  {
    id: 'es-lesson-2',
    unitId: 'es-unit-1',
    title: 'Basic Ordering',
    description: 'Learn how to order water and say please.',
    order: 2,
    goals: ['Order a basic item', 'Be polite with please and thank you'],
    aiTeacherPrompt: 'Introduce restaurant vocabulary like Agua and Mesa.',
    vocabulary: [
      { id: 'es-voc-5', word: 'Agua', translation: 'Water', pronunciation: 'ah-gwah' },
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
        options: ['Agua', 'Mesa']
      }
    ]
  },

  // ── SPANISH UNIT 3 LESSONS (MATCHING DESIGN REFERENCE EXACTLY) ─────────────
  {
    id: 'es-u3-lesson-1',
    unitId: 'es-unit-3',
    title: 'Greetings & Introductions',
    description: 'Master introducing yourself in social settings.',
    order: 1,
    goals: ['Introduce yourself to others', 'Ask about someone\'s day'],
    aiTeacherPrompt: 'Practice introducing yourself at a social gathering.',
    vocabulary: [
      { id: 'es-u3-voc-1', word: 'Mucho gusto', translation: 'Nice to meet you', pronunciation: 'moo-choh goos-toh' },
    ],
    phrases: [
      { id: 'es-u3-phr-1', text: '¿Cómo te llamas?', translation: 'What is your name?', pronunciation: 'koh-moh teh yah-mahs' },
    ],
    activities: []
  },
  {
    id: 'es-u3-lesson-2',
    unitId: 'es-unit-3',
    title: 'Daily Life',
    description: 'Talk about your routine and hobbies.',
    order: 2,
    goals: ['Describe standard hobbies', 'Explain what you do every day'],
    aiTeacherPrompt: 'Discuss standard daily routines.',
    vocabulary: [
      { id: 'es-u3-voc-2', word: 'Rutina', translation: 'Routine', pronunciation: 'roo-tee-nah' },
    ],
    phrases: [],
    activities: []
  },
  {
    id: 'es-u3-lesson-3',
    unitId: 'es-unit-3',
    title: 'At the Café',
    description: 'Learn how to order custom coffee drinks and pastries.',
    order: 3,
    goals: ['Order espresso or latte', 'Inquire about available pastries'],
    aiTeacherPrompt: 'Be a polite waiter or customer in an outdoor café in Madrid.',
    vocabulary: [
      { id: 'es-u3-voc-3', word: 'Café', translation: 'Coffee', pronunciation: 'cah-feh' },
      { id: 'es-u3-voc-4', word: 'Croissant', translation: 'Croissant', pronunciation: 'crwah-sahn' },
    ],
    phrases: [
      { id: 'es-u3-phr-2', text: 'Quiero un café con leche', translation: 'I want a coffee with milk', pronunciation: 'kye-roh oon cah-feh cohn leh-cheh' },
    ],
    activities: [],
    image: images.cafeTableIcon // Custom café table illustration on the right
  },
  {
    id: 'es-u3-lesson-4',
    unitId: 'es-unit-3',
    title: 'Travel & Directions',
    description: 'Find your way around a new city.',
    order: 4,
    goals: ['Ask for directions to the station', 'Read subway maps'],
    aiTeacherPrompt: 'Help a traveler locate their hotel in Barcelona.',
    vocabulary: [
      { id: 'es-u3-voc-5', word: 'Calle', translation: 'Street', pronunciation: 'cah-yeh' },
    ],
    phrases: [],
    activities: []
  },
  {
    id: 'es-u3-lesson-5',
    unitId: 'es-unit-3',
    title: 'Shopping',
    description: 'Purchase items at local stores and handle currencies.',
    order: 5,
    goals: ['Ask for prices', 'Say if something is too expensive'],
    aiTeacherPrompt: 'Navigate a local market transaction.',
    vocabulary: [
      { id: 'es-u3-voc-6', word: 'Precio', translation: 'Price', pronunciation: 'preh-syoh' },
    ],
    phrases: [],
    activities: []
  },
  {
    id: 'es-u3-lesson-6',
    unitId: 'es-unit-3',
    title: 'Family & Friends',
    description: 'Describe relationships and describe loved ones.',
    order: 6,
    goals: ['Talk about family members', 'Describe characteristics of friends'],
    aiTeacherPrompt: 'Practice sharing photos of family and describing them.',
    vocabulary: [
      { id: 'es-u3-voc-7', word: 'Familia', translation: 'Family', pronunciation: 'fah-mee-lyah' },
    ],
    phrases: [],
    activities: []
  },

  // ── FRENCH UNIT 1 LESSONS (6 LESSONS) ───────────────────────────────────────
  {
    id: 'fr-lesson-1',
    unitId: 'fr-unit-1',
    title: 'Bonjour!',
    description: 'Learn basic French greetings.',
    order: 1,
    goals: ['Say hello', 'Polite farewells'],
    aiTeacherPrompt: 'French teacher. Focus on "Bonjour" and "Au revoir".',
    vocabulary: [{ id: 'fr-voc-1', word: 'Bonjour', translation: 'Hello' }],
    phrases: [],
    activities: []
  },
  {
    id: 'fr-lesson-2',
    unitId: 'fr-unit-1',
    title: 'My Name Is...',
    description: 'Learn to introduce yourself in French.',
    order: 2,
    goals: ['State name', 'Ask others their name'],
    aiTeacherPrompt: 'Teach "Je m\'appelle".',
    vocabulary: [],
    phrases: [{ id: 'fr-phr-1', text: 'Je m\'appelle Marie', translation: 'My name is Marie' }],
    activities: []
  },
  {
    id: 'fr-lesson-3',
    unitId: 'fr-unit-1',
    title: 'At the Bistro',
    description: 'Order food and coffee in French cafes.',
    order: 3,
    goals: ['Order a croissant', 'Ask for the bill'],
    aiTeacherPrompt: 'Bistro restaurant scenarios.',
    vocabulary: [{ id: 'fr-voc-2', word: 'Café', translation: 'Coffee' }],
    phrases: [],
    activities: [],
    image: images.cafeTableIcon // Custom icon
  },
  {
    id: 'fr-lesson-4',
    unitId: 'fr-unit-1',
    title: 'Counting 1 to 10',
    description: 'Master basic French numbers.',
    order: 4,
    goals: ['Count to 10', 'State phone numbers'],
    aiTeacherPrompt: 'Teach French numbers.',
    vocabulary: [],
    phrases: [],
    activities: []
  },
  {
    id: 'fr-lesson-5',
    unitId: 'fr-unit-1',
    title: 'Daily Rhythms',
    description: 'Discuss schedules and hobbies.',
    order: 5,
    goals: ['Discuss morning habits', 'Tell basic time'],
    aiTeacherPrompt: 'Daily routines.',
    vocabulary: [],
    phrases: [],
    activities: []
  },
  {
    id: 'fr-lesson-6',
    unitId: 'fr-unit-1',
    title: 'Review & Wrap-up',
    description: 'Check your knowledge on Unit 1.',
    order: 6,
    goals: ['Consolidate greetings', 'Consolidate bistro vocabulary'],
    aiTeacherPrompt: 'Review of Unit 1.',
    vocabulary: [],
    phrases: [],
    activities: []
  },

  // ── JAPANESE UNIT 1 LESSONS (6 LESSONS) ─────────────────────────────────────
  {
    id: 'ja-lesson-1',
    unitId: 'ja-unit-1',
    title: 'Vowels: A, I, U, E, O',
    description: 'Learn the first Hiragana vowels.',
    order: 1,
    goals: ['Recognize あ, い, う, え, お', 'Pronounce correctly'],
    aiTeacherPrompt: 'Japanese vowels teaching.',
    vocabulary: [{ id: 'ja-voc-1', word: 'こんにちは', translation: 'Hello' }],
    phrases: [],
    activities: []
  },
  {
    id: 'ja-lesson-2',
    unitId: 'ja-unit-1',
    title: 'Ka, Ki, Ku, Ke, Ko',
    description: 'Learn the K-row characters.',
    order: 2,
    goals: ['Recognize か, き, く, け, こ'],
    aiTeacherPrompt: 'Teach K-row Hiragana.',
    vocabulary: [],
    phrases: [],
    activities: []
  },
  {
    id: 'ja-lesson-3',
    unitId: 'ja-unit-1',
    title: 'At the Cafe',
    description: 'Ordering sushi, green tea, or coffee.',
    order: 3,
    goals: ['Order tea or coffee', 'Say thank you politely'],
    aiTeacherPrompt: 'Ordering items in Tokyo cafes.',
    vocabulary: [{ id: 'ja-voc-2', word: 'お茶', translation: 'Green tea' }],
    phrases: [],
    activities: [],
    image: images.cafeTableIcon
  },
  {
    id: 'ja-lesson-4',
    unitId: 'ja-unit-1',
    title: 'Sa, Shi, Su, Se, So',
    description: 'Learn the S-row characters.',
    order: 4,
    goals: ['Recognize さ, し, す, せ, そ'],
    aiTeacherPrompt: 'S-row characters.',
    vocabulary: [],
    phrases: [],
    activities: []
  },
  {
    id: 'ja-lesson-5',
    unitId: 'ja-unit-1',
    title: 'Introducing Yourself',
    description: 'Say your name and occupation.',
    order: 5,
    goals: ['Introduce self', 'Use polite endings like です'],
    aiTeacherPrompt: 'State name using Hajimemashite.',
    vocabulary: [],
    phrases: [],
    activities: []
  },
  {
    id: 'ja-lesson-6',
    unitId: 'ja-unit-1',
    title: 'Unit Review',
    description: 'Interactive quiz on Hiragana and basic phrases.',
    order: 6,
    goals: ['Verify Hiragana recognition', 'Greetings review'],
    aiTeacherPrompt: 'Quiz format greetings review.',
    vocabulary: [],
    phrases: [],
    activities: []
  },

  // ── GERMAN UNIT 1 LESSONS (6 LESSONS) ───────────────────────────────────────
  {
    id: 'de-lesson-1',
    unitId: 'de-unit-1',
    title: 'Willkommen!',
    description: 'Learn basic German greetings.',
    order: 1,
    goals: ['Say hello', 'Say goodbye'],
    aiTeacherPrompt: 'Teach Hallo, Tschüss, Danke.',
    vocabulary: [{ id: 'de-voc-1', word: 'Hallo', translation: 'Hello' }],
    phrases: [],
    activities: []
  },
  {
    id: 'de-lesson-2',
    unitId: 'de-unit-1',
    title: 'Wer bist du?',
    description: 'Introduce yourself and ask names.',
    order: 2,
    goals: ['Ask who someone is', 'State name'],
    aiTeacherPrompt: 'Teach Ich heiße.',
    vocabulary: [],
    phrases: [],
    activities: []
  },
  {
    id: 'de-lesson-3',
    unitId: 'de-unit-1',
    title: 'Kaffee und Kuchen',
    description: 'Experience German cafe culture.',
    order: 3,
    goals: ['Order coffee', 'Order cake'],
    aiTeacherPrompt: 'Vienna/Berlin cafe scenarios.',
    vocabulary: [],
    phrases: [],
    activities: [],
    image: images.cafeTableIcon
  },
  {
    id: 'de-lesson-4',
    unitId: 'de-unit-1',
    title: 'Numbers 1 to 10',
    description: 'Count in German from one to ten.',
    order: 4,
    goals: ['Count correctly'],
    aiTeacherPrompt: 'Teach numbers.',
    vocabulary: [],
    phrases: [],
    activities: []
  },
  {
    id: 'de-lesson-5',
    unitId: 'de-unit-1',
    title: 'Where do you live?',
    description: 'Talk about origins and cities.',
    order: 5,
    goals: ['Ask "Woher kommst du?"', 'State city of residence'],
    aiTeacherPrompt: 'Discuss origins.',
    vocabulary: [],
    phrases: [],
    activities: []
  },
  {
    id: 'de-lesson-6',
    unitId: 'de-unit-1',
    title: 'German Basics Review',
    description: 'Review greetings and basic ordering.',
    order: 6,
    goals: ['Consolidate basics'],
    aiTeacherPrompt: 'Basics review.',
    vocabulary: [],
    phrases: [],
    activities: []
  },

  // ── ITALIAN UNIT 1 LESSONS (6 LESSONS) ──────────────────────────────────────
  {
    id: 'it-lesson-1',
    unitId: 'it-unit-1',
    title: 'Ciao! Ciao!',
    description: 'Learn basic Italian greetings.',
    order: 1,
    goals: ['Say hello', 'Say goodbye'],
    aiTeacherPrompt: 'Teach Ciao, Buongiorno, Arrivederci.',
    vocabulary: [{ id: 'it-voc-1', word: 'Ciao', translation: 'Hello/Goodbye' }],
    phrases: [],
    activities: []
  },
  {
    id: 'it-lesson-2',
    unitId: 'it-unit-1',
    title: 'Come ti chiami?',
    description: 'Introduce yourself in Italian.',
    order: 2,
    goals: ['State name', 'Ask other names'],
    aiTeacherPrompt: 'Teach "Mi chiamo".',
    vocabulary: [],
    phrases: [],
    activities: []
  },
  {
    id: 'it-lesson-3',
    unitId: 'it-unit-1',
    title: 'Al Bar',
    description: 'Order espresso and cornetto in an Italian bar.',
    order: 3,
    goals: ['Order espresso', 'Order cornetto'],
    aiTeacherPrompt: 'Italian bar scenarios.',
    vocabulary: [],
    phrases: [],
    activities: [],
    image: images.cafeTableIcon
  },
  {
    id: 'it-lesson-4',
    unitId: 'it-unit-1',
    title: 'Italian Numbers',
    description: 'Count from uno to dieci.',
    order: 4,
    goals: ['Count up to ten'],
    aiTeacherPrompt: 'Teach numbers.',
    vocabulary: [],
    phrases: [],
    activities: []
  },
  {
    id: 'it-lesson-5',
    unitId: 'it-unit-1',
    title: 'Daily Routines',
    description: 'Discuss routine and free time.',
    order: 5,
    goals: ['Discuss simple actions', 'Tell basic times'],
    aiTeacherPrompt: 'Daily routines.',
    vocabulary: [],
    phrases: [],
    activities: []
  },
  {
    id: 'it-lesson-6',
    unitId: 'it-unit-1',
    title: 'Basics Review',
    description: 'Wrap-up and test your knowledge of Italian Unit 1.',
    order: 6,
    goals: ['Ensure high retention of basics'],
    aiTeacherPrompt: 'Basics review.',
    vocabulary: [],
    phrases: [],
    activities: []
  },

  // ── PORTUGUESE UNIT 1 LESSONS (6 LESSONS) ───────────────────────────────────
  {
    id: 'pt-lesson-1',
    unitId: 'pt-unit-1',
    title: 'Olá!',
    description: 'Learn basic Portuguese greetings.',
    order: 1,
    goals: ['Say hello', 'Say goodbye'],
    aiTeacherPrompt: 'Teach Olá, Tchau, Obrigado.',
    vocabulary: [{ id: 'pt-voc-1', word: 'Olá', translation: 'Hello' }],
    phrases: [],
    activities: []
  },
  {
    id: 'pt-lesson-2',
    unitId: 'pt-unit-1',
    title: 'Como se chama?',
    description: 'Introduce yourself in Portuguese.',
    order: 2,
    goals: ['Introduce self', 'Ask others names'],
    aiTeacherPrompt: 'Teach "Me chamo".',
    vocabulary: [],
    phrases: [],
    activities: []
  },
  {
    id: 'pt-lesson-3',
    unitId: 'pt-unit-1',
    title: 'No Café',
    description: 'Order café and pão de queijo.',
    order: 3,
    goals: ['Order small coffee', 'Order local snacks'],
    aiTeacherPrompt: 'Brazilian/Portuguese bakery scenarios.',
    vocabulary: [],
    phrases: [],
    activities: [],
    image: images.cafeTableIcon
  },
  {
    id: 'pt-lesson-4',
    unitId: 'pt-unit-1',
    title: 'Count to Ten',
    description: 'Learn numbers 1 to 10 in Portuguese.',
    order: 4,
    goals: ['Count up to ten'],
    aiTeacherPrompt: 'Teach numbers.',
    vocabulary: [],
    phrases: [],
    activities: []
  },
  {
    id: 'pt-lesson-5',
    unitId: 'pt-unit-1',
    title: 'My Day',
    description: 'Talk about typical day-to-day hobbies.',
    order: 5,
    goals: ['Talk about what you do', 'Say what you like'],
    aiTeacherPrompt: 'Daily routines.',
    vocabulary: [],
    phrases: [],
    activities: []
  },
  {
    id: 'pt-lesson-6',
    unitId: 'pt-unit-1',
    title: 'Unit 1 Wrap-up',
    description: 'Test your understanding of Portuguese basics.',
    order: 6,
    goals: ['Consolidate basics'],
    aiTeacherPrompt: 'Basics review.',
    vocabulary: [],
    phrases: [],
    activities: []
  },
];
