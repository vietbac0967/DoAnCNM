import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image } from "react-native";
import Feather from "react-native-vector-icons/Feather";

export default function ContactScreen() {
  const [activeTab, setActiveTab] = useState("friends");

  const friendsData = [
    { id: 1, name: "Dương Thế Ngọc", avatar: require("../assets/girl.png") },
    { id: 2, name: "Võ Quốc Huy", avatar: require("../assets/avt.jpg") },
    { id: 3, name: "Nguyễn Việt Bắc", avatar: require("../assets/men.png") },
  ];

  const invitationsData = [
    { id: 1, name: "Vũ Lan Tường", avatar: require("../assets/girl.png") },
    { id: 2, name: "Nguyễn Phương Cường", avatar: require("../assets/men.png") },
    { id: 3, name: "Nguyễn Quốc Khôi", avatar: require("../assets/senior.png") },
  ];

  const renderFriendItem = ({ item }) => (
    <View style={styles.friendItem}>
      <Image source={item.avatar} style={styles.avatar} />
      <View style={styles.friendInfo}>
        <Text>{item.name}</Text>
        <View style={styles.contactButtons}>
          <TouchableOpacity style={styles.contactButton}>
            <Feather name="phone" size={20} color="grey" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactButton}>
            <Feather name="message-square" size={20} color="grey" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderInvitationItem = ({ item }) => (
    <View style={styles.friendItem}>
      <Image source={item.avatar} style={styles.avatar} />
      <View style={styles.friendInfo}>
        <Text>{item.name}</Text>
        <View style={styles.friendRequestButtons}>
          <TouchableOpacity style={[styles.friendRequestButton, { backgroundColor: "#B5EAD7" }]}>
            <Text>Đồng ý</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.friendRequestButton, { backgroundColor: "#FF9AA2" }]}>
            <Text>Từ chối</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "friends" && styles.activeTab]}
          onPress={() => setActiveTab("friends")}
        >
          <View style={{ flexDirection: "row" }}>
            <Feather name="users" size={25} color="#444444" />
            <Text style={styles.tabText}>Danh sách bạn bè</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "invitations" && styles.activeTab]}
          onPress={() => setActiveTab("invitations")}
        >
          <View style={{ flexDirection: "row" }}>
            <Feather name="user-plus" size={25} color="#444444" />
            <Text style={styles.tabText}>Lời mời kết bạn</Text>
          </View>
        </TouchableOpacity>
      </View>
      {activeTab === "friends" ? (
        <FlatList
          data={friendsData}
          renderItem={renderFriendItem}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <FlatList
          data={invitationsData}
          renderItem={renderInvitationItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
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
