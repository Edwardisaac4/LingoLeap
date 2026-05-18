import { ImageSourcePropType } from "react-native";

export type Language = {
  id: string;
  name: string;
  nativeName: string;
  flagEmoji?: string;
  flag: ImageSourcePropType; // Centralized image import reference
};

export type Unit = {
  id: string;
  languageId: string; // references Language.id
  title: string;
  description: string;
  order: number;
  bannerImage?: any; // Custom illustration for unit header banner
};

export type VocabularyItem = {
  id: string;
  word: string;
  translation: string;
  pronunciation?: string;
};

export type PhraseItem = {
  id: string;
  text: string;
  translation: string;
  pronunciation?: string;
};

export type ActivityType = 'vocabulary' | 'phrase' | 'listen' | 'chat' | 'video_teacher';

export type Activity = {
  id: string;
  type: ActivityType;
  question: string;
  contentId?: string; // Reference to VocabularyItem or PhraseItem if applicable
  correctAnswer?: string;
  options?: string[]; // For multiple choice
};

export type Lesson = {
  id: string;
  unitId: string; // references Unit.id
  title: string;
  description: string;
  order: number;
  goals: string[]; // e.g., ["Say hello", "Introduce yourself"]
  aiTeacherPrompt: string; // For future audio-based Vision Agent lessons
  vocabulary: VocabularyItem[];
  phrases: PhraseItem[];
  activities: Activity[];
  image?: any; // Custom icon/image on the right of the lesson card (e.g. cafe table)
};
