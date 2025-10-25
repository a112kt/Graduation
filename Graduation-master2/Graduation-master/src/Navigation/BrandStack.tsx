import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeBrand from "../features/brand/screens/HomeBrand";

export type BrandStackParamList = {
  HomeBrand: undefined;
};

const Stack = createNativeStackNavigator<any>();

export default function BrandStack(props: any) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BrandDashboard" component={HomeBrand} />
    </Stack.Navigator>
  );
}
