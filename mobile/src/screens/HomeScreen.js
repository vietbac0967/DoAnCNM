import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import ChatMessage from "../components/ChatMessage";
import { baseURL } from "../api/baseURL";
import { useDispatch, useSelector } from "react-redux";

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
  // const token = useSelector((state) => state.token);
  // const dispatch = useDispatch();
  // const refreshToken = async (token) => {
  //   try {
  //     const res = await baseURL.post("/auth/refreshToken", { token: token });
  //     const newToken = res.data.token;
  //     dispatch(setToken(newToken));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   const checkToken = async () => {
  //     try {
  //       const decoded = jwtDecode(token);
  //       console.log(decoded);
  //       if (decoded.exp * 1000 < Date.now()) {
  //         await refreshToken(token);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   checkToken();
  // },[]);

  const handleLogout = async () => {
    // baseURL.post("/auth/logout");
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
        ></TextInput>
        <Pressable onPress={() => navigation.navigate("AddFriend")}>
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
    marginTop:25,
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
