import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "react-native";
import GradientButton from "../buttons/GradientButton";
import { RootStackParamList } from "../../Navigation/AppNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
export default function SuccessCard() {
  type MainNavigation = NativeStackNavigationProp<
    RootStackParamList,
    "Auth",
    "User"
  >;
  const MainRegisterScreenNavigationProp = useNavigation<MainNavigation>();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          backgroundColor: "#FEFEFE",
          width: 300,
          borderRadius: 16,
          paddingVertical: 32,
          paddingHorizontal: 16,
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            gap: 24,
          }}
        >
          <View
            style={{
              height: 140,
              width: 140,
              borderRadius: "50%",
              overflow: "hidden",
              backgroundColor: "#B4DBE180",
            }}
          >
            <Image
              source={require("../assests/imgs/verification-success.png")}
              style={{
                height: 101,
                width: 101,
                alignSelf: "center",
                marginTop: 20,
              }}
              resizeMode="contain"
            />
          </View>

          <Text
            style={{
              fontFamily: "Poppins-SemiBold",
              fontWeight: 500,
              fontSize: 16,
              color: "#1B2351",
            }}
          >
            Account Created Successfully
          </Text>
          <GradientButton
            text="Home"
            onPress={() => {
              MainRegisterScreenNavigationProp.replace("User");
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
