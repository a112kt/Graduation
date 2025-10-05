import React, { useEffect, useRef, useState } from "react";
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
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import GradientText from "../../Components/GradientText";
import { SvgXml } from "react-native-svg";
import { TextInput as RNTextInput } from "react-native";

export default function VerifyOtpScreen() {
  const navigation = useNavigation<any>();

  const phoneIcon = `
<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.6173 13.6094C15.997 12.9844 14.4946 12.0723 13.7657 11.7047C12.8165 11.2266 12.7384 11.1875 11.9923 11.7418C11.4946 12.1117 11.1638 12.4422 10.5813 12.318C9.99893 12.1937 8.7333 11.4934 7.6251 10.3887C6.51689 9.28398 5.77588 7.98164 5.65127 7.40117C5.52666 6.8207 5.8626 6.49375 6.229 5.99492C6.74541 5.2918 6.70635 5.17461 6.26494 4.22539C5.9208 3.48711 4.98213 1.99883 4.35479 1.38164C3.68369 0.71875 3.68369 0.835938 3.25127 1.01562C3.07525 1.08969 2.90298 1.17163 2.73446 1.26147C2.56595 1.35131 2.40189 1.44865 2.24229 1.55352C1.61729 1.96875 1.27041 2.31367 1.02783 2.83203C0.785254 3.35039 0.67627 4.56562 1.929 6.84141C3.18174 9.11719 4.06064 10.2809 5.87978 12.0949C7.69893 13.909 9.09775 14.8844 11.1427 16.0312C13.6724 17.448 14.6427 17.1719 15.1626 16.9297C15.6825 16.6875 16.029 16.3437 16.445 15.7188C16.5502 15.5594 16.6477 15.3956 16.7378 15.2273C16.8278 15.0589 16.9099 14.8868 16.9841 14.7109C17.1642 14.2801 17.2813 14.2801 16.6173 13.6094Z" stroke="#136EBF" stroke-width="1.25"/>
</svg>
`;

  const infoIcon = `
<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_323_2678)">
    <rect x="0.5" y="0.666992" width="20" height="20" fill="black" fill-opacity="0.01"/>
    <mask id="mask0_323_2678" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="21" height="21">
      <rect x="0.5" y="0.666992" width="20" height="20" fill="white"/>
    </mask>
    <g mask="url(#mask0_323_2678)"></g>
    <g clip-path="url(#clip1_323_2678)">
      <mask id="mask1_323_2678" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="21" height="21">
        <rect x="0.5" y="0.666992" width="20" height="20" fill="white"/>
      </mask>
      <g mask="url(#mask1_323_2678)">
        <path d="M10.5 3.79199C8.60152 3.79199 6.98107 4.46321 5.63864 5.80563C4.29621 7.14806 3.625 8.76851 3.625 10.667C3.625 12.5655 4.29621 14.1859 5.63864 15.5283C6.98107 16.8708 8.60152 17.542 10.5 17.542C12.3985 17.542 14.0189 16.8708 15.3614 15.5283C16.7038 14.1859 17.375 12.5655 17.375 10.667C17.375 8.76851 16.7038 7.14806 15.3614 5.80563C14.0189 4.46321 12.3985 3.79199 10.5 3.79199Z" stroke="#136EBF" stroke-width="1.25"/>
        <path d="M8.3125 8.56895C8.3125 8.56895 8.34531 7.88535 9.07695 7.29668C9.51094 6.94707 10.0312 6.8459 10.5 6.83887C10.927 6.8334 11.3082 6.9041 11.5363 7.0127C11.927 7.19863 12.6875 7.65254 12.6875 8.61777C12.6875 9.6334 12.0234 10.0947 11.2668 10.6021C10.5102 11.1096 10.3047 11.6604 10.3047 12.2295" stroke="#136EBF" stroke-width="1.09375" stroke-linecap="round"/>
        <circle cx="10.2656" cy="14.2607" r="0.78125" fill="#136EBF"/>
      </g>
    </g>
  </g>
  <defs>
    <clipPath id="clip0_323_2678">
      <rect width="20" height="20" fill="white" transform="translate(0.5 0.666992)"/>
    </clipPath>
    <clipPath id="clip1_323_2678">
      <rect width="20" height="20" fill="white" transform="translate(0.5 0.666992)"/>
    </clipPath>
  </defs>
</svg>
`;
  const backIcon = `
  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M15 18.5L9.70711 13.2071C9.31658 12.8166 9.31658 12.1834 9.70711 11.7929L15 6.5" stroke="#6F7073" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `;

  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const inputsRef = useRef<Array<TextInput | null>>([]);
  const [secondsLeft, setSecondsLeft] = useState<number>(60);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
  }, [code]);

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
    const otp = code.join("");
    if (otp.length < 6) {
      Alert.alert("Invalid OTP", "Please enter the 6-digit code.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert("Verified", `Code ${otp} submitted (simulate).`);
    }, 1000);
  }

  function handleResend() {
    setSecondsLeft(60);
    // TODO: call resend API
    Alert.alert("Resend", "A new verification code has been sent (simulate).");
  }

  return (
    <SafeAreaView style={styles.safe}>
      {/* header */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          onPress={() => (navigation.canGoBack() ? navigation.goBack() : null)}
          style={styles.headerBack}
        >
          <SvgXml xml={backIcon} width={24} height={25} />
        </TouchableOpacity>

        <GradientText text={"Alluvo"} textStyle={styles.text} />
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.container}>
        <Image
          source={require("../../assests/imgs/verify.png")}
          style={styles.illustration}
          resizeMode="contain"
        />

        <Text style={styles.title}>Verify Your Account</Text>
        <Text style={styles.subtitle}>
          We've sent a verification code to your email
        </Text>

        {/* OTP inputs */}
        <View style={styles.otpRow}>
          {Array.from({ length: 5 }).map((_, i) => {
            const [isFocused, setIsFocused] = useState(false);
            return (
              <RNTextInput
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
                keyboardType={Platform.OS === "ios" ? "number-pad" : "numeric"}
                maxLength={1}
                style={[
                  styles.otpInput,
                  isFocused && { borderColor: "#1B2351", borderWidth: 1.4 },
                ]}
                textAlign="center"
                selectionColor="#1B2351"
                autoFocus={i === 0}
                returnKeyType="done"
              />
            );
          })}
        </View>

        {/* timer row */}
        <View style={styles.timerRow}>
          <Text style={styles.timerIcon}>⏱</Text>
          <Text style={styles.timerText}>
            {` ${String(Math.floor(secondsLeft / 60)).padStart(
              2,
              "0"
            )}:${String(secondsLeft % 60).padStart(2, "0")}`}
          </Text>

          <TouchableOpacity
            onPress={handleResend}
            disabled={secondsLeft > 0}
            style={{ marginLeft: 12 }}
          >
            <Text style={[styles.resend, secondsLeft > 0 && { opacity: 0.4 }]}>
              {secondsLeft > 0
                ? "This may take up to 1 minute."
                : "Resend code"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Verify button */}
        <TouchableOpacity
          style={{ width: "100%", marginTop: 18 }}
          onPress={handleVerify}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={["#1B2351", "#47C0D2"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.verifyBtn}
          >
            <Text style={styles.verifyBtnText}>
              {isSubmitting ? "Verifying..." : "Verify Otp"}
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* info box */}
        <View style={styles.infoBox}>
          <View style={styles.infoRow}>
            <SvgXml xml={infoIcon} width={21} height={21} />
            <Text style={styles.infoText}>
              If you’re experiencing issues with verification, please check your
              spam folder or reach out to our support team for help.
            </Text>
          </View>
        </View>

        {/* contact support */}
        <TouchableOpacity style={styles.contactRow}>
          <SvgXml xml={phoneIcon} width={18} height={18} />
          <Text style={styles.contactText}>Contact Support</Text>
        </TouchableOpacity>
      </View>
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
    flex: 1,
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
    color: "#1B2351",
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
    paddingHorizontal: 2,
    gap:16
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
    color: "#1B2351",
    margin: 3,
  },

  timerRow: {
    width: "100%",
    marginTop: 18,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  timerIcon: {
    fontSize: 18,
    color: "#1B2351",
  },
  timerText: {
    marginLeft: 8,
    color: "#1B2351",
    fontWeight: "600",
    fontSize: 10,
  },
  resend: {
    color: "#777",
    fontSize: 12,
    marginLeft: 8,
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
    backgroundColor: "#eaf6ff",
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
    color: "#1B6EA8",
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
    color: "#1B6EA8",
    fontSize: 18,
    fontWeight: "600",
  },
});
