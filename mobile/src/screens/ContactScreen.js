import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
  Image,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getFriendRequests,
  getFriends,
  getSendFriendRequests,
} from "../services/user.service";
export default function ContactScreen( {navigation} ) {
  const [activeTab, setActiveTab] = useState("friends");
  const [friendRequests, setFriendRequests] = useState([]);
  const [sendFriendRequests, setSendFriendRequests] = useState([]);
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = await AsyncStorage.getItem("token");
    const friends = await getFriends(token);
    const friendRequests = await getFriendRequests(token);
    const sendFriendRequests = await getSendFriendRequests(token);
    setFriends(friends);
    setFriendRequests(friendRequests);
    setSendFriendRequests(sendFriendRequests);
  };
  const renderFriendItem = ({ item }) => (
    <View style={styles.friendItem}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.friendInfo}>
        <Text>{item.name}</Text>
        <View style={styles.contactButtons}>
          <Pressable style={styles.contactButton}>
            <Feather name="phone" size={20} color="grey" />
          </Pressable>
          <Pressable style={styles.contactButton} onPress={() =>
        navigation.navigate("ChatScreen", {
          recevierId: item._id,
        })
      }>
            <Feather name="message-square" size={20} color="grey" />
          </Pressable>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <Pressable
          style={[styles.tab, activeTab === "friends" && styles.activeTab]}
          onPress={() => setActiveTab("friends")}
        >
          <View style={{ flexDirection: "row" }}>
            <Feather name="users" size={25} color="#444444" />
            <Text style={styles.tabText}>Danh sách bạn bè</Text>
          </View>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate("FriendRequest")}
        >
            <Feather name="user-plus" size={25} color="#444444" />
        </Pressable>
      </View>
      
        <FlatList
          data={friends}
          renderItem={renderFriendItem}
          keyExtractor={(item) => item._id}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
    marginTop: 30
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#33CCFF",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#444444",
  },
  friendItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  friendInfo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  contactButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  contactButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginLeft: 10,
  },
  friendRequestButtons: {
    flexDirection: "row",
  },
  friendRequestButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginLeft: 10,
  },
});
