import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Image,
  Platform,
  Alert,
} from "react-native";
import { TextInput } from "react-native-paper";
import React, { useState } from "react";
import { lightColors } from "../../../../theme";
import GradientText from "../../../Components/GradientText";
import { SafeAreaView } from "react-native-safe-area-context";
import GradientButton from "../../../Components/buttons/GradientButton";
import { SvgXml } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../../Navigation/AuthStack";
import { KeyboardAvoidingView } from "react-native";
import * as Yup from "yup";
import { useFormik } from "formik";
import { resetPassword } from "../services/auth";
import { useSelector } from "react-redux";

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, "Login">;

export default function ResetPassword() {
  const token = useSelector((state: any) => state.auth.token);
  const navigation = useNavigation<NavigationProp>();

  // UI states
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const backArrow = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.428467 8.14279H8.14275C9.05207 8.14279 9.92414 7.78156 10.5671 7.13858C11.2101 6.4956 11.5713 5.62353 11.5713 4.71422C11.5713 3.8049 11.2101 2.93283 10.5671 2.28985C9.92414 1.64687 9.05207 1.28564 8.14275 1.28564H5.57132" stroke="#3E548D" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.9999 5.57129L0.428467 8.14272L2.9999 10.7141" stroke="#3E548D" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

  const handleSave = () => {
    setModalVisible(true);
  };

  const handleContinue = () => {
    setModalVisible(false);
    navigation.navigate("Login");
  };

  // Api connection
  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm your password"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        await resetPassword(token, values.password);
        setModalVisible(true);
      } catch (err) {
        console.log("resetPassword error:", err);
      }
    },
  });

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.logoContainer}>
              <GradientText text="Alluvo" textStyle={styles.logo} />
            </View>

            <View style={styles.content}>
              <Text style={styles.header}>Reset password</Text>
              <Text style={styles.des}>Please enter your new password</Text>

              <View style={styles.Inputcontainer}>
                {/* Password Field */}
                {/* Password */}
                <Text style={styles.label}>Password</Text>
                <TextInput
                  placeholder="Enter your password"
                  value={formik.values.password}
                  onChangeText={formik.handleChange("password")}
                  onBlur={formik.handleBlur("password")}
                  secureTextEntry={!showPassword}
                  mode="flat"
                  right={
                    <TextInput.Icon
                      icon={showPassword ? "eye-off" : "eye"}
                      onPress={() => setShowPassword((s) => !s)}
                      forceTextInputFocus={false}
                      color="#CDD5DF"
                    />
                  }
                  style={styles.input}
                  contentStyle={styles.inputContent}
                />
                {formik.touched.password && formik.errors.password && (
                  <Text style={{ color: "red", marginBottom: 4 }}>
                    {formik.errors.password}
                  </Text>
                )}

                {/* Confirm Password */}
                <Text style={styles.label}>Confirm Password</Text>
                <TextInput
                  placeholder="Confirm your password"
                  value={formik.values.confirmPassword}
                  onChangeText={formik.handleChange("confirmPassword")}
                  onBlur={formik.handleBlur("confirmPassword")}
                  secureTextEntry={!showConfirm}
                  mode="flat"
                  right={
                    <TextInput.Icon
                      icon={showConfirm ? "eye-off" : "eye"}
                      onPress={() => setShowConfirm((s) => !s)}
                      forceTextInputFocus={false}
                      color="#CDD5DF"
                    />
                  }
                  style={styles.input}
                  contentStyle={styles.inputContent}
                />
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <Text style={{ color: "red", marginBottom: 4 }}>
                      {formik.errors.confirmPassword}
                    </Text>
                  )}

                <GradientButton
                  text="Save"
                  style={{
                    ...styles.btn,
                    opacity: formik.isValid && formik.dirty ? 1 : 0.5,
                  }}
                  onPress={() => formik.handleSubmit()}
                />

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
      </KeyboardAvoidingView>

      {/* Success Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={modalStyles.overlay}>
          <View style={modalStyles.card}>
            <Image
              source={require("../../../assests/imgs/password_changed.png")}
              style={modalStyles.image}
              resizeMode="contain"
            />

            <Text style={modalStyles.title}>Password changed successfully</Text>
            <Text style={modalStyles.sub}>
              You can now log in with your new password
            </Text>

            <GradientButton
              text="Continue to Login"
              style={modalStyles.continueBtn}
              onPress={handleContinue}
            />
          </View>
        </View>
      </Modal>
    </>
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
  des: {
    fontFamily: "Inter-Light",
    fontWeight: "300",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 36,
    letterSpacing: 0,
    color: "#666666",
    textAlignVertical: "center",
  },
  Inputcontainer: {
    width: 336,
    marginTop: 33,
  },
  label: {
  fontSize: 14,
  color: lightColors.primary,
  marginTop: 8,
  marginBottom: 6,
  fontFamily: "Inter",
},
input: {
  backgroundColor: "#fff",
  borderRadius: 8,
  height: 48,
  marginBottom: 8,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0.08,
  shadowRadius: 4,
  elevation: 6,
},
  inputContent: {
    fontFamily: "Inter",
    fontWeight: "500",
    fontStyle: "normal",
    fontSize: 12,
    lineHeight: 12,
    letterSpacing: 0,
    textAlignVertical: "center",
    color: "#666666",
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

/* Modal styles */
const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  card: {
    width: 343,
    height: 362,
    gap: 16,
    backgroundColor: "#FEFEFE",
    borderRadius: 16,
    paddingVertical: 32,
    paddingHorizontal: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 120,
  },
  title: {
    fontFamily: "Inter-SemiBold",
    fontWeight: "500",
    fontSize: 16,
    color: "#1B2351",
    textAlign: "center",
  },
  sub: {
    fontFamily: "Inter-Light",
    fontWeight: "500",
    fontSize: 14,
    color: "#4B5563",
    textAlign: "center",
  },
  continueBtn: {
    width: 317,
    height: 48,
    borderRadius: 8,
  },
});
