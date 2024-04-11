import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  FlatList,
  Image,
} from "react-native";
import { getFriends } from "../services/user.service";
import { useSelector } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import { RadioButton } from "react-native-paper";
export default function CreateGroupScreen({ navigation }) {
  const [groupName, setGroupName] = useState("");
  const [members, setMembers] = useState([]);
  const token = useSelector((state) => state.token.token);
  const [friends, setFriends] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const friendsData = await getFriends(token);
        setFriends(friendsData);
      } catch (error) {
        console.log("Error fetching friends:", error);
      }
    };

    fetchFriends();
  }, [token]);
  console.log("friends", friends);

  const handleSelectFriend = (friendId) => {
    if (selectedFriends.includes(friendId)) {
      setSelectedFriends(selectedFriends.filter((id) => id !== friendId));
    } else {
      setSelectedFriends([...selectedFriends, friendId]);
    }
  };

  useEffect(() => {
  }, [selectedFriends]);

  const addMember = () => {
    if (selectedFriends.length === 0) {
      return; // No selected friends, do nothing
    }
    setMembers([...members, ...selectedFriends]);
    setSelectedFriends([]); // Reset selected friends
  };

  const renderFriendItem = ({ item }) => (
    <View style={styles.friendItem}>
      <Image source={{ uri: item?.avatar }} style={styles.avatar} />
      <View style={styles.friendInfo}>
        <Text>{item.name}</Text>
        <RadioButton value="dong y"></RadioButton>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <MaterialIcons
          name="drive-file-rename-outline"
          size={28}
          color="black"
          style={{ marginRight: 10 }}
        />
        <TextInput
          style={styles.input}
          placeholder="Nhập tên nhóm"
          value={groupName}
          onChangeText={setGroupName}
        />
      </View>
      <FlatList data={friends} renderItem={renderFriendItem}></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  tabText: {
    fontSize: 18,
    marginTop: 5,
    marginRight: 5,
    fontWeight: "600",
    marginLeft: 10,
    color: "#444444",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
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
});
