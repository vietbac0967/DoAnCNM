import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  Pressable,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { RadioButton } from "react-native-paper";
import { baseURL } from "../api/baseURL";
import { validateRegister } from "../utils/validate";
export default function RegisterScreen({ navigation }) {
  const [checked, setChecked] = useState("Nam");
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [user, setUser] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    gender: "Nam",
    password: "",
    confirmPassword: "",
  });

  const handleRegisterSubmit = async () => {
    try {
      if (!validateRegister(user)) {
        return;
      }

      const response = await baseURL.post("/auth/register", user);
      const { EC, EM, DT } = response.data;
      if (EC === 1 && EM === "User already exists") {
        Alert.alert("Thông báo", "Số điện thoại hoặc email đã được đăng ký");
        return;
      }
      if (EC === 0 && EM === "Success") {
        Alert.alert("Thông báo", "Đăng ký thành công", [
          {
            text: "OK",
            onPress: () =>
              navigation.navigate("VerifyOTP", { email: user.email }),
          },
        ]);
      }
    } catch (error) {
      Alert.alert("Thông báo", "Đăng ký thất bại", error.message);
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        style={{ width: "100%", height: "100%" }}
        source={require("../assets/background.png")}
      >
        <Ionicons
          name="chevron-back-outline"
          size={24}
          color="black"
          style={{
            position: "absolute",
            top: 20,
            left: 20,
            padding: 10,
            borderRadius: 5,
          }}
          onPress={() => navigation.goBack()}
        />
        <Text
          style={{
            textAlign: "center",
            color: "#707070",
            fontSize: 30,
            fontWeight: 800,
            marginTop: 120,
          }}
        >
          Tạo một tài khoản mới
        </Text>
        <View style={styles.form}>
          <Text
            style={{
              textAlign: "center",
              color: "#707070",
              fontSize: 16,
              fontWeight: 600,
              paddingTop: 10,
            }}
          >
            Hãy nhập đầy đủ thông tin bên dưới {"\n"} để đăng ký tài khoản
          </Text>

          <KeyboardAvoidingView style={styles.input}>
            <Text style={{ width: 120 }}>Họ và tên: </Text>
            <TextInput
              value={user.name}
              onChangeText={(text) => setUser({ ...user, name: text })}
              placeholderTextColor={"gray"}
              placeholder="Nhập họ và tên"
            ></TextInput>
          </KeyboardAvoidingView>

          <KeyboardAvoidingView style={styles.input}>
            <Text style={{ width: 120, marginRight: 5 }}>Số điện thoại: </Text>
            <TextInput
              value={user.phoneNumber}
              onChangeText={(text) => setUser({ ...user, phoneNumber: text })}
              placeholderTextColor={"gray"}
              placeholder="Nhập số điện thoại"
            ></TextInput>
          </KeyboardAvoidingView>

          <KeyboardAvoidingView style={styles.input}>
            <Text style={{ width: 120, marginRight: 5 }}>Email: </Text>
            <TextInput
              value={user.email}
              onChangeText={(text) => setUser({ ...user, email: text })}
              placeholderTextColor={"gray"}
              placeholder="Nhập email"
            ></TextInput>
          </KeyboardAvoidingView>

          <KeyboardAvoidingView style={styles.input}>
            <Text style={{ paddingTop: 8 }}>Giới tính:</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginLeft: 60,
              }}
            >
              <RadioButton
                value="Nam"
                status={checked === "Nam" ? "checked" : "unchecked"}
                onPress={() => {
                  setChecked("Nam");
                  setUser({ ...user, gender: "Nam" });
                }}
              ></RadioButton>
              <Text style={{ paddingTop: 8 }}>Nam</Text>
            </View>

            <KeyboardAvoidingView
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <RadioButton
                value="Nữ"
                status={checked === "Nữ" ? "checked" : "unchecked"}
                onPress={() => {
                  setChecked("Nữ");
                  setUser({ ...user, gender: "Nữ" });
                }}
              ></RadioButton>
              <Text style={{ paddingTop: 8 }}>Nữ</Text>
            </KeyboardAvoidingView>
          </KeyboardAvoidingView>

          <KeyboardAvoidingView
            style={[styles.input, { justifyContent: "space-between" }]}
          >
            <Text style={{ width: 120, marginRight: 5 }}>Mật khẩu: </Text>
            <TextInput
              value={user.password}
              onChangeText={(text) => setUser({ ...user, password: text })}
              placeholderTextColor={"gray"}
              placeholder="Nhập mật khẩu"
              secureTextEntry={showPassword}
            ></TextInput>
            <Pressable onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <Ionicons name="eye-off" size={24} color="black" />
              ) : (
                <Ionicons name="eye" size={24} color="black" />
              )}
            </Pressable>
          </KeyboardAvoidingView>

          <KeyboardAvoidingView
            style={[styles.input, { justifyContent: "space-between" }]}
          >
            <Text style={{ width: 120, marginRight: 5 }}>
              Nhập lại mật khẩu:{" "}
            </Text>
            <TextInput
              value={user.confirmPassword}
              onChangeText={(text) =>
                setUser({ ...user, confirmPassword: text })
              }
              placeholderTextColor={"gray"}
              placeholder="Nhập lại mật khẩu"
              secureTextEntry={showConfirmPassword}
            ></TextInput>
            <Pressable
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <Ionicons name="eye-off" size={24} color="black" />
              ) : (
                <Ionicons name="eye" size={24} color="black" />
              )}
            </Pressable>
          </KeyboardAvoidingView>

          <Pressable
            onPress={handleRegisterSubmit}
            style={{
              borderRadius: 81,
              paddingHorizontal: 80,
              backgroundColor: "#00ACEE",
              marginTop: 20,
              paddingVertical: 10,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                textTransform: "uppercase",
                color: "#fff",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Đăng ký
            </Text>
          </Pressable>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              paddingTop: 10,
            }}
          >
            <Text>Bạn đã có tài khoản ?</Text>
            <Pressable onPress={() => navigation.navigate("Login")}>
              <Text style={{ paddingHorizontal: 10, fontWeight: "500" }}>
                Login
              </Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  form: {
    flex: 1,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: "#fff",
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  input: {
    flexDirection: "row",
    paddingHorizontal: 13,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#00ACEE",
    width: "85%",
    marginVertical: 10,
    padding: 8,
  },
});
