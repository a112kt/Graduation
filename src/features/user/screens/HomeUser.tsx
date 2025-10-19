import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../../../Redux/store";
import { useAppDispatch } from "../../../Redux/store";
import { clearToken } from "../../../Redux/slices/authSlice";

const HomeUser = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  return (
    <View>
      <Text> $$$$$$$$$$$$$$$$$USER TOKEN IS ###############</Text>
      <Text>{auth.token}</Text>
      <TouchableOpacity
        onPress={() => {
          dispatch(clearToken());
        }}
      >
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeUser;

const styles = StyleSheet.create({});
