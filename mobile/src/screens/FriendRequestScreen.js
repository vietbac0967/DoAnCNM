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
import FriendRequestCard from "../components/FriendRequestCard";
import {
  getFriendRequests,
  getFriends,
  getSendFriendRequests,
} from "../services/user.service";
import { Ionicons } from "@expo/vector-icons";
export default function FriendRequestScreen( {navigation} ) {
  const [activeTab, setActiveTab] = useState("friendsRequest");
  const [friendRequests, setFriendRequests] = useState([]);
  const [sendFriendRequests, setSendFriendRequests] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = await AsyncStorage.getItem("token");
    const friends = await getFriends(token);
    const friendRequests = await getFriendRequests(token);
    const sendFriendRequests = await getSendFriendRequests(token);
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
          <Pressable style={styles.contactButton}>
            <Feather name="message-square" size={20} color="grey" />
          </Pressable>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={24} color="#444444" style={{ position: "absolute",  padding: 10 }}/>
        </Pressable>
      <View style={styles.tabContainer}>
        
        <Pressable
          style={[styles.tab, activeTab === "friendsRequest" && styles.activeTab]}
          onPress={() => setActiveTab("friendsRequest")}
        >
          <View style={{ flexDirection: "row" }}>
            <Feather name="user-plus" size={25} color="#444444" />
            <Text style={styles.tabText}>Lời mời kết bạn</Text>
          </View>
        </Pressable>

        <Pressable
          style={[
            styles.tab,
            activeTab === "sendFriendsRequest" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("sendFriendsRequest")}
        >
          <View style={{ flexDirection: "row" }}>
            <Feather name="user-plus" size={25} color="#444444" />
            <Text style={styles.tabText}>Lời mời đã gửi</Text>
          </View>
        </Pressable>
      </View>

      {activeTab === "friendsRequest" ? (
        friendRequests.map((item) => (
          <FriendRequestCard
            key={item._id}
            item={item}
            friendRequests={friendRequests}
            setFriendRequests={setFriendRequests}
          />
        ))
      ) : activeTab === "sendFriendsRequest" ? (
        <FlatList
          data={sendFriendRequests}
          renderItem={renderFriendItem}
          keyExtractor={(item) => item._id}
        />
      ): null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    marginTop: 40,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
    paddingHorizontal: 40,
  },
  tab: {
    paddingHorizontal: 5,
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
