import { StyleSheet, Text, View, Image, Pressable, Alert } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { acceptFriendRequest } from "../services/user.service";
import { useNavigation } from "@react-navigation/native";
export default function FriendRequestCard({
  item,
  friendRequests,
  setFriendRequests,
}) {
  const navigation = useNavigation();
  const handleAccept = async (senderId) => {
    try {
      const accpect = await acceptFriendRequest(senderId);
      if (accpect) {
        setFriendRequests(
          friendRequests.filter((item) => item._id !== senderId)
        );
        navigation.navigate("Message", {
          isLoading: true,
        });
      }
    } catch (err) {
      Alert.alert("Thông báo", err.message, [{ text: "OK" }]);
    }
  };
  return (
    <View style={styles.friendItem}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.friendInfo}>
        <Text>{item.name}</Text>
        <View style={styles.friendRequestButtons}>
          <Pressable
            onPress={() => handleAccept(item._id)}
            style={[styles.friendRequestButton, { backgroundColor: "#B5EAD7" }]}
          >
            <Text>Đồng ý</Text>
          </Pressable>
          <Pressable
            style={[styles.friendRequestButton, { backgroundColor: "#FF9AA2" }]}
          >
            <Text>Từ chối</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
