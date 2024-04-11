
import { StyleSheet, Text, TextInput, View, Button, Pressable } from 'react-native';
import { getFriends } from "../services/user.service";
import UserChat from "../components/UserChat";
import { AntDesign } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from "react";
import {  useSelector } from "react-redux";

export default function CreateGroupScreen({ navigation }) {
  const [groupName, setGroupName] = useState('');
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
      setSelectedFriends(selectedFriends.filter(id => id !== friendId));
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
    <View>
      <TextInput
        style={styles.input}
        placeholder="Nhập tên nhóm"
        value={groupName}
        onChangeText={setGroupName}
      />
      <View style={styles.memberContainer}>
        <TextInput
          style={styles.memberInput}
          placeholder="Tên thành viên"
          onChangeText={(text) => {/* Thêm logic xử lý thêm thành viên */}}
        />
        <Button title="Thêm" onPress={addMember} />
      </View>
      <View style={styles.memberContainer}>
  {selectedFriends.map((friendId) => (
    <Text key={friendId}>{friends.find(friend => friend._id === friendId)?.name}</Text>
  ))}
</View>
      <View>
        {/* Hiển thị danh sách thành viên */}
      </View>

      <Button title="Tạo Nhóm" onPress={createGroupChat} />
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    marginTop:50
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  memberContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  memberInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
  },
});
