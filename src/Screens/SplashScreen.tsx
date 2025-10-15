import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { ColorSet } from "../../types";
import { SvgXml } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { ThemeContext } from "@react-navigation/native";
import { themeContext } from "../context/themeContext";
import { typography } from "../constants/typography";
import { Typography } from "../../types";

const { width: SCREEN_W } = Dimensions.get("window");
const SCALE = SCREEN_W / 375;

const RAW_SVG = `<svg width="375" height="812" viewBox="0 0 375 812" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.2" d="M94.3701 425.1C119.875 617.914 122.169 765.575 77.4183 836.314L-243.149 929.211C34.4386 819.731 56.9199 518.279 54.7226 337.681C52.9648 193.202 277.922 23.1319 353.867 -35.5729L479.735 46.0112C172.539 166.775 68.4444 229.105 94.3701 425.1Z" fill="url(#paint0_linear_305_1491)"/>
<defs>
<linearGradient id="paint0_linear_305_1491" x1="-105.182" y1="663.212" x2="111.403" y2="214.162" gradientUnits="userSpaceOnUse">
<stop stop-color="#47C0D2" stop-opacity="0.1"/>
<stop offset="1" stop-color="#47C0D2" stop-opacity="0.5"/>
</linearGradient>
</defs>
</svg>
`;

export default function SplashScreen() {
  const navigation = useNavigation<any>();
  const {theme} =useContext(themeContext)!

  const logoScale = useRef(new Animated.Value(0.6)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslateY = useRef(new Animated.Value(20)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const subTranslateY = useRef(new Animated.Value(30)).current;
  const subOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(logoScale, {
          toValue: 1,
          duration: 700,
          easing: Easing.out(Easing.exp),
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 700,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(titleTranslateY, {
          toValue: 0,
          duration: 500,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(subTranslateY, {
          toValue: 0,
          duration: 500,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(subOpacity, {
          toValue: 1,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),

      Animated.delay(600),
    ]).start(() => {
      navigation.replace("Auth");
    });
  }, [
    logoScale,
    logoOpacity,
    titleTranslateY,
    titleOpacity,
    subTranslateY,
    subOpacity,
    navigation,
  ]);
  const styles =createStyles(theme,typography)

  return (
    <View style={styles.container}>
      <SvgXml
        xml={RAW_SVG}
        width={375 * SCALE}
        height={812 * SCALE}
        style={styles.svg}
      />

      <View style={styles.center}>
        <Animated.View
          style={[
            styles.logoRow,
            {
              transform: [{ scale: logoScale }],
              opacity: logoOpacity,
            },
          ]}
        >
          <Image
            source={require("../assests/imgs/AlluvoLogo.png")}
            style={{ width: 62, height: 65 }}
          />
          <MaskedView maskElement={<Text style={styles.text}>Alluvo</Text>}>
            <LinearGradient
              colors={["#1B2351", "#47C0D2"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={[styles.text, { opacity: 0 }]}>Alluvo</Text>
            </LinearGradient>
          </MaskedView>
        </Animated.View>

        <Animated.View
          style={{
            transform: [{ translateY: titleTranslateY }],
            opacity: titleOpacity,
          }}
        ></Animated.View>
      </View>

      <Animated.View
        style={{
          marginBottom: 40,
          alignItems: "center",
          transform: [{ translateY: subTranslateY }],
          opacity: subOpacity,
        }}
      >
        <MaskedView
          maskElement={<Text style={styles.bottomText}>All Your Favorite</Text>}
        >
          <LinearGradient
            colors={["#1B2351", "#47C0D2"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={[styles.bottomText, { opacity: 0 }]}>
              All Your Favorite
            </Text>
          </LinearGradient>
        </MaskedView>
      </Animated.View>
    </View>
  );
}
function createStyles(t:ColorSet,typography:Typography) {
  return StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: t.backgroundColors.main,
    justifyContent: "space-between",
  },
  svg: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  text: {
    fontSize: 40,
    fontFamily: typography.titleSpecial.fontFamily,
    fontWeight: "400",
    lineHeight: 40,
    letterSpacing: 0,
    textAlign: "center",
    marginLeft: 10,
  },
  bottomText: {
    fontFamily: "CinzelDecorative-Regular",
    fontSize: 20,
    fontWeight: "400",
    lineHeight: 24,
    textAlign: "center",
    marginBottom: 20,
  },
});
}

