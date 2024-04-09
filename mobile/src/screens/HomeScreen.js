import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { getFriends } from "../services/user.service";
import UserChat from "../components/UserChat";

export default function HomeScreen({ navigation }) {
  const token = useSelector((state) => state.token.token);
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    const getListFriend = async () => {
      try {
        const friends = await getFriends(token);
        setFriends(friends);
      } catch (error) {
        console.log("error:::", error);
      }
    };
    getListFriend();
  }, []);
  console.log("Friends:::", friends)
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
      {
        friends.map((friend) => (
          <UserChat key={friend._id} item={friend}  />
        ))
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f1f1",
    marginTop: 30
  },
  search: {
    marginTop: 25,
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
