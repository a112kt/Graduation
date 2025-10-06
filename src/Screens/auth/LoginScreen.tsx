import React, { useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import GradientText from "../../Components/GradientText";
import { SvgXml } from "react-native-svg";
import { TextInput } from "react-native-paper";
import { lightColors } from "../../../theme";
import { useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "../../Navigation/AuthStack";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";

type LoginScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "Login",
  "role"
>;

export default function LoginScreen() {
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const shadow_SVG = `<svg width="237" height="24" viewBox="0 0 237 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M237 12C237 18.6274 183.946 24 118.5 24C53.0543 24 0 18.6274 0 12C0 5.37258 53.0543 0 118.5 0C183.946 0 237 5.37258 237 12Z" fill="url(#paint0_radial_172_1751)"/>
<defs>
<radialGradient id="paint0_radial_172_1751" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(118.5 12) scale(118.5 12)">
<stop stop-color="#0C0C0C" stop-opacity="0.26"/>
<stop offset="1" stop-color="#737373" stop-opacity="0"/>
</radialGradient>
</defs>
</svg>`;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const emailError = email.length === 0;
  const passwordError = password.length === 0;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          scrollEnabled
        >
          {/* Logo */}
          <View style={styles.logoWrapper}>
            <View style={styles.logo}>
              <Image
                source={require("../../assests/imgs/AlluvoLogo.png")}
                style={{ width: 62, height: 65 }}
              />
              <GradientText text="Alluvo" textStyle={styles.text} />
            </View>
            <SvgXml xml={shadow_SVG} width={237} height={24} style={styles.shadow} />
          </View>

          {/* Form area */}
          <View style={styles.formCard}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              placeholder="Enter Your Email"
              value={email}
              onChangeText={setEmail}
              mode="flat"
              style={styles.input}
              underlineColor="transparent"
              contentStyle={styles.inputContent}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {emailError && <Text style={styles.error}>Not Valid Email</Text>}

            <Text style={styles.label}>Password</Text>
            <TextInput
              placeholder="Enter Your Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!visible}
              mode="flat"
              style={styles.input}
              underlineColor="transparent"
              contentStyle={styles.inputContent}
              right={
                <TextInput.Icon
                  icon={visible ? "eye-off" : "eye"}
                  forceTextInputFocus={false}
                  onPress={() => setVisible((v) => !v)}
                />
              }
            />

            <Pressable onPress={() => navigation.navigate("forgetPassword")}>
              <Text style={styles.forgetPassword}>Forget Password?</Text>
            </Pressable>

            <Pressable style={styles.loginButton}>
              <LinearGradient
                colors={["#1B2351", "#47C0D2"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.loginButton}
              >
                <Text style={styles.loginText}>Login</Text>
              </LinearGradient>
            </Pressable>

            <View style={styles.dividerContainer}>
              <View style={styles.line} />
              <Text style={styles.textLine}>Or With</Text>
              <View style={styles.line} />
            </View>

            <View style={styles.socialContainer}>
              <Pressable style={styles.socialButton}>
                <Image
                  source={require("../../assests/imgs/google.png")}
                  style={styles.socialIcon}
                />
                <Text style={styles.socialText}>Sign in with Google</Text>
              </Pressable>

              <Pressable style={styles.socialButton}>
                <Image
                  source={require("../../assests/imgs/Tiktok.png")}
                  style={styles.socialIcon}
                />
                <Text style={styles.socialText}>Sign in with Tiktok</Text>
              </Pressable>
            </View>

            <View style={styles.SignUp}>
              <Text style={styles.SignUpText}>Don’t have an account?</Text>
              <Pressable onPress={() => navigation.navigate("role")}>
                <Text style={styles.SignUpbtn}>Sign Up</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightColors.background,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  logoWrapper: {
    alignItems: "center",
    marginTop: 100,
  },
  logo: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontFamily: "CinzelDecorative-Regular",
    fontWeight: "400",
    fontStyle: "normal",
    fontSize: 40,
    lineHeight: 40,
    marginLeft: 10,
  },
  shadow: {
    marginTop: 15,
  },
  formCard: {
    marginTop: 40,
  },
  label: {
    marginBottom: 6,
    color: lightColors.primary,
    fontFamily: "Inter",
    fontWeight: "400",
    fontSize: 14,
  },
  input: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 6,
  },
  inputContent: {
    height: 42,
    paddingHorizontal: 6,
    fontFamily: "Inter",
  },
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
  forgetPassword: {
    color: lightColors.primary,
    fontWeight: "500",
    fontSize: 13,
    textAlign: "center",
    textDecorationLine: "underline",
    marginTop: 10,
  },
  loginButton: {
    width: "100%",
    height: 44,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  loginText: {
    fontFamily: "Inter",
    fontWeight: "500",
    fontSize: 16,
    color: "#fff",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 30,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: lightColors.primary,
  },
  textLine: {
    marginHorizontal: 10,
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: "500",
    color: "#666666",
  },
  socialContainer: {
    gap: 12,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  socialText: {
    fontFamily: "Inter",
    fontSize: 16,
    fontWeight: "500",
  },
  SignUp: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
  SignUpText: {
    fontWeight: "500",
    fontSize: 16,
    color: "#666666",
  },
  SignUpbtn: {
    marginLeft: 4,
    color: lightColors.primary,
    fontSize: 16,
    textDecorationLine: "underline",
  },
});