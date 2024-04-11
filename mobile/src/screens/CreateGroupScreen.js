import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Pressable,
} from "react-native";
import { getFriends } from "../services/user.service";
import UserChat from "../components/UserChat";
import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import FriendCard from "../components/FriendCard";

export default function CreateGroupScreen({ navigation }) {
  const [groupName, setGroupName] = useState("");
  const [members, setMembers] = useState([]);
  const token = useSelector((state) => state.token.token);
  const [user, setUser] = useState("");
  const [friends, setFriends] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);

  useEffect(() => {
    navigation.setOptions({title:"Tạo nhóm chat"})
    const getListFriend = async () => {
      try {
        const friends = await getFriends(token);
        setFriends(friends);
      } catch (error) {
        console.log("error:::", error);
      }
    };
    getListFriend();
  }, []);
  const handleSelectFriend = (friendId) => {
    if (!selectedFriends.includes(friendId)) {
      setSelectedFriends([...selectedFriends, friendId]);
    } else {
      setSelectedFriends(selectedFriends.filter((id) => id !== friendId));
    }
  };

  // Hàm xử lý thêm thành viên vào nhóm
  const addMember = () => {
    if (selectedFriends.length === 0) {
      return; // Không thêm nếu không có thành viên nào được chọn
    }
    setMembers([...members, ...selectedFriends]);
    setSelectedFriends([]); // Reset danh sách thành viên đã chọn
  };
  // Hàm xử lý tạo nhóm chat
  const createGroupChat = () => {
    // Thực hiện logic tạo nhóm chat và chuyển đến màn hình chat nhóm
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nhập tên nhóm"
        value={groupName}
        onChangeText={setGroupName}
      />
      <TextInput
        value={user}
        style={[styles.input, { marginTop: 10 }]}
        placeholder="Tên thành viên"
        onChangeText={(text) => {
          /* Thêm logic xử lý thêm thành viên */
        }}
      />
      {/* <Button  title="Thêm" onPress={addMember}  /> */}
      <View style={[styles.memberContainer,{marginBottom:5}]}>
        {selectedFriends.map((friendId) => (
          <Text key={friendId}>
            {friends.find((friend) => friend._id === friendId)?.name}
          </Text>
        ))}
      </View>
      <View>{/* Hiển thị danh sách thành viên */}</View>

      {/* <Button title="Tạo Nhóm" onPress={createGroupChat} /> */}
      {friends.map((friend) => (
        <View
          key={friend._id}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <FriendCard item={friend} setUser={setUser} />
          <Pressable style={styles.button}>
            <Text style={styles.text}>Mời</Text>
          </Pressable>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 35,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 20,
    padding: 10,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
    backgroundColor: "#00ACEE",
    width: 100,
    height: 38,
    marginTop:7
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
