import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import ChatMessage from "../components/ChatMessage";

const chats = [
  {
    name: "Nguyễn Văn A",
    content: "Hello",
    date: "12:00",
    notification: "1",
  },
  {
    name: "Nguyễn Văn B",
    content: "Hello",
    date: "12:00",
    notification: "2",
  },
];

export default function HomeScreen({ navigation }) {
  const handleLogout = async () => {
    axios.post("http://localhost:5000/api/auth/logout");
    await AsyncStorage.removeItem("token");
    navigation.replace("Login");
  };

  return (
    <View style={styles.container}>
      {/* Search bar */}
      <View style={styles.search}>
        <Ionicons
          style={{ paddingTop: 8 }}
          name="search"
          size={24}
          color="#85B6FF"
        />
        <TextInput
          placeholder="Tìm kiếm"
          placeholderTextColor={"#B1B1B1"}
          style={{ outlineStyle: "none" }}
        ></TextInput>
        <Pressable>
          <Ionicons
            style={{ paddingTop: 5 }}
            name="person-add-outline"
            size={24}
            color="black"
          />
        </Pressable>
      </View>

      {/* Chat list */}
      <View style={{ marginTop: 50 }}>
        <ChatMessage chat={chats[0]}></ChatMessage>
        <ChatMessage chat={chats[1]}></ChatMessage>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f1f1",
  },
  search: {
    height: 40,
    flexDirection: "row",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: "white",
    justifyContent: "space-around",
  },
});
