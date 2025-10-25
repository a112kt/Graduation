import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserTabs from "./UserTabs";
import BrandProfile from "../features/user/screens/UserBrand/BrandProfile";

export type UserStackParamList = {
  UserTabs: undefined;
  BrandProfile: undefined;
};

const Stack = createNativeStackNavigator<UserStackParamList>();

export default function UserStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="UserTabs" component={UserTabs} />
      <Stack.Screen name="BrandProfile" component={BrandProfile} />
    </Stack.Navigator>
  );
}
