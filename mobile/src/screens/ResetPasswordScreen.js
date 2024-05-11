import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { baseURL } from "../api/baseURL";
import { Ionicons } from "@expo/vector-icons";

const ResetPasswordScreen = ({ route, navigation }) => {
  const { email } = route.params;
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);

  const handleSubmit = async () => {
    try {
      // Kiểm tra mật khẩu mới và mật khẩu xác nhận có khớp nhau không
      if (newPassword !== confirmPassword) {
        alert("Mật khẩu và xác nhận mật khẩu không khớp");
        return;
      }

      // Gửi yêu cầu thay đổi mật khẩu đến máy chủ
      const response = await baseURL.post("/auth/resetPassword", {
        email,
        newPassword,
        confirmPassword,
      });

      const { EC, EM, DT } = response.data;
      console.log("data is", response.data);
      if (EM === "Success" && EC === 0) {
        Alert.alert("Thông báo", "Mật khẩu đã được thay đổi thành công");
        navigation.navigate("Login");
      }
      if (EC === 1 && EM === "Weak password") {
        Alert.alert(
          "Thông báo",
          "Mật khẩu phải bao gồm ít nhất 8 ký tự, bao gồm chữ cái,ký tự đặc biệt và số"
        );
      }
      if (EC === 1 && EM === "Password is the same") {
        Alert.alert("Thông báo", "Bạn đã sử dụng mật khẩu này.\nVui lòng chọn mật khẩu khác");
      }
    } catch (error) {
      // Xử lý lỗi trong trường hợp gửi yêu cầu thất bại
      alert("Đã có lỗi xảy ra: " + error.message);
      console.error(error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Đặt lại mật khẩu</Text>
        <Text style={styles.subtitle}>
          Vui lòng nhập mật khẩu mới cho tài khoản:
        </Text>
        <Text style={styles.emailText}>{email}</Text>
        <View style={styles.input}>
          <TextInput
            placeholder="Mật khẩu mới"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry={showPassword}
            style={{ flex: 1 }}
          />
          <Pressable
            onPress={() => setShowPassword(!showPassword)}
            style={styles.iconContainer}
          >
            {showPassword ? (
              <Ionicons name="eye-off" size={24} color="black" />
            ) : (
              <Ionicons name="eye" size={24} color="black" />
            )}
          </Pressable>
        </View>
        <View style={styles.input}>
          <TextInput
            placeholder="Xác nhận mật khẩu"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={showConfirmPassword}
            style={{ flex: 1 }}
          />
          <Pressable
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            style={styles.iconContainer}
          >
            {showConfirmPassword ? (
              <Ionicons name="eye-off" size={24} color="black" />
            ) : (
              <Ionicons name="eye" size={24} color="black" />
            )}
          </Pressable>
        </View>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed
                ? "rgb(210, 230, 255)"
                : "rgb(65, 105, 225)",
            },
            styles.button,
          ]}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>Xác nhận</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "80%",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    textAlign: "center",
  },
  emailText: {
    fontSize: 16,
    marginBottom: 20,
    color: "#079DD9",
  },
  input: {
    flexDirection: "row",
    paddingHorizontal: 13,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#00ACEE",
    width: "100%",
    marginTop: 10,
    padding: 8,
  },
  button: {
    width: "100%",
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  iconContainer: {
    paddingHorizontal: 10,
    justifyContent: "center",
  },
});

export default ResetPasswordScreen;
