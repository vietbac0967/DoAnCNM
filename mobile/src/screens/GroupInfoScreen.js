import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Alert,
  Modal,
  TextInput,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { AntDesign, Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { EvilIcons } from "@expo/vector-icons";
import { baseURL } from "../api/baseURL";
import * as ImagePicker from "expo-image-picker";
import {
  deleteGroupService,
  leaveGroupService,
  updateNameGroupService,
} from "../services/group.service";
import { io } from "socket.io-client";
import { URL_SERVER } from "@env";
export default function GroupInfoScreen({ navigation, route }) {
  const group = route.params?.group;
  const token = useSelector((state) => state.token.token);
  const [user, setUser] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const socket = useRef(null);
  const [name, setName] = useState(group?.name);
  const getUser = async () => {
    try {
      // const token = await AsyncStorage.getItem("token");
      const response = await baseURL.get("/info", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { DT, EM, EC } = response.data;
      if (EC === 0 && EM === "Success") {
        setUser(DT);
      } else {
        console.log("Error getting user:", EM);
      }
    } catch (error) {
      console.log("Error getting user:", error);
    }
  };
  useEffect(() => {
    getUser();
    socket.current = io(URL_SERVER);
    socket.current.emit("join-group", group._id);
  }, [group._id]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("group-rename", (data) => {
        if (data.groupId === group._id) {
          group.name = data.name;
        }
      });
      socket.current.on("group-avatar", (data) => {
        if (data.groupId === group._id) {
          group.avatar = data.avatar;
        }
      });
      socket.current.on("group-avatar", (data) => {
        if (data.groupId === group._id) {
          group.avatar = data.avatar;
        }
      });
    }
  }, []);

  const handleDeleteGroup = async () => {
    try {
      const response = await deleteGroupService(token, group._id);
      console.log("response:::", response);
      const { EM, EC } = response;
      if (EC === 0 && EM === "Success") {
        Alert.alert("Thông báo", "Giải tán nhóm thành công");
        navigation.navigate("Group", { isLoading: true });
      }
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };
  const handleLeaveGroup = async () => {
    try {
      Alert.alert("Cảnh báo", "Bạn có rời khỏi nhóm này không", [
        {
          text: "Không",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Có",
          onPress: async () => {
            try {
              const groupId = group._id;
              console.log("groupId:::", groupId);
              const response = await leaveGroupService(token, groupId);
              console.log("response:::", response);
              const { EM, EC } = response;
              if (EC === 0 && EM === "Success") {
                Alert.alert("Thông báo", "Rời nhóm thành công");
                navigation.navigate("Main");
              } else {
                Alert.alert("Thông báo", "Rời nhóm không thành công");
              }
            } catch (error) {
              Alert.alert("Error", error.message);
            }
          },
        },
      ]);
    } catch (error) {
      Alert.alert("Thông báo", error.message);
    }
  };

  const handleUpdateImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        let localUri = result.assets[0].uri;
        let filename = localUri.split("/").pop();
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : "image";
        const formData = new FormData();
        formData.append("image", {
          uri: localUri,
          name: filename,
          type,
        });
        formData.append("groupId", group._id);
        const response = await baseURL.post(
          "/group/updateImageGroup",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("respone image::::", response.data);
        const { DT, EC, EM } = response.data;
        if (EC === 0 && EM === "Success") {
          Alert.alert("Thông báo", "Cập nhật ảnh đại diện thành công");
          socket.current.emit("update-avatar", {
            groupId: group._id,
            avatar: DT.avatar,
          });
          navigation.goBack();
        } else {
          Alert.alert("Cảnh báo", EM);
        }
      }
    } catch (error) {
      Alert.alert("Cảnh báo", "Hình ảnh quá lớn, vui lòng chọn hình khác");
      console.error("Error while picking image and sending message:", error);
    }
  };

  const handleUpdateGroupName = async () => {
    try {
      const groupId = group._id;
      const response = await updateNameGroupService(token, groupId, name);
      const { EM, EC } = response;
      if (EC === 0 && EM === "Success") {
        Alert.alert("Thông báo", "Đổi tên nhóm thành công");
        setModalVisible(false);
        socket.current.emit("rename-group", { groupId, name });
        navigation.goBack();
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 15,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Image
            style={{ width: 60, height: 60, borderRadius: 30 }}
            source={{ uri: group?.avatar || group?.author.avatar }}
          ></Image>
          <Pressable onPress={handleUpdateImage}>
            <EvilIcons
              style={{ alignSelf: "flex-end" }}
              name="camera"
              size={24}
              color="black"
            />
          </Pressable>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          gap: 10,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Text style={{ textAlign: "center", fontSize: 22, fontWeight: "bold" }}>
          {group.name}
        </Text>
        <Pressable onPress={() => setModalVisible(true)}>
          <AntDesign name="edit" size={22} color="black" />
        </Pressable>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 20,
        }}
      >
        <View style={{ alignContent: "center", alignItems: "center" }}>
          <View
            style={styles.iconHeader}
          >
            <AntDesign name="search1" size={20} color="black" />
          </View>
          <Text style={{ textAlign: "center" }}>Tìm {"\n"} tin nhắn</Text>
        </View>

        <Modal
          visible={modalVisible}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <Pressable
            style={styles.modalBackGround}
            activeOpacity={1}
            onPressOut={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 15,
                  fontWeight: "bold",
                  paddingBottom: 10,
                }}
              >
                Đổi tên nhóm
              </Text>
              {/* xóa tin nhắn ở phía người gửi */}
              <TextInput
                style={{
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: "blue",
                  padding: 10,
                  textAlign: "center",
                }}
                value={name}
                onChangeText={setName}
              ></TextInput>
              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "flex-end",
                  marginTop: 10,
                }}
              >
                <Pressable
                  onPress={() => setModalVisible(false)}
                  style={{
                    borderRadius: 10,
                    backgroundColor: "rgb(234,237,240)",
                    marginRight: 10,
                  }}
                >
                  <Text
                    style={{ fontSize: 13, fontWeight: "bold", padding: 10 }}
                  >
                    Hủy
                  </Text>
                </Pressable>
                <Pressable
                  onPress={handleUpdateGroupName}
                  style={{ backgroundColor: "blue", borderRadius: 10 }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "bold",
                      padding: 10,
                      color: "#fff",
                    }}
                  >
                    Xác nhận
                  </Text>
                </Pressable>
              </View>
            </View>
          </Pressable>
        </Modal>

        <Pressable
          style={{ alignItems: "center" }}
          onPress={() => {
            navigation.navigate("AddMember", { groupId: group._id });
          }}
        >
          <View style={styles.iconHeader}>
            <MaterialIcons name="group-add" size={22} color="black" />
          </View>
          <Text style={{ textAlign: "center" }}>Thêm {"\n"} thành viên</Text>
        </Pressable>

        <View style={{ alignItems: "center" }}>
          <View style={styles.iconHeader}>
            <AntDesign name="picture" size={20} color="black" />
          </View>
          <Text style={{ textAlign: "center" }}>Đổi{"\n"} hình nền</Text>
        </View>

        <View style={{ alignItems: "center" }}>
          <View style={styles.iconHeader}>
            <Feather name="bell" size={20} color="black" />
          </View>
          <Text style={{ textAlign: "center" }}>Tắt{"\n"} thông báo</Text>
        </View>
      </View>

      <View style={{ marginTop: 15 }}>
        <Pressable
          onPress={() => {
            navigation.navigate("MemberInfo", {
              groupId: group._id,
            });
          }}
          style={{ flexDirection: "row", marginBottom: 5, paddingLeft: 10 }}
        >
          <FontAwesome name="group" size={24} color="black" />
          <Text style={{ paddingLeft: 5 }}>Thành viên nhóm</Text>
        </Pressable>

        <Pressable
          style={{ flexDirection: "row", marginBottom: 5, paddingLeft: 10 }}
        >
          <AntDesign name="setting" size={24} color="black" />
          <Text style={{ paddingLeft: 5 }}>Cài đặt nhóm</Text>
        </Pressable>
        {/* condition for author and member */}
        {user?._id === group.author._id ? (
          <Pressable
            onPress={handleDeleteGroup}
            style={{ flexDirection: "row", marginBottom: 5, paddingLeft: 10 }}
          >
            <EvilIcons name="trash" size={26} color="red" />
            <Text style={{ paddingLeft: 5, color: "red" }}>Giải tán nhóm</Text>
          </Pressable>
        ) : (
          <Pressable
            onPress={handleLeaveGroup}
            style={{ flexDirection: "row", marginBottom: 5, paddingLeft: 10 }}
          >
            <Entypo name="log-out" size={24} color="red" />
            <Text style={{ paddingLeft: 5 }}>Rời nhóm</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  iconHeader: {
    backgroundColor: "#ddd",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
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
    // flexDirection: "row",
    // justifyContent: "space-around",
  },
});