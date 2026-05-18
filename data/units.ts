import { Unit } from '../types/learning';
import { images } from '@/constants/images';

export const units: Unit[] = [
  // ── SPANISH UNITS ──────────────────────────────────────────────────────────
  {
    id: 'es-unit-1',
    languageId: 'es',
    title: 'Unit 1: Basics',
    description: 'Learn basic greetings, introductions, and essential phrases.',
    order: 1,
    bannerImage: images.palace,
  },
  {
    id: 'es-unit-2',
    languageId: 'es',
    title: 'Unit 2: Travel',
    description: 'Learn how to ask for directions and order food.',
    order: 2,
    bannerImage: images.earth,
  },
  {
    id: 'es-unit-3',
    languageId: 'es',
    title: 'Unit 3: At the Café',
    description: 'Master coffee shop conversations and casual ordering.',
    order: 3,
    bannerImage: images.cafeUnitHeader,
  },

  // ── FRENCH UNITS ───────────────────────────────────────────────────────────
  {
    id: 'fr-unit-1',
    languageId: 'fr',
    title: 'Unit 1: Basics',
    description: 'Learn basic French greetings, introductions, and numbers.',
    order: 1,
    bannerImage: images.cafeUnitHeader, // Use cafeUnitHeader as fallback
  },

  // ── JAPANESE UNITS ─────────────────────────────────────────────────────────
  {
    id: 'ja-unit-1',
    languageId: 'ja',
    title: 'Unit 1: Hiragana 1',
    description: 'Learn the basics of the Japanese writing system.',
    order: 1,
    bannerImage: images.earth,
  },

  // ── GERMAN UNITS ───────────────────────────────────────────────────────────
  {
    id: 'de-unit-1',
    languageId: 'de',
    title: 'Unit 1: Basics',
    description: 'Introduce yourself and learn simple sentence structures.',
    order: 1,
    bannerImage: images.palace,
  },

  // ── ITALIAN UNITS ──────────────────────────────────────────────────────────
  {
    id: 'it-unit-1',
    languageId: 'it',
    title: 'Unit 1: Basics',
    description: 'Learn simple Italian pleasantries and vocabulary.',
    order: 1,
    bannerImage: images.cafeUnitHeader,
  },

  // ── PORTUGUESE UNITS ────────────────────────────────────────────────────────
  {
    id: 'pt-unit-1',
    languageId: 'pt',
    title: 'Unit 1: Basics',
    description: 'Learn fundamental Portuguese expressions and greetings.',
    order: 1,
    bannerImage: images.earth,
  },
];
