import React, { useEffect, useRef, useState } from "react";
import { lightColors } from "../../../../theme";
import SuccessCard from "../../../Components/cards/SuccessCard";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Platform,
  Alert,
  ScrollView,
  Modal,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import GradientText from "../../../Components/GradientText";
import { SvgXml } from "react-native-svg";
import { TextInput as RNTextInput } from "react-native";
import TimerIcon from "../../../iconComponent/timer";
import useVerificaion from "../hooks/useVerificaion";
import type { AuthStackParamList } from "../../../Navigation/AuthStack";
import { RouteProp } from "@react-navigation/native";
import { resendOtp } from "../services/auth";
import InfoIcon from "../../../iconComponent/info";
import PhoneIcon from "../../../iconComponent/phone";
import { useAppDispatch } from "../../../Redux/store";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { setToken } from "../../../Redux/slices/authSlice";
import { RootStackParamList } from "../../../Navigation/AppNavigator";
const backIcon = `
  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M15 18.5L9.70711 13.2071C9.31658 12.8166 9.31658 12.1834 9.70711 11.7929L15 6.5" stroke="#6F7073" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `;
type RootNavigationType = NativeStackNavigationProp<
  RootStackParamList,
  "Auth",
  "User"
>;

export default function VerifyOtpScreen() {
  const navigation = useNavigation<RootNavigationType>();
  const dispatch = useAppDispatch();
  const { mutate, isPending, isSuccess, data, isError } = useVerificaion();
  type VerifyAccountRouteProp = RouteProp<AuthStackParamList, "verifyAccount">;
  const route = useRoute<VerifyAccountRouteProp>();
  const email = route.params.email;

  const [code, setCode] = useState<string[]>(["", "", "", "", ""]);
  const inputsRef = useRef<Array<TextInput | null>>([]);
  const [secondsLeft, setSecondsLeft] = useState<number>(60);
  const [valid, setValid] = useState(false);
  const [verificationError, setVerificationError] = useState<boolean>(false);
  //  const mainNavigation = useNavigation<LoginScreenNavigationProp>();

  useEffect(() => {
    const timer =
      secondsLeft > 0
        ? setInterval(() => setSecondsLeft((s) => s - 1), 1000)
        : null;
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [secondsLeft]);

  useEffect(() => {
    if (code.every((c) => c.length === 1)) {
      Keyboard.dismiss();
    }
    setValid(code.every((c) => c.length === 1));
  }, [code]);
  useEffect(() => {
    setVerificationError(isError);
  }, [isError]);
  useEffect(() => {
    if (!isSuccess) return;
    dispatch(setToken(data.data.token));
  }, [isSuccess]);

  function handleChangeText(text: string, idx: number) {
    const ch = text.replace(/\s+/g, "").slice(0, 1);
    setCode((prev) => {
      const next = [...prev];
      next[idx] = ch;
      return next;
    });

    if (ch && idx < inputsRef.current.length - 1) {
      // focus next
      const nextInput = inputsRef.current[idx + 1];
      nextInput?.focus();
    }
  }

  function handleKeyPress(e: any, idx: number) {
    if (e.nativeEvent.key === "Backspace") {
      if (!code[idx] && idx > 0) {
        const prevInput = inputsRef.current[idx - 1];
        prevInput?.focus();
        setCode((prev) => {
          const next = [...prev];
          next[idx - 1] = "";
          return next;
        });
      } else {
        setCode((prev) => {
          const next = [...prev];
          next[idx] = "";
          return next;
        });
      }
    }
  }

  function handlePasteText(pasted: string) {
    const digits = pasted.replace(/\D/g, "").slice(0, 6).split("");
    if (digits.length) {
      const filled = Array.from({ length: 6 }, (_, i) => digits[i] ?? "");
      setCode(filled);
      const lastIndex = Math.min(digits.length - 1, 5);
      inputsRef.current[lastIndex]?.focus();
    }
  }

  function handleVerify() {
    if (verificationError) {
      handleResend();
    } else {
      const otp = code.join("");
      mutate({ email, otp });
    }
  }

  async function handleResend() {
    const res = await resendOtp(email);
    // console.log(email);
    // console.log(res.data);
    // console.log(res.statusCode);
    if (res.data === "OTP resent successfully.") {
      setCode(["", "", "", "", ""]);
      setSecondsLeft(60);
      setVerificationError(false);
    } else {
      Alert.alert("Error", res.data);
    }
  }

  return (
    <SafeAreaView
      style={[styles.safe, { filter: isSuccess ? "blur(2px)" : "none" }]}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* header */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() =>
              navigation.canGoBack() ? navigation.goBack() : null
            }
            style={styles.headerBack}
          >
            <SvgXml xml={backIcon} width={24} height={25} />
          </TouchableOpacity>

          <GradientText text={"Alluvo"} textStyle={styles.text} />
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.container}>
          <Image
            source={
              verificationError
                ? require("../../../assests/imgs/verification-error.png")
                : require("../../../assests/imgs/verify.png")
            }
            style={styles.illustration}
            resizeMode="contain"
          />

          <Text
            style={[
              styles.title,
              { color: verificationError ? "#EF4444" : "#1B2351" },
            ]}
          >
            Verify Your Account
          </Text>
          <Text style={styles.subtitle}>
            We've sent a verification code to your email
          </Text>

          {/* OTP inputs */}
          <View style={styles.otpRow}>
            {Array.from({ length: 5 }).map((_, i) => {
              const [isFocused, setIsFocused] = useState(false);
              return (
                <RNTextInput
                  caretHidden
                  key={i}
                  ref={(el: RNTextInput | null) => {
                    inputsRef.current[i] = el;
                  }}
                  value={code[i]}
                  placeholder={isFocused ? "|" : "_"}
                  placeholderTextColor={isFocused ? "#1B2351" : "#C4C4C4"}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  onChangeText={(t) => {
                    if (t.length > 1) {
                      handlePasteText(t);
                    } else {
                      handleChangeText(t, i);
                    }
                  }}
                  onKeyPress={(e) => handleKeyPress(e, i)}
                  keyboardType={
                    Platform.OS === "ios" ? "number-pad" : "numeric"
                  }
                  maxLength={1}
                  style={[
                    styles.otpInput,
                    isFocused && { borderColor: "#1B2351", borderWidth: 1.4 },
                    { borderColor: verificationError ? "#EF4444" : "#1B2351" },
                    { color: verificationError ? "#EF4444" : "#1B2351" },
                  ]}
                  textAlign="center"
                  selectionColor="#1B2351"
                  autoFocus={i === 0}
                  returnKeyType="done"
                />
              );
            })}
          </View>

          {/* timer row VS error message */}
          {verificationError ? (
            <View style={{ alignItems: "center", marginTop: 16 }}>
              <Text
                style={{
                  fontFamily: "inter",
                  fontWeight: 400,
                  fontSize: 14,
                  color: "#EF4444",
                }}
              >
                Invalid code. Please try again
              </Text>
            </View>
          ) : (
            <View style={styles.timerRow}>
              {secondsLeft === 0 ? (
                <>
                  <TouchableOpacity
                    onPress={handleResend}
                    disabled={secondsLeft > 0}
                  >
                    <Text
                      style={{
                        fontFamily: "inter",
                        fontSize: 14,
                        fontWeight: 400,
                        color: "#1B2351",
                      }}
                    >
                      Resend Code
                    </Text>
                  </TouchableOpacity>
                </>
              ) : (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                  }}
                >
                  <TimerIcon />
                  <View style={{ flexDirection: "column" }}>
                    <Text style={styles.timerText}>
                      {` ${String(Math.floor(secondsLeft / 60)).padStart(
                        2,
                        "0"
                      )}:${String(secondsLeft % 60).padStart(2, "0")}`}
                    </Text>
                    <Text style={styles.resend}>
                      This may take up to 1 minute.
                    </Text>
                  </View>
                </View>
              )}
            </View>
          )}
          {verificationError && (
            <View style={styles.dividerContainer}>
              <View style={styles.line} />
              <Text style={styles.textLine}>or</Text>
              <View style={styles.line} />
            </View>
          )}

          {/* Verify button */}
          <TouchableOpacity
            style={{ width: "100%", marginTop: 18 }}
            onPress={handleVerify}
            activeOpacity={0.5}
            disabled={verificationError ? false : isPending || !valid}
          >
            {verificationError ? (
              <LinearGradient
                colors={["#892727", "#EF4444"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.verifyBtn]}
              >
                <Text style={styles.verifyBtnText}>Resend</Text>
              </LinearGradient>
            ) : (
              <LinearGradient
                colors={["#1B2351", "#47C0D2"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[
                  styles.verifyBtn,
                  { opacity: !valid || isPending ? 0.6 : 1 },
                ]}
              >
                <Text style={styles.verifyBtnText}>
                  {isPending ? "Verifying..." : "Verify Otp"}
                </Text>
              </LinearGradient>
            )}
          </TouchableOpacity>

          {/* info box */}
          <View
            style={[
              styles.infoBox,
              { backgroundColor: verificationError ? "#FEE2E2" : "#DDEEFD" },
            ]}
          >
            <View style={styles.infoRow}>
              <InfoIcon color={verificationError ? "#EF4444" : "#136EBF"} />
              <Text
                style={[
                  styles.infoText,
                  { color: verificationError ? "#B91C1C" : "#1B6EA8" },
                ]}
              >
                If you’re experiencing issues with verification, please check
                your spam folder or reach out to our support team for help.
              </Text>
            </View>
          </View>

          {/* contact support */}
          <TouchableOpacity style={styles.contactRow}>
            <PhoneIcon color={verificationError ? "#EF4444" : "#1B6EA8"} />
            <Text
              style={[
                styles.contactText,
                { color: verificationError ? "#EF4444" : "#1B6EA8" },
              ]}
            >
              Contact Support
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Modal transparent visible={isSuccess} animationType="fade">
        <SuccessCard />
      </Modal>
    </SafeAreaView>
  );
}

