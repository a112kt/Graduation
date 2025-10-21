import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeUser from "../features/user/screens/Home/HomeUser";
import ProfileUser from "../features/user/screens/Profile/ProfileUser";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeUser" component={HomeUser} />
      <Stack.Screen name="ProfileUser" component={ProfileUser} />
    </Stack.Navigator>
  );
}
