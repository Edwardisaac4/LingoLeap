import { Language } from '../types/learning';
import { images } from '@/constants/images';

export const languages: Language[] = [
  {
    id: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flagEmoji: '🇪🇸',
    flag: images.flagEs,
  },
  {
    id: 'fr',
    name: 'French',
    nativeName: 'Français',
    flagEmoji: '🇫🇷',
    flag: images.flagFr,
  },
  {
    id: 'ja',
    name: 'Japanese',
    nativeName: '日本語',
    flagEmoji: '🇯🇵',
    flag: images.flagJa,
  },
  {
    id: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    flagEmoji: '🇩🇪',
    flag: images.flagDe,
  },
  {
    id: 'it',
    name: 'Italian',
    nativeName: 'Italiano',
    flagEmoji: '🇮🇹',
    flag: images.flagIt,
  },
  {
    id: 'pt',
    name: 'Portuguese',
    nativeName: 'Português',
    flagEmoji: '🇧🇷',
    flag: images.flagPt,
  },
];
