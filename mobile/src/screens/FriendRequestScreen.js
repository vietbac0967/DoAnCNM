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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FriendRequestCard from "../components/FriendRequestCard";
import {
  getFriendRequests,
  getFriends,
  getSendFriendRequests,
} from "../services/user.service";
import { Ionicons } from "@expo/vector-icons";
export default function FriendRequestScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState("friendsRequest");
  const [friendRequests, setFriendRequests] = useState([]);
  const [sendFriendRequests, setSendFriendRequests] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const friends = await getFriends();
    const friendRequests = await getFriendRequests();
    const sendFriendRequests = await getSendFriendRequests();
    setFriendRequests(friendRequests);
    setSendFriendRequests(sendFriendRequests);
  };
  console.log(friendRequests);
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

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Lời mời kết bạn",
      headerLeft: () => (
        <View style={{ flexDirection: "row" }}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons
              style={{ padding: 5, marginRight: 10 }}
              name="chevron-back"
              size={24}
              color="#fff"
            />
          </Pressable>
        </View>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <Pressable
          style={[
            styles.tab,
            activeTab === "friendsRequest" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("friendsRequest")}
        >
          <View style={{ flexDirection: "row" }}>
            <MaterialCommunityIcons
              name="account-arrow-left"
              size={25}
              color="#444444"
            />
            <Text style={styles.tabText}>Đã nhận</Text>
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
            <MaterialCommunityIcons
              name="account-arrow-right"
              size={25}
              color="#444444"
            />
            <Text style={styles.tabText}>Đã gửi</Text>
          </View>
        </Pressable>
      </View>

      {activeTab === "friendsRequest" ? (
        // friendRequests.map((item) => (
        //   <FriendRequestCard
        //     key={item._id}
        //     item={item}
        //     friendRequests={friendRequests}
        //     setFriendRequests={setFriendRequests}
        //   />
        // ))
        <FlatList
          data={friendRequests}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <FriendRequestCard
              item={item}
              friendRequests={friendRequests}
              setFriendRequests={setFriendRequests}
            />
          )}
        ></FlatList>
      ) : activeTab === "sendFriendsRequest" ? (
        <FlatList
          data={sendFriendRequests}
          renderItem={renderFriendItem}
          keyExtractor={(item) => item._id}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 5,
    paddingHorizontal: 5,
  },
  tab: {
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  activeTab: {
    paddingHorizontal: 30,
    borderBottomWidth: 2,
    borderBottomColor: "#33CCFF",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "bold",
    padding: 5,
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
