import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { TextInput } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { SvgXml } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../Navigation/AuthStack";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { themeContext } from "../../context/themeContext";
import { useContext } from "react";
import { ColorSet } from "../../../types";

type RegisterScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "Login"
>;

export default function RegisterScreen() {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const { theme } = useContext(themeContext)!;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [birthday, setBirthday] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [gender, setGender] = useState<"male" | "female" | null>(null);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [pickedDate, setPickedDate] = useState<Date>(new Date());

  const headerWave = `<svg width="375" height="100" viewBox="0 0 375 100" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.2" d="M126.571 58.3366C43.5748 127.618 -25.1083 172.576 -71.6371 172.576L-210.542 49.5945C-76.6197 147.458 71.6706 68.4345 155.855 13.7327C223.203 -30.0287 369.946 25.1056 420.092 43.3357L419.173 126.708C271.151 18.2888 210.937 -12.0875 126.571 58.3366Z" fill="url(#paint0_linear_807_224)"/>
<defs>
<linearGradient id="paint0_linear_807_224" x1="419.626" y1="89.0217" x2="-210.924" y2="81.4445" gradientUnits="userSpaceOnUse">
<stop stop-color="#1B2351"/>
<stop offset="1" stop-color="#47C0D2"/>
</linearGradient>
</defs>
</svg>`;

  const arrowSvg = `<svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7 13L1.70711 7.70711C1.31658 7.31658 1.31658 6.68342 1.70711 6.29289L7 1" stroke="#FEFEFE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

  const formatDateToDDMMYYYY = (d: Date) => {
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return ` ${day}/${month}/${year}`;
  };

  const onChangeDate = (event: DateTimePickerEvent, selected?: Date) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }
    if (selected) {
      setPickedDate(selected);
      setBirthday(formatDateToDDMMYYYY(selected));
    }
  };

  const openDatePicker = () => {
    setShowDatePicker(true);
  };
  const styles = createStyles(theme)

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <View style={styles.headerWrapper}>
        <LinearGradient
          colors={["#1B2351", "#47C0D2"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.headerGradient}
        >
          <Pressable
            onPress={() => {
              if (navigation.canGoBack()) {
                navigation.goBack();
              } else {
                navigation.navigate("role");
              }
            }}
            style={styles.backCircle}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <SvgXml xml={arrowSvg} width={8} height={14} />
          </Pressable>

          <Text style={styles.headerTitle}>Create an account</Text>
        </LinearGradient>

        <SvgXml xml={headerWave} style={styles.svgWave} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Avatar */}
          <View style={styles.avatarWrapper}>
            <Image
              source={require("../../assests/imgs/Avater.png")}
              style={styles.avatarImage}
              resizeMode="cover"
            />
            <TouchableOpacity style={styles.avatarAdd}>
              <Image
                source={require("../../assests/imgs/plus.png")}
                style={{ width: 16, height: 16 }}
              />
            </TouchableOpacity>
          </View>

          {/* Form */}
          <View>
            {/* First Name */}
            <Text style={styles.label}>First Name</Text>
            <TextInput
              placeholder="Enter your first name"
              value={firstName}
              onChangeText={setFirstName}
              mode="flat"
              style={styles.input}
              contentStyle={styles.inputContent}
              theme={{ colors: { placeholder: "#CDD5DF", text: "#111" } }}
            />

            {/* Last Name */}
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              placeholder="Enter your last name"
              value={lastName}
              onChangeText={setLastName}
              mode="flat"
              style={styles.input}
              contentStyle={styles.inputContent}
              theme={{ colors: { placeholder: "#CDD5DF", text: "#111" } }}
            />

            {/* Email */}
            <Text style={styles.label}>Email</Text>
            <TextInput
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              mode="flat"
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
              contentStyle={styles.inputContent}
              theme={{ colors: { placeholder: "#CDD5DF", text: "#111" } }}
            />

            {/* Phone */}
            <Text style={styles.label}>Phone</Text>
            <View style={styles.phoneInputContainer}>
              <Text style={styles.prefix}>+20</Text>
              <TextInput
                placeholder="Enter phone number"
                value={phone}
                onChangeText={setPhone}
                mode="flat"
                keyboardType="phone-pad"
                style={styles.phoneInput}
                contentStyle={styles.inputContent}
                theme={{ colors: { placeholder: "#CDD5DF", text: "#111" } }}
              />
            </View>

            {/* Password */}
            <Text style={styles.label}>Password</Text>
            <TextInput
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
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

            {/* Confirm Password */}
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              placeholder="Confirm your password"
              value={confirm}
              onChangeText={setConfirm}
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

            <Text style={styles.label}>Birthday</Text>
            <View style={styles.inputContainer}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={openDatePicker}
                style={{ flex: 1 }}
              >
                <TextInput
                  placeholder="DD/MM/YYYY"
                  value={birthday}
                  mode="flat"
                  style={styles.input2}
                  placeholderTextColor="#CDD5DF"
                  contentStyle={styles.inputContent}
                  editable={false}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.iconContainer}
                onPress={openDatePicker}
                activeOpacity={0.8}
              >
                <Image
                  source={require("../../assests/imgs/calender.png")}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>

            {showDatePicker && (
              <DateTimePicker
                value={pickedDate}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "calendar"}
                onChange={onChangeDate}
                maximumDate={new Date()}
              />
            )}

            {/* Gender */}
            <View style={styles.gender}>
              <Text style={styles.genderText}>Gender</Text>
              <View style={styles.genderRow}>
                <Pressable
                  onPress={() => setGender("male")}
                  style={{ marginRight: 10 }}
                >
                  {gender === "male" ? (
                    <LinearGradient
                      colors={["#1B2351", "#47C0D2"]}
                      style={styles.genderBtn}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                    >
                      <Image
                        source={require("../../assests/imgs/male.png")}
                        style={styles.genderIcon}
                      />
                    </LinearGradient>
                  ) : (
                    <View
                      style={[styles.genderBtn, { backgroundColor: "#919193" }]}
                    >
                      <Image
                        source={require("../../assests/imgs/male.png")}
                        style={styles.genderIcon}
                      />
                    </View>
                  )}
                </Pressable>

                <Pressable onPress={() => setGender("female")}>
                  {gender === "female" ? (
                    <LinearGradient
                      colors={["#1B2351", "#47C0D2"]}
                      style={styles.genderBtn}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                    >
                      <Image
                        source={require("../../assests/imgs/famel.png")}
                        style={styles.genderIcon}
                      />
                    </LinearGradient>
                  ) : (
                    <View
                      style={[styles.genderBtn, { backgroundColor: "#919193" }]}
                    >
                      <Image
                        source={require("../../assests/imgs/famel.png")}
                        style={styles.genderIcon}
                      />
                    </View>
                  )}
                </Pressable>
              </View>
            </View>

            {/* Register */}
            <Pressable
              onPress={() => navigation.navigate("verifyAccount" as any)}
              style={{ marginTop: 18 }}
            >
              <LinearGradient
                colors={["#1B2351", "#47C0D2"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.registerBtn}
              >
                <Text style={styles.registerText}>Register</Text>
              </LinearGradient>
            </Pressable>

            {/* Divider */}
            <View style={styles.dividerRow}>
              <View style={styles.divLine} />
              <Text style={styles.divText}>Or With</Text>
              <View style={styles.divLine} />
            </View>

            {/* Social */}
            <View style={{ marginTop: 8 }}>
              <Pressable style={styles.socialBtn}>
                <Image
                  source={require("../../assests/imgs/google.png")}
                  style={styles.socialIcon}
                />
                <Text style={styles.socialText}>Sign in with Google</Text>
              </Pressable>

              <Pressable style={[styles.socialBtn, { marginTop: 12 }]}>
                <Image
                  source={require("../../assests/imgs/Tiktok.png")}
                  style={styles.socialIcon}
                />
                <Text style={styles.socialText}>Sign in with TikTok</Text>
              </Pressable>
            </View>
          </View>

          {/* Sign in */}
          <View style={styles.SignIp}>
            <Text style={styles.SignIpText}>Already have an account?</Text>
            <Pressable onPress={() => navigation.navigate("Login" as any)}>
              <Text style={styles.SignInbtn}>Sign In</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}


function createStyles(t:ColorSet) {
  return StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: t.backgroundColors.main,
  },

  headerWrapper: {
    position: "relative",
  },
  headerGradient: {
    height: 100,
    paddingTop: Platform.OS === "ios" ? 36 : 25,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },
  backCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  svgWave: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: 100,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 12,
  },

  // Add Photo
  avatarWrapper: {
    width: 122,
    height: 122,
    overflow: "hidden",
    alignSelf: "center",
    position: "relative",
  },

  avatarImage: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },

  avatarAdd: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 6,
    borderWidth: 1,
    borderColor: "#477fd2ff",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },

  // Input
  label: {
    fontSize: 14,
    color: t.typographyColors.title,
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
  },

  // Phone input
  phoneInputContainer: {
    position: "relative",
    width: "100%",
    marginBottom: 10,
  },

  prefix: {
    position: "absolute",
    left: 16,
    top: "50%",
    transform: [{ translateY: -10 }],
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: "500",
    color: "#111",
    zIndex: 1,
  },

  phoneInput: {
    height: 48,
    borderRadius: 8,
    paddingLeft: 52,
    fontSize: 16,
    color: "#111",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 6,
    fontFamily: "Inter",
  },

  // Birthday
  inputContainer: {
    position: "relative",
    width: "100%",
    marginBottom: 10,
  },

  input2: {
    height: 49,
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 6,
    fontFamily: "Inter",
    paddingHorizontal: 12,
    justifyContent: "center",
  },
  iconContainer: {
    position: "absolute",
    right: 12,
    top: 20,
    transform: [{ translateY: -12 }],
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },

  icon: {
    width: 20,
    height: 20,
  },

  //Gender
  gender: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  genderRow: {
    flexDirection: "row",
    marginTop: 6,
  },
  genderText: {
    fontFamily: "Inter",
    fontWeight: "500",
    fontStyle: "normal",
    fontSize: 18,
    color: t.mainColors.primary,
  },
  genderBtn: {
    width: 27,
    height: 27,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#919193",
    borderRadius: 1000,
    paddingVertical: 10,
    paddingHorizontal: 11,
  },
  genderIcon: {
    width: 14,
    height: 14,
    color:  t.mainColors.primary,
    textAlign: "center",
  },
  // Registerbtn
  registerBtn: {
    height: 44,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  registerText: {
    color: "#fff",
    fontFamily: "Inter",
    fontSize: 16,
    fontWeight: "600",
  },

  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
  },
  // Line
  divLine: {
    flex: 1,
    height: 1,
    backgroundColor:  t.backgroundColors.main,
  },
  divText: {
    marginHorizontal: 12,
    fontFamily: "Inter",
    fontSize: 13,
    color: "#666666",
    fontWeight: "500",
  },
  // social media
  socialBtn: {
    height: 48,
    borderRadius: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  },
  socialIcon: {
    width: 28,
    height: 28,
    marginRight: 12,
  },
  socialText: {
    fontFamily: "Inter",
    fontSize: 15,
    fontWeight: "500",
  },

  //Sign in
  SignIp: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
    marginBottom: 10,
  },
  SignIpText: {
    fontWeight: "500",
    fontStyle: "normal",
    fontSize: 16,
    color: "#666666",
  },
  SignInbtn: {
    marginLeft: 2,
    color: t.mainColors.primary,
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
}
