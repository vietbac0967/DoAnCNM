import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Pressable, Modal, TouchableOpacity, ImageBackground } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";

export default function ProfileScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);

  const username = "Dương Thế Huy";
  const avatar = require("../assets/avt.jpg");
  const backgroundImage = require("../assets/bg.jpg");

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      navigation.navigate("Login");
    } catch (error) {
      console.log("Error logging out:", error);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        style={{ width: "100%", height: "55%" }}
        source={backgroundImage}
      >
        <View style={styles.profileContainer}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image style={styles.avatar} source={avatar} />
          </TouchableOpacity>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.nickname}>@huydeptrai</Text>
        </View>
        <Pressable style={styles.logoutButton}>
          <Feather name="edit" size={20} color="#444444" />
        </Pressable>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableOpacity
            style={styles.modalBackground}
            activeOpacity={1}
            onPressOut={() => setModalVisible(false)}
          >
            <View style={styles.modalContent}>
              <Image style={styles.modalAvatar} source={avatar} />
            </View>
          </TouchableOpacity>
        </Modal>
        <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.bottomButton}>
          <Feather name="shield" size={15} color="#33CCFF" />
          <Text style={styles.bottomButtonText}>Tài khoản và bảo mật</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton}>
        <Feather name="settings" size={15} color="#33CCFF" />
          <Text style={styles.bottomButtonText}>Quyền riêng tư</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton}>
        <Feather name="bell" size={15} color="#33CCFF" />
          <Text style={styles.bottomButtonText}>Thông báo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton}>
        <Feather name="users" size={15} color="#33CCFF" />
          <Text style={styles.bottomButtonText}>Danh bạ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton}>
        <Feather name="bookmark" size={15} color="#33CCFF" />
          <Text style={styles.bottomButtonText}>Nhật ký</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton}>
        <Feather name="archive" size={15} color="#33CCFF" />
          <Text style={styles.bottomButtonText}>Sao lưu và ngôn ngữ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton} onPress={handleLogout}>
        <Feather name="log-out" size={15} color="red" />
          <Text style={{fontSize: 14, marginLeft: 10, color: "red" }}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {
    alignItems: "center",
    marginTop: 100,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: "#fff",
    marginTop: 20,
  },
  username: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "#404146",
  },
  nickname: {
    marginTop: 5,
    fontSize: 12,
    color: "#777777",
  },
  logoutButton: {
    position: "absolute",
    top: 20,
    right: 20,
    padding: 10,
    borderRadius: 5,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#00ACEE",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalAvatar: {
    width: 300,
    height: 300,
    borderRadius: 150,
  },
  bottomContainer: {
    flexDirection: "row",
    marginTop: 10,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  bottomButton: {
    backgroundColor: "#DDE0E6",
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  bottomButtonText: {
    fontSize: 14,
    color: "#444444",
    marginLeft: 10,
  },
});