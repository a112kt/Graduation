import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function WishlistUser() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Your Wishlist 💖</Text>
    </View>
  );
}

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
