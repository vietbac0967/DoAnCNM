import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseURL } from "../api/baseURL";
export default function UserChat({ item }) {
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();

  const getMessages = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await baseURL.post(
        "message/getMessages",
        { receiverId: item._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { EC, EM, DT } = response.data;
      if (EC === 0 && EM === "Success") {
        setMessages(DT);
      } else {
        console.log("error:::", EM);
      }
    } catch (error) {
      console.log("error:::", error);
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  const getLastMessage = () => {
    if (!Array.isArray(messages) || messages.length === 0) {
      return "Các bạn giờ đã là bạn bè, hãy bắt đầu trò chuyện nào!";
    } else {
      const userMessages = messages.filter(
        (message) => message.messageType === "text"
      );
      if (userMessages.length === 0) {
        return "No text messages found!";
      }
      const lastMessage = userMessages[userMessages.length - 1];
      console.log("lastMessage:::", lastMessage.content);
      return lastMessage;
    }
  };

  const lastMessage = getLastMessage();
  
  const formatDate = (date) => {
    const options = { hour: "2-digit", minute: "2-digit" };
    const formattedTime = new Date(date).toLocaleTimeString("vi-VN", options);
    return formattedTime;
  };

  const formatDateOrTime = (updatedAt) => {
    const today = new Date();
    const updatedAtDate = new Date(updatedAt);

    if (updatedAtDate.toDateString() === today.toDateString()) {
      // Display time if updatedAt is today
      return formatDate(updatedAt);
    } else {
      // Display full date if updatedAt is not today
      return updatedAtDate.toLocaleDateString("en-US");
    }
  };

  return (
    <Pressable
      style={styles.btn}
      onPress={() =>
        navigation.navigate("ChatScreen", {
          recevierId: item._id,
        })
      }
    >
      <Image
        style={{ width: 50, height: 50, borderRadius: 25, resizeMode: "cover" }}
        source={{ uri: item.avatar }}
      ></Image>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 15, fontWeight: "500" }}>{item?.name}</Text>
        {lastMessage && (
          <Text style={{ marginTop: 3, color: "gray", fontWeight: "500" }}>
            {lastMessage?.content}
          </Text>
        )}
      </View>

      <View>
        <Text style={{ fontSize: 11, fontWeight: "400", color: "#585858" }}>
          {lastMessage && formatDateOrTime(lastMessage?.updatedAt)}
        </Text>
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