const BOX = {
  radius: 12,
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  },
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F6F3EC",
  },
  headerRow: {
    top: 60,
    height: 51,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerBack: {
    width: 50,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    color: "#6F7073",
  },

  text: {
    fontFamily: "CinzelDecorative-Regular",
    fontWeight: "400",
    fontStyle: "normal",
    fontSize: 24,
    lineHeight: 40,
    marginLeft: 10,
  },
  backChevron: {
    fontSize: 28,
    color: "#333",
  },
  logo: {
    width: 120,
    height: 34,
  },

  container: {
    paddingHorizontal: 24,
    alignItems: "center",
    top: 58,
  },

  illustration: {
    width: 220,
    height: 200,
    marginTop: 6,
  },

  title: {
    marginTop: 6,
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
  },
  subtitle: {
    marginTop: 8,
    color: "#6b6b6b",
    textAlign: "center",
    fontSize: 14,
    marginBottom: 18,
  },

  otpRow: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginTop: 8,
    paddingHorizontal: 6,
    gap: 10,
  },
  otpInput: {
    width: 54,
    height: 54,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E6E9EF",
    ...BOX.shadow,
    fontSize: 22,
    margin: 3,
    fontWeight: 700,
  },

  timerRow: {
    width: "100%",
    marginTop: 18,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 4,
    gap: 4,
  },
  timerText: {
    color: "#1B2351",
    fontWeight: "400",
    fontSize: 14,
  },
  resend: {
    color: "#777",
    fontSize: 12,
    marginLeft: 8,
    marginBottom: 10,
  },

  verifyBtn: {
    height: 54,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  verifyBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

  infoBox: {
    marginTop: 18,
    backgroundColor: "#DDEEFD",
    borderRadius: 12,
    padding: 14,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },

  infoText: {
    fontSize: 12,
    lineHeight: 18,
    flex: 1,
  },

  contactRow: {
    marginTop: 22,
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  contactIcon: {
    fontSize: 22,
    marginRight: 8,
    color: "#1B6EA8",
  },
  contactText: {
    fontSize: 18,
    fontWeight: "600",
  },
  errorText: { color: "red", fontSize: 12, marginTop: 2 },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 22,
    width: "80%",
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#EF4444",
  },
  textLine: {
    marginHorizontal: 5,
    fontFamily: "Inter",
    fontSize: 12,
    fontWeight: "400",
    color: "#6F7073",
    marginBottom: 7,
  },
});
