import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
  Image,
  Modal,
  Alert,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { Ionicons } from "@expo/vector-icons";
import {
  deleteFriendService,
  getFriendRequests,
  getFriends,
  getSendFriendRequests,
} from "../services/user.service";
import Loading from "../components/Loading";
import { handlesendtext } from "../utils/socket";
import { useIsFocused } from "@react-navigation/native";
export default function ContactScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState("friends");
  const [friendRequests, setFriendRequests] = useState([]);
  const [sendFriendRequests, setSendFriendRequests] = useState([]);
  const [sortedFriends, setSortedFriends] = useState([]);
  const [friends, setFriends] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [seclectFriend, setSelectFriend] = useState(null);
  const isFocused = useIsFocused();

  const handleDeleteFriend = async () => {
    try {
      const { EM, EC, DT } = await deleteFriendService(seclectFriend._id);

      if (EC === 0 && EM === "Success") {
        Alert.alert("Success", "Delete friend successfully");
        handlesendtext({ receiver: seclectFriend.phoneNumber })
        setModalVisible(false);
        fetchData();
      } else {
        Alert.alert("Error", "Something went wrong. Please try again later.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again later.");
    }
  };

  useEffect(() => {
    if(isFocused){
      fetchData();
    }
  }, [isFocused]);

  const getFirstLetter = (name) => {
    return name.charAt(0).toUpperCase();
  };
  const fetchData = async () => {
    const friends = await getFriends();
    const friendRequests = await getFriendRequests();
    const sendFriendRequests = await getSendFriendRequests();
    setFriends(friends);
    setFriendRequests(friendRequests);
    setSendFriendRequests(sendFriendRequests);
  };

  useEffect(() => {
    // Sắp xếp danh sách bạn bè theo tên
    const sortedFriends = friends.sort((a, b) => a.name.localeCompare(b.name));

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
    <>
      <Pressable
        style={styles.friendItem}
        onPress={() => {
          setModalVisible(true);
          setSelectFriend(item);
        }}
      >
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
      </Pressable>
    </>
  );

  const renderFriendGroupItem = ({ item }) => (
    <View style={{ borderBottomWidth: 1, borderBottomColor: "#ddd" }}>
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
            style={{ paddingTop: 8 }}
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
        <Text style={styles.title}>Danh sách bạn bè</Text>

        <Pressable
          onPress={() => navigation.navigate("FriendRequest")}
          style={({ pressed }) => ({
            opacity: pressed ? 0.5 : 1,
            paddingHorizontal: 15,
            paddingVertical: 5,
            backgroundColor: "#ddd",
            marginLeft: 10,
            borderRadius: 7,
          })}
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

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalBackGround}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={{ flexDirection: "row" }}>
              <Image
                style={{ width: 50, height: 50, borderRadius: 25 }}
                resizeMode="cover"
                source={{ uri: seclectFriend?.avatar }}
              ></Image>
              <Text
                style={{ fontWeight: "bold", paddingLeft: 15, paddingTop: 15 }}
              >
                {seclectFriend?.name}
              </Text>
            </View>
            <Pressable
            onPress={() => {
              navigation.navigate("FriendInfo", {
                recevierId: seclectFriend._id,
              });
              setModalVisible(false);

            }}
              style={{
                marginTop: 20,
              }}
            >
              <Text style={{}}>Xem thông tin cá nhân</Text>
            </Pressable>
            {/* delete friend */}
            <Pressable
              onPress={handleDeleteFriend}
              style={{
                marginTop: 20,
              }}
            >
              <Text
                style={{
                  color: "red",
                }}
              >
                Xóa bạn
              </Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>

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
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginBottom: 10,
    paddingTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 10,
    marginHorizontal: 20,
    alignItems: "center",
  },
  // tab: {
  //   paddingHorizontal: 20,
  //   paddingVertical: 5,
  // },
  title: {
    fontSize: 18,
    fontWeight: "bold",
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
  modalBackGround: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
});
