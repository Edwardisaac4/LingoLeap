import { create } from "zustand";

interface LanguageState {
  selectedLanguage: string | null;
  setSelectedLanguage: (languageId: string | null) => void;
}

export const useLanguageStore = create<LanguageState>((set) => ({
  selectedLanguage: null,
  setSelectedLanguage: (languageId) => set({ selectedLanguage: languageId }),
}));
