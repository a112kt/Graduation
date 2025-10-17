import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStack from "./AuthStack";
import UserStack from "./UserStack";
import BrandStack from "./BrandStack";
import SplashScreen from "../Screens/SplashScreen";

const Stack = createNativeStackNavigator<any>();

export default function AppNavigator(props:any) {
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
