import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  ImageSourcePropType,
} from "react-native";
import { lightColors } from "../../theme";
import { Pressable } from "react-native";

type Props = {
  text: string;
  source: ImageSourcePropType;
};

export default function Highlights({ text, source }: Props) {
  return (
    <View style={styles.container}>
      <Pressable>
        <Image source={source} style={styles.image} />
        <Text style={styles.text}>{text}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    marginHorizontal: 4,
    alignContent: "center",
    justifyContent: "center",
  },
  image: {
    width: 48,
    height: 48,
    marginBottom: 6,
    marginTop: 10,
  },
  text: {
    fontFamily: "Inter-Regular",
    fontWeight: "400",
    fontSize: 11,
    letterSpacing: 0,
    color: "#1B2351",
    marginLeft: 6,
  },
});
