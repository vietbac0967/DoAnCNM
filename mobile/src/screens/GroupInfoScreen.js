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
import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import { AntDesign, Feather } from "@expo/vector-icons";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { EvilIcons } from "@expo/vector-icons";
import { baseURL } from "../api/baseURL";
import * as ImagePicker from "expo-image-picker";
import {
  deleteGroupService,
  getGroupByIdService,
  leaveGroupService,
  updateNameGroupService,
} from "../services/group.service";
import { selectUser } from "../app/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { handlesendinfoAll } from "../utils/socket";
export default function GroupInfoScreen({ navigation, route }) {
  const groupId = route.params?.groupId;
  const [modalVisible, setModalVisible] = useState(false);
  const user = useSelector(selectUser);
  const [group, setGroup] = useState(null);
  const [name, setName] = useState("");
  const getGroup = async () => {
    try {
      const response = await getGroupByIdService(groupId);
      const { EM, EC, DT } = response;
      if (EM === "Success" && EC === 0) {
        setName(DT?.name);
        setGroup(DT);
      } else {
        Alert.alert("Something went wrong", EM);
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };
  useEffect(() => {
    getGroup();
  }, []);

  
  console.log("groupId in group info screen:::", groupId);
  console.log("group in group info screen:::", group);

  const handleDeleteGroup = async () => {
    try {
      const response = await deleteGroupService(group._id);
      console.log("response:::", response);
      const { EM, EC } = response;
      if (EC === 0 && EM === "Success") {
        Alert.alert("Thông báo", "Giải tán nhóm thành công");
        // let arr = members.map(item => item._id)
        handlesendinfoAll({ arrmember: group && group.members });
        navigation.navigate("Group", { isLoading: true });
      } else {
        Alert.alert("Somthing went wrong", EM);
      }
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Tùy chọn nhóm",
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
      ),});
      
  }, []);

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
              console.log("groupId:::", groupId);
              const response = await leaveGroupService(groupId);
              console.log("response:::", response);
              const { EM, EC } = response;
              if (EC === 0 && EM === "Success") {
                Alert.alert("Thông báo", "Rời nhóm thành công");
                navigation.navigate("Group");
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
        formData.append("groupId", groupId);
        const token = await AsyncStorage.getItem("accessToken");
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
          // socket.current.emit("update-avatar", {
          //   groupId: group._id,
          //   avatar: DT.avatar,
          // });
          navigation.navigate("Group");
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
      const response = await updateNameGroupService(groupId, name);
      const { EM, EC } = response;
      if (EC === 0 && EM === "Success") {
        Alert.alert("Thông báo", "Đổi tên nhóm thành công");
        setModalVisible(false);
        navigation.navigate("Group");
      } else {
        Alert.alert("Something went wrong", EM);
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
            style={{ width: 100,
              height: 100,
              borderRadius: 50,
              marginBottom: 20,
            marginTop: 15 }}
            source={{ uri: group?.avatar || group?.author.avatar }}
          ></Image>
          <Pressable onPress={handleUpdateImage} style={{ position: "absolute", bottom: 20, right: 5, backgroundColor: "#F5F5F5", padding: 4, borderRadius: 20, borderWidth: 0.5}}>
            <EvilIcons
              name="camera"
              size={18}
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
          alignItems: "center",
        }}
      >
        <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "bold" }}>
          {group?.name}
        </Text>
        <Pressable onPress={() => setModalVisible(true)} style={{ justifyContent: "center", }}>
          <AntDesign name="edit" size={20} color="gray" />
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
          <View style={styles.iconHeader}>
            <AntDesign
              name="search1"
              size={20}
              color="black"
              onPress={() => navigation.navigate("SearchMessage", { groupId })}
            />
          </View>
          <Text style={{ textAlign: "center", width: 80, marginTop: 8, fontSize: 12 }}>Tìm {"\n"} tin nhắn</Text>
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
          <Text style={{ textAlign: "center", width: 80, marginTop: 8, fontSize: 12 }}>Thêm thành viên</Text>
        </Pressable>

        <View style={{ alignItems: "center" }}>
          <View style={styles.iconHeader}>
            <AntDesign name="picture" size={20} color="black" />
          </View>
          <Text style={{ textAlign: "center", width: 80, marginTop: 8, fontSize: 12 }}>Đổi hình nền</Text>
        </View>

        <View style={{ alignItems: "center" }}>
          <View style={styles.iconHeader}>
            <Feather name="bell" size={20} color="black" />
          </View>
          <Text style={{ textAlign: "center", width: 80, marginTop: 8, fontSize: 12 }}>Tắt thông báo</Text>
        </View>
      </View>

      <View style={{ marginTop: 20 }}>
        <Pressable
          onPress={() => {
            navigation.navigate("MemberInfo", {
              groupId: group._id,
            });
          }}
          style={{ flexDirection: "row", alignItems: "center", paddingLeft: 10, paddingVertical: 10, borderBottomWidth: 0.5, borderBottomColor: "#ddd"}}
        >
          <FontAwesome name="group" size={24} color="black" />
          <Text style={{ marginLeft: 10 }}>Thành viên nhóm</Text>
        </Pressable>

        <Pressable
          style={{ flexDirection: "row", alignItems: "center", paddingLeft: 10, paddingVertical: 10, borderBottomWidth: 0.5, borderBottomColor: "#ddd"}}
        >
          <AntDesign name="setting" size={24} color="black" />
          <Text style={{ marginLeft: 10 }}>Cài đặt nhóm</Text>
        </Pressable>

        {user?._id === group?.author._id ? (
          <Pressable
            onPress={handleDeleteGroup}
            style={{ flexDirection: "row", alignItems: "center", paddingLeft: 10, paddingVertical: 10 }}
          >
            <EvilIcons name="trash" size={26} color="red" />
            <Text style={{ marginLeft: 10, color: "red" }}>Giải tán nhóm</Text>
          </Pressable>
        ) : (
          <Pressable
            onPress={handleLeaveGroup}
            style={{ flexDirection: "row", alignItems: "center", paddingLeft: 10, paddingVertical: 10 }}
          >
            <Entypo name="log-out" size={24} color="red" />
            <Text style={{ marginLeft: 10 }}>Rời nhóm</Text>
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
    paddingHorizontal: 20,
  },
  iconHeader: {
    backgroundColor: "#ddd",
    width: 50,
    height: 50,
    borderRadius: 25,
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
