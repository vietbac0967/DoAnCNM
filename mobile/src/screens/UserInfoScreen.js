import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  SafeAreaView,
  TextInput,
  Alert
} from "react-native";
import { useSelector } from "react-redux";
import { baseURL } from "../api/baseURL";
import { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";


const UserInfoScreen = ({ navigation }) => {
  const token = useSelector((state) => state.token.token);
  const [data, setData] = useState([]);
  const [changePasswordVisible, setChangePasswordVisible] = useState(false);
  const [buttonText, setButtonText] = useState("Đổi mật khẩu");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const getUser = async () => {
    try {
      const response = await baseURL.get("/info", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { DT, EM, EC } = response.data;
      if (EC === 0 && EM === "Success") {
        setData(DT);
        setEmail(DT.email);
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
        const response = await baseURL.post("/user/updateImage", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN"); // Định dạng ngày tháng theo địa phương Việt Nam
  };

  const toggleChangePasswordVisible = () => {
    setChangePasswordVisible(!changePasswordVisible);
    if (changePasswordVisible === true) {
      setButtonText("Đổi mật khẩu");
    } else {
      setButtonText("Ẩn");
    }
  };

  const handlePasswordChange = async () => {
    try {
      // Kiểm tra mật khẩu mới và mật khẩu xác nhận có khớp nhau không
      if (newPassword !== confirmPassword) {
        alert("Mật khẩu và xác nhận mật khẩu không khớp");
        return;
      }

      // Gửi yêu cầu thay đổi mật khẩu đến máy chủ
      const response = await baseURL.post("/auth/changePassword", {
        email,
        oldPassword,
        newPassword,
        confirmPassword,
      });

      const { EC, EM, DT } = response.data;
      console.log("data is", response.data);
      if (EM === "Success" && EC === 0) {
        Alert.alert(
          "Thông báo",
          "Đổi mật khẩu thành công!\nVui lòng đăng nhập lại để sử dụng."
        );
        navigation.navigate("Login");
      }
      if (EC === 1 && EM === "Weak password") {
        Alert.alert(
          "Thông báo",
          "Mật khẩu phải bao gồm ít nhất 8 ký tự, bao gồm chữ cái,ký tự đặc biệt và số"
        );
      }
      if (EC === 1 && EM === "Old password is incorrect") {
        Alert.alert("Thông báo", "Mật khẩu cũ không khớp!");
      }
    } catch (error) {
      // Xử lý lỗi trong trường hợp gửi yêu cầu thất bại
      alert("Đã có lỗi xảy ra: " + error.message);
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoContainer}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons
            name="chevron-back-outline"
            size={24}
            color="black"
            style={{ marginRight: 10 }}
          />
        </Pressable>
        <Image source={{ uri: data.avatar }} style={styles.avatar} />
        <Pressable style={styles.updateAvatarBtn} onPress={handleUpdateImage}>
          <Ionicons name="camera" size={12} color="#363636" />
        </Pressable>
        <Text style={styles.fullName}>{data.name}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Text style={styles.grandLabel}>Tài khoản</Text>
          <Pressable onPress={() => navigation.navigate("UpdateUserInfo")}>
            <Ionicons name="create-outline" size={24} color="black" />
          </Pressable>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.label}>Giới tính:</Text>
          <Text>{data.gender}</Text>
        </View>
        {/* <View style={styles.detailItem}>
          <Text style={styles.label}>Sinh nhật:</Text>
          <Text>Chưa cập nhật</Text>
        </View> */}
        <View style={styles.detailItem}>
          <Text style={styles.label}>Điện thoại:</Text>
          <Text>{data.phoneNumber}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.label}>Email:</Text>
          <Text>{data.email}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.label}>Ngày tham gia:</Text>
          <Text>{formatDate(data.createdAt)}</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.detailItem}>
          <Text style={styles.grandLabel}>Bảo mật</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.label}>Mật khẩu:</Text>
          <Pressable onPress={toggleChangePasswordVisible}>
            <Text style={{ color: "blue" }}>{buttonText}</Text>
          </Pressable>
        </View>
        {changePasswordVisible && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Mật khẩu cũ"
              secureTextEntry={true}
              value={oldPassword}
              onChangeText={setOldPassword}
            />
            <TextInput
              style={styles.input}
              placeholder="Mật khẩu mới"
              secureTextEntry={true}
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TextInput
              style={styles.input}
              placeholder="Xác nhận mật khẩu mới"
              secureTextEntry={true}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <Pressable onPress={handlePasswordChange}>
              <Text style={styles.changePasswordText}>Đổi mật khẩu</Text>
            </Pressable>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#FFFFFF",
  },
  userInfoContainer: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginRight: 20,
  },
  updateAvatarBtn: {
    position: "absolute",
    top: 40,
    left: 90,
    backgroundColor: "#B5B5B5",
    padding: 5,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#fff",
  },
  fullName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  detailsContainer: {
    backgroundColor: "#F2F2F2",
    padding: 15,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  detailItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  grandLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "navy",
  },
  label: {
    fontWeight: "bold",
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
    marginVertical: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  changePasswordText: {
    color: "#FF0000",
    fontSize: 16,
    marginTop: 5,
  },
});

export default UserInfoScreen;
