import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colors, fontFamily } from "@/theme";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

const CIRCLE_SIZE = 48;
const TAB_BAR_HEIGHT = 68;

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const screenWidth = Dimensions.get("window").width;
  const [tabBarWidth, setTabBarWidth] = useState(screenWidth);
  const tabWidth = tabBarWidth / state.routes.length;

  const activeIndex = state.index;
  const translateX = useSharedValue(0);

  useEffect(() => {
    // Animate the indicator to the center of the active tab
    const targetX = activeIndex * tabWidth + (tabWidth - CIRCLE_SIZE) / 2;
    translateX.value = withTiming(targetX, { duration: 250 });
  }, [activeIndex, tabWidth, translateX]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  // Get icons for each tab route
  const getTabIcon = (routeName: string, isFocused: boolean): keyof typeof Ionicons.glyphMap => {
    switch (routeName) {
      case "home":
        return isFocused ? "home" : "home-outline";
      case "learn":
        return isFocused ? "book" : "book-outline";
      case "ai-teacher":
        return isFocused ? "videocam" : "videocam-outline";
      case "chat":
        return isFocused ? "chatbubbles" : "chatbubbles-outline";
      case "profile":
        return isFocused ? "person" : "person-outline";
      default:
        return "help-outline";
    }
  };

  const getTabLabel = (routeName: string): string => {
    switch (routeName) {
      case "home":
        return "Home";
      case "learn":
        return "Learn";
      case "ai-teacher":
        return "AI Teacher";
      case "chat":
        return "Chat";
      case "profile":
        return "Profile";
      default:
        return routeName;
    }
  };

  return (
    <View
      onLayout={(e) => setTabBarWidth(e.nativeEvent.layout.width)}
      style={[
        styles.container,
        {
          paddingBottom: insets.bottom || 12,
          height: TAB_BAR_HEIGHT + (insets.bottom || 12),
        },
      ]}
    >
      {/* Absolute moving active indicator circle */}
      <Animated.View
        style={[
          styles.activeIndicator,
          animatedStyle,
          {
            top: (TAB_BAR_HEIGHT - CIRCLE_SIZE) / 2,
          },
        ]}
      />

      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabButton}
            activeOpacity={0.8}
          >
            <View style={styles.tabContent}>
              <Ionicons
                name={getTabIcon(route.name, isFocused)}
                size={22}
                color={isFocused ? "#FFFFFF" : colors.textSecondary}
              />
              {!isFocused && (
                <Text style={styles.label}>{getTabLabel(route.name)}</Text>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1.5,
    borderTopColor: colors.border,
    position: "relative",
    // Premium soft shadow to lift it up slightly
    shadowColor: "#0D132B",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 8,
  },
  activeIndicator: {
    position: "absolute",
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: colors.linguaPurple,
    // Add sub-pixel layout alignment for crisp rendering on iOS/Android
    shadowColor: colors.linguaPurple,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabContent: {
    alignItems: "center",
    justifyContent: "center",
    height: TAB_BAR_HEIGHT,
    width: "100%",
  },
  label: {
    fontSize: 10,
    fontFamily: fontFamily.medium,
    color: colors.textSecondary,
    marginTop: 3,
  },
});
