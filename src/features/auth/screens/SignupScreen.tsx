import React, { useEffect, useState } from "react";
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
import { lightColors } from "../../../../theme";
import { SvgXml } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../../Navigation/AuthStack";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../Redux/store";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  RegisterData,
  resetRegisterState,
  registerUser,
} from "../../../Redux/slices/registerSlice";

type RegisterScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "Login"
>;

export default function RegisterScreen() {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, success, error, message } = useSelector(
    (state: RootState) => state.register
  );

  // SVGs
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

  // Format helpers
  const formatDateToDDMMYYYY = (d: Date) => {
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatDateToYYYYMMDD = (d: Date) => {
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  };

  // Validation schema
  const RegisterSchema = Yup.object().shape({
    FirstName: Yup.string()
      .min(2, "First name must be at least 2 characters")
      .required("First name is required"),

    LastName: Yup.string()
      .min(2, "Last name must be at least 2 characters")
      .required("Last name is required"),

    Email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),

    PhoneNumber: Yup.string()
      .matches(
        /^1[0-9]{9}$/,
        "Invalid phone number. Must be 10 digits after +20"
      )
      .required("Phone number is required"),

    Password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),

    ConfirmPassword: Yup.string()
      .oneOf([Yup.ref("Password")], "Passwords must match")
      .required("Confirm password is required"),

    DateOfBirth: Yup.string().required("Date of birth is required"),

    Gender: Yup.string()
      .oneOf(["Male", "Female"], "Invalid gender")
      .required("Gender is required"),
  });

  const initialValues: RegisterData & { ConfirmPassword?: string } = {
    FirstName: "",
    LastName: "",
    Email: "",
    PhoneNumber: "",
    Password: "",
    DateOfBirth: "",
    Gender: "Female",
    ProfileImage: "",
  };

  // UI local states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [pickedDate, setPickedDate] = useState<Date>(new Date());
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Image picker
  const pickImage = async (
    setFieldValue: (field: string, value: any) => void
  ) => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("You need to grant permission to access the gallery!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const asset = result.assets[0];
      const uri = asset.uri;

      console.log("📸 Selected image src (uri):", uri);

      setSelectedImage(uri);
      setFieldValue("ProfileImage", uri);
    } else {
      console.log("❌ No image selected or action canceled.");
    }
  };

  const onChangeDate = (
    event: DateTimePickerEvent,
    selected?: Date,
    setFieldValue?: (field: string, value: any) => void
  ) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }
    if (selected && setFieldValue) {
      setPickedDate(selected);
      setFieldValue("DateOfBirth", formatDateToYYYYMMDD(selected));
    }
  };

  const handleSubmit = (values: any, dispatch: any) => {
  const form = new FormData();
  form.append("FirstName", values.FirstName);
  form.append("LastName", values.LastName);
  form.append("Email", values.Email);
  form.append("PhoneNumber", `+20${values.PhoneNumber}`);
  form.append("Password", values.Password);
  form.append("DateOfBirth", values.DateOfBirth);
  form.append("Gender", values.Gender);

  if (values.ProfileImage) {
    const uri = values.ProfileImage;
    const fileName = uri.split("/").pop() || "profile.jpg";
    const fileType = "image/jpeg";

    form.append("ProfileImage", {
      uri,
      name: fileName,
      type: fileType,
    } as any);
  }

  console.log("🚀 Sending FormData...");
  dispatch(registerUser(form as any));
};


  useEffect(() => {
    if (success) {
      const t = setTimeout(() => {
        dispatch(resetRegisterState());
        navigation.navigate("Login");
      }, 1500);
      return () => clearTimeout(t);
    }
  }, [success, dispatch, navigation]);

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
          <SvgXml xml={headerWave} style={styles.svgWave} />
          <Pressable
            onPress={() => {
              if (navigation.canGoBack()) navigation.goBack();
              else navigation.navigate("role" as any);
            }}
            style={styles.backCircle}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <SvgXml xml={arrowSvg} width={8} height={14} />
          </Pressable>

          <Text style={styles.headerTitle}>Create an account</Text>
        </LinearGradient>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Formik
            initialValues={initialValues}
            validationSchema={RegisterSchema}
            validateOnMount={true}
           onSubmit={(values) => handleSubmit(values, dispatch)}  
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              setFieldValue,
              isValid,
              dirty,
            }) => {
              const disabled = !isValid || !dirty || loading;
              return (
                <>
                  {/* Avatar */}
                  <View style={styles.avatarWrapper}>
                    <TouchableOpacity
                      onPress={() => {
                        console.log("🟢 Image pressed");
                        pickImage(setFieldValue);
                      }}
                    >
                      <View style={styles.avatarContainer}>
                        <Image
                          source={
                            selectedImage
                              ? { uri: selectedImage }
                              : require("../../../assests/imgs/Addphoto.png")
                          }
                          style={[
                            styles.avatarImage,
                            selectedImage && { borderRadius: 75 },
                          ]}
                          resizeMode="cover"
                        />
                      </View>
                    </TouchableOpacity>
                  </View>

                  {/* First Name */}
                  <Text style={styles.label}>First Name</Text>
                  <TextInput
                    placeholder="Enter your first name"
                    value={values.FirstName}
                    onChangeText={handleChange("FirstName")}
                    onBlur={handleBlur("FirstName")}
                    mode="flat"
                    style={styles.input}
                    contentStyle={styles.inputContent}
                    theme={{ colors: { placeholder: "#CDD5DF", text: "#111" } }}  
                  />
                  {touched.FirstName && errors.FirstName && (
                    <Text style={styles.errorText}>{errors.FirstName}</Text>
                  )}

                  {/* Last Name */}
                  <Text style={styles.label}>Last Name</Text>
                  <TextInput
                    placeholder="Enter your last name"
                    value={values.LastName}
                    onChangeText={handleChange("LastName")}
                    onBlur={handleBlur("LastName")}
                    mode="flat"
                    style={styles.input}
                    contentStyle={styles.inputContent}
                    theme={{ colors: { placeholder: "#CDD5DF", text: "#111" } }}
                  />
                  {touched.LastName && errors.LastName && (
                    <Text style={styles.errorText}>{errors.LastName}</Text>
                  )}

                  {/* Email */}
                  <Text style={styles.label}>Email</Text>
                  <TextInput
                    placeholder="Enter your email"
                    value={values.Email}
                    onChangeText={handleChange("Email")}
                    onBlur={handleBlur("Email")}
                    mode="flat"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={styles.input}
                    contentStyle={styles.inputContent}
                    theme={{ colors: { placeholder: "#CDD5DF", text: "#111" } }}
                  />
                  {touched.Email && errors.Email && (
                    <Text style={styles.errorText}>{errors.Email}</Text>
                  )}

                  {/* Phone */}
                  <Text style={styles.label}>Phone</Text>
                  <View style={styles.phoneInputContainer}>
                    <Text style={styles.prefix}>+20</Text>
                    <TextInput
                      placeholder="Enter phone number"
                      value={values.PhoneNumber}
                      onChangeText={(text) => {
                        const digitsOnly = text.replace(/\D/g, "");
                        handleChange("PhoneNumber")(digitsOnly);
                      }}
                      onBlur={handleBlur("PhoneNumber")}
                      mode="flat"
                      keyboardType="phone-pad"
                      style={styles.phoneInput}
                      contentStyle={styles.inputContent}
                      theme={{
                        colors: { placeholder: "#CDD5DF", text: "#111" },
                      }}
                    />
                  </View>

                  {touched.PhoneNumber && errors.PhoneNumber && (
                    <Text style={styles.errorText}>{errors.PhoneNumber}</Text>
                  )}

                  {/* Password */}
                  <Text style={styles.label}>Password</Text>
                  <TextInput
                    placeholder="Enter your password"
                    value={values.Password}
                    onChangeText={handleChange("Password")}
                    onBlur={handleBlur("Password")}
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
                  {touched.Password && errors.Password && (
                    <Text style={styles.errorText}>{errors.Password}</Text>
                  )}

                  {/* Confirm Password */}
                  <Text style={styles.label}>Confirm Password</Text>
                  <TextInput
                    placeholder="Confirm your password"
                    value={values.ConfirmPassword ?? ""}
                    onChangeText={handleChange("ConfirmPassword")}
                    onBlur={handleBlur("ConfirmPassword")}
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
                  {touched.ConfirmPassword && errors.ConfirmPassword && (
                    <Text style={styles.errorText}>
                      {errors.ConfirmPassword}
                    </Text>
                  )}

                  {/* Birthday */}
                  <Text style={styles.label}>Birthday</Text>
                  <View style={styles.inputContainer}>
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={() => setShowDatePicker(true)}
                      style={{ flex: 1 }}
                    >
                      <TextInput
                        placeholder="DD/MM/YYYY"
                        value={
                          values.DateOfBirth
                            ? formatDateToDDMMYYYY(new Date(values.DateOfBirth))
                            : ""
                        }
                        mode="flat"
                        style={styles.input2}
                        placeholderTextColor="#CDD5DF"
                        contentStyle={styles.inputContent}
                        editable={false}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.iconContainer}
                      onPress={() => setShowDatePicker(true)}
                      activeOpacity={0.8}
                    >
                      <Image
                        source={require("../../../assests/imgs/calender.png")}
                        style={styles.icon}
                      />
                    </TouchableOpacity>
                  </View>
                  {touched.DateOfBirth && errors.DateOfBirth && (
                    <Text style={styles.errorText}>{errors.DateOfBirth}</Text>
                  )}

                  {showDatePicker && (
                    <DateTimePicker
                      value={
                        values.DateOfBirth
                          ? new Date(values.DateOfBirth)
                          : pickedDate
                      }
                      mode="date"
                      display={Platform.OS === "ios" ? "spinner" : "calendar"}
                      onChange={(e, selected) =>
                        onChangeDate(e, selected, setFieldValue)
                      }
                      maximumDate={new Date()}
                    />
                  )}

                  {/* Gender */}
                  <View style={styles.gender}>
                    <Text style={styles.genderText}>Gender</Text>
                    <View style={styles.genderRow}>
                      <Pressable
                        onPress={() => setFieldValue("Gender", "Male")}
                        style={{ marginRight: 10 }}
                      >
                        {values.Gender === "Male" ? (
                          <LinearGradient
                            colors={["#1B2351", "#47C0D2"]}
                            style={styles.genderBtn}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                          >
                            <Image
                              source={require("../../../assests/imgs/male.png")}
                              style={styles.genderIcon}
                            />
                          </LinearGradient>
                        ) : (
                          <View
                            style={[
                              styles.genderBtn,
                              { backgroundColor: "#919193" },
                            ]}
                          >
                            <Image
                              source={require("../../../assests/imgs/male.png")}
                              style={styles.genderIcon}
                            />
                          </View>
                        )}
                      </Pressable>

                      <Pressable
                        onPress={() => setFieldValue("Gender", "Female")}
                      >
                        {values.Gender === "Female" ? (
                          <LinearGradient
                            colors={["#1B2351", "#47C0D2"]}
                            style={styles.genderBtn}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                          >
                            <Image
                              source={require("../../../assests/imgs/famel.png")}
                              style={styles.genderIcon}
                            />
                          </LinearGradient>
                        ) : (
                          <View
                            style={[
                              styles.genderBtn,
                              { backgroundColor: "#919193" },
                            ]}
                          >
                            <Image
                              source={require("../../../assests/imgs/famel.png")}
                              style={styles.genderIcon}
                            />
                          </View>
                        )}
                      </Pressable>
                    </View>
                  </View>
                  {touched.Gender && errors.Gender && (
                    <Text style={styles.errorText}>{errors.Gender}</Text>
                  )}

                  {/* Register Button */}
                  <Pressable
                    onPress={() => {
                      if (!disabled) handleSubmit();
                    }}
                    disabled={disabled}
                    style={{ marginTop: 18 }}
                  >
                    <LinearGradient
                      colors={["#1B2351", "#47C0D2"]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={[
                        styles.registerBtn,
                        disabled ? { opacity: 0.45 } : { opacity: 1 },
                      ]}
                    >
                      <Text style={styles.registerText}>
                        {loading ? "Registering..." : "Register"}
                      </Text>
                    </LinearGradient>
                  </Pressable>

                  {/* server messages */}
                  {error && (
                    <Text
                      style={[
                        styles.errorText,
                        { textAlign: "center", marginTop: 8 },
                      ]}
                    >
                      {error}
                    </Text>
                  )}
                  {success && (
                    <Text
                      style={[
                        styles.errorText,
                        { color: "green", textAlign: "center", marginTop: 8 },
                      ]}
                    >
                      {(message && (message as any).en) || String(message)}
                    </Text>
                  )}

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
                        source={require("../../../assests/imgs/google.png")}
                        style={styles.socialIcon}
                      />
                      <Text style={styles.socialText}>Sign in with Google</Text>
                    </Pressable>

                    <Pressable style={[styles.socialBtn, { marginTop: 12 }]}>
                      <Image
                        source={require("../../../assests/imgs/Tiktok.png")}
                        style={styles.socialIcon}
                      />
                      <Text style={styles.socialText}>Sign in with TikTok</Text>
                    </Pressable>
                  </View>

                  {/* Sign in */}
                  <View style={styles.SignIp}>
                    <Text style={styles.SignIpText}>
                      Already have an account?
                    </Text>
                    <Pressable
                      onPress={() => navigation.navigate("Login" as any)}
                    >
                      <Text style={styles.SignInbtn}>Sign In</Text>
                    </Pressable>
                  </View>
                </>
              );
            }}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: lightColors.background,
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
    zIndex: 100,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  svgWave: {
    position: "absolute",
    bottom: -1,
    left: 0,
    right: 0,
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
    alignItems: "center",
    marginVertical: 20,
  },
  avatarContainer: {
    width: 122,
    height: 128,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
   
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  // Input
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
    color: lightColors.primary,
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
    color: lightColors.primary,
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
    backgroundColor: lightColors.primary,
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
    color: lightColors.primary,
    fontSize: 16,
    textDecorationLine: "underline",
  },
  errorText: { color: "red", fontSize: 12, marginTop: 2 },
});
