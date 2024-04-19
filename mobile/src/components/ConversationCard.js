import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import formatDateOrTime from "../utils/formatDateOrTime";
export default function ConversationCard({ item, navigation }) {
  return (
    <Pressable
      style={({ pressed }) => [
        { backgroundColor: pressed ? "#E5E5E5" : "#F1F1F1" },
        styles.btn,
      ]}
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
      <View>
        <Image
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            resizeMode: "cover",
          }}
          source={{
            uri: item?.avatar || "https://avatar.iran.liara.run/public",
          }}
          defaultSource={require("../assets/avt.jpg")}
        ></Image>
        {item?.type === "private" ? (
          <View
            style={{
              padding: 1,
              height: 18,
              width: 18,
              borderRadius: 20,
              borderColor: "#F1F1F1",
              borderWidth: 2.5,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#19F719",
              position: "absolute",
              bottom: -2,
              right: -2,
            }}
          ></View>
        ) : (<View
          style={{
            padding: 1,
            height: 23,
            width: 23,
            borderRadius: 20,
            borderColor: "#F1F1F1",
            borderWidth: 2.5,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#8FB6FF",
            position: "absolute",
            bottom: -3,
            right: -3,
          }}
        >
          <Text style={{ fontSize: 8, fontWeight: 'bold'}}>{item.members && item.members.length > 0 ? item.members.length+1 : ''}</Text>
          
          </View>)}
      </View>

      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 15, fontWeight: "500" }}>{item?.name}</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <View>
            {item?.messageType === "text" ? (
              item?.message.content.slice(0,6)==="##TB##" ? (
                <Text style={{ color: "gray" }}>
                   {item.message.content.length > 37
    ? item.message.content.slice(0, 37).slice(7) + "..."
    : item.message.content}
                </Text>
               ) : (
                <Text style={{ color: "gray" }}>
                  {item.message.senderId !== item?._id ? "Bạn: " : ""}
                  {item.message.content}
                </Text>
               )
            ) :  item?.messageType === "image" ? (
              <Text style={{ color: "gray" }}>
                {item.message.senderId !== item?._id ? "Bạn: " : ""}
                [Hình ảnh]
              </Text>
            ): <Text style={{ color: "gray" }}>Hãy trò chuyện cùng nhau nào!</Text>}
          </View>
          <View>
            <Text style={{ color: "gray" }}>
              {item.message.createdAt
                ? formatDateOrTime(item.message.createdAt)
                : ""}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",

    padding: 10,
  },
});
