import { StyleSheet, Text, View, Image, Pressable, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { EvilIcons } from "@expo/vector-icons";
import { baseURL } from "../api/baseURL";
import {
  deleteGroupService,
  leaveGroupService,
} from "../services/group.service";
export default function GroupInfoScreen({ navigation, route }) {
  const group = route.params?.group;
  const token = useSelector((state) => state.token.token);
  const [user, setUser] = useState({});
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
  }, []);
  console.log("user:::", user._id);
  console.log("author:::", group.author._id);
  const handleDeleteGroup = async () => {
    try {
      const response = await deleteGroupService(token, group._id);
      console.log("response:::", response);
      const { EM, EC } = response;
      if (EC === 0 && EM === "Success") {
        Alert.alert("Thông báo", "Gải tán nhóm thành công");
        navigation.navigate("Main");
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
              console.log("groupId:::", groupId)
              const response = await leaveGroupService(token,groupId);
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
  return (
    <View style={styles.container}>
      <View
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 15,
        }}
      >
        <Image
          style={{ width: 60, height: 60, borderRadius: 30 }}
          source={{ uri: group?.author.avatar }}
        ></Image>
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
        <AntDesign name="edit" size={22} color="black" />
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
            style={{
              backgroundColor: "gray",
              width: 40,
              height: 40,
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AntDesign name="search1" size={20} color="black" />
          </View>
          <Text style={{ textAlign: "center" }}>Tìm {"\n"} tin nhắn</Text>
        </View>

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
            <AntDesign name="search1" size={20} color="black" />
          </View>
          <Text style={{ textAlign: "center" }}>Đổi{"\n"} hình nên</Text>
        </View>

        <View style={{ alignItems: "center" }}>
          <View style={styles.iconHeader}>
            <Octicons name="bell" size={24} color="black" />
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
    backgroundColor: "gray",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
