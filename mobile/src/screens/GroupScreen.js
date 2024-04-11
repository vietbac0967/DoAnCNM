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
import {  useSelector } from "react-redux";
import Feather from "react-native-vector-icons/Feather";
export default function GroupScreen({ navigation }) {
  const [groupName, setGroupName] = useState("");
  const [members, setMembers] = useState([]);
  const token = useSelector((state) => state.token.token);
  const [friends, setFriends] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);

  useEffect(() => {
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
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <Text style={styles.title}>Tạo Nhóm Chat</Text>

        <Pressable
          onPress={() => {
            navigation.navigate("CreateGroup");
          }}
        >
          <AntDesign name="addusergroup" size={30} color="black" />
        </Pressable>
      </View>
      {/* <View>
        <Pressable style={styles.contactButton} 
        onPress={() => navigation.navigate("ChatScreen",{recevierId: item._id} )}>
            <Feather name="message-square" size={20} color="grey" />
          </Pressable>
          </View> */}
      {
        friends.map((friend) => (
          <UserChat key={friend._id} item={friend}  />
        ))
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  memberContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  memberInput: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
  },
});
