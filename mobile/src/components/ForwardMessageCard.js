import { StyleSheet, Text, View, Pressable, Image, Alert } from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { forwardMessageService } from "../services/message.service";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
export default function ForwardMessageCard({ item, messageId }) {
  const navigation = useNavigation();
  const handleForward = async () => {
    try {
      if (item?.type === "private") {
        const response = await forwardMessageService(messageId, item._id, null);
        const { EM, EC } = response;
        if (EC === 0 && EM === "Success") {
          navigation.navigate("Message");
        } else {
          Alert.alert("Something went wrong", EM);
        }
      } else {
        const response = await forwardMessageService(
          messageId,
          null,
          item._id._id
        );
        const { EM, EC } = response;
        if (EC === 0 && EM === "Success") {
          navigation.navigate("Message");
        } else {
          Alert.alert("Something went wrong", EM);
        }
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };
  return (
    <Pressable style={styles.btn}>
      <Image
        style={{ width: 50, height: 50, borderRadius: 25, resizeMode: "cover" }}
        source={{
          uri: item?.avatar || "https://avatar.iran.liara.run/public",
        }}
        defaultSource={require("../assets/avt.jpg")}
      ></Image>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: "500" }}>{item?.name}</Text>
        <Pressable style={{ marginRight: 20 }} onPress={handleForward}>
          <FontAwesome name="mail-forward" size={24} color="#5BBCFF" />
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 0.7,
    borderColor: "#D0D0D0",
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    padding: 10,
  },
});
