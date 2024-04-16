import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
  Image,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getFriendRequests,
  getFriends,
  getSendFriendRequests,
} from "../services/user.service";
export default function ContactScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState("friends");
  const [friendRequests, setFriendRequests] = useState([]);
  const [sendFriendRequests, setSendFriendRequests] = useState([]);
  const [sortedFriends, setSortedFriends] = useState([]);
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const getFirstLetter = (name) => {
    return name.charAt(0).toUpperCase();
  };
  const fetchData = async () => {
    const token = await AsyncStorage.getItem("token");
    const friends = await getFriends(token);
    const friendRequests = await getFriendRequests(token);
    const sendFriendRequests = await getSendFriendRequests(token);
    setFriends(friends);
    setFriendRequests(friendRequests);
    setSendFriendRequests(sendFriendRequests);
  };

  useEffect(() => {
    // Sắp xếp danh sách bạn bè theo tên
    const sortedFriends = friends.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    // Tạo danh sách mới với mỗi chữ cái đầu tiên
    const alphabetList = {};
    sortedFriends.forEach((friend) => {
      const firstLetter = getFirstLetter(friend.name);
      if (!alphabetList[firstLetter]) {
        alphabetList[firstLetter] = [friend];
      } else {
        alphabetList[firstLetter].push(friend);
      }
    });

    // Cập nhật state với danh sách bạn bè đã sắp xếp theo thứ tự alphabet
    setSortedFriends(alphabetList);
  }, [friends]);
  const renderFriendItem = ({ item }) => (
    <View style={styles.friendItem}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.friendInfo}>
        <Text>{item.name}</Text>
        <View style={styles.contactButtons}>
          <Pressable style={styles.contactButton}>
            <Feather name="phone" size={20} color="grey" />
          </Pressable>
          <Pressable
            style={styles.contactButton}
            onPress={() =>
              navigation.navigate("ChatScreen", {
                recevierId: item._id,
              })
            }
          >
            <Feather name="message-square" size={20} color="grey" />
          </Pressable>
        </View>
      </View>
    </View>
  );

  const renderFriendGroupItem = ({ item }) => (
    <View style={{ borderBottomWidth: 1, borderBottomColor: "#ccc"}}>
      <Text style={styles.alphabet}>{item.title}</Text>
      <FlatList
        data={item.data}
        renderItem={renderFriendItem}
        keyExtractor={(friend) => friend._id}
      />
    </View>
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <View style={{ flexDirection: "row", marginLeft: 20 }}>
          <Ionicons
            style={{ paddingTop: 8 }}
            name="search"
            size={24}
            color="#fff"
          />
          <Pressable
            onPress={() => navigation.navigate("Search")}
            style={{ width: 200 }}
          >
            <Text
              style={{
                paddingTop: 10,
                paddingLeft: 20,
                fontSize: 12,
                color: "#fff",
              }}
            >
              Tìm kiếm
            </Text>
          </Pressable>
        </View>
      ),
      headerRight: () => (
        <Pressable
          style={{ marginRight: 20 }}
          onPress={() => navigation.navigate("AddFriend")}
        >
          <Ionicons
            style={{ paddingTop: 5 }}
            name="person-add-outline"
            size={24}
            color="#fff"
          />
        </Pressable>
      ),
    });
  }, []);

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
          style={styles.friendRequestBtn}
        >
          <Feather name="user-check" size={25} color="#444444" />
          {friendRequests.length > 0 && (
            <View
              style={{
                position: "absolute",
                top: -5,
                right: -5,
                backgroundColor: "red",
                borderRadius: 10,
                width: 20,
                height: 20,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 9,
                  fontWeight: "bold",
                }}
              >
                {friendRequests.length}
              </Text>
            </View>
          )}
        </Pressable>
      </View>

      <FlatList
        data={Object.keys(sortedFriends).map((key) => ({
          title: key,
          data: sortedFriends[key],
        }))}
        renderItem={renderFriendGroupItem}
        keyExtractor={(item) => item.title}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#00B4EA",
    paddingVertical: 10,
    marginHorizontal: 20,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  friendRequestBtn: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: "#ddd",
    marginLeft: 10,
    borderRadius: 7,
  },
  activeTab: {},
  tabText: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#444444",
  },
  alphabet: {
    padding: 10,
    fontSize: 14,
    fontWeight: "bold",
  },
  friendItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    
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
