import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import GradientText from "../../../../../Components/GradientText";
import { useNavigation } from "@react-navigation/native";
import { lightColors } from "../../../../../../theme";
import GradientButton from "../../../../../Components/buttons/GradientButton";

export default function BrandHeader() {
  const navigation = useNavigation();
  const backarrow = `<svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.58594 13L1.29304 7.70711C0.90252 7.31658 0.90252 6.68342 1.29304 6.29289L6.58594 1"
      stroke="url(#paint0_linear_1727_624)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <defs>
      <linearGradient id="paint0_linear_1727_624" x1="3.58594" y1="13" x2="3.58594" y2="1" gradientUnits="userSpaceOnUse">
        <stop stop-color="#1B2351"/>
        <stop offset="1" stop-color="#47C0D2"/>
      </linearGradient>
    </defs>
  </svg>`;
  const filledStar = `
  <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.6084 0L10.2697 4.33699L15.2169 5.52786L11.9145 9.39915L12.3107 14.4721L7.6084 12.5277L2.90612 14.4721L3.30227 9.39915L-5.38826e-05 5.52786L4.94707 4.33699L7.6084 0Z" fill="#47C0D2"/>
  </svg>
  `;

  const emptyStar = `
 <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.6084 0L10.2697 4.33699L15.2169 5.52786L11.9145 9.39915L12.3107 14.4721L7.6084 12.5277L2.90612 14.4721L3.30227 9.39915L-5.38826e-05 5.52786L4.94707 4.33699L7.6084 0Z" fill="#D9D9D9"/>
</svg>

  `;
  const rating = 3;
  const totalStars = 5;

  return (
    <SafeAreaView>
      <View style={{ padding: 20 }}>
        <Pressable onPress={() => navigation.goBack()}>
          <SvgXml xml={backarrow} width={10} height={14} />
        </Pressable>
        <View style={styles.PhotoContainer}>
          <Image
            source={require("../../../../../assests/imgs/BrandPhoto.png")}
            style={styles.BrandPhoto}
          />
          <GradientText text="Brand1" textStyle={styles.Brandtitle} />
        </View>
        <View style={styles.socialContainer}>
          <View>
            <Text style={styles.SocialNumber}>13K</Text>
            <Text style={styles.socialTitle}>Likes</Text>
          </View>
          <View>
            <Text style={styles.SocialNumber}>9K</Text>
            <Text style={styles.socialTitle}>Followers</Text>
          </View>
        </View>
        <View style={styles.starContainer}>
          {[...Array(totalStars)].map((_, index) => (
            <SvgXml
              key={index}
              xml={index < rating ? filledStar : emptyStar}
              width={16}
              height={16}
              style={{ marginHorizontal: 4 }}
            />
          ))}
        </View>
      </View>
       {/* Action Button */}
      <View style={styles.container}>
        <GradientButton text="Follow" style={styles.followbtn} />
        <Pressable style={styles.messagebtn}>
          <Text style={styles.messagetext}>Message</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  PhotoContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  BrandPhoto: {
    width: 100,
    height: 100,
  },
  Brandtitle: {
    fontWeight: 700,
    fontSize: 33,
    fontFamily: "Inter",
    marginTop: 2,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
  },
  SocialNumber: {
    fontSize: 24,
    fontWeight: 500,
    color: lightColors.primary,
    textAlign: "center",
  },
  socialTitle: {
    fontSize: 24,
    fontWeight: 400,
    textAlign: "center",
    color: "#4B5563",
  },
  starContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
// Action Button
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  followbtn: {
    width: 115,
    height: 40,
  },
  messagebtn: {
    width: 115,
    height: 40,
    backgroundColor: "#999999",
    borderRadius: 8,
    marginTop: 10,
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: 600,
  },
  messagetext: {
    textAlign: "center",
    marginTop: "auto",
    marginBottom: "auto",
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: 600,
  },
});
