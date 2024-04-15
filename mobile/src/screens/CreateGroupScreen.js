import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  Image,
  Pressable,
  Alert,
} from "react-native";
import { getFriends } from "../services/user.service";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { RadioButton } from "react-native-paper";
import { baseURL } from "../api/baseURL";
export default function CreateGroupScreen({ navigation }) {
  const token = useSelector((state) => state.token.token);
  const [groupName, setGroupName] = useState("");
  const [members, setMembers] = useState([]);
  const [friends, setFriends] = useState([]);
  const getListFriend = async () => {
    try {
      const response = await getFriends(token);
      if (response) {
        setFriends(response);
      }
    } catch (error) {
      console.log("error:::", error);
    }
  };

  useEffect(() => {
    getListFriend();
  }, [token]);


  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Ionicons
            onPress={() => navigation.goBack()}
            name="arrow-back"
            size={24}
            color="black"
          />
          <View>
            <Text>Nhóm mới</Text>
            <Text>{members.length}</Text>
          </View>
        </View>
      ),
    });
  }, [members]);

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

  const handleCreateGroup = async () => {
    try {
      if (members.length < 2) {
        Alert.alert("Thông báo", "Nhóm cần ít nhất 3 thành viên");
        return;
      }
      if (!groupName) {
        Alert.alert("Thông báo", "Vui lòng nhập tên nhóm");
        return;
      }
      const res = await baseURL.post(
        "/group/create",
        {
          groupName,
          members,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { EC, EM } = res.data;
      if (EC === 0) {
        Alert.alert("Thông báo", "Tạo nhóm thành công");
        navigation.navigate("Group");
        return;
      }
    } catch (error) {
      Alert.alert("Thông báo", "Tạo nhóm thất bại");
      return;
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <MaterialIcons
          name="drive-file-rename-outline"
          size={28}
          color="black"
          style={{ marginTop: 8, paddingRight: 10 }}
        />
        <TextInput
          style={styles.input}
          placeholder="Nhập tên nhóm"
          value={groupName}
          onChangeText={setGroupName}
        />
      </View>
      <FlatList
        data={friends}
        renderItem={renderFriendItem}
        keyExtractor={(item) => item._id}
      />
      <Text>Members:</Text>
      <FlatList
        data={members}
        contentContainerStyle={{ flexDirection: "row" }}
        renderItem={renderMemberItem}
        keyExtractor={(item) => item._id}
      />
      {/* <Button
        onPress={handleCreateGroup}
        icon="arrow-right"
        mode="contained"
        buttonColor="#00ACEE"
      ></Button> */}
      <Pressable onPress={handleCreateGroup}>
        <Text style={{ fontSize: 15, fontWeight: "bold", textAlign: "center" }}>
          Tao nhom
        </Text>
      </Pressable>
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
