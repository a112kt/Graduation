import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStack from "./AuthStack";
import UserTabs from "./UserTabs";
import BrandStack from "./BrandStack";
import SplashScreen from "../Screens/SplashScreen";
import { AuthStackParamList } from "./AuthStack";
import UserStack from "./UserStack";

export type RootStackParamList = {
  User: undefined;
   Auth: { screen: keyof AuthStackParamList };
  Splash: undefined;
  Brand: undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator(props: any) {
  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Auth" component={AuthStack} />
        <Stack.Screen name="User" component={UserStack} />
        <Stack.Screen name="Brand" component={BrandStack} />
      </Stack.Navigator>
    </>
  );
}
