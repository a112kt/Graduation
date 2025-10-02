import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { lightColors } from "../../../theme";
import { SvgXml } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view"; 

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get("window");
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
  useEffect(() => {
    setTimeout(() => {}, 1500);
  }, []);

  return (
    <View style={styles.container}>
      <SvgXml
        xml={RAW_SVG}
        width={375 * SCALE}
        height={812 * SCALE}
        style={styles.svg}
      />

      <View style={styles.textContainer}>
        <Image
          source={require("./../../assests/imgs/AlluvoLogo.png")}
          style={{ width: 62, height: 65 }}
        />
        <MaskedView
          maskElement={
            <Text style={styles.text}>Allovo</Text>
          }
        >
          <LinearGradient
            colors={["#1B2351", "#47C0D2"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={[styles.text, { opacity: 0 }]}>Allovo</Text>
          </LinearGradient>
        </MaskedView>
      </View>
      <View>
        <MaskedView maskElement={
            <Text style={styles.bottomText}>All Your Favorite</Text>
        }>
            <LinearGradient 
            colors={["#1B2351", "#47C0D2"]}
             start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}>
                <Text style={[styles.bottomText, { opacity: 0 }]}>All Your Favorite</Text>
            </LinearGradient>

        </MaskedView>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightColors.background,
  },
  svg: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  textContainer: {
    flex: 1,
    flexDirection:'row',
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 40,
    fontFamily: "CinzelDecorative-Regular",  
    fontWeight: "400",
    lineHeight: 40,
    letterSpacing: 0,
    textAlign: "center",
  },
  bottomText:{
    fontFamily: "CinzelDecorative-Bold",
    fontSize:20,
    fontWeight:400,
    lineHeight: 100,
    bottom:30,
    textAlign:"center"
  }
});


