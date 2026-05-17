import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { colors } from "@/theme";
import { Language } from "@/types/learning";

interface LanguageCardProps {
  language: Language;
  selected: boolean;
  onPress: () => void;
}

export function LanguageCard({ language, selected, onPress }: LanguageCardProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[
        styles.card,
        selected ? styles.selectedCard : styles.unselectedCard,
      ]}
      className="flex-row items-center p-4 mb-3 rounded-2xl border-[2px]"
    >
      {/* ── Flag Image ── */}
      <Image
        source={language.flag}
        style={styles.flag}
        contentFit="cover"
        transition={200}
      />

      {/* ── Text Details ── */}
      <View className="flex-1 ml-4 justify-center">
        <Text className="font-bold text-[17px] text-text-primary">
          {language.name}
        </Text>
        <Text className="font-sans text-[13px] text-text-secondary mt-0.5">
          {language.nativeName}
        </Text>
      </View>

      {/* ── Selection Indicator (Circle Check/Dot) ── */}
      <View
        style={[
          styles.indicator,
          selected ? styles.selectedIndicator : styles.unselectedIndicator,
        ]}
        className="w-6 h-6 rounded-full items-center justify-center border-[1.5px]"
      >
        {selected && <View className="w-3 h-3 rounded-full bg-lingua-purple" />}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    // Dynamic border colors through StyleSheet for platform safety
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  selectedCard: {
    borderColor: colors.linguaPurple,
    backgroundColor: "#F8F7FF", // Light purple hue for selected state
  },
  unselectedCard: {
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  flag: {
    width: 48,
    height: 36,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.08)",
  },
  indicator: {
    alignSelf: "center",
  },
  selectedIndicator: {
    borderColor: colors.linguaPurple,
  },
  unselectedIndicator: {
    borderColor: colors.border,
  },
});
