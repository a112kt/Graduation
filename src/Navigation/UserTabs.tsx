import React from "react";
import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../features/user/screens/HomeUser";
import ExploreScreen from "../features/user/screens/ReelsUser";
import OrdersScreen from "../features/user/screens/CartUser";
import ProfileScreen from "../features/user/screens/ProfileUser";
import WishlistScreen from "../features/user/screens/WishlistUser";

import HomeIcon from "../iconComponent/HomeIcon";
import ExploreIcon from "../iconComponent/ExploreIcon";
import OrdersIcon from "../iconComponent/OrdersIcon";
import ProfileIcon from "../iconComponent/ProfileIcon";
import WishlistIcon from "../iconComponent/WishlistIcon";

const Tab = createBottomTabNavigator();

export default function UserTabs() {
 return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.activeIconContainer : undefined}>
              <HomeIcon size={25} active={focused} />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Wishlist"
        component={WishlistScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.activeIconContainer : undefined}>
              <WishlistIcon size={25} />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.activeIconContainer : undefined}>
              <ExploreIcon size={25} />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.activeIconContainer : undefined}>
              <OrdersIcon size={25} />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.activeIconContainer : undefined}>
              <ProfileIcon size={25} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    left: 12,
    right: 12,
    height: 72,
    borderRadius: 20,
    backgroundColor: "#ffffff",
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    alignItems: "center",
  },
  activeIconContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 30,
    padding: 10,
    marginBottom: 18,
  },
});
