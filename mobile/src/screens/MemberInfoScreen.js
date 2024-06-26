import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  FlatList,
  Pressable,
} from "react-native";
import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  deleteMemeberFromGroup,
  getLeadForGroupService,
  getUserForGroupService,
  updateDeputyLeader,
} from "../services/group.service";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { sendMessageGroupService } from "../services/message.service";
import { getUserInfo } from "../services/user.service";
import { handlesendinfoAll } from "../utils/socket";
export default function MemberInfoScreen({ navigation, route }) {
  const groupId = route.params?.groupId;
  const [members, setMembers] = useState([]);
  const [status, setStaus] = useState(false);
  const [announce, setAnnounce] = useState("");
  const [author, setAuthor] = useState({});
  const [deputyLeader, setDeputyLeader] = useState({});
  const [user, setUser] = useState({});
  const getUser = async () => {
    try {
      const response = await getUserInfo();
      const { DT, EM, EC } = response;
      if (EC === 0 && EM === "Success") {
        setUser(DT);
      } else {
        console.log("Error getting user:", EM);
      }
    } catch (error) {
      console.log("Error getting user:", error);
    }
  };
  // useEffect(() => {
  //   navigation.setOptions({
  //     headerTitle: "Thành viên nhóm",
  //   })
  //   getUser();
  // }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Thành viên nhóm",
      headerTintColor: "#fff",
      headerStyle: {
        backgroundColor: "#00ACED",
      },
      headerLeft: () => (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Ionicons
            onPress={() => navigation.goBack()}
            name="chevron-back-outline"
            size={24}
            color="#fff"
          />
        </View>
      ),
    });
    getUser();
  }, []);

  const getUserForGroup = async () => {
    try {
      const response = await getUserForGroupService(groupId);
      const { EM, EC, DT } = response;
      if (EC === 0 && EM === "Success") {
        setMembers(DT);
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };
  const getLeadForGroup = async () => {
    try {
      const response = await getLeadForGroupService(groupId);
      const { EM, EC, DT } = response;
      console.log("response lead:::", response);

      if (EC === 0 && EM === "Success") {
        setAuthor(DT.author || {});
        setDeputyLeader(DT.deputyLeader || {});
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };
  const handleSendMessage = async (message) => {
    try {
      const response = await sendMessageGroupService(groupId, message);
      const { EM, EC } = response;
      if (EC === 0 && EM === "Success") {
        console.log("send noti success");
      }
    } catch (error) {
      console.log("Error sending message:", error);
    }
  };
  const handleDeleteUserForGroup = async (userId) => {
    try {
      const response = await deleteMemeberFromGroup(groupId, userId);
      const { EM, EC } = response;
      if (EC === 0 && EM === "Success") {
        Alert.alert("Success", "Xóa thành công");
        let arr = [];
        arr.push(userId)
        handlesendinfoAll({ arrmember: arr })
        const announceMessage = `##TB##: Trưởng nhóm đã xóa một thành viên ra khỏi nhóm`;
        getUserForGroup();
        setAnnounce(announceMessage);
        handleSendMessage(announceMessage);
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };
  const renderMembers = ({ item, index }) => (
    <Pressable
      style={{
        flexDirection: "row",
        flex: 1,
        justifyContent: "space-between",
        marginHorizontal: 8,
        padding: 5,
        borderBottomWidth: 0.5,
        borderBottomColor: "#ddd",
      }}
      onPress={() => {
        navigation.navigate("FriendInfo", {
          receiverId: item._id,
        });
      }}
    >
      {/* left */}
      <View style={{ flexDirection: "row" }}>
        <Image
          style={{ width: 50, height: 50, borderRadius: 25 }}
          source={{ uri: item?.avatar }}
          defaultSource={require("../assets/avt.jpg")}
        />
        <View style={{ marginLeft: 10 }}>
          <Text style={{ paddingTop: 10 }}>{item?.name}</Text>
          {item._id === author._id ? (
            <Text style={{ fontSize: 13, fontWeight: "bold" }}>
              Trưởng nhóm
            </Text>
          ) : null}

          {item?._id === deputyLeader?._id ? (
            <Text style={{ fontSize: 13, fontWeight: "bold" }}>
              Phó trưởng nhóm
            </Text>
          ) : null}
        </View>
      </View>

      <View>
        {user?._id === author?._id ? (
          <View
            style={{
              flexDirection: "row",
              marginTop: 10,
            }}
          >
            {item._id !== author._id ? (
              <Pressable
                style={{ flexDirection: "row", marginRight: 10 }}
                onPress={() => {
                  handleDeleteUserForGroup(item?._id);
                }}
              >
                <Entypo name="trash" size={24} color="red" />
                <Text style={{ color: "red" }}>Xóa</Text>
              </Pressable>
            ) : null}

            {/* {item?._id !== author._id && item?._id !== deputyLeader?._id ? ( */}
            <Pressable
              style={{ flexDirection: "row" }}
              onPress={() => {
                handleUpdateDeputyLeader(item._id);
              }}
            >
              <SimpleLineIcons name="user" size={24} color="#97E7E1" />
              <Text style={{ fontSize: 13 }}>Phó nhóm</Text>
            </Pressable>
            {/* ) : null} */}
          </View>
        ) : null}
      </View>
    </Pressable>
  );

  const handleUpdateDeputyLeader = async (userId) => {
    try {
      const response = await updateDeputyLeader(groupId, userId);
      const { EM, EC } = response;
      if (EC === 0 && EM === "Success") {
        Alert.alert("Success", "Cập nhật thành công");
        navigation.goBack();
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  useEffect(() => {
    getUserForGroup();
    getLeadForGroup();
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        data={members}
        renderItem={renderMembers}
        keyExtractor={(item) => item._id}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
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
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
