import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  SafeAreaView,
  TextInput,
} from "react-native";
import { useSelector } from "react-redux";
import { baseURL } from "../api/baseURL";
import { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

const UserInfoScreen = ({ navigation }) => {
  const token = useSelector((state) => state.token.token);
  const [data, setData] = useState([]);
  const [changePasswordVisible, setChangePasswordVisible] = useState(false);
  const [buttonText, setButtonText] = useState("Đổi mật khẩu");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
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
        } else {
          console.log("Error getting user:", EM);
        }
      } catch (error) {
        console.log("Error getting user:", error);
      }
    };
    getUser();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN"); // Định dạng ngày tháng theo địa phương Việt Nam
  };

  const toggleChangePasswordVisible = () => {
    setChangePasswordVisible(!changePasswordVisible);
    if (changePasswordVisible===true) {
      setButtonText("Đổi mật khẩu");
    } else {
      setButtonText("Ẩn");
    }
  };

  const handlePasswordChange = async () => {
    // Handle password change logic here
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
        <View style={styles.detailItem}>
          <Text style={styles.label}>Sinh nhật:</Text>
          <Text>Chưa cập nhật</Text>
        </View>
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
                <Text style={{ color: "blue"}}>{buttonText}</Text>
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
