import React from "react";
import { Text, TextStyle } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";

type Props = {
  text: string;
  textStyle?: TextStyle;
  gradientColors?: readonly string[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  accessibilityLabel?: string;
};

export default function GradientText({
  text,
  textStyle,
  gradientColors = ["#1B2351", "#47C0D2"],
  start = { x: 0, y: 0 },
  end = { x: 1, y: 0 },
  accessibilityLabel,
}: Props) {
  const colorsTuple = (gradientColors as readonly string[]) as readonly [string, string, ...string[]];

  return (
    <MaskedView
      accessible
      accessibilityLabel={accessibilityLabel ?? text}
      accessibilityRole="text"
      maskElement={<Text style={textStyle}>{text}</Text>}
    >
      <LinearGradient colors={colorsTuple} start={start} end={end}>
        <Text style={[textStyle, { opacity: 0 }]}>{text}</Text>
      </LinearGradient>
    </MaskedView>
  );
}
