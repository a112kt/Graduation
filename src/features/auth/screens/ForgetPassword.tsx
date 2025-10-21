import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { lightColors } from "../../../../theme";
import GradientText from "../../../Components/GradientText";
import { SafeAreaView } from "react-native-safe-area-context";
import GradientButton from "../../../Components/buttons/GradientButton";
import { SvgXml } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../../Navigation/AuthStack";

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, "Login">;

export default function ForgetPassword() {
  const navigation = useNavigation<NavigationProp>();
  const [email, setEmail] = useState("");

  const backArrow = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.428467 8.14279H8.14275C9.05207 8.14279 9.92414 7.78156 10.5671 7.13858C11.2101 6.4956 11.5713 5.62353 11.5713 4.71422C11.5713 3.8049 11.2101 2.93283 10.5671 2.28985C9.92414 1.64687 9.05207 1.28564 8.14275 1.28564H5.57132" stroke="#3E548D" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.9999 5.57129L0.428467 8.14272L2.9999 10.7141" stroke="#3E548D" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Logo Section */}
        <View style={styles.logoContainer}>
          <GradientText text="Alluvo" textStyle={styles.logo} />
        </View>

        {/* Content Section */}
        <View style={styles.content}>
          <Text style={styles.header}>Forget Password</Text>

          <View style={styles.Inputcontainer}>
            <Text style={styles.label}>Email</Text>

            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
              />
            </View>
            <GradientButton
              text="Send Email"
              style={{
                ...styles.btn,
                opacity: email ? 1 : 0.6,
              }}
              onPress={() => {
                // المفروض تبقي كدا
                // navigation.navigate('verifyAccount')
                // navigation.navigate('resetPassword')
              }}
            />

            {/* Back To login */}
            <TouchableOpacity
              style={styles.backContainer}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.backText}>Back To login</Text>
              <SvgXml xml={backArrow} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightColors.background,
  },
  safeArea: {
    flex: 1,
  },
  logoContainer: {
    top: 61,
    left: 23,
    gap: 5,
    width: 100,
    height: 51,
    position: "absolute",
  },
  logo: {
    fontFamily: "CinzelDecorative-Regular",
    fontWeight: "400",
    fontStyle: "normal",
    fontSize: 24,
    letterSpacing: 0,
    opacity: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 215,
  },
  header: {
    fontFamily: "Inter-SemiBold",
    fontWeight: "600",
    fontStyle: "normal",
    fontSize: 24,
    letterSpacing: 0,
    textAlign: "center",
    color: "#1B2351",
  },
  Inputcontainer: {
    width: 336,
    gap: 10,
    marginTop: 33,
  },
  label: {
    fontFamily: "Inter-Regular",
    fontWeight: "400",
    fontStyle: "normal",
    fontSize: 13,
    lineHeight: 13,
    letterSpacing: 0,
    color: "#1B2351",
  },
  inputWrapper: {
    height: 47,
    borderRadius: 8,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  input: {
    fontSize: 13,
    fontFamily: "Inter-Regular",
    fontWeight: "400",
    color: "#1B2351",
  },
  btn: {
    width: 336,
    height: 40,
    borderRadius: 10,
    fontSize: 14,
    marginTop: 20,
  },
  backContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    gap: 5,
  },
  backText: {
    fontFamily: "Inter-Regular",
    fontWeight: "400",
    fontSize: 13,
    lineHeight: 24,
    letterSpacing: 0,
    textAlign: "center",
    color: "#3E548D",
    textAlignVertical: "center",
  },
});
