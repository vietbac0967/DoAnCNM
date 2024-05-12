import React, { useEffect, useLayoutEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View, Image, Alert, Modal } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { getReceiverService, searchUser, sendFriendRequestService } from "../services/user.service";
import { handlesendtext } from "../utils/socket";

export default function FriendInfoScreen({ navigation, route }) {
  const friendId = route.params?.receiverId;
  const [friend, setFriend] = useState({});
  const [status, setStatus] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [fullImageUri, setFullImageUri] = useState(null);

  const getFriend = async () => {
    try {
      const response = await getReceiverService(friendId);
      setFriend(response);
    } catch (error) {
      console.log("error:", error);
    }
  };

  const handleSearchUser = async () => {
    const res = await searchUser(friend?.phoneNumber);
    if (res.EC === 1 && res.EM === "User is already your friend") {
      setStatus(true);
    }
  };

  const handleSendRequest = async () => {
    try {
      const res = await sendFriendRequestService(friend._id);
      const { EC, EM, DT } = res;
      if (EC === 0 && EM === "Success") {
        Alert.alert("Thông báo", "Gửi lời mời thành công", [{ text: "OK" }]);
        handlesendtext({ receiver: friend.phoneNumber });
        navigation.goBack();
      }
    } catch (error) {
      Alert.alert("Thông báo", error, [{ text: "OK" }]);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Thông tin bạn bè",
    });
  }, [navigation]);

  useEffect(() => {
    getFriend();
  }, []);

  useEffect(() => {
    handleSearchUser();
  }, [friend]);

  const openModal = (imageUri) => {
    setFullImageUri(imageUri);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.background} source={require("../assets/bg.jpg")} />
        <AntDesign
          name="left"
          size={24}
          color="black"
          style={{ position: "absolute", top: 50, left: 20 }}
          onPress={() => navigation.goBack()}
        />
        <View style={styles.headerInfo}>
          <Pressable onPress={() => openModal(friend?.avatar)}>
            <Image
              style={styles.avatar}
              source={{ uri: friend?.avatar }}
              defaultSource={require("../assets/avt.jpg")}
            />
          </Pressable>
          <View style={{ marginLeft: 20 }}>
            <Text style={styles.name}>{friend?.name}</Text>
            <Text style={styles.status}>{status ? "Bạn bè" : "Người lạ"}</Text>
          </View>
        </View>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.modalContainer}>
          <Image style={styles.fullImage} source={{ uri: fullImageUri }} defaultSource={require("../assets/avt.jpg")}/>
          <Pressable style={styles.closeButton} onPress={() => setModalVisible(!modalVisible)}>
            <Ionicons name="close" size={24} color="black" />
          </Pressable>
        </View>
      </Modal>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Thông tin cá nhân</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Giới tính</Text>
          <Text style={styles.infoText}>{friend?.gender}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Email</Text>
          <Text style={styles.infoText}>{status ? friend?.email : "******"}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Điện thoại</Text>
          <Text style={styles.infoText}>{status ? friend?.phoneNumber : "******"}</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        {status ? (
          <Pressable
            style={[styles.button, { backgroundColor: "#70AE98" }]}
            onPress={() => navigation.navigate("ChatScreen", { recevierId: friend._id })}
          >
            <Ionicons name="chatbubble-ellipses-outline" size={24} color="white" />
            <Text style={styles.buttonText}>Gửi tin nhắn</Text>
          </Pressable>
        ) : (
          <Pressable
            style={[styles.button, { backgroundColor: "#74B4E0" }]}
            onPress={handleSendRequest}
          >
            <Ionicons name="person-add-outline" size={24} color="white" />
            <Text style={styles.buttonText}>Thêm bạn bè</Text>
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
  header: {},
  background: {
    position: "absolute",
    width: "100%",
    height: 250,
  },
  headerInfo: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginTop: 150,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 60,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
    shadowColor: "#000",
    marginLeft: 5,
    marginTop: 20,
  },
  status: {
    fontSize: 12,
    textAlign: "left",
    color: "#fff",
    shadowColor: "#000",
    marginLeft: 5,
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  fullImage: {
    width: "90%",
    height: "90%",
    resizeMode: "contain",
  },
  closeButton: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 5,
  },
  infoContainer: {
    marginTop: 40,
    paddingHorizontal: 20,
  },
  infoTitle: {
    fontSize: 15,
    marginBottom: 20,
    fontWeight: "bold",
  },
  infoRow: {
    flexDirection: "row",
    borderColor: "#ddd",
    borderBottomWidth: 0.5,
    marginTop: 10,
  },
  infoLabel: {
    fontSize: 12,
    color: "gray",
    position: "absolute",
  },
  infoText: {
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 120,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#70AE98",
    padding: 10,
    borderRadius: 5,
    width: "90%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    marginLeft: 10,
  },
});
