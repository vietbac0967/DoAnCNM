import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Modal,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";
import api, { baseURL } from "../api/baseURL";
import { useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import Loading from "../components/Loading";
import {
  handleLogoutUser,
  handleLogoutUserSocket,
  handleOutConversation,
} from "../utils/socket";
import { selectUser } from "../app/userSlice";
import { getUserInfo } from "../services/user.service";
import { useIsFocused } from "@react-navigation/native";
export default function ProfileScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState({});
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const userRedux = useSelector(selectUser);
  const isFocused = useIsFocused();
  const [avatar, setAvatar] = useState(
    "https://avatar.iran.liara.run/username"
  );
  const getUser = async () => {
    try {
      // const token = await AsyncStorage.getItem("token");
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
  useEffect(() => {
    if (isFocused) {
      getUser();
      handleOutConversation({
        phone: user.phoneNumber,
      });
    }
  }, [isFocused]);

  const backgroundImage = require("../assets/bg.jpg");

  const handleLogout = async () => {
    try {
      const token = await AsyncStorage.getItem("refreshToken");
      const response = await baseURL.post("/auth/logout", { token });
      const { EC, EM } = response.data;
      console.log("Logout:", response.data);
      if (EC === 0) {
        await AsyncStorage.removeItem("accessToken");
        await AsyncStorage.removeItem("refreshToken");
        handleLogoutUserSocket({
          customId: userRedux.phoneNumber,
        });
        navigation.navigate("Login");
      } else {
        Alert.alert("Error", EM);
      }
    } catch (error) {
      console.log("Error getting user:", error);
      await AsyncStorage.removeItem("accessToken");
      await AsyncStorage.removeItem("refreshToken");
      navigation.navigate("Login");
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
        const response = await api.post("/user/updateImage", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const { DT, EC, EM } = response.data;
        if (EC === 0 && EM === "Success") {
          await getUser();
          Alert.alert("Thông báo", "Cập nhật ảnh đại diện thành công");
        }
      }
    } catch (error) {
      Alert.alert("Cảnh báo", "Hình ảnh quá lớn, vui lòng chọn hình khác");
      console.error("Error while picking image and sending message:", error);
    }
  };

  const extractUsername = (email) => {
    const atIndex = email.indexOf("@"); // Tìm vị trí của kí tự '@'
    if (atIndex !== -1) {
      return email.substring(0, atIndex); // Trả về phần từ đầu đến '@'
    } else {
      return email; // Trả về toàn bộ email nếu không tìm thấy kí tự '@'
    }
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        style={{ width: "100%", height: "50%" }}
        source={backgroundImage}
      >
        <View style={styles.profileContainer}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image
              style={styles.avatar}
              source={{ uri: user?.avatar }}
              defaultSource={require("../assets/avt.jpg")}
            />
          </TouchableOpacity>
          {/* <View style={styles.updateAvatarBtn}>
            <Feather name="camera" size={15} color="#fff" />
          </View> */}
          <Text style={styles.username}>{user?.name}</Text>
          {/* <Text style={styles.email}>{"@"+extractUsername(user?.email)}</Text> */}
        </View>
        <Pressable style={styles.logoutButton} onPress={handleUpdateImage}>
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
              <Image
                style={styles.modalAvatar}
                source={{ uri: user?.avatar }}
                defaultSource={require("../assets/avt.jpg")}
              />
            </View>
          </TouchableOpacity>
        </Modal>
        <View style={styles.bottomContainer}>
          <Pressable
            style={styles.bottomButton}
            onPress={() => navigation.navigate("UserInfo")}
          >
            <Feather name="shield" size={15} color="#33CCFF" />
            <Text style={styles.bottomButtonText}>Tài khoản và bảo mật</Text>
          </Pressable>

          <Pressable
            style={styles.bottomButton}
            onPress={() =>
              navigation.navigate("FunctionUnavailable", {
                screenTitle: "Quyền riêng tư",
              })
            }
          >
            <Feather name="settings" size={15} color="#33CCFF" />
            <Text style={styles.bottomButtonText}>Quyền riêng tư</Text>
          </Pressable>

          <Pressable
            style={styles.bottomButton}
            onPress={() =>
              navigation.navigate("FunctionUnavailable", {
                screenTitle: "Thông báo",
              })
            }
          >
            <Feather name="bell" size={15} color="#33CCFF" />
            <Text style={styles.bottomButtonText}>Thông báo</Text>
          </Pressable>

          <Pressable
            style={styles.bottomButton}
            onPress={() =>
              navigation.navigate("FunctionUnavailable", {
                screenTitle: "Danh bạ",
              })
            }
          >
            <Feather name="users" size={15} color="#33CCFF" />
            <Text style={styles.bottomButtonText}>Danh bạ</Text>
          </Pressable>

          <Pressable
            style={styles.bottomButton}
            onPress={() =>
              navigation.navigate("FunctionUnavailable", {
                screenTitle: "Nhật ký",
              })
            }
          >
            <Feather name="bookmark" size={15} color="#33CCFF" />
            <Text style={styles.bottomButtonText}>Nhật ký</Text>
          </Pressable>

          <Pressable
            style={styles.bottomButton}
            onPress={() =>
              navigation.navigate("FunctionUnavailable", {
                screenTitle: "Sao lưu và ngôn ngữ",
              })
            }
          >
            <Feather name="archive" size={15} color="#33CCFF" />
            <Text style={styles.bottomButtonText}>Sao lưu và ngôn ngữ</Text>
          </Pressable>

          <Pressable style={styles.bottomButton} onPress={handleLogout}>
            <Feather name="log-out" size={15} color="red" />
            <Text style={{ fontSize: 14, marginLeft: 10, color: "red" }}>
              Đăng xuất
            </Text>
          </Pressable>
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
    borderColor: "#F1F1F1",
    marginTop: 30,
  },
  updateAvatarBtn: {
    position: "absolute",
    bottom: "30%",
    right: "38%",
    backgroundColor: "#B5B5B5",
    padding: 5,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#fff",
  },
  username: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "#404146",
  },
  email: {
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
