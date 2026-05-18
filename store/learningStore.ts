import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface LearningState {
  completedLessons: string[]; // Array of completed lesson IDs
  inProgressLessons: string[]; // Array of in-progress lesson IDs
  completeLesson: (lessonId: string) => void;
  startLesson: (lessonId: string) => void;
  resetProgress: () => void;
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

export const useLearningStore = create<LearningState>()(
  persist(
    (set) => ({
      // Set default mock completion data so it aligns beautifully with the Duolingo designs
      completedLessons: [
        "es-u3-lesson-1", 
        "es-u3-lesson-2",
        "fr-lesson-1",
        "ja-lesson-1",
        "de-lesson-1",
        "it-lesson-1",
        "pt-lesson-1"
      ],
      inProgressLessons: [
        "es-u3-lesson-3",
        "fr-lesson-3",
        "ja-lesson-3",
        "de-lesson-3",
        "it-lesson-3",
        "pt-lesson-3"
      ],
      completeLesson: (lessonId) =>
        set((state) => {
          if (state.completedLessons.includes(lessonId)) return {};
          const newCompleted = [...state.completedLessons, lessonId];
          const newInProgress = state.inProgressLessons.filter((id) => id !== lessonId);
          return {
            completedLessons: newCompleted,
            inProgressLessons: newInProgress,
          };
        }),
      startLesson: (lessonId) =>
        set((state) => {
          if (
            state.completedLessons.includes(lessonId) ||
            state.inProgressLessons.includes(lessonId)
          ) {
            return {};
          }
          return {
            inProgressLessons: [...state.inProgressLessons, lessonId],
          };
        }),
      resetProgress: () =>
        set({
          completedLessons: [
            "es-u3-lesson-1", 
            "es-u3-lesson-2",
            "fr-lesson-1",
            "ja-lesson-1",
            "de-lesson-1",
            "it-lesson-1",
            "pt-lesson-1"
          ],
          inProgressLessons: [
            "es-u3-lesson-3",
            "fr-lesson-3",
            "ja-lesson-3",
            "de-lesson-3",
            "it-lesson-3",
            "pt-lesson-3"
          ],
        }),
      _hasHydrated: false,
      setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),
    {
      name: "learning-storage",
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
