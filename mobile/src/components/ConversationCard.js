import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
export default function ConversationCard({ item, navigation }) {
  return (
    <Pressable
      style={styles.btn}
      onPress={() => {
        if (item?.type === "private") {
          navigation.navigate("ChatScreen", {
            recevierId: item?._id,
          });
        } else {
          navigation.navigate("ChatGroup", {
            group: item?._id,
          });
        }
      }}
    >
      <Image
        style={{ width: 50, height: 50, borderRadius: 25, resizeMode: "cover" }}
        source={{
          uri: item?.avatar || "https://avatar.iran.liara.run/public",
        }}
        defaultSource={require("../assets/avt.jpg")}
      ></Image>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 15, fontWeight: "500" }}>
          {item?.name}
        </Text>
        {item?.messageType === "text" ? (
          item?.message.length > 30 ? (
            <Text>{item.item.message.slice(0, 30)}</Text>
          ) : (
            <Text>{item.message}</Text>
          )
        ) : (
          <Text>[Hình ảnh]</Text>
        )}
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
