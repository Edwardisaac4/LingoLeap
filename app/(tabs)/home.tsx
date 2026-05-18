import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser, useAuth } from "@clerk/expo";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { colors } from "@/theme";
import { useLanguageStore } from "@/store/languageStore";
import { languages } from "@/data/languages";
import { units } from "@/data/units";
import { lessons } from "@/data/lessons";
import { images } from "@/constants/images";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen() {
  const { user } = useUser();
  const { signOut } = useAuth();
  const router = useRouter();
  const { selectedLanguage } = useLanguageStore();

  // Find the selected language details
  const selectedLangDetails = languages.find((l) => l.id === selectedLanguage);

  // Find all units for this language
  const languageUnits = units.filter((u) => u.languageId === selectedLanguage);
  
  // Default to the first unit of this language
  const activeUnit = languageUnits[0] || {
    id: "default-unit",
    title: "Unit 1: Basics",
    description: "Learn basic greetings, introductions, and essential phrases.",
  };

  // Find lessons for this unit
  const activeLessons = lessons.filter((l) => l.unitId === activeUnit.id);
  
  // Default to the first lesson of the unit
  const currentLesson = activeLessons[0] || {
    title: "Saying Hello",
    description: "Learn to say hello and goodbye.",
  };

  // Safe greeting fallback
  const userName = user?.firstName || user?.username || "Learner";

  // Dynamic language-based header configurations
  const headerConfigs: Record<string, { greeting: string; streak: number; notifications: number }> = {
    es: { greeting: "Hola", streak: 12, notifications: 3 },
    fr: { greeting: "Bonjour", streak: 8, notifications: 2 },
    ja: { greeting: "こんにちは", streak: 15, notifications: 1 },
    de: { greeting: "Hallo", streak: 5, notifications: 4 },
    it: { greeting: "Ciao", streak: 9, notifications: 0 },
    pt: { greeting: "Olá", streak: 7, notifications: 2 },
  };

  const currentLang = selectedLanguage || "es";
  const activeHeaderConfig = headerConfigs[currentLang] || headerConfigs.es;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }} edges={["top"]}>
      <StatusBar style="dark" />

      {/* ── 1. Header / Top Navigation Bar ───────────────────────────────── */}
      <View className="flex-row justify-between items-center px-6 pt-3 pb-4 bg-white">
        <View className="flex-row items-center">
          {/* Circular Flag Avatar */}
          <View style={styles.flagAvatarBorder} className="w-10 h-10 rounded-full items-center justify-center overflow-hidden bg-slate-50">
            {selectedLangDetails?.flag ? (
              <Image 
                source={selectedLangDetails.flag} 
                className="w-10 h-10 rounded-full" 
                resizeMode="cover" 
              />
            ) : (
              <Text className="text-h3">{selectedLangDetails?.flagEmoji || "🇪🇸"}</Text>
            )}
          </View>
          <View className="ml-3">
            <Text className="font-bold text-slate-800 text-[19px] tracking-tight">
              {activeHeaderConfig.greeting}, {userName}! 👋
            </Text>
          </View>
        </View>

        {/* Right Action Capsules */}
        <View className="flex-row items-center">
          {/* Streak Flame Container */}
          <View className="flex-row items-center mr-5">
            <Image 
              source={images.streakFire} 
              className="w-5 h-5 mr-1.5" 
              resizeMode="contain" 
            />
            <Text className="font-semibold text-slate-500 text-[17px]">
              {activeHeaderConfig.streak}
            </Text>
          </View>

          {/* Notification Bell */}
          <TouchableOpacity activeOpacity={0.7} className="p-1 relative">
            <Ionicons name="notifications-outline" size={24} color="#1E293B" />
            {activeHeaderConfig.notifications > 0 && (
              <View className="absolute -top-1 -right-1 bg-red-500 rounded-full w-[18px] h-[18px] items-center justify-center border border-white">
                <Text className="text-white text-[9px] font-bold leading-none">
                  {activeHeaderConfig.notifications}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* ── 2. Scrollable Body Content ───────────────────────────────────── */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
        className="bg-white"
      >
        {/* Daily Goal Card (Peach Card) */}
        <View 
          style={styles.peachCard}
          className="mx-6 mt-3 mb-4 p-6 rounded-[24px] bg-[#FFF8F2] flex-row items-center justify-between"
        >
          <View className="flex-1 pr-2 flex-col">
            <Text className="text-slate-500 font-bold text-caption tracking-wider uppercase mb-1">
              Daily goal
            </Text>
            <View className="flex-row items-baseline mt-1">
              <Text className="text-slate-800 font-extrabold text-3xl">15</Text>
              <Text className="text-slate-400 font-bold text-base ml-1">/ 20 XP</Text>
            </View>
            
            {/* Custom Orange Progress Bar */}
            <View className="mt-3.5 w-[90%]">
              <View className="h-2.5 rounded-full w-full bg-[#FFEADB] overflow-hidden">
                <View className="h-full rounded-full bg-[#FF7A00]" style={{ width: '75%' }} />
              </View>
            </View>
          </View>

          {/* Wood and Gold Treasure Illustration */}
          <Image 
            source={images.treasure} 
            className="w-20 h-20" 
            resizeMode="contain" 
          />
        </View>

        {/* Continue Learning Card (Purple Card) */}
        <View 
          style={styles.purpleCard}
          className="mx-6 mb-6 p-6 rounded-[24px] bg-[#5856D6] flex-row justify-between items-stretch"
        >
          <View className="flex-1 pr-2 flex-col justify-between">
            <View>
              <Text className="text-white/80 font-bold text-[11px] uppercase tracking-wider mb-1.5">
                Continue learning
              </Text>
              <Text className="text-white font-bold text-2xl tracking-tight">
                {selectedLangDetails?.name || "Spanish"}
              </Text>
              <Text className="text-white/95 font-semibold text-[13px] mt-1.5">
                A1 • {activeUnit.title}
              </Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => router.push("/(tabs)/learn")}
              className="bg-white py-2.5 px-6 rounded-full self-start shadow-sm active:bg-slate-50 mt-5"
            >
              <Text className="text-[#5856D6] font-bold text-[15px]">
                Continue
              </Text>
            </TouchableOpacity>
          </View>

          {/* Palace Illustration */}
          <View className="justify-end">
            <Image 
              source={images.palace} 
              className="w-[96px] h-[96px]" 
              resizeMode="contain" 
            />
          </View>
        </View>

        {/* Today's Plan Header Row */}
        <View className="flex-row items-center justify-between px-6 mb-4 mt-2">
          <Text className="text-slate-800 font-bold text-[19px] tracking-tight">
            {"Today's plan"}
          </Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text className="text-[#5856D6] font-bold text-[15px]">
              View all
            </Text>
          </TouchableOpacity>
        </View>

        {/* Today's Plan Checklist Items */}
        <View className="px-6 gap-3.5 mb-6">
          {/* Plan Item 1: Lesson (Completed) */}
          <View className="flex-row items-center justify-between bg-white py-3 border-b border-slate-50">
            <View className="w-12 h-12 rounded-2xl bg-[#5856D6] items-center justify-center">
              <Ionicons name="book" size={22} color="#FFFFFF" />
            </View>
            <View className="flex-1 ml-4">
              <Text className="text-slate-800 font-bold text-base">
                Lesson
              </Text>
              <Text className="text-slate-400 font-medium text-[14px] mt-0.5">
                {currentLesson.title}
              </Text>
            </View>
            <View className="w-[26px] h-[26px] rounded-full bg-[#5856D6] items-center justify-center">
              <Ionicons name="checkmark" size={16} color="#FFFFFF" />
            </View>
          </View>

          {/* Plan Item 2: AI Conversation (Incomplete) */}
          <TouchableOpacity 
            activeOpacity={0.7}
            onPress={() => router.push("/(tabs)/chat")}
            className="flex-row items-center justify-between bg-white py-3 border-b border-slate-50"
          >
            <View className="w-12 h-12 rounded-2xl bg-[#5856D6] items-center justify-center">
              <Ionicons name="headset" size={22} color="#FFFFFF" />
            </View>
            <View className="flex-1 ml-4">
              <Text className="text-slate-800 font-bold text-base">
                AI Conversation
              </Text>
              <Text className="text-slate-400 font-medium text-[14px] mt-0.5">
                Talk about your day
              </Text>
            </View>
            <View className="w-[26px] h-[26px] rounded-full border-2 border-slate-200 bg-white" />
          </TouchableOpacity>

          {/* Plan Item 3: New words (Incomplete) */}
          <TouchableOpacity 
            activeOpacity={0.7}
            onPress={() => router.push("/(tabs)/learn")}
            className="flex-row items-center justify-between bg-white py-3 border-b border-slate-50"
          >
            <View className="w-12 h-12 rounded-2xl bg-[#FF4B55] items-center justify-center">
              <Ionicons name="chatbubble-ellipses" size={22} color="#FFFFFF" />
            </View>
            <View className="flex-1 ml-4">
              <Text className="text-slate-800 font-bold text-base">
                New words
              </Text>
              <Text className="text-slate-400 font-medium text-[14px] mt-0.5">
                10 words
              </Text>
            </View>
            <View className="w-[26px] h-[26px] rounded-full border-2 border-slate-200 bg-white" />
          </TouchableOpacity>
        </View>

        {/* Next Up Video Card (Bottom Mint Card) */}
        <View 
          style={styles.mintCard}
          className="mx-6 mb-8 p-5 rounded-[24px] bg-[#F2F9F3] flex-row items-center justify-between"
        >
          <View className="flex-1 pr-2 flex-col">
            <Text className="text-emerald-700 font-bold text-[12px] uppercase tracking-wider mb-1">
              Next up
            </Text>
            <Text className="text-slate-800 font-bold text-[18px] tracking-tight">
              AI Video Call
            </Text>
            <Text className="text-slate-500 font-medium text-[13px] mt-0.5">
              Practice speaking
            </Text>
          </View>

          {/* Teacher Avatar & Quick Call Action Button */}
          <View className="flex-row items-center gap-3">
            <Image 
              source={{ uri: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=60" }} 
              className="w-14 h-14 rounded-full border-2 border-white shadow-sm"
              resizeMode="cover"
            />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => router.push("/(tabs)/ai-teacher")}
              className="w-11 h-11 rounded-full bg-[#4CD964] items-center justify-center shadow-sm active:bg-[#43c457]"
            >
              <Ionicons name="videocam" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* ── 3. Diagnostic & Testing Console (Bottom) ──────────────────── */}
        <View className="mx-6 p-5 rounded-3xl bg-[#F9FAFB] border border-slate-100">
          <Text className="font-bold text-[14px] text-text-primary mb-1">
            ⚙️ Diagnostics & Test Controls
          </Text>
          <Text className="font-sans text-[11px] text-text-secondary mb-4">
            Quick tools to clear local storage, change target language, or log out during testing.
          </Text>
          
          <View className="flex-row gap-2 flex-wrap">
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => router.push("/language-select")}
              style={[styles.diagButton, { borderColor: colors.linguaPurple }]}
              className="border-[1.5px] rounded-xl px-4 py-2 bg-background"
            >
              <Text className="font-semibold text-[12px] text-lingua-purple">Choose Language</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={async () => {
                try {
                  await signOut();
                  router.replace("/onboarding");
                } catch (error) {
                  console.error("Diagnostics logout error:", error);
                }
              }}
              style={[styles.diagButton, { borderColor: colors.textSecondary }]}
              className="border-[1.5px] rounded-xl px-4 py-2 bg-background"
            >
              <Text className="font-semibold text-[12px] text-text-secondary">Sign Out</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={async () => {
                try {
                  await signOut();
                } catch (err) {
                  console.error("Failed to sign out during clear storage:", err);
                }
                await AsyncStorage.clear();
                useLanguageStore.getState().setSelectedLanguage(null);
                router.replace("/onboarding");
              }}
              style={[styles.diagButton, { borderColor: colors.error }]}
              className="border-[1.5px] rounded-xl px-4 py-2 bg-background"
            >
              <Text className="font-semibold text-[12px] text-error">Clear Storage (Test)</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flagAvatarBorder: {
    borderWidth: 1.5,
    borderColor: "#F1F5F9",
  },
  peachCard: {
    shadowColor: "#FF7A00",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  purpleCard: {
    shadowColor: "#5856D6",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 4,
  },
  mintCard: {
    shadowColor: "#4CD964",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  diagButton: {
    alignItems: "center",
    justifyContent: "center",
  },
});
