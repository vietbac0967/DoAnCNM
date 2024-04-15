import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Pressable,
  Alert,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import {
  addMemberToGroup,
  getFriendsInNotGroupService,
} from "../services/group.service";
import { Button, RadioButton } from "react-native-paper";
export default function AddMemberScreen({ navigation, route }) {
  const groupId = route.params.groupId;
  const token = useSelector((state) => state.token.token);

  const [phone, setPhone] = useState("");
  const [friends, setFriends] = useState([]);
  const [members, setMembers] = useState([]);
  const getFriendsInNotGroup = async () => {
    try {
      const response = await getFriendsInNotGroupService(token, groupId);
      const { EM, EC, DT } = response;
      if (EC === 0) {
        setFriends(DT);
      }
    } catch (error) {
      Alert.alert("Lỗi", "Không thể kết nối đến server");
    }
  };
  const handleAddMember = async () => {
    try {
      const membersCast = members.map((member) => member._id);
      const response = await addMemberToGroup(token, groupId, membersCast);
      const { EC, EM } = response;
      if (EC === 0) {
        navigation.goBack();
      } else {
        Alert.alert("Lỗi", EM);
      }
    } catch (error) {
      Alert.alert("Lỗi", "Không thể kết nối đến server");
    }
  };
  useEffect(() => {
    getFriendsInNotGroup();
  }, []);
  console.log("members:::", members);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Thêm thành viên",
    });
  }, [navigation]);

  const handleSelectMember = (friendId) => {
    // Check if the friendId is already in the members list
    const isAlreadyMember = members.some((member) => member._id === friendId);
    if (!isAlreadyMember) {
      // Find the selected friend from friends list
      const selectedFriend = friends.find((friend) => friend._id === friendId);
      // Add the selected friend to the members list
      setMembers((prevMembers) => [...prevMembers, selectedFriend]);
    } else {
      // If already a member, remove the friend from the members list
      setMembers((prevMembers) =>
        prevMembers.filter((member) => member._id !== friendId)
      );
    }
  };

  const renderFriendItem = ({ item }) => (
    <View>
      <View style={styles.friendItem}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View style={styles.friendInfo}>
          <Text>{item.name}</Text>
          <RadioButton
            value={item._id}
            status={
              members.some((member) => member._id === item._id)
                ? "checked"
                : "unchecked"
            }
            onPress={() => handleSelectMember(item._id)}
          />
        </View>
      </View>
    </View>
  );

  const renderMemberItem = ({ item }) => (
    <View style={{ flex: 1, marginHorizontal: 5 }}>
      <Image
        style={{ width: 50, height: 50 }}
        source={{ uri: item?.avatar }}
        resizeMode="cover"
      ></Image>
    </View>
  );
  return (
    <View style={styles.container}>
      {/* Search friends */}
      <View style={styles.input}>
        <Ionicons
          style={{ marginRight: "auto" }}
          name="search-sharp"
          size={24}
          color="#d2d2d2"
        />
        <TextInput
          style={{ marginRight: "auto", fontSize: 15 }}
          value={phone}
          placeholder="Nhập tên hoặc số điện thoại"
        ></TextInput>
      </View>

      <FlatList
        data={friends}
        renderItem={renderFriendItem}
        keyExtractor={(item) => item._id}
      ></FlatList>

      <Text>Members:</Text>
      <FlatList
        data={members}
        contentContainerStyle={{ flexDirection: "row" }}
        renderItem={renderMemberItem}
        keyExtractor={(item) => item._id}
      />
      <Pressable style={styles.button} onPress={handleAddMember}>
        <Ionicons
          style={{ textAlign: "center" }}
          name="add-circle-outline"
          size={24}
          color="white"
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  input: {
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "rgb(242, 242, 242)",
    marginTop: 10,
    alignItems: "center",
    marginHorizontal: 25,
    padding: 5,
    alignItems: "flex-start",
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
  button: {
    borderRadius: 20,
    backgroundColor: "rgb(6,188,238)",
    padding: 10,
    alignItems: "center",
  },
});
