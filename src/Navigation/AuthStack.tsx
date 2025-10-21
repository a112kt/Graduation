import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../features/auth/screens/LoginScreen";
import RegisterScreen from "../features/auth/screens/SignupScreen";
import ForgetPassword from "../features/auth/screens/ForgetPassword";
import role from  "../features/auth/screens/role";
import VerifyAccount from  "../features/auth/screens/VerifyAccount";
import ResetPassword from "../features/auth/screens/ResetPassword";

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  forgetPassword:undefined,
  role:undefined,
  verifyAccount:{email:string},
  resetPassword:undefined
};

const Stack = createNativeStackNavigator<any>();

export default function AuthStack(props: any) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='role' component={role}/>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name='forgetPassword' component={ForgetPassword}/>
      <Stack.Screen name='verifyAccount' component={VerifyAccount}/>
      <Stack.Screen name='resetPassword' component={ResetPassword}/>
    </Stack.Navigator>
  );
}

