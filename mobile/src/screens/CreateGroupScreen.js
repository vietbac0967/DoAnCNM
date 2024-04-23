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
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { RadioButton } from "react-native-paper";
import { createGroupService } from "../services/group.service";
export default function CreateGroupScreen({ navigation }) {
  const [groupName, setGroupName] = useState("");
  const [members, setMembers] = useState([]);
  const [friends, setFriends] = useState([]);
  const getListFriend = async () => {
    try {
      const response = await getFriends();
      if (response) {
        setFriends(response);
      }
    } catch (error) {
      console.log("error:::", error);
    }
  };

  useEffect(() => {
    getListFriend();
  }, []);
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
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Nhóm mới</Text>
            <Text style={{ color: "gray" }}>Đã chọn: {members.length}</Text>
          </View>
        </View>
      ),
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
      const res = await createGroupService(groupName, members);
      const { EC, EM } = res;
      if (EC === 0) {
        Alert.alert("Thông báo", "Tạo nhóm thành công");
        navigation.navigate("Group", { isLoading: true });
      }
    } catch (error) {
      Alert.alert("Thông báo", "Tạo nhóm thất bại");
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
      <Text>Thành viên:</Text>
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
      <Pressable
        onPress={handleCreateGroup}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "gray" : "#00B4EA", // Màu nền thay đổi khi nhấn
            opacity: pressed ? 0.5 : 1, // Độ mờ thay đổi khi nhấn
            borderRadius: 10, // Bo góc
            padding: 10,
          },
        ]}
      >
        <Text
          style={{
            fontSize: 15,
            color: "#fff",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Tạo nhóm
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
