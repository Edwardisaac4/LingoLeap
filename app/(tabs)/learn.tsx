import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  Modal, 
  Pressable 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useLanguageStore } from "@/store/languageStore";
import { useLearningStore } from "@/store/learningStore";
import { units } from "@/data/units";
import { lessons } from "@/data/lessons";
import { images } from "@/constants/images";
import { StatusBar } from "expo-status-bar";
import { Lesson } from "@/types/learning";

export default function LearnScreen() {
  const router = useRouter();
  const { selectedLanguage } = useLanguageStore();
  const { 
    completedLessons, 
    inProgressLessons, 
    completeLesson, 
    startLesson,
    resetProgress 
  } = useLearningStore();

  const [activeTab, setActiveTab] = useState<"lessons" | "practice">("lessons");
  const [selectedModalLesson, setSelectedModalLesson] = useState<Lesson | null>(null);

  // 1. Language matching
  const currentLangCode = selectedLanguage || "es";

  // 2. Select appropriate Unit based on active language
  // To match the design reference for Spanish, we want to default to Unit 3 (At the Café)
  const languageUnits = units.filter((u) => u.languageId === currentLangCode);
  
  const foundUnit = currentLangCode === "es"
    ? languageUnits.find((u) => u.id.endsWith("unit-3")) || languageUnits[0]
    : languageUnits[0];

  const activeUnit = foundUnit || {
    id: "default-unit",
    languageId: currentLangCode,
    title: "Unit 1: Basics",
    description: "Learn basic greetings, introductions, and essential phrases.",
    order: 1,
    bannerImage: images.cafeUnitHeader
  };

  // 3. Lessons in the active unit
  const activeLessons = lessons.filter((l) => l.unitId === activeUnit.id);
  const totalLessons = activeLessons.length;
  
  // Calculate completed count in this unit
  const completedInUnit = activeLessons.filter((l) => completedLessons.includes(l.id)).length;
  // If 2 completed out of 6, we're on the 3rd lesson. Format dynamically to match "3 / 6 lessons" in the mockup
  const currentIndexProgress = Math.min(completedInUnit + 1, totalLessons);
  const progressText = `Unit ${activeUnit.order} • ${currentIndexProgress} / ${totalLessons} lessons`;

  // Get status of a lesson card
  const getLessonStatus = (lessonId: string, index: number): "completed" | "in_progress" | "locked" => {
    if (completedLessons.includes(lessonId)) {
      return "completed";
    }
    // If it's explicitly in progress, or it's the first incomplete lesson
    if (inProgressLessons.includes(lessonId)) {
      return "in_progress";
    }
    
    // Fallback: If no lessons in progress, make the first incomplete one in_progress
    const incompleteLessons = activeLessons.filter((l) => !completedLessons.includes(l.id));
    if (incompleteLessons.length > 0 && incompleteLessons[0].id === lessonId) {
      return "in_progress";
    }

    return "locked";
  };

  const handleLessonClick = (lesson: Lesson, status: "completed" | "in_progress" | "locked") => {
    // Open preview/start modal
    setSelectedModalLesson(lesson);
  };

  const handleStartLessonSimulator = (lesson: Lesson) => {
    startLesson(lesson.id);
    setSelectedModalLesson(null);
    // Simulate navigating to lesson activity (or audio-lesson, chat etc.)
    if (lesson.id.includes("chat")) {
      router.replace("/(tabs)/chat");
    } else {
      router.replace("/(tabs)/ai-teacher");
    }
  };

  const handleMarkAsCompleted = (lesson: Lesson) => {
    completeLesson(lesson.id);
    setSelectedModalLesson(null);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }} edges={["top"]}>
      <StatusBar style="dark" />

      {/* ── 1. Top Navigation Bar ─────────────────────────────────────────── */}
      <View className="flex-row items-center justify-between px-5 py-4 bg-white border-b border-slate-50">
        <View className="flex-row items-center flex-1">
          {/* Back Chevron */}
          <TouchableOpacity 
            activeOpacity={0.7} 
            onPress={() => router.replace("/(tabs)/home")}
            className="p-1 mr-3"
          >
            <Ionicons name="chevron-back" size={26} color="#0D132B" />
          </TouchableOpacity>

          {/* Unit Title and Lesson Count */}
          <View className="flex-1">
            <Text className="font-bold text-slate-800 text-[19px] tracking-tight leading-tight">
              {activeUnit.title.replace(/Unit \d+:\s*/, "")}
            </Text>
            <Text className="font-semibold text-slate-400 text-[13px] mt-0.5">
              {progressText}
            </Text>
          </View>
        </View>

        {/* Bookmark Ribbon */}
        <TouchableOpacity activeOpacity={0.7} className="p-1">
          <View style={styles.bookmarkBorder} className="w-[32px] h-[32px] rounded-lg items-center justify-center bg-slate-50 border border-slate-100">
            <Ionicons name="bookmark" size={18} color="#FF9500" />
          </View>
        </TouchableOpacity>
      </View>

      {/* ── 2. Scrollable Body Content ─────────────────────────────────────── */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
        className="bg-[#FAFAFC]"
      >
        {/* Banner Section */}
        <View className="w-full relative bg-white">
          <Image 
            source={activeUnit.bannerImage || images.cafeUnitHeader} 
            className="w-full h-[220px]" 
            resizeMode="cover" 
          />
        </View>

        {/* Segmented Control Selector (Overlapping banner) */}
        <View className="px-5">
          <View 
            style={styles.segmentedContainerShadow}
            className="flex-row items-center w-full h-[58px] rounded-2xl bg-[#F0EEFB] p-1 -mt-7 z-10"
          >
            {/* Lessons Tab */}
            <TouchableOpacity 
              activeOpacity={0.9}
              onPress={() => setActiveTab("lessons")}
              style={activeTab === "lessons" ? styles.activeTabCardShadow : null}
              className={`flex-1 h-full rounded-xl items-center justify-center ${activeTab === "lessons" ? "bg-white" : ""}`}
            >
              <Text 
                className={`font-bold text-[15px] ${activeTab === "lessons" ? "text-[#6C4EF5]" : "text-slate-500"}`}
              >
                Lessons
              </Text>
            </TouchableOpacity>

            {/* Practice Tab */}
            <TouchableOpacity 
              activeOpacity={0.9}
              onPress={() => setActiveTab("practice")}
              style={activeTab === "practice" ? styles.activeTabCardShadow : null}
              className={`flex-1 h-full rounded-xl items-center justify-center ${activeTab === "practice" ? "bg-white" : ""}`}
            >
              <Text 
                className={`font-bold text-[15px] ${activeTab === "practice" ? "text-[#6C4EF5]" : "text-slate-500"}`}
              >
                Practice
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Tab Content ─────────────────────────────────────────────────── */}
        {activeTab === "lessons" ? (
          /* ── LESSONS LIST ── */
          <View className="px-5 mt-6 gap-3.5">
            {activeLessons.map((lesson, idx) => {
              const status = getLessonStatus(lesson.id, idx);
              
              if (status === "completed") {
                return (
                  <TouchableOpacity
                    key={lesson.id}
                    activeOpacity={0.8}
                    onPress={() => handleLessonClick(lesson, status)}
                    style={styles.lessonCardShadow}
                    className="flex-row items-center justify-between bg-white px-5 py-4.5 rounded-[20px] border border-slate-100"
                  >
                    <View className="flex-1 flex-col pr-3">
                      <Text className="font-semibold text-slate-400 text-[12px] uppercase tracking-wider mb-0.5">
                        Lesson {idx + 1}
                      </Text>
                      <Text className="font-bold text-slate-800 text-[16px] tracking-tight">
                        {lesson.title}
                      </Text>
                    </View>
                    <View className="w-7 h-7 rounded-full bg-[#4CD964] items-center justify-center">
                      <Ionicons name="checkmark" size={18} color="#FFFFFF" />
                    </View>
                  </TouchableOpacity>
                );
              } else if (status === "in_progress") {
                return (
                  <TouchableOpacity
                    key={lesson.id}
                    activeOpacity={0.8}
                    onPress={() => handleLessonClick(lesson, status)}
                    style={styles.activeLessonCardBorder}
                    className="flex-row items-center justify-between bg-[#F8F6FF] px-5 py-[18px] rounded-[20px]"
                  >
                    <View className="flex-1 flex-col pr-3">
                      <Text className="font-bold text-[#6C4EF5] text-[12px] uppercase tracking-wider mb-0.5">
                        Lesson {idx + 1}
                      </Text>
                      <Text className="font-bold text-slate-800 text-[18px] tracking-tight mb-1">
                        {lesson.title}
                      </Text>
                      <Text className="font-bold text-[#6C4EF5] text-[13px] mt-0.5">
                        In progress
                      </Text>
                    </View>
                    
                    {/* Render lesson image, fallback to cafe table icon */}
                    <View className="w-16 h-16 items-center justify-center rounded-2xl bg-white/60 overflow-hidden">
                      <Image 
                        source={lesson.image || images.cafeTableIcon} 
                        className="w-12 h-12" 
                        resizeMode="contain" 
                      />
                    </View>
                  </TouchableOpacity>
                );
              } else {
                // Locked Status
                return (
                  <TouchableOpacity
                    key={lesson.id}
                    activeOpacity={0.8}
                    onPress={() => handleLessonClick(lesson, status)}
                    style={styles.lessonCardShadow}
                    className="flex-row items-center justify-between bg-white px-5 py-4.5 rounded-[20px] border border-slate-100 opacity-80"
                  >
                    <View className="flex-1 flex-col pr-3">
                      <Text className="font-semibold text-slate-400 text-[12px] uppercase tracking-wider mb-0.5">
                        Lesson {idx + 1}
                      </Text>
                      <Text className="font-semibold text-slate-400 text-[16px] tracking-tight">
                        {lesson.title}
                      </Text>
                      <Text className="font-semibold text-slate-350 text-[12px] mt-0.5">
                        0 / 6 steps
                      </Text>
                    </View>
                    <View className="w-7 h-7 rounded-full items-center justify-center bg-slate-50 border border-slate-100">
                      <Ionicons name="lock-closed" size={14} color="#94A3B8" />
                    </View>
                  </TouchableOpacity>
                );
              }
            })}

            {/* Diagnostic helper inside screen */}
            <TouchableOpacity 
              activeOpacity={0.7}
              onPress={resetProgress}
              className="mt-6 py-3 px-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 items-center justify-center"
            >
              <Text className="font-bold text-slate-400 text-[13px]">
                🔄 Reset Lesson Progress (Testing)
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          /* ── PRACTICE TAB CONTENT ── */
          <View className="px-5 mt-8 items-center justify-center py-10 gap-3 bg-white mx-5 rounded-[24px] border border-slate-100">
            <View className="w-16 h-16 rounded-full bg-[#FFF3CD] items-center justify-center">
              <Ionicons name="flash" size={32} color="#FFC107" />
            </View>
            <Text className="font-bold text-slate-800 text-[18px] mt-2">
              Practice Mode Coming Soon!
            </Text>
            <Text className="font-medium text-slate-400 text-[14px] text-center px-4 leading-relaxed">
              Once you complete lessons, you can practice your vocabulary and audio speaking here with our AI coach.
            </Text>
            <TouchableOpacity 
              activeOpacity={0.8}
              onPress={() => setActiveTab("lessons")}
              className="mt-4 px-6 py-2.5 rounded-full bg-[#6C4EF5]"
            >
              <Text className="font-bold text-white text-[14px]">
                Return to Lessons
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* ── 3. Interactive Lesson Preview / simulator Modal ──────────────── */}
      {selectedModalLesson && (
        <Modal
          visible={selectedModalLesson !== null}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setSelectedModalLesson(null)}
        >
          <Pressable 
            style={styles.modalOverlay}
            onPress={() => setSelectedModalLesson(null)}
          >
            <View 
              style={styles.modalContentShadow}
              className="w-[88%] bg-white rounded-[28px] overflow-hidden flex-col p-6 border border-slate-50"
            >
              {/* Header */}
              <View className="flex-row justify-between items-start mb-4">
                <View className="flex-1 pr-3">
                  <Text className="font-bold text-slate-400 text-[11px] uppercase tracking-wider mb-0.5">
                    Interactive Lesson Preview
                  </Text>
                  <Text className="font-extrabold text-slate-800 text-[22px] tracking-tight">
                    {selectedModalLesson.title}
                  </Text>
                </View>
                <TouchableOpacity 
                  activeOpacity={0.7}
                  onPress={() => setSelectedModalLesson(null)}
                  className="w-8 h-8 rounded-full bg-slate-100 items-center justify-center"
                >
                  <Ionicons name="close" size={18} color="#475569" />
                </TouchableOpacity>
              </View>

              {/* Description */}
              <Text className="font-medium text-slate-500 text-[14px] leading-relaxed mb-5">
                {selectedModalLesson.description}
              </Text>

              {/* Goals list */}
              {selectedModalLesson.goals && selectedModalLesson.goals.length > 0 && (
                <View className="mb-5 bg-slate-50 p-4 rounded-2xl">
                  <Text className="font-bold text-slate-700 text-[13px] mb-2.5 uppercase tracking-wide">
                    🎯 Lesson Goals
                  </Text>
                  {selectedModalLesson.goals.map((goal, gidx) => (
                    <View key={gidx} className="flex-row items-center mb-1.5">
                      <Ionicons name="checkmark-circle" size={16} color="#6C4EF5" className="mr-2" />
                      <Text className="font-semibold text-slate-600 text-[13.5px] ml-1.5 flex-1">
                        {goal}
                      </Text>
                    </View>
                  ))}
                </View>
              )}

              {/* Vocabulary sneak peak */}
              {selectedModalLesson.vocabulary && selectedModalLesson.vocabulary.length > 0 && (
                <View className="mb-6">
                  <Text className="font-bold text-slate-700 text-[13px] mb-2.5 uppercase tracking-wide">
                    📖 Key Words
                  </Text>
                  <View className="flex-row flex-wrap gap-2">
                    {selectedModalLesson.vocabulary.map((voc) => (
                      <View key={voc.id} className="bg-[#ECEBFA] px-3.5 py-1.5 rounded-full border border-[#D5D0F9]">
                        <Text className="font-bold text-[#6C4EF5] text-[12.5px]">
                          {voc.word} <Text className="font-semibold text-slate-500 text-[11px]">• {voc.translation}</Text>
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              {/* Action Buttons */}
              <View className="flex-col gap-2">
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => handleStartLessonSimulator(selectedModalLesson)}
                  className="w-full py-3.5 rounded-2xl bg-[#6C4EF5] items-center justify-center shadow-sm"
                >
                  <Text className="font-bold text-white text-[16px]">
                    Start Interactive Lesson 🚀
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => handleMarkAsCompleted(selectedModalLesson)}
                  className="w-full py-3 rounded-2xl border border-slate-200 bg-white items-center justify-center mt-1"
                >
                  <Text className="font-bold text-slate-500 text-[14px]">
                    Mark as Completed ✅
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Pressable>
        </Modal>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bookmarkBorder: {
    shadowColor: "#0D132B",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  segmentedContainerShadow: {
    shadowColor: "#6C4EF5",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 3,
  },
  activeTabCardShadow: {
    shadowColor: "#0D132B",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  lessonCardShadow: {
    shadowColor: "#0D132B",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 1,
  },
  activeLessonCardBorder: {
    borderWidth: 2,
    borderColor: "#6C4EF5",
    shadowColor: "#6C4EF5",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(13, 19, 43, 0.45)",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContentShadow: {
    shadowColor: "#0D132B",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 10,
  },
});
