import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ProfileUser = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile Page 👤</Text>
    </View>
  );
};

export default ProfileUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: "#FFFFFF",
  },
  text: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1B2351",
  },
});
