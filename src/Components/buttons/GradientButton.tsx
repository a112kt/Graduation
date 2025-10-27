import React from "react";
import { Text, Pressable, StyleSheet, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native";

interface GradientButtonProps {
  text: string;
  onPress?: () => void;
  style?: ViewStyle;
  disabled?: boolean;
}

const GradientButton: React.FC<GradientButtonProps> = ({
  text,
  onPress,
  style,
  disabled = false,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.buttonWrapper, style]}>
      <LinearGradient
        colors={["#1B2351", "#47C0D2"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        <Text style={styles.text}>{text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default GradientButton;

const styles = StyleSheet.create({
  buttonWrapper: {
    width: "100%",
    height: 44,
    borderRadius: 10,
    marginTop: 10,
    overflow: "hidden",
  },
  gradient: {
    flex: 1,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "Inter",
    fontWeight: "500",
    fontSize: 16,
    textAlign: "center",
    color: "#fff",
  },
});
