import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

export default function ChatMessage({ chat }) {
  return (
    <View
      style={{
        flexDirection: "row",
        borderBottomColor: "gray",
        borderBottomWidth: 1,
        justifyContent: "space-around",
        marginHorizontal: 30,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Image
          source={{ uri: "https://www.w3schools.com/w3images/avatar6.png" }}
          style={{ width: 58, height: 50, borderRadius: "50%", marginTop: 5 }}
        ></Image>
        <View style={{ paddingLeft: 20, paddingVertical: 10 }}>
          <Text style={{ fontSize: "14", fontWeight: "bold" }}>
            {chat.name}
          </Text>
          <Text>{chat.content}</Text>
        </View>
      </View>
      <View style={{ paddingVertical: 10 }}>
        <Text>{chat.date}</Text>
        <Text>{chat.notification}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
