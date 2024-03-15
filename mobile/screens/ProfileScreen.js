import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { removeToken } from "../app/tokenSlice";

export default function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Text>Profile Screen</Text>
      <Button
        title="Logout"
        onPress={() => {
          AsyncStorage.removeItem("token");
          dispatch(removeToken());
          navigation.navigate("Login");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
