import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../Screens/auth/LoginScreen";
import RegisterScreen from "../Screens/auth/SignupScreen";
import ForgetPassword from "../Screens/auth/ForgetPassword";
import role from "../Screens/auth/role";
import VerifyAccount from "../Screens/auth/VerifyAccount";

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  forgetPassword:undefined,
  role:undefined,
  verifyAccount:undefined
};

const Stack = createNativeStackNavigator<any>();

export default function AuthStack(props: any) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name='forgetPassword' component={ForgetPassword}/>
      <Stack.Screen name='role' component={role}/>
      <Stack.Screen name='verifyAccount' component={VerifyAccount}/>
    </Stack.Navigator>
  );
}

