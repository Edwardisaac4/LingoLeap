import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { colors } from "@/theme";
import { languages } from "@/data/languages";
import { LanguageCard } from "@/components/LanguageCard";
import { images } from "@/constants/images";
import { useLanguageStore } from "@/store/languageStore";

export default function LanguageSelectScreen() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleContinue = () => {
    if (selectedId) {
      useLanguageStore.getState().setSelectedLanguage(selectedId);
      router.replace("/home");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      {/* ── Header Row ── */}
      <View className="flex-row items-center px-4 py-3">
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text className="font-bold text-[18px] text-text-primary ml-2">
          Language
        </Text>
      </View>

      {/* ── Progress/Step Indicator ── */}
      <View className="px-6 mb-6">
        <View className="xp-bar w-full">
          <View className="xp-bar__fill w-1/3" />
        </View>
      </View>

      {/* ── Scrollable list of languages ── */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Earth Illustration ── */}
        <View className="items-center justify-center mt-2 mb-4">
          <Image
            source={images.earth}
            className="w-28 h-28"
            resizeMode="contain"
          />
        </View>

        <View className="px-6 mb-6 text-center items-center">
          <Text className="text-h2 leading-9 text-center">
            I want to learn...
          </Text>
          <Text className="text-body-sm text-text-secondary mt-1 text-center">
            Choose a language to start your playful AI-powered learning journey!
          </Text>
        </View>

        <View className="px-6 pb-24">
          {languages.map((lang) => (
            <LanguageCard
              key={lang.id}
              language={lang}
              selected={selectedId === lang.id}
              onPress={() => setSelectedId(lang.id)}
            />
          ))}
        </View>
      </ScrollView>

      {/* ── Sticky Bottom Button Row ── */}
      <View style={styles.bottomBar} className="px-6 pt-4 pb-6 border-t border-border bg-white">
        <TouchableOpacity
          style={[
            styles.ctaButton,
            !selectedId && styles.ctaButtonDisabled,
          ]}
          activeOpacity={0.85}
          disabled={!selectedId}
          onPress={handleContinue}
        >
          <Text className="font-semibold text-[17px] text-white">
            Continue
          </Text>
          <Ionicons name="arrow-forward" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backBtn: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  bottomBar: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 8,
  },
  ctaButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.linguaPurple,
    borderRadius: 20,
    paddingVertical: 16,
    gap: 8,
  },
  ctaButtonDisabled: {
    opacity: 0.5,
    backgroundColor: colors.textSecondary,
  },
});
