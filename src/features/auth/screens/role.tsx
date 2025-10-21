import {
  Image,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
} from "react-native";
import React, { useEffect } from "react";
import GradientText from "../../../Components/GradientText";
import { lightColors } from "../../../../theme";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../../Navigation/AuthStack";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";
import { RootStackParamList } from "../../../Navigation/AppNavigator";
type roleScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "Register",
  "Login"
>;
type RootNavigationType = NativeStackNavigationProp<
  RootStackParamList,
  "Auth",
  "User"
>;
const Role = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const navigation = useNavigation<roleScreenNavigationProp>();
  const mainNavigation = useNavigation<RootNavigationType>();
  useEffect(() => {
    if (token !== null) {
      mainNavigation.replace("User");
    }
  }, []);
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Logo Section */}
      <View style={styles.logo}>
        <Image
          source={require("../../../assests/imgs/AlluvoLogo.png")}
          style={{ width: 37, height: 37 }}
        />
        <GradientText text="Alluvo" textStyle={styles.text} />
      </View>

      {/* Text + Role Section */}
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.titleText}>Start as</Text>
          <Text style={styles.regularText}>Pick your role to continue</Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttonsWrapper}>
          <Pressable style={styles.roleBtnBrand}>
            <Text style={styles.roleTextBrand}>Brand</Text>
          </Pressable>

          <Pressable
            onPress={() => {
              navigation.navigate("Login");
            }}
            style={[styles.roleBtnCustomer, { marginTop: 16 }]}
          >
            <LinearGradient
              colors={["#1B2351", "#47C0D2"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.roleBtnCustomer}
            >
              <Text style={styles.roleTextCustomer}>Customer</Text>
            </LinearGradient>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Role;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: lightColors.background,
  },
  logo: {
    marginTop: 60,
    marginLeft: 30,
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: 0,
  },
  text: {
    fontFamily: "CinzelDecorative-Regular",
    fontWeight: "400",
    fontSize: 24,
    marginLeft: 6,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 60,
    alignItems: "center",
  },
  titleText: {
    fontFamily: "CinzelDecorative-Regular",
    fontWeight: "500",
    fontSize: 35,
    lineHeight: 42,
    textAlign: "center",
    marginBottom: 12,
  },
  regularText: {
    fontFamily: "Inter",
    fontWeight: "400",
    fontSize: 17,
    lineHeight: 20,
    textAlign: "center",
    color: "#666666",
  },
  buttonsWrapper: {
    alignItems: "center",
  },
  roleBtnBrand: {
    width: 235,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: lightColors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  roleTextBrand: {
    fontFamily: "Inter",
    fontSize: 15,
    fontWeight: "500",
    color: lightColors.primary,
  },
  roleBtnCustomer: {
    width: 235,
    height: 48,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  roleTextCustomer: {
    fontFamily: "Inter",
    fontSize: 15,
    fontWeight: "500",
    color: "#fff",
  },
});
